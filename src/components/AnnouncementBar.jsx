import React, { useState, useEffect, memo } from 'react';
import { Sparkles, Clock, ArrowRight, Phone } from 'lucide-react';

// Sub-component riêng biệt cho Countdown: Chỉ re-render cụm số, không re-render toàn bộ thanh thông báo
const CountdownClock = memo(() => {
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <span className="text-brand-300 font-bold text-xs tabular-nums">
      {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
    </span>
  );
});

export const AnnouncementBar = ({ onOpenTrialModal }) => {
  return (
    <div className="bg-charcoal-900 text-amber-100 text-xs py-2 px-3 sm:px-4 border-b border-amber-500/20 sticky top-0 z-50 transform-gpu">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Promotion notice */}
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="inline-flex items-center gap-1 bg-brand-400 text-charcoal-900 font-extrabold px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider flex-shrink-0 shadow-sm">
            <Sparkles className="w-3 h-3" /> Ưu Đãi Tháng
          </span>
          <p className="font-medium text-stone-200 text-xs truncate">
            Tặng 100% học phí buổi trải nghiệm + Bộ cọ vẽ cơ bản cho 15 bạn đầu tiên!
          </p>
        </div>

        {/* Right: Hotline + Countdown + Quick Trigger */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0 text-xs">
          
          {/* Hotline */}
          <a
            href="tel:0988123456"
            className="hidden lg:flex items-center gap-1.5 text-stone-300 hover:text-amber-300 font-semibold transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Hotline: <strong className="text-white">0988.123.456</strong></span>
          </a>

          {/* Countdown Clock (Isolated render) */}
          <div className="hidden sm:flex items-center gap-1.5 text-stone-300 font-mono bg-charcoal-800/90 px-2.5 py-0.5 rounded-md border border-stone-700">
            <Clock className="w-3 h-3 text-brand-400" />
            <span className="text-[11px]">Còn:</span>
            <CountdownClock />
          </div>

          <button
            onClick={onOpenTrialModal}
            className="inline-flex items-center gap-1 font-bold text-charcoal-900 bg-brand-400 hover:bg-brand-300 px-3 py-1 rounded-full transition-colors text-[11px] sm:text-xs shadow-sm hover:scale-105 whitespace-nowrap"
          >
            <span>Giữ chỗ ngay</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
