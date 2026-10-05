import React, { useState, useEffect } from 'react';
import { BrandStamp } from './Doodles';
import { Menu, X, Calendar, Phone, Sparkles } from 'lucide-react';

export const Navbar = ({ currentView = 'home', onNavigate, onOpenTrialModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    if (target === 'home' || target === 'kids' || target === 'adults') {
      onNavigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // It's a section on the home page (e.g. lo-trinh, tac-pham, cam-nhan, faq)
      if (currentView !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.getElementById(target);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 150);
      } else {
        const element = document.getElementById(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  return (
    <header
      className={`sticky top-[37px] z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5'
          : 'bg-[#FFFDF9]/90 backdrop-blur-sm py-4 border-b border-amber-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            <div className="relative">
              <BrandStamp className="w-9 h-9 sm:w-10 sm:h-10 transition-transform group-hover:rotate-12 duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-2xl sm:text-2xl tracking-tight text-charcoal-900 leading-none">
                SỐ KHÔNG
              </span>
              <span className="text-[11px] font-semibold text-charcoal-600 tracking-wider uppercase font-sans">
                Zero Art Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Trang chủ */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all ${
                currentView === 'home'
                  ? 'bg-amber-100 text-charcoal-900 shadow-sm'
                  : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-100/60'
              }`}
            >
              Trang chủ
            </button>

            {/* Lớp Trẻ Em (Dedicated Page) */}
            <button
              onClick={() => handleNavClick('kids')}
              className={`px-3.5 py-1.5 text-sm font-bold rounded-full transition-all flex items-center gap-1.5 ${
                currentView === 'kids'
                  ? 'bg-brand-400 text-charcoal-900 shadow-sm border border-charcoal-900'
                  : 'text-charcoal-800 hover:text-charcoal-900 hover:bg-amber-100'
              }`}
            >
              <span>Lớp Trẻ Em</span>
              <span className="text-[10px] bg-amber-200 text-charcoal-900 px-1.5 py-0.2 rounded-full font-extrabold border border-amber-300">
                4-15t
              </span>
            </button>

            {/* Lớp Người Lớn (Dedicated Page) */}
            <button
              onClick={() => handleNavClick('adults')}
              className={`px-3.5 py-1.5 text-sm font-bold rounded-full transition-all flex items-center gap-1.5 ${
                currentView === 'adults'
                  ? 'bg-stone-900 text-amber-300 shadow-sm border border-stone-800'
                  : 'text-charcoal-800 hover:text-charcoal-900 hover:bg-stone-100'
              }`}
            >
              <span>Lớp Người Lớn</span>
              <span className="text-[10px] bg-stone-200 text-charcoal-800 px-1.5 py-0.2 rounded-full font-extrabold">
                16+
              </span>
            </button>

            {/* Secondary anchor links */}
            <button
              onClick={() => handleNavClick('lo-trinh')}
              className="px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-100/60 rounded-full transition-all"
            >
              Lộ trình 5 bước
            </button>

            <button
              onClick={() => handleNavClick('tac-pham')}
              className="px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-100/60 rounded-full transition-all"
            >
              Tác phẩm
            </button>

            <button
              onClick={() => handleNavClick('cam-nhan')}
              className="px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-100/60 rounded-full transition-all"
            >
              Cảm nhận
            </button>

            <button
              onClick={() => handleNavClick('faq')}
              className="px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-100/60 rounded-full transition-all"
            >
              Hỏi đáp
            </button>
          </nav>

          {/* CTA & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="tel:0988123456"
              className="hidden sm:flex items-center gap-1 text-xs font-semibold text-charcoal-700 hover:text-brand-700 px-2 py-1"
            >
              <Phone className="w-3.5 h-3.5 text-brand-600" />
              <span>0988.123.456</span>
            </a>

            {/* High-Converting CTA Button */}
            <button
              onClick={onOpenTrialModal}
              className="relative inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-bold text-xs sm:text-sm rounded-full border-2 border-charcoal-900 shadow-[3px_3px_0px_0px_#18181B] hover:shadow-[4px_4px_0px_0px_#18181B] hover:-translate-y-0.5 active:translate-y-0.5 transition-all font-heading"
            >
              <Calendar className="w-4 h-4 text-charcoal-900" />
              <span>Đăng ký học thử miễn phí</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-charcoal-800 hover:bg-amber-100 border border-amber-200 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-amber-200 px-4 pt-3 pb-6 animate-fadeIn shadow-lg">
          <div className="flex flex-col gap-2">
            
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 text-base font-bold rounded-xl transition-colors flex items-center justify-between ${
                currentView === 'home' ? 'bg-amber-100 text-charcoal-900' : 'text-charcoal-800 hover:bg-amber-50'
              }`}
            >
              <span>Trang chủ</span>
              <span className="text-amber-500 text-xs">→</span>
            </button>

            <button
              onClick={() => handleNavClick('kids')}
              className={`text-left px-3 py-2 text-base font-bold rounded-xl transition-colors flex items-center justify-between ${
                currentView === 'kids' ? 'bg-brand-400 text-charcoal-900' : 'text-charcoal-800 hover:bg-amber-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>🎨 Lớp Vẽ Trẻ Em (Trang riêng)</span>
                <span className="text-[10px] bg-amber-200 text-charcoal-900 px-2 py-0.5 rounded-full font-black">
                  4-15t
                </span>
              </div>
              <span className="text-amber-600 text-xs">Chi tiết →</span>
            </button>

            <button
              onClick={() => handleNavClick('adults')}
              className={`text-left px-3 py-2 text-base font-bold rounded-xl transition-colors flex items-center justify-between ${
                currentView === 'adults' ? 'bg-stone-900 text-amber-300' : 'text-charcoal-800 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>🖌️ Mỹ Thuật Người Lớn (Trang riêng)</span>
                <span className="text-[10px] bg-stone-200 text-charcoal-800 px-2 py-0.5 rounded-full font-black">
                  16+
                </span>
              </div>
              <span className="text-amber-600 text-xs">Chi tiết →</span>
            </button>

            <div className="pt-2 border-t border-amber-100 my-1 space-y-1">
              <button
                onClick={() => handleNavClick('lo-trinh')}
                className="w-full text-left px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:bg-amber-50 rounded-lg"
              >
                Lộ trình 5 bước may đo
              </button>
              <button
                onClick={() => handleNavClick('tac-pham')}
                className="w-full text-left px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:bg-amber-50 rounded-lg"
              >
                Tác phẩm học viên thực tế
              </button>
              <button
                onClick={() => handleNavClick('cam-nhan')}
                className="w-full text-left px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:bg-amber-50 rounded-lg"
              >
                Cảm nhận phụ huynh & học viên
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className="w-full text-left px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:bg-amber-50 rounded-lg"
              >
                Câu hỏi thường gặp (FAQ)
              </button>
            </div>

            <div className="pt-3 border-t border-amber-100 mt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrialModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-400 text-charcoal-900 font-bold rounded-xl border-2 border-charcoal-900 shadow-[3px_3px_0px_0px_#18181B]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Đăng ký học thử miễn phí (0đ)</span>
              </button>
              <p className="text-center text-xs text-charcoal-500 mt-2">
                Hotline hỗ trợ: <strong className="text-charcoal-800">0988.123.456</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
