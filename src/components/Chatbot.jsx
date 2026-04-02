import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import './Chatbot.css';

const WEBHOOK_URL = import.meta.env.VITE_N8N_CHATBOT_WEBHOOK_URL;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Segun's AI assistant. Ask me anything about his skills, projects, or availability!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substring(2, 15));
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
        body: JSON.stringify({ sessionId, chatHistory: newChatHistory })
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      const botResponse = data.output || "I'm sorry, I couldn't process your request.";
      setMessages(prev => [...prev, { role: 'assistant', content: botResponse }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting right now. Please try again later."
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-label="AI Chat Assistant">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              <MessageCircle size={18} aria-hidden="true" />
              <span>AI Assistant</span>
            </div>
            <div className="chatbot-status">
              <span className="chatbot-status-dot" />
              Online
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="chatbot-close"
              aria-label="Close chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-bubble-container ${msg.role}`}>
                <div className="chat-bubble">
                  {msg.role === 'assistant'
                    ? <ReactMarkdown>{msg.content}</ReactMarkdown>
                    : msg.content
                  }
                </div>
              </div>
            ))}

            {/* Typing indicator — three bouncing dots */}
            {isLoading && (
              <div className="chat-bubble-container assistant">
                <div className="chat-bubble typing-indicator">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="chatbot-input-area">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              aria-label="Chat message input"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              aria-label="Send message"
            >
              <Send size={17} />
            </button>
          </form>
        </div>
      )}

      {/* Toggle button */}
      <button
        className="chatbot-toggle orb-btn"
        onClick={() => setIsOpen(o => !o)}
        aria-label={isOpen ? 'Close chat' : 'Open AI chat'}
        aria-expanded={isOpen}
      >
        <div className="orb-glow" />
        <div className="orb-bg">
          <div className="orb-glass" />
          <div className="orb-highlight" />
          <div className="orb-texture" />
          <div className="orb-icon">
            {isOpen ? <X size={24} /> : <Sparkles size={24} />}
          </div>
        </div>
      </button>
    </div>
  );
};

export default Chatbot;
