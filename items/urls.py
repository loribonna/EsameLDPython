from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.itemsList, name='list'),
    url(r'^(?P<item_id>[0-9]+)$', views.item, name='item'),
    url(r'^(?P<item_id>[0-9]+)/(?P<section_name>[a-z]+)/$', views.itemSection, name='section')
]