from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import User, Partie, Question, Theme
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.timezone import now as Now


# Create your views here.
from django.http import JsonResponse
from .models import Theme


@api_view(["GET"])
def themes_list(request):
    data = list(Theme.objects.values())
    return JsonResponse(data, safe=False)


@api_view(["GET"])
def questions_list(request, theme_id):
    try:
        theme = Theme.objects.get(id=theme_id)
    except Theme.DoesNotExist:
        return Response(
            {"error": "Thème non trouvé"},
            status=status.HTTP_404_NOT_FOUND
        )

    questions = theme.questions.all()
    questions_data = [
        {
            "id": question.id,
            "texte": question.texte,
            "choix": question.choix,
            "reponse_correcte": question.reponse_correcte
        }
        for question in questions
    ]
    return Response(questions_data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response({
        "id": request.user.id,
        "username": request.user.username,
        "email": request.user.email,
        "avatar": request.user.avatar,
        "niveau": request.user.niveau,
        "xp": request.user.xp,
        "rank": request.user.rank
    })

@api_view(["POST"])
def register_user(request):

    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    avatar = request.data.get("avatar")

    if not username or not password:
        return Response(
            {"error": "Username et password sont requis"},
            status=status.HTTP_400_BAD_REQUEST
        )

    if User.objects.filter(username=username).exists():
        return Response(
            {"error": "Ce nom d'utilisateur existe déjà"},
            status=status.HTTP_409_CONFLICT
        )

    if User.objects.filter(email=email).exists():
        return Response(
            {"error": "Cet email est déjà utilisé"},
            status=status.HTTP_409_CONFLICT
        )

    user = User.objects.create_user(username=username, password=password, email=email, avatar=avatar)
    return Response(
        {"message": "Utilisateur créé avec succès"},
        status=status.HTTP_201_CREATED
    )

    refresh = RefreshToken.for_user(user)
    return Response({
        "message": "Utilisateur créé avec succès",
        "access": str(refresh.access_token),
        "refresh": str(refresh)
    }, status=status.HTTP_201_CREATED)

@api_view(["POST"])
def login_custom(request):
    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(request, username=username, password=password)
    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),

            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "avatar": user.avatar,
                "niveau": user.niveau,
                "xp": user.xp,
                "rank": user.rank
            }
        })
    else:
        return Response(
            {"error": "Identifiants invalides"},
            status=status.HTTP_401_UNAUTHORIZED
        )


@api_view(["POST"])
def refresh_custom(request):
    refresh_token = request.data.get("refresh")
    if not refresh_token:
        return Response(
            {"error": "Token de rafraîchissement requis"},
            status=status.HTTP_400_BAD_REQUEST
        )
    try:
        refresh = RefreshToken(refresh_token)
        access_token = str(refresh.access_token)
        return Response({"access": access_token})
    except Exception as e:
        return Response(
            {"error": "Token de rafraîchissement invalide"},
            status=status.HTTP_401_UNAUTHORIZED
        )

@api_view(['GET'])
def get_questions_by_theme(request, theme_id):
    # On récupère les questions liées à l'ID du thème
    questions = Question.objects.filter(theme_id=theme_id)
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def new_game(request):
    user = request.user
    theme_id = request.data.get("theme_id")
    score = request.data.get("score")

    try:
        theme = Theme.objects.get(id=theme_id)
    except Theme.DoesNotExist:
        return Response(
            {"error": "Thème non trouvé"},
            status=status.HTTP_404_NOT_FOUND
        )

    partie = Partie.objects.create(user=user, theme=theme, score=score, date=Now())
    return Response(
        {
            "message": "Nouvelle partie créée",
            "partie_id": partie.id
        },
        status=status.HTTP_201_CREATED
    )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def game_history(request, user_id):
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response(
            {"error": "Utilisateur non trouvé"},
            status=status.HTTP_404_NOT_FOUND
        )
    parties = Partie.objects.filter(user=user).order_by('-date')

    history_data = [
        {
            "partie_id": partie.id,
            "theme": partie.theme.nom,
            "score": partie.score,
            "date": partie.date
        }
        for partie in parties
    ]

    return Response(history_data)