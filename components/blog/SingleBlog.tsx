'use client'

import { SafeBlogs, SafeUser } from "@/types"
import Image from "next/image"
import {RiDeleteBin5Line} from 'react-icons/ri'
import {BsFillPencilFill} from 'react-icons/bs'
import { useRouter } from "next/navigation"
import axios from "axios"

interface BlogProps {
    key:string
    data:SafeBlogs
    currentUser?:SafeUser | null
}

export default function SingleBlog({data, key, currentUser}: BlogProps) {

    const router = useRouter();

    const onDelete = () => {

        axios.delete(`/api/blogs/${data.id}`)
        .then(() => {
          router.refresh()
        })
        .catch((error) => {
            throw new Error
        })
        .finally(() => {
            router.push('/')
        })
      }

    return (
        <div className="w-[1100px] p-4 mt-2 border-2">
            <div>
            <div className="flex gap-2 justify-between items-center">
                <Image width={400} className="w-[500px] object-contain" height={300} src={data.imageSrc} alt="Blog Image" />

                <div className="w-[530px] flex flex-col gap-4 leading-[1.5]">
                <h1 className="text-3xl font-bold text-red-700 mb-6">{data.name}</h1>
                <p className="font-bold text-gray-700">{data.description}</p>
                </div>
            </div>
        

        {data.userId === currentUser?.id && (
            <div className="flex items-center gap-4 mt-4">
          <RiDeleteBin5Line onClick={onDelete} className=" cursor-pointer text-[1.5rem]"/>
          <BsFillPencilFill onClick={() => router.push(`/blogs/${data.id}`)} className=" cursor-pointer text-[1.2rem]"/>
          </div>
        )}
        </div>
        </div>  
    )
}