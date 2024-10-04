from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from api.views import ProcessOrderWebhookView, ProcessSubscriptionWebhookView


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('registe/', views.register_user),
    path('posts/', views.Posts),
    path('messages/<str:pk>/', views.user_message, name='messages'),
    path('user/<str:pk>/', views.get_user_by_id, name=' get_user_by_id '),
    path('conversations/', views.get_user_conversations, name='get_user_conversations'),
    path('post/<str:pk>/', views.getPost),
    path('searsh/', views.searsh),
    path('create_conversation/', views.create_conversation, name="create a conversation for a user"),
    path('signup/', views.signup, name=" sign a user "),
    #payment paypal; 
    path("webhook/paypal/order", ProcessOrderWebhookView.as_view()),
    path("webhook/paypal/subscribe", ProcessSubscriptionWebhookView.as_view()),

]

