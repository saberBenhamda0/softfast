from .models import Post, Chat, Conversation
from rest_framework import serializers
from django.contrib.auth.models import User

from django.contrib.auth import get_user_model
User = get_user_model()

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['profile_picture'] = str(user.profile_picutre)
        token['role'] = user.role

        # ...

        return token
class ConversationSerializer(serializers.ModelSerializer):
    contact_username = serializers.SerializerMethodField()
    contact_profile_picture = serializers.SerializerMethodField()


    def get_contact_profile_picture(self, obj):
        request = self.context.get("request")
        if request:
            user = request.user
            return str(obj.contact_profile_picture(user))
        return None
    def get_contact_username(self, obj):
        request = self.context.get("request")
        if request:
            user = request.user
            return obj.contact_username(user)  # Call the method to get the username
        return None

    class Meta:
        model = Conversation
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='user.username', read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ChatSerializer(serializers.ModelSerializer):
    sender_profile_picture = serializers.SerializerMethodField()
    receiver_profile_picture = serializers.SerializerMethodField()

    def get_sender_profile_picture(self, obj):
        return str(obj.sender_profile_picture)

    def get_receiver_profile_picture(self, obj):
        return str(obj.receiver_profile_picture)
    class Meta:
        model = Chat
        fields = "__all__"