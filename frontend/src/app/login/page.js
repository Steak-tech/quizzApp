'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext'; // ajuste le chemin selon ton projet
import axios from 'axios';

export default function LoginPage() {
    const router = useRouter();
    const { setAuthState } = useContext(AuthContext); // fonction pour mettre à jour le contexte
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {

            const res = await axios.post('http://localhost:8000/api/login_custom/', {
                username,
                password,
            });

            localStorage.setItem('token', res.data.access);
            localStorage.setItem('user', JSON.stringify( res.data ));
            //ajout du timestamp pour le refresh
            const refreshWithTimestamp = {
                token: res.data.refresh,
                TIMESTAMP: new Date().getTime() + 1 * 60 * 1000, // 4 minutes
            };
            localStorage.setItem('refresh', JSON.stringify( refreshWithTimestamp ));


            setAuthState({ isLoggedIn: true, user: { username } });

            router.push('/');
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
