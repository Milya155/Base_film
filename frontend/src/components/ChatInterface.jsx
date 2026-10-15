import { useState, useRef, useEffect } from 'react';
import { askQuestion } from '../api/mockApi';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const answer = await askQuestion(input);

    const botMsg = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: answer,
    };
    setMessages((prev) => [...prev, botMsg]);
    setLoading(false);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {messages.length === 0 && (
          <p className="chat-hint">
            Задайте вопрос, например: «Что приготовить из курицы и риса?»
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={'chat-row ' + (m.role === 'user' ? 'chat-row-user' : 'chat-row-bot')}
          >
            <div className={'chat-bubble ' + (m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot')}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="chat-typing">ИИ печатает…</div>}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          className="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ваш вопрос..."
        />
        <button className="chat-send" onClick={handleSend} disabled={loading}>
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
