# Generated by Django 5.0.4 on 2024-05-08 07:30

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('content', '0003_alter_content_messagetimestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='content',
            name='messageTimestamp',
            field=models.DateTimeField(blank=True, default=datetime.datetime(2024, 5, 8, 7, 30, 53, 639979)),
        ),
    ]
