from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

# Create your views here.
from django.http import JsonResponse
from .models import Theme

def themes_list(request):
    data = list(Theme.objects.values())
    return JsonResponse(data, safe=False)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response({
        "id": request.user.id,
        "username": request.user.username,
        "email": request.user.email
    })
