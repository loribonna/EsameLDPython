from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from clients.models import Client
from drivers.models import Driver
from django.contrib.auth.models import Permission

def registerForm(request):
    if 'username' in request.POST and 'password' in request.POST:
        username = request.POST['username']
        password = request.POST['password']
        
        driver_enable = None
        if 'driver_enable' in request.POST:
            driver_enable = request.POST['driver_enable']

        if driver_enable != None:
            if Driver.objects.filter(username=username).exists():
                return render(request, 'register/register.html', context={'user_exists': True, 'user_data': {'user': username}})
            user = Driver.objects.create_user(
                username=username, password=password
            )
            permission = Permission.objects.get(name='DRIVER')
            user.user_permissions.add(permission)
            user.save()
            return redirect('/drivers')
        else:
            if Client.objects.filter(username=username).exists():
                return render(request, 'register/register.html', context={'user_exists': True, 'user_data': {'user': username}})
            user = Client.objects.create_user(
                username=username, password=password
            )
            permission = Permission.objects.get(name='CLIENT')
            user.user_permissions.add(permission)
            user.save()
            return redirect('/clients')

    else:
        return render(request, 'register/register.html', context={'user_data': {'user': username, 'pass': password}})


def loginForm(request):
    if 'username' in request.POST and 'password' in request.POST:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                if user.has_perm('drivers.driver'):
                    return redirect('/drivers')
                if user.has_perm('administrator.admin'):
                    return redirect('/admin')
                if user.has_perm('clients.client'):
                    return redirect('/clients')
            else:
                return render(request, 'login/login.html', context={'inactive': True})
        else:
            return render(request, 'login/login.html', context={'user_data': {'user': username,'pass': password}})
    return render(request, 'login/login.html')


def logoutPage(request):
    logout(request)
    return redirect('/auth/login')
