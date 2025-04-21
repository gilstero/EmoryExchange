from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# User Table
from django.contrib.auth.models import AbstractUser, BaseUserManager

'''
Some information on the models that were implemented/ not implemented:
1. Ride model is a skeleton of what will be implemented in the future, only the model has been created
2. User model inherets the abstract base user model which we get rid of the 'username' in favor of the email
3. Transaction model also has not been implemented but is a abstract idea of what will be done
4. 
'''

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser):
    username = None
    profile_name = models.CharField(max_length=255, blank=True, null=True)
    real_name = models.CharField(max_length=255, blank=True, null=True)
    phone_num = models.CharField(max_length=20, blank=True, null=True)
    propic = models.ImageField(upload_to='profile_pic/',null=True, blank=True)
    last_login = models.DateTimeField(null=True, blank=True)
    # auth = models.BooleanField(null=False, default=False)

    USERNAME_FIELD = 'email' 
    REQUIRED_FIELDS = [] 

    email = models.EmailField(unique=True, max_length=255)

    objects = UserManager()

    def __str__(self) -> str:
        return self.real_name if self.real_name else "No Profile name"

# Transaction Table
# user1_rating and user2_rating are bounded by 1 through 5 stars with MinValueValidator and MaxValueValidator
class Transaction(models.Model):
    id_1 = models.ForeignKey(User, related_name="transactions_as_sender", on_delete=models.CASCADE)
    id_2 = models.ForeignKey(User, related_name="transactions_as_receiver", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    user1_rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    user1_notes = models.TextField(null=True, blank=True)
    user2_rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    user2_notes = models.TextField(null=True, blank=True)

# Listings Table
class Listing(models.Model):
    STATUS_CHOICES = [
        ('live', 'Live'),
        ('archived', 'Archived'),
        ('deleted', 'Deleted'),
    ]
    TAG_CHOICES = [
        ('notag', 'No Tag'),
        ('clothing', 'Clothing'),
        ('misc', 'Miscellaneous'),
        ('electronics', 'Electronics'),
        ('schoolsupp', 'School Supplies'),
        ('free', 'Free'),
        ('transport', 'Transport'),
        ('service', 'Service'),
        ('tutoring', 'Tutoring'),
        ('careercoach', 'Career Coaching'),
        ('moving', 'Moving Help'),
        ('researchassist', 'Research Assistance'),
        ('clothing', 'Clothing'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    ldate = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(upload_to='listing_image/', null=True, blank=True)
    recurring = models.BooleanField(default=False)
    tag = models.CharField(max_length=20, choices=TAG_CHOICES, default='notag')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='live')
    title = models.CharField(max_length=255)
    description = models.TextField()

# Rideshare database
class Ride(models.Model):
    # different pre-defined choices in the ride model
    STATUS_CHOICES = [
        ('requested', 'Requested'),
        ('accepted', 'Accepted'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    ]

    # same schema as transaction treating User as a foreign key
    user_id_1 = models.ForeignKey(User, related_name="rides_as_driver", on_delete=models.SET_NULL, null=True, blank=True)
    user_id_2 = models.ForeignKey(User, related_name="rides_as_passenger", on_delete=models.CASCADE)
    
    # pickup and dropoff are both chars, record the time of pickup as well
    pickup_location = models.CharField(max_length=255)
    dropoff_location = models.CharField(max_length=255)
    date = models.DateTimeField()
    
    amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='requested')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Ride from {self.pickup_location} to {self.dropoff_location} - {self.status}"

#Message Table
class Message(models.Model):
    user_id_1 = models.ForeignKey(User, related_name="messages_sent", on_delete=models.CASCADE)
    user_id_2 = models.ForeignKey(User, related_name="messages_received", on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    message = models.TextField()

    def __str__(self):
        return f"Message from {self.user_id_1.profile_name} to {self.user_id_2.profile_name}"