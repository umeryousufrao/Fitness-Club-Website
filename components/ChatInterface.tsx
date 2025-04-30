import React, { useState } from 'react';
import { useChat } from '@/hooks/useChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatInterfaceProps {
  userId: string;
  trainerId: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ userId, trainerId }) => {
  const [message, setMessage] = useState('');
  const { messages, sendMessage, isConnected } = useChat(userId, trainerId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Chat with Trainer</h2>
        <div className="text-sm text-gray-500">
          Status: {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 ${
              msg.senderType === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.senderType === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.content}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" disabled={!isConnected}>
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}; 