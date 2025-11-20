"use client"

import { useEffect, useState } from "react";

export default function Ping(){
    const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/ping/")
        .then(res => res.json())
        .then(d => setData(d));
    }, []);

    return (
        <main>
            <h1>Hello Next.js</h1>
            <p>Réponse Django : {data ? data.message : "Chargement..."}</p>
        </main>
    );
}