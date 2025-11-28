"use client"
import PlayButton from "./components/PlayButton";
import RandomAvatar from "./components/RandomAvatar";
import Navmenu from "./components/NavMenu";

export default function HomePage() {
  function showAllAvatars() {
    console.log("Afficher tous les avatars");
  }
  return (
    <>
      <h1>Le fruit de la Culture</h1>
      <PlayButton>Commencer le Quiz</PlayButton>
      <RandomAvatar onClick={showAllAvatars}/>
      <Navmenu fields={[
        {name:"Jouer", url: "/play"},
        {name:"Login", url: "/login"},
        {name:"Register", url: "/register"},
        {name:"Thèmes", url: "/themes"},
        {name:"Profil", url: "/profile"},
        {name:"Choix DA", url: "/da"},
        {name:"Choix DA 2", url: "/da2"},
       ]} 
       />
    </>
  );
}
