from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect
from clients.models import Client
from authentication.models import UserBase
from drivers.models import Driver
from django.contrib.auth.models import User
from django.contrib.auth.models import Permission


def registerForm(request):
    if request.user.is_authenticated:
        logout(request)
    
    if 'username' in request.POST and 'password' in request.POST:
        username = request.POST['username']
        password = request.POST['password']

        if 'driver_enable' in request.POST:
            if User.objects.filter(username=username).exists():
                return render(request, 'register/register.html', context={'user_exists': True, 'user_data': {'user': username}})
            user = Driver.objects.create_user(
                username=username, password=password
            )
            permission = Permission.objects.get(name='DRIVER')
            user.user_permissions.add(permission)
            user.save()
            login(request, user)
            return redirect('/drivers/profile')
        else:
            if User.objects.filter(username=username).exists():
                return render(request, 'register/register.html', context={'user_exists': True, 'user_data': {'user': username}})
            user = Client.objects.create_user(
                username=username, password=password
            )
            permission = Permission.objects.get(name='CLIENT')
            user.user_permissions.add(permission)
            user.save()
            login(request, user)
            return redirect('/map')

    return render(request, 'register/register.html')


def loginForm(request):
    if 'username' in request.POST and 'password' in request.POST:
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                if user.is_superuser:
                    return redirect('/administrator')
                else:
                    usr = UserBase.objects.get(pk=user.pk)
                    if usr.black_listed == True:
                        return render(request, 'login/login.html', context={'blacklisted': True})
                    if user.has_perm('drivers.driver'):
                        return redirect('/drivers/profile')
                    if user.has_perm('clients.client'):
                        return redirect('/map')
            else:
                return render(request, 'login/login.html', context={'inactive': True})
        else:
            return render(request, 'login/login.html', context={'user_data': {'user': username, 'pass': password}})
    return render(request, 'login/login.html')


def logoutPage(request):
    logout(request)
    return redirect('/auth/login')
