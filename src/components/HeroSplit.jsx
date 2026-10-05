import React, { useState } from 'react';
import { PaletteDoodle, SunDoodle, BrushDoodle, SparkleDoodle, PaintSplashBg } from './Doodles';
import { CheckCircle2, ArrowRight, Sparkles, Heart } from 'lucide-react';

export const HeroSplit = ({ onSelectAudience, onNavigateKids, onNavigateAdults }) => {
  // Mobile tab selector so users on small screens can switch or view both easily
  const [activeMobileTab, setActiveMobileTab] = useState('both'); // 'kids' | 'adults' | 'both'

  const handleRegisterKids = () => {
    onSelectAudience('kids');
  };

  const handleRegisterAdults = () => {
    onSelectAudience('adults');
  };

  return (
    <section id="home" className="relative overflow-hidden pt-4 pb-12 lg:pb-16 bg-[#FFFDF9]">
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
            className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden border-2 border-amber-200/80 bg-gradient-to-br from-amber-50/90 via-yellow-50/50 to-white shadow-[0_12px_30px_rgba(251,191,36,0.12)] ${
              activeMobileTab === 'adults' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Organic paint splash graphic background */}
            <PaintSplashBg className="absolute -top-20 -left-20 w-[450px] h-[450px] pointer-events-none -z-0" />

            <div className="relative z-10">
              {/* Header Badge & Doodles */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <PaletteDoodle className="w-11 h-11 transform -rotate-6 filter drop-shadow-sm" />
                  <div>
                    <span className="inline-block bg-brand-300/80 text-charcoal-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-amber-400 uppercase tracking-wider mb-1">
                      Hệ thống lớp vẽ dành cho <span className="bg-amber-400 text-charcoal-900 px-1.5 py-0.2 rounded font-extrabold">trẻ em</span>
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900">
                      LỚP VẼ SỐ KHÔNG
                    </h2>
                  </div>
                </div>
                <SunDoodle className="w-10 h-10 animate-float text-amber-500 hidden sm:block" />
              </div>

              {/* Catchphrase Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-bold text-amber-900">
                <span className="bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
                  ✨ Khám phá
                </span>
                <span className="text-amber-500">•</span>
                <span className="bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
                  🌱 Rèn luyện
                </span>
                <span className="text-amber-500">•</span>
                <span className="bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300">
                  🚀 Sáng tạo
                </span>
              </div>

              {/* Main Headline */}
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-charcoal-900 leading-snug mb-3">
                Khơi Mở Sáng Tạo – Bé Vẽ Vui, Tự Tin Từng Nét Bút
              </h3>

              {/* Subheadline */}
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed mb-5">
                Lộ trình cá nhân hóa cho trẻ <strong>4–15 tuổi</strong>. Bắt đầu từ số 0, không cần năng khiếu.
                Phương pháp khơi gợi trực quan giúp con yêu thích hội họa tự nhiên.
              </p>

              {/* Key Benefits List */}
              <div className="space-y-2.5 mb-6 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-amber-100">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Rèn luyện tính kiên nhẫn & tư duy màu sắc:</strong> Kích thích bán cầu não phải, giúp trẻ tập trung và biểu đạt cảm xúc tự tin.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Giáo viên tốt nghiệp Mỹ thuật kèm cặp 1:1:</strong> Nhẹ nhàng hướng dẫn, phát hiện thế mạnh riêng, tuyệt đối không cầm tay vẽ hộ.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Tài liệu & ảnh tiến độ gửi phụ huynh:</strong> Cập nhật sản phẩm và nhận xét của thầy cô sau mỗi buổi học.</span>
                </div>
              </div>
            </div>

            {/* Visual Photo Card with Overlays */}
            <div className="relative mb-6 group">
              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-stone-800/10 shadow-md">
                <img
                  src="/assets/hero_kids.jpg"
                  alt="Bé vẽ vui tại Lớp Vẽ Số Không"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
                
                {/* Floating Micro-Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-amber-200 shadow-sm flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-charcoal-800">
                    Bé hoàn thiện 1 bức tranh ngay buổi thử!
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-amber-400 text-charcoal-900 text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-charcoal-900 shadow-[2px_2px_0px_#18181B]">
                  Độ tuổi: 4 - 15 tuổi
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="mt-auto pt-2 space-y-2">
              <button
                onClick={handleRegisterKids}
                className="w-full py-3.5 sm:py-4 px-6 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-sm sm:text-base rounded-2xl border-2 border-charcoal-900 shadow-[4px_4px_0px_0px_#18181B] hover:shadow-[5px_5px_0px_0px_#18181B] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Đăng ký học thử cho bé (Miễn phí)</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-charcoal-900" />
              </button>

              {/* Dedicated Page Link */}
              <div className="flex items-center justify-between px-1 pt-1 text-xs">
                <button
                  onClick={onNavigateKids}
                  className="font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-400 decoration-2 underline-offset-4 flex items-center gap-1"
                >
                  <span>Xem chi tiết 3 nhóm tuổi & thời khóa biểu bé</span>
                  <span>→</span>
                </button>
                <span className="text-[11px] text-charcoal-500 hidden sm:inline flex items-center gap-1">
                  <Heart className="w-3 h-3 text-red-500 fill-red-500" /> Miễn phí 100%
                </span>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: NGƯỜI LỚN ================= */}
          <div
            id="lop-nguoi-lon"
            className={`relative rounded-3xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between overflow-hidden border-2 border-stone-200/90 bg-gradient-to-br from-stone-50 via-amber-50/30 to-white shadow-[0_12px_30px_rgba(40,40,40,0.06)] ${
              activeMobileTab === 'kids' ? 'hidden lg:flex' : 'flex'
            }`}
          >
            {/* Background subtle art canvas feeling */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/20 rounded-full blur-3xl pointer-events-none -z-0" />

            <div className="relative z-10">
              {/* Header Badge & Doodles */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <BrushDoodle className="w-11 h-11 transform rotate-6 filter drop-shadow-sm" />
                  <div>
                    <span className="inline-block bg-stone-200/80 text-charcoal-900 text-xs font-bold px-2.5 py-0.5 rounded-full border border-stone-300 uppercase tracking-wider mb-1">
                      Hệ thống mỹ thuật dành cho <span className="bg-charcoal-900 text-amber-200 px-1.5 py-0.2 rounded font-extrabold">người lớn</span>
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight text-charcoal-900">
                      MỸ THUẬT SỐ KHÔNG
                    </h2>
                  </div>
                </div>
                <div className="hidden sm:block text-stone-400">
                  <Sparkles className="w-8 h-8 text-amber-500" />
                </div>
              </div>

              {/* Catchphrase Tags */}
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-bold text-stone-700">
                <span className="bg-stone-100 px-3 py-1 rounded-full border border-stone-300">
                  ☕ Học vẽ từ số 0
                </span>
                <span className="text-stone-400">•</span>
                <span className="bg-stone-100 px-3 py-1 rounded-full border border-stone-300">
                  🎨 Nâng cao kỹ năng
                </span>
                <span className="text-stone-400">•</span>
                <span className="bg-stone-100 px-3 py-1 rounded-full border border-stone-300">
                  🌿 Phát triển phong cách
                </span>
              </div>

              {/* Main Headline */}
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-charcoal-900 leading-snug mb-3">
                Hiện Thực Hóa Đam Mê Hội Họa – Thư Giãn Sau Giờ Làm
              </h3>

              {/* Subheadline */}
              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed mb-5">
                Học vẽ từ con số 0. Tự tay hoàn thiện tác phẩm hoàn chỉnh sau khóa học.
                Dành cho người đi làm, sinh viên tìm kiếm không gian bình yên, chữa lành tâm hồn.
              </p>

              {/* Key Benefits List */}
              <div className="space-y-2.5 mb-6 bg-white/70 backdrop-blur-sm p-4 rounded-2xl border border-stone-200">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Lịch học linh hoạt, bảo lưu & học bù tự do:</strong> Chủ động xếp lịch theo tuần, không lo mất buổi khi bận công việc hay công tác.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Không gian xưởng vẽ mở, đầy cảm hứng:</strong> Nhạc nhẹ, trà hoa, không khí ấm cúng với đầy đủ giá vẽ, sơn dầu, acrylic và màu nước.</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-charcoal-800">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <span><strong>Lộ trình cá nhân theo sở thích tranh:</strong> Thích vẽ phong cảnh, tĩnh vật, ký họa phố cổ hay chân dung đều được giáo viên định hướng riêng.</span>
                </div>
              </div>
            </div>

            {/* Visual Photo Card with Overlays */}
            <div className="relative mb-6 group">
              <div className="relative h-56 sm:h-64 rounded-2xl overflow-hidden border-2 border-stone-800/10 shadow-md">
                <img
                  src="/assets/hero_adults.jpg"
                  alt="Học viên người lớn tại Mỹ Thuật Số Không"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent" />
                
                {/* Floating Micro-Badge */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-stone-200 shadow-sm flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                  <span className="text-[11px] font-bold text-charcoal-800">
                    Hơn 92% học viên hoàn thiện tranh sau buổi đầu!
                  </span>
                </div>

                <div className="absolute top-3 right-3 bg-stone-900 text-amber-300 text-[11px] font-extrabold px-2.5 py-1 rounded-lg border border-stone-700 shadow-[2px_2px_0px_#3f3f46]">
                  Dành cho: 16 - 65+ tuổi
                </div>
              </div>
            </div>

            {/* Action CTA Button */}
            <div className="mt-auto pt-2 space-y-2">
              <button
                onClick={handleRegisterAdults}
                className="w-full py-3.5 sm:py-4 px-6 bg-charcoal-900 hover:bg-charcoal-800 text-amber-300 font-heading font-black text-sm sm:text-base rounded-2xl border-2 border-charcoal-900 shadow-[4px_4px_0px_0px_#FACC15] hover:shadow-[5px_5px_0px_0px_#FACC15] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 text-center"
              >
                <span>Đăng ký buổi trải nghiệm ngay</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300" />
              </button>

              {/* Dedicated Page Link */}
              <div className="flex items-center justify-between px-1 pt-1 text-xs">
                <button
                  onClick={onNavigateAdults}
                  className="font-bold text-charcoal-900 hover:text-amber-800 underline decoration-amber-500 decoration-2 underline-offset-4 flex items-center gap-1"
                >
                  <span>Xem chi tiết 4 chất liệu & ca tối người lớn</span>
                  <span>→</span>
                </button>
                <span className="text-[11px] text-charcoal-500 hidden sm:inline">
                  Trải nghiệm 90 phút • 0đ
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
