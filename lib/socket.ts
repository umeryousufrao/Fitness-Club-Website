import { Server as NetServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { NextApiResponse } from 'next';

export type NextApiResponseWithSocket = NextApiResponse & {
  socket: {
    server: NetServer & {
      io?: SocketIOServer;
    };
  };
};

export const initSocket = (res: NextApiResponseWithSocket) => {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server);
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('join-chat', (data: { userId: string; trainerId: string }) => {
        const roomId = `${data.userId}-${data.trainerId}`;
        socket.join(roomId);
      });

      socket.on('send-message', (data: { 
        content: string; 
        userId: string; 
        trainerId: string;
        senderType: 'user' | 'trainer';
      }) => {
        const roomId = `${data.userId}-${data.trainerId}`;
        io.to(roomId).emit('receive-message', {
          content: data.content,
          senderType: data.senderType,
          timestamp: new Date(),
        });
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }
  return res.socket.server.io;
}; 