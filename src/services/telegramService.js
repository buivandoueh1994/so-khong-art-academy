// Telegram Notification Service for SỐ KHÔNG (Zero Art Studio)
// Bot: @trungtamve_bot
// Chat ID: 7603716054

const TELEGRAM_BOT_TOKEN = '8825045028:AAHkGZAqJh_c48SuhdtUbdZFYnZKf4HE0MQ';
const TELEGRAM_CHAT_ID = '7603716054';

// Bộ nhớ đệm chống bắn trùng lặp số điện thoại trong 5 phút
const recentSentLeads = new Map();

/**
 * Gửi thông báo Lead về Telegram
 * CHỈ GỬI KHI CÓ LEAD HỢP LỆ (Có Số điện thoại)
 * Tuyệt đối không gửi tin nhắn chat thông thường
 */
export async function sendLeadToTelegram(leadData) {
  try {
    const { name, phone, course, branch, preferredTime, source, rawNote } = leadData;

    // Kiểm tra tính hợp lệ: Bắt buộc phải có Số Điện Thoại
    if (!phone || String(phone).trim().length < 8) {
      console.warn('[Telegram Service] Bỏ qua: Không có số điện thoại hợp lệ.');
      return false;
    }

    const cleanPhone = String(phone).replace(/[\s.-]/g, '');

    // Kiểm tra chống spam trùng lặp
    const now = Date.now();
    const lastSentTime = recentSentLeads.get(cleanPhone);
    if (lastSentTime && now - lastSentTime < 5 * 60 * 1000) {
      console.log(`[Telegram Service] Bỏ qua: Số ${cleanPhone} vừa được gửi cách đây ít phút.`);
      return false;
    }

    // Đánh dấu đã gửi
    recentSentLeads.set(cleanPhone, now);

    // Map tên cơ sở thân thiện
    const branchMap = {
      'hn-badinh': 'CS1: Ba Đình - Hà Nội',
      'hn-caugiay': 'CS2: Cầu Giấy - Hà Nội',
      'hn-tayho': 'CS3: Tây Hồ - Hà Nội',
      'hp-lechan': 'CS4: Lê Chân - Hải Phòng',
      'hp-ngoquyen': 'CS5: Ngô Quyền - Hải Phòng'
    };

    const formattedBranch = branchMap[branch] || branch || 'Chưa chọn cơ sở';

    // Map tên khóa học
    const courseMap = {
      'kids': '🎨 Lớp Vẽ Trẻ Em (4–15 tuổi)',
      'adults': '🖌️ Mỹ Thuật Người Lớn (16+ tuổi)',
      '4-6': '🐣 Lớp Mầm Sáng Tạo (4–6 tuổi)',
      '7-10': '🎨 Lớp Năng Khiếu Nhí (7–10 tuổi)',
      '11-15': '🏛️ Lớp Hội Họa Thiếu Niên (11–15 tuổi)',
      'acrylic': '🖼️ Khóa Acrylic Hiện Đại',
      'watercolor': '💧 Khóa Màu Nước (Watercolor)',
      'oil': '🎨 Khóa Sơn Dầu Cổ Điển',
      'sketching': '✒️ Khóa Ký Họa Phố Cổ'
    };

    const formattedCourse = courseMap[course] || course || 'Quan tâm học thử 0đ';

    // Format thời gian
    const timeString = new Date().toLocaleString('vi-VN', {
      timeZone: 'Asia/Ho_Chi_Minh',
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Soạn nội dung tin nhắn HTML đẹp mắt, chuyên nghiệp
    const messageLines = [
      '🎨 <b>CÓ LEAD MỚI - XƯỞNG VẼ SỐ KHÔNG</b> 🎨',
      '━━━━━━━━━━━━━━━━━━━━━━',
      `👤 <b>Họ tên:</b> ${name || 'Khách hàng'}`,
      `📞 <b>SĐT / Zalo:</b> <code>${cleanPhone}</code>`,
      `📚 <b>Khóa học:</b> ${formattedCourse}`,
      `📍 <b>Cơ sở:</b> ${formattedBranch}`,
      preferredTime ? `⏰ <b>Khung giờ:</b> ${preferredTime}` : null,
      `💬 <b>Nguồn đăng ký:</b> ${source || 'Website SỐ KHÔNG'}`,
      rawNote ? `📝 <b>Ghi chú / Tin nhắn:</b> <i>"${rawNote}"</i>` : null,
      `🕒 <b>Thời gian nhận:</b> ${timeString}`,
      '━━━━━━━━━━━━━━━━━━━━━━',
      '⚡ <b>Ưu đãi:</b> Miễn phí 100% học thử (0đ)',
      '👉 <i>Vui lòng gọi điện hoặc nhắn tin Zalo trong vòng 15 phút!</i>'
    ].filter(Boolean);

    const messageText = messageLines.join('\n');

    const response = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: messageText,
          parse_mode: 'HTML',
          disable_web_page_preview: true
        })
      }
    );

    const result = await response.json();
    if (result.ok) {
      console.log('[Telegram Service] Gửi Lead thành công tới Chat ID:', TELEGRAM_CHAT_ID);
      return true;
    } else {
      console.error('[Telegram Service] Gửi thất bại:', result);
      return false;
    }
  } catch (error) {
    console.error('[Telegram Service] Lỗi kết nối:', error);
    return false;
  }
}
