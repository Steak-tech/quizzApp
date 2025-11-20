from django.http import JsonResponse
from django.urls import path

def ping(request):
    return JsonResponse({"message": "pong depuis Django !"})

urlpatterns = [
    path('ping/', ping),
]