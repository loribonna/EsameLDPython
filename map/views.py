from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from drivers.models import Driver
from django.db.models import F, Q

def getLatLngFromString(str):
    return [float(s) for s in str.split(',')]


def map(request):
    return render(request, 'map/map.html')

def result(request):
    if 'start' in request.GET and 'end' in request.GET and 'sTime' in request.GET:
        startPos = getLatLngFromString(request.GET['start'])
        endPos = getLatLngFromString(request.GET['end'])
        sTime = request.GET['sTime']
        if startPos.__len__() == 2 and endPos.__len__() == 2:
            #TODO;
            print(startPos)
            drivers = Driver.objects.filter(common_start_pos_lat__gte=(startPos[0]))
            '''
            drivers = Driver.objects.filter(
                Q(common_start_pos_lat__gte=(startPos[0] - F('max_distance')), common_start_pos_lat__lte=(startPos[0] + F('max_distance'))),
                Q(common_start_pos_lng__gte=(startPos[1] - F('max_distance')), common_start_pos_lng__lte=(startPos[1] + F('max_distance'))),
                Q(common_start_pos_lng__gte=(endPos[1] - F('max_distance')), common_start_pos_lng__lte=(endPos[1] + F('max_distance'))),
                Q(common_start_pos_lat__gte=(endPos[0] - F('max_distance')), common_start_pos_lat__lte=(endPos[0] + F('max_distance'))),
                Q(time_avail__start_time__lte=(sTime - F('time_avail__duration')))
                )
            '''

            print(drivers)
            return render(request, 'result/result.html', context={
                'results': drivers})

    return redirect('/map')
