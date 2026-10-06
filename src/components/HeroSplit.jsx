import React, { useState } from 'react';
import { PaletteDoodle, SunDoodle, BrushDoodle, SparkleDoodle, PaintSplashBg } from './Doodles';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export const HeroSplit = ({ onSelectAudience, onNavigateKids, onNavigateAdults }) => {
  // Mobile tab selector so users on small screens can switch or view both easily
  const [activeMobileTab, setActiveMobileTab] = useState('both'); // 'kids' | 'adults' | 'both'

  return (
    <section id="home" className="relative overflow-hidden pt-4 pb-10 lg:pb-14 bg-[#FFFDF9]">
      {/* Background soft ambient warm gradient */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#FDE047_1px,transparent_1px)] [background-size:20px_20px]" />
      
      {/* Decorative doodles in hero atmosphere */}
      <div className="hidden xl:block absolute top-10 left-10 text-amber-400 opacity-60">
        <SparkleDoodle className="w-8 h-8 animate-wiggle" />
      </div>
      <div className="hidden xl:block absolute top-12 right-12 text-amber-500 opacity-50">
        <SparkleDoodle className="w-6 h-6 animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile Audience Filter Bar */}
        <div className="lg:hidden flex items-center justify-center mb-6">
          <div className="bg-amber-100/80 p-1.5 rounded-full flex gap-1 border border-amber-200">
            <button
              onClick={() => setActiveMobileTab('both')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeMobileTab === 'both'
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'text-charcoal-700 hover:text-charcoal-900'
              }`}
            >
              Xem cả hai
            </button>
            <button
              onClick={() => setActiveMobileTab('kids')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeMobileTab === 'kids'
                  ? 'bg-amber-400 text-charcoal-900 shadow-sm'
                  : 'text-charcoal-700 hover:text-charcoal-900'
              }`}
            >
              🎨 Bé (4–15 tuổi)
            </button>
            <button
              onClick={() => setActiveMobileTab('adults')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeMobileTab === 'adults'
                  ? 'bg-stone-800 text-amber-200 shadow-sm'
                  : 'text-charcoal-700 hover:text-charcoal-900'
              }`}
            >
              🖌️ Người lớn (16+)
            </button>
          </div>
        </div>

        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* ================= LEFT COLUMN: TRẺ EM ================= */}
          <div
            id="lop-tre-em"
            className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden border-2 border-amber-200/90 bg-gradient-to-br from-amber-50/90 via-yellow-50/40 to-white shadow-[0_12px_32px_rgba(251,191,36,0.12)] ${
              activeMobileTab === 'adults' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Organic paint splash graphic background */}
            <PaintSplashBg className="absolute -top-20 -left-20 w-[450px] h-[450px] pointer-events-none -z-0 opacity-80" />

            {/* Header & Typography Section */}
            <div className="relative z-10">
              {/* Badge & Doodle */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <PaletteDoodle className="w-10 h-10 transform -rotate-6 filter drop-shadow-sm flex-shrink-0" />
                  <div>
                    <span className="inline-block bg-amber-200/90 text-charcoal-900 text-[11px] sm:text-xs font-black px-3 py-1 rounded-full border border-amber-400 uppercase tracking-wider mb-1 shadow-sm">
                      DÀNH CHO TRẺ EM (4–15 TUỔI)
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900">
                      LỚP VẼ SỐ KHÔNG
                    </h2>
                  </div>
                </div>
                <SunDoodle className="w-9 h-9 animate-float text-amber-500 hidden sm:block flex-shrink-0" />
              </div>

              {/* Main Headline (<= 2 dòng) */}
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-charcoal-900 leading-snug mb-2">
                Khơi Mở Sáng Tạo – Tự Do Từng Nét Vẽ
              </h3>

              {/* Mô tả ngắn gọn (15-20 từ, <= 2 dòng) */}
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed mb-4">
                Lộ trình cá nhân hóa, 100% không vẽ hộ, giúp con tự tin bộc lộ cảm xúc và trí tưởng tượng.
              </p>
            </div>

            {/* Visual Photo Section (Tôn vinh hình ảnh, chiếm 45% - 50% diện tích) */}
            <div className="relative my-1 sm:my-2 group flex-1 flex flex-col justify-center">
              <div className="relative h-64 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden border-2 border-stone-800/10 shadow-md">
                <img
                  src="/assets/hero_kids.jpg"
                  alt="Bé tự tin hoàn thiện tác phẩm tại Lớp Vẽ Số Không"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-charcoal-900/10 to-transparent" />
                
                {/* Floating Micro-Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-amber-200 shadow-sm flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold text-charcoal-900">
                    🎨 Tự hoàn thiện tranh ngay buổi 1
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-amber-400 text-charcoal-900 text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-charcoal-900 shadow-[2px_2px_0px_#18181B]">
                  Độ tuổi: 4 – 15 tuổi
                </div>
              </div>
            </div>

            {/* Action CTA Button duy nhất & Link phụ tinh gọn */}
            <div className="mt-4 pt-1 space-y-2 relative z-10">
              <button
                onClick={onNavigateKids}
                className="group w-full py-3.5 sm:py-4 px-6 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-sm sm:text-base rounded-2xl border-2 border-charcoal-900 shadow-[4px_4px_0px_0px_#18181B] hover:shadow-[5px_5px_0px_0px_#18181B] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Khám phá lớp Trẻ Em</span>
                <ArrowRight className="w-5 h-5 text-charcoal-900 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Sub-action link nhẹ nhàng */}
              <div className="text-center pt-0.5">
                <button
                  onClick={() => onSelectAudience('kids')}
                  className="text-xs font-bold text-amber-900/80 hover:text-charcoal-900 transition-colors inline-flex items-center gap-1.5 underline decoration-amber-300 underline-offset-4"
                >
                  <span>Hoặc Đăng ký học thử 0đ cho bé</span>
                  <span className="text-amber-600 font-extrabold">→</span>
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: NGƯỜI LỚN ================= */}
          <div
            id="lop-nguoi-lon"
            className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden border-2 border-stone-200/90 bg-gradient-to-br from-stone-50 via-amber-50/30 to-white shadow-[0_12px_32px_rgba(40,40,40,0.06)] ${
              activeMobileTab === 'kids' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Background subtle art canvas feeling */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-0" />

            {/* Header & Typography Section */}
            <div className="relative z-10">
              {/* Badge & Doodle */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <BrushDoodle className="w-10 h-10 transform rotate-6 filter drop-shadow-sm flex-shrink-0 text-stone-700" />
                  <div>
                    <span className="inline-block bg-stone-200 text-charcoal-900 text-[11px] sm:text-xs font-black px-3 py-1 rounded-full border border-stone-300 uppercase tracking-wider mb-1 shadow-sm">
                      DÀNH CHO NGƯỜI LỚN (16+)
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900">
                      MỸ THUẬT SỐ KHÔNG
                    </h2>
                  </div>
                </div>
                <div className="hidden sm:block text-stone-400 flex-shrink-0">
                  <Sparkles className="w-8 h-8 text-amber-500" />
                </div>
              </div>

              {/* Main Headline (<= 2 dòng) */}
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-charcoal-900 leading-snug mb-2">
                Thư Giãn Cùng Hội Họa – Bắt Đầu Từ Con Số 0
              </h3>

              {/* Mô tả ngắn gọn (15-20 từ, <= 2 dòng) */}
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed mb-4">
                Kèm cặp 1:1, không gian trà hoa nhạc nhẹ, hoàn thiện tranh đẹp ngay buổi đầu tiên.
              </p>
            </div>

            {/* Visual Photo Section (Tôn vinh hình ảnh, chiếm 45% - 50% diện tích) */}
            <div className="relative my-1 sm:my-2 group flex-1 flex flex-col justify-center">
              <div className="relative h-64 sm:h-72 lg:h-80 w-full rounded-2xl overflow-hidden border-2 border-stone-800/10 shadow-md">
                <img
                  src="/assets/hero_adults.jpg"
                  alt="Không gian thư giãn sáng tạo của học viên người lớn tại Mỹ Thuật Số Không"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-charcoal-900/10 to-transparent" />
                
                {/* Floating Micro-Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs font-bold text-charcoal-900">
                    ☕ Hoàn thiện tranh đẹp ngay buổi 1
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-stone-900 text-amber-300 text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-stone-700 shadow-[2px_2px_0px_#3f3f46]">
                  Lớp 16+ tuổi
                </div>
              </div>
            </div>

            {/* Action CTA Button duy nhất & Link phụ tinh gọn */}
            <div className="mt-4 pt-1 space-y-2 relative z-10">
              <button
                onClick={onNavigateAdults}
                className="group w-full py-3.5 sm:py-4 px-6 bg-charcoal-900 hover:bg-charcoal-800 text-amber-300 font-heading font-black text-sm sm:text-base rounded-2xl border-2 border-charcoal-900 shadow-[4px_4px_0px_0px_#FACC15] hover:shadow-[5px_5px_0px_0px_#FACC15] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Khám phá lớp Người Lớn</span>
                <ArrowRight className="w-5 h-5 text-amber-300 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Sub-action link nhẹ nhàng */}
              <div className="text-center pt-0.5">
                <button
                  onClick={() => onSelectAudience('adults')}
                  className="text-xs font-bold text-stone-600 hover:text-charcoal-900 transition-colors inline-flex items-center gap-1.5 underline decoration-stone-300 underline-offset-4"
                >
                  <span>Hoặc Đăng ký buổi trải nghiệm 0đ</span>
                  <span className="text-amber-600 font-extrabold">→</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
