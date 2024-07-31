"use client"

import React, { useEffect, useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { handleSubmit } from '@/utils/submitHandler'

const Page = () => {

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');

    const router = useRouter()

    
        
    return (
        <form className='flex flex-col gap-3' onSubmit={(e) => handleSubmit(e, title, description, router)}>
            <input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className='border border-slate-500 px-8 py-2' 
                type="text"
                placeholder='Topic Title'
            />

            <input
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className='border border-slate-500 px-8 py-2' 
                type="text"
                placeholder='Topic Description'
            />

            <button type='submit' className='bg-green-600 font-bold text-white py-3 px-6 w-fit'>Add Topic</button>
        </form>
    )
}

export default Page