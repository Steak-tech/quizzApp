"use client"

import { useEffect, useState } from "react";
import axios, {isCancel, AxiosError} from 'axios';
export default function Themes(){
    const [data, setData] = useState(null);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/themes")
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
            {data ? null : <p>Chargement...</p>}
            {data && data.map(theme =>
                <div key={theme.id}>
                    <h2>{theme.name}</h2>
                    <p>{theme.description}</p>
                    <img src={theme.image_url} alt={theme.name} width="200" />
                </div>
            )}
        </main>
    );
}