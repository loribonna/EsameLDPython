from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.loginForm, name='login'),
]