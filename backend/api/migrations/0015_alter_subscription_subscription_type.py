# Generated by Django 4.2.4 on 2024-09-27 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_subscription_paypal_plan_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='subscription',
            name='subscription_type',
            field=models.CharField(max_length=40),
        ),
    ]
