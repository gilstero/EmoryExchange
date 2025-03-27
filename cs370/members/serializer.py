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

    def update(self, instance, validated_data):
        propic_url = validated_data.pop('propic_url', None)

        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        # Handle image URL
        if propic_url:
            try:
                response = requests.get(propic_url)
                response.raise_for_status() 

                img = Image.open(io.BytesIO(response.content))
                
                if img.mode != 'RGB':
                    img = img.convert('RGB')

                buffer = io.BytesIO()
                img.save(buffer, format='JPEG')
                buffer.seek(0)

                ext = '.jpg'
                filename = f"profile_pic/{uuid.uuid4()}{ext}"

                instance.propic.save(filename, ContentFile(buffer.getvalue()))

            except Exception as e:
                raise serializers.ValidationError({"propic_url": f"Error processing image: {str(e)}"})

        instance.save()
        return instance

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
        fields = ['id', 'user', 'amount', 'ldate', 'recurring', 'tag', 'status', 'title', 'description', 'img']

