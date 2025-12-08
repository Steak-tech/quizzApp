"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext"; // Vérifie le chemin d'import

export default function ProfilePage() {
    const router = useRouter();
    
    // On récupère la fonction Disconect du context
    const { Disconect, isLoggedIn } = useContext(AuthContext); 
    
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fonction de déconnexion gérée par ton Context
    const handleLogout = () => {
        Disconect(); // Vide le state et le localStorage via ton Context
        router.push("/login"); 
    };

    useEffect(() => {
        // Si le context dit qu'on n'est pas connecté (après initialisation), on redirige
        // Note: Parfois le context met quelques ms à s'initialiser, d'où le check du token en backup
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login");
            return;
        }

        const fetchProfile = async () => {
            try {
                // On récupère les données FRAÎCHES (XP, Niveau actuel) depuis le serveur
                const res = await axios.get("http://127.0.0.1:8000/api/me/", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfileData(res.data);
            } catch (err) {
                console.error("Erreur chargement profil", err);
                if (err.response && err.response.status === 401) {
                    // Token expiré ou invalide
                    handleLogout();
                }
            } finally {
                setLoading(false);
            }
        };
        console.log(profileData);
        

        fetchProfile();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1A0105] flex items-center justify-center">
                <div className="text-[#D4AF37] font-['Playfair_Display'] text-xl animate-pulse">
                    Ouverture du grimoire...
                </div>
            </div>
        );
    }

    if (!profileData) return null;

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@900&display=swap');
            `}</style>

            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#5E0312] to-[#1A0105] p-4 py-10">
                
                {/* Carte Principale */}
                <div className="w-full max-w-2xl bg-[#1F1F1F] rounded-3xl shadow-2xl border border-[#F5D0C5]/10 relative overflow-hidden animate-fadeIn">
                    
                    {/* Bannière Décorative (Haut) */}
                    <div className="h-32 w-full bg-gradient-to-r from-[#5E0312] via-[#C00929] to-[#5E0312] relative">
                         {/* Liseré Or */}
                         <div className="absolute bottom-0 w-full h-1 bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
                    </div>

                    {/* Contenu du Profil */}
                    <div className="px-8 pb-8">
                        
                        {/* Bloc Avatar (chevauche la bannière) */}
                        <div className="relative -mt-16 mb-6 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37] bg-[#1A0105] p-1 shadow-lg z-10 group transition-transform hover:scale-105">
                                <img 
                                    src={profileData.avatar} 
                                    alt="Avatar" 
                                    className="w-full h-full rounded-full bg-[#1F1F1F]"
                                />
                            </div>
                            <h1 className="mt-4 text-4xl font-['Playfair_Display'] font-black text-[#D4AF37] tracking-wide drop-shadow-md">
                                {profileData.username}
                            </h1>
                            <p className="text-[#F5D0C5]/60 font-['Lato'] uppercase text-xs tracking-widest mt-1">
                                {profileData.email}
                            </p>
                        </div>

                        {/* Grille de Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <StatBox label="Niveau" value={profileData.niveau || 1} icon="⚡" />
                            <StatBox label="XP" value={profileData.xp || 0} icon="✨" />
                            <StatBox label="Rang" value={`#${profileData.rank || 0}`} icon="🏆" />
                        </div>

                        {/* Boutons d'action */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => router.push('/')}
                                className="flex-1 py-3 border border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg hover:bg-[#D4AF37]/10 transition-colors font-['Lato'] uppercase tracking-wider text-sm"
                            >
                                Retour au menu
                            </button>
                            <button 
                                onClick={handleLogout}
                                className="flex-1 py-3 bg-[#C00929] text-[#F5D0C5] font-bold rounded-lg hover:bg-[#90061E] transition-all hover:shadow-[0_0_20px_rgba(192,9,41,0.4)] font-['Lato'] uppercase tracking-wider text-sm"
                            >
                                Se déconnecter
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

// Composant pour les cases de stats (Réutilisable)
function StatBox({ label, value, icon }) {
    return (
        <div className="bg-[#1A0105]/60 border border-[#D4AF37]/20 rounded-xl p-4 flex flex-col items-center justify-center hover:border-[#D4AF37] transition-all duration-300 group hover:-translate-y-1">
            <span className="text-2xl mb-1 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{icon}</span>
            <span className="font-['Playfair_Display'] font-black text-2xl text-[#F5D0C5] group-hover:text-[#D4AF37] transition-colors">{value}</span>
            <span className="text-[#D4AF37]/70 text-[10px] uppercase font-bold tracking-widest mt-1">{label}</span>
        </div>
    );
}