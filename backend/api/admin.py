from django.contrib import admin
from . import models

# Register your models here.

admin.site.register(models.Post)
admin.site.register(models.Chat)
admin.site.register(models.Conversation)
admin.site.register(models.Profile)
admin.site.register(models.Order)
admin.site.register(models.Subscription)
admin.site.register(models.CostumeUser)