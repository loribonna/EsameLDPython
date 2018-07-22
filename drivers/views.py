from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required, permission_required
from datetime import datetime
from .models import Driver, TimeAvail
from travels.models import Travel
from map.models import PosLatLng

@login_required
@permission_required("drivers.driver")
def travelsList(request):
    travels = Travel.objects.filter(driver__username=request.user)
    context = {
        'travels': [t.getTravelDict() for t in travels]
    }
    return render(request, 'drivers/drivers.html', context=context)


@login_required
@permission_required("drivers.driver")
def driverProfile(request):
    driver = Driver.objects.get(username=request.user.username)

    if ('rate_per_km' in request.POST
        and 'common_start_pos.lat' in request.POST
        and 'common_start_pos.lng' in request.POST
        and 'max_distance' in request.POST
        and 'start_time' in request.POST
        and 'duration' in request.POST):

        time_avail = TimeAvail.objects.create(
            start_time=request.POST['start_time'],
            duration=request.POST['duration']
        )

        pos, created = PosLatLng.objects.get_or_create(
            lat=request.POST['common_start_pos.lat'],
            lng=request.POST['common_start_pos.lng']
        )
        time_avail.save()
        driver.rate_per_km=request.POST['rate_per_km']
        driver.info=request.POST['info']
        driver.common_start_pos=pos
        driver.max_distance=request.POST['max_distance']
        driver.time_avail=time_avail
        driver.save()

        return redirect('/drivers')

    context = {
        'userData': driver.getDriverDict()
    }
        
    return render(request, 'profile/profile.html', context=context)
