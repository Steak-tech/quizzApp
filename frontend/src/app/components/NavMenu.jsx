"use client";

import { useState, useEffect, useContext } from "react";
import SingleNavElement from "./SingleNavElement";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { AuthContext } from "../context/AuthContext";

export default function NavMenu({ fields = [] }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { isLoggedIn } = useContext(AuthContext);

    const handleKey = (e) => {
        if (e.key === "ArrowUp") {
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
        }
        if (e.key === "ArrowDown") {
            setSelectedIndex((prev) =>
                prev < fields.length - 1 ? prev + 1 : prev
            );
        }
        if (e.key === "Enter") {
            const selected = fields[selectedIndex];
            if (selected) window.location.href = selected.url || "#";
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [selectedIndex, fields]);

    const goUp = () => {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const goDown = () => {
        setSelectedIndex((prev) =>
            prev < fields.length - 1 ? prev + 1 : prev
        );
    };

    const arrows = fields.length > 1;

    return (
        <ul className="menu flex flex-col gap-6 items-center text-center lg:items-end lg:text-right">
            {arrows && (
                <>
                    <button
                        onClick={goUp}
                        className="lg:hidden flex items-center"
                    >
                        <ImArrowUp size={22} />
                    </button>

                    <div className="hidden lg:flex flex-row-reverse items-center mb-2">
                        <FaArrowAltCircleUp />
                        <p className="text-xs mr-2 italic">Use your arrows</p>
                    </div>
                </>
            )}

            {fields.map(
                (field, index) =>
                    (!field.auth || isLoggedIn) &&
                    (!field.guestOnly || !isLoggedIn) && (
                        <div
                            key={field.name}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={() =>
                                (window.location.href = field.url || "#")
                            }
                            className="w-full"
                        >
                            <SingleNavElement
                                name={field.name}
                                href={field.url || "#"}
                                active={index === selectedIndex}
                            />
                        </div>
                    )
            )}

            {arrows && (
                <>
                    <button
                        onClick={goDown}
                        className="lg:hidden flex items-center"
                    >
                        <ImArrowDown size={22} />
                    </button>

                    <div className="hidden lg:flex flex-row-reverse items-center mt-2">
                        <FaArrowAltCircleDown />
                        <p className="text-xs mr-2 italic">Then press Enter</p>
                    </div>
                </>
            )}
        </ul>
    );
}
