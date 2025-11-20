from django.contrib import admin
from .models import Theme
from .models import User
from django.contrib.auth.admin import UserAdmin
# Register your models here.

admin.site.register(Theme)

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    fieldsets = UserAdmin.fieldsets + (
        ("Progression", {"fields": ("xp", "niveau", "avatar", "rank")}),
    )

    list_display = ("username", "email", "xp", "niveau", "is_staff", "rank")