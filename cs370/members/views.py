# imports for views.py
from django.utils import timezone
from django.shortcuts import render
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password, check_password # password and reset functionality
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from . models import *
from . serializer import *
from datetime import datetime, timedelta
import os
from django.db.models import Q


class UserView(APIView):
    # retrive the info for the table User
    permission_classes = (IsAuthenticated,)
    
    def get(self, request):
        try:
            print("User: ", request.user)
            user = request.user
            serializer = UserSerializer(user)
            return Response(serializer.data, status=200)
        except:
            return Response({"error": "User ID must be provided"}, status=400)
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except:
            return Response({"error": "User not found"}, status=404)
        
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
        except:
            return Response({"error": "User not found"}, status=404)
        
        user.delete()
        return Response({"message": "User deleted successfully"}, status=204)

class TransactionView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        output = [{"user_id_1": output.id_1,
                   "user_id_2": output.id_2,
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
        
    def patch(self, request, user_id_1, user_id_2, date):
        try:
            transaction = Transaction.objects.get(id_1=user_id_1, id_2=user_id_2, date=date)
        except:
            return Response({"error": "Transaction not found"}, status=404)

        serializer = TransactionSerializer(transaction, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
    def delete(self, request, user_id_1, user_id_2, date):
        try:
            transaction = Transaction.objects.get(id_1=user_id_1, id_2=user_id_2, date=date)
        except:
            return Response({"error": "Transaction not found"}, status=404)
        
        transaction.delete()
        return Response({"message": "Transaction deleted successfully"}, status=204)

class MessageView(APIView): #CHANGED HERE
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        other_user_id = request.query_params.get("other_user")

        if not other_user_id:
            return Response({"error": "Missing ?other_user=<user_id>"}, status=400)

        messages = Message.objects.filter(
            Q(user_id_1=user.id, user_id_2=other_user_id) |
            Q(user_id_1=other_user_id, user_id_2=user.id)
        ).order_by("date")

        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data.copy()
        data['user_id_1'] = request.user.id  # force sender to be the logged-in user

        serializer = MessageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
        
    def patch(self, request, user_id_1, user_id_2, date):
        try:
            message = Message.objects.get(user_id_1=user_id_1, user_id_2=user_id_2, date=date)
        except:
            return Response({"error": "Message not found"}, status=404)

        serializer = MessageSerializer(message, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def delete(self, request, user_id_1, user_id_2, date):
        try:
            message = Message.objects.get(user_id_1=user_id_1, user_id_2=user_id_2, date=date)
        except:
            return Response({"error": "Message not found"}, status=404)
        
        message.delete()
        return Response({"message": "Message deleted successfully"}, status=204)
        
class RideView(APIView):
    permission_classes = (IsAuthenticated,)
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
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        output = [{"LID": listing.LID,
                   "user_id": listing.id,
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
        
    def patch(self, request, listingID):
        try:
            listing = Listing.objects.get(LID=listingID)
        except:
            return Response({"error": "Listing not found"}, status=404)
        
        serializer = ListingSerializer(listing, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def delete(self, request, listingID):
        try:
            listing = Listing.objects.get(LID=listingID)
        except:
            return Response({"error": "Listing not found"}, status=404)

        listing.delete()
        return Response({"message": "Listing deleted successfully"}, status=204)

def control_page(request):
    return render(request, "home.html")

# Below is the implementation for the user login tokens and password hashing
# Code is from Geeks for Geeks 
# https://www.geeksforgeeks.org/build-an-authentication-system-using-django-react-and-tailwind/

URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
SALT = "8b4f6b2cc1868d75ef79e5cfb8779c11b6a374bf0fce05b485581bf4e1e25b96c8c2855015de8449"

def mail_template(content, button_url, button_text):
    return f"""<!DOCTYPE html>
            <html>
            <body style="text-align: center; font-family: "Verdana", serif; color: #000;">
                <div style="max-width: 600px; margin: 10px; background-color: #fafafa; padding: 25px; border-radius: 20px;">
                <p style="text-align: left;">{content}</p>
                <a href="{button_url}" target="_blank">
                    <button style="background-color: #444394; border: 0; width: 200px; height: 30px; border-radius: 6px; color: #fff;">{button_text}</button>
                </a>
                <p style="text-align: left;">
                    If you are unable to click the above button, copy paste the below URL into your address bar
                </p>
                <a href="{button_url}" target="_blank">
                    <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">{button_url}</p>
                </a>
                </div>
            </body>
            </html>"""

class ForgotPasswordView(APIView):
    def post(self, request):
        email = request.data.get("email")
        user = User.objects.filter(email=email).first()

        if not user:
            return Response({"success": False, "message": "User not found!"}, status=status.HTTP_400_BAD_REQUEST)

        created_at = timezone.now()
        expires_at = created_at + timezone.timedelta(days=1)

        # Secure token generation
        token = default_token_generator.make_token(user)

        token_obj = Token(user_id=user.id, token=token, created_at=created_at, expires_at=expires_at)
        token_obj.save()

        subject = "Forgot Password Link"
        button_url = f"{URL}/resetPassword?id={user.id}&token={token}"
        content = mail_template(
            "We have received a request to reset your password. Please use the link below.",
            button_url,
            "Reset Password",
        )

        send_mail(
            subject=subject,
            message=content,
            from_email=settings.EMAIL_HOST_USER,
            recipient_list=[email],
            html_message=content,
            )

        return Response(
            {"success": True, "message": "A password reset link has been sent to your email."},
            status=status.HTTP_200_OK,
        )

class ResetPasswordView(APIView):
    def post(self, request):
        user_id = request.data.get("id")
        token = request.data.get("token")
        password = request.data.get("password")

        token_obj = Token.objects.filter(user_id=user_id, is_used=False).order_by("-created_at").first()

        if not token_obj or token_obj.expires_at < timezone.now() or token_obj.token != token:
            return Response(
                {"success": False, "message": "Invalid or expired reset link!"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Reset Password
        user = User.objects.filter(id=user_id).first()
        if not user:
            return Response({"success": False, "message": "User not found!"}, status=status.HTTP_400_BAD_REQUEST)

        user.password = make_password(password)
        user.save()

        token_obj.is_used = True
        token_obj.save()

        return Response({"success": True, "message": "Your password has been reset successfully!"}, status=status.HTTP_200_OK)

class RegistrationView(APIView):
    permission_classes = [AllowAny] #added this to work in postman - CHANGED HERE

    def post(self, request):
        required_fields = ["email", "password"]

        # Check if required fields are present
        for field in required_fields:
            if field not in request.data:
                return Response({"success": False, "message": f"{field} is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Email validation for emory.edu
        email = request.data.get("email")
        if not email.endswith('@emory.edu'):
            return Response(
                {"success": False, "message": "Please use a valid @emory.edu email address."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        password = request.data.get("password")

        if 6 >= len(password):
            return Response(
                {"sucess": False, "message": "Invalid password length (Too Short)"}
            )
        if len(password) >= 18:
            return Response(
                {"sucess": False, "message": "Invalid password length (Too Long)"}
            )

        request.data["password"] = make_password(request.data["password"])

        serializer = UserSerializer(data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(
                {"success": True, "message": "You are now registered!"},
                status=status.HTTP_201_CREATED,
            )

        return Response({"success": False, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = (AllowAny, )
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # Authenticate user
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"success": False, "message": "Invalid login credentials!"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not check_password(password, user.password):
            return Response(
                {"success": False, "message": "Invalid login credentials!"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        user_serializer = UserSerializer(user)

        return Response({
            "success": True,
            "message": "You are now logged in!",
            "user": user_serializer.data,
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh)
        }, status=status.HTTP_200_OK)

class LogoutView(APIView):
    
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            print(refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response({
                "success": True,
                "message": "You have been successfully logged out!"
            }, status=status.HTTP_200_OK)

        
        except Exception as e:
            return Response({
                "success": False,
                "message": "Invalid token or token has been blacklisted!"
            }, status=status.HTTP_400_BAD_REQUEST)
