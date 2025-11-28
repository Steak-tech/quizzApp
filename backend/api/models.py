from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Theme(models.Model):
    nom = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    image_url = models.URLField(blank=True)

    def __str__(self):
        return self.nom

class Question(models.Model):
    theme = models.ForeignKey(Theme, related_name='questions', on_delete=models.CASCADE)
    texte = models.TextField()
    choix = models.JSONField()  # List of choices
    reponse_correcte = models.CharField(max_length=255)

    def __str__(self):
        return self.texte


class Partie(models.Model):
    theme = models.ForeignKey(Theme, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Partie on {self.theme.nom} - Score: {self.score}"


class User(AbstractUser):
    # champs Django natifs : username, email, password, is_staff, is_active, etc.

    xp = models.IntegerField(default=0)
    niveau = models.IntegerField(default=1)
    avatar = models.CharField(max_length=255, blank=True)  # URL d'avatar par exemple
    rank = models.IntegerField(default=0)

    def __str__(self):
        return self.username

