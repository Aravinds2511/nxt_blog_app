'use client'
import ImageUpload from "@/components/input/ImageUpload"
import Input from "@/components/input/Input"
import axios from "axios"
import { ChangeEvent, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

interface InitialStateProps {
    name:string,
    imageSrc:string,
    description:string
}

const initialState:InitialStateProps = {
    name:'',
    imageSrc:'',
    description:''
}

export default function page() {
    const [state, setState] = useState(initialState)
    const router = useRouter()

    const setCustomValue = (id:any, value:any) => {
        setState((prevValues) => ({
            ...prevValues,
            [id]: value,
        })) 
    }
    function handleChange(event:ChangeEvent<HTMLInputElement>) {
        setState({ ...state, [event.target.name]: event.target.value })
    }

    const onSubmit = (event:FormEvent) => {

        event.preventDefault()

        axios.post('/api/blogs',state)
        .then(() => {
            router.push('/')
            // router.push('/')
        })

        .catch((err) => {
            throw new Error(err)
        })
        router.refresh()
    }

    return (
        <form onSubmit={onSubmit} className="w-[600px] h-[700px] mx-auto py-12">
            <div>
                <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc',value)}/>
            </div>

            <div  className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>  
              <Input placeholder='Blog Header' id='name' type='text' value={state.name} name='name' onChange={handleChange}/>
              <Input big placeholder='Blog Desciption' id='description' type='text' value={state.description} name='description' onChange={handleChange}/>
              <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
            </div>
        </form>
    )
}