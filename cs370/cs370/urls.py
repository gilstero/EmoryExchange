"""
URL configuration for cs370 project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path
# from django.conf.urls import url
from members.views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # This is the basic control page with the buttons to the endpoints for navigation
    path('', control_page, name="control page"),
    path('admin/', admin.site.urls),

    #user API url private
    path('api/auth/user/', UserView.as_view(), name="user"),

    #transaction API url
    path('api/auth/transaction/', TransactionView.as_view(), name="transaction"),
    path('api/auth/transaction/<int:user_id_1>/<int:user_id_2>/<str:date>/', TransactionView.as_view()),

    path('api/auth/ride/', RideView.as_view(), name="ride"),

    #message API url
    path('api/auth/message/', MessageView.as_view(), name="message"),
    path('api/auth/message/<int:user_id_1>/<int:user_id_2>/<str:date>/', MessageView.as_view()),

    #listing API url private
    path('api/auth/listing/', ListingViewPrivate.as_view(), name="listing"), 
    path('api/auth/listing/<int:listingID>/', ListingViewPrivate.as_view()),

    #listing API url private profile
    path('api/auth/listingprofile/', ListingViewProfile.as_view(), name="listingprofile"),

    #listing API url public
    path('api/auth/listingtag/', ListingViewTag.as_view(), name="listingp"),

    #listing API url public
    path('api/pub/listing/', ListingViewPublic.as_view(), name="listingp"),

    #register API view
    path("api/auth/register/", RegistrationView.as_view(), name="register"),

    #login API view
    path("api/auth/login/", LoginView.as_view(), name="login"),

    #logout API view
    path("api/auth/logout/", LogoutView.as_view(), name="logout"),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # dead apis
    path("forgotPassword/", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword/", ResetPasswordView.as_view(), name="resetPassword"),
]
