# Generated by Django 5.0.4 on 2024-05-11 01:38

import chat.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0002_remove_message_timestamp_message_error_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='user_type',
            field=models.CharField(choices=[(chat.models.UserType['SYSTEM'], 'system'), (chat.models.UserType['AI'], 'ai'), (chat.models.UserType['USER'], 'user'), (chat.models.UserType['HUMAN'], 'human')], max_length=10),
        ),
    ]
