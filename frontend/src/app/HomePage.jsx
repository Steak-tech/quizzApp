"use client"
import PlayButton from "./components/PlayButton";
import RandomAvatar from "./components/RandomAvatar";
import Navmenu from "./components/NavMenu";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


export default function HomePage() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { user } = useContext(AuthContext);
  console.log("isLoggedIn dans HomePage:", isLoggedIn);
  console.log(user);
  
  function showAllAvatars() {
    console.log("Afficher tous les avatars");
  }
  const { Disconect } = useContext(AuthContext);
  return (
    <div className="h-[100vh] flex flex-col justify-center items-end">
      <Navmenu fields={[
        {name:"Jouer", url: "/play", auth: false},
        {name:"Login", url: "/login", auth: false, guestOnly: true},
        {name:"Register", url: "/register", auth: false, guestOnly: true},
        {name:"Thèmes", url: "/themes", auth: false},
        {name:"Profil", url: "/user", auth: true},
        {name:"Choix DA", url: "/da", auth: true},
        {name:"Choix DA 2", url: "/da2", auth: true},
        {name:"Choix DA Final", url: "/da3", auth: true},
        {name:"Style Guide", url: "/styleguide", auth: true},
        {name:"Notes", url: "/test-data", auth: true}
       ]} 
       />
       <div className="absolute top-8 left-8 z-50">
  {/* Conteneur stylisé avec effet "Glassmorphism" sombre */}
  <div className="bg-[#1F1F1F]/90 backdrop-blur-md border border-[#D4AF37]/30 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] p-4 transition-all duration-300 hover:border-[#D4AF37]/60">
    
    {isLoggedIn && user ? (
      <div className="flex flex-col gap-3 min-w-[160px]">
        
        {/* Partie Haute : Avatar + Infos */}
        <div className="flex items-center gap-3">
          {/* Avatar avec cercle doré */}
          <div className="relative">
            <img 
              src={user.avatar} 
              alt="Avatar" 
              className="w-12 h-12 rounded-full border-2 border-[#D4AF37] object-cover bg-[#1A0105]" 
            />
            {/* Petit indicateur de statut en ligne (optionnel) */}
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#1F1F1F] rounded-full"></div>
          </div>

          <div className="flex flex-col">
            <span className="font-['Playfair_Display'] font-bold text-[#D4AF37] text-lg leading-tight">
              {user.username}
            </span>
            {/* Affichage du Niveau */}
            <span className="text-[#F5D0C5]/80 text-xs uppercase tracking-wider font-bold">
              Niveau {user.niveau || 1}
            </span>
          </div>
        </div>

        {/* Ligne de séparation subtile */}
        <div className="h-px w-full bg-[#F5D0C5]/10"></div>

        {/* Bouton Déconnexion compact */}
        <button
          onClick={() => {
            Disconect(); // Note: attention à la typo "Disconect" vs "Disconnect" selon ton contexte
            // setIsLoggedIn(false); // Pas nécessaire si Disconect() met déjà à jour le context
          }}
          className="w-full bg-[#1A0105] text-[#C00929] border border-[#C00929]/30 text-xs font-bold py-2 rounded-lg hover:bg-[#C00929] hover:text-[#F5D0C5] transition-all duration-300 uppercase tracking-widest"
        >
          Déconnexion
        </button>
      </div>
    ) :(
      <p>Connectez vous pour accéder au profil</p>
    )} 
  </div>
</div>
    </div>
  );
}
