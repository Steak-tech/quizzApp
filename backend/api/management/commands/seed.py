import random
from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from api.models import Theme, Question, Partie  # Assurez-vous que l'app est bien 'api'

User = get_user_model()

class Command(BaseCommand):
    help = "Seed la base de données avec des données de test simples"

    def handle(self, *args, **options):
        self.stdout.write("Nettoyage de la base de données...")
        Partie.objects.all().delete()
        Question.objects.all().delete()
        Theme.objects.all().delete()
        User.objects.all().delete()

        # 1. Création des Thèmes
        self.stdout.write("Création des thèmes...")
        themes_data = [
            {"nom": "Histoire", "desc": "Les grands événements du monde", "img": "https://placehold.co/400x200?text=Histoire"},
            {"nom": "Science", "desc": "Découvertes et technologies", "img": "https://placehold.co/400x200?text=Science"},
            {"nom": "Cinéma", "desc": "Films cultes et acteurs", "img": "https://placehold.co/400x200?text=Cinema"},
        ]
        
        themes_objs = []
        for t in themes_data:
            theme = Theme.objects.create(
                nom=t["nom"],
                description=t["desc"],
                image_url=t["img"]
            )
            themes_objs.append(theme)

        # 2. Création des Questions
        self.stdout.write("Création des questions...")
        for theme in themes_objs:
            for i in range(1, 6): # 5 questions par thème
                Question.objects.create(
                    theme=theme,
                    texte=f"Question {i} sur le thème {theme.nom} ?",
                    choix=["Réponse A", "Réponse B", "Réponse C", "Réponse D"], # Format JSON simple
                    reponse_correcte="Réponse A"
                )

        # 3. Création des Utilisateurs
        self.stdout.write("Création des utilisateurs...")
        
        # Superuser (pour accéder à l'admin)
        admin = User.objects.create_superuser(
            username="admin", 
            email="admin@test.com", 
            password="admin",
            xp=1000,
            niveau=5,
            rank=1
        )

        # Utilisateur de test (pour le front)
        joueur = User.objects.create_user(
            username="joueur", 
            email="joueur@test.com", 
            password="password",
            xp=150,
            niveau=2,
            avatar="https://i.pravatar.cc/150?img=12"
        )

        # 4. Création d'historique de Parties (pour tester l'affichage des scores)
        self.stdout.write("Création des parties (historique)...")
        for _ in range(3):
            Partie.objects.create(
                user=joueur,
                theme=random.choice(themes_objs),
                score=random.randint(0, 100) # Score au hasard
            )

        self.stdout.write(self.style.SUCCESS("✅ Base de données peuplée avec succès !"))
        self.stdout.write(f"Admin: admin / admin")
        self.stdout.write(f"Joueur: joueur / password")