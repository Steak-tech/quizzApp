"use client"
import PlayButton from "./components/PlayButton";
import RandomAvatar from "./components/RandomAvatar";
import Navmenu from "./components/NavMenu";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";


export default function HomePage() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const user = useContext(AuthContext).user;
  console.log("isLoggedIn dans HomePage:", isLoggedIn);
  function showAllAvatars() {
    console.log("Afficher tous les avatars");
  }
  const { Disconect } = useContext(AuthContext);
  return (
    <>
      <h1>Le fruit de la Culture</h1>
      <PlayButton>Commencer le Quiz</PlayButton>
      <RandomAvatar onClick={showAllAvatars}/>
      <Navmenu fields={[
        {name:"Jouer", url: "/play", auth: false},
        {name:"Login", url: "/login", auth: false},
        {name:"Register", url: "/register", auth: false},
        {name:"Thèmes", url: "/themes", auth: false},
        {name:"Profil", url: "/profile", auth: true},
        {name:"Choix DA", url: "/da", auth: true},
        {name:"Choix DA 2", url: "/da2", auth: true},
       ]} 
       />
       <button onClick={Disconect}>Se Déconnecter</button>
       {isLoggedIn ? <p>Connecté en tant que {user?.username}</p> : <p>Non connecté</p>}
    </>
  );
}
