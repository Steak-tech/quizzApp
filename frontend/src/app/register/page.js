"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    // États du formulaire
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    });

    // États UI
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // --- LOGIQUE AVATAR ---
    // On génère l'URL en fonction du username. 
    // Si le username est vide, on utilise "LaGrenade" comme seed par défaut pour avoir un avatar joli au démarrage.
    const seed = formData.username || "LaGrenade"; 
    const avatarUrl = `https://api.dicebear.com/9.x/micah/svg?seed=${seed}`;

    // Gestion des inputs texte
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Soumission du formulaire
    const handleRegister = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            // Préparation des données pour Django
            const payload = {
                ...formData,
                // On envoie directement l'URL (String) à la BDD
                avatar: avatarUrl 
            };
            
            console.log("Envoi du payload :", payload);

            const res = await axios.post("http://127.0.0.1:8000/api/register/", payload);
            
            // Gestion des tokens (si votre API les renvoie à l'inscription)
            if (res.data.access && res.data.refresh) {
                localStorage.setItem("access", res.data.access);
                localStorage.setItem("refresh", res.data.refresh);
            }

            router.push("/"); 
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data) {
                // Gestion des erreurs Django
                const firstError = Object.values(err.response.data)[0];
                setError(Array.isArray(firstError) ? firstError[0] : "Une erreur est survenue");
            } else {
                setError("Erreur de connexion au serveur.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Styles
    const inputStyle = "w-full bg-[#1A0105]/50 text-[#F5D0C5] font-['Lato'] border border-[#F5D0C5]/20 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-[#F5D0C5]/40";
    const labelStyle = "block text-[#F5D0C5] font-['Lato'] font-bold mb-2 text-xs uppercase tracking-wider";

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@900&display=swap');
            `}</style>

            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#5E0312] to-[#1A0105] p-4 py-10">
                <div className="w-full max-w-lg bg-[#1F1F1F] p-8 rounded-2xl shadow-2xl border border-[#F5D0C5]/10 relative">
                    
                    {/* Décoration haut */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C00929] via-[#D4AF37] to-[#C00929] opacity-50"></div>

                    <div className="text-center mb-6">
                        <h1 className="font-['Playfair_Display'] font-black text-4xl text-[#D4AF37] mb-2">Inscription</h1>
                        <p className="text-[#F5D0C5]/80 font-['Lato']">Rejoignez l'aventure</p>
                    </div>

                    {/* --- PRÉVISUALISATION DE L'AVATAR --- */}
                    <div className="flex justify-center mb-8">
                        <div className="relative w-24 h-24 rounded-full border-2 border-[#D4AF37] p-1 shadow-[0_0_20px_rgba(212,175,55,0.2)] bg-[#1A0105]">
                            <img 
                                src={avatarUrl} 
                                alt="Avatar prévisualisation" 
                                className="w-full h-full rounded-full bg-[#1A0105]"
                            />
                            {/* Petit badge optionnel pour montrer que c'est auto-généré */}
                            <div className="absolute bottom-0 right-0 bg-[#D4AF37] text-[#1A0105] text-[10px] font-bold px-2 py-0.5 rounded-full">
                                AUTO
                            </div>
                        </div>
                    </div>

                    {/* Affichage Erreur */}
                    {error && (
                        <div className="mb-6 p-3 bg-[#C00929]/20 border-l-4 border-[#C00929] rounded text-[#C00929] text-sm font-bold text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-4">
                        
                        {/* Groupe Nom/Prénom */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className={labelStyle}>Prénom</label>
                                <input 
                                    type="text" name="first_name" 
                                    value={formData.first_name} onChange={handleChange}
                                    className={inputStyle} placeholder="Jean"
                                />
                            </div>
                            <div>
                                <label className={labelStyle}>Nom</label>
                                <input 
                                    type="text" name="last_name" 
                                    value={formData.last_name} onChange={handleChange}
                                    className={inputStyle} placeholder="Dupont"
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div>
                            <label className={labelStyle}>Pseudo</label>
                            <input 
                                type="text" name="username" required
                                value={formData.username} onChange={handleChange}
                                className={inputStyle} placeholder="Votre pseudo unique"
                            />
                            <p className="text-[#F5D0C5]/40 text-[10px] mt-1 text-right">Votre avatar sera généré à partir de ce pseudo.</p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className={labelStyle}>Email</label>
                            <input 
                                type="email" name="email" required
                                value={formData.email} onChange={handleChange}
                                className={inputStyle} placeholder="exemple@mail.com"
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <label className={labelStyle}>Mot de passe</label>
                            <input 
                                type="password" name="password" required
                                value={formData.password} onChange={handleChange}
                                className={inputStyle} placeholder="••••••••"
                            />
                        </div>

                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full bg-[#C00929] text-[#F5D0C5] font-['Lato'] font-bold text-lg py-3 rounded-lg 
                                hover:bg-[#C00929]/90 hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(192,9,41,0.5)] 
                                transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]
                                ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {isLoading ? "Création..." : "S'inscrire"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}