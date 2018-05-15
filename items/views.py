from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.


def itemsList(request):
    context = {'days': [2, 4, 6]}
    return render(request, 'items/items.html', context=context)


def item(request, item_id):
    return HttpResponse("item id "+item_id.__str__())


def itemSection(request, item_id, section_name):
    return HttpResponse("item id "+item_id.__str__()+" section name "+section_name.__str__())
