import React, { useState, useEffect } from 'react';
import { X, Sparkles, User, Phone, BookOpen, MapPin, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendLeadToTelegram } from '../services/telegramService';

export const TrialModal = ({ isOpen, onClose, defaultAudience = 'kids' }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    course: defaultAudience,
    branch: 'hn-badinh',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (defaultAudience) {
      setFormData(prev => ({ ...prev, course: defaultAudience }));
    }
  }, [defaultAudience]);

  if (!isOpen) return null;

  const validatePhone = (phone) => {
    const cleanPhone = phone.replace(/[\s.-]/g, '');
    const phoneRegex = /^(0|84)(3|5|7|8|9)[0-9]{8}$/;
    return phoneRegex.test(cleanPhone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại / Zalo';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ (VD: 0988123456)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Bắn lead về Telegram
    sendLeadToTelegram({
      name: formData.fullName,
      phone: formData.phone,
      course: formData.course,
      branch: formData.branch,
      source: 'Popup Học Thử Nhanh (Modal)'
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.5 }
        });
      } catch (err) {}
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-900/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl border-2 border-charcoal-900 shadow-[8px_8px_0px_0px_#18181B] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-stone-100 hover:bg-stone-200 rounded-full flex items-center justify-center text-charcoal-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-brand-300 via-amber-200 to-yellow-100 p-6 border-b-2 border-charcoal-900">
          <div className="inline-flex items-center gap-1.5 bg-charcoal-900 text-amber-300 text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3" />
            Học Thử Miễn Phí (0đ)
          </div>
          <h3 className="font-heading font-black text-xl sm:text-2xl text-charcoal-900 leading-tight">
            Đăng ký trải nghiệm vẽ tranh 90 phút
          </h3>
          <p className="text-xs sm:text-sm text-charcoal-700 mt-1">
            Được tài trợ 100% học phí & toàn bộ họa cụ. Tự tay hoàn thiện 1 bức tranh mang về!
          </p>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {isSubmitted ? (
            <div className="text-center py-6 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 border-2 border-emerald-500">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="font-heading font-black text-xl text-charcoal-900 mb-1">
                Giữ Chỗ Thành Công!
              </h4>
              <p className="text-xs sm:text-sm text-charcoal-600 mb-5 leading-relaxed">
                Xưởng Vẽ Số Không sẽ liên hệ tới số <strong>{formData.phone}</strong> qua Zalo/Điện thoại trong vòng 15 phút để gửi lịch hẹn chi tiết.
              </p>
              <button
                onClick={onClose}
                className="w-full py-3 bg-charcoal-900 text-amber-300 font-bold text-xs rounded-xl border border-charcoal-900"
              >
                Đóng cửa sổ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1 flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-amber-600" />
                  <span>Họ và tên *</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => {
                    setFormData({ ...formData, fullName: e.target.value });
                    if (errors.fullName) setErrors({ ...errors, fullName: '' });
                  }}
                  placeholder="VD: Nguyễn Thảo My"
                  className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-xs sm:text-sm outline-none ${
                    errors.fullName ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-charcoal-900'
                  }`}
                />
                {errors.fullName && <p className="text-red-500 text-[11px] mt-0.5">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1 flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-amber-600" />
                  <span>Số điện thoại / Zalo *</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors({ ...errors, phone: '' });
                  }}
                  placeholder="VD: 0988 123 456"
                  className={`w-full px-3.5 py-2.5 rounded-xl border-2 text-xs sm:text-sm outline-none ${
                    errors.phone ? 'border-red-500 bg-red-50' : 'border-stone-300 focus:border-charcoal-900'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-[11px] mt-0.5">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1.5 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                  <span>Khóa học bạn quan tâm *</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, course: 'kids' })}
                    className={`py-2 px-3 rounded-xl border-2 text-xs font-bold transition-all text-left ${
                      formData.course === 'kids'
                        ? 'border-charcoal-900 bg-amber-100 shadow-[2px_2px_0px_#18181B]'
                        : 'border-stone-200 text-charcoal-600'
                    }`}
                  >
                    🎨 Lớp Bé (4–15 tuổi)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, course: 'adults' })}
                    className={`py-2 px-3 rounded-xl border-2 text-xs font-bold transition-all text-left ${
                      formData.course === 'adults'
                        ? 'border-charcoal-900 bg-stone-900 text-amber-300 shadow-[2px_2px_0px_#FACC15]'
                        : 'border-stone-200 text-charcoal-600'
                    }`}
                  >
                    🖌️ Người Lớn (16+)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-charcoal-800 mb-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-500" />
                  <span>Cơ sở thuận tiện:</span>
                </label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border-2 border-stone-200 text-xs outline-none bg-stone-50 focus:border-charcoal-900"
                >
                  <option value="hn-badinh">CS1: Ba Đình - Hà Nội</option>
                  <option value="hn-caugiay">CS2: Cầu Giấy - Hà Nội</option>
                  <option value="hn-tayho">CS3: Tây Hồ - Hà Nội</option>
                  <option value="hp-lechan">CS4: Lê Chân - Hải Phòng</option>
                  <option value="hp-ngoquyen">CS5: Ngô Quyền - Hải Phòng</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-brand-400 hover:bg-brand-300 text-charcoal-900 font-heading font-black text-sm rounded-xl border-2 border-charcoal-900 shadow-[3px_3px_0px_0px_#18181B] hover:shadow-[4px_4px_0px_0px_#18181B] transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
                >
                  {isSubmitting ? 'Đang gửi...' : 'Xác nhận giữ chỗ (0đ)'}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-2 text-[11px] text-charcoal-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Bảo mật 100% • Không gọi làm phiền</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
