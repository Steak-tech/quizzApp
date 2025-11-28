import React from 'react';

const FinalDesignShowcase = () => {
  // Styles pour importer toutes les polices nécessaires
  const fontStyles = `
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cabin:wght@400;700&family=Fira+Sans:wght@400;700&family=Geologica:wght@400;700&family=Cormorant+Garamond:wght@400;700&family=Vollkorn:wght@400;700&display=swap');
  `;

  const directions = [
    // DA 1: Açai (GARDÉ - Profond & Vibrant)
    {
      id: 1,
      title: "Profondément Énergique",
      fruit: "L'Açai",
      fontHead: "font-['Bebas_Neue']",
      fontBody: "font-['Fira_Sans']",
      bgStyle: "bg-gradient-to-tr from-[#483D8B] to-[#7A5B9C]",
      textColor: "text-white",
      cardBg: "bg-[#1C003D]/90 backdrop-blur-sm",
      accentColor: "bg-[#FF1493]", // Rose Néon
      questionText: "L'Açai est classé 'superfruit'. Quel est le principal antioxydant qui lui donne sa couleur pourpre ?",
      options: ["La Vitamine C", "Les Anthocyanes (Sélectionné)", "Le Resvératrol"],
      quizStyle: {
        number: "text-[#FF1493]",
        btn: "border border-white/20 text-white hover:bg-[#FF1493]/10",
        btnActive: "bg-[#FF1493] text-[#1C003D] font-extrabold shadow-[0_0_20px_rgba(255,20,147,0.8)]"
      },
      vectorSymbol: '○',
      palette: ["#483D8B", "#FF1493", "#FFFFFF", "#1C003D"]
    },
    // NOUVEAU DA 2: Combava (Arôme Profond & Zest)
    {
      id: 2,
      title: "Arôme Piquant",
      fruit: "Le Combava",
      fontHead: "font-['Geologica']",
      fontBody: "font-['Fira_Sans']",
      // Vert Forêt vers Noir (très sombre et texturé)
      bgStyle: "bg-gradient-to-b from-[#1C352D] to-[#000000]",
      textColor: "text-[#F0F8FF]", // Blanc Azur
      cardBg: "bg-black/80 backdrop-blur-sm border border-[#9ACD32]",
      accentColor: "bg-[#9ACD32]", // Vert Jaune Luminous
      questionText: "Qu'est-ce qui donne au Combava (Lime Kaffir) sa texture rugueuse si distinctive ?",
      options: ["Un champignon symbiotique", "Des glandes à huile (Sélectionné)", "Un manque d'eau"],
      quizStyle: {
        number: "text-[#9ACD32]",
        btn: "border border-[#9ACD32] text-white hover:bg-white/10",
        btnActive: "bg-[#9ACD32] text-[#1C352D] font-bold shadow-lg border-2 border-white"
      },
      vectorSymbol: '.', // Simule les bosses ou les gouttelettes
      palette: ["#1C352D", "#9ACD32", "#F0F8FF", "#000000"]
    },
    // DA 3: Yuzu (GARDÉ - Piquant & Clean)
    {
      id: 3,
      title: "Vibrance Zestée",
      fruit: "Le Yuzu",
      fontHead: "font-['Geologica']",
      fontBody: "font-['Cabin']",
      bgStyle: "bg-gradient-to-tr from-[#FFD700] to-[#EAEAEA]",
      textColor: "text-[#1A1A1A]",
      cardBg: "bg-white/95 shadow-2xl border-l-4 border-[#FFD700]",
      accentColor: "bg-[#008080]", // Teal/Cyan
      questionText: "Qu'est-ce qui rend l'arôme du Yuzu si unique, le distinguant des citrons et des limes classiques ?",
      options: ["Sa forte teneur en sucre", "Une combinaison complexe de terpènes (Sélectionné)", "Un ph exceptionnellement bas"],
      quizStyle: {
        number: "text-[#FFD700]",
        btn: "bg-white text-[#1A1A1A] border-b-2 border-gray-300 hover:bg-[#FFD700]/30",
        btnActive: "bg-[#008080] text-white font-bold border-b-4 border-b-[#FFD700]"
      },
      vectorSymbol: '//',
      palette: ["#FFD700", "#008080", "#1A1A1A", "#EAEAEA"]
    },
    // NOUVEAU DA 4: Prune Noire (Surface Sombre & Intérieur Lumineux)
    {
      id: 4,
      title: "Révélation Nectarine",
      fruit: "La Prune Noire",
      fontHead: "font-['Cormorant_Garamond']",
      fontBody: "font-['Cabin']",
      // Violet Prune vers Noir (Profondeur)
      bgStyle: "bg-gradient-to-t from-[#36013F] to-[#000000]",
      textColor: "text-[#FFD700]", // Or
      cardBg: "bg-black/50 backdrop-blur-md",
      accentColor: "bg-[#FF8C00]", // Orange/Mandarine (Intérieur)
      questionText: "Quelle substance donne à la peau des prunes leur aspect 'poussiéreux' et leur capacité à repousser l'eau ?",
      options: ["Un pigment appelé Pruine (Sélectionné)", "Des micro-algues", "Un film de cire naturel"],
      quizStyle: {
        number: "text-[#FFD700]",
        btn: "bg-white/10 text-[#FFD700] border-l-4 border-[#FFD700] hover:bg-white/20",
        btnActive: "bg-[#FF8C00] text-black font-extrabold shadow-xl border-l-4 border-[#FFD700]"
      },
      vectorSymbol: '⛣', // Simule le 'bloom' (pruine) ou la forme de la prune
      palette: ["#36013F", "#FF8C00", "#FFD700", "#000000"]
    }
  ];

  return (
    <>
      <style>{fontStyles}</style>
      <div className="min-h-screen bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-screen">
          {directions.map((da) => (
            <div key={da.id} className={`relative p-8 flex flex-col justify-center items-center min-h-[600px] ${da.bgStyle} overflow-hidden`}>
              
              {/* Éléments Vectoriels Simulé */}
              <div className={`absolute -top-16 -left-16 text-9xl md:text-[20rem] opacity-20 ${da.textColor} ${da.fontHead} ${da.id === 3 ? 'rotate-90' : ''}`} style={{opacity: 0.1, color: da.accentColor, fontSize: '20rem'}}>
                {da.vectorSymbol}
              </div>
              <div className={`absolute bottom-0 right-0 text-9xl md:text-[20rem] opacity-20 ${da.textColor} ${da.fontHead} ${da.id === 4 ? 'rotate-45' : ''}`} style={{opacity: 0.05, color: da.accentColor, fontSize: '15rem'}}>
                {da.vectorSymbol}
              </div>


              {/* Header de la section */}
              <div className="text-center mb-8 z-10">
                <h2 className={`text-5xl md:text-6xl mb-2 ${da.fontHead} ${da.textColor} drop-shadow-md`}>
                  {da.fruit.toUpperCase()}
                </h2>
                <span className={`text-xs uppercase tracking-widest px-2 py-1 rounded-full ${da.cardBg} ${da.textColor}`}>
                  {da.title}
                </span>
              </div>

              {/* Carte Quiz */}
              <div className={`w-full max-w-sm p-8 relative z-10 shadow-2xl ${da.cardBg} ${da.fontBody} rounded-3xl`}>
                
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
                        className={`w-full p-4 text-left text-sm font-semibold transition-all duration-300 flex justify-between items-center group rounded-lg
                          ${isSelected 
                            ? da.quizStyle.btnActive 
                            : da.quizStyle.btn + " opacity-90 hover:opacity-100"
                          }
                          ${da.id === 4 ? 'rounded-full' : ''} 
                        `}
                      >
                        <span>{cleanText}</span>
                        {isSelected && (
                          <span className={`text-xs ${da.id === 1 ? 'bg-white/30' : 'bg-black/30'} px-2 py-1 rounded`}>✓</span>
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

export default FinalDesignShowcase;