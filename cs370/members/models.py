from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

# class Member(models.Model):
#   firstname = models.CharField(max_length=255)
#   lastname = models.CharField(max_length=255)

# User Table
class User(models.Model):
    user_id = models.AutoField(primary_key=True, max_length=255)
    profile_name = models.CharField(max_length=255)
    real_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True, max_length=255)
    phone_num = models.CharField(max_length=20)
    password = models.CharField(max_length=255)
    propic = models.URLField(null=True, blank=True)

# Transaction Table
# user1_rating and user2_rating are bounded by 1 through 5 stars with MinValueValidator and MaxValueValidator
class Transaction(models.Model):
    user_id_1 = models.ForeignKey(User, related_name="transactions_as_sender", on_delete=models.CASCADE)
    user_id_2 = models.ForeignKey(User, related_name="transactions_as_receiver", on_delete=models.CASCADE)
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
    ]
    
    LID = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    ldate = models.DateTimeField(auto_now_add=True)
    img = models.URLField(null=True, blank=True)
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