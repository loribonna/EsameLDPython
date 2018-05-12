from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def pageNotFound(request):
    return HttpResponse("Page Not Found")