import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, X, Send } from 'lucide-react';
import './Chatbot.css';

const WEBHOOK_URL = import.meta.env.VITE_N8N_CHATBOT_WEBHOOK_URL;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Segun's AI assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // initialize session ID
    setSessionId(Math.random().toString(36).substring(2, 15));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    const newChatHistory = [...messages, { role: 'user', content: userMessage }];
    setMessages(newChatHistory);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          chatHistory: newChatHistory
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const botResponse = data.output || "I'm sorry, I couldn't process your request.";
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);

    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-title">
              <MessageCircle size={20} />
              <span>AI Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="chatbot-close" aria-label="Close Chat">
              <X size={20} />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble-container ${msg.role}`}>
                <div className="chat-bubble">
                  {msg.role === 'assistant' ? (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble-container assistant">
                <div className="chat-bubble typing-indicator">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
            />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send Message">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)} aria-label="Open Chat">
          <MessageCircle size={28} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
