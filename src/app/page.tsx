'use client';

import * as React from 'react';
import { SendHorizontal, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from '@/components/chat-message';
import { sendMessage } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';

export interface Message {
  id: string;
  role: 'user' | 'agent';
  content: string;
}

export default function AgentChatPage() {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom when messages change
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      // Access the viewport element directly
      const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput || isLoading) return;

    setIsLoading(true);
    setInput('');

    const newUserMessage: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmedInput,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    const result = await sendMessage(trimmedInput);

    if (result.error) {
      console.error('Error:', result.error);
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      });
       // Optionally remove the user message or add an error message
       setMessages((prev) => [...prev, { id: crypto.randomUUID(), role: 'agent', content: `Error: ${result.error}` }]);
    } else if (result.data) {
      const agentMessage: Message = {
        id: crypto.randomUUID(),
        role: 'agent',
        content: result.data.message,
      };
      setMessages((prev) => [...prev, agentMessage]);
    }

    setIsLoading(false);
  };

  return (
    <div className="flex h-[600px] w-[400px] flex-col border bg-background shadow-lg rounded-lg">
      <header className="border-b p-4">
        <h1 className="text-lg font-semibold text-foreground">AI Agent Chat</h1>
      </header>
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
             <div className="flex items-start gap-3 justify-start">
               <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
             </div>
          )}
        </div>
      </ScrollArea>
      <footer className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
            className="flex-1"
            aria-label="Chat message input"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <SendHorizontal className="h-4 w-4" />
            )}
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </footer>
      <Toaster />
    </div>
  );
}
