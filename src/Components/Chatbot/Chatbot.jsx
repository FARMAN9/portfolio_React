import { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { answerPortfolioQuestion } from '../../data/portfolioKnowledge';
import { apiFetch, hasApiBaseUrl } from '../../utils/api';
import { FiSend, FiRefreshCw, FiVolume2, FiVolumeX, FiX, FiMessageSquare } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';

const SUGGESTIONS = [
  "💼 Core Skills & Tech Stack",
  "🚀 Featured Projects & Demos",
  "📚 Research & Google Scholar",
  "📄 Resume & Background",
  "📬 Contact & Hire Farman",
  "🎓 Education & Location"
];

// Lightweight pleasant Web Audio API chime
function playChime(isMuted) {
  if (isMuted) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
    gain.gain.setValueAtTime(0.04, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.24);
  } catch {
    // audio context blocked or unsupported
  }
}

// Convert markdown links, plain URLs, emails and phone numbers into clickable elements
function renderFormattedMessage(text) {
  if (!text) return null;

  // Split into lines
  const lines = text.split('\n');

  return lines.map((line, lIdx) => {
    // URL or Email or Phone regex
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const emailRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
    const phoneRegex = /(\+91[0-9]{10})/g;

    const parts = line.split(urlRegex);

    return (
      <span key={lIdx} className="chat-line">
        {parts.map((part, pIdx) => {
          if (part.match(urlRegex)) {
            return (
              <a 
                key={pIdx} 
                href={part} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="chat-link"
              >
                {part.replace(/^https?:\/\/(www\.)?/, '')} ↗
              </a>
            );
          }

          // Check for email
          const emailParts = part.split(emailRegex);
          if (emailParts.length > 1) {
            return emailParts.map((sub, sIdx) => {
              if (sub.match(emailRegex)) {
                return (
                  <a key={sIdx} href={`mailto:${sub}`} className="chat-link chat-mail">
                    {sub}
                  </a>
                );
              }
              return sub;
            });
          }

          // Check for phone
          const phoneParts = part.split(phoneRegex);
          if (phoneParts.length > 1) {
            return phoneParts.map((sub, sIdx) => {
              if (sub.match(phoneRegex)) {
                return (
                  <a key={sIdx} href={`tel:${sub}`} className="chat-link chat-phone">
                    {sub}
                  </a>
                );
              }
              return sub;
            });
          }

          // Bold markdown handling **text**
          const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
          return boldParts.map((bPart, bIdx) => {
            if (bPart.startsWith('**') && bPart.endsWith('**')) {
              return <strong key={bIdx}>{bPart.slice(2, -2)}</strong>;
            }
            return bPart;
          });
        })}
        {lIdx < lines.length - 1 && <br />}
      </span>
    );
  });
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isSoundMuted, setIsSoundMuted] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "👋 Hi! I'm Farman's AI Portfolio Assistant. Ask me anything about his full-stack MERN & Python development, machine learning projects, or work experience!"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendQuery = async (queryText) => {
    const trimmed = queryText.trim();
    if (!trimmed || isLoading) return;

    const userMessage = { sender: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setHasInteracted(true);

    // Timeout controller to guarantee fast response
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    try {
      if (!hasApiBaseUrl) {
        throw new Error('No API configured, using smart offline fallback');
      }

      const response = await apiFetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API error ${response.status}`);
      }

      const data = await response.json();
      const reply = data.reply || answerPortfolioQuestion(trimmed);
      setMessages((prev) => [...prev, { sender: 'ai', text: reply }]);
      playChime(isSoundMuted);
    } catch {
      clearTimeout(timeoutId);
      // Smart instant fallback
      const fallbackReply = answerPortfolioQuestion(trimmed);
      setMessages((prev) => [...prev, { sender: 'ai', text: fallbackReply }]);
      playChime(isSoundMuted);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendQuery(input);
  };

  const resetChat = () => {
    setMessages([
      {
        sender: 'ai',
        text: "Conversation reset! 👋 What would you like to explore about Farman's projects or skills?"
      }
    ]);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar-badge">
                <FaRobot />
                <span className="chatbot-status-dot" title="Online" />
              </div>
              <div className="chatbot-title-group">
                <span className="chatbot-name">Farman AI Assistant</span>
                <span className="chatbot-status-text">Available • Instant Answers</span>
              </div>
            </div>
            <div className="chatbot-header-actions">
              <button 
                type="button" 
                className="chatbot-icon-btn" 
                onClick={() => setIsSoundMuted(!isSoundMuted)}
                title={isSoundMuted ? "Unmute sounds" : "Mute sounds"}
              >
                {isSoundMuted ? <FiVolumeX size={15} /> : <FiVolume2 size={15} />}
              </button>
              <button 
                type="button" 
                className="chatbot-icon-btn" 
                onClick={resetChat}
                title="Restart chat"
              >
                <FiRefreshCw size={14} />
              </button>
              <button 
                type="button" 
                className="chatbot-close" 
                onClick={() => setIsOpen(false)}
                title="Close chat"
              >
                <FiX size={18} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-message ${msg.sender}`}>
                {msg.sender === 'ai' && (
                  <div className="chat-ai-label">
                    <span>Farman AI</span>
                  </div>
                )}
                <div className="chat-text">
                  {renderFormattedMessage(msg.text)}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chat-message ai">
                <div className="chat-ai-label"><span>Farman AI</span></div>
                <div className="chatbot-typing-bubble">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions */}
          <div className="chatbot-suggestions">
            <span className="chatbot-suggestions-title">Quick Topics:</span>
            <div className="chatbot-chips-scroll">
              {SUGGESTIONS.map((suggestion, sIdx) => (
                <button
                  key={sIdx}
                  type="button"
                  className="chatbot-chip"
                  onClick={() => sendQuery(suggestion.replace(/^[^\s]+\s/, ''))}
                  disabled={isLoading}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <form className="chatbot-input-area" onSubmit={handleSend}>
            <input
              type="text"
              className="chatbot-input"
              placeholder="Ask about projects, skills, resume..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="chatbot-send-btn"
              disabled={isLoading || !input.trim()}
              title="Send message"
            >
              <FiSend size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Chat Trigger Button */}
      <button 
        type="button"
        className="chatbot-toggle" 
        onClick={() => {
          setIsOpen(!isOpen);
          setHasInteracted(true);
        }}
        aria-label="Toggle portfolio AI assistant"
      >
        {isOpen ? (
          <FiX size={24} />
        ) : (
          <>
            <FiMessageSquare size={24} />
            {!hasInteracted && <span className="chatbot-unread-ping" />}
          </>
        )}
      </button>
    </div>
  );
}

export default Chatbot;
