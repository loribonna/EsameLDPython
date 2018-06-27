from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^/login$', views.loginForm, name='login'),
    url(r'^/logout$', views.logoutPage, name='logout'),
]