from django.urls import path
from .views import me, themes_list, register_user,login_custom,refresh_custom, questions_list   

urlpatterns = [
    path("me/", me),
    path("themes/", themes_list),
    path("register/", register_user),
    path("login_custom/", login_custom),
    path("refresh_custom/", refresh_custom),
    path("themes/questions/<int:theme_id>/", questions_list),
]
