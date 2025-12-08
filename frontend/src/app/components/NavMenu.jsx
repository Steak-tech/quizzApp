"use client";

import { useState, useEffect, useContext } from "react";
import SingleNavElement from "./SingleNavElement";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

export default function NavMenu({ fields = [] }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    const handleKey = (e) => {
        if (e.key === "ArrowUp") {
            setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
        }
        if (e.key === "ArrowDown") {
            setSelectedIndex(prev => (prev < fields.length - 1 ? prev + 1 : prev));
        }
        if (e.key === "Enter") {
            const selected = fields[selectedIndex];
            if (selected) window.location.href = selected.url || "#";
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIndex]);

    const arrows = fields.length > 1;

    return (
        <ul className="menu flex flex-col gap-6 text-right items-end">
            {arrows && (
                <div className="flex flex-row-reverse justify-center items-center mb-4">
                    <FaArrowAltCircleUp />
                    <p className="text-xs mr-2 italic">Use your arrows!</p>
                </div>
            )}

            {fields.map((field, index) => (
                (!field.auth || (field.auth && isLoggedIn) ) &&
                (!field.guestOnly || (field.guestOnly && !isLoggedIn) ) && (
                <div
                    key={field.name}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className="w-full flex justify-end" //retirer le wfull si on veut que le hover se fasse que sur le texte
                >
                    <SingleNavElement
                        name={field.name}
                        href={field.url || "#"}
                        active={index === selectedIndex}
                    />
                </div>
                )
            ))}

            {arrows && (
                <div className="flex flex-row-reverse justify-center items-center mt-4">
                    <FaArrowAltCircleDown />
                    <p className="text-xs mr-2 italic">Then press Enter</p>
                </div>
            )}
        </ul>
    );
}
