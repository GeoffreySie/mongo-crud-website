import connectMongodb from "@/libs/mongodb"
import Topic from "@/models/topics"
import { AnyArray } from "mongoose"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest): Promise<NextResponse> {
    try {
        const { title, description }: { title: string, description: string } = await request.json();
        
        if (!title || !description) {
            return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
        }

        await connectMongodb();
        await Topic.create({ title, description });

        return NextResponse.json({ message: 'Topic created' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating topic' }, { status: 500 });
    }
}

export async function GET() {

    try {

        await connectMongodb()
        const topics = await Topic.find({})
        return NextResponse.json({topics})
        
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching topics' }, { status: 500 });
    }
    
}
