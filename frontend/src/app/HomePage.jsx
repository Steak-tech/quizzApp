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
        {name:"Jouer"},
        {name:"Login"},
        {name:"Register"},
        {name:"Thèmes"},
        {name:"Profil"}
       ]} 
       />
    </>
  );
}
