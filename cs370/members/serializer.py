from rest_framework import serializers
from . models import *

# User Database Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'profile_name', 'real_name', 'email', 
                  'phone_num', 'password', 'propic']

# Transaction Database Serializer
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['user_id_1', 'user_id_2', 'amount', 'date', 
                  'user1_rating', 'user2_rating', 'user1_notes', 'user2_notes']

class RideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ride
        fields = ['user_id_1', 'user_id_2', 'pickup_location', 'dropoff_location', 'date',
                  'amount', 'status', 'created_at', 'updated_at']
        
# Message Database Serializer
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['user_id_1', 'user_id_2', 'date', 'message']

# Listing Database Serializer
class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['LID', 'user', 'amount', 'ldate', 'img', 'recurring', 'tag', 'status', 'title', 'description']


