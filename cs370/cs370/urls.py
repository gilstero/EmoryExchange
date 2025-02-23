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

urlpatterns = [
    path('', control_page, name="control page"),
    path('admin/', admin.site.urls),

    #user API url
    path('user/', UserView.as_view(), name="user"),
    path('users/<int:user_id>/', UserView.as_view()),

    #transaction API url
    path('transaction/', TransactionView.as_view(), name="transaction"),
    path('transaction/<int:user_id_1>/<int:user_id_2>/<str:date>/', TransactionView.as_view()),

    path('ride/', RideView.as_view(), name="ride"),

    #message API url
    path('message/', MessageView.as_view(), name="message"),
    path('message/<int:user_id_1>/<int:user_id_2>/<str:date>/', MessageView.as_view()),

    #listing API url
    path('listing/', ListingView.as_view(), name="listing"), 
    path('listing/<int:listingID>/', ListingView.as_view()),

    path('api/', include('members.urls'))
]
