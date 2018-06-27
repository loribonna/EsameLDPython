from django.shortcuts import render
from datetime import datetime
# Create your views here.


def adminTravelsPage(request):
    context = {'travels': [
        {'startPos': {'lat': 42, 'lng': 12}, 'refoundRequest': 1, 'endPos': {'lat': 42, 'lng': 32},
            'cost': 12, 'startDateTime': datetime.now().isoformat()},
        {'startPos': {'lat': 42}, 'refoundRequest': 0, 'endPos': {'lat': 'a', 'lng': 32},
            'cost': 32, 'startDateTime': datetime.now().isoformat()}
    ]}
    return render(request, 'administrator/administrator.html', context=context)

def adminUsersPage(request):
    context = {'users': [
        {'name': 'a1', 'id': 'asgkbjd'}
        ]}
    return render(request, 'administrator/usersManage.html', context=context)