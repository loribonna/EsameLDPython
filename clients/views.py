from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime
from travels.models import Travel
from clients.models import Client
from drivers.models import Driver

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

@login_required
def travelsList(request):
    #TODO: verify
    if 'refundReq' in request.GET:
        travel=Travel.objects.get(pk=request.GET['refundReq'])
        travel.refound_request=True
        travel.save()
    elif 'reportDriver' in request.GET:
        travel=Travel.objects.get(pk=request.GET['reportDriver'])
        driver=Driver.objects.get(pk=travel.driver.pk)
        driver += 1
        driver.save()
    elif 'removeTravel' in request.GET:
        travel=Travel.objects.get(pk=request.GET['removeTravel']).delete()

    client=Client.objects.get(username = request.user)
    travels=Travel.objects.filter(client=client)
    context = {
        'travels': [getTravelContext(t) for t in travels]
    }
    return render(request, 'clients/clients.html', context=context)
