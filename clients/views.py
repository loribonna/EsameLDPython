from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required
from datetime import datetime

def travelsList(request):
    context = {'travels': [
        {'start': 'a', 'end': 'b', 'cost': 12, 'dt': datetime.now().isoformat()},
        {'start': 'a1', 'end': 'b1', 'cost': 32, 'dt': datetime.now().isoformat()}
        ]}
    print(context)
    return render(request, 'clients/clients.html', context=context)
    #return render(request, 'items/items.html', context=context)