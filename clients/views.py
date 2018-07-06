from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime
from travels.models import Travel
from clients.models import Client
from drivers.models import Driver
from django.core.exceptions import ObjectDoesNotExist

@login_required
def travelsList(request):
    #TODO: verify
    if 'refundReq' in request.GET:
        try:
            travel=Travel.objects.get(pk=request.GET['refundReq'])
            travel.refound_request=True
            travel.save()
        except ObjectDoesNotExist:
            print('Travel deleted error')

    if 'reportDriver' in request.GET:
        try:
            travel=Travel.objects.get(pk=request.GET['reportDriver'])
            driver=Driver.objects.get(pk=travel.driver.pk)
            driver.reports += 1
            driver.save()
        except ObjectDoesNotExist:
            print('Travel deleted error')
    if 'removeTravel' in request.GET:
        try:
            travel=Travel.objects.get(pk=request.GET['removeTravel']).delete()
        except ObjectDoesNotExist:
            print('Travel double delete error')

    client=Client.objects.get(username = request.user)
    travels=Travel.objects.filter(client=client)
    context = {
        'travels': [t.getTravelDict() for t in travels]
    }
    return render(request, 'clients/clients.html', context=context)
