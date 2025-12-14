from django.urls import path
from .views import me, themes_list, register_user,login_custom,refresh_custom, questions_list, get_questions_by_theme, new_game, game_history

urlpatterns = [
    path("me/", me),
    path("party/history/<int:user_id>/", game_history),
    path("themes/", themes_list),
    path("register/", register_user),
    path("login_custom/", login_custom),
    path("refresh_custom/", refresh_custom),
    path("themes/questions/<int:theme_id>/", questions_list),
    path("party/new-game", new_game),
]
