from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def travelsList(request):
    return render(request, 'drivers/drivers.html')