const Colors = {
    Rubis: "#C00929",
    RubisDark: "#a30022",
};

export default function PlayButton({children}){
    return (
        <button 
            className={`
                px-8 py-2 rounded-3xl cursor-pointer 
                font-bold uppercase tracking-wider transition-all duration-300
                text-xl 

                bg-[${Colors.Rubis}] 
                text-white 
                border border-[${Colors.RubisDark}] 
                shadow-[0_6px_0_${Colors.RubisDark}] 
                
                /* Interaction */
                hover:bg-[${Colors.Rubis + 'E0'}] /* Légèrement plus clair au survol */
                active:shadow-[0_2px_0_${Colors.RubisDark}] 
                active:translate-y-[4px]
            `}
        >
            {children ? children : "Jouer"}
        </button>
    )
}