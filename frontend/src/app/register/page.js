"use client"
import axios from "axios"
import { useRouter } from "next/navigation";
import React from "react"

export default function RegisterPage() {

    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")  
    const [email, setEmail] = React.useState("")
    const [error, setError] = React.useState(null)
    const router = useRouter();

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const res = await axios.post("http://127.0.0.1:8000/api/register/", { 
                username,
                password,
                email,
             });
            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            router.push("/");
        } catch (error) {
            error.response && setError(error.response.data.error);
            return;
        }
        
    }

    function handleChange(e) {
    const { name, value } = e.target;

    // On utilise un objet pour mapper les champs aux setters
    const setters = {
        username: setUsername,
        password: setPassword,
        email: setEmail,
    };

    if (setters[name]) {
        setters[name](value);
    }
    }


    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleRegister}>
                {error&& <p>{error}</p>}
                <input type="text" name="username" placeholder="Username" onChange={(e) => handleChange(e)} />
                <input type="password" name="password" placeholder="Password" onChange={(e) => handleChange(e)} />
                <input type="email" name="email" placeholder="Email" onChange={(e) => handleChange(e)} />
                <button type="submit" onClick={(e) => handleRegister(e)}>Register</button>
            </form>
        </div>
    )
    }