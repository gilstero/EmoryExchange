# members/urls.py

from django.urls import path
from .views import RegistrationView, LoginView, ForgotPasswordView, ResetPasswordView

<<<<<<< HEAD
<<<<<<< HEAD
urlpatterns = []
=======
urlpatterns = [
    path("register", RegistrationView.as_view(), name="register"),
    path("login", LoginView.as_view(), name="login"),
    path("forgotPassword", ForgotPasswordView.as_view(), name="forgotPassword"),
    path("resetPassword", ResetPasswordView.as_view(), name="resetPassword"),
]
>>>>>>> backend
=======
urlpatterns = []
>>>>>>> 1eb1568ac659584d9314e42ff0b8190e4a32a11b
