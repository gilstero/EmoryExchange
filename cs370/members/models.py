from django.db import models

class Member(models.Model):
  firstname = models.CharField(max_length=255)
  lastname = models.CharField(max_length=255)

# User Table
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    profile_name = models.CharField(max_length=255)
    real_name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone_num = models.CharField(max_length=20)

# Transaction Table
class Transaction(models.Model):
    user_id_1 = models.ForeignKey(User, related_name="transactions_as_sender", on_delete=models.CASCADE)
    user_id_2 = models.ForeignKey(User, related_name="transactions_as_receiver", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    user1_rating = models.IntegerField(null=True, blank=True)
    user1_notes = models.TextField(null=True, blank=True)
    user2_rating = models.IntegerField(null=True, blank=True)
    user2_notes = models.TextField(null=True, blank=True)