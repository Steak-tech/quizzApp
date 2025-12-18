"use client";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
    const router = useRouter();

    const { Disconect, isLoggedIn, user, authLoading } = useContext(AuthContext);

    // État pour stocker l'historique des parties
    const [history, setHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);

    useEffect(() => {
        if (authLoading) return;

        if (!isLoggedIn) {
            router.push("/login");
        }
    }, [authLoading, isLoggedIn, router]);

-    useEffect(() => {
        const fetchHistory = async () => {
            if (!user || !user.id) return;

            const token = localStorage.getItem("token");
            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/party/history/${user.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setHistory(res.data); // On stocke les données dans le state
            } catch (err) {
                console.error("Erreur chargement historique", err);
            } finally {
                setLoadingHistory(false);
            }
        };

        fetchHistory();
    }, [user]);

    const handleLogout = () => {
        Disconect();
        router.push("/login");
    };

    if (authLoading || (isLoggedIn && !user)) {
        return (
            <div className="min-h-screen bg-[#1A0105] flex items-center justify-center">
                <div className="text-[#D4AF37] font-['Playfair_Display'] text-xl animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                    Identification en cours...
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@900&display=swap');
            `}</style>

            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#5E0312] to-[#1A0105] p-4 py-10">

                <div className="w-full max-w-2xl bg-[#1F1F1F] rounded-3xl shadow-2xl border border-[#F5D0C5]/10 relative overflow-hidden animate-fadeIn">

                    {/* Bannière Décorative */}
                    <div className="h-32 w-full bg-gradient-to-r from-[#5E0312] via-[#C00929] to-[#5E0312] relative">
                        <div className="absolute bottom-0 w-full h-1 bg-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.5)]"></div>
                    </div>

                    <div className="px-8 pb-8">

                        {/* Bloc Avatar */}
                        <div className="relative -mt-16 mb-6 flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full border-4 border-[#D4AF37] bg-[#1A0105] p-1 shadow-lg z-10 group transition-transform hover:scale-105">
                                <img
                                    src={user.avatar}
                                    alt="Avatar"
                                    className="w-full h-full rounded-full bg-[#1F1F1F]"
                                />
                            </div>
                            <h1 className="mt-4 text-4xl font-['Playfair_Display'] font-black text-[#D4AF37] tracking-wide drop-shadow-md">
                                {user.username}
                            </h1>
                            <p className="text-[#F5D0C5]/60 font-['Lato'] uppercase text-xs tracking-widest mt-1">
                                {user.email}
                            </p>
                        </div>

                        {/* Grille de Stats
                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <StatBox label="Niveau" value={user.niveau || 1} icon="⚡" />
                            <StatBox label="XP" value={user.xp || 0} icon="✨" />
                            <StatBox label="Rang" value={`#${user.rank || 0}`} icon="🏆" />
                        </div>
 */}
                        <div className="mb-8">
                            <h2 className="text-xl font-['Playfair_Display'] font-bold text-[#D4AF37] mb-4 flex items-center gap-2">
                                <span>📜</span> Historique des Parties
                            </h2>

                            <div className="bg-[#1A0105]/60 border border-[#D4AF37]/20 rounded-xl overflow-hidden">
                                {loadingHistory ? (
                                    <div className="p-4 text-[#F5D0C5]/50 text-center italic">Chargement des archives...</div>
                                ) : history.length === 0 ? (
                                    <div className="p-4 text-[#F5D0C5]/50 text-center italic">Aucune partie jouée pour le moment.</div>
                                ) : (
                                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                        <table className="w-full text-left">
                                            <thead className="bg-[#5E0312]/30 text-[#D4AF37] font-['Playfair_Display'] text-sm uppercase">
                                            <tr>
                                                <th className="p-3">Thème</th>
                                                <th className="p-3 text-center">Score</th>
                                                <th className="p-3 text-right">Date</th>
                                            </tr>
                                            </thead>
                                            <tbody className="text-[#F5D0C5] font-['Lato'] text-sm">
                                            {history.map((game, index) => (
                                                <tr key={game.id || index} className="border-b border-[#F5D0C5]/10 hover:bg-[#D4AF37]/10 transition-colors">
                                                    <td className="p-3 font-bold">{game.theme}</td>
                                                    <td className="p-3 text-center font-bold text-[#D4AF37]">{game.score} pts</td>
                                                    <td className="p-3 text-right opacity-60">
                                                        {new Date(game.date).toLocaleDateString('fr-FR')}
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
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

// Composant Stats (Inchangé)
/*function StatBox({ label, value, icon }) {
    return (
        <div className="bg-[#1A0105]/60 border border-[#D4AF37]/20 rounded-xl p-4 flex flex-col items-center justify-center hover:border-[#D4AF37] transition-all duration-300 group hover:-translate-y-1">
            <span className="text-2xl mb-1 filter drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{icon}</span>
            <span className="font-['Playfair_Display'] font-black text-2xl text-[#F5D0C5] group-hover:text-[#D4AF37] transition-colors">{value}</span>
            <span className="text-[#D4AF37]/70 text-[10px] uppercase font-bold tracking-widest mt-1">{label}</span>
        </div>
    );
}
    */