from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def map(request):
    return render(request, 'map/map.html')
