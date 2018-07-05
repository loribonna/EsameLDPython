from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime
from travels.models import Travel
from clients.models import Client

def getTravelContext(travel):
    if travel.driver != None:
        return {
            'fee': travel.fee,
            'driver': travel.getDriverName(),
            'start_date_time': travel.getStartDate(),
            'end_date_time': travel.getEndDate(),
            'start_pos': travel.getStartLatLng(),
            'end_pos': travel.getEndLatLng(),
            'refound_request': travel.getRefReq(),
            'id': travel.pk
        }
    return {}

def travelsList(request):
    client=Client.objects.get(username = request.user)
    travels=Travel.objects.filter(client=client)
    context = {
        'travels': [getTravelContext(t) for t in travels]
    }
    return render(request, 'clients/clients.html', context=context)
