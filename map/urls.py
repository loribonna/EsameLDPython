from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.mapView, name='map'),
    url(r'^/calc$', views.result, name='results'),
    url(r'^/confirm$', views.confirm, name='confirmTravel'),
]
