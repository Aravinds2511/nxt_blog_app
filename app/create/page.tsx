'use client'
import Input from "@/components/input/Input"
import { useRouter } from "next/router"
import { useState } from "react"

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

    return (
        <form>
            <div>
                <ImageUpload/>
            </div>

            <div  className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <Input placeholder='Blog header' id='name' type='text' value={state.name} name='name' onChange={handleChange}/>
        <Input big placeholder='Blog content or description' id='description' type='text' value={state.description} name='description' onChange={handleChange}/>
        <div> 
        </div>
        <button type='submit'>Submit</button>
        </div>
        </form>
    )
}