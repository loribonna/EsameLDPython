from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import redirect

def loginForm(request):
    if 'username' in request.POST and 'password' in request.POST:
        user=request.POST['username']
        password=request.POST['password']
        user=authenticate(username=user, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return redirect('/clients/')
            else:
                context={
                    'inactive': True
                }
                return render(request, 'login/login.html', context=context)
        else:
            return render(request, 'login/login.html')
    else:
        return render(request, 'login/login.html')

def logoutPage(request):
    logout(request)
    return redirect('/auth/login')