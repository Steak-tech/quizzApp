"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Protected({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const access = localStorage.getItem("access");
        if (!access) {
            router.push("/login"); // redirection si pas connecté
        } else {
            setIsLoggedIn(true);
        }
        setLoading(false);
    }, []);

    if (loading) return null; // pas de rendu pendant le check

    if (!isLoggedIn) return null; // pas connecté → rien à afficher

    return <>{children}</>; // rend le contenu si connecté
}
