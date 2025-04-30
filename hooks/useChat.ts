import { useEffect, useState } from 'react';
import io from 'socket.io-client';

interface Message {
  content: string;
  senderType: 'user' | 'trainer';
  timestamp: Date;
}

export const useChat = (userId: string, trainerId: string) => {
  const [socket, setSocket] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io({
      path: '/api/socket',
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      socketInstance.emit('join-chat', { userId, trainerId });
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    socketInstance.on('receive-message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [userId, trainerId]);

  const sendMessage = (content: string) => {
    if (socket && isConnected) {
      socket.emit('send-message', {
        content,
        userId,
        trainerId,
        senderType: 'user',
      });
    }
  };

  return {
    messages,
    sendMessage,
    isConnected,
  };
}; 