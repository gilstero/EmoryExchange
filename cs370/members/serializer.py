from rest_framework import serializers
from . models import *

# User Database Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'profile_name', 'real_name', 'email', 
                  'phone_num', 'password', 'propic']
        extra_kwargs = {
            "profile_name": {"required": False},
            "real_name": {"required": False},
            "phone_num": {"required": False},
            "propic": {"required": False},
        }

        def validate_email(self, value):
            # Check if the email ends with @emory.edu
            if not value.endswith('@emory.edu'):
                raise serializers.ValidationError("Please use a valid @emory.edu email address.")
            return value

# Transaction Database Serializer
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id_1', 'id_2', 'amount', 'date', 
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
        fields = ['LID', 'id', 'amount', 'ldate', 'img', 'recurring', 'tag', 'status', 'title', 'description']

# Token Database Serializer
class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Token
        fields = ["token", "created_at", "expires_at", "user_id", "is_used"]


