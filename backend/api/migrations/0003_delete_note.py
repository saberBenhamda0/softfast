# Generated by Django 4.2.4 on 2023-08-13 13:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_post_delete_person'),
    ]

    operations = [
        migrations.DeleteModel(
            name='Note',
        ),
    ]