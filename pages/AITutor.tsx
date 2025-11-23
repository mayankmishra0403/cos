import React, { useState, useRef, useEffect } from 'react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello! I am your AI Tutor. Ask me anything about AKTU syllabus, programming, or DSA problems. How can I help you today?\n\n*Note: This is a free service with rate limits. Please wait a few seconds between messages.*',
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Check for client-side rate limiting (minimum 2 seconds between requests)
    const now = Date.now();
    if (now - lastRequestTime < 2000) {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Please wait a moment before sending another message.",
        timestamp: Date.now(),
      }]);
      return;
    }

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setLastRequestTime(now);

    // Create a placeholder for the model response
    const modelMessageId = (Date.now() + 1).toString();
    const modelMessage: ChatMessage = {
      id: modelMessageId,
      role: 'model',
      text: '',
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, modelMessage]);

    try {
      const response = await sendMessageStream(userMessage.text);
      
      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              // Try multiple response formats
              let content = parsed.choices?.[0]?.delta?.content || // OpenRouter format
                           parsed.output || // Bytez format
                           parsed.generated_text || // Some models
                           parsed.text || // Direct text
                           parsed.response; // Alternative format
              
              if (content) {
                accumulatedText += content;
                setMessages(prev => prev.map(msg => 
                  msg.id === modelMessageId 
                    ? { ...msg, text: accumulatedText }
                    : msg
                ));
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }

      // Cache the successful response
      if (accumulatedText.trim()) {
        // Import the cache function from geminiService
        import('../services/geminiService').then(({ cacheResponse }) => {
          cacheResponse(userMessage.text.toLowerCase().trim(), accumulatedText);
        });
      }

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId 
          ? { ...msg, text: error instanceof Error && error.message === '429' 
              ? "Sorry, I'm receiving too many requests right now. Please wait a moment and try again. (Rate limit exceeded)" 
              : "Sorry, I encountered an error. Please check your internet connection and try again." }
          : msg
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="bg-muted shadow-lg p-6 border-b border-border">
        <div className="max-w-4xl mx-auto flex items-center">
          <div className="p-3 bg-primary/10 rounded-xl mr-4">
            <Sparkles className="text-primary" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">AI Tutor - Free for Everyone</h1>
            <p className="text-sm text-muted-foreground mt-1">Powered by Llama 3.2 • Available 24/7 • No Login Required</p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center mt-1 shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                </div>

                {/* Bubble */}
                <Card className={`text-sm shadow-lg ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card text-card-foreground'
                }`}>
                  <CardContent className="p-4">
                    {msg.role === 'user' ? (
                      <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                    ) : (
                      <div className="prose prose-sm max-w-none prose-headings:font-bold prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted">
                        <ReactMarkdown>{msg.text || '...'}</ReactMarkdown>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-card border-t border-border shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end bg-muted border border-border rounded-2xl focus-within:ring-4 focus-within:ring-ring focus-within:ring-opacity-30 focus-within:border-ring transition-all shadow-lg">
            <textarea
              className="w-full bg-transparent p-4 pr-14 max-h-32 min-h-[3.5rem] resize-none focus:outline-none text-foreground placeholder-muted-foreground"
              placeholder="Ask about AKTU syllabus, programming concepts, DSA problems..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              rows={1}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="absolute right-2 bottom-2"
              size="sm"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </Button>
          </div>
          <p className="text-center text-xs text-muted-foreground mt-3">
            💡 AI-powered responses • Free to use • Rate limited • No login required
          </p>
        </div>
      </div>
    </div>
  );
};

export default AITutor;