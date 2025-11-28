import { Russo_One } from "next/font/google";

const russo = Russo_One({
    subsets: ["latin"],
    weight: ["400"],
});

export default function SingleNavElement({ name, href, active }) {
    return (
        <li>
            <a
                href={href}
                className={`
                    ${russo.className}
                    text-white text-4xl uppercase font-bold transition-all
                    ${active
                        ? "bg-orange-500 border border-orange-600 shadow-[0_6px_0_#d35400] px-4 py-2 hover:bg-orange-400 active:shadow-[0_2px_0_#d35400] active:translate-y-[2px]"                        
                        : "hover:underline"}
                `}
            >
                {name}
            </a>
        </li>
    );
}
