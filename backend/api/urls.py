from django.urls import path
from .views import me, themes_list

urlpatterns = [
    path("me/", me),
    path("themes/", themes_list),
]
