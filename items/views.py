from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def itemsList(request):
    print(request)
    return HttpResponse("Hello, world. You're at the polls index.")

def item(request):
    print(request)
    return HttpResponse("Hello, world. You're at the polls index.")

def itemSection(request):
    print(request)
    return HttpResponse("Hello, world. You're at the polls index.")
