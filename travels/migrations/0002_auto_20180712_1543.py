# Generated by Django 2.0.5 on 2018-07-12 13:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('travels', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='travel',
            name='end_date_time',
            field=models.DateTimeField(blank=True),
        ),
        migrations.AlterField(
            model_name='travel',
            name='start_date_time',
            field=models.DateTimeField(blank=True),
        ),
    ]
