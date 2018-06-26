from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

def travelsList(request):
    return render(request, 'clients/clients.html')
    #context = {'days': [2, 4, 6]}
    #return render(request, 'items/items.html', context=context)