import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, User, BookOpen, MapPin, ShieldCheck, CheckCircle, Clock, Gift, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendLeadToTelegram } from '../services/telegramService';
import { sendLeadToGoogleSheet, formatBranchName } from '../services/googleSheetService';

export const LeadCaptureForm = ({ preselectedAudience = 'kids', onFormSuccess }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    course: preselectedAudience === 'adults' ? 'adults' : 'kids',
    branch: 'hn-badinh',
    preferredTime: 'weekend'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Sync if parent updates audience
  useEffect(() => {
    if (preselectedAudience) {
      setFormData(prev => ({
        ...prev,
        course: preselectedAudience === 'adults' ? 'adults' : 'kids'
      }));
    }
  }, [preselectedAudience]);

  // Vietnamese phone validator
  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[\s.-]/g, '');
    const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;
    return phoneRegex.test(cleanPhone);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại hoặc Zalo';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (VD: 0988123456)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    const timeMap = {
      'weekend': 'Cuối tuần (Thứ 7 & CN)',
      'weekday-evening': 'Tối trong tuần (18h30 - 21h00)',
      'weekday-afternoon': 'Chiều tan trường (17h00 - 18h30)'
    };

    const courseName = formData.course === 'kids'
      ? 'Lớp Vẽ Trẻ Em (4–15 tuổi)'
      : 'Mỹ Thuật Người Lớn (16+ tuổi)';

    const leadPayload = {
      name: formData.fullName,
      phone: formData.phone,
      course: formData.course,
      need: courseName,
      branch: formData.branch,
      preferredTime: timeMap[formData.preferredTime] || formData.preferredTime,
      source: 'Form Đăng Ký Chính (Trang chủ)'
    };

    // Gửi đồng thời về Telegram và Google Sheet Webhook
    sendLeadToTelegram(leadPayload);
    sendLeadToGoogleSheet(leadPayload);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      // Trigger Confetti effect
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // ignore
      }

      if (onFormSuccess) {
        onFormSuccess(formData);
      }
    }, 800);
  };

  return (
    <section id="dang-ky" className="py-16 lg:py-24 bg-gradient-to-b from-[#FFFDF7] to-amber-50/60 relative overflow-hidden">
      {/* Decorative background circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="bg-white rounded-3xl lg:rounded-[36px] border-2 border-charcoal-900 shadow-[8px_8px_0px_0px_#18181B] overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Value Stack Column (5 cols) */}
            <div className="lg:col-span-5 bg-stone-900 text-stone-100 p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-brand-400/20 rounded-full blur-2xl" />

              <div>
                <div className="inline-flex items-center gap-1.5 bg-amber-400 text-charcoal-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider mb-5">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ưu Đãi Đặc Quyền
                </div>

                <h3 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight mb-4">
                  Đăng ký suất học thử miễn phí trong tuần này
                </h3>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed mb-6">
                  Trải nghiệm không gian xưởng vẽ thực tế, nhận đánh giá nét vẽ 1:1 và hoàn thiện ngay 1 bức tranh đầu tay mang về.
                </p>

                {/* Free Trial Value Pillars */}
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-400/20 border border-brand-400/40 flex items-center justify-center flex-shrink-0 text-brand-300 mt-0.5">
                      ✓
                    </div>
                    <span><strong>100% Miễn phí học phí:</strong> Buổi vẽ 90–120 phút (trị giá 350.000đ).</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-400/20 border border-brand-400/40 flex items-center justify-center flex-shrink-0 text-brand-300 mt-0.5">
                      ✓
                    </div>
                    <span><strong>Bao trọn họa cụ:</strong> Toan vẽ, màu acrylic, màu nước, cọ vẽ cao cấp.</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-400/20 border border-brand-400/40 flex items-center justify-center flex-shrink-0 text-brand-300 mt-0.5">
                      ✓
                    </div>
                    <span><strong>Tư vấn lộ trình 1:1:</strong> Đánh giá phong cách và thiết kế bài tập riêng.</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-400/20 border border-brand-400/40 flex items-center justify-center flex-shrink-0 text-brand-300 mt-0.5">
                      ✓
                    </div>
                    <span><strong>Mang tranh về nhà:</strong> Được ép nhiệt hoặc bọc tranh đóng khung cẩn thận.</span>
                  </div>
                </div>
              </div>

              {/* Urgency Badge */}
              <div className="mt-8 pt-6 border-t border-stone-800">
                <div className="flex items-center gap-2 text-brand-300 text-xs font-mono font-bold bg-stone-800/90 p-3 rounded-2xl border border-stone-700">
                  <Clock className="w-4 h-4 text-brand-400 animate-spin" />
                  <span>Chỉ còn 4/15 suất học thử miễn phí tuần này</span>
                </div>
              </div>

            </div>

            {/* Right Form Column (7 cols) */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white">
              
              {isSubmitted ? (
                <div className="text-center py-8 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 border-2 border-emerald-500 shadow-md">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h4 className="text-2xl font-heading font-black text-charcoal-900 mb-2">
                    Đăng Ký Giữ Chỗ Thành Công!
                  </h4>
                  <p className="text-sm text-charcoal-700 mb-6 max-w-md mx-auto leading-relaxed">
                    Cảm ơn <strong>{formData.fullName}</strong>! Tư vấn viên tại cơ sở <strong>{formatBranchName(formData.branch)}</strong> sẽ liên hệ lại với bạn sớm nhất (trong vòng 15 phút) qua số điện thoại/Zalo <strong>{formData.phone}</strong> để xác nhận lịch học thử và đón tiếp bạn chu đáo nhất.
                  </p>

                  <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 max-w-md mx-auto mb-6 text-left space-y-1">
                    <p><strong>Khóa học quan tâm:</strong> {formData.course === 'kids' ? 'Lớp Vẽ Trẻ Em (4-15 tuổi)' : 'Mỹ Thuật Người Lớn (16+ tuổi)'}</p>
                    <p><strong>Cơ sở:</strong> {
                      formData.branch === 'hn-badinh' ? 'CS1: Ba Đình, Hà Nội' :
                      formData.branch === 'hn-caugiay' ? 'CS2: Cầu Giấy, Hà Nội' :
                      formData.branch === 'hn-tayho' ? 'CS3: Tây Hồ, Hà Nội' :
                      formData.branch === 'hp-lechan' ? 'CS4: Lê Chân, Hải Phòng' : 'CS5: Ngô Quyền, Hải Phòng'
                    }</p>
                    <p><strong>Học phí buổi trải nghiệm:</strong> <span className="text-emerald-700 font-bold">0đ (Miễn phí 100%)</span></p>
                  </div>

                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-charcoal-600 hover:text-charcoal-900 underline"
                  >
                    Đăng ký thêm suất cho bạn bè / người thân
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <h4 className="text-xl sm:text-2xl font-heading font-black text-charcoal-900 mb-1">
                      Điền thông tin nhận lịch học thử
                    </h4>
                    <p className="text-xs sm:text-sm text-charcoal-600 mb-5">
                      Cam kết bảo mật thông tin, không gọi làm phiền ngoài giờ.
                    </p>
                  </div>

                  {/* Field 1: Họ và tên */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-charcoal-800 mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-amber-600" />
                      <span>Họ và tên học viên / Phụ huynh *</span>
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="VD: Nguyễn Thảo My hoặc Mẹ bé An"
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm transition-all outline-none ${
                        errors.fullName
                          ? 'border-red-500 bg-red-50/50 focus:border-red-600'
                          : 'border-stone-300 focus:border-charcoal-900 focus:bg-amber-50/20'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Field 2: Số điện thoại / Zalo */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-charcoal-800 mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-amber-600" />
                      <span>Số điện thoại / Zalo nhận lịch *</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="VD: 0988 123 456 (Zalo)"
                      className={`w-full px-4 py-3 rounded-xl border-2 text-sm transition-all outline-none ${
                        errors.phone
                          ? 'border-red-500 bg-red-50/50 focus:border-red-600'
                          : 'border-stone-300 focus:border-charcoal-900 focus:bg-amber-50/20'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{errors.phone}</p>
                    )}
                  </div>

                  {/* Field 3: Khóa học quan tâm (Large interactive pills) */}
                  <div>
                    <label className="block text-xs font-extrabold uppercase tracking-wider text-charcoal-800 mb-2 flex items-center gap-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                      <span>Khóa học quan tâm *</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => handleInputChange('course', 'kids')}
                        className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                          formData.course === 'kids'
                            ? 'border-charcoal-900 bg-amber-100 shadow-[3px_3px_0px_#18181B]'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100'
                        }`}
                      >
                        <span className="text-xs font-bold text-charcoal-900 flex items-center gap-1">
                          🎨 Lớp Vẽ Trẻ Em
                        </span>
                        <span className="text-[11px] text-charcoal-600 mt-1">Độ tuổi 4 – 15 tuổi</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleInputChange('course', 'adults')}
                        className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                          formData.course === 'adults'
                            ? 'border-charcoal-900 bg-stone-900 text-amber-300 shadow-[3px_3px_0px_#FACC15]'
                            : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-charcoal-900'
                        }`}
                      >
                        <span className="text-xs font-bold flex items-center gap-1">
                          🖌️ Mỹ Thuật Người Lớn
                        </span>
                        <span className={`text-[11px] mt-1 ${formData.course === 'adults' ? 'text-stone-300' : 'text-charcoal-600'}`}>
                          Lớp 16+ tuổi
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Branch & Time dropdowns (2 cols) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-700 mb-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-stone-500" />
                        <span>Cơ sở gần bạn nhất:</span>
                      </label>
                      <select
                        value={formData.branch}
                        onChange={(e) => handleInputChange('branch', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 text-xs outline-none bg-stone-50 focus:border-charcoal-900"
                      >
                        <option value="hn-badinh">CS1: Ba Đình - Hà Nội</option>
                        <option value="hn-caugiay">CS2: Cầu Giấy - Hà Nội</option>
                        <option value="hn-tayho">CS3: Tây Hồ - Hà Nội</option>
                        <option value="hp-lechan">CS4: Lê Chân - Hải Phòng</option>
                        <option value="hp-ngoquyen">CS5: Ngô Quyền - Hải Phòng</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-charcoal-700 mb-1 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-stone-500" />
                        <span>Thời gian dự kiến:</span>
                      </label>
                      <select
                        value={formData.preferredTime}
                        onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border-2 border-stone-200 text-xs outline-none bg-stone-50 focus:border-charcoal-900"
                      >
                        <option value="weekend">Thứ 7 hoặc Chủ Nhật</option>
                        <option value="evening">Tối trong tuần (18h30 - 20h30)</option>
                        <option value="daytime">Ban ngày trong tuần</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 px-6 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-sm sm:text-base rounded-2xl border-2 border-charcoal-900 shadow-[4px_4px_0px_0px_#18181B] hover:shadow-[6px_6px_0px_0px_#18181B] hover:-translate-y-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Đang ghi nhận thông tin...</span>
                      ) : (
                        <>
                          <span>XÁC NHẬN GIỮ CHỖ HỌC THỬ</span>
                          <ArrowRight className="w-5 h-5 text-charcoal-900" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 mt-3 text-[11px] text-charcoal-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Bảo mật 100% • Không thu bất kỳ phụ phí nào khi học thử</span>
                    </div>
                  </div>

                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
