import React from 'react';
import { Building2, Users, Palette, Award, Star, Sparkles, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { SparkleDoodle, BrandStamp } from './Doodles';

export const StatsScaleSection = () => {
  const stats = [
    {
      icon: Building2,
      number: '05',
      unit: 'Cơ sở',
      title: 'Xưởng Vẽ Hiện Đại',
      description: 'Tại các vị trí trung tâm Hà Nội & TP.HCM, không gian mở ngập tràn ánh sáng tự nhiên.',
      accent: 'text-amber-600 bg-amber-100 border-amber-300'
    },
    {
      icon: Users,
      number: '12.500+',
      unit: 'Học viên',
      title: 'Đã Đồng Hành Từ Số 0',
      description: 'Hơn 12.500 trẻ em & người lớn tự tin cầm cọ, xóa bỏ hoàn toàn nỗi sợ "không có năng khiếu".',
      accent: 'text-yellow-700 bg-yellow-100 border-yellow-300'
    },
    {
      icon: Palette,
      number: '28.000+',
      unit: 'Bức tranh',
      title: 'Tác Phẩm Hoàn Chỉnh',
      description: '100% do học viên tự tay pha màu và hoàn thiện, được ép nhiệt đóng khung mang về treo nhà.',
      accent: 'text-emerald-700 bg-emerald-100 border-emerald-300'
    },
    {
      icon: Award,
      number: '100%',
      unit: 'Giáo viên',
      title: 'Tốt Nghiệp ĐH Mỹ Thuật',
      description: 'Đội ngũ thầy cô tốt nghiệp chính quy ĐH Mỹ thuật VN & TP.HCM, kèm cặp tận tâm 1:1.',
      accent: 'text-amber-800 bg-amber-100 border-amber-300'
    },
    {
      icon: Star,
      number: '99.2%',
      unit: 'Hài lòng',
      title: 'Đánh Giá 5 Sao',
      description: 'Nhận được hơn 3.200 đánh giá tích cực từ các bậc phụ huynh và học viên đi làm.',
      accent: 'text-orange-700 bg-orange-100 border-orange-300'
    }
  ];

  const highlights = [
    {
      title: 'Không Gian Chuẩn Gallery',
      desc: 'Diện tích mở rộng rãi >180m²/xưởng, hệ thống chiếu sáng chuẩn phòng tranh quốc tế bảo vệ mắt.'
    },
    {
      title: '100% Họa Cụ Cao Cấp',
      desc: 'Toan vải canvas dệt dày, cọ lông mềm chuyên dụng, màu vẽ acrylic & màu nước nhập khẩu an toàn.'
    },
    {
      title: 'Góc Trà Thư Giãn & Triển Lãm',
      desc: 'Phục vụ trà hoa thảo mộc miễn phí, nhạc lofi êm dịu và khu trưng bày tranh của học viên mỗi quý.'
    }
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-white via-amber-50/40 to-white relative overflow-hidden border-b border-amber-100">
      {/* Decorative doodles */}
      <div className="absolute top-10 right-10 opacity-30 pointer-events-none hidden lg:block">
        <SparkleDoodle className="w-12 h-12 text-amber-500 animate-wiggle" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-charcoal-900 text-amber-300 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            Uy Tín &amp; Quy Mô Khẳng Định Vị Thế
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-charcoal-900 leading-tight">
            Hệ Thống Mỹ Thuật Sáng Tạo <br className="hidden sm:block" />
            <span className="text-amber-700 underline decoration-amber-400 decoration-wavy">
              Hàng Đầu Được Tin Chọn
            </span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-charcoal-600 leading-relaxed">
            Hơn 6 năm tận tâm nuôi dưỡng tình yêu hội họa. Số Không tự hào là điểm đến quen thuộc của hơn 12.500 học viên tại Hà Nội và TP.HCM.
          </p>
        </div>

        {/* 5 Big Number Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4 lg:gap-5 mb-14">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-stone-200/90 hover:border-charcoal-900 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[5px_5px_0px_0px_#18181B] flex flex-col items-center text-center group"
              >
                {/* Icon Circle */}
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-3 border ${item.accent} transition-transform group-hover:scale-110 group-hover:rotate-6`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Big Number */}
                <div className="font-heading font-black text-2xl sm:text-3xl text-charcoal-900 tracking-tight leading-none mb-1">
                  {item.number}
                </div>

                {/* Title */}
                <div className="text-xs sm:text-sm font-bold text-amber-800 font-heading mb-2">
                  {item.title}
                </div>

                {/* Description */}
                <p className="text-[11px] text-charcoal-600 leading-relaxed mt-auto">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Studio Highlights & Visual Banner */}
        <div className="bg-stone-900 text-stone-100 rounded-3xl lg:rounded-[36px] p-8 sm:p-10 border-2 border-charcoal-900 shadow-[8px_8px_0px_0px_#FACC15] relative overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block bg-brand-400 text-charcoal-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                Cơ Sở Vật Chất Chuẩn Gallery
              </span>

              <h3 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight">
                Không gian vẽ truyền cảm hứng, giải phóng tư duy sáng tạo
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                Chúng tôi không chỉ mở một lớp vẽ, mà xây dựng một **ngôi nhà nghệ thuật** – nơi trẻ em tự do bay bổng cùng sắc màu và người lớn tìm thấy sự tĩnh lặng, chữa lành sau chuỗi ngày áp lực.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-brand-300">
                <ShieldCheck className="w-4 h-4 text-brand-400" />
                <span>100% học viên được tài trợ toàn bộ dụng cụ khi đến học thử</span>
              </div>
            </div>

            {/* Right 3 Feature Cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="bg-stone-800/90 rounded-2xl p-4 sm:p-5 border border-stone-700 hover:border-amber-400 transition-colors flex flex-col justify-between"
                >
                  <div className="w-8 h-8 rounded-full bg-brand-400 text-charcoal-900 font-bold text-xs flex items-center justify-center mb-3">
                    0{i + 1}
                  </div>
                  <h4 className="font-heading font-bold text-sm text-white mb-1.5 leading-snug">
                    {h.title}
                  </h4>
                  <p className="text-[11px] text-stone-300 leading-relaxed">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
