import React, { useState, useEffect } from 'react';
import { BrandStamp } from './Doodles';
import { Menu, X, Calendar, Sparkles } from 'lucide-react';

export const Navbar = ({ currentView = 'home', onNavigate, onOpenTrialModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (target) => {
    setMobileMenuOpen(false);
    if (target === 'home' || target === 'kids' || target === 'adults') {
      onNavigate(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // It's an anchor section on the home page (lo-trinh, tac-pham, cam-nhan, faq)
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
      className={`sticky top-[33px] sm:top-[33px] z-40 py-2.5 transform-gpu transition-[background-color,box-shadow,border-color] duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-stone-200/60'
          : 'bg-[#FFFDF9]/95 backdrop-blur-sm border-b border-amber-100/90'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* ================= 1. BRAND LOGO (LEFT) ================= */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 group cursor-pointer text-left focus:outline-none flex-shrink-0"
          >
            <BrandStamp className="w-8 h-8 sm:w-9 sm:h-9 transition-transform group-hover:rotate-12 duration-300 flex-shrink-0" />
            <div className="flex flex-col">
              <span className="font-heading font-black text-xl sm:text-2xl tracking-tight text-charcoal-900 leading-none">
                SỐ KHÔNG
              </span>
              <span className="text-[10px] font-semibold text-charcoal-500 tracking-wider uppercase font-sans">
                Zero Art Studio
              </span>
            </div>
          </button>

          {/* ================= 2. DESKTOP NAVIGATION LINKS (CENTER) ================= */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* Trang chủ */}
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-1.5 text-xs xl:text-sm font-semibold rounded-full transition-all whitespace-nowrap ${
                currentView === 'home'
                  ? 'bg-amber-100 text-charcoal-900 font-bold'
                  : 'text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-50'
              }`}
            >
              Trang chủ
            </button>

            {/* Lớp Trẻ Em (Dedicated Page) */}
            <button
              onClick={() => handleNavClick('kids')}
              className={`px-3 py-1.5 text-xs xl:text-sm font-bold rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                currentView === 'kids'
                  ? 'bg-brand-400 text-charcoal-900 shadow-sm border border-charcoal-900'
                  : 'text-charcoal-800 hover:text-charcoal-900 hover:bg-amber-100/70'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 border border-amber-600 flex-shrink-0" />
              <span>Lớp Trẻ Em</span>
              <span className="text-[10px] text-amber-900 font-extrabold opacity-75 hidden xl:inline">
                (4–15t)
              </span>
            </button>

            {/* Lớp Người Lớn (Dedicated Page) */}
            <button
              onClick={() => handleNavClick('adults')}
              className={`px-3 py-1.5 text-xs xl:text-sm font-bold rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                currentView === 'adults'
                  ? 'bg-stone-900 text-amber-300 shadow-sm border border-stone-800'
                  : 'text-charcoal-800 hover:text-charcoal-900 hover:bg-stone-100'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-stone-700 flex-shrink-0" />
              <span>Lớp Người Lớn</span>
              <span className="text-[10px] text-stone-600 font-extrabold opacity-75 hidden xl:inline">
                (16+)
              </span>
            </button>

            {/* Lộ trình */}
            <button
              onClick={() => handleNavClick('lo-trinh')}
              className="px-3 py-1.5 text-xs xl:text-sm font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-50 rounded-full transition-all whitespace-nowrap"
            >
              Lộ trình
            </button>

            {/* Tác phẩm */}
            <button
              onClick={() => handleNavClick('tac-pham')}
              className="px-3 py-1.5 text-xs xl:text-sm font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-50 rounded-full transition-all whitespace-nowrap"
            >
              Tác phẩm
            </button>

            {/* Cảm nhận (Ẩn trên màn hình vừa, hiện trên xl) */}
            <button
              onClick={() => handleNavClick('cam-nhan')}
              className="hidden xl:inline-block px-3 py-1.5 text-xs xl:text-sm font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-50 rounded-full transition-all whitespace-nowrap"
            >
              Cảm nhận
            </button>

            {/* Hỏi đáp */}
            <button
              onClick={() => handleNavClick('faq')}
              className="hidden 2xl:inline-block px-3 py-1.5 text-xs xl:text-sm font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-50 rounded-full transition-all whitespace-nowrap"
            >
              Hỏi đáp
            </button>
          </nav>

          {/* ================= 3. CTA ACTION (RIGHT) ================= */}
          <div className="flex items-center gap-2 flex-shrink-0">
            
            {/* High-Converting CTA Button: Single-line, perfectly balanced */}
            <button
              onClick={onOpenTrialModal}
              className="relative inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:py-2.5 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-xs sm:text-sm rounded-full border-2 border-charcoal-900 shadow-[2px_2px_0px_0px_#18181B] hover:shadow-[3px_3px_0px_0px_#18181B] hover:-translate-y-0.5 active:translate-y-0.5 transition-all whitespace-nowrap"
            >
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-charcoal-900 flex-shrink-0" />
              <span>Đăng ký học thử (0đ)</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-charcoal-800 hover:bg-amber-100 border border-amber-200 transition-colors flex-shrink-0"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* ================= 4. MOBILE DRAWER ================= */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-b border-amber-200 px-4 pt-3 pb-6 animate-fadeIn shadow-lg">
          <div className="flex flex-col gap-2">
            
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left px-3 py-2 text-sm font-bold rounded-xl transition-colors flex items-center justify-between ${
                currentView === 'home' ? 'bg-amber-100 text-charcoal-900' : 'text-charcoal-800 hover:bg-amber-50'
              }`}
            >
              <span>Trang chủ</span>
              <span className="text-amber-500 text-xs">→</span>
            </button>

            <button
              onClick={() => handleNavClick('kids')}
              className={`text-left px-3 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center justify-between ${
                currentView === 'kids' ? 'bg-brand-400 text-charcoal-900' : 'text-charcoal-800 hover:bg-amber-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>🎨 Lớp Vẽ Trẻ Em</span>
                <span className="text-[10px] bg-amber-200 text-charcoal-900 px-1.5 py-0.5 rounded-full font-black">
                  4–15t
                </span>
              </div>
              <span className="text-amber-700 text-xs font-semibold">Trang riêng →</span>
            </button>

            <button
              onClick={() => handleNavClick('adults')}
              className={`text-left px-3 py-2.5 text-sm font-bold rounded-xl transition-colors flex items-center justify-between ${
                currentView === 'adults' ? 'bg-stone-900 text-amber-300' : 'text-charcoal-800 hover:bg-stone-100'
              }`}
            >
              <div className="flex items-center gap-2">
                <span>🖌️ Mỹ Thuật Người Lớn</span>
                <span className="text-[10px] bg-stone-200 text-charcoal-800 px-1.5 py-0.5 rounded-full font-black">
                  16+
                </span>
              </div>
              <span className="text-amber-600 text-xs font-semibold">Trang riêng →</span>
            </button>

            <div className="pt-2 border-t border-amber-100 my-1 space-y-1">
              <button
                onClick={() => handleNavClick('lo-trinh')}
                className="w-full text-left px-3 py-1.5 text-xs font-medium text-charcoal-700 hover:bg-amber-50 rounded-lg"
              >
                Lộ trình 5 bước cá nhân hóa
              </button>
              <button
                onClick={() => handleNavClick('tac-pham')}
                className="w-full text-left px-3 py-1.5 text-xs font-medium text-charcoal-700 hover:bg-amber-50 rounded-lg"
              >
                Tác phẩm học viên thực tế
              </button>
              <button
                onClick={() => handleNavClick('cam-nhan')}
                className="w-full text-left px-3 py-1.5 text-xs font-medium text-charcoal-700 hover:bg-amber-50 rounded-lg"
              >
                Cảm nhận phụ huynh &amp; học viên
              </button>
              <button
                onClick={() => handleNavClick('faq')}
                className="w-full text-left px-3 py-1.5 text-xs font-medium text-charcoal-700 hover:bg-amber-50 rounded-lg"
              >
                Câu hỏi thường gặp (FAQ)
              </button>
            </div>

            <div className="pt-3 border-t border-amber-100 mt-2 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTrialModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-400 text-charcoal-900 font-bold rounded-xl border-2 border-charcoal-900 shadow-[2px_2px_0px_0px_#18181B]"
              >
                <Sparkles className="w-4 h-4" />
                <span>Đăng ký học thử miễn phí (0đ)</span>
              </button>

              <div className="text-center text-xs text-charcoal-600 pt-1">
                Hotline hỗ trợ: <a href="tel:0988123456" className="font-bold text-charcoal-900 underline">0988.123.456</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
