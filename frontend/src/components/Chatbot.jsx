import React, { useState, useEffect } from 'react';
import './ChatBot.css';

const services = [
  { id: 'web-dev', title: 'Web Development' },
  { id: 'ai-ml', title: 'AI/ML Solutions' },
  { id: 'data-analytics', title: 'Data Analytics' },
  { id: 'cloud', title: 'Cloud Integration' },
  { id: 'marketing', title: 'Digital Marketing' },
];

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [step, setStep] = useState(-1); // -1 = idle, 0 = choose service, 1 = enter email, 2 = done
  const [selectedService, setSelectedService] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showServices, setShowServices] = useState(false); // 🔄 Controls when to show services

  const toggleChat = () => {
    setOpen(!open);
    if (!open && messages.length === 0) {
      startConversation();
    }
  };

  const addBotMessage = (text) => {
    setMessages((prev) => [...prev, { from: 'bot', text }]);
  };

  const addUserMessage = (text) => {
    setMessages((prev) => [...prev, { from: 'user', text }]);
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const startConversation = () => {
    setTimeout(() => addBotMessage("👋 Welcome to InfoYieldX!"), 1000);
    setTimeout(() => addBotMessage("💡 How can I help you today?"), 2000);
    setTimeout(() => {
      addBotMessage("Please choose one of our services below:");
      setShowServices(true); // ✅ Display chips only after intro
      setStep(0); // Ready to select service
    }, 3000);
  };

  const handleServiceClick = (service) => {
    setSelectedService(service.title);
    addUserMessage(service.title);
    addBotMessage(`✅ You selected: ${service.title}`);
    setStep(1);
    setTimeout(() => addBotMessage("📧 Please enter your email address:"), 1000);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input.trim();
    addUserMessage(userText);
    setInput('');

    if (step === 1) {
      if (!isValidEmail(userText)) {
        addBotMessage("❌ Invalid email. Please try again:");
        return;
      }

      setUserEmail(userText);
      setStep(2);
      addBotMessage("✅ Thank you! Our team will contact you soon.");
      addBotMessage("📨 A confirmation email has been sent to your address.");
      addBotMessage("💬 For more queries, visit our Contact page.");

      const chatText = [...messages, { from: 'user', text: userText }]
        .map(m => `${m.from === 'bot' ? '🤖' : '🧑'}: ${m.text}`).join('\n');

      await fetch('http://localhost:8080/api/chatbot/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: userText,
          service: selectedService,
          chat: chatText
        })
      });
    }
  };

  return (
    <div className={`chatbot-container ${open ? 'open' : ''}`}>
      <div className="chat-toggle" onClick={toggleChat}>💬</div>
      {open && (
        <div className="chat-window">
          <div className="chat-header">
  InfoYieldX Assistant
  <div className="header-buttons">
    <button className="chat-btn" onClick={() => {
      setMessages([]);
      setInput('');
      setStep(-1);
      setSelectedService('');
      setUserEmail('');
      setShowServices(false);
      startConversation(); // restart flow
    }}>⟳</button>
    <button className="chat-btn" onClick={() => setOpen(false)}>✖</button>
  </div>
</div>

          <div className="chat-body">
            {messages.map((msg, idx) => (
              <div key={idx} className={`chat-msg ${msg.from}`}>{msg.text}</div>
            ))}

            {step === 0 && showServices && (
              <div className="chip-container">
                {services.map((s) => (
                  <button key={s.id} className="chat-chip" onClick={() => handleServiceClick(s)}>
                    {s.title}
                  </button>
                ))}
              </div>
            )}
          </div>

          {step === 1 && (
            <div className="chat-input">
              <input
                type="email"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your email..."
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button onClick={handleSend}>Send</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBot;
