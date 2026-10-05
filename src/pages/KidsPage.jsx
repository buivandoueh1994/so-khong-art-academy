import React, { useState } from 'react';
import { PaletteDoodle, SunDoodle, ArrowDoodle, SparkleDoodle } from '../components/Doodles';
import { 
  Sparkles, CheckCircle2, ShieldCheck, Clock, Calendar, Users, 
  Heart, ArrowRight, BookOpen, Star, HelpCircle, Trophy, Phone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const KidsPage = ({ onOpenTrialModal, onNavigateHome }) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState('4-6');
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    childAge: '4-6',
    branch: 'hn-badinh',
    preferredSchedule: 'weekend-morning'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const ageGroups = [
    {
      id: '4-6',
      name: 'Mầm Sáng Tạo',
      age: '4 – 6 Tuổi',
      duration: '75 phút / buổi',
      classSize: '4 – 6 bé / lớp (2 giáo viên)',
      description: 'Giai đoạn vàng phát triển não phải và vận động tinh. Bé học qua trò chơi màu sắc, không gò bó khuôn mẫu.',
      curriculum: [
        'Khám phá thế giới qua màu vẽ nước hữu cơ và sáp dầu mềm',
        'Rèn luyện vận động tinh của đôi tay, cầm cọ và kiểm soát lực tay',
        'Kích thích trí tưởng tượng: Vẽ động vật, thiên nhiên, gia đình',
        'Kết hợp thủ công sáng tạo: Đắp nổi màu, cắt dán chất liệu tự nhiên'
      ],
      outcome: 'Bé hào hứng, tự tin thể hiện cảm xúc, tăng khả năng tập trung từ 10 phút lên 60 phút say mê.',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300'
    },
    {
      id: '7-10',
      name: 'Năng Khiếu Nhí',
      age: '7 – 10 Tuổi',
      duration: '90 phút / buổi',
      classSize: '6 – 8 bé / lớp (2 giáo viên)',
      description: 'Phát triển tư duy hình khối và phối màu có chủ đích. Bé học cách kể câu chuyện của riêng mình qua từng bức tranh.',
      curriculum: [
        'Dựng hình cơ bản: Tỷ lệ, hình học hóa vạn vật xung quanh',
        'Quy luật phối màu: Bánh xe màu sắc, gam màu nóng - lạnh - tương phản',
        'Làm quen chất liệu đa dạng: Màu Gouache, màu nước, Acrylic trên toan vải',
        'Kỹ thuật tả chất: Vẽ lông thú cưng, bóng nước, mây trời và cỏ cây'
      ],
      outcome: 'Bé nắm vững kỹ thuật dựng hình, tự lập hoàn thành bức tranh hoàn chỉnh mang phong cách riêng.',
      badgeColor: 'bg-yellow-100 text-yellow-900 border-yellow-400'
    },
    {
      id: '11-15',
      name: 'Hội Họa Thiếu Niên',
      age: '11 – 15 Tuổi',
      duration: '120 phút / buổi',
      classSize: '6 – 8 bạn / lớp',
      description: 'Lộ trình định hướng phong cách nghệ thuật cá nhân và kỹ thuật hàn lâm: Bố cục không gian, sáng tối và chất liệu chuyên sâu.',
      curriculum: [
        'Luật xa gần (Perspective 1 điểm, 2 điểm tụ) và bố cục vàng',
        'Kiểm soát ánh sáng, đổ bóng và phân mảng không gian (Chiaroscuro)',
        'Sáng tác tranh phong cảnh, tĩnh vật, ký họa nhân vật hoặc manga',
        'Học chuyên sâu chất liệu: Sơn dầu cổ điển, Acrylic canvas khổ lớn'
      ],
      outcome: 'Sở hữu Portfolio tranh cá nhân hoàn chỉnh, sẵn sàng thi năng khiếu hoặc làm chủ hội họa tự do.',
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-400'
    }
  ];

  const currentProgram = ageGroups.find(g => g.id === selectedAgeGroup);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.parentName.trim()) newErrors.parentName = 'Vui lòng nhập tên phụ huynh';
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
      <div className="bg-amber-50/70 border-b border-amber-200/80 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-xs text-charcoal-600">
          <button 
            onClick={onNavigateHome}
            className="hover:text-charcoal-900 hover:underline font-medium"
          >
            Trang chủ
          </button>
          <span>/</span>
          <span className="font-bold text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">
            Lớp Vẽ Trẻ Em (4–15 Tuổi)
          </span>
        </div>
      </div>

      {/* Hero Section Chuyên Biệt Cho Lớp Trẻ Em */}
      <section className="relative py-12 lg:py-16 overflow-hidden bg-gradient-to-b from-amber-50/50 via-yellow-50/30 to-[#FFFDF9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Copy */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 bg-amber-200 text-charcoal-900 text-xs font-black px-3.5 py-1 rounded-full border border-amber-400 uppercase tracking-wider mb-4 shadow-sm">
                <PaletteDoodle className="w-4 h-4" />
                Hệ Thống Đào Tạo Mỹ Thuật Thiếu Nhi
              </div>

              <h1 className="text-3xl sm:text-5xl font-heading font-black text-charcoal-900 tracking-tight leading-tight mb-4">
                Khơi Mở Tiềm Năng Sáng Tạo – <br />
                <span className="text-amber-600 underline decoration-amber-300 decoration-wavy">
                  Bé Tự Tin Từng Nét Vẽ
                </span>
              </h1>

              <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed mb-6">
                Lộ trình may đo theo 3 nhóm độ tuổi (4–6, 7–10, 11–15 tuổi). Phương pháp giáo dục trực quan, 
                tôn trọng cá tính của con, <strong>tuyệt đối không cầm tay vẽ hộ</strong>. Bé tự tin sáng tác 
                bức tranh hoàn chỉnh ngay sau buổi học thử miễn phí đầu tiên!
              </p>

              {/* 4 Trust Checkmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal-800 bg-white/80 p-2.5 rounded-xl border border-amber-200 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>100% màu vẽ hữu cơ an toàn cho trẻ</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal-800 bg-white/80 p-2.5 rounded-xl border border-amber-200 shadow-sm">
                  <Users className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Lớp nhỏ: 2 giáo viên kèm 6-8 bé</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal-800 bg-white/80 p-2.5 rounded-xl border border-amber-200 shadow-sm">
                  <Heart className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Gửi ảnh tiến độ & nhận xét mỗi buổi</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-charcoal-800 bg-white/80 p-2.5 rounded-xl border border-amber-200 shadow-sm">
                  <Trophy className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  <span>Đóng khung tranh triển lãm định kỳ</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    const el = document.getElementById('form-dang-ky-be');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-4 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-sm sm:text-base rounded-2xl border-2 border-charcoal-900 shadow-[4px_4px_0px_#18181B] hover:shadow-[5px_5px_0px_#18181B] hover:-translate-y-0.5 transition-all flex items-center gap-2"
                >
                  <span>Đăng ký học thử cho bé (Miễn phí 0đ)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="tel:0988123456"
                  className="px-5 py-4 bg-white hover:bg-amber-50 text-charcoal-800 font-bold text-sm rounded-2xl border-2 border-amber-300 flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-amber-600" />
                  <span>Hotline: 0988.123.456</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-charcoal-900 shadow-[6px_6px_0px_#18181B] bg-amber-100">
                <img
                  src="/assets/hero_kids.jpg"
                  alt="Bé học vẽ vui vẻ tại Số Không"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl border border-amber-200 shadow-md flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-charcoal-900">Bé Minh An (7 tuổi)</p>
                    <p className="text-[11px] text-amber-700 font-medium">Hoàn thành tác phẩm Vườn Hướng Dương</p>
                  </div>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-1 rounded-md">
                    100% Tự vẽ
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Phân Hệ 3 Nhóm Tuổi Rõ Ràng */}
      <section className="py-16 bg-white border-y border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-full border border-amber-200">
              Giáo Trình Khoa Học Theo Tâm Lý Học Trẻ
            </span>
            <h2 className="text-2xl sm:text-4xl font-heading font-black text-charcoal-900 mt-2">
              Chương trình may đo theo 3 nhóm tuổi
            </h2>
            <p className="text-sm text-charcoal-600 mt-2">
              Mỗi độ tuổi có sự phát triển vận động và tâm lý riêng biệt. Chúng tôi không dạy đại trà mà thiết kế bài tập chuyên biệt cho từng giai đoạn.
            </p>

            {/* Age Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {ageGroups.map(group => (
                <button
                  key={group.id}
                  onClick={() => setSelectedAgeGroup(group.id)}
                  className={`px-5 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm transition-all border-2 ${
                    selectedAgeGroup === group.id
                      ? 'bg-brand-400 text-charcoal-900 border-charcoal-900 shadow-[3px_3px_0px_#18181B] -translate-y-0.5'
                      : 'bg-stone-50 text-charcoal-700 border-stone-200 hover:bg-amber-50'
                  }`}
                >
                  {group.name} ({group.age})
                </button>
              ))}
            </div>
          </div>

          {/* Age Group Detail Card */}
          {currentProgram && (
            <div className="bg-[#FFFDF9] rounded-3xl border-2 border-charcoal-900 shadow-[6px_6px_0px_#18181B] p-6 sm:p-10 max-w-4xl mx-auto animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-amber-200">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-charcoal-900">
                      Độ tuổi: {currentProgram.age}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-charcoal-900">
                      {currentProgram.name}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                    {currentProgram.description}
                  </p>
                </div>

                <div className="text-right text-xs space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentProgram.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <Users className="w-3.5 h-3.5 text-amber-600" />
                    <span>{currentProgram.classSize}</span>
                  </div>
                </div>
              </div>

              {/* 4 Curriculum Pillars */}
              <div className="mb-6">
                <h4 className="font-heading font-bold text-sm text-charcoal-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-600" />
                  Nội dung trọng tâm của khóa:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentProgram.curriculum.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-amber-200/90 text-xs text-charcoal-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome Box */}
              <div className="bg-amber-100/70 p-4 rounded-2xl border border-amber-300 text-xs sm:text-sm text-amber-950 mb-6">
                <strong>🎯 Kết quả đạt được: </strong>
                <span>{currentProgram.outcome}</span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-amber-200">
                <div className="text-xs text-charcoal-600 flex items-center gap-2">
                  <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                  <span>Đã có 1.400+ bé tốt nghiệp khóa này với sự hài lòng 99.2% từ phụ huynh</span>
                </div>

                <button
                  onClick={() => {
                    setFormData(prev => ({ ...prev, childAge: currentProgram.id }));
                    const el = document.getElementById('form-dang-ky-be');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-6 py-3 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-xs sm:text-sm rounded-xl border-2 border-charcoal-900 shadow-[3px_3px_0px_#18181B]"
                >
                  Đăng ký thử nhóm {currentProgram.age}
                </button>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* Lịch Học & Ca Học Thuận Tiện */}
      <section className="py-16 bg-[#FFFDF7]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-charcoal-900">
              Thời khóa biểu lớp trẻ em linh hoạt
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
              Phụ huynh tự do chọn ca học phù hợp với lịch sinh hoạt và lịch học ở trường của bé. Có hỗ trợ học bù khi bé ốm hoặc bận việc gia đình.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm">
              <h3 className="font-heading font-black text-base text-charcoal-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-amber-600" />
                Ca Cuối Tuần (Thứ 7 & Chủ Nhật)
              </h3>
              <ul className="space-y-2.5 text-xs text-charcoal-700">
                <li className="flex justify-between p-2.5 bg-amber-50/60 rounded-xl">
                  <strong>Ca sáng 1:</strong> <span>08:30 – 10:00 (Phù hợp bé 4-6 tuổi)</span>
                </li>
                <li className="flex justify-between p-2.5 bg-amber-50/60 rounded-xl">
                  <strong>Ca sáng 2:</strong> <span>10:15 – 11:45 (Bé 7-10 tuổi)</span>
                </li>
                <li className="flex justify-between p-2.5 bg-amber-50/60 rounded-xl">
                  <strong>Ca chiều 1:</strong> <span>14:30 – 16:00 (Mọi lứa tuổi)</span>
                </li>
                <li className="flex justify-between p-2.5 bg-amber-50/60 rounded-xl">
                  <strong>Ca chiều 2:</strong> <span>16:30 – 18:00 (Bé 11-15 tuổi)</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm">
              <h3 className="font-heading font-black text-base text-charcoal-900 mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-600" />
                Ca Trong Tuần (Thứ 3 đến Thứ 6)
              </h3>
              <ul className="space-y-2.5 text-xs text-charcoal-700">
                <li className="flex justify-between p-2.5 bg-amber-50/60 rounded-xl">
                  <strong>Ca chiều tan trường:</strong> <span>17:00 – 18:30</span>
                </li>
                <li className="flex justify-between p-2.5 bg-amber-50/60 rounded-xl">
                  <strong>Ca tối sớm:</strong> <span>18:30 – 20:00</span>
                </li>
                <li className="p-3 bg-emerald-50 rounded-xl text-emerald-800 text-[11px] leading-relaxed">
                  💡 <em>Lưu ý: Phụ huynh có thể đón bé muộn đến 19h00 (xưởng có khu vực đọc truyện tranh và đồ chơi nghệ thuật cho bé chờ ba mẹ).</em>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Form Đăng Ký Học Thử Riêng Cho Bé */}
      <section id="form-dang-ky-be" className="py-16 bg-gradient-to-b from-white to-amber-50/70 border-t border-amber-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border-2 border-charcoal-900 shadow-[8px_8px_0px_#18181B] p-6 sm:p-10">
            
            <div className="text-center mb-8">
              <span className="inline-block bg-brand-400 text-charcoal-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                Suất Trải Nghiệm Miễn Phí (0đ)
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-charcoal-900">
                Đăng ký buổi học thử vẽ cho bé
              </h3>
              <p className="text-xs sm:text-sm text-charcoal-600 mt-1">
                Bé được chuẩn bị sẵn màu vẽ, giấy vẽ cao cấp và tự tay mang về 1 tác phẩm hoàn chỉnh!
              </p>
            </div>

            {isSubmitted ? (
              <div className="text-center py-6 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 border-2 border-emerald-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-heading font-black text-2xl text-charcoal-900 mb-2">
                  Đã Nhận Yêu Cầu Học Thử Cho Bé!
                </h4>
                <p className="text-xs sm:text-sm text-charcoal-700 max-w-md mx-auto mb-6">
                  Cảm ơn phụ huynh <strong>{formData.parentName}</strong>. Thầy cô quản nhiệm lớp sẽ gọi điện/Zalo tới <strong>{formData.phone}</strong> trong 15 phút để sắp xếp ca học và gửi định vị phòng học cho gia đình.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-charcoal-900 text-amber-300 font-bold text-xs rounded-xl"
                >
                  Đăng ký thêm cho bé thứ 2
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Tên phụ huynh *
                  </label>
                  <input
                    type="text"
                    value={formData.parentName}
                    onChange={e => setFormData({ ...formData, parentName: e.target.value })}
                    placeholder="VD: Mẹ bé An / Nguyễn Lan Hương"
                    className={`w-full px-4 py-3 rounded-xl border-2 text-xs sm:text-sm outline-none ${
                      errors.parentName ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-charcoal-900'
                    }`}
                  />
                  {errors.parentName && <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal-800 mb-1">
                    Số điện thoại / Zalo nhận lịch hẹn *
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
                    Độ tuổi của bé *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {ageGroups.map(g => (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, childAge: g.id })}
                        className={`p-2.5 rounded-xl border-2 text-xs font-bold transition-all ${
                          formData.childAge === g.id
                            ? 'border-charcoal-900 bg-amber-200 shadow-[2px_2px_0px_#18181B]'
                            : 'border-stone-200 bg-stone-50 text-charcoal-700'
                        }`}
                      >
                        {g.age}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-charcoal-800 mb-1">
                      Cơ sở xưởng vẽ gần nhà:
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
                      Khung giờ dự kiến:
                    </label>
                    <select
                      value={formData.preferredSchedule}
                      onChange={e => setFormData({ ...formData, preferredSchedule: e.target.value })}
                      className="w-full p-2.5 rounded-xl border-2 border-stone-200 text-xs outline-none bg-stone-50 focus:border-charcoal-900"
                    >
                      <option value="weekend-morning">Sáng Thứ 7 / Chủ Nhật</option>
                      <option value="weekend-afternoon">Chiều Thứ 7 / Chủ Nhật</option>
                      <option value="weekday-evening">Chiều tan trường trong tuần</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-4 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-sm sm:text-base rounded-2xl border-2 border-charcoal-900 shadow-[4px_4px_0px_#18181B] hover:shadow-[5px_5px_0px_#18181B] transition-all uppercase tracking-wider"
                  >
                    XÁC NHẬN GIỮ CHỖ HỌC THỬ CHO BÉ (0Đ)
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
