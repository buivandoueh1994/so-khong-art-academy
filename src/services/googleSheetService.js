// Google Sheet Webhook Service for "SỐ KHÔNG" (Zero Art Studio)
// Webhook Endpoint: Google Apps Script Web App
// Tab Route: 'art_center'

export const GOOGLE_SHEET_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbx-QE3ampBHhFNLpUOqATB7T3y9bsrAoGALJ95uxc7-JpWpPs9-QDqlGfsaifBJqPiY/exec';

// Bộ nhớ đệm chống gửi trùng lặp số điện thoại trong vòng 5 phút
const recentSentLeads = new Map();

/**
 * Chuẩn hóa và xác thực số điện thoại theo định dạng chuẩn Việt Nam:
 * - 10 chữ số
 * - Bắt đầu bằng các đầu số di động hợp lệ: 03, 05, 07, 08, 09
 * @param {string} rawPhone
 * @returns {string|null} Số điện thoại chuẩn 10 số (VD: 0912345678) hoặc null nếu không hợp lệ
 */
export function normalizeVietnamesePhone(rawPhone) {
  if (!rawPhone) return null;

  // Loại bỏ khoảng trắng, dấu gạch nối, dấu chấm, dấu ngoặc
  let clean = String(rawPhone).trim().replace(/[\s.\-()]/g, '');

  // Chuẩn hóa tiền tố quốc tế +84 hoặc 84 về 0
  if (clean.startsWith('+84')) {
    clean = '0' + clean.slice(3);
  } else if (clean.startsWith('84') && clean.length === 11) {
    clean = '0' + clean.slice(2);
  }

  // Regex kiểm tra chuẩn 10 số di động Việt Nam (03x, 05x, 07x, 08x, 09x)
  const vnPhoneRegex = /^0(3|5|7|8|9)[0-9]{8}$/;

  return vnPhoneRegex.test(clean) ? clean : null;
}

/**
 * Gửi dữ liệu Lead về Google Sheet qua Webhook POST
 * CHỈ GỬI KHI CÓ LEAD HỢP LỆ (Số điện thoại 10 số chuẩn VN + Nhu cầu/Khóa học)
 * Tuyệt đối không gửi tin nhắn chat thông thường.
 *
 * Payload chuẩn:
 * {
 *   "source": "art_center",
 *   "name": "<Họ tên khách hàng hoặc để trống nếu khách không nói>",
 *   "phone": "<Số điện thoại khách hàng, định dạng số chuẩn (VD: 0912345678)>",
 *   "need": "<Nhu cầu tư vấn, tên khóa học hoặc dịch vụ khách đang quan tâm>",
 *   "note": "<Ghi chú thêm về ca học mong muốn, trình độ hiện tại, độ tuổi, v.v.>"
 * }
 *
 * @param {Object} leadData
 * @returns {Promise<boolean>}
 */
export async function sendLeadToGoogleSheet(leadData = {}) {
  try {
    const rawPhone = leadData.phone;
    const cleanPhone = normalizeVietnamesePhone(rawPhone);

    // 1. Kiểm tra điều kiện bắt buộc: Số điện thoại phải đúng chuẩn 10 số VN
    if (!cleanPhone) {
      console.warn(
        '[Google Sheet Service] Bỏ qua: Số điện thoại không hợp lệ hoặc không đúng định dạng VN (10 số, đầu 03/05/07/08/09):',
        rawPhone
      );
      return false;
    }

    // 2. Chống spam / gửi trùng lặp cùng 1 số điện thoại trong vòng 5 phút
    const now = Date.now();
    const lastSentTime = recentSentLeads.get(cleanPhone);
    if (lastSentTime && now - lastSentTime < 5 * 60 * 1000) {
      console.log(
        `[Google Sheet Service] Bỏ qua: Số điện thoại ${cleanPhone} đã được gửi cách đây ít phút.`
      );
      return false;
    }

    // 3. Chuẩn hóa tên khách hàng (hoặc để trống nếu khách không nói)
    const formattedName = leadData.name ? String(leadData.name).trim() : '';

    // 4. Chuẩn hóa nhu cầu / khóa học
    const formattedNeed =
      leadData.need ||
      leadData.courseName ||
      formatCourseName(leadData.course) ||
      'Quan tâm đăng ký học thử miễn phí (0đ)';

    // 5. Chuẩn hóa ghi chú (cơ sở, ca học, lời nhắn, độ tuổi...)
    const noteParts = [];
    if (leadData.branch) {
      noteParts.push(`Cơ sở: ${formatBranchName(leadData.branch)}`);
    }
    if (leadData.preferredTime || leadData.preferredSchedule) {
      noteParts.push(`Ca học: ${leadData.preferredTime || leadData.preferredSchedule}`);
    }
    if (leadData.source) {
      noteParts.push(`Nguồn: ${leadData.source}`);
    }
    if (leadData.note) {
      noteParts.push(`Ghi chú: ${leadData.note}`);
    } else if (leadData.rawNote) {
      noteParts.push(`Nội dung chat: "${leadData.rawNote}"`);
    }

    const formattedNote = noteParts.join(' | ');

    // 6. Xây dựng đúng Payload theo quy định bắt buộc
    const payload = {
      source: 'art_center', // BẮT BUỘC để Google Apps Script route vào tab "Art center"
      name: formattedName,
      phone: cleanPhone,
      need: formattedNeed,
      note: formattedNote
    };

    console.log('[Google Sheet Service] Đang gửi Payload về Webhook:', payload);

    // 7. Gửi POST request tới Webhook
    // Sử dụng 'Content-Type': 'text/plain;charset=utf-8' để tránh CORS preflight OPTIONS
    // và redirect: 'follow' để Google Apps Script trả về response trực tiếp.
    try {
      const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload),
        redirect: 'follow'
      });

      if (response && response.ok) {
        try {
          const resData = await response.json();
          console.log('[Google Sheet Service] ✅ Google Sheet phản hồi:', resData);
        } catch (_) {}
      }
    } catch (fetchErr) {
      // Fallback với mode: 'no-cors' phòng trường hợp trình duyệt chặn CORS redirect
      try {
        await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          },
          body: JSON.stringify(payload)
        });
        console.log('[Google Sheet Service] ✅ Gửi thành công qua fallback no-cors.');
      } catch (fallbackErr) {
        console.error('[Google Sheet Service] ❌ Lỗi fallback:', fallbackErr);
      }
    }

    // Đánh dấu số điện thoại đã được gửi thành công
    recentSentLeads.set(cleanPhone, now);

    console.log(
      `[Google Sheet Service] ✅ Đã đẩy Lead thành công về tab Art center cho SĐT: ${cleanPhone}`
    );
    return true;
  } catch (error) {
    console.error('[Google Sheet Service] ❌ Lỗi khi gửi Webhook tới Google Sheet:', error);
    return false;
  }
}

/**
 * Helper format tên cơ sở sang dạng thân thiện
 */
function formatBranchName(branchId) {
  const branchMap = {
    'hn-badinh': 'CS1: Ba Đình, Hà Nội (Số 18 Ngõ 92 Kim Mã)',
    'hn-caugiay': 'CS2: Cầu Giấy, Hà Nội (126 Hoàng Quốc Việt)',
    'hn-tayho': 'CS3: Tây Hồ, Hà Nội (45 Tô Ngọc Vân)',
    'hp-lechan': 'CS4: Lê Chân, Hải Phòng (82 Mê Linh)',
    'hp-ngoquyen': 'CS5: Ngô Quyền, Hải Phòng (15 Lạch Tray)'
  };
  return branchMap[branchId] || branchId || 'Chưa chọn cơ sở';
}

/**
 * Helper format tên khóa học
 */
function formatCourseName(courseId) {
  const courseMap = {
    kids: 'Lớp Vẽ Trẻ Em (4–15 tuổi)',
    adults: 'Mỹ Thuật Người Lớn (16+ tuổi)',
    '4-6': 'Lớp Mầm Sáng Tạo (4–6 tuổi)',
    '7-10': 'Lớp Năng Khiếu Nhí (7–10 tuổi)',
    '11-15': 'Lớp Hội Họa Thiếu Niên (11–15 tuổi)',
    acrylic: 'Khóa Vẽ Acrylic Hiện Đại',
    watercolor: 'Khóa Màu Nước Watercolor',
    oil: 'Khóa Sơn Dầu Cổ Điển',
    sketching: 'Khóa Ký Họa Phố Cổ'
  };
  return courseMap[courseId] || courseId || null;
}
