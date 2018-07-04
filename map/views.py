from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from drivers.models import Driver
from clients.models import Client
from travels.models import Travel
from map.models import PosLatLng
from django.db.models import F, Q
from math import sin, cos, sqrt, atan2, radians

def getLatLngFromString(strng):
    str1 = strng.replace("[","").replace("]","")
    return [float(s) for s in str1.split(',')]

# Distance in Kilometers from
# https://andrew.hedges.name/experiments/haversine/
def calcDistance(startPos, endPos):
    # approximate radius of earth in km
    R = 6373.0
    dlon = endPos[1] - startPos[1]
    dlat = endPos[0] - startPos[0]
    a = sin(dlat / 2)**2 + cos(startPos[0]) * cos(endPos[0]) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

def createTempDriver(driver, startPos, endPos, sTime):
    price=calcDistance(startPos, endPos) * driver.rate_per_km   
    return {
        'fee': price,
        'start_date_time': sTime,
        'start_pos': startPos,
        'end_pos': endPos,
        'driver': {
            'id': driver.pk,
            'name': driver.username
        }
    }

def map(request):
    return render(request, 'map/map.html')

def result(request):
    if 'start' in request.GET and 'end' in request.GET and 'sTime' in request.GET:
        startPos = getLatLngFromString(request.GET['start'])
        endPos = getLatLngFromString(request.GET['end'])
        sTime = request.GET['sTime']
        if startPos.__len__() == 2 and endPos.__len__() == 2:

            drivers = Driver.objects.filter(common_start_pos_lat__gte=(startPos[0]))
            #TODO;
            '''
            drivers = Driver.objects.filter(
                Q(common_start_pos_lat__gte=(startPos[0] - F('max_distance')), common_start_pos_lat__lte=(startPos[0] + F('max_distance'))),
                Q(common_start_pos_lng__gte=(startPos[1] - F('max_distance')), common_start_pos_lng__lte=(startPos[1] + F('max_distance'))),
                Q(common_start_pos_lng__gte=(endPos[1] - F('max_distance')), common_start_pos_lng__lte=(endPos[1] + F('max_distance'))),
                Q(common_start_pos_lat__gte=(endPos[0] - F('max_distance')), common_start_pos_lat__lte=(endPos[0] + F('max_distance'))),
                Q(time_avail__start_time__lte=(sTime - F('time_avail__duration')))
                )
            '''

            context = [createTempDriver(d, startPos, endPos, sTime) for d in drivers]
            print(context)
            return render(request, 'result/result.html', context={'results': context})

    return redirect('/map')

def confirm(request):
    if ('fee' in request.GET
        and 'start_date_time' in request.GET
        and 'start_pos' in request.GET
        and 'end_pos' in request.GET
        and 'driver.id' in request.GET):
        start = getLatLngFromString(request.GET['start_pos'])
        startPos = PosLatLng.objects.create(
            lat=start[0],
            lng=start[1]
        )
        end = getLatLngFromString(request.GET['end_pos'])
        endPos = PosLatLng.objects.create(
            lat=end[0],
            lng=end[1]
        )
        driver = Driver.objects.get(id=request.GET['driver.id'])
        print(request.user)
        print("AAAAAAAAAA")
        client = Client.objects.get(username=request.user)
        if driver != None and client != None:
            startPos.save()
            endPos.save()

            travel = Travel.objects.create(
                start_date_time=request.GET['start_date_time'],
                start_pos=startPos,
                end_pos=endPos,
                driver=driver,
                client=client,
                fee=request.GET['fee'],
            )

            travel.save()

            return redirect('/clients')

    return redirect('/map')