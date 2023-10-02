import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from '../../../lib/prismadb'

interface IParams {
    blogId?:string
}