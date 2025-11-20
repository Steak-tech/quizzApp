from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse
from .models import Theme

def themes_list(request):
    data = list(Theme.objects.values())
    return JsonResponse(data, safe=False)