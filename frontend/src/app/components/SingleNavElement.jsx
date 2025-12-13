import { Lato, Playfair_Display } from "next/font/google";

// --- Définition des polices du Design System ---
const lato = Lato({
    subsets: ["latin"],
    weight: ["400", "700"],
});

// --- Définition des couleurs de la DA Rubis ---
const Colors = {
    Gold: "#D4AF37",
    Rubis: "#C00929",
    PaleRose: "#F5D0C5",
    CardBg: "#1F1F1F", // Utilisé pour le texte si le fond est clair
};

export default function SingleNavElement({ name, href, active }) {
    // Couleur du Rubis foncé pour l'ombre 3D (similaire au Orange 600)
    const RubisDark = "#a30022"; 
    // Couleur d'un Or plus foncé pour l'ombre de la version non cliquée
    const GoldDark = "#b8860b";

    return (
        <li className="mt-4">
            <a
                href={href}
                className={`
                    ${lato.className}
                    uppercase font-bold transition-all duration-200
                    text-3xl md:text-4xl lg:text-5xl
                    
                    ${active
                        ? 
                        // --- STYLE ACTIF (Bouton 3D en RUBIS/OR) ---
                        `
                        bg-[${Colors.Rubis}] 
                        text-white 
                        border border-[${RubisDark}] 
                        shadow-[0_6px_0_${RubisDark}] 
                        px-4 py-2 rounded-lg
                        hover:bg-[${Colors.Rubis + 'E0'}] 
                        active:shadow-[0_2px_0_${RubisDark}] 
                        active:translate-y-[4px]
                        `
                        : 
                        // --- STYLE INACTIF (Lien Rose Pâle) ---
                        `
                        text-[${Colors.PaleRose}]
                        hover:underline 
                        hover:text-[${Colors.Gold}] 
                        px-4 py-2
                        `
                    }
                `}
            >
                {name}
            </a>
        </li>
    );
}