# Generated by Django 2.0.5 on 2018-07-12 13:43

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drivers', '0002_auto_20180706_2102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timeavail',
            name='start_time',
            field=models.CharField(default=datetime.datetime(2018, 7, 12, 15, 43, 6, 392156), max_length=5),
        ),
    ]
