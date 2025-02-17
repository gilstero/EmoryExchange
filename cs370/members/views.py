# imports for views.py
from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from . models import *
from . serializer import *

class UserView(APIView):
    # retrive the info for the table User
    def get(self, request):
        output = [{"user_id": output.user_id, 
                   "profile_name": output.profile_name,
                   "real_name": output.real_name,
                   "email": output.email,
                   "phone_num": output.phone_num,
                   "password": output.password, 
                   "propic": output.propic}
                  for output in User.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class TransactionView(APIView):
    def get(self, request):
        output = [{"user_id_1": output.user_id_1,
                   "user_id_2": output.user_id_2,
                   "amount": output.amount,
                   "date": output.date,
                   "user1_rating": output.user1_rating,
                   "user1_notes": output.user1_notes,
                   "user2_rating": output.user2_rating,
                   "user2_notes": output.user2_notes}
                  for output in Transaction.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class MessageView(APIView):
    def get(self, request):
        output = [{"user_id_1": message.user_id_1,
                   "user_id_2": message.user_id_2,
                   "date": message.date,
                   "message": message.message}
                  for message in Message.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
class RideView(APIView):
    def get(self, request):
        output = [{"user_id_1": ride.user_id_1,
                   "user_id_2": ride.user_id_2,
                   "date": ride.date,
                   "pickup_location": ride.pickup_location,
                   "dropoff_location": ride.dropoff_location,
                   "amount": ride.amount,
                   "status": ride.status,
                   "created_at": ride.created_at,
                   "updated_at": ride.updated_at}
                  for ride in Ride.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = RideSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class ListingView(APIView):
    def get(self, request):
        output = [{"LID": listing.LID,
                   "user_id": listing.user_id,
                   "amount": listing.amount,
                   "ldate": listing.ldate,
                   "img": listing.img,
                   "recurring": listing.recurring,
                   "tag": listing.tag,
                   "status": listing.status,
                   "title": listing.title,
                   "description": listing.description}
                  for listing in Listing.objects.all()]
        return Response(output)
    
    def post(self, request):
        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)


def control_page(request):
    return render(request, "home.html")