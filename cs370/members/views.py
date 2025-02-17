# imports for views.py
from django.utils import timezone
from django.shortcuts import render
from django.conf import settings
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password, check_password # password and reset functionality
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from rest_framework_simplejwt.authentication import JWTAuthentication
from . models import *
from . serializer import *
import os
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

class UserView(APIView):
    # retrive the info for the table User
    permission_classes = (IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    
    def get(self, request):
        try:
            print("User: ", request.user)
            user = request.user
            serializer = UserSerializer(user)
            return Response(serializer.data, status=200)
        except:
            return Response({"error": "User ID must be provided"}, status=400)
    
    def post(self, request):
        serializer = UserSerializer(data={**request.data, **request.FILES})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        user = request.user
        
        if not user:
            return Response({"error": "User not found from token"}, status=404)
        
        data = {key: value[0] if isinstance(value, list) else value for key, value in request.data.items()}

        serializer = UserSerializer(user, data=data, partial=True)

        #       ----- Debugging ------
        # print(type(request.data['profile_name']))
        # print(type(request.data['real_name']))
        # print(type(request.data['propic']))
        # print(f"profile_name: {repr(request.data['profile_name'])}")
        # print(f"real_name: {repr(request.data['real_name'])}")
        # print(serializer)
        # print(serializer.get_initial())

        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response({"message": "Information not serialized correctly. Possible issue with information types served in form-data."}, status=400)


    def delete(self, request):
        user = request.user
        if not user:
            return Response({"error": "User not found from token"}, status=404)
        
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

class SendMessage(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # add implementation to not have to give all of the information

        serializer = MessageSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class MessageView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        output = [{"user_id_1": message.user_id_1,
                   "user_id_2": message.user_id_2,
                   "date": message.date,
                   "message": message.message}
                  for message in Message.objects.all()]
        return Response(output)
        
        
    # def patch(self, request, user_id_1, user_id_2, date):
    #     try:
    #         message = Message.objects.get(user_id_1=user_id_1, user_id_2=user_id_2, date=date)
    #     except:
    #         return Response({"error": "Message not found"}, status=404)

    #     serializer = MessageSerializer(message, data=request.data)
    #     if serializer.is_valid(raise_exception=True):
    #         serializer.save()
    #         return Response(serializer.data)

    # def delete(self, request, user_id_1, user_id_2, date):
    #     try:
    #         message = Message.objects.get(user_id_1=user_id_1, user_id_2=user_id_2, date=date)
    #     except:
    #         return Response({"error": "Message not found"}, status=404)
        
    #     message.delete()
    #     return Response({"message": "Message deleted successfully"}, status=204)

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

# only returns the listings that are for the specific user
class ListingViewProfile(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user_listings = Listing.objects.filter(user=request.user)
        output = []
        for listing in user_listings:
            user_serializer = UserSerializer(listing.user)
            
            listing_data = {
                "id": listing.id, 
                "user": user_serializer.data,
                "amount": listing.amount,
                "ldate": listing.ldate,
                "recurring": listing.recurring,
                "tag": listing.tag,
                "status": listing.status,
                "title": listing.title,
                "description": listing.description
            }

            if listing.img:
                try:
                    listing_data['img'] = listing.img.url
                except:
                    listing_data['img'] = None
            else:
                listing_data['img'] = None
            
            output.append(listing_data)
    
        return Response(output)
    
    def post(self, request):
        data = request.data.copy()
        data['user'] = request.user.id

        serializer = ListingSerializer(data={**data, **request.FILES})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
    def patch(self, request):
        user = request.user
        try:
            listing = Listing.objects.get(id=request.data.get('id'), user=user.id)
        except Listing.DoesNotExist:
            return Response({"error": "Listing not found or unauthorized"}, status=404)
        
        # unravelling form-data
        data = {key: value[0] if isinstance(value, list) else value for key, value in request.data.items()}
        
        serializer = ListingSerializer(listing, data=data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def delete(self, request):
        user = request.user
        try:
            listing = Listing.objects.get(id=request.data.get('id'), user=user.id)
        except Listing.DoesNotExist:
            return Response({"error": "Listing not found or unauthorized"}, status=404)

        listing.delete()
        return Response({"message": "Listing deleted successfully"}, status=204)

# listings for marketplace
class ListingViewPrivate(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        output = []
        for listing in Listing.objects.all():
            user_serializer = UserSerializer(listing.user)
            
            listing_data = {
                "id": listing.id, 
                "amount": listing.amount,
                "ldate": listing.ldate,
                "recurring": listing.recurring,
                "tag": listing.tag,
                "status": listing.status,
                "title": listing.title,
                "description": listing.description
            }

            if listing.img and hasattr(listing.img, 'url'):
                try:
                    listing_data['img'] = listing.img.url
                except Exception:
                    listing_data['img'] = None
            else:
                listing_data['img'] = None
            
            output.append(listing_data)
    
        return Response(output)
    
    def post(self, request):
        try:
            data = request.data
            
            listing = Listing(
                user=request.user,
                amount=data.get('amount'),
                ldate=data.get('ldate'),
                recurring=data.get('recurring'),
                tag=data.get('tag'),
                status=data.get('status', 'pending'),
                title=data.get('title'),
                description=data.get('description')
            )
            
            if 'img' in request.FILES:
                listing.img = request.FILES['img']
                
            listing.save()
            
            listing_data = {
                "id": listing.id, 
                "amount": listing.amount,
                "ldate": listing.ldate,
                "recurring": listing.recurring,
                "tag": listing.tag,
                "status": listing.status,
                "title": listing.title,
                "description": listing.description
            }
            
            if listing.img and hasattr(listing.img, 'url'):
                try:
                    listing_data['img'] = listing.img.url
                except Exception:
                    listing_data['img'] = None
            else:
                listing_data['img'] = None
                
            return Response(listing_data, status=status.HTTP_201_CREATED)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# grab listings by tags
class ListingViewTag(APIView):
    permission_classes = (IsAuthenticated, )
    def get(self, request):
        tag = request.query_params.get('tag', None)
        if tag is None:
            return Response(
                {"detail": "Tag parameter is required."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # below checks if the json tag provided is a correct tag
        valid_tags = [choice[0] for choice in Listing.TAG_CHOICES]
        if tag not in valid_tags:
            return Response(
                {"detail": "Invalid tag."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        listings = Listing.objects.filter(tag=tag, status='live')
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

# listings for marketplace but public
class ListingViewPublic(APIView):
    permission_classes = (AllowAny, )
    def get(self, request):
        output = []
        for listing in Listing.objects.all():
            user_serializer = UserSerializer(listing.user)
            
            listing_data = {
                "id": listing.id,
                "amount": listing.amount,
                "ldate": listing.ldate,
                "recurring": listing.recurring,
                "tag": listing.tag,
                "status": listing.status,
                "title": listing.title,
                "description": listing.description
            }

            if listing.img and hasattr(listing.img, 'url'):
                try:
                    listing_data['img'] = listing.img.url
                except Exception:
                    listing_data['img'] = None
            else:
                listing_data['img'] = None
            
            output.append(listing_data)
    
        return Response(output)

def control_page(request):
    return render(request, "home.html")

# Below is the implementation for the user login tokens and password hashing
# Code is from Geeks for Geeks 
# https://www.geeksforgeeks.org/build-an-authentication-system-using-django-react-and-tailwind/

URL = os.getenv("FRONTEND_URL", "http://localhost:3000")
SALT = "8b4f6b2cc1868d75ef79e5cfb8779c11b6a374bf0fce05b485581bf4e1e25b96c8c2855015de8449"

'''
Forgot password view is currently not working
'''
class ForgotPasswordView(APIView):
    permission_classes = (AllowAny, )
    
    def post(self, request):
        email = request.data.get("email")
        
        if not email:
            return Response(
                {"success": False, "message": "Email is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"success": True, "message": "If your email exists in our system, you will receive a password reset link"}, 
                status=status.HTTP_200_OK
            )
            
        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        
        '''
        This will need to be edited to work with the front end url
        '''
        reset_url = f"{settings.FRONTEND_URL}/reset-password/{uid}/{token}"
        
        subject = "Reset your password"
        message = f"Click the link below to reset your password:\n\n{reset_url}\n\nThis link will expire in 24 hours."
        
        try:
            send_mail(
                subject,
                message,
                settings.DEFAULT_FROM_EMAIL,
                [user.email],
                fail_silently=False,
            )
        except Exception as e:
            return Response(
                {"success": False, "message": "Failed to send email. Please try again later."}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
        return Response(
            {"success": True, "message": "If your email exists in our system, you will receive a password reset link"}, 
            status=status.HTTP_200_OK
        )

class ResetPasswordView(APIView):
    permission_classes = (AllowAny, )
    def post(self, request):
        uid = request.data.get("uid")
        token = request.data.get("token")
        password = request.data.get("password")
        
        if not (uid and token and password):
            return Response(
                {"success": False, "message": "UID, token, and password are required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if len(password) < 6:
            return Response(
                {"success": False, "message": "Invalid password length (Too Short)"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        if len(password) > 18:
            return Response(
                {"success": False, "message": "Invalid password length (Too Long)"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
        except (TypeError, ValueError, OverflowError, User.DoesNotExist):
            return Response(
                {"success": False, "message": "Invalid reset link"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        if not default_token_generator.check_token(user, token):
            return Response(
                {"success": False, "message": "Invalid or expired reset link"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        user.password = make_password(password)
        user.save()
        
        return Response(
            {"success": True, "message": "Password has been reset successfully"}, 
            status=status.HTTP_200_OK
        )

class RegistrationView(APIView):
    permission_classes = (AllowAny, )
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
    permission_classes = (IsAuthenticated,)
    def post(self, request):
        try:
            refresh_token = request.data.get("refresh_token")
            
            if not refresh_token:
                return Response(
                    {"success": False, "message": "Refresh token is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
                
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(
                {"success": True, "message": "You have been successfully logged out"},
                status=status.HTTP_200_OK
            )
            
        except TokenError:
            return Response(
                {"success": False, "message": "Invalid or expired token"},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {"success": False, "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )