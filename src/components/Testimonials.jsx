import React, { useState } from 'react';
import { Star, Quote, Heart, CheckCircle, Sparkles } from 'lucide-react';

export const Testimonials = () => {
  const [filter, setFilter] = useState('all');

  const reviews = [
    {
      id: 1,
      type: 'parent',
      name: 'Chị Lan Hương',
      role: 'Phụ huynh bé Minh An (7 tuổi)',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      branch: 'Cơ sở Ba Đình - Hà Nội',
      course: 'Lớp Vẽ Sáng Tạo Trẻ Em',
      rating: 5,
      content: 'Bé nhà mình trước đây rất hiếu động, ngồi làm gì không quá 5 phút. Học ở Số Không được 3 tháng, giờ con có thể tự giác ngồi tập trung 2 tiếng vẽ say sưa. Thầy cô ở đây rất kiên nhẫn, không bao giờ cầm tay vẽ hộ mà luôn hỏi bé muốn thể hiện điều gì.',
      highlight: 'Bé tập trung hơn và vui vẻ tự tin biểu đạt cảm xúc'
    },
    {
      id: 2,
      type: 'adult',
      name: 'Chị Mai Phương',
      role: 'Nhân viên Marketing (28 tuổi)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      branch: 'Cơ sở Lê Chân - Hải Phòng',
      course: 'Mỹ Thuật Người Lớn Thư Giãn',
      rating: 5,
      content: 'Công việc marketing rất nhiều deadline căng thẳng. Tối thứ 4 đến xưởng vẽ là khoảng thời gian chữa lành nhất trong tuần của mình. Không gian ngập tràn mùi toan vẽ, nhạc lofi êm dịu, và đặc biệt thầy giáo chỉ dẫn từng nét cọ từ số 0 rất dễ hiểu.',
      highlight: 'Không gian chữa lành tuyệt vời sau giờ làm việc'
    },
    {
      id: 3,
      type: 'parent',
      name: 'Anh Trần Quốc Huy',
      role: 'Phụ huynh bé Bảo Nam (6 tuổi)',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      branch: 'Cơ sở Cầu Giấy - Hà Nội',
      course: 'Khóa Khởi Động Sắc Màu',
      rating: 5,
      content: 'Rất ưng ý với việc xưởng gửi ảnh tiến độ và nhận xét của thầy cô sau mỗi buổi học. Mình bận đi làm nhưng vẫn nắm rõ hôm nay con học được gì, phối màu gì. Tranh con vẽ xong được thầy cô ép nhiệt và đóng khung rất chỉn chu mang về treo.',
      highlight: 'Báo cáo tiến độ ảnh sau từng buổi rất an tâm'
    },
    {
      id: 4,
      type: 'adult',
      name: 'Anh Hoàng Nam',
      role: 'Kỹ sư phần mềm (34 tuổi)',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      branch: 'Cơ sở Ngô Quyền - Hải Phòng',
      course: 'Lớp Vẽ Phong Cảnh Acrylic',
      rating: 5,
      content: 'Dân IT cả ngày nhìn màn hình code, tay chân rất cứng. Ban đầu tôi nghĩ mình không có hoa tay thì chẳng bao giờ vẽ được. Nhưng học thử 1 buổi thấy cách chia mảng màu của xưởng cực kỳ logic và dễ nắm bắt. Sau 8 buổi tôi đã tự tay vẽ tranh tặng sinh nhật vợ.',
      highlight: 'Phương pháp logic, người chưa từng vẽ đều làm được'
    }
  ];

  const filteredReviews = filter === 'all' ? reviews : reviews.filter(r => r.type === filter);

  return (
    <section id="cam-nhan" className="py-16 lg:py-20 bg-[#FFFDF7] border-t border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-charcoal-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            Đồng Hành Cùng Hơn 2.500+ Học Viên
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-charcoal-900">
            Học viên & Phụ huynh nói gì về Số Không?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal-600">
            Những chia sẻ chân thật nhất sau khi trải nghiệm xưởng vẽ và giáo trình may đo cá nhân.
          </p>

          {/* Filter Pills */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'all'
                  ? 'bg-charcoal-900 text-white shadow-sm'
                  : 'bg-white text-charcoal-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              Tất cả nhận xét
            </button>
            <button
              onClick={() => setFilter('parent')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'parent'
                  ? 'bg-amber-400 text-charcoal-900 shadow-sm border border-charcoal-900'
                  : 'bg-white text-charcoal-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              Phụ huynh lớp Trẻ em
            </button>
            <button
              onClick={() => setFilter('adult')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                filter === 'adult'
                  ? 'bg-stone-800 text-amber-200 shadow-sm'
                  : 'bg-white text-charcoal-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              Học viên Người lớn
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-200/90 hover:border-charcoal-900 transition-all duration-300 hover:shadow-[4px_4px_0px_0px_#18181B] flex flex-col justify-between relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-amber-200 pointer-events-none" />

              <div>
                {/* Rating stars & branch */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-stone-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                    {rev.branch}
                  </span>
                </div>

                {/* Highlight Quote */}
                <h4 className="font-heading font-bold text-base text-charcoal-900 mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0" />
                  "{rev.highlight}"
                </h4>

                {/* Review Body */}
                <p className="text-sm text-charcoal-700 leading-relaxed mb-6">
                  {rev.content}
                </p>
              </div>

              {/* Author footer */}
              <div className="flex items-center gap-3 pt-4 border-t border-amber-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-300"
                />
                <div>
                  <h5 className="font-heading font-black text-sm text-charcoal-900 flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  </h5>
                  <p className="text-xs text-charcoal-500">
                    {rev.role} • <span className="text-amber-700 font-medium">{rev.course}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
