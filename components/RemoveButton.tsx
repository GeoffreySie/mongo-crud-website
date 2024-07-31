"use client"

import React from 'react'
import { HiOutlineTrash } from 'react-icons/hi' 

interface RemoveButtonProps {
  id: string;
  onRemove: (id: string) => void;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({ id, onRemove }) => {

  const removeTopic = async () => {
    const confirmed = confirm('Are you sure you want to delete this topic?')
    if (confirmed) {
      try {
        const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
          method: 'DELETE'
        })
        if (res.ok) {
          onRemove(id) // Call the onRemove callback to update the state
        } else {
          throw new Error('Failed to delete topic')
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <button onClick={removeTopic} className='text-red-400'>
        <HiOutlineTrash size={24}/>
    </button>
  )
}

export default RemoveButton
