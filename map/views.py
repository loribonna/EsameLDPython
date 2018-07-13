from math import sin, cos, sqrt, atan2
from datetime import datetime
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required, user_passes_test
from drivers.models import Driver
from clients.models import Client
from travels.models import Travel
from map.models import PosLatLng
from django.db.models import F

def checkClientGroup(user):
    if user:
        return user.has_perm("clients.client")
    return False

def getInt(strng):
    return int(strng)

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


def getLatLngFromString(strng):
    str1 = strng.replace("[", "").replace("]", "")
    return [float(s) for s in str1.split(',')]


def getDeltaTime(timeA, timeB):
    partsA = timeA.split(':')
    partsB = timeB.split(':')
    if partsA.__len__() == 2 and partsB.__len__() == 2:
        return (getInt(partsB[0])-getInt(partsA[0])) * 60 + (getInt(partsB[1])-getInt(partsA[1]))
    return 0


def checkInnerPos(centerLat, centerLng, filterLat, filterLng, filterRange):
    return calcDistance(startPos=[centerLat, centerLng], endPos=[filterLat, filterLng]) <= filterRange


def checkValidDriver(driver, startPos, endPos, sTime):
    return driver.isDBConsistent() and driver.isValid() and checkInnerPos(
        centerLat=driver.common_start_pos.lat,
        centerLng=driver.common_start_pos.lng,
        filterLat=startPos[0],
        filterLng=startPos[1],
        filterRange=driver.max_distance
    ) and checkInnerPos(
        centerLat=driver.common_start_pos.lat,
        centerLng=driver.common_start_pos.lng,
        filterLat=endPos[0],
        filterLng=endPos[1],
        filterRange=driver.max_distance
    ) and getDeltaTime(driver.time_avail.start_time, sTime) <= (getInt(driver.time_avail.duration) * 60)


def createTempTravel(driver, startPos, endPos, sTime, sDay):
    price = calcDistance(startPos, endPos) * driver.rate_per_km
    time_parts = sTime.split(':')
    day_parts = sDay.split('/')
    if time_parts.__len__() == 2:
        year = int(day_parts[2]) if day_parts[2].__len__() == 4 else 2000 + int(day_parts[2])
        start_date_time = datetime(year, int(day_parts[1]), int(
            day_parts[0]), int(time_parts[0]), int(time_parts[1]))
        return {
            'fee': price,
            'start_date_time': start_date_time.isoformat(),
            'start_pos': startPos,
            'end_pos': endPos,
            'driver': {
                'id': driver.pk,
                'name': driver.username
            }
        }
    return {}

@login_required
@user_passes_test(checkClientGroup, login_url='/auth/login')
def mapView(request):
    return render(request, 'map/map.html')


@login_required
@user_passes_test(checkClientGroup, login_url='/auth/login')
def result(request):
    if 'start' in request.GET and 'end' in request.GET and 'sTime' in request.GET and 'sDay' in request.GET:
        startPos = getLatLngFromString(request.GET['start'])
        endPos = getLatLngFromString(request.GET['end'])
        sTime = request.GET['sTime']
        sDay = request.GET['sDay']
        if startPos.__len__() == 2 and endPos.__len__() == 2:
            drivers = [d for d in Driver.objects.all() if checkValidDriver(d, startPos, endPos, sTime)]
            context = [createTempTravel(d, startPos, endPos, sTime, sDay) for d in drivers]
            return render(request, 'result/result.html', context={'results': context})

    return redirect('/map')


@login_required
@user_passes_test(checkClientGroup, login_url='/auth/login')
def confirm(request):
    if ('fee' in request.POST
        and 'start_date_time' in request.POST
        and 'start_pos.lat' in request.POST
        and 'start_pos.lon' in request.POST
        and 'end_pos.lat' in request.POST
        and 'end_pos.lon' in request.POST
            and 'driver.id' in request.POST):
        startPos = PosLatLng.objects.create(
            lat=request.POST['start_pos.lat'],
            lng=request.POST['start_pos.lon']
        )
        endPos = PosLatLng.objects.create(
            lat=request.POST['end_pos.lat'],
            lng=request.POST['end_pos.lon']
        )
        driver = Driver.objects.get(id=request.POST['driver.id'])
        client = Client.objects.get(username=request.user)
        if driver != None and client != None:
            startPos.save()
            endPos.save()
            travel = Travel.objects.create(
                start_date_time=request.POST['start_date_time'],
                start_pos=startPos,
                end_pos=endPos,
                driver=driver,
                client=client,
                fee=request.POST['fee'],
            )
            travel.save()

            return redirect('/clients')

    return render(request, 'confirm/confirm_travel.html')
