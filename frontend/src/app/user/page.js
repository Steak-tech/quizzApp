'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UserPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                localStorage.removeItem('user');
                setUser(null);
            }
        } else {
            // Si pas de user, redirige vers login
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        router.push('/login');
    };

    if (!user) return <p>Chargement...</p>;

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Page User</h1>
            <p>Bienvenue, {user.username} !</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}
