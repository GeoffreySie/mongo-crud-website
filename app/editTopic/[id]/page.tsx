import EditTopicForm from '@/components/EditTopicForm'
import React from 'react'

const getTopicById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Error fetching topic')
    }

    return res.json()
  } catch (error) {
    console.log("Error loading topic:", error)
  }
}

type Params = {
  id: string
}

const page = async ({params}: {params: Params}) => {
  const {id} = params
  const { topic } = await getTopicById(id)
  const { title, description } = topic
  console.log('id:',id)
  return (
    <EditTopicForm id={id} title={title} description={description}/>
  )
}

export default page