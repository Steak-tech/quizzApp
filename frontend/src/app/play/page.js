"use client";
import { useRouter } from 'next/navigation';

export default function Play({id}) {
    const router = useRouter();

    if(!id) {
        router.replace('/themes');
        return null;
    }

    return (
        <div>
            <h1>Play Page</h1>
            <p>Welcome to the Play page!</p>
        </div>
    );
}