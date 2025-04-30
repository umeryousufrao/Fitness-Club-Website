import { NextResponse } from 'next/server';
import { initSocket } from '@/lib/socket';

export async function GET(req: Request) {
  try {
    const res = new NextResponse();
    const io = initSocket(res as any);
    
    return new NextResponse('Socket server initialized', {
      status: 200,
    });
  } catch (error) {
    console.error('Socket initialization error:', error);
    return new NextResponse('Socket initialization failed', {
      status: 500,
    });
  }
} 