# Generated by Django 5.0.4 on 2024-05-11 01:36

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0005_alter_content_messagetimestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='content',
            name='messageTimestamp',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2024, 5, 11, 1, 36, 46, 909405)),
        ),
    ]
