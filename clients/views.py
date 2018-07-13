from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required, user_passes_test
from datetime import datetime
from travels.models import Travel
from clients.models import Client
from drivers.models import Driver
from django.core.exceptions import ObjectDoesNotExist


def sendTravelList(request, error=None):
    client = Client.objects.get(username=request.user)
    travels = Travel.objects.filter(client=client)
    context = {
        'travels': [t.getTravelDict() for t in travels],
        'error': error
    }
    return render(request, 'clients/clients.html', context=context)


def checkClientGroup(user):
    if user:
        return user.has_perm("clients.client")
    return False

@login_required
@user_passes_test(checkClientGroup, login_url='/auth/login')
def travelsList(request):
    if 'refundReq' in request.GET:
        try:
            travel = Travel.objects.get(pk=request.GET['refundReq'])

            if travel.client.username != request.user.username:
                return sendTravelList(request, error='Permission Error')
            travel.refound_request = True
            travel.save()
        except ObjectDoesNotExist:
            return sendTravelList(request, error='Travel not exists')

    if 'reportDriver' in request.GET:
        try:
            travel = Travel.objects.get(pk=request.GET['reportDriver'])
            if travel.client.username != request.user.username:
                return sendTravelList(request, error='Permission Error')
            status = travel.reportDriver()
            if not status:
                return sendTravelList(request, error="Double report error")
        except ObjectDoesNotExist:
            return sendTravelList(request, error='Travel not exists')
    if 'removeTravel' in request.GET:
        try:
            travel = Travel.objects.get(pk=request.GET['removeTravel'])
            if not travel.isRemovable() or travel.client.username != request.user.username:
                return sendTravelList(request, error='Permission Error')
            travel.delete()
            
        except ObjectDoesNotExist:
            return sendTravelList(request, error='Travel not exists')

    return sendTravelList(request)
