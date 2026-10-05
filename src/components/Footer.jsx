import React from 'react';
import { BrandStamp } from './Doodles';
import { MapPin, Phone, Mail, Clock, Heart, Sparkles } from 'lucide-react';

export const Footer = ({ onOpenTrialModal }) => {
  const branches = [
    {
      city: 'Hà Nội',
      items: [
        { name: 'Cơ sở Ba Đình', address: 'Số 18, Ngõ 92 Kim Mã, Ba Đình, Hà Nội' },
        { name: 'Cơ sở Cầu Giấy', address: 'Tầng 3, 126 Hoàng Quốc Việt, Cầu Giấy, Hà Nội' },
      ]
    },
    {
      city: 'TP. Hồ Chí Minh',
      items: [
        { name: 'Cơ sở Quận 3', address: '215/8 Điện Biên Phủ, Phường Võ Thị Sáu, Quận 3, TP.HCM' },
        { name: 'Cơ sở Bình Thạnh', address: '48/2 Lam Sơn, Phường 6, Bình Thạnh, TP.HCM' },
      ]
    }
  ];

  return (
    <footer className="bg-charcoal-900 text-stone-300 pt-16 pb-12 border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Banner */}
        <div className="bg-charcoal-800 rounded-3xl p-6 sm:p-8 border border-stone-700 mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <BrandStamp className="w-14 h-14" />
            </div>
            <div>
              <h3 className="font-heading font-black text-xl text-white">
                Bắt đầu hành trình sáng tạo của bạn từ số 0
              </h3>
              <p className="text-xs sm:text-sm text-stone-400">
                Nhận ngay 01 buổi học thử miễn phí trị giá 350.000đ dành cho học viên mới.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenTrialModal}
            className="flex-shrink-0 px-6 py-3.5 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-sm rounded-2xl border-2 border-stone-900 shadow-[3px_3px_0px_#FFF] transition-all"
          >
            Đăng ký học thử ngay (0đ)
          </button>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <BrandStamp className="w-9 h-9" />
              <div>
                <span className="font-heading font-black text-xl text-white tracking-tight leading-none block">
                  SỐ KHÔNG
                </span>
                <span className="text-[10px] font-semibold text-amber-300 tracking-wider uppercase">
                  Zero Art Studio
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Hệ thống không gian nghệ thuật và đào tạo mỹ thuật sáng tạo cho mọi lứa tuổi. 
              Chúng tôi tin rằng mọi người sinh ra đều có năng khiếu nghệ thuật tiềm ẩn, 
              chỉ cần một phương pháp khơi mở đúng đắn.
            </p>

            <div className="pt-2 text-xs space-y-2 text-stone-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400" />
                <span>Hotline: <strong className="text-white">0988.123.456</strong> (8h00 - 21h30)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400" />
                <span>Email: <strong className="text-white">lienhe@sokhongart.vn</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-400" />
                <span>Thời gian mở xưởng: Thứ 3 - Chủ Nhật (8h30 - 21h00)</span>
              </div>
            </div>
          </div>

          {/* Branches (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-amber-300">
              Hệ thống xưởng vẽ
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {branches.map((b, i) => (
                <div key={i} className="space-y-2">
                  <span className="text-xs font-black text-white bg-charcoal-800 px-2.5 py-0.5 rounded-md border border-stone-700 inline-block">
                    {b.city}
                  </span>
                  {b.items.map((item, j) => (
                    <div key={j} className="text-xs text-stone-400 space-y-0.5">
                      <strong className="text-stone-200 block">{item.name}</strong>
                      <p className="flex items-start gap-1 leading-snug">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
                        <span>{item.address}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Quick links & Programs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider text-amber-300">
              Khóa Học Tiêu Biểu
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#lop-tre-em" className="hover:text-amber-300 transition-colors">
                  • Lớp Vẽ Sáng Tạo Trẻ Em (4-15 tuổi)
                </a>
              </li>
              <li>
                <a href="#lop-nguoi-lon" className="hover:text-amber-300 transition-colors">
                  • Mỹ Thuật Người Lớn Thư Giãn (16+)
                </a>
              </li>
              <li>
                <a href="#lo-trinh" className="hover:text-amber-300 transition-colors">
                  • Khóa Màu Nước Cổ Điển
                </a>
              </li>
              <li>
                <a href="#lo-trinh" className="hover:text-amber-300 transition-colors">
                  • Khóa Acrylic & Sơn Dầu Phong Cảnh
                </a>
              </li>
              <li>
                <a href="#lo-trinh" className="hover:text-amber-300 transition-colors">
                  • Khóa Ký Họa Bút Sắt & Phác Thảo
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© {new Date().getFullYear()} SỐ KHÔNG (Zero Art Studio). Bản quyền thuộc về Xưởng Vẽ Số Không.</p>
          <p className="flex items-center gap-1">
            <span>Thiết kế & Redesign với tình yêu nghệ thuật</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>

      </div>
    </footer>
  );
};
