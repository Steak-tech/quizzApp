import React from 'react';

const FinalPomegranateDesignFeedback = () => {
  // Styles pour importer les polices
  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,400&family=Lato:wght@400;700&display=swap');
  `;

  // CSS personnalisé pour l'effet de transition/hover
  const customStyles = `
    .button-selected {
      /* Le Rubis actif n'aura pas de transition car nous sommes en état de feedback ici */
    }
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
  
  // STYLE ACTIF (RUBIS - NON UTILISÉ DANS CE SCÉNARIO DE FEEDBACK)
  const ActiveStyle = {
    backgroundColor: Colors.Rubis,
    color: 'white',
    boxShadow: `0 0 15px ${Colors.Rubis + 'E6'}`,
    transition: 'background-color 0.2s, transform 0.2s',
  };

  // STYLE FEEDBACK : COULEUR OR (VÉRITÉ)
  const CorrectStyle = {
    backgroundColor: Colors.Gold,
    color: Colors.CardBg, // Texte noir
    boxShadow: `0 0 10px ${Colors.Gold + 'E6'}`,
    border: `2px solid ${Colors.Gold}`,
  };

  // STYLE FEEDBACK : COULEUR FAUSSE (PAS DE CHANGEMENT DE FOND)
  const WrongStyle = {
    backgroundColor: 'transparent', // Ne change pas le fond
    color: Colors.Rubis, // Seul le texte passe en Rubis
    border: `1px solid ${Colors.Rubis}`, // Bordure Rubis pour souligner
    boxShadow: `0 0 10px ${Colors.Rubis + '33'}`, // Ombre très légère
  };


  // SCÉNARIO : L'utilisateur a cliqué sur "Trois grains" (Faux), "Six grains" (Vrai) est révélé.
  const scenarioOptions = [
    "Trois grains (Wrong Selection)", 
    "Six grains (Correct)", 
    "Douze grains" // Option non cliquée
  ];

  const da = {
    title: "Feedback d'Erreur Subtil (DA Rubis)",
    fruit: "LA GRENADE",
    fontHead: "font-['Playfair_Display']",
    fontBody: "font-['Lato']",
    bgStyle: `bg-[radial-gradient(circle_at_center,_${Colors.PomegranateRed}_0%,_${Colors.DeepCharcoal}_100%)]`,
    textColor: `text-[${Colors.PaleRose}]`,
    cardBg: `bg-[${Colors.CardBg}] border border-[${Colors.Gold}]/30`,
    accentColor: `bg-[${Colors.Rubis}]`,
    questionText: "Selon la mythologie grecque, combien de grains de grenade Perséphone a-t-elle mangés aux Enfers ?",
    options: scenarioOptions,
    quizStyle: {
      number: `text-[${Colors.Gold}]`,
      btn: `border border-[${Colors.Gold}]/50 text-[${Colors.PaleRose}] hover:bg-[${Colors.Gold}]/10`,
    },
    palette: [Colors.Rubis, Colors.PaleRose, Colors.Gold, Colors.CardBg],
  };

  return (
    <>
      <style>{fontStyles}</style>
      <style>{customStyles}</style>

      <div className={`min-h-screen flex flex-col justify-center items-center p-8 ${da.bgStyle}`}>
        
        <div className="text-center mb-10">
          <h1 className={`text-6xl md:text-8xl mb-2 ${da.fontHead} ${da.quizStyle.number} drop-shadow-lg`}>
            {da.fruit}
          </h1>
          <span className={`text-sm uppercase tracking-widest px-3 py-1 rounded-full ${da.cardBg} ${da.textColor}`}>
            {da.title}
          </span>
        </div>

        <div className={`w-full max-w-lg p-10 relative z-10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${da.cardBg} ${da.fontBody} rounded-3xl`}>
          
          <div className="flex justify-between items-end mb-6">
            <span className={`text-sm font-bold uppercase tracking-wider ${da.quizStyle.number}`}>QUESTION 03</span>
            <span className={`text-xs opacity-50 ${da.textColor}`}>/ 10</span>
          </div>
          <div className="w-full bg-gray-600/20 h-1.5 rounded-full mb-8 overflow-hidden">
              <div className={`h-full w-[60%] ${da.accentColor}`}></div>
          </div>

          <h3 className={`text-2xl font-bold leading-snug mb-8 ${da.textColor}`}>
            {da.questionText}
          </h3>

          <div className="space-y-4">
            {da.options.map((option, idx) => {
              const isWrong = option.includes("(Wrong Selection)");
              const isCorrect = option.includes("(Correct)");
              const cleanText = option.replace(" (Wrong Selection)", "").replace(" (Correct)", "");
              
              let buttonStyle = {};
              let checkmark = '';
              let textColor = da.textColor; // Couleur de texte par défaut

              if (isWrong) {
                buttonStyle = WrongStyle; // Applique bordure Rubis et texte Rubis
                checkmark = '✗'; 
                textColor = {color: Colors.Rubis}; // Force la couleur du texte Rubis
              } else if (isCorrect) {
                buttonStyle = CorrectStyle; // Applique fond Or
                checkmark = '✓';
                textColor = {color: Colors.CardBg}; // Force la couleur du texte noir
              }
              // Pour l'option non cliquée ("Douze grains"), buttonStyle est {} et le style de classe s'applique.

              return (
                <button 
                  key={idx}
                  // Supprime 'button-selected' des options incorrectes/correctes pour éviter des conflits de hover
                  className={`w-full p-5 text-left text-base font-semibold flex justify-between items-center group rounded-xl ${da.quizStyle.btn} ${!isWrong && !isCorrect ? 'button-selected' : ''}`}
                  // Applique le style feedback ou le style actif (si nous étions dans cet état)
                  style={{...buttonStyle, ...textColor}}
                  disabled={isWrong || isCorrect}
                >
                  <span>{cleanText}</span>
                  {(isWrong || isCorrect) && (
                    <span 
                        className={`text-xs px-2 py-1 rounded-full`} 
                        style={{
                            backgroundColor: isCorrect ? Colors.CardBg : Colors.PaleRose,
                            color: isCorrect ? Colors.Gold : Colors.Rubis
                        }}>
                        {checkmark}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-10 flex justify-end">
            <button className={`px-6 py-2 rounded-full font-bold text-sm ${da.textColor} opacity-80 hover:opacity-100 flex items-center gap-2 border border-transparent hover:border-[${Colors.Gold}]/50`}>
              Suivant <span>→</span>
            </button>
          </div>

        </div>
        
        {/* PALETTE */}
        <div className="absolute bottom-6 left-6 flex items-center gap-4">
            <div className="flex gap-2 p-3 bg-black/50 rounded-xl">
              {da.palette.map((c, i) => (
                <div key={i} className="w-4 h-4 rounded-full shadow border border-white/20" style={{background: c}}></div>
              ))}
            </div>
        </div>
      </div>
    </>
  );
};

export default FinalPomegranateDesignFeedback;