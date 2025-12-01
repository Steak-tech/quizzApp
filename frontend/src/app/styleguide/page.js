"use client"
import React from 'react';

const StyleGuidePage = () => {
  // Styles pour importer les polices
  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400&family=Lato:wght@400;700&display=swap');
  `;

  // CSS personnalisé pour l'effet de transition/hover (Conservé pour référence)
  const customStyles = `
    .button-selected:hover {
      transform: scale(1.01);
    }
  `;

  // --- COULEURS ET STYLES DE BASE (DA RUBIS) ---
  const Colors = {
    PomegranateRed: "#5e0312",
    DeepCharcoal: "#1a0105",
    Gold: "#D4AF37",
    Rubis: "#C00929",
    PaleRose: "#F5D0C5",
    CardBg: "#1F1F1F",
  };
  
  // STYLE ACTIF (ORIGINAL RUBIS)
  const ActiveStyle = {
    backgroundColor: Colors.Rubis,
    color: 'white',
    boxShadow: `0 0 15px ${Colors.Rubis + 'E6'}`,
    transition: 'background-color 0.2s, transform 0.2s',
  };

  // STYLE FEEDBACK : COULEUR OR (VÉRITÉ)
  const CorrectStyle = {
    backgroundColor: Colors.Gold,
    color: Colors.CardBg,
    boxShadow: `0 0 10px ${Colors.Gold + 'E6'}`,
    border: `2px solid ${Colors.Gold}`,
  };

  // STYLE FEEDBACK : COULEUR FAUSSE (SUBTIL)
  const WrongStyle = {
    backgroundColor: 'transparent',
    color: Colors.Rubis,
    border: `1px solid ${Colors.Rubis}`,
    boxShadow: `0 0 10px ${Colors.Rubis + '33'}`,
  };

  // OBJET DE RÉFÉRENCE (avec la propriété 'palette' corrigée)
  const da = {
    fruit: "STYLE GUIDE",
    fontHead: "font-['Playfair_Display']",
    fontBody: "font-['Lato']",
    bgStyle: `bg-[radial-gradient(circle_at_center,_${Colors.PomegranateRed}_0%,_${Colors.DeepCharcoal}_100%)]`,
    textColor: `text-[${Colors.PaleRose}]`,
    cardBg: `bg-[${Colors.CardBg}] border border-[${Colors.Gold}]/30`,
    quizStyle: {
      number: `text-[${Colors.Gold}]`,
      btn: `border border-[${Colors.Gold}]/50 text-[${Colors.PaleRose}] hover:bg-[${Colors.Gold}]/10`,
    },
    // CORRECTION APPLIQUÉE ICI
    palette: [Colors.Rubis, Colors.PaleRose, Colors.Gold, Colors.CardBg], 
  };

  // --- COMPOSANTS DE PRÉSENTATION ---

  const ColorSwatch = ({ name, hex, role }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/10 shadow-sm">
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full shadow-lg mr-3" style={{ backgroundColor: hex, border: `1px solid ${Colors.Gold}` }}></div>
        <div>
          <p className={`font-bold text-sm ${da.textColor}`}>{name}</p>
          <p className="text-xs opacity-60 text-white">{hex.toUpperCase()}</p>
        </div>
      </div>
      <p className={`text-xs ${da.quizStyle.number} max-w-[120px] text-right`}>{role}</p>
    </div>
  );

  const ComponentExample = ({ state, style, checkmark, customClass, textColor }) => {
    const isFeedback = checkmark !== undefined;
    
    // Déterminer la couleur du texte si elle est forcée par le style
    let finalTextColor = textColor ? textColor.color : da.textColor;
    if (style && style.color) finalTextColor = style.color;


    return (
      <div className="flex flex-col items-start w-full md:w-1/2 p-2">
        <span className={`text-xs mb-2 uppercase ${da.quizStyle.number}`}>{state}</span>
        <button
          className={`w-full p-4 text-left text-base font-semibold flex justify-between items-center group rounded-xl ${da.quizStyle.btn} ${customClass}`}
          style={{ ...style, color: finalTextColor }}
          disabled={isFeedback} // Désactiver les états de feedback
        >
          <span>Option Quiz Example</span>
          {isFeedback && (
            <span 
              className={`text-xs px-2 py-1 rounded-full font-bold`} 
              style={{
                  backgroundColor: style === CorrectStyle ? Colors.CardBg : Colors.PaleRose,
                  color: style === CorrectStyle ? Colors.Gold : Colors.Rubis
              }}>
              {checkmark}
            </span>
          )}
        </button>
      </div>
    );
  };


  return (
    <>
      <style>{fontStyles}</style>
      <style>{customStyles}</style>

      <div className={`min-h-screen p-8 ${da.bgStyle} ${da.fontBody}`}>
        
        {/* --- HEADER --- */}
        <div className="text-center mb-12">
          <h1 className={`text-6xl md:text-8xl mb-2 ${da.fontHead} ${da.quizStyle.number} drop-shadow-lg`}>
            {da.fruit}
          </h1>
          <p className={`text-lg uppercase tracking-widest ${da.textColor} opacity-80`}>
            Système de Design : La Grenade
          </p>
          <hr className="w-24 mx-auto mt-4 border-t-2 border-[#C00929]"/>
        </div>

        {/* --- CARTE PRINCIPALE STYLE GUIDE --- */}
        <div className={`w-full max-w-5xl mx-auto p-10 shadow-2xl ${da.cardBg} rounded-3xl`}>

          {/* SECTION 1: PALETTE DE COULEURS */}
          <h2 className={`text-3xl font-bold mb-6 ${da.quizStyle.number} ${da.fontHead}`}>
            1. Palette de Couleurs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <ColorSwatch name="Rubis" hex={Colors.Rubis} role="Accent Primaire / Erreur" />
            <ColorSwatch name="Or" hex={Colors.Gold} role="Accent Secondaire / Vérité" />
            <ColorSwatch name="Rose Pâle" hex={Colors.PaleRose} role="Texte Principal / Contraste" />
            <ColorSwatch name="Charbon" hex={Colors.CardBg} role="Fond de Carte / Texte (sur Or)" />
            <ColorSwatch name="Rouge Grenade" hex={Colors.PomegranateRed} role="Fond Dégradé (Départ)" />
            <ColorSwatch name="Charbon Profond" hex={Colors.DeepCharcoal} role="Fond Dégradé (Arrivée)" />
          </div>

          {/* SECTION 2: TYPOGRAPHIE */}
          <h2 className={`text-3xl font-bold mb-6 ${da.quizStyle.number} ${da.fontHead}`}>
            2. Typographie
          </h2>
          <div className="space-y-4 mb-12 p-4 border border-white/10 rounded-lg">
             <p className={`text-xl ${da.fontHead} ${da.textColor}`}>
                <span className={`text-4xl ${da.quizStyle.number}`}>H1/Titre Principal</span> (Playfair Display 900)
             </p>
             <p className={`text-lg ${da.fontBody} ${da.textColor}`}>
                <span className="font-bold">Question/Corps</span> (Lato 700) : "Les options de quiz utilisent Lato pour une meilleure lisibilité."
             </p>
             <p className={`text-sm ${da.fontBody} ${da.textColor} opacity-60`}>
                <span className="font-normal">Texte fonctionnel</span> (Lato 400) : "Le petit texte ou l'opacité sont utilisés pour les informations secondaires."
             </p>
          </div>

          {/* SECTION 3: COMPOSANTS (BOUTONS D'ÉTAT) */}
          <h2 className={`text-3xl font-bold mb-6 ${da.quizStyle.number} ${da.fontHead}`}>
            3. Composants : États du Quiz
          </h2>
          <div className="flex flex-wrap p-4 border border-white/10 rounded-lg">

            <ComponentExample state="Normal (Inactif)" style={{}} customClass="" />
            
            {/* Simulation de l'état actif (non feedback) */}
            <ComponentExample 
                state="Actif/Sélectionné" 
                style={ActiveStyle} 
                customClass="button-selected" 
                textColor={{color: 'white'}}
            />

            {/* État de Feedback Correct */}
            <ComponentExample 
                state="Feedback : Correct" 
                style={CorrectStyle} 
                checkmark="✓" 
                textColor={{color: Colors.CardBg}}
            />

            {/* État de Feedback Incorrect (Subtil) */}
            <ComponentExample 
                state="Feedback : Incorrect" 
                style={WrongStyle} 
                checkmark="✗" 
                textColor={{color: Colors.Rubis}}
            />

          </div>

          {/* SECTION 4: BARRE DE PROGRESSION */}
          <h2 className={`text-3xl font-bold mt-12 mb-4 ${da.quizStyle.number} ${da.fontHead}`}>
            4. Barre de Progression
          </h2>
          <div className="p-4 border border-white/10 rounded-lg">
            <div className="w-full bg-gray-600/20 h-2 rounded-full overflow-hidden">
                <div className={`h-full w-[60%]`} style={{backgroundColor: Colors.Rubis}}></div>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
};

export default StyleGuidePage;