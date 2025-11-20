from django.contrib import admin
from django.urls import path
from api.views import themes_list

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/themes/', themes_list),
]