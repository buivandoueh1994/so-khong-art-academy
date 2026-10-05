import React, { useState } from 'react';
import { ArrowDoodle, SparkleDoodle, UnderlineDoodle } from './Doodles';
import { ClipboardList, Target, BookOpenCheck, LineChart, Flag, Check, ArrowRight, Sparkles } from 'lucide-react';

export const RoadmapSection = ({ onOpenTrialModal }) => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: 1,
      title: 'Đánh giá ban đầu',
      subtitle: 'Quan sát nét vẽ & sở thích',
      icon: ClipboardList,
      bullets: [
        'Quan sát sở thích, nét vẽ và tư duy thẩm mỹ ban đầu',
        'Tìm hiểu mong muốn cá nhân của học viên hoặc phụ huynh',
        'Xác định điểm mạnh tự nhiên để phát huy'
      ],
      tag: 'Buổi trải nghiệm (Học thử 0đ)',
      color: 'from-amber-100 to-yellow-50',
      borderColor: 'border-amber-300'
    },
    {
      step: 2,
      title: 'Xác định mục tiêu',
      subtitle: 'Định hướng phong cách vẽ',
      icon: Target,
      bullets: [
        'Lựa chọn chất liệu yêu thích (Màu nước, Acrylic, Chì, Sơn dầu)',
        'Xác định phong cách: Tả thực, Trừu tượng, Ký họa, Tranh minh họa',
        'Đặt mốc thời gian hoàn thiện tác phẩm mong muốn'
      ],
      tag: 'Cá nhân hóa phong cách',
      color: 'from-yellow-100 to-amber-50',
      borderColor: 'border-yellow-400'
    },
    {
      step: 3,
      title: 'Lộ trình cá nhân',
      subtitle: 'Giáo trình may đo 1:1',
      icon: BookOpenCheck,
      bullets: [
        'Thiết kế bài tập chia nhỏ theo từng nấc thang kỹ năng',
        'Tập trung luyện dựng hình cơ bản, phối màu và làm chủ cọ',
        'Không áp lực, tiến độ linh hoạt theo tốc độ tiếp thu'
      ],
      tag: 'May đo theo năng lực',
      color: 'from-amber-200/60 to-yellow-100',
      borderColor: 'border-amber-400'
    },
    {
      step: 4,
      title: 'Theo dõi & Ghi nhận',
      subtitle: 'Nhật ký tiến độ từng buổi',
      icon: LineChart,
      bullets: [
        'Chụp ảnh lưu trữ tiến độ tác phẩm sau từng buổi vẽ',
        'Giáo viên gửi nhận xét chi tiết và lời khuyên phát triển',
        'Phụ huynh dễ dàng theo dõi sự tiến bộ từng tuần'
      ],
      tag: 'Minh bạch & Tận tâm',
      color: 'from-yellow-100 to-orange-50',
      borderColor: 'border-amber-300'
    },
    {
      step: 5,
      title: 'Độc lập sáng tác',
      subtitle: 'Tự tin hoàn thiện tranh riêng',
      icon: Flag,
      bullets: [
        'Tự do sáng tạo tranh theo cảm xúc và phong cách riêng',
        'Làm chủ hoàn toàn kỹ thuật phối màu và bố cục khung tranh',
        'Được hỗ trợ đóng khung và trưng bày tại triển lãm định kỳ'
      ],
      tag: 'Tác phẩm hoàn chỉnh',
      color: 'from-amber-100 to-emerald-50',
      borderColor: 'border-amber-400'
    },
  ];

  return (
    <section id="lo-trinh" className="py-16 lg:py-20 bg-[#FFFDF7] relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#F59E0B_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 bg-amber-100 text-charcoal-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Lộ trình học may đo
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-charcoal-900 leading-tight">
              Lộ trình phát triển riêng biệt <br className="hidden sm:block" />
              <span className="relative inline-block text-amber-600">
                cho từng học viên
                <UnderlineDoodle className="absolute -bottom-2 left-0 w-full text-amber-400" />
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-charcoal-700 leading-relaxed">
              Mỗi học viên có một khả năng và tốc độ phát triển khác nhau. Số Không không dạy rập khuôn, 
              mà xây dựng lộ trình học dựa trên độ tuổi, sở thích, thế mạnh và mục tiêu sáng tạo của bạn.
            </p>
          </div>

          {/* Direct CTA Button in Header */}
          <div className="flex-shrink-0">
            <button
              onClick={onOpenTrialModal}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-sm rounded-2xl border-2 border-charcoal-900 shadow-[3px_3px_0px_0px_#18181B] hover:shadow-[4px_4px_0px_0px_#18181B] hover:-translate-y-0.5 transition-all"
            >
              <span>Nhận tư vấn lộ trình phù hợp</span>
              <ArrowRight className="w-4 h-4 text-charcoal-900" />
            </button>
          </div>
        </div>

        {/* 5-Step Desktop Interactive Timeline Grid */}
        <div className="hidden lg:grid grid-cols-5 gap-4 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = activeStep === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`group cursor-pointer relative bg-white rounded-3xl p-5 border-2 transition-all duration-300 flex flex-col justify-between ${
                  isSelected
                    ? 'border-charcoal-900 shadow-[5px_5px_0px_0px_#18181B] -translate-y-2'
                    : 'border-amber-200/90 hover:border-charcoal-900 hover:shadow-[3px_3px_0px_0px_#18181B] hover:-translate-y-1'
                }`}
              >
                {/* Connecting arrow indicator between cards */}
                {idx < steps.length - 1 && (
                  <div className="absolute -right-3.5 top-10 z-20 pointer-events-none text-charcoal-700">
                    <ArrowDoodle className="w-6 h-5" />
                  </div>
                )}

                <div>
                  {/* Step Number Bead */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-charcoal-900 font-heading font-black text-sm flex items-center justify-center border-2 border-charcoal-900 shadow-[2px_2px_0px_#18181B]">
                      {item.step}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-charcoal-800 px-2 py-0.5 rounded-full border border-amber-200">
                      Bước {item.step}
                    </span>
                  </div>

                  {/* Icon Card */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} border ${item.borderColor} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
                    <Icon className="w-6 h-6 text-charcoal-900" />
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-heading font-black text-base text-charcoal-900 mb-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 mb-3 font-hand text-sm">
                    {item.subtitle}
                  </p>

                  {/* Concise Scannable Bullets */}
                  <ul className="space-y-1.5 text-[11px] text-charcoal-700 leading-tight">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Tag */}
                <div className="mt-4 pt-3 border-t border-amber-100">
                  <span className="inline-block text-[10px] font-semibold text-stone-700 bg-amber-50 px-2 py-0.5 rounded-md">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Responsive Vertical Stepper */}
        <div className="lg:hidden space-y-4">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border-2 border-amber-200/90 shadow-sm relative pl-14"
              >
                {/* Step circle on left */}
                <div className="absolute left-4 top-5 w-8 h-8 rounded-full bg-amber-400 text-charcoal-900 font-heading font-black text-sm flex items-center justify-center border-2 border-charcoal-900 shadow-[2px_2px_0px_#18181B]">
                  {item.step}
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-charcoal-800 px-2 py-0.5 rounded-full">
                    Bước 0{item.step}
                  </span>
                  <span className="text-xs font-medium text-stone-700 font-hand text-sm">
                    {item.subtitle}
                  </span>
                </div>

                <h3 className="font-heading font-black text-base text-charcoal-900 mb-2 flex items-center gap-2">
                  <Icon className="w-4 h-4 text-amber-700" />
                  {item.title}
                </h3>

                <ul className="space-y-1.5 text-xs text-charcoal-700">
                  {item.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-amber-600 mt-0.5 flex-shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner callout */}
        <div className="mt-10 bg-amber-100/70 border-2 border-amber-300 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 border-2 border-charcoal-900 flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_#18181B]">
              <Sparkles className="w-6 h-6 text-charcoal-900" />
            </div>
            <div>
              <h4 className="font-heading font-black text-base sm:text-lg text-charcoal-900">
                Chưa biết mình hay con phù hợp với phong cách vẽ nào?
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-700">
                Đăng ký ngay buổi trải nghiệm miễn phí để được thầy cô đánh giá nét vẽ và gợi ý lộ trình may đo trong 15 phút.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenTrialModal}
            className="flex-shrink-0 w-full sm:w-auto px-6 py-3 bg-charcoal-900 hover:bg-charcoal-800 text-amber-300 font-bold text-sm rounded-xl border border-charcoal-900 shadow-sm transition-all"
          >
            Đăng ký học thử ngay (0đ)
          </button>
        </div>

      </div>
    </section>
  );
};
