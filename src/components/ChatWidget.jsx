import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageCircle, X, Send, Sparkles, RefreshCw, Phone, 
  ChevronUp, CheckCircle2, ShieldCheck, ArrowRight
} from 'lucide-react';
import { generateBotResponse, saveLead, getShortBranchName } from '../services/chatbotService';
import { formatBranchName } from '../services/googleSheetService';
import { BrandStamp } from './Doodles';
import confetti from 'canvas-confetti';

const INITIAL_MESSAGES = [
  {
    id: 'msg-init-1',
    sender: 'bot',
    text: 'Dạ em chào anh/chị! Em là **Cô Mai – Tư vấn viên tại Xưởng Vẽ Số Không** ạ. 🎨\n\nKhông biết mình đang quan tâm lớp vẽ sáng tạo cho **bé yêu (4–15 tuổi)** hay lớp mỹ thuật thư giãn cho **người lớn** để em hỗ trợ tư vấn lộ trình phù hợp nhất ạ?'
  }
];

export const ChatWidget = ({ onOpenTrialModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
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

  // Monitor scroll for Scroll-to-Top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

    setTimeout(() => {
      const botReply = generateBotResponse(text, messages);
      setIsTyping(false);

      const botMsg = {
        id: `msg-bot-${Date.now()}`,
        sender: 'bot',
        text: botReply.text,
        showLeadCard: botReply.showLeadCard && !leadFormSubmitted,
        branchOptions: botReply.branchOptions || null,
        quickReplies: botReply.quickReplies || null
      };

      setMessages(prev => [...prev, botMsg]);

      if (botReply.leadCaptured) {
        try {
          confetti({ particleCount: 70, spread: 50, origin: { y: 0.6 } });
        } catch (e) {}
      }
    }, 700);
  };

  const handleMiniLeadSubmit = (e) => {
    e.preventDefault();
    if (!leadFormData.phone.trim()) {
      alert('Vui lòng nhập số điện thoại hoặc Zalo để em giữ chỗ nhé!');
      return;
    }

    saveLead({
      name: leadFormData.name || '',
      phone: leadFormData.phone,
      course: leadFormData.audience,
      need: leadFormData.audience === 'kids' ? 'Lớp Vẽ Trẻ Em (4–15 tuổi)' : 'Mỹ Thuật Người Lớn (16+ tuổi)',
      branch: leadFormData.branch,
      source: 'Chatbot - Mini Lead Card'
    });

    setLeadFormSubmitted(true);

    try {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}

    const confirmMsg = {
      id: `msg-bot-confirm-${Date.now()}`,
      sender: 'bot',
      text: `Dạ em cảm ơn ${leadFormData.name ? 'anh/chị **' + leadFormData.name + '**' : 'mình'} rất nhiều ạ! 🎉\n\nEm đã lưu thông tin đăng ký giữ **01 suất học thử miễn phí (0đ)** của mình tại **${formatBranchName(leadFormData.branch)}**.\n\n📞 **Tư vấn viên tại cơ sở ${getShortBranchName(leadFormData.branch)} sẽ liên hệ lại với mình sớm nhất** (trong vòng 15 phút) qua số điện thoại/Zalo **${leadFormData.phone}** để gửi thời khóa biểu và chuẩn bị họa cụ đón tiếp mình chu đáo nhất nhé ạ! 🎨`
    };

    setMessages(prev => [...prev, confirmMsg]);
  };

  const quickPrompts = [
    '🎨 Lớp vẽ cho bé (4–15t)',
    '🖌️ Lớp người lớn chưa biết vẽ',
    '⚡ Đăng ký học thử 0đ',
    '📍 5 cơ sở HN & Hải Phòng',
    '💰 Học phí & Lịch học bù'
  ];

  const renderFormattedText = (raw) => {
    const lines = raw.split('\n');
    return lines.map((line, lIdx) => {
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
      {/* ================= CLUSTER NÚT NỔI Ở GÓC PHẢI (RIGHT FLOATING CLUSTER) ================= */}
      <aside aria-label="Hỗ trợ & Đăng ký nhanh" className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-auto">
        
        {/* 1. Nút cuộn lên đầu trang (Chỉ hiện khi đã cuộn qua 350px) */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-white/95 text-charcoal-700 hover:text-charcoal-900 shadow-md border border-stone-200 flex items-center justify-center transition-all hover:-translate-y-1 animate-fadeIn"
            aria-label="Cuộn lên đầu trang"
            title="Lên đầu trang"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
        )}

        {/* 2. Nút Học Thử 0đ (Trial CTA Pill) */}
        <button
          onClick={onOpenTrialModal}
          className="group flex items-center gap-1.5 px-3.5 py-2 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-xs rounded-full border-2 border-charcoal-900 shadow-[2px_2px_0px_#18181B] hover:shadow-[3px_3px_0px_#18181B] hover:-translate-y-0.5 active:translate-y-0.5 transition-all"
          title="Đăng ký suất học thử 0đ"
        >
          <Sparkles className="w-3.5 h-3.5 text-charcoal-900 flex-shrink-0 animate-pulse" />
          <span>Học thử 0đ</span>
        </button>

        {/* 3. Nút Chat Zalo 24/7 */}
        <a
          href="https://zalo.me/0988123456"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 bg-[#0068FF] hover:bg-[#0054cc] text-white p-2.5 rounded-full shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all border border-blue-400"
          title="Nhắn tin Zalo 24/7"
        >
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-400"></span>
          </span>

          <svg className="w-5 h-5 fill-white flex-shrink-0" viewBox="0 0 48 48">
            <path d="M24 4C12.95 4 4 12.51 4 23.01c0 5.92 2.83 11.23 7.29 14.77l-1.87 6.94c-.21.78.53 1.46 1.25 1.15l7.73-3.32c1.78.47 3.66.73 5.6.73 11.05 0 20-8.51 20-19.01S35.05 4 24 4zm4.8 24.3h-9.6c-.66 0-1.2-.54-1.2-1.2 0-.66.54-1.2 1.2-1.2h6.9L18 16.5c-.32-.4-.24-.98.17-1.29.4-.31.98-.24 1.29.17l8.74 10.92c.3.38.2.93-.16 1.2-.33.25-.79.3-.94.3zm6.4-1.2c0 .66-.54 1.2-1.2 1.2h-3.2c-.66 0-1.2-.54-1.2-1.2V15.2c0-.66.54-1.2 1.2-1.2h3.2c.66 0 1.2.54 1.2 1.2v11.9z" />
          </svg>

          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-[11px] font-bold">
            Chat Zalo
          </span>
        </a>

        {/* 4. Teaser Bubble (Thông báo mời chat phía trên nút Chatbot) */}
        {!isOpen && showTeaser && (
          <div className="bg-white rounded-2xl p-3 pr-7 border-2 border-charcoal-900 shadow-[3px_3px_0px_#18181B] max-w-[240px] text-xs animate-bounce relative mb-1">
            <button
              onClick={() => setShowTeaser(false)}
              className="absolute top-1.5 right-1.5 text-stone-400 hover:text-charcoal-900 p-0.5"
              aria-label="Đóng thông báo"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-start gap-1.5">
              <span className="text-sm">👋</span>
              <p className="text-charcoal-800 font-medium text-[11px] leading-tight">
                Cần tư vấn lớp vẽ cho <strong>bé</strong> hay <strong>người lớn</strong>? Nhắn Số Không nhé!
              </p>
            </div>
          </div>
        )}

        {/* 5. NÚT CHATBOT CHÍNH (HERO ACTION BOTTOM-RIGHT) */}
        <button
          onClick={() => (isOpen ? setIsOpen(false) : handleOpen())}
          className={`group relative flex items-center gap-2 p-3 rounded-full border-2 border-charcoal-900 shadow-[3px_3px_0px_#18181B] hover:shadow-[4px_4px_0px_#18181B] hover:-translate-y-0.5 active:translate-y-0.5 transition-all ${
            isOpen ? 'bg-charcoal-900 text-amber-300' : 'bg-brand-400 hover:bg-brand-300 text-charcoal-900'
          }`}
          aria-label={isOpen ? 'Đóng cửa sổ chat' : 'Mở chatbot tư vấn'}
          title="Tư vấn nghệ thuật Số Không"
        >
          {/* Online green indicator */}
          {!isOpen && (
            <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
            </span>
          )}

          {isOpen ? (
            <X className="w-6 h-6 text-amber-300" />
          ) : (
            <>
              <BrandStamp className="w-6 h-6 flex-shrink-0" />
              <span className="font-heading font-black text-xs tracking-tight pr-1 hidden sm:inline">
                Tư Vấn AI
              </span>
            </>
          )}
        </button>

      </aside>

      {/* ================= CỬA SỔ CHATBOT (BÊN PHẢI - BOTTOM-RIGHT) ================= */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[390px] h-[540px] max-h-[82vh] bg-[#FFFDF9] rounded-3xl border-2 border-charcoal-900 shadow-[8px_8px_0px_0px_#18181B] flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-300 via-amber-200 to-yellow-100 p-3.5 border-b-2 border-charcoal-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <BrandStamp className="w-8 h-8" />
                <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white"></span>
              </div>
              <div>
                <h4 className="font-heading font-black text-xs sm:text-sm text-charcoal-900 leading-tight">
                  Cô Mai – Tư Vấn Mỹ Thuật
                </h4>
                <p className="text-[10px] font-semibold text-emerald-800 flex items-center gap-1">
                  <span>●</span> Trực tuyến • Phản hồi tức thì
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
                title="Thu nhỏ cửa sổ chat"
                className="p-1.5 text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-300/60 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Notification Ribbon */}
          <div className="bg-amber-100/90 py-1.5 px-3 border-b border-amber-200 text-[11px] text-amber-950 flex items-center justify-between">
            <span className="flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3 text-amber-600" />
              Tài trợ 100% học phí buổi thử 0đ
            </span>
            <span className="font-mono text-[10px] text-amber-800">5 CS HN &amp; HP</span>
          </div>

          {/* Message Stream */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-charcoal-900 text-amber-100 rounded-br-xs shadow-sm font-medium'
                      : 'bg-white text-charcoal-800 rounded-bl-xs border border-amber-200/90 shadow-sm'
                  }`}
                >
                  {renderFormattedText(msg.text)}

                  {/* Quick Branch Option Buttons when chatbot asks customer for branch */}
                  {msg.branchOptions && !leadFormSubmitted && (
                    <div className="mt-2.5 pt-2 border-t border-amber-200/80">
                      <p className="text-[11px] font-bold text-amber-950 mb-1.5 flex items-center gap-1">
                        <span>📍</span> Bấm chọn nhanh cơ sở bạn muốn học:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {msg.branchOptions.map(opt => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => handleSendMessage(opt.name)}
                            className="text-[11px] bg-amber-50 hover:bg-amber-200 text-charcoal-900 border border-amber-300 font-semibold px-2.5 py-1 rounded-lg transition-all shadow-2xs hover:scale-105 active:scale-95 text-left"
                          >
                            {opt.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Contextual Quick Replies Buttons */}
                  {msg.quickReplies && !leadFormSubmitted && (
                    <div className="mt-2.5 pt-2 border-t border-amber-200/70">
                      <div className="flex flex-wrap gap-1.5">
                        {msg.quickReplies.map((replyText, rIdx) => (
                          <button
                            key={rIdx}
                            type="button"
                            onClick={() => handleSendMessage(replyText)}
                            className="text-[11px] bg-amber-100/70 hover:bg-amber-200 text-charcoal-900 border border-amber-300/80 font-medium px-2.5 py-1 rounded-full transition-all shadow-2xs hover:scale-105 active:scale-95"
                          >
                            {replyText}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* In-chat Mini Lead Form */}
                {msg.showLeadCard && !leadFormSubmitted && (
                  <div className="mt-2.5 p-3 bg-amber-50 rounded-2xl border-2 border-amber-300 max-w-[92%] shadow-sm">
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
                          🎨 Lớp Bé (4–15t)
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
                onClick={() => handleSendMessage(prompt)}
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
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-300 outline-none focus:border-charcoal-900 bg-stone-50/60"
              />

              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="w-9 h-9 rounded-xl bg-brand-400 hover:bg-brand-300 disabled:opacity-50 text-charcoal-900 flex items-center justify-center transition-all flex-shrink-0 shadow-sm border border-charcoal-900"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[10px] text-charcoal-500 mt-1.5 px-1">
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
