"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const EditTopicForm = ({id, title, description}: {id:string, title:string, description:string}) => {

    const [newTitle, setNewTitle] = useState(title)
    const [newDescription, setNewDescription] = useState(description)

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title: newTitle, description: newDescription})
            })

            if (res.ok) {
                router.push('/')
            } else {
                throw new Error('Failed to update topic')
            }
        } catch (error) {
            console.log(error)
        }

        
    }

    return (
        <form className='flex flex-col gap-3'>
            <input
                onChange={(e) => setNewTitle(e.target.value)}
                value={newTitle}
                className='border border-slate-500 px-8 py-2' 
                type="text"
                placeholder='Topic Title'
            />

            <input
                onChange={(e) => setNewDescription(e.target.value)}
                value={newDescription}
                className='border border-slate-500 px-8 py-2' 
                type="text"
                placeholder='Topic Description'
            />

            <button onClick={handleSubmit} className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Update Topic</button>
        </form>
    )
}

export default EditTopicForm