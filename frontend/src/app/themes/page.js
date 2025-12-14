"use client"
import { useEffect, useState } from "react";
import axios, { isCancel } from 'axios';
import Link from "next/link";
export default function Themes() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();

        axios.get("http://127.0.0.1:8000/api/themes", {
            signal: controller.signal
        })
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
            .catch((error) => {
                if (isCancel(error)) {
                    console.log('Request canceled', error.message);
                } else {
                    console.error('Something went wrong: ', error.message);
                    setLoading(false);
                }
            });

        return () => {
            controller.abort();
        };
    }, []);

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@900&display=swap');
            `}</style>

            <main className="min-h-screen w-full bg-gradient-to-b from-[#5E0312] to-[#1A0105] p-6 py-12">
                
                {/* En-tête de la page */}
                <div className="max-w-7xl mx-auto mb-12 text-center">
                    <h1 className="text-4xl md:text-6xl font-['Playfair_Display'] font-black text-[#D4AF37] mb-4 drop-shadow-md">
                        Les Univers
                    </h1>
                    <div className="h-1 w-24 bg-[#C00929] mx-auto rounded-full shadow-[0_0_15px_rgba(192,9,41,0.5)]"></div>
                    <p className="mt-4 text-[#F5D0C5]/70 font-['Lato'] text-lg">
                        Choisissez votre champ de bataille intellectuel
                    </p>
                </div>

                {/* État de Chargement */}
                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="text-[#D4AF37] font-['Playfair_Display'] text-2xl animate-pulse flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin"></div>
                            Ouverture des archives...
                        </div>
                    </div>
                )}

                {/* Grille des Thèmes */}
                {!loading && data && (
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
                        {data.map(theme => (
                            <div 
                                key={theme.id}
                                className="group bg-[#1F1F1F] rounded-2xl overflow-hidden border border-[#F5D0C5]/10 shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:border-[#D4AF37]/50 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                            >
                                <Link key={theme.id} href={`/play/${theme.id}`}>
                                {/* Zone Image */}
                                <div className="relative h-48 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#1F1F1F] to-transparent z-10 opacity-60"></div>
                                    <img 
                                        src={theme.image_url} 
                                        alt={theme.name} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                    />
                                    {/* Badge décoratif (optionnel) */}
                                    <div className="absolute top-4 right-4 z-20 bg-[#1A0105]/80 backdrop-blur border border-[#D4AF37]/30 px-3 py-1 rounded-full text-[#D4AF37] text-xs font-bold uppercase tracking-widest">
                                        Quiz
                                    </div>
                                </div>

                                {/* Contenu Carte */}
                                <div className="p-6 relative z-20">
                                    <h2 className="text-2xl font-['Playfair_Display'] font-bold text-[#D4AF37] mb-3 group-hover:text-[#F5D0C5] transition-colors">
                                        {theme.name}
                                    </h2>
                                    <p className="text-[#F5D0C5]/70 font-['Lato'] text-sm leading-relaxed line-clamp-3">
                                        {theme.description}
                                    </p>

                                    {/* Bouton d'action implicite */}
                                    <div className="mt-6 flex items-center text-[#C00929] font-bold text-sm uppercase tracking-wider group-hover:text-[#D4AF37] transition-colors">
                                        Explorer
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Cas où il n'y a pas de données */}
                {!loading && data && data.length === 0 && (
                    <div className="text-center text-[#F5D0C5]/50 font-['Lato'] mt-20">
                        Aucun thème disponible pour le moment.
                    </div>
                )}
            </main>
        </>
    );
}