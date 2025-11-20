'use client';
import {useEffect, useState} from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            router.push('/user'); // Redirige vers page user
        }
    }, [router]);

    const handleLogin = async () => {
        try {
            const res = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!res.ok) {
                setError('Identifiants invalides');
                return;
            }

            const data = await res.json();

            // Sauvegarde token + user dans localStorage
            localStorage.setItem('token', data.access);
            localStorage.setItem('user', JSON.stringify({ username }));
            window.dispatchEvent(new Event('login')); // <-- notifie la nav

            // Redirection vers home
            router.push('/user');
        } catch (err) {
            setError('Erreur réseau');
            console.error(err);
        }
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Login</h1>
            <input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ marginRight: '1rem' }}
            />
            <input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ marginRight: '1rem' }}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
