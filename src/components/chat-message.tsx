'use client';

import type { Message } from '@/app/page'; // Assuming Message type is defined in page.tsx
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex items-start gap-3',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarFallback className="bg-primary text-primary-foreground">
            <Bot size={18} />
          </AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          'max-w-[75%] rounded-lg p-3 text-sm shadow-sm',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card text-card-foreground'
        )}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <Avatar className="h-8 w-8 border">
          <AvatarFallback className="bg-secondary text-secondary-foreground">
             <User size={18} />
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
