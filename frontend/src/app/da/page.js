import React from 'react';

const DesignShowcase = () => {
  // Styles pour importer les polices Google Fonts dynamiquement
  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Baloo+2:wght@400;700;800&family=Lato:wght@400;700&family=Mulish:wght@400;700&family=Playfair+Display:ital,wght@0,900;1,400&family=Quicksand:wght@400;700&family=Space+Mono:ital,wght@0,400;0,700&family=Syne:wght@400;700;800&display=swap');
  `;

  const directions = [
    {
      id: 1,
      title: "Explosion Cérébrale",
      fruit: "La Grenade",
      fontHead: "font-['Playfair_Display']",
      fontBody: "font-['Lato']",
      // Gradient sombre et mystérieux
      bgStyle: "bg-[radial-gradient(circle_at_center,_#5e0312_0%,_#1a0105_100%)]",
      textColor: "text-[#F5D0C5]",
      cardBg: "bg-[#1F1F1F] border border-[#D4AF37]/30",
      accentColor: "bg-[#C00929]",
      questionText: "Selon la mythologie grecque, combien de grains de grenade Perséphone a-t-elle mangés aux Enfers ?",
      options: ["Trois grains", "Six grains (Sélectionné)", "Douze grains"],
      quizStyle: {
        number: "text-[#D4AF37]",
        btn: "border border-[#D4AF37]/50 text-[#F5D0C5] hover:bg-[#D4AF37]/10",
        btnActive: "bg-[#C00929] border-[#C00929] text-white shadow-[0_0_15px_rgba(192,9,41,0.6)]"
      },
      palette: ["#C00929", "#F5D0C5", "#D4AF37", "#1F1F1F"]
    },
    {
      id: 2,
      title: "Futuriste & Bizarre",
      fruit: "Fruit du Dragon",
      fontHead: "font-['Syne']",
      fontBody: "font-['Space_Mono']",
      // Vaporwave néon
      bgStyle: "bg-gradient-to-br from-[#ff0080] to-[#7928ca]",
      textColor: "text-[#FAFAFA]",
      cardBg: "bg-black/80 backdrop-blur-md border-2 border-[#84D900]",
      accentColor: "bg-[#84D900]",
      questionText: "Quelle quantité de données le cerveau humain peut-il théoriquement stocker ?",
      options: ["2.5 Pétaoctets", "100 Téraoctets", "1 Yottaoctet (Sélectionné)"],
      quizStyle: {
        number: "text-[#84D900]",
        btn: "bg-transparent border border-white/20 text-white hover:bg-white/10 uppercase tracking-widest",
        btnActive: "bg-[#84D900] text-black font-bold border-[#84D900] shadow-[4px_4px_0px_#ff0080]"
      },
      palette: ["#FF0080", "#84D900", "#FAFAFA", "#000000"]
    },
    {
      id: 3,
      title: "Lumière & Curiosité",
      fruit: "Le Physalis",
      fontHead: "font-['Abril_Fatface']",
      fontBody: "font-['Mulish']",
      // Chaleur solaire
      bgStyle: "bg-gradient-to-b from-[#f7ce68] to-[#fbab7e]",
      textColor: "text-[#4B3621]",
      cardBg: "bg-[#FDF6E3] shadow-xl", // Couleur papier crème
      accentColor: "bg-[#FF8C00]",
      questionText: "Le physalis est aussi appelé 'Amour en cage'. Quelle est l'origine botanique de cette 'cage' ?",
      options: ["Une feuille modifiée", "Le calice de la fleur (Sélectionné)", "Une racine aérienne"],
      quizStyle: {
        number: "text-[#FF8C00]",
        btn: "bg-white text-[#556B2F] shadow-sm hover:shadow-md border-b-2 border-[#EEDC82]",
        btnActive: "bg-[#FF8C00] text-white shadow-inner transform translate-y-1"
      },
      palette: ["#FF8C00", "#EEDC82", "#556B2F", "#4B3621"]
    },
    {
      id: 4,
      title: "Extravagante & Rare",
      fruit: "Banane Bleue",
      fontHead: "font-['Baloo_2']",
      fontBody: "font-['Quicksand']",
      // Nuages et rêve
      bgStyle: "bg-gradient-to-t from-[#cfd9df] to-[#e2ebf0]", // Plus doux, type ciel
      textColor: "text-[#4169E1]",
      cardBg: "bg-white/60 backdrop-blur-lg border border-white shadow-[0_8px_32px_rgba(31,38,135,0.15)]",
      accentColor: "bg-[#4169E1]",
      questionText: "La banane 'Blue Java' a une texture similaire à quel dessert glacé ?",
      options: ["Le sorbet citron", "La crème vanille (Sélectionné)", "Le yaourt nature"],
      quizStyle: {
        number: "text-[#4169E1]",
        btn: "bg-white/50 text-[#4169E1] hover:bg-white rounded-xl transition-all",
        btnActive: "bg-[#4169E1] text-[#FDFD96] rounded-xl shadow-lg scale-105"
      },
      palette: ["#AEC6CF", "#FDFD96", "#4169E1", "#FFFFFF"]
    }
  ];

  return (
    <>
      <style>{fontStyles}</style>
      <div className="min-h-screen bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-screen">
          {directions.map((da) => (
            <div key={da.id} className={`relative p-8 flex flex-col justify-center items-center min-h-[600px] ${da.bgStyle} overflow-hidden`}>
              
              {/* Éléments de fond décoratifs (abstraits) */}
              <div className={`absolute top-0 right-0 w-64 h-64 opacity-20 rounded-full blur-3xl ${da.accentColor} -mr-16 -mt-16`}></div>

              {/* Header de la section */}
              <div className="text-center mb-8 z-10">
                <h2 className={`text-4xl md:text-5xl mb-2 ${da.fontHead} ${da.textColor} opacity-90`}>
                  LE QUIZ
                </h2>
                <div className="flex items-center justify-center gap-2">
                   <span className={`text-xs uppercase tracking-widest px-2 py-1 rounded ${da.cardBg} ${da.textColor}`}>
                     {da.fruit} Edition
                   </span>
                </div>
              </div>

              {/* Carte Quiz */}
              <div className={`w-full max-w-sm p-8 rounded-3xl relative z-10 ${da.cardBg} ${da.fontBody}`}>
                
                {/* Barre de progression */}
                <div className="flex justify-between items-end mb-6">
                  <span className={`text-sm font-bold uppercase tracking-wider ${da.quizStyle.number}`}>Question 03</span>
                  <span className={`text-xs opacity-50 ${da.textColor}`}>/ 10</span>
                </div>
                <div className="w-full bg-gray-200/20 h-1.5 rounded-full mb-8 overflow-hidden">
                   <div className={`h-full w-[30%] ${da.accentColor}`}></div>
                </div>

                {/* Question */}
                <h3 className={`text-xl font-bold leading-snug mb-8 ${da.textColor}`}>
                  {da.questionText}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {da.options.map((option, idx) => {
                    const isSelected = option.includes("(Sélectionné)");
                    const cleanText = option.replace(" (Sélectionné)", "");
                    
                    return (
                      <button 
                        key={idx}
                        className={`w-full p-4 text-left text-sm font-semibold transition-all duration-200 flex justify-between items-center group
                          ${isSelected 
                            ? da.quizStyle.btnActive 
                            : da.quizStyle.btn + " opacity-90 hover:opacity-100"
                          }
                          ${da.id === 4 ? 'rounded-xl' : 'rounded-lg'} 
                          ${da.id === 2 ? 'rounded-none' : ''} 
                        `}
                      >
                        <span>{cleanText}</span>
                        {isSelected && (
                          <span className="text-xs bg-white/20 px-2 py-1 rounded">✓</span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Bouton Suivant (Simulé) */}
                <div className="mt-8 flex justify-end">
                   <button className={`px-6 py-2 rounded-full font-bold text-sm ${da.textColor} opacity-60 hover:opacity-100 flex items-center gap-2`}>
                     Suivant <span>→</span>
                   </button>
                </div>

              </div>

              {/* Palette Color dots */}
              <div className="absolute bottom-6 left-6 flex gap-2">
                {da.palette.map((c, i) => (
                  <div key={i} className="w-4 h-4 rounded-full shadow border border-white/20" style={{background: c}}></div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default DesignShowcase;