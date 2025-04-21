from rest_framework import serializers
from . models import *
import uuid
from urllib.parse import urlparse
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
import requests
from PIL import Image
from django.core.files.base import ContentFile
import io

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

# Transaction Database Serializer
class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['id_1', 'id_2', 'amount', 'date', 
                  'user1_rating', 'user2_rating', 'user1_notes', 'user2_notes']

# ride serializer just contains basic framework, no actual method was implemented to use this serializer
class RideSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ride
        fields = ['user_id_1', 'user_id_2', 'pickup_location', 'dropoff_location', 'date',
                  'amount', 'status', 'created_at', 'updated_at']
        
# Message Database Serializer
class MessageSerializer(serializers.ModelSerializer):
    user_id_1_name = serializers.SerializerMethodField()
    user_id_2_name = serializers.SerializerMethodField()
    
    class Meta:
        model = Message
        fields = ['user_id_1', 'user_id_1_name', 'user_id_2', 'user_id_2_name', 'date', 'message']
    
    def get_user_id_1_name(self, obj):
        """Returns profile_name if available, otherwise real_name."""
        return obj.user_id_1.profile_name or obj.user_id_1.real_name or "User has not given a name"

    def get_user_id_2_name(self, obj):
        """Returns profile_name if available, otherwise real_name."""
        return obj.user_id_2.profile_name or obj.user_id_2.real_name or "User has not given a name"

# Listing Database Serializer
class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['id', 'user', 'amount', 'ldate', 'recurring', 'tag', 'status', 'title', 'description', 'img']