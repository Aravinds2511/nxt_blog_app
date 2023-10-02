'use client'

import axios from 'axios'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import Input from '@/components/input/Input'
import Link from 'next/link'

interface InitialStateProps {
    name:string,
    email:string,
    password:string
}

const initialState:InitialStateProps = {
    name:'',
    email:'',
    password:''
}

export default function page() {
    const router = useRouter()
    const [state,setState] = useState(initialState)


    const onSubmit = (event:FormEvent) => {

        event.preventDefault()

        axios.post('/api/register',state)
        .then(() => {
          router.refresh()
        })
        .then(() => {
          setTimeout(() => {
            router.push('/login')
          },2500)
        })
        .catch((err:any) => {
        })
    }

    function handleChange(event:any) {
		setState({ ...state, [event.target.name]: event.target.value });
        // console.log(event.target.value)
	}
     


  return (
    <form className='text-center' onSubmit={onSubmit}>
        <div className='flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2'>
        <Input placeholder='Name' id='name' type='text' name='name' onChange={handleChange} value={state.name}/>
        <Input placeholder='Email' id='email' type='email' name='email' onChange={handleChange} value={state.email}/>
        <Input placeholder='Password' id='password' type='password' name='password' onChange={handleChange} value={state.password}/>
        <button type='submit' className='bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Submit</button>
        </div>

        <div>
          <div className='text-center mt-8'>Do you have an account ? 
            <Link href='/login' className='text-indigo-500 font-semibold hover:underline'>Sign in</Link></div>
        </div>
    </form>
  )
}