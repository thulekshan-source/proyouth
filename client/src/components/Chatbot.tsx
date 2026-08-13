import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare, X, Send, Bot, User } from 'lucide-react';
import clsx from 'clsx';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export const Chatbot: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial welcome message when opened for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { id: Date.now().toString(), sender: 'ai', text: t('chatbot.welcome') }
      ]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input.trim()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "I'm a demo AI. In a real application, I would provide personalized career advice based on your question!"
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={clsx(
          "fixed bottom-20 sm:bottom-8 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110",
          "bg-gradient-to-r from-purple-600 to-blue-600 text-white",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        )}
      >
        <MessageSquare size={28} />
      </button>

      {/* Chat Window */}
      <div
        className={clsx(
          "fixed z-50 transition-all duration-300 ease-in-out sm:rounded-2xl shadow-2xl bg-white flex flex-col border border-gray-100",
          "bottom-0 sm:bottom-24 right-0 sm:right-6",
          "w-full sm:w-96 h-[80vh] sm:h-[500px]",
          isOpen ? "translate-y-0 opacity-100 visible" : "translate-y-20 opacity-0 invisible"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white sm:rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
              <Bot size={20} />
            </div>
            <h3 className="font-bold">{t('chatbot.title')}</h3>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map(msg => (
            <div 
              key={msg.id} 
              className={clsx(
                "flex items-end gap-2",
                msg.sender === 'user' ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={clsx(
                "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                msg.sender === 'user' ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
              )}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={clsx(
                "max-w-[75%] p-3 rounded-2xl text-sm",
                msg.sender === 'user' 
                  ? "bg-blue-600 text-white rounded-br-sm" 
                  : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-sm"
              )}>
                {msg.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl rounded-bl-sm flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-gray-100 sm:rounded-b-2xl">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chatbot.placeholder')}
              className="flex-1 bg-gray-100 border-transparent focus:bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-full px-4 py-2 text-sm outline-none transition-all"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 disabled:opacity-50 transition-colors"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
