
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.db.models import Q
from rest_framework import status

#user
from django.contrib.auth import get_user_model
User = get_user_model()
#Post_model
from .models import Post, Profile, Chat, Conversation, Order, Subscription
from .serializers import PostSerializer, ChatSerializer, UserSerializer, ConversationSerializer

#postgres_Search_function
from django.contrib.postgres.search import SearchQuery, SearchVector, SearchRank, SearchHeadline



# Create your views here.

# auth
@api_view(['POST'])
@csrf_exempt
def register_user(request) : 
    if request.method == 'POST':

        username = request.data.get("username")
        password = request.data.get("password")
        password2 = request.data.get("password2")
        if password == password2:
            user = User.objects.create_user(username=username, password=password)
            user.save()

        

        content = {'message' : 'the user has been created succefully '}
        return Response(content)

#content
@api_view(['GET'])
def Posts(request):
    user = request.user
    posts = Post.objects.all().order_by('-created_at')
    serializers = PostSerializer(posts, many=True)

    return Response(serializers.data)

@api_view(['GET'])
def user_message(request, pk):
    user = request.user
    sent_messages = Chat.objects.filter(Q(sender=user, receiver=pk) | Q(sender=pk, receiver=user)).order_by("timestamp")
    serializer = ChatSerializer(sent_messages, many=True)
    return Response(serializer.data)

@api_view(["GET"])
def get_user_by_id(request, pk):
    user = request.user
    user_info = User.objects.get(id=pk)
    serializer = UserSerializer(user_info, many=False)
    return Response(serializer.data)

@api_view(["GET"])
def get_user_conversations(request):
    user = request.user
    conversations = Conversation.objects.filter(Q(first_user=user) | Q(second_user=user))
    serializer = ConversationSerializer(conversations, many=True, context={'request': request})
    return Response(serializer.data)

@api_view(["POST"])
def create_conversation(request):
    user = request.user
    first_user_id = request.data.get("first_user")
    first_user = User.objects.get(id=first_user_id)

    second_user_id = request.data.get("second_user")
    second_user = User.objects.get(id=second_user_id)

    if Conversation.objects.filter(first_user=first_user, second_user=second_user).exists():
        return Response({
            "response":" the conversation already exist .",
        },
        status=status.HTTP_200_OK
        )
    elif not Conversation.objects.filter(first_user=first_user, second_user=second_user).exists():
        Conversation.objects.create(first_user=first_user, second_user=second_user)

        return Response({
            "response":"the conversation have been created with success"
        },
        status=status.HTTP_200_OK
        )
@api_view(['POST'])
@permission_classes([AllowAny])
@authentication_classes([])  # Disable JWT authentication for this view
def signup(request):
    user = request.user
    username = request.data.get('username')
    email = request.data.get("email")
    password = request.data.get("password")
    confirme_password = request.data.get("confirme_password")

    if password == confirme_password:

        if User.objects.filter(
            username=username,
            email=email,
            password=password
        ).exists():

            return Response({"response":"the user already exists"}, status=status.HTTP_403_FORBIDDEN)

        created_user = User.objects.create(
            username=username,
            email=email
        )
        created_user.set_password(password)
        created_user.save()
    return Response({"response":" user has been created with success"}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def searsh(request):
    q = request.GET.get('q')
    vector = SearchVector('componentType', 'description', 'title')
    query = SearchQuery(q)
    search_headline = SearchHeadline('description', query)
    posts = Post.objects.annotate(rank=SearchRank(vector, query)).filter(rank__gte=0.01).order_by('-rank')
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)


@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getPost(request, pk):
    user = request.user
    post1 = Post.objects.get(id=pk)
    serializers = PostSerializer(post1)

    return Response(serializers.data)     

# paypal payment view it only tempo here we gonna move it to another app 

import json

from django.conf import settings
from django.core.mail import send_mail
from django.http import HttpResponse, HttpResponseBadRequest
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import View

from paypalrestsdk import notifications


@method_decorator(csrf_exempt, name="dispatch")
class ProcessOrderWebhookView(View):
    def post(self, request):
        if "HTTP_PAYPAL_TRANSMISSION_ID" not in request.META:
            return HttpResponseBadRequest()

        auth_algo = request.META['HTTP_PAYPAL_AUTH_ALGO']
        cert_url = request.META['HTTP_PAYPAL_CERT_URL']
        transmission_id = request.META['HTTP_PAYPAL_TRANSMISSION_ID']
        transmission_sig = request.META['HTTP_PAYPAL_TRANSMISSION_SIG']
        transmission_time = request.META['HTTP_PAYPAL_TRANSMISSION_TIME']
        webhook_id = settings.PAYPAL_ORDER_WEBHOOK_ID
        event_body = request.body.decode(request.encoding or "utf-8")

        valid = notifications.WebhookEvent.verify(
            transmission_id=transmission_id,
            timestamp=transmission_time,
            webhook_id=webhook_id,
            event_body=event_body,
            cert_url=cert_url,
            actual_sig=transmission_sig,
            auth_algo=auth_algo,
        )

        if not valid:
            return HttpResponseBadRequest()

        webhook_event = json.loads(event_body)

        # we here take the response of webhook and access the elements we want
        event_type = webhook_event["event_type"] # we access the response type here
        resource = webhook_event["resource"]

        # getting the paypal email address
        payment_source = resource["payment_source"]
        paypal = payment_source["paypal"]
        paypal_email_address = paypal['email_address']

        # getting the user email address (my project email)
        purchase_units = resource['purchase_units']
        information_about_the_order = purchase_units[0]
        payee = information_about_the_order["payee"]


        email_address = payee["email_address"]
        custom_id = information_about_the_order["custom_id"]

        CHECKOUT_ORDER_APPROVED = "CHECKOUT.ORDER.APPROVED"

        if event_type == CHECKOUT_ORDER_APPROVED:
           user = User.objects.get(email=email_address)
           product = Post.objects.get(id=custom_id)
           Order.objects.create(buyer=user, product=product, paypal_account=paypal_email_address)

           send_mail(
               "Purchase of an order in SoftFast",
               "Thank you for choosing SoftFast! We truly appreciate your purchase and are excited to see you benefit from our product. "
               "If you have any questions or need support, feel free to reach out. Enjoy your new tools, and we hope to see you again soon!",
               "saberbenhamda0@gmail.com",  # Replace with the 'from' email address if needed
               [email_address],  # The recipient email
               fail_silently=False
           )









        return HttpResponse()

@method_decorator(csrf_exempt, name="dispatch")
class ProcessSubscriptionWebhookView(View):
    def post(self, request):
        if "HTTP_PAYPAL_TRANSMISSION_ID" not in request.META:
            return HttpResponseBadRequest()

        auth_algo = request.META['HTTP_PAYPAL_AUTH_ALGO']
        cert_url = request.META['HTTP_PAYPAL_CERT_URL']
        transmission_id = request.META['HTTP_PAYPAL_TRANSMISSION_ID']
        transmission_sig = request.META['HTTP_PAYPAL_TRANSMISSION_SIG']
        transmission_time = request.META['HTTP_PAYPAL_TRANSMISSION_TIME']
        webhook_id = settings.PAYPAL_SUBSCRIBE_WEBHOOK_ID
        event_body = request.body.decode(request.encoding or "utf-8")

        valid = notifications.WebhookEvent.verify(
            transmission_id=transmission_id,
            timestamp=transmission_time,
            webhook_id=webhook_id,
            event_body=event_body,
            cert_url=cert_url,
            actual_sig=transmission_sig,
            auth_algo=auth_algo,
        )

        if not valid:
            return HttpResponseBadRequest()

        webhook_event = json.loads(event_body)

        BILLING_SUBSCRIPTION_CREATED = "BILLING.SUBSCRIPTION.CREATED"
        BILLING_SUBSCRIPTION_ACTIVATED = "BILLING.SUBSCRIPTION.ACTIVATED"

        event_type = webhook_event["event_type"]

        if event_type == BILLING_SUBSCRIPTION_CREATED:

            email_address = webhook_event["resource"]['subscriber']['email_address']
            paypal_subscribing_id = webhook_event["resource"]['id']
            paypal_plan_id = webhook_event["resource"]["plan_id"]
            subscription_type = webhook_event["resource"]["custom_id"]

            user = User.objects.get(email=email_address)
            user.role = "subscription_user"
            user.save()
            Subscription.objects.create(
                buyer=user,
                paypal_subscribing_id=paypal_subscribing_id,
                paypal_plan_id=paypal_plan_id,
                subscription_type=subscription_type,
                )
            send_mail(
                "Purchase of an order in SoftFast",
                "Thank you for choosing SoftFast! We truly appreciate your purchase and are excited to see you benefit from our product. "
                "If you have any questions or need support, feel free to reach out. Enjoy your new tools, and we hope to see you again soon!",
                "saberbenhamda0@gmail.com",  # Replace with the 'from' email address if needed
                [email_address],  # The recipient email
                fail_silently=False
            )


        elif event_type == BILLING_SUBSCRIPTION_ACTIVATED:

            paypal_account = webhook_event["resource"]['subscriber']['email_address']
            paypal_subscribing_id = webhook_event["resource"]['id']
            subscription = Subscription.objects.get(paypal_subscribing_id=paypal_subscribing_id)

            subscription.paypal_account = paypal_account
            subscription.save()



        return HttpResponse()