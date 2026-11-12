import { useState, useRef, useEffect } from 'react';
import { askQuestion } from '../api/mockApi';
import './ChatInterface.css';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages, loading]);

  const handleSend = async () => {
    const query = input.trim();
    if (!query || loading) return;
    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, role: 'user', content: query }]);
    setInput('');
    setLoading(true);
    try {
      const answer = await askQuestion(query);
      setMessages((prev) => [...prev, { id: `${Date.now()}-a`, role: 'assistant', content: answer }]);
    } catch {
      setMessages((prev) => [...prev, { id: `${Date.now()}-e`, role: 'assistant', content: 'Не удалось обработать запрос. Попробуйте ещё раз.' }]);
    } finally { setLoading(false); }
  };

  return (
    <div className="chat">
      <div className="chat-messages">
        {!messages.length && <div className="chat-hint"><strong>Опишите, какой фильм хотите посмотреть</strong><br />Например: «Посоветуй фантастику с рейтингом выше 8» или «Фильмы с Леонардо Ди Каприо».</div>}
        {messages.map((m) => <div key={m.id} className={`chat-row ${m.role === 'user' ? 'chat-row-user' : 'chat-row-bot'}`}><div className={`chat-bubble ${m.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot'}`}>{m.content}</div></div>)}
        {loading && <div className="chat-typing">Подбираю фильмы…</div>}
        <div ref={bottomRef} />
      </div>
      <div className="chat-input-row">
        <input className="chat-input" type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Например: детектив с рейтингом от 8" />
        <button className="chat-send" onClick={handleSend} disabled={loading || !input.trim()}>Подобрать</button>
      </div>
    </div>
  );
};
export default ChatInterface;
