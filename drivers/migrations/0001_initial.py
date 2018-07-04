# Generated by Django 2.0.5 on 2018-07-04 18:34

import datetime
import django.contrib.auth.models
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Driver',
            fields=[
                ('userbase_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='authentication.UserBase')),
                ('rate_per_km', models.PositiveIntegerField(default=0)),
                ('common_start_pos_lat', models.FloatField(default=45)),
                ('common_start_pos_lng', models.FloatField(default=12)),
                ('max_distance', models.PositiveIntegerField(default=0)),
            ],
            options={
                'permissions': (('driver', 'DRIVER'),),
            },
            bases=('authentication.userbase',),
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='TimeAvail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_time', models.CharField(default=datetime.datetime(2018, 7, 4, 20, 34, 45, 9924), max_length=5)),
                ('duration', models.PositiveIntegerField(default=0)),
            ],
        ),
        migrations.AddField(
            model_name='driver',
            name='time_avail',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='drivers.TimeAvail'),
        ),
    ]
