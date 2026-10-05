import React from 'react';
import { GraduationCap, Palette, Sprout, CalendarCheck, Home } from 'lucide-react';

export const ValuePillars = () => {
  const pillars = [
    {
      icon: GraduationCap,
      title: 'Dễ hiểu từ số 0',
      subtitle: 'Bắt đầu từ số 0',
      description: 'Không cần năng khiếu, giáo trình chia nhỏ dễ tiếp thu.',
      accent: 'bg-amber-100 text-amber-900 border-amber-300',
      iconColor: 'text-amber-700',
    },
    {
      icon: Palette,
      title: 'Giáo viên Mỹ thuật',
      subtitle: 'Kèm cặp tận tâm 1:1',
      description: 'Tốt nghiệp ĐH Mỹ thuật, hướng dẫn sửa bài tận tình.',
      accent: 'bg-yellow-100 text-yellow-900 border-yellow-300',
      iconColor: 'text-yellow-700',
    },
    {
      icon: Sprout,
      title: 'Lộ trình cá nhân',
      subtitle: 'May đo theo năng lực',
      description: 'Mỗi học viên một giáo án theo phong cách & sở thích.',
      accent: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      iconColor: 'text-emerald-700',
    },
    {
      icon: CalendarCheck,
      title: 'Lịch học linh hoạt',
      subtitle: 'Hỗ trợ học bù tự do',
      description: 'Chủ động tự chọn ca, dời lịch khi bận không mất phí.',
      accent: 'bg-orange-100 text-orange-900 border-orange-300',
      iconColor: 'text-orange-700',
    },
    {
      icon: Home,
      title: 'Xưởng vẽ sáng tạo',
      subtitle: 'Không gian mở ấm cúng',
      description: 'Trang bị 100% màu vẽ, cọ, toan vẽ cao cấp miễn phí.',
      accent: 'bg-amber-50 text-amber-950 border-amber-300',
      iconColor: 'text-amber-800',
    },
  ];

  return (
    <section className="py-10 bg-white border-y border-amber-100/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title pill */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-2 bg-amber-100/90 text-charcoal-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-300">
            ⭐ 5 Trụ Cột Vàng Làm Nên Thương Hiệu Số Không
          </span>
        </div>

        {/* 5 Pillar Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group relative bg-[#FFFDF9] rounded-2xl p-4 sm:p-5 border border-amber-200/70 hover:border-charcoal-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-[3px_3px_0px_0px_#18181B] flex flex-col items-center text-center"
              >
                {/* Number Badge */}
                <span className="absolute top-2 right-2.5 text-[11px] font-mono font-bold text-stone-600">
                  0{idx + 1}
                </span>

                {/* Icon wrapper */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 transition-transform group-hover:scale-110 group-hover:rotate-3 border ${item.accent}`}
                >
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>

                {/* Title & Subtitle */}
                <h4 className="font-heading font-extrabold text-sm sm:text-base text-charcoal-900 mb-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs font-semibold text-amber-700 mb-1.5 font-hand text-base">
                  {item.subtitle}
                </p>
                <p className="text-[12px] text-charcoal-600 leading-relaxed mt-auto">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
