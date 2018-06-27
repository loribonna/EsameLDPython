from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.adminTravelsPage, name='adminTravelsPage'),
    url(r'^/users$', views.adminUsersPage, name='adminUsersPage')
]