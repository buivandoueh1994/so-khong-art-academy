import React, { useState, useEffect } from 'react';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';

export const AnnouncementBar = ({ onOpenTrialModal }) => {
  // Countdown timer state
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
    <div className="bg-charcoal-900 text-amber-100 text-xs sm:text-sm py-2 px-3 sm:px-4 border-b border-amber-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1 min-w-[280px]">
          <span className="inline-flex items-center gap-1 bg-brand-400 text-charcoal-900 font-bold px-2 py-0.5 rounded-full text-[11px] uppercase tracking-wider animate-pulse">
            <Sparkles className="w-3 h-3" /> Ưu Đãi Tháng Này
          </span>
          <p className="font-medium text-stone-200 truncate">
            Tặng 100% học phí buổi trải nghiệm + Bộ cọ vẽ cơ bản cho 15 bạn đăng ký sớm!
          </p>
        </div>

        <div className="flex items-center gap-3 ml-auto text-xs">
          <div className="hidden md:flex items-center gap-1.5 text-stone-300 font-mono bg-charcoal-800/80 px-2.5 py-1 rounded-md border border-stone-700">
            <Clock className="w-3.5 h-3.5 text-brand-400" />
            <span>Kết thúc sau:</span>
            <span className="text-brand-300 font-bold">
              {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
            </span>
          </div>

          <button
            onClick={onOpenTrialModal}
            className="inline-flex items-center gap-1 font-bold text-charcoal-900 bg-brand-400 hover:bg-brand-300 px-3 py-1 rounded-full transition-all text-xs shadow-sm hover:scale-105"
          >
            Giữ chỗ ngay
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
