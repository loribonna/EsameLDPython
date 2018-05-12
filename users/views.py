from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def users(request):
    print(request)
    return HttpResponse("Hello, world. You're at the polls index.")

def user(request):
    print(request)
    return HttpResponse("Hello, world. You're at the polls index.")
