from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import RegisterView
from .views import AuthorStatsView
from .views import UserMeView

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("author/<str:username>/", AuthorStatsView.as_view(), name="author-stats"),
    path("me/", UserMeView.as_view(), name="user-me"),
]
