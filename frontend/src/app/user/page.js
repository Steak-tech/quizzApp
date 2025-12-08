"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsLoggedIn(true);
      } catch {
        localStorage.clear();
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);

    // Notifie les autres composants (nav)
    window.dispatchEvent(new Event("auth-update"));

    // Retour propre à la page d’accueil
    router.push("/");
  };

  if (!isLoggedIn) {
    return (
      <div className="p-8">
        <h1 className="text-2xl mb-4">Tu n’es pas connecté</h1>
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-blue-600 rounded-lg text-white"
        >
          Aller au login
        </button>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Profil utilisateur</h1>
      <p className="mb-4">Bienvenue, {user?.username} 👋</p>
      <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-600 rounded-lg text-white"
      >
        Se déconnecter
      </button>
    </div>
  );
}
