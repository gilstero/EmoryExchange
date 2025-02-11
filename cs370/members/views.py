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
                   "password": output.password} 
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

        user_id_1 = models.ForeignKey(User, related_name="transactions_as_sender", on_delete=models.CASCADE)
    user_id_2 = models.ForeignKey(User, related_name="transactions_as_receiver", on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    user1_rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    user1_notes = models.TextField(null=True, blank=True)
    user2_rating = models.IntegerField(null=True, blank=True, validators=[MinValueValidator(1), MaxValueValidator(5)])
    user2_notes = models.TextField(null=True, blank=True)

def control_page(request):
    return render(request, "home.html")