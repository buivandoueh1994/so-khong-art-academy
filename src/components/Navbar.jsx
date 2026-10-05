import React, { useState, useEffect } from 'react';
import { BrandStamp } from './Doodles';
import { Menu, X, Calendar, Phone, Sparkles } from 'lucide-react';

export const Navbar = ({ onOpenTrialModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { label: 'Trang chủ', id: 'home' },
    { label: 'Lớp Trẻ Em', id: 'lop-tre-em' },
    { label: 'Lớp Người Lớn', id: 'lop-nguoi-lon' },
    { label: 'Lộ trình 5 bước', id: 'lo-trinh' },
    { label: 'Tác phẩm học viên', id: 'tac-pham' },
    { label: 'Cảm nhận phụ huynh', id: 'cam-nhan' },
    { label: 'Hỏi đáp', id: 'faq' },
  ];

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
          <a
            href="#home"
            className="flex items-center gap-2.5 group cursor-pointer text-decoration-none"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
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
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.slice(0, 5).map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 hover:bg-amber-100/60 rounded-full transition-all"
              >
                {link.label}
              </button>
            ))}
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
              className="relative inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-bold text-xs sm:text-sm rounded-full border-2 border-charcoal-900 shadow-[3px_3px_0px_0px_#18181B] hover:shadow-[4px_4px_0px_0px_#18181B] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_0px_#18181B] transition-all font-heading"
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
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-left px-3 py-2 text-base font-semibold text-charcoal-800 hover:bg-brand-100 rounded-lg transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-amber-500 text-xs">→</span>
              </button>
            ))}
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
