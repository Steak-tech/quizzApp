"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // useParams pour récupérer l'ID
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function PlayPage() {
    const { id } = useParams(); // Récupère le paramètre [id] de l'URL
    const router = useRouter();
    //get the current user id
    const { user } = useContext(AuthContext);
    const { isLoggedIn } = useContext(AuthContext);
    const token = localStorage.getItem("token");

    // États du jeu
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    // États d'interface
    const [loading, setLoading] = useState(true);
    const [gameFinished, setGameFinished] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Pour l'effet visuel du clic

    useEffect(() => {
        if (!id) return;

        axios.get(`http://127.0.0.1:8000/api/themes/questions/${id}`)
            .then(res => {
                setQuestions(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erreur chargement questions", err);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (gameFinished && isLoggedIn) {
            try {axios.post("http://127.0.0.1:8000/api/party/new-game", {
                theme_id: id,
                score: score,
                user: user
            },
                {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            ).then(
            response => {
                console.log("Partie enregistré avec succès :", response.data);
            }
            )} catch (error) {
                console.error("Erreur lors de l'enregistrement de la partie :", error);
            }
        }
    }, [gameFinished, score, id, isLoggedIn, user, token]);

    // Gestion du clic sur une réponse
    const handleAnswer = (choixUtilisateur) => {
        setSelectedAnswer(choixUtilisateur);

        setTimeout(() => {
            const currentQuestion = questions[currentQuestionIndex];

            // Vérification de la réponse
            if (choixUtilisateur === currentQuestion.reponse_correcte) {
                setScore(score + 1);
            }

            // Passage à la question suivante ou fin du jeu
            if (currentQuestionIndex + 1 < questions.length) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedAnswer(null);
            } else {
                setGameFinished(true);
            }
        }, 500); // 500ms de délai
    };

    // --- ÉCRAN DE CHARGEMENT ---
    if (loading) return (
        <div className="min-h-screen bg-[#1A0105] flex items-center justify-center text-[#D4AF37] font-['Playfair_Display'] animate-pulse text-2xl">
            Préparation du duel...
        </div>
    );

    // --- ÉCRAN DE FIN ---
    if (gameFinished)
        return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#5E0312] to-[#1A0105]">
            <div className="bg-[#1F1F1F] p-10 rounded-3xl border border-[#D4AF37] text-center shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                <h1 className="text-4xl font-['Playfair_Display'] text-[#D4AF37] mb-4">Partie Terminée</h1>
                <p className="text-[#F5D0C5] font-['Lato'] text-xl mb-8">
                    Votre score : <span className="font-bold text-[#D4AF37] text-3xl">{score} / {questions.length}</span>
                </p>
                <button
                    onClick={() => router.push('/')}
                    className="px-8 py-3 bg-[#C00929] text-[#F5D0C5] font-bold rounded-lg hover:bg-[#A00722] transition-colors"
                >
                    Retour à l'accueil
                </button>
            </div>
        </div>
    );

    // --- CAS : PAS DE QUESTIONS ---
    if (questions.length === 0) return (
        <div className="min-h-screen bg-[#1A0105] flex flex-col items-center justify-center text-[#F5D0C5]">
            <p className="mb-4">Aucune question trouvée pour ce thème.</p>
            <button onClick={() => router.push('/themes')} className="text-[#D4AF37] underline">Retour</button>
        </div>
    );

    const currentQuestion = questions[currentQuestionIndex];

    // --- ÉCRAN DE JEU ---
    return (
        <main className="min-h-screen w-full bg-gradient-to-b from-[#5E0312] to-[#1A0105] p-6 flex flex-col items-center justify-center">

            {/* Barre de progression */}
            <div className="w-full max-w-2xl mb-8">
                <div className="flex justify-between text-[#F5D0C5]/60 text-sm font-['Lato'] mb-2 uppercase tracking-widest">
                    <span>Question {currentQuestionIndex + 1}</span>
                    <span>{questions.length} total</span>
                </div>
                <div className="h-2 w-full bg-[#1A0105] rounded-full overflow-hidden border border-[#D4AF37]/20">
                    <div
                        className="h-full bg-[#D4AF37] transition-all duration-500 ease-out shadow-[0_0_10px_rgba(212,175,55,0.5)]"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Carte de la Question */}
            <div className="w-full max-w-2xl">
                <div className="bg-[#1F1F1F] p-8 md:p-12 rounded-3xl border border-[#D4AF37]/30 shadow-2xl mb-8 relative">
                    {/* Décoration coin */}
                    <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-3xl opacity-50"></div>
                    <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37] rounded-br-3xl opacity-50"></div>

                    <h2 className="text-2xl md:text-3xl font-['Playfair_Display'] font-bold text-[#F5D0C5] text-center leading-relaxed">
                        {currentQuestion.texte}
                    </h2>
                </div>

                {/* Grille des réponses */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQuestion.choix.map((choix, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(choix)}
                            disabled={selectedAnswer !== null} // Empêche de cliquer 2 fois
                            className={`
                                py-4 px-6 rounded-xl font-['Lato'] font-bold text-lg transition-all duration-300 transform hover:-translate-y-1
                                border-2 
                                ${selectedAnswer === choix && choix === currentQuestion.reponse_correcte
                                ? "bg-[#4CAF50] text-white border-[#4CAF50] shadow-[0_0_20px_rgba(76,175,80,0.4)]"
                                : selectedAnswer === choix && choix !== currentQuestion.reponse_correcte
                                ? "bg-[#C00929] text-white border-[#C00929] shadow-[0_0_20px_rgba(192,9,41,0.4)]"
                                : selectedAnswer === null && choix === currentQuestion.reponse_correcte
                            }
                            `}
                        >
                            {choix}
                        </button>
                    ))}
                </div>
            </div>
        </main>
    );
}