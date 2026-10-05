import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

export const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: 'Chưa từng vẽ bao giờ, hoàn toàn không có năng khiếu thì có học được không?',
      a: 'Chắc chắn được! Phương pháp tại Xưởng Vẽ Số Không được thiết kế chuyên biệt cho người bắt đầu từ con số 0. Chúng tôi chia nhỏ từng kỹ thuật dựng hình, pha màu và đi nét thành các bước logic, dễ hiểu. Hơn 90% học viên tại Số Không ban đầu đều chưa từng cầm cọ nhưng đều tự tay vẽ được tranh sau khóa học.'
    },
    {
      q: 'Buổi học thử miễn phí có phát sinh bất kỳ chi phí họa cụ hay phụ thu nào không?',
      a: 'Hoàn toàn KHÔNG! Buổi học thử là 100% miễn phí (0đ). Bạn không cần mang theo bất cứ thứ gì; xưởng đã chuẩn bị sẵn toàn bộ toan vẽ, giấy mỹ thuật, bộ cọ, màu vẽ cao cấp và tạp dề. Bức tranh bạn hoàn thiện trong buổi học sẽ được mang về nhà làm kỷ niệm.'
    },
    {
      q: 'Nếu bận việc đột xuất hoặc có việc gia đình thì có được học bù không?',
      a: 'Có, chính sách học vụ tại Số Không cực kỳ linh hoạt. Bạn có thể chủ động báo nghỉ trước và chọn ca học bù vào bất kỳ khung giờ mở xưởng nào trong tuần mà không bị mất buổi hay phát sinh phí bảo lưu.'
    },
    {
      q: 'Trẻ em từ mấy tuổi có thể bắt đầu theo học tại xưởng?',
      a: 'Lớp Vẽ Số Không nhận các bé từ 4 tuổi trở lên. Với các bé nhỏ 4–6 tuổi, phương pháp tập trung vào cảm thụ sắc màu, vận động tinh và rèn tính kiên nhẫn. Với các bé từ 7–15 tuổi, giáo viên sẽ hướng dẫn thêm về bố cục, khối không gian và sáng tác tự do.'
    },
    {
      q: 'Một lớp học có bao nhiêu học viên? Giáo viên kèm như thế nào?',
      a: 'Mỗi ca học xưởng giới hạn chỉ từ 6 – 8 học viên và luôn có 2 giáo viên tốt nghiệp ĐH Mỹ thuật phụ trách. Nhờ đó, thầy cô có thể quan sát và hướng dẫn sửa bài 1:1 cho từng người, đảm bảo theo sát tiến độ cá nhân của bạn.'
    }
  ];

  return (
    <section id="faq" className="py-16 lg:py-20 bg-white border-t border-amber-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-charcoal-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            Giải Đáp Thắc Mắc
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-charcoal-900">
            Những câu hỏi thường gặp
          </h2>
          <p className="mt-2 text-sm text-charcoal-600">
            Nếu bạn có thêm câu hỏi nào khác, đừng ngại nhắn tin ngay cho chúng tôi qua Zalo hoặc Hotline.
          </p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border-2 transition-all overflow-hidden ${
                  isOpen
                    ? 'border-charcoal-900 bg-amber-50/40 shadow-[3px_3px_0px_#18181B]'
                    : 'border-stone-200 bg-white hover:border-stone-400'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-heading font-bold text-sm sm:text-base text-charcoal-900 flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-amber-300 text-charcoal-900 text-xs font-black flex items-center justify-center flex-shrink-0">
                      ?
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-charcoal-700 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'transform rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-charcoal-700 leading-relaxed border-t border-amber-200/60 bg-amber-50/20">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
