import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, X, Send, Sparkles, RefreshCw, Phone, 
  CheckCircle2, ShieldCheck, MapPin, Calendar, Heart, ArrowRight
} from 'lucide-react';
import { generateBotResponse, saveLead, extractPhoneNumber } from '../services/chatbotService';
import { BrandStamp } from './Doodles';
import confetti from 'canvas-confetti';

const INITIAL_MESSAGES = [
  {
    id: 'msg-init-1',
    sender: 'bot',
    text: 'Dạ em chào anh/chị! Em là **Cô Mai – Tư vấn viên tại Xưởng Vẽ Số Không** ạ. 🎨\n\nKhông biết mình đang quan tâm lớp vẽ sáng tạo cho **bé yêu (4–15 tuổi)** hay lớp mỹ thuật thư giãn cho **người lớn** để em hỗ trợ tư vấn lộ trình phù hợp nhất ạ?'
  }
];

export const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // State for in-chat mini lead form
  const [leadFormData, setLeadFormData] = useState({
    name: '',
    phone: '',
    audience: 'kids',
    branch: 'hn-badinh'
  });
  const [leadFormSubmitted, setLeadFormSubmitted] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Restore history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sokhong_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch (e) {}
  }, []);

  // Save history on change
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem('sokhong_chat_history', JSON.stringify(messages));
      }
    } catch (e) {}
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setShowTeaser(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 200);
  };

  const handleReset = () => {
    if (window.confirm('Bắt đầu cuộc trò chuyện mới?')) {
      setMessages(INITIAL_MESSAGES);
      localStorage.removeItem('sokhong_chat_history');
      setLeadFormSubmitted(false);
    }
  };

  const handleSendMessage = (textToSend) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate human-like consultation response delay
    setTimeout(() => {
      const botReply = generateBotResponse(text, messages);
      setIsTyping(false);

      const botMsg = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: botReply.text,
        showLeadCard: botReply.showLeadCard && !leadFormSubmitted
      };

      setMessages(prev => [...prev, botMsg]);

      if (botReply.leadCaptured) {
        try {
          confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }, 800);
  };

  const handleQuickPrompt = (promptText) => {
    handleSendMessage(promptText);
  };

  const handleMiniLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadFormData.phone.trim()) {
      alert('Vui lòng nhập số điện thoại hoặc Zalo để em giữ chỗ nhé!');
      return;
    }

    saveLead({
      name: leadFormData.name || 'Khách chat',
      phone: leadFormData.phone,
      course: leadFormData.audience,
      branch: leadFormData.branch
    });

    setLeadFormSubmitted(true);

    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    // Add confirmation message from bot
    const confirmMsg = {
      id: `msg-bot-confirm-${Date.now()}`,
      sender: 'bot',
      text: `Dạ em đã lưu thông tin của **${leadFormData.name || 'mình'}** (${leadFormData.phone}) rồi ạ! 🎉\n\nEm đã đăng ký giữ **01 suất học thử miễn phí (0đ)** tại **${
        leadFormData.branch === 'hn-badinh' ? 'CS Ba Đình, HN' :
        leadFormData.branch === 'hn-caugiay' ? 'CS Cầu Giấy, HN' :
        leadFormData.branch === 'hn-tayho' ? 'CS Tây Hồ, HN' :
        leadFormData.branch === 'hp-lechan' ? 'CS Lê Chân, Hải Phòng' : 'CS Ngô Quyền, Hải Phòng'
      }**.\n\nThầy cô phụ trách xưởng sẽ nhắn tin qua Zalo trong vòng **15 phút** để gửi thời khóa biểu chi tiết cho mình nhé ạ!`
    };

    setMessages(prev => [...prev, confirmMsg]);
  };

  // Quick prompt buttons
  const quickPrompts = [
    '🎨 Lớp vẽ cho bé (4–15t)',
    '🖌️ Lớp người lớn chưa biết vẽ',
    '⚡ Đăng ký học thử 0đ',
    '📍 5 cơ sở HN & Hải Phòng',
    '💰 Học phí & Lịch học bù'
  ];

  // Helper render simple markdown (bold, lists)
  const renderFormattedText = (raw) => {
    const lines = raw.split('\n');
    return lines.map((line, lIdx) => {
      // Replace **text** with strong
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <React.Fragment key={lIdx}>
          {parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={pIdx} className="font-extrabold text-charcoal-900">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
          {lIdx < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <>
      {/* ================= 1. FLOATING CHAT TRIGGER ================= */}
      <div className="fixed bottom-6 left-5 z-40 flex flex-col items-start gap-2">
        
        {/* Teaser Bubble (Dismissable) */}
        {!isOpen && showTeaser && (
          <div className="bg-white rounded-2xl p-3 pr-8 border-2 border-charcoal-900 shadow-[4px_4px_0px_#18181B] max-w-xs text-xs animate-bounce relative">
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute top-1.5 right-1.5 text-stone-400 hover:text-charcoal-900 p-0.5"
              aria-label="Đóng thông báo"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <div className="flex items-start gap-2">
              <span className="text-base">👋</span>
              <p className="text-charcoal-800 font-medium leading-relaxed">
                Chào bạn! Cần tư vấn lớp vẽ cho <strong>bé</strong> hay <strong>người lớn</strong> ạ? Nhắn Số Không nhé!
              </p>
            </div>
          </div>
        )}

        {/* Floating Bubble Button */}
        <button
          onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
          className="group relative flex items-center gap-2.5 bg-brand-400 hover:bg-brand-300 text-charcoal-900 p-3 sm:px-4 sm:py-3 rounded-full border-2 border-charcoal-900 shadow-[3px_3px_0px_#18181B] hover:shadow-[4px_4px_0px_#18181B] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
          aria-label="Mở chat tư vấn"
        >
          {/* Online green indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>

          <BrandStamp className="w-6 h-6 flex-shrink-0" />
          
          <span className="font-heading font-black text-xs sm:text-sm tracking-tight hidden sm:inline">
            Tư Vấn Miễn Phí
          </span>
          <MessageCircle className="w-4 h-4 text-charcoal-900 sm:hidden" />
        </button>

      </div>

      {/* ================= 2. CHATBOT WINDOW DIALOG ================= */}
      {isOpen && (
        <div className="fixed bottom-20 left-4 sm:left-6 z-50 w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh] bg-[#FFFDF9] rounded-3xl border-2 border-charcoal-900 shadow-[8px_8px_0px_0px_#18181B] flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-brand-300 via-amber-200 to-yellow-100 p-4 border-b-2 border-charcoal-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <BrandStamp className="w-9 h-9" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h4 className="font-heading font-black text-sm text-charcoal-900 leading-tight">
                  Cô Mai – Tư Vấn Mỹ Thuật
                </h4>
                <p className="text-[10px] font-semibold text-emerald-800 flex items-center gap-1">
                  <span>●</span> Đang trực tuyến • Phản hồi tức thì
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Bắt đầu lại cuộc trò chuyện"
                className="p-1.5 text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-300/60 rounded-lg transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Đóng cửa sổ chat"
                className="p-1.5 text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-300/60 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Announcement Pill inside Chat */}
          <div className="bg-amber-100/90 py-1.5 px-3 border-b border-amber-200 text-[11px] text-amber-950 flex items-center justify-between">
            <span className="flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Tài trợ 100% học phí buổi thử 0đ tuần này!
            </span>
            <span className="font-mono text-[10px] text-amber-800">5 cơ sở HN & HP</span>
          </div>

          {/* Chat Message Stream */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-charcoal-900 text-amber-100 rounded-br-xs shadow-sm font-medium'
                      : 'bg-white text-charcoal-800 rounded-bl-xs border border-amber-200/90 shadow-sm'
                  }`}
                >
                  {renderFormattedText(msg.text)}
                </div>

                {/* In-chat Mini Lead Capture Card */}
                {msg.showLeadCard && !leadFormSubmitted && (
                  <div className="mt-2.5 p-3.5 bg-amber-50 rounded-2xl border-2 border-amber-300 max-w-[92%] shadow-sm">
                    <div className="flex items-center gap-1.5 text-amber-900 font-heading font-black text-xs mb-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      Giữ suất học thử miễn phí (0đ)
                    </div>

                    <form onSubmit={handleMiniLeadSubmit} className="space-y-2">
                      <input
                        type="text"
                        placeholder="Họ tên của bạn hoặc bé..."
                        value={leadFormData.name}
                        onChange={e => setLeadFormData({ ...leadFormData, name: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 text-xs outline-none bg-white focus:border-charcoal-900"
                      />

                      <input
                        type="tel"
                        placeholder="Số điện thoại / Zalo *"
                        required
                        value={leadFormData.phone}
                        onChange={e => setLeadFormData({ ...leadFormData, phone: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 text-xs outline-none bg-white focus:border-charcoal-900"
                      />

                      <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                        <button
                          type="button"
                          onClick={() => setLeadFormData({ ...leadFormData, audience: 'kids' })}
                          className={`py-1 px-1.5 rounded-lg border font-bold transition-all text-center ${
                            leadFormData.audience === 'kids'
                              ? 'bg-amber-400 text-charcoal-900 border-charcoal-900'
                              : 'bg-white text-charcoal-700 border-stone-200'
                          }`}
                        >
                          🎨 Lớp Bé (4-15t)
                        </button>
                        <button
                          type="button"
                          onClick={() => setLeadFormData({ ...leadFormData, audience: 'adults' })}
                          className={`py-1 px-1.5 rounded-lg border font-bold transition-all text-center ${
                            leadFormData.audience === 'adults'
                              ? 'bg-stone-900 text-amber-300 border-stone-900'
                              : 'bg-white text-charcoal-700 border-stone-200'
                          }`}
                        >
                          🖌️ Người Lớn
                        </button>
                      </div>

                      <select
                        value={leadFormData.branch}
                        onChange={e => setLeadFormData({ ...leadFormData, branch: e.target.value })}
                        className="w-full px-2 py-1.5 rounded-lg border border-amber-300 text-[11px] outline-none bg-white"
                      >
                        <option value="hn-badinh">CS1: Ba Đình - Hà Nội</option>
                        <option value="hn-caugiay">CS2: Cầu Giấy - Hà Nội</option>
                        <option value="hn-tayho">CS3: Tây Hồ - Hà Nội</option>
                        <option value="hp-lechan">CS4: Lê Chân - Hải Phòng</option>
                        <option value="hp-ngoquyen">CS5: Ngô Quyền - Hải Phòng</option>
                      </select>

                      <button
                        type="submit"
                        className="w-full py-2 bg-charcoal-900 hover:bg-charcoal-800 text-amber-300 font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 uppercase tracking-wide"
                      >
                        <span>Xác nhận giữ chỗ (0đ)</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-stone-500 text-xs p-2">
                <span className="flex gap-1">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></span>
                </span>
                <span className="text-[11px] italic">Cô Mai đang soạn tin...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="p-2 bg-amber-50/60 border-t border-amber-200/80 overflow-x-auto flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleQuickPrompt(prompt)}
                className="px-2.5 py-1 bg-white hover:bg-amber-100 text-charcoal-800 text-[11px] font-semibold rounded-full border border-amber-200 whitespace-nowrap transition-colors flex-shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-amber-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Nhắn câu hỏi hoặc số điện thoại..."
                className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-stone-300 outline-none focus:border-charcoal-900 bg-stone-50/60"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-brand-400 hover:bg-brand-300 disabled:opacity-50 text-charcoal-900 flex items-center justify-center transition-all flex-shrink-0 shadow-sm border border-charcoal-900"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-charcoal-500 mt-2 px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                Bảo mật 100%
              </span>
              <span>Hotline: <strong className="text-charcoal-800">0988.123.456</strong></span>
            </div>
          </div>

        </div>
      )}
    </>
  );
};
