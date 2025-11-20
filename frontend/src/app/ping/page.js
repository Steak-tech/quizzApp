"use client"

import { useEffect, useState } from "react";
import axios, {isCancel, AxiosError} from 'axios';

export default function Ping(){
    const [data, setData] = useState(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/ping/")
        .then(res => setData(res.data))
        .catch((error) => {
            if (isCancel(error)) {
                console.log('Request canceled', error.message);
            } else {
                console.error('Something went wrong: ', error.message);
            }
        });
    }, []);

    return (
        <main>
            <h1>Hello Next.js</h1>
            <p>Réponse Django : {data ? data.message : "Chargement..."}</p>
        </main>
    );
}