'use client'

import axios from 'axios'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import Image from 'next/image'
import ImageUpload from '../input/ImageUpload'
import Input from '../input/Input'
import { useRouter } from 'next/navigation'

interface BlogProps {
    name?:string
    description?:string
    imageSrc?:any
    blogId?:string
}


interface InitalStateProps {
    name:string,
    description:string
    imageSrc:string
    
  }   

  const initialState:InitalStateProps = {
    name:'',
    description:'',
    imageSrc:''
  }  

  export default function BlogId({name,description,imageSrc,blogId}:BlogProps){
    const router = useRouter()
    const [state, setState] = useState(initialState)
    const [onActive,setOnActive] = useState(false)

    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
          ...prevValues,
          [id]: value,
        }));
      };

      function handleChange(event:ChangeEvent<HTMLInputElement> ) {
        setState({ ...state, [event.target.name]: event.target.value });
      }

      const onDelete = (event:FormEvent) => {
  
          event.preventDefault()
          axios.delete(`/api/blogs/${blogId}`)
          .then(() => {
              router.refresh()
          })
  
          .catch((err) => {
              throw new Error(err)
          })
          .finally(() => {
              router.push('/')
          })
      }

      const onSubmit = (event:FormEvent) => {

        event.preventDefault()
        axios.put(`/api/blogs/${blogId}`,state)
        .then(() => {
            router.refresh()   
        })

        .catch((err) => {
            throw new Error(err)
        })
        .finally(() => {
            router.push('/')
        })
    }

    return (
        <div className="w-[500px] mx-auto py-16 bg-blue-200 px-12 flex flex-col gap-4">
            <div className="flex flex-col border-b-2 ">
                 <span>{name}</span>
            </div>

            <div>
            <span>{description}</span>
            </div>

            <div>
                <Image src={imageSrc} width={400} height={400} alt='Image'/>
            </div>

            <div className='flex justify-center gap-2'>
                <button onClick={() => setOnActive(!onActive)} className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Edit</button>
                <button onClick={onDelete} className='bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Delete</button>
            </div>

            {onActive && (
                <form onSubmit={onSubmit}>
                    <div>
                        <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc',value)}/>
                    </div>

                    <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
                       <Input placeholder='Name' id="name" type='text' value={state.name} name='name' onChange={handleChange}/>
                       <Input placeholder='Description' id="description" type='text' value={state.description} name='description' onChange={handleChange}/>
                    </div>
                    <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
                </form>
            )}
        </div>
    )

  }