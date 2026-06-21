import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi there! I'm Farman's AI assistant. Ask me anything about his skills, experience, or projects!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage.text })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else {
        setMessages(prev => [...prev, { sender: 'ai', text: `Error: ${data.error}` }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span>Ask AI</span>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>&times;</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-message ai">
                Thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className="chatbot-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              className="chatbot-input" 
              placeholder="Type your question..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button type="submit" className="chatbot-send" disabled={isLoading || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      )}
      <button className="chatbot-toggle" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
}

export default Chatbot;
