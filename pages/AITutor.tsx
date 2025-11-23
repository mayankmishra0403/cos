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
      text: 'Hello! I am your AI Tutor. Ask me anything about AKTU syllabus or DSA problems. How can I help you today?',
      timestamp: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
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
          ? { ...msg, text: "Unable to connect to the AI service. Please verify your connection or API key." }
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
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-50">
      {/* Header */}
      <div className="flex-none px-6 py-4 border-b border-slate-200 bg-white/80 backdrop-blur-sm z-10 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg shadow-sm">
             <Sparkles size={18} />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-900 leading-none">Shiksha AI Tutor</h1>
            <p className="text-xs text-slate-500 mt-1">Powered by Gemini 2.5 Flash</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-medium text-slate-500">Online</span>
        </div>
      </div>

      {/* Chat Area */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}
          >
            <div className={`flex gap-3 max-w-[90%] md:max-w-2xl ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              
              <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center border shadow-sm mt-1 ${
                msg.role === 'user' ? 'bg-slate-900 border-slate-900 text-white' : 'bg-white border-slate-200 text-indigo-600'
              }`}>
                {msg.role === 'user' ? <User size={14} /> : <Bot size={16} />}
              </div>

              <div className={`relative px-5 py-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-slate-900 text-white rounded-tr-sm' 
                  : 'bg-white text-slate-700 border border-slate-200 rounded-tl-sm'
              }`}>
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="prose prose-sm max-w-none prose-slate prose-headings:font-semibold prose-a:text-indigo-600 prose-p:leading-relaxed prose-pre:bg-slate-50 prose-pre:border prose-pre:border-slate-100">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start w-full">
                <div className="flex gap-3 max-w-2xl">
                     <div className="flex-shrink-0 h-8 w-8 rounded-full bg-white border border-slate-200 text-indigo-600 flex items-center justify-center shadow-sm">
                        <Bot size={16} />
                     </div>
                     <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                        <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                     </div>
                </div>
            </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex-none p-4 md:p-6 bg-slate-50">
        <div className="max-w-3xl mx-auto">
            <div className="relative flex items-end rounded-2xl shadow-lg shadow-slate-200/50 ring-1 ring-inset ring-slate-200 focus-within:ring-2 focus-within:ring-indigo-600 bg-white transition-shadow duration-200">
            <textarea
                className="block w-full resize-none border-0 bg-transparent py-4 pl-4 pr-12 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6 max-h-48 rounded-2xl"
                placeholder="Ask your question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={1}
                style={{ minHeight: '56px' }}
            />
            <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 bottom-2 p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl disabled:opacity-50 disabled:hover:bg-transparent disabled:text-slate-400 transition-all duration-200"
            >
                {isLoading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
            </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-3 font-medium">
                AI responses can be inaccurate. Always verify important academic details.
            </p>
        </div>
      </div>
    </div>
  );
};

export default AITutor;