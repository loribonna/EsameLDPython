from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.travelsList, name='driversTravelsList'),
    url(r'^/profile$', views.driverProfile, name='driversProfile'),
]