from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User


# Create your models here.

class CostumeUser(AbstractUser):
    profile_picutre = models.ImageField(upload_to='', null=True, blank=True)
    role = models.CharField(max_length=70, default="non_subscription_user", null=True, blank=False)


class Post(models.Model):
    user = models.ForeignKey(CostumeUser, on_delete=models.CASCADE)
    description = models.TextField(max_length=1000, blank=True,null=True)
    title = models.CharField(blank=True,null=True, max_length=50)
    componentType = models.CharField(default='unknown')
    price = models.DecimalField(
    max_digits=10,     # Total number of digits (including decimal places)
    decimal_places=2,  # Number of decimal places
    blank=False,
    null=False
    )
    image = models.ImageField(blank=False,null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Profile(models.Model):
    user = models.OneToOneField(CostumeUser, on_delete=models.CASCADE)
    boughtProducts = models.ForeignKey(Post, null=True ,on_delete=models.SET_NULL)


class Chat(models.Model):
    sender = models.ForeignKey(CostumeUser, on_delete=models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(CostumeUser, on_delete=models.CASCADE, related_name="receiver")
    messages = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    @property
    def sender_profile_picture(self):
        return self.sender.profile_picutre
    @property
    def receiver_profile_picture(self):
        return self.receiver.profile_picutre
    def __str__(self):
        return f"message from {self.sender} tp {self.receiver} "

class Conversation(models.Model):
    first_user = models.ForeignKey(CostumeUser, on_delete=models.CASCADE, related_name='first_user')
    second_user = models.ForeignKey(CostumeUser, on_delete=models.CASCADE, related_name='second_user')


    def contact_profile_picture(self, current_user):
        if self.first_user == current_user:
            return self.second_user.profile_picutre
        return self.first_user.profile_picutre
    def contact_username(self, current_user):
        """
        Returns the username of the other user in the conversation.
        If the current user is the initiator, return the participant's username and vice versa.
        """
        if self.first_user == current_user:
            return self.second_user.username
        return self.first_user.username

    def __str__(self):
        """String representation of the conversation."""
        return f"Conversation between {self.first_user.username} and {self.second_user.username}."


class Order(models.Model):
    buyer = models.ForeignKey(CostumeUser, on_delete=models.CASCADE)
    paypal_account = models.CharField(blank=False, null=False, max_length=100)
    product = models.ForeignKey(Post, on_delete=models.DO_NOTHING)
    time = models.DateTimeField(auto_now_add=True, null=False)

    def __str__(self):
        return f" the user {self.buyer.username} bought {self.product.title} with {self.product.price}$ "

class Subscription(models.Model):

    buyer = models.ForeignKey(CostumeUser, on_delete=models.CASCADE)
    paypal_account = models.CharField(blank=True, null=True, max_length=100)
    time_of_bought = models.DateTimeField(auto_now_add=True, null=False)
    subscription_type = models.CharField( max_length=40, null=False, blank=False)
    paypal_plan_id = models.CharField(max_length=200, null=True, blank=True)
    paypal_subscribing_id = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return f" the user {self.buyer.username} bought {self.subscription_type}$ "


