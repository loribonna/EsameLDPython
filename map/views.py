from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

def map(request):
    return render(request, 'map/map.html')

def result(request):
    return render(request, 'map/result.html', context={
        'results':[
            {'name': 'a', 'cost': 22},
            {'name': 'b', 'message': 'roba', 'cost': 15},
            {'name': 'b', 'cost': 15}
            ]})
