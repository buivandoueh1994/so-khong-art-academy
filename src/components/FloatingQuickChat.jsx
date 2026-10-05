import React, { useState } from 'react';
import { MessageCircle, Phone, Sparkles, X, ChevronUp } from 'lucide-react';

export const FloatingQuickChat = ({ onOpenTrialModal }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Floating Buttons Bottom-Right */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col items-end gap-3 pointer-events-auto">
        
        {/* Scroll To Top Button (Subtle) */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white text-charcoal-700 hover:text-charcoal-900 shadow-md border border-stone-200 flex items-center justify-center transition-all hover:-translate-y-1"
          aria-label="Lên đầu trang"
        >
          <ChevronUp className="w-5 h-5" />
        </button>

        {/* Zalo Button */}
        <a
          href="https://zalo.me/0988123456"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 bg-[#0068FF] hover:bg-[#0054cc] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          title="Chat Zalo ngay"
        >
          {/* Pulsing indicator */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500"></span>
          </span>

          {/* Zalo SVG Icon */}
          <svg className="w-6 h-6 fill-white" viewBox="0 0 48 48">
            <path d="M24 4C12.95 4 4 12.51 4 23.01c0 5.92 2.83 11.23 7.29 14.77l-1.87 6.94c-.21.78.53 1.46 1.25 1.15l7.73-3.32c1.78.47 3.66.73 5.6.73 11.05 0 20-8.51 20-19.01S35.05 4 24 4zm4.8 24.3h-9.6c-.66 0-1.2-.54-1.2-1.2 0-.66.54-1.2 1.2-1.2h6.9L18 16.5c-.32-.4-.24-.98.17-1.29.4-.31.98-.24 1.29.17l8.74 10.92c.3.38.2.93-.16 1.2-.33.25-.79.3-.94.3zm6.4-1.2c0 .66-.54 1.2-1.2 1.2h-3.2c-.66 0-1.2-.54-1.2-1.2V15.2c0-.66.54-1.2 1.2-1.2h3.2c.66 0 1.2.54 1.2 1.2v11.9z" />
          </svg>

          {/* Hover tooltip label */}
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold font-sans">
            Chat Zalo 24/7
          </span>
        </a>

        {/* Facebook Messenger Button */}
        <a
          href="https://m.me/sokhongaart"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center gap-2 bg-[#0084FF] hover:bg-[#0070db] text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          title="Chat Messenger"
        >
          {/* Messenger SVG Icon */}
          <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.145 2 11.258c0 2.91 1.453 5.518 3.734 7.202v3.54a.75.75 0 0 0 1.137.644l3.155-1.788c.636.142 1.3.218 1.974.218 5.523 0 10-4.145 10-9.258C22 6.145 17.523 2 12 2zm1.06 12.355-2.73-2.912-5.33 2.912 5.87-6.23 2.73 2.912 5.33-2.912-5.87 6.23z" />
          </svg>

          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 text-xs font-bold font-sans">
            Messenger
          </span>
        </a>

        {/* Quick Trial Pill Trigger */}
        <button
          onClick={onOpenTrialModal}
          className="bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-xs sm:text-sm px-4 py-2.5 rounded-full border-2 border-charcoal-900 shadow-[3px_3px_0px_0px_#18181B] hover:shadow-[4px_4px_0px_0px_#18181B] hover:-translate-y-0.5 transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4 text-charcoal-900" />
          <span>Học thử 0đ</span>
        </button>

      </div>
    </>
  );
};
