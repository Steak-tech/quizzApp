'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function LoginPage() {
    const router = useRouter();
    const { setAuthState } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const res = await axios.post('http://localhost:8000/api/login_custom/', {
                username,
                password,
            });

            localStorage.setItem('token', res.data.access);
            localStorage.setItem('user', JSON.stringify(res.data));
            
            const refreshWithTimestamp = {
                token: res.data.refresh,
                TIMESTAMP: new Date().getTime() + 1 * 60 * 1000, 
            };
            localStorage.setItem('refresh', JSON.stringify(refreshWithTimestamp));

            setAuthState({ isLoggedIn: true, user: res.data.user });
            router.push('/');

        } catch (err) {
            if (err.response && err.response.status === 401) {
                setError("Nom d'utilisateur ou mot de passe incorrect.");
            } else {
                setError('Erreur réseau. Vérifiez votre connexion.');
            }
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Importation directe des polices pour éviter la config externe */}
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Playfair+Display:wght@900&display=swap');
            `}</style>

            {/* Conteneur principal : Dégradé Rouge Grenade (#5E0312) vers Charbon Profond (#1A0105) */}
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-[#5E0312] to-[#1A0105] p-4">
                
                {/* Carte de connexion : Fond Charbon (#1F1F1F) */}
                <div className="w-full max-w-md bg-[#1F1F1F] p-8 sm:p-10 rounded-2xl shadow-2xl border border-[#F5D0C5]/10 relative overflow-hidden">
                    
                    {/* Décoration haut : Rubis (#C00929) / Or (#D4AF37) */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#C00929] via-[#D4AF37] to-[#C00929] opacity-50"></div>

                    <div className="mb-10 text-center">
                        {/* Titre : Playfair Display 900, Couleur Or (#D4AF37) */}
                        <h1 className="font-['Playfair_Display'] font-black text-4xl sm:text-5xl text-[#D4AF37] mb-2">
                            Connexion
                        </h1>
                        {/* Sous-titre : Lato, Couleur Rose Pâle (#F5D0C5) */}
                        <p className="text-[#F5D0C5]/80 font-['Lato']">
                            Accédez à votre espace La Grenade
                        </p>
                    </div>

                    {/* Zone d'erreur : Fond Rubis (#C00929) */}
                    {error && (
                        <div className="mb-6 p-4 bg-[#C00929]/20 border-l-4 border-[#C00929] rounded-md backdrop-blur-sm">
                            <p className="flex items-center text-[#C00929] font-['Lato'] font-bold text-sm">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                                    <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.401 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </p>
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="username" className="block text-[#F5D0C5] font-['Lato'] font-bold mb-2 text-sm uppercase tracking-wider">
                                Nom d'utilisateur
                            </label>
                            {/* Input : Fond Charbon Profond (#1A0105), Texte Rose Pâle (#F5D0C5), Focus Or (#D4AF37) */}
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-[#1A0105]/50 text-[#F5D0C5] font-['Lato'] border border-[#F5D0C5]/20 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-[#F5D0C5]/40"
                                placeholder="Entrez votre pseudo"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-[#F5D0C5] font-['Lato'] font-bold mb-2 text-sm uppercase tracking-wider">
                                Mot de passe
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-[#1A0105]/50 text-[#F5D0C5] font-['Lato'] border border-[#F5D0C5]/20 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-[#D4AF37] transition-colors duration-300 placeholder-[#F5D0C5]/40"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="pt-4">
                            {/* Bouton : Fond Rubis (#C00929) */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`
                                    w-full flex justify-center items-center
                                    bg-[#C00929] text-[#F5D0C5] font-['Lato'] font-bold text-lg py-3 px-4 rounded-lg
                                    transition-all duration-300 transform
                                    hover:bg-[#C00929]/90 hover:shadow-[0_0_15px_rgba(192,9,41,0.5)] hover:scale-[1.02]
                                    focus:outline-none focus:ring-2 focus:ring-[#D4AF37] focus:ring-offset-2 focus:ring-offset-[#1F1F1F]
                                    disabled:opacity-50 disabled:cursor-not-allowed
                                `}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#F5D0C5]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : null}
                                {isLoading ? 'Connexion...' : 'Se connecter'}
                            </button>
                        </div>
                    </form>
                    
                    <div className="mt-6 text-center">
                        <a href="#" className="text-[#F5D0C5]/60 text-sm font-['Lato'] hover:text-[#D4AF37] transition-colors">
                            Mot de passe oublié ?
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}