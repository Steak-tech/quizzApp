"use client"
import PlayButton from "./components/PlayButton";
import RandomAvatar from "./components/RandomAvatar";
import Navmenu from "./components/NavMenu";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

const Colors = {
  PomegranateRed: "#5e0312",
  DeepCharcoal: "#1a0105",
  Gold: "#D4AF37",
  Rubis: "#C00929",
  PaleRose: "#F5D0C5",
  CardBg: "#1F1F1F",
};

const da = {
  fontStyles: `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400&family=Lato:wght@400;700&display=swap');
  `,
  fontHead: "font-['Playfair_Display']",
  fontBody: "font-['Lato']",
  bgStyle: `bg-[radial-gradient(circle_at_center,_${Colors.PomegranateRed}_0%,_${Colors.DeepCharcoal}_100%)]`,
  textColor: `text-[${Colors.PaleRose}]`,
  titleColor: `text-[${Colors.Gold}]`,
  rubisButton: `bg-[${Colors.Rubis}] text-white font-bold py-3 px-6 sm:px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300`,
  navLinkStyle: `hover:text-[${Colors.Gold}] transition-colors duration-200`,
};

export default function HomePage() {
  const { isLoggedIn, Disconect, user } = useContext(AuthContext);

  function showAllAvatars() {
    console.log("Afficher tous les avatars");
  }

  return (
    <>
      <style>{da.fontStyles}</style>

      <div
        className={`
          min-h-screen w-full
          flex flex-col
          items-center
          justify-start
          px-4 py-8
          gap-8
          sm:px-6 sm:py-10
          lg:flex-row lg:justify-center lg:gap-16 lg:px-12
          ${da.bgStyle} ${da.fontBody} ${da.textColor}
        `}
      >
        <div
          className="
            flex flex-col
            items-center text-center
            w-full max-w-xl
            lg:items-start lg:text-left lg:max-w-4xl lg:w-2/3
          "
        >
          <h1
            className={`
              text-4xl
              sm:text-6xl
              lg:text-9xl
              mb-6
              lg:mb-10
              ${da.fontHead} ${da.titleColor} drop-shadow-2xl
            `}
            style={{ textShadow: `0 0 10px ${Colors.Gold}` }}
          >
            Le fruit de la Culture
          </h1>

          <div className="flex flex-col items-center w-full p-4 rounded-xl border border-white/10 bg-black/30 shadow-inner sm:w-auto lg:items-start">
            <RandomAvatar onClick={showAllAvatars} />
            <p className={`text-sm mt-4 font-bold ${da.textColor}`}>
              {isLoggedIn
                ? `Connecté en tant que ${user?.username}`
                : `Invité : Connectez-vous pour sauvegarder.`}
            </p>
          </div>

          {isLoggedIn && (
            <button
              onClick={Disconect}
              className={`mt-4 text-sm underline opacity-60 ${da.textColor} ${da.navLinkStyle}`}
            >
              Se Déconnecter
            </button>
          )}
        </div>

        <div
          className={`
            flex
            items-center
            justify-center
            w-full max-w-sm
            p-5
            lg:w-1/3 lg:max-w-xs lg:p-6
          `}
        >
          <Navmenu
            fields={[
              { name: "Jouer", url: "/play", auth: false },
              { name: "Thèmes", url: "/themes", auth: false },
              ...(isLoggedIn
                ? [
                    { name: "Profil", url: "/user", auth: true },
                    { name: "Style Guide", url: "/styleguide", auth: true },
                  ]
                : [
                    { name: "Login", url: "/login", auth: false, guestOnly: true },
                    { name: "Register", url: "/register", auth: false, guestOnly: true },
                  ]),
            ]}
            linkClassName={da.navLinkStyle}
          />
        </div>
      </div>
    </>
  );
}
