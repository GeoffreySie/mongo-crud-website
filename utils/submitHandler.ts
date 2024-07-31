import { FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export const handleSubmit = async (
    e: FormEvent,
    title: string,
    description: string,
    router: ReturnType<typeof useRouter>

) => {
    e.preventDefault()

    if (!title || !description) {
        alert('Title and description are required');
        return;
    }

    try {
        const res = await fetch('http://localhost:3000/api/topics', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, description }),
        })

        if (res.ok) {
            router.push('/')
        } else {
            throw new Error("Failed to create a topic")
        }
    } catch (error) {
        console.log(error)
    }
}