import React, { useState, useRef, useEffect } from 'react';
import * as Icons from 'lucide-react';
import { ChatMessage } from '../types';
import { askCopilot } from '../services/aiService';
import { Button } from './ui/Button';

interface AICopilotProps {
  isOpen: boolean;
  onClose: () => void;
  contextData?: any;
}

export const AICopilot: React.FC<AICopilotProps> = ({ isOpen, onClose, contextData }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: 'Hello! I am your AIPCOS Copilot. I can analyze schedule variances, suggest recovery plans, or draft delay narratives. How can I assist you today?',
      timestamp: new Date()
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
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseText = await askCopilot(userMsg.text, contextData);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 glass border-l border-slate-200/20 dark:border-slate-700/50 z-40 flex flex-col shadow-2xl transform transition-transform duration-300 ease-in-out">
      {/* Header */}
      <div className="h-16 border-b border-slate-200/20 dark:border-slate-700/50 flex items-center justify-between px-4 bg-gradient-to-r from-brand-900/10 to-transparent">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-brand-500/20 rounded-lg">
            <Icons.Sparkles className="h-5 w-5 text-brand-500" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white">AI Copilot</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <Icons.X className="h-5 w-5" />
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-brand-600 text-white rounded-tr-sm' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 rounded-tl-sm'
              }`}
            >
              {/* Simple markdown rendering for bold text */}
              <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
              <div className={`text-[10px] mt-1 text-right ${msg.role === 'user' ? 'text-brand-200' : 'text-slate-400'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
              <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-200/20 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="relative flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about delays, recovery plans..."
            className="w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-xl pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none max-h-32 min-h-[44px]"
            rows={1}
          />
          <Button 
            variant="primary" 
            size="icon" 
            className="absolute right-1.5 bottom-1.5 h-8 w-8 rounded-lg"
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
          >
            <Icons.Send className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto no-scrollbar pb-1">
          {['Analyze SPI', 'Generate Recovery Plan', 'Draft EOT'].map((suggestion) => (
            <button 
              key={suggestion}
              onClick={() => setInput(suggestion)}
              className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full bg-slate-200/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-brand-100 dark:hover:bg-brand-900/30 hover:text-brand-600 dark:hover:text-brand-400 transition-colors border border-transparent hover:border-brand-200 dark:hover:border-brand-800"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};