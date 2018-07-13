from django.shortcuts import render
from datetime import datetime
from travels.models import Travel
from django.core.exceptions import ObjectDoesNotExist
from drivers.models import Driver
from clients.models import Client
from django.contrib.auth.decorators import login_required, user_passes_test

def reportUser(usertype, id):
    try:
        user = None
        if usertype == 'autista':
            user = Driver.objects.get(pk=id)
        elif usertype == 'cliente':
            user = Client.objects.get(pk=id)
        else:
            return
        user.reportes += 1
        user.save()
    except ObjectDoesNotExist:
        print('User deleted error')

def blackListUser(usertype, id, blacklist_enable=True):
    try:
        user = None
        if usertype == 'autista':
            user = Driver.objects.get(pk=id)
        elif usertype == 'cliente':
            user = Client.objects.get(pk=id)
        else:
            return
        user.black_listed=blacklist_enable
        user.save()
    except ObjectDoesNotExist:
        print('User deleted error')

def checkAdminGroup(user):
    if user:
        return user.is_superuser
    return False

@login_required
@user_passes_test(checkAdminGroup, login_url='/auth/login')
def adminTravelsPage(request):
    if 'acceptRef' in request.GET:
        try:
            travel = Travel.objects.get(pk=request.GET['acceptRef'])
            travel.accpetRefRequest()
        except ObjectDoesNotExist:
            print('Travel deleted error')
    if 'removeTravel' in request.GET:
        try:
            Travel.objects.get(pk=request.GET['removeTravel']).delete()
        except ObjectDoesNotExist:
            print('Travel deleted error')
    travels = Travel.objects.filter(refound_request=True)
    context = {
        'travels': [t.getTravelDict() for t in travels]
    }
    return render(request, 'administrator/administrator.html', context=context)

@login_required
@user_passes_test(checkAdminGroup, login_url='/auth/login')
def adminUsersPage(request):
    if 'user_type' in request.GET:
        usertype=request.GET['user_type']
        if 'blackListUser' in request.GET:
            blackListUser(usertype, int(request.GET['blackListUser']))
        
        if 'unBlackListUser' in request.GET:
            blackListUser(usertype, int(request.GET['unBlackListUser']), False)

        if 'reportUser' in request.GET:
            reportUser(usertype, int(request.GET['reportUser']))
    
    drivers = Driver.objects.all()
    clients = Client.objects.all()
    context = {
        'drivers': [d.getDriverDict() for d in drivers],
        'clients': [c.getClientDict() for c in clients]
    }
    return render(request, 'usersManage/usersManage.html', context=context)