import React, { useState } from 'react';
import { BrushDoodle, SparkleDoodle, UnderlineDoodle } from '../components/Doodles';
import { 
  Sparkles, CheckCircle2, Clock, Calendar, Users, Coffee, 
  Heart, ArrowRight, ShieldCheck, Palette, Frame, Star, Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdultsPage = ({ onOpenTrialModal, onNavigateHome }) => {
  const [selectedMedium, setSelectedMedium] = useState('acrylic');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    medium: 'acrylic',
    branch: 'hn-badinh',
    preferredTime: 'evening'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const mediums = [
    {
      id: 'acrylic',
      name: 'Acrylic Hiện Đại Trên Canvas',
      tag: 'Phù Hợp Nhất Cho Người Mới Bắt Đầu',
      description: 'Chất liệu dễ tiếp cận nhất: nhanh khô, màu sắc tươi sáng, dễ sửa đổi nét vẽ và có độ bền vĩnh cửu theo năm tháng.',
      highlights: [
        'Kỹ thuật pha màu và làm quen với các loại cọ bản, cọ quạt, cọ nét',
        'Tạo texture khối nổi bằng bay vẽ (Palette knife) ấn tượng',
        'Tự tay hoàn thiện tranh phong cảnh, trừu tượng hoặc hoa cỏ',
        'Tranh vẽ xong có thể mang về treo trang trí ngay trong ngày'
      ],
      idealFor: 'Người chưa từng cầm cọ muốn vẽ được tranh đẹp treo tường ngay buổi đầu.'
    },
    {
      id: 'watercolor',
      name: 'Màu Nước Trong Trẻo (Watercolor)',
      tag: 'Nhẹ Nhàng & Thơ Mộng',
      description: 'Nghệ thuật của sự biến hóa giữa nước và hạt màu. Mang lại cảm giác thanh thản, tĩnh lặng và chữa lành tâm hồn sâu sắc.',
      highlights: [
        'Kỹ thuật ướt trên ướt (Wet-on-wet) và ướt trên khô (Wet-on-dry)',
        'Kiểm soát độ ẩm giấy mỹ thuật cotton 300gsm',
        'Vẽ hoa lá, tĩnh vật, bầu trời hoàng hôn và bưu thiếp mini',
        'Rèn luyện sự buông bỏ, chấp nhận nét loang tự nhiên đầy ngẫu hứng'
      ],
      idealFor: 'Những ai yêu thích sự tinh tế, dịu dàng và muốn vẽ tranh ký họa nhỏ gọn.'
    },
    {
      id: 'oil',
      name: 'Sơn Dầu Cổ Điển (Oil Painting)',
      tag: 'Đẳng Cấp & Chiều Sâu Hội Họa',
      description: 'Chất liệu kinh điển của các bảo tàng thế giới với độ hòa sắc mượt mà, chiều sâu vô tận và độ bóng sang trọng.',
      highlights: [
        'Kỹ thuật lót nền, phân mảng sáng tối và chồng lớp màu (Layering)',
        'Pha trộn dầu lanh và dung môi an toàn không mùi độc hại',
        'Sáng tác tranh tĩnh vật cổ điển, chân dung hoặc phong cảnh chiều sâu',
        'Được xưởng hỗ trợ phủ dầu bóng bảo quản tranh trọn đời'
      ],
      idealFor: 'Học viên muốn tìm hiểu chiều sâu hội họa hàn lâm và trải nghiệm vẽ chuyên nghiệp.'
    },
    {
      id: 'sketching',
      name: 'Ký Họa Phố Cổ & Phác Thảo',
      tag: 'Tự Do & Phong Cách',
      description: 'Làm chủ cây bút sắt, bút kim và chì than để ghi lại những khoảnh khắc đời thường, góc phố thân quen hay quán cà phê kỷ niệm.',
      highlights: [
        'Quy luật phối cảnh mắt chim bay (Perspective) và tỷ lệ giải phẫu cơ bản',
        'Kỹ thuật đan nét (Cross-hatching) tạo bóng và độ sâu không gian',
        'Nhấn màu nước nhanh (Urban Sketching) sống động trong 30 phút',
        'Tự tin mang theo sổ vẽ đi du lịch, cafe ghi chép đời sống'
      ],
      idealFor: 'Người đam mê du lịch, kiến trúc hoặc muốn sở hữu cuốn sổ ký họa cá nhân.'
    }
  ];

  const currentMedium = mediums.find(m => m.id === selectedMedium);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại / Zalo';
    else if (!/^(0|84)(3|5|7|8|9)[0-9]{8}$/.test(formData.phone.replace(/[\s.-]/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitted(true);
    try {
      confetti({ particleCount: 90, spread: 60, origin: { y: 0.6 } });
    } catch (e) {}
  };

  return (
    <div className="bg-[#FFFDF9] min-h-screen">
      
      {/* Breadcrumb Header */}
      <div className="bg-stone-100/80 border-b border-stone-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-charcoal-600">
          <button 
            onClick={onNavigateHome}
            className="hover:text-charcoal-900 hover:underline font-medium"
          >
            Trang chủ
          </button>
          <span>/</span>
          <span className="font-bold text-charcoal-900 bg-stone-200/80 px-2 py-0.5 rounded">
            Mỹ Thuật Người Lớn (16+ Tuổi)
          </span>
        </div>
      </div>

      {/* Hero Section Chuyên Biệt Người Lớn */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-stone-100/60 via-amber-50/20 to-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-stone-900 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-4 shadow-sm">
                <BrushDoodle className="w-4 h-4" />
                Không Gian Sáng Tạo & Chữa Lành Sau Giờ Làm
              </div>

              <h1 className="text-3xl sm:text-5xl font-heading font-black text-charcoal-900 tracking-tight leading-tight mb-4">
                Hiện Thực Hóa Đam Mê Hội Họa – <br />
                <span className="text-amber-700 underline decoration-amber-400 decoration-wavy">
                  Bắt Đầu Từ Con Số 0
                </span>
              </h1>

              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed mb-6">
                Bạn chưa từng cầm cọ? Nghĩ rằng mình không có hoa tay? Tại Số Không, hơn <strong>92% học viên người lớn</strong> ban đầu đều nghĩ như vậy. Với phương pháp chia nhỏ bước vẽ logic, không gian trà hoa êm dịu và sự kèm cặp 1:1 tận tâm, bạn sẽ tự tay hoàn thiện bức tranh đầu tay ngay sau buổi trải nghiệm!
              </p>

              {/* 4 Trust Points */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal-800 bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm">
                  <Clock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Lịch học linh hoạt, học bù vô hạn</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal-800 bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm">
                  <Palette className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Trang bị 100% họa cụ cao cấp miễn phí</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal-800 bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm">
                  <Coffee className="w-4 h-4 text-amber-700 flex-shrink-0" />
                  <span>Trà thảo mộc & nhạc nhẹ thư giãn</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal-800 bg-white p-2.5 rounded-xl border border-stone-200 shadow-sm">
                  <Frame className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Tự tay mang tranh hoàn chỉnh về treo</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('form-dang-ky-nguoi-lon');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-4 bg-charcoal-900 hover:bg-charcoal-800 text-amber-300 font-heading font-black text-sm sm:text-base rounded-2xl border-2 border-charcoal-900 shadow-[4px_4px_0px_#FACC15] hover:shadow-[5px_5px_0px_#FACC15] hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <span>Đăng ký buổi trải nghiệm ngay (0đ)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:0988123456"
                  className="px-5 py-4 bg-white hover:bg-stone-100 text-charcoal-800 font-bold text-sm rounded-2xl border-2 border-stone-300 flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>Hotline: 0988.123.456</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-charcoal-900 shadow-[6px_6px_0px_#18181B] bg-stone-100">
                <img
                  src="/assets/hero_adults.jpg"
                  alt="Không gian mỹ thuật người lớn tại Số Không"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-stone-900/90 backdrop-blur-sm p-3.5 rounded-2xl border border-stone-700 shadow-md flex items-center justify-between text-white">
                  <div>
                    <p className="text-xs font-black text-amber-300">Không gian xưởng vẽ mở</p>
                    <p className="text-[11px] text-stone-300">Nhạc nhẹ, trà hoa & trút bỏ deadline</p>
                  </div>
                  <span className="bg-amber-400 text-charcoal-900 text-[10px] font-bold px-2 py-1 rounded-md">
                    Miễn phí họa cụ
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Chất Liệu Nghệ Thuật Phổ Biến */}
      <section className="py-16 bg-white border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-charcoal-800 bg-stone-100 px-3 py-1 rounded-full border border-stone-300">
              Đa Dạng Chất Liệu & Phong Cách
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-charcoal-900 mt-2">
              Lựa chọn chất liệu bạn yêu thích
            </h2>
            <p className="text-sm text-charcoal-600 mt-2">
              Bạn có thể bắt đầu với bất kỳ chất liệu nào hoặc kết hợp nhiều thể loại trong suốt khóa học.
            </p>

            {/* Medium Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {mediums.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelectedMedium(m.id)}
                  className={`px-4 sm:px-5 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm transition-all border-2 ${
                    selectedMedium === m.id
                      ? 'bg-charcoal-900 text-amber-300 border-charcoal-900 shadow-[3px_3px_0px_#FACC15] -translate-y-0.5'
                      : 'bg-stone-50 text-charcoal-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {m.name.split(' (')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Medium Detail Card */}
          {currentMedium && (
            <div className="bg-[#FFFDF9] rounded-3xl border-2 border-charcoal-900 shadow-[6px_6px_0px_#18181B] p-6 sm:p-10 max-w-4xl mx-auto animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-stone-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-charcoal-900">
                      {currentMedium.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-charcoal-900">
                      {currentMedium.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                    {currentMedium.description}
                  </p>
                </div>
              </div>

              {/* Highlights */}
              <div className="mb-6">
                <h4 className="font-heading font-bold text-sm text-charcoal-900 uppercase tracking-wider mb-3">
                  Nội dung trải nghiệm trong khóa:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentMedium.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-stone-200 text-xs text-charcoal-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal for box */}
              <div className="bg-amber-100/70 p-4 rounded-2xl border border-amber-300 text-xs sm:text-sm text-amber-950 mb-6">
                <strong>💡 Phù hợp nhất cho: </strong>
                <span>{currentMedium.idealFor}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-stone-200">
                <div className="text-xs text-charcoal-600 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Tự tay hoàn thành 1 tác phẩm hoàn chỉnh kích thước 40x50cm sau khóa</span>
                </div>

                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, medium: currentMedium.id }));
                    const el = document.getElementById('form-dang-ky-nguoi-lon');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-charcoal-900 text-amber-300 font-heading font-black text-xs sm:text-sm rounded-xl border border-charcoal-900 hover:bg-charcoal-800 shadow-[3px_3px_0px_#FACC15]"
                >
                  Đăng ký thử chất liệu này
                </button>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Lịch Học Buổi Tối & Cuối Tuần */}
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-charcoal-900">
              Lịch học linh hoạt cho người bận rộn
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Bạn tự xếp lịch theo tuần. Bận công tác hoặc tăng ca có thể bảo lưu hoặc học bù vào bất kỳ ca nào khác.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm">
              <h3 className="font-heading font-black text-base text-charcoal-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                Ca Tối Trong Tuần (Thứ 3 đến Thứ 6)
              </h3>
              <ul className="space-y-2.5 text-xs text-charcoal-700">
                <li className="flex justify-between p-2.5 bg-stone-50 rounded-xl">
                  <strong>Ca tối:</strong> <span>18:30 – 21:00 (Rất được dân văn phòng ưa thích)</span>
                </li>
                <li className="p-3 bg-amber-50 rounded-xl text-amber-900 text-[11px] leading-relaxed">
                  ☕ <em>Đến xưởng sau giờ làm, thưởng thức một tách trà hoa thơm và bắt đầu vẽ trong không gian nhạc nhẹ êm ái.</em>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border-2 border-stone-200 shadow-sm">
              <h3 className="font-heading font-black text-base text-charcoal-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                Ca Cuối Tuần (Thứ 7 & Chủ Nhật)
              </h3>
              <ul className="space-y-2.5 text-xs text-charcoal-700">
                <li className="flex justify-between p-2.5 bg-stone-50 rounded-xl">
                  <strong>Ca sáng:</strong> <span>09:00 – 11:30</span>
                </li>
                <li className="flex justify-between p-2.5 bg-stone-50 rounded-xl">
                  <strong>Ca chiều:</strong> <span>14:30 – 17:00</span>
                </li>
                <li className="flex justify-between p-2.5 bg-stone-50 rounded-xl">
                  <strong>Ca tối:</strong> <span>18:30 – 21:00</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Form Đăng Ký Trải Nghiệm Riêng Người Lớn */}
      <section id="form-dang-ky-nguoi-lon" className="py-16 bg-gradient-to-b from-white to-stone-100 border-t border-stone-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border-2 border-charcoal-900 shadow-[8px_8px_0px_#18181B] p-6 sm:p-10">
            
            <div className="text-center mb-8">
              <span className="inline-block bg-charcoal-900 text-amber-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                Tài Trợ 100% Buổi Trải Nghiệm Đầu Tiên
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-charcoal-900">
                Đăng ký trải nghiệm vẽ tranh người lớn
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                90 phút thư giãn vẽ tranh thực tế, nhận tư vấn phong cách vẽ 1:1 và mang về bức tranh kỷ niệm!
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 border-2 border-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-heading font-black text-2xl text-charcoal-900 mb-2">
                  Đã Nhận Đăng Ký Của Bạn!
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-700 max-w-md mx-auto mb-6">
                  Cảm ơn bạn <strong>{formData.fullName}</strong>. Xưởng Vẽ Số Không sẽ liên hệ qua điện thoại/Zalo <strong>{formData.phone}</strong> trong vòng 15 phút để gửi lịch hẹn và vị trí xưởng vẽ cho bạn.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-charcoal-900 text-amber-300 font-bold text-xs rounded-xl"
                >
                  Đăng ký thêm cho bạn đi cùng
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Họ và tên của bạn *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="VD: Nguyễn Thảo My"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-xs sm:text-sm outline-none ${
                      errors.fullName ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-charcoal-900'
                    }`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Số điện thoại / Zalo nhận lịch *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="VD: 0988 123 456"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-xs sm:text-sm outline-none ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-charcoal-900'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1.5">
                    Chất liệu bạn muốn thử nhất:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {mediums.map(m => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, medium: m.id })}
                        className={`p-2.5 rounded-xl border-2 text-xs font-bold transition-all text-left ${
                          formData.medium === m.id
                            ? 'border-charcoal-900 bg-stone-900 text-amber-300 shadow-[2px_2px_0px_#FACC15]'
                            : 'border-stone-200 bg-stone-50 text-charcoal-700'
                        }`}
                      >
                        {m.name.split(' (')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Cơ sở xưởng vẽ thuận tiện:
                    </label>
                    <select
                      value={formData.branch}
                      onChange={e => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full p-2.5 rounded-xl border-2 border-stone-200 text-xs outline-none bg-stone-50 focus:border-charcoal-900"
                    >
                      <option value="hn-badinh">CS1: Ba Đình - Hà Nội</option>
                      <option value="hn-caugiay">CS2: Cầu Giấy - Hà Nội</option>
                      <option value="hn-tayho">CS3: Tây Hồ - Hà Nội</option>
                      <option value="hcm-q3">CS4: Quận 3 - TP.HCM</option>
                      <option value="hcm-binhthanh">CS5: Bình Thạnh - TP.HCM</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Khung giờ bạn rảnh nhất:
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={e => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full p-2.5 rounded-xl border-2 border-stone-200 text-xs outline-none bg-stone-50 focus:border-charcoal-900"
                    >
                      <option value="evening">Tối trong tuần (18h30 - 21h00)</option>
                      <option value="weekend">Cuối tuần (Thứ 7 hoặc CN)</option>
                      <option value="daytime">Ban ngày trong tuần</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 bg-charcoal-900 hover:bg-charcoal-800 text-amber-300 font-heading font-black text-sm sm:text-base rounded-2xl border-2 border-charcoal-900 shadow-[4px_4px_0px_#FACC15] hover:shadow-[5px_5px_0px_#FACC15] transition-all uppercase tracking-wider"
                  >
                    XÁC NHẬN GIỮ CHỖ TRẢI NGHIỆM (0Đ)
                  </button>
                  <p className="text-center text-[11px] text-charcoal-500 mt-2">
                    🔒 Tài trợ 100% học phí & toàn bộ màu vẽ • Cam kết không phát sinh chi phí
                  </p>
                </div>
              </form>
            )}

          </div>
        </div>
      </section>

    </div>
  );
};
