import { NextRequest, NextResponse } from 'next/server';
import Topic from '@/models/topics';
import connectMongodb from '@/libs/mongodb';

type Params = {
    id: string;
}

export async function PUT(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
    const { id } = params;

    try {

        const { title, description }: { title: string, description: string } = await request.json();

        if (!title || !description) {
            return NextResponse.json({ message: 'Title and description are required' }, { status: 400 });
        }
        
        await connectMongodb();
        const updatedTopic = await Topic.findByIdAndUpdate(id, { title, description }, { new: true });

        if (!updatedTopic) {
            return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Topic updated', topic: updatedTopic }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ message: 'Error updating topic' }, { status: 500 });
    }
    

}

export async function GET(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
    const { id } = params;

    try {
        await connectMongodb();
        const topic=await Topic.findOne({ _id: id });
        return NextResponse.json({ topic }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching topic' }, { status: 500 });
    }

}


export async function DELETE(request: NextRequest, { params }: { params: Params }): Promise<NextResponse> {
    const { id } = params

    if (!id) {
        return NextResponse.json({message: 'Missing id'}, { status: 400 })
    }

    await connectMongodb()

    try {
        await Topic.findByIdAndDelete(id);
        return NextResponse.json({ message: 'Topic deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting topic' }, { status: 500 });
    }
}