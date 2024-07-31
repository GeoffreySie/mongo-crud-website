"use client"

import React, { useEffect, useState } from 'react'
import RemoveButton from './RemoveButton'
import Link from 'next/link'
import { HiPencilAlt } from 'react-icons/hi'

const getTopics = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/topics', {
            cache: 'no-store'
        })

        if (!res.ok) {
            throw new Error('Error fetching topics')
        }

        const data = await res.json()
        return data.topics
        
    } catch (error) {
        console.log("Error loading topics:", error)
        return [];
    }
}

const TopicsList: React.FC = () => {

    const [topics, setTopics] = useState<{ title: string; description: string; _id: string }[]>([]);

    useEffect(() => {
        const fetchTopics = async () => {
            const topics = await getTopics()
            setTopics(Array.isArray(topics) ? topics : [])
        }
        fetchTopics()
    }, [])

    const handleRemove = (id: string) => {
        setTopics((prevTopics) => prevTopics.filter((topic) => topic._id !== id))
    }

    return (
        <div>
            {topics.map((topic) => (
                <div key={topic._id} className='p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start'>
                    <div>
                        <h2 className='font-bold text-2xl'>{topic.title}</h2>
                        <div>{topic.description}</div>
                    </div>

                    <div className='flex gap-2'>
                        <RemoveButton id={topic._id} onRemove={handleRemove}/>
                        <Link href={`/editTopic/${topic._id}`}>
                            <HiPencilAlt size={24}/>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TopicsList
