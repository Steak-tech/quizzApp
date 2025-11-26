"use client";

import { useState, useEffect } from "react";
import SingleNavElement from "./SingleNavElement";
import { FaArrowAltCircleUp,  FaArrowAltCircleDown} from "react-icons/fa";

export default function NavMenu({ fields = [] }) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleKey = (e) => {
        if (e.key === "ArrowUp") {
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        }
        if (e.key === "ArrowDown") {
            setSelectedIndex(prev => (prev < fields.length - 1 ? prev + 1 : prev));
        }
        if (e.key === "Enter") {
            const selected = fields[selectedIndex];
            if (selected) window.location.href = selected.href;
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIndex]); 

    let arrows = fields.length > 1;
    return (
        <ul className="flex flex-col gap-6 text-right items-end">
            {arrows && ( 
                <div className="flex flex-row-reverse justify-center items-center mb-4"> 
                    <FaArrowAltCircleUp /> 
                    <p className="text-xs mr-2 italic"> Use your arrows! </p> 
                </div>
            )}
            {fields.map((field, index) => (
                <SingleNavElement
                    key={field.name}
                    name={field.name}
                    href={`/${field.name.toLowerCase()}`}
                    active={index === selectedIndex}
                />
            ))}
            {arrows && ( 
                <div className="flex flex-row-reverse justify-center items-center mb-4"> 
                    <FaArrowAltCircleDown /> 
                    <p className="text-xs mr-2 italic"> Then press Enter </p> 
                </div>
            )}
        </ul>
    );
}
