import React from 'react';
import { 
  Brain, 
  UserCheck, 
  Camera, 
  Calendar, 
  Coffee, 
  Palette, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2,
  Heart
} from 'lucide-react';
import { PaletteDoodle, SparkleDoodle } from './Doodles';

export const WhyChooseUsSection = ({ onOpenTrialModal, onNavigateKids, onNavigateAdults }) => {
  return (
    <section className="py-14 lg:py-20 bg-stone-50/70 border-b border-stone-200/80 relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-yellow-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-charcoal-900 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider border border-amber-300 mb-3 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>ĐẶC QUYỀN HỌC VIÊN TẠI SỐ KHÔNG</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-heading font-black text-charcoal-900 tracking-tight leading-snug sm:leading-tight mb-4">
            Vì Sao Hơn 12.500+ Học Viên Đồng Hành Cùng Chúng Tôi?
          </h2>
          <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
            Không chỉ là một lớp dạy vẽ kỹ thuật, Số Không tạo dựng môi trường khơi nguồn cảm xúc — ươm mầm sáng tạo cho trẻ thơ và đem lại chốn bình yên chữa lành cho người lớn.
          </p>
        </div>

        {/* 2-Column Comparison & Benefits Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          
          {/* ================= COLUMN 1: ĐẶC QUYỀN LỚP TRẺ EM ================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-200 shadow-[0_8px_30px_rgba(251,191,36,0.1)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-full pointer-events-none -z-0" />
            
            <div className="relative z-10">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-amber-100">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-400/90 text-charcoal-900 flex items-center justify-center font-black text-xl shadow-sm border border-charcoal-900">
                    🎨
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                      Dành Cho Trẻ Em (4–15 Tuổi)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-charcoal-900">
                      3 Giá Trị Nuôi Dưỡng Trẻ Thơ
                    </h3>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-extrabold text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Phát triển tư duy
                </span>
              </div>

              {/* 3 Key Benefits */}
              <div className="space-y-4">
                {/* Benefit 1 */}
                <div className="group p-4 sm:p-5 rounded-2xl bg-amber-50/60 hover:bg-amber-50 border border-amber-200/80 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-charcoal-900 flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-500">
                      <Brain className="w-5 h-5 text-charcoal-900" />
                    </div>
                    <div>
                      <h4 className="text-base font-heading font-bold text-charcoal-900 mb-1">
                        Rèn luyện tính kiên nhẫn & tư duy não phải
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                        Kích thích bán cầu não phải qua phối màu và bố cục trực quan. Giúp con tăng khả năng tập trung sâu, giảm bớt thời gian dùng điện thoại/iPad và tự tin biểu đạt cảm xúc.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="group p-4 sm:p-5 rounded-2xl bg-amber-50/60 hover:bg-amber-50 border border-amber-200/80 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-charcoal-900 flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-500">
                      <UserCheck className="w-5 h-5 text-charcoal-900" />
                    </div>
                    <div>
                      <h4 className="text-base font-heading font-bold text-charcoal-900 mb-1">
                        Giáo viên Mỹ thuật kèm 1:1 – 100% không vẽ hộ
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                        Thầy cô tốt nghiệp ĐH Mỹ thuật chuyên môn cao, nhẹ nhàng khơi gợi và tôn trọng nét vẽ nguyên bản của bé. Tuyệt đối không cầm tay vẽ hộ hay ép con vào khuôn mẫu.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="group p-4 sm:p-5 rounded-2xl bg-amber-50/60 hover:bg-amber-50 border border-amber-200/80 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-charcoal-900 flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-500">
                      <Camera className="w-5 h-5 text-charcoal-900" />
                    </div>
                    <div>
                      <h4 className="text-base font-heading font-bold text-charcoal-900 mb-1">
                        Báo cáo tiến độ & gửi ảnh sau mỗi buổi học
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                        Phụ huynh luôn an tâm theo dõi hành trình của con qua hình ảnh tác phẩm hoàn thiện và nhận xét chi tiết của thầy cô về kỹ năng, thái độ sau từng buổi.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Link to Kids Class */}
            <div className="mt-6 pt-5 border-t border-amber-100 flex items-center justify-between">
              <span className="text-xs text-charcoal-600 font-medium">
                Buổi thử miễn phí 100% họa cụ
              </span>
              <button
                onClick={onNavigateKids}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-black text-amber-900 hover:text-charcoal-900 transition-colors group"
              >
                <span>Xem chi tiết lớp Trẻ Em</span>
                <ArrowRight className="w-4 h-4 text-amber-700 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* ================= COLUMN 2: ĐẶC QUYỀN LỚP NGƯỜI LỚN ================= */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-stone-300 shadow-[0_8px_30px_rgba(40,40,40,0.06)] flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-stone-100 rounded-bl-full pointer-events-none -z-0" />
            
            <div className="relative z-10">
              {/* Category Header */}
              <div className="flex items-center justify-between pb-5 mb-6 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-charcoal-900 text-amber-300 flex items-center justify-center font-black text-xl shadow-sm border border-stone-700">
                    ☕
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-stone-600 uppercase tracking-wider block">
                      Dành Cho Người Lớn (16+)
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-charcoal-900">
                      3 Đặc Quyền Cho Người Đi Làm
                    </h3>
                  </div>
                </div>
                <span className="hidden sm:inline-block text-xs font-extrabold text-charcoal-900 bg-stone-100 px-3 py-1 rounded-full border border-stone-300">
                  Thư giãn & Chữa lành
                </span>
              </div>

              {/* 3 Key Benefits */}
              <div className="space-y-4">
                {/* Benefit 1 */}
                <div className="group p-4 sm:p-5 rounded-2xl bg-stone-50 hover:bg-amber-50/40 border border-stone-200/90 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-charcoal-900 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-sm border border-stone-700">
                      <Calendar className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-base font-heading font-bold text-charcoal-900 mb-1">
                        Lịch học linh hoạt, bảo lưu & học bù tự do
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                        Chủ động chọn ca học sáng, chiều hoặc tối linh hoạt trong tuần. Khi bận rộn công việc, OT hay công tác đột xuất, bạn hoàn toàn được bảo lưu khóa học mà không sợ mất buổi.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefit 2 */}
                <div className="group p-4 sm:p-5 rounded-2xl bg-stone-50 hover:bg-amber-50/40 border border-stone-200/90 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-charcoal-900 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-sm border border-stone-700">
                      <Coffee className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-base font-heading font-bold text-charcoal-900 mb-1">
                        Không gian trà hoa thư giãn – Giải tỏa áp lực
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                        Không gian xưởng vẽ mở ngập tràn ánh sáng, nhạc không lời êm dịu, trà hoa thơm miễn phí. Nơi bạn gác lại mọi âu lo deadline để đắm chìm trọn vẹn vào màu sắc.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Benefit 3 */}
                <div className="group p-4 sm:p-5 rounded-2xl bg-stone-50 hover:bg-amber-50/40 border border-stone-200/90 transition-all duration-200">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-charcoal-900 text-amber-300 flex items-center justify-center flex-shrink-0 shadow-sm border border-stone-700">
                      <Palette className="w-5 h-5 text-amber-300" />
                    </div>
                    <div>
                      <h4 className="text-base font-heading font-bold text-charcoal-900 mb-1">
                        Lộ trình cá nhân hóa theo sở thích chất liệu
                      </h4>
                      <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
                        Bắt đầu từ con số 0 với chất liệu bạn đam mê: Màu nước, Sơn dầu, Acrylic, hay Chì ký họa. Giáo viên hướng dẫn từng bước để tự tay hoàn thiện bức tranh ưng ý mang về.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Link to Adults Class */}
            <div className="mt-6 pt-5 border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-600 font-medium">
                Miễn phí toàn bộ màu & toan vẽ buổi đầu
              </span>
              <button
                onClick={onNavigateAdults}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-heading font-black text-charcoal-900 hover:text-amber-800 transition-colors group"
              >
                <span>Xem chi tiết lớp Người Lớn</span>
                <ArrowRight className="w-4 h-4 text-charcoal-900 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

        {/* Global Assurance Callout */}
        <div className="mt-10 sm:mt-12 bg-white rounded-2xl p-5 sm:p-6 border-2 border-stone-300 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h5 className="text-sm sm:text-base font-heading font-bold text-charcoal-900">
                Chính sách học thử 0 đồng & Cam kết hoàn tiền 100% nếu không hài lòng
              </h5>
              <p className="text-xs text-charcoal-600">
                Tại Số Không, bạn chỉ đăng ký chính thức khi thực sự yêu thích lớp học và cảm nhận được sự tiến bộ.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenTrialModal && onOpenTrialModal()}
            className="w-full sm:w-auto px-5 py-2.5 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-xs sm:text-sm rounded-xl border-2 border-charcoal-900 shadow-[2px_2px_0px_#18181B] hover:shadow-[3px_3px_0px_#18181B] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex-shrink-0 text-center"
          >
            Đăng ký trải nghiệm 0đ
          </button>
        </div>
      </div>
    </section>
  );
};
