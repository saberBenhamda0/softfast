import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from .models import Chat

from django.contrib.auth import get_user_model
User = get_user_model()


from datetime import datetime
from .models import Conversation
class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.room_group_name = "test"

        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()
        # Use json.dumps to convert Python object to a JSON string
        self.send(text_data=json.dumps({
            "type": "good connection",
            "message": "chfiha zbo lol"
        }))

    def receive(self, text_data):
        text = json.loads(text_data)
        message = text["messages"]
        sender_string = text["sender"]
        sender = User.objects.get(id=sender_string)
        receiver_string = text["receiver"]
        receiver = User.objects.get(username=receiver_string)
        timestamp = datetime.now()
        sender_profile_picture = text["sender_profile_picture"]

        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "chat_message",
                "message": message,
                "sender":sender_string,
                "receiver":receiver_string,
                "sender_profile_picture": sender_profile_picture,

            }
        )
        Chat.objects.create(messages=message, sender=sender, receiver=receiver,timestamp=timestamp)
        if not Conversation.objects.filter(first_user=sender, second_user=receiver ).exists() and \
                Conversation.objects.filter(first_user=receiver, second_user=sender).exists() :
            Conversation.objects.create(first_user=sender, second_user=receiver )

    def chat_message(self, event):
        message = event["message"]
        sender = event["sender"]
        receiver = event["receiver"]
        sender_profile_picture = event["sender_profile_picture"]

        self.send(text_data=json.dumps({
            "type": "chat_message",
            "message":message,
            "sender":sender,
            "receiver":receiver,
            "sender_profile_picture":sender_profile_picture,
        }))

    def disconnect(self, close):
        self.close()
        self.send(text_data=json.dumps({
            "message":"zbi is gone lol "
        }))
