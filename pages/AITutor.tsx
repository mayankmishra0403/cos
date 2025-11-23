import React, { useState, useRef, useEffect } from 'react';
import { sendMessageStream } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Hello! I am your AI Tutor. Ask me anything about AKTU syllabus or DSA problems.',
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

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
      const streamResult = await sendMessageStream(userMessage.text);
      
      let accumulatedText = '';
      
      for await (const chunk of streamResult) {
        const responseChunk = chunk as GenerateContentResponse;
        // Extract text properly based on Gemini SDK structure
        const chunkText = responseChunk.text || '';
        accumulatedText += chunkText;

        setMessages(prev => prev.map(msg => 
          msg.id === modelMessageId 
            ? { ...msg, text: accumulatedText }
            : msg
        ));
      }

    } catch (error) {
      setMessages(prev => prev.map(msg => 
        msg.id === modelMessageId 
          ? { ...msg, text: "Sorry, I encountered an error connecting to the AI service. Please check your API Key or internet connection." }
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
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-100">
      <div className="bg-white shadow-sm p-4 border-b border-slate-200 flex items-center">
        <div className="p-2 bg-indigo-100 rounded-lg mr-3">
           <Sparkles className="text-indigo-600" size={24} />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-800">Shiksha AI Tutor</h1>
          <p className="text-xs text-slate-500">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center mt-1 ${
                msg.role === 'user' ? 'bg-indigo-600 ml-2' : 'bg-green-600 mr-2'
              }`}>
                {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
              </div>

              {/* Bubble */}
              <div className={`p-4 rounded-2xl text-sm shadow-sm overflow-hidden ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="prose prose-sm max-w-none dark:prose-invert prose-indigo">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto relative flex items-end bg-slate-50 border border-slate-300 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500 transition-shadow shadow-sm">
          <textarea
            className="w-full bg-transparent p-4 max-h-32 min-h-[3rem] resize-none focus:outline-none text-slate-800"
            placeholder="Ask about Unit 3 of OS or a specific DSA problem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            rows={1}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 mb-1 mr-1 text-indigo-600 hover:bg-indigo-100 rounded-lg disabled:opacity-50 disabled:hover:bg-transparent transition-colors"
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>
        <p className="text-center text-xs text-slate-400 mt-2">
          AI can make mistakes. Always check important info.
        </p>
      </div>
    </div>
  );
};

export default AITutor;