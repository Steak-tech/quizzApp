'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Nav() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    // Au chargement, on récupère l'utilisateur depuis localStorage
    useEffect(() => {
        const getUser = () => {
            const storedUser = localStorage.getItem('user');
            if (!storedUser) return null;
            try {
                return JSON.parse(storedUser);
            } catch {
                localStorage.removeItem('user');
                return null;
            }
        };

        setUser(getUser());

        // Event pour détecter un login depuis une autre page
        const handleLoginEvent = () => setUser(getUser());
        window.addEventListener('login', handleLoginEvent);

        return () => window.removeEventListener('login', handleLoginEvent);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <nav style={{padding: '1rem', borderBottom: '1px solid #ccc'}}>
            <ul className="flex space-x-4">
                {user ? (
                    <>
                        <span>Bienvenue {user.username}</span>
                        <li>
                            <a href="/user">User</a>
                        </li>
                        <li>
                            <a onClick={handleLogout}
                               className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Logout</a>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/play">Jouer</a>
                        </li>
                        <li>
                            <a href="/login">Login</a>
                        </li>
                        <li>
                            <a href="/register">Inscription</a>
                        </li>
                        <li>
                            <a href="/themes">Thèmes</a>
                        </li>
                    </>
                )}
            </ul>
        </nav>
);
}
