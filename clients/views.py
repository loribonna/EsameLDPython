from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime

def travelsList(request):
    #TODO
    context = {'travels': [
        {'startPos': {'lat': 42, 'lng': 12}, 'endPos': {'lat': 42, 'lng': 32},
            'cost': 12, 'startDateTime': datetime.now().isoformat()},
        {'startPos': {'lat': 42}, 'endPos': {'lat': 'a', 'lng': 32},
            'cost': 32, 'startDateTime': datetime.now().isoformat()}
    ]}
    print(request.GET)
    return render(request, 'clients/clients.html', context=context)
