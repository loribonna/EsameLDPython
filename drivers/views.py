from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime

def travelsList(request):
    context = {'travels': [
        {'startPos': {'lat': 42, 'lng': 12}, 'endPos': {'lat': 42, 'lng': 32},
            'cost': 12, 'startDateTime': datetime.now().isoformat()},
        {'startPos': {'lat': 42}, 'endPos': {'lat': 'a', 'lng': 32},
            'cost': 32, 'startDateTime': datetime.now().isoformat()}
    ]}
    return render(request, 'drivers/drivers.html', context=context)

def driverProfile(request):
    context = {'userData': {
        'id': "00000",
        'name': "nome",
        'info': 'roba',
        'ratePerKM': 123,
        'commonStartPos': {'lat': 12, 'lng': 43},
        'maxDistance': 3332,
        'timeAvail': {'startTime': '9:30', 'duration': 12}
    }}
    return render(request, 'drivers/profile.html', context=context)
