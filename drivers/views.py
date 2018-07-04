from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime
from .models import Driver, TimeAvail

def getFieldIfExists(field):
    if field != None:
        return field
    return ''

@login_required
def travelsList(request):
    context = {'travels': [
        {'startPos': {'lat': 42, 'lng': 12}, 'endPos': {'lat': 42, 'lng': 32},
            'cost': 12, 'startDateTime': datetime.now().isoformat()},
        {'startPos': {'lat': 42}, 'endPos': {'lat': 'a', 'lng': 32},
            'cost': 32, 'startDateTime': datetime.now().isoformat()}
    ]}
    return render(request, 'drivers/drivers.html', context=context)


@login_required
def driverProfile(request):
    driver = Driver.objects.get(username=request.user)

    if ('name' in request.POST
        and 'rate_per_km' in request.POST
        and 'common_start_pos.lat' in request.POST
        and 'common_start_pos.lng' in request.POST
        and 'max_distance' in request.POST
        and 'start_time' in request.POST
        and 'duration' in request.POST):
        print("A")
        time_avail = TimeAvail.objects.create(
            start_time=request.POST['start_time'],
            duration=request.POST['duration']
        )
        time_avail.save()
        driver.rate_per_km=request.POST['rate_per_km']
        driver.name=request.POST['name']
        driver.info=request.POST['info']
        driver.common_start_pos_lat=request.POST['common_start_pos.lat']
        driver.common_start_pos_lng=request.POST['common_start_pos.lng']
        driver.max_distance=request.POST['max_distance']
        driver.time_avail=time_avail
        driver.save()

        return redirect('/drivers')

    context = {
        'userData': {
            'user': getFieldIfExists(driver.username),
            'info': getFieldIfExists(driver.info),
            'rate_per_km': getFieldIfExists(driver.rate_per_km),
            'common_start_pos': {
                'lat': getFieldIfExists(driver.common_start_pos_lat),
                'lng': getFieldIfExists(driver.common_start_pos_lng)
            },
            'max_distance': getFieldIfExists(driver.max_distance),
            'start_time': '',
            'duration': ''
        }
    }
    if driver.time_avail != None:
        context['userData']['start_time'] = getFieldIfExists(driver.time_avail.start_time)
        context['userData']['duration']= getFieldIfExists(driver.time_avail.duration)
        
    print(context)
    return render(request, 'profile/profile.html', context=context)
