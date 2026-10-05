// Knowledge Base & Smart Consultation Service for "SỐ KHÔNG" (Zero Art Studio)

export const STUDIO_KNOWLEDGE = {
  brand: "Xưởng Vẽ Số Không (Zero Art Studio)",
  hotline: "0988.123.456",
  branches: [
    { id: "hn-badinh", name: "CS1: Ba Đình, Hà Nội", address: "Số 18, Ngõ 92 Kim Mã, Ba Đình, Hà Nội" },
    { id: "hn-caugiay", name: "CS2: Cầu Giấy, Hà Nội", address: "Tầng 3, 126 Hoàng Quốc Việt, Cầu Giấy, Hà Nội" },
    { id: "hn-tayho", name: "CS3: Tây Hồ, Hà Nội", address: "Số 45 Tô Ngọc Vân, Quảng An, Tây Hồ, Hà Nội" },
    { id: "hp-lechan", name: "CS4: Lê Chân, Hải Phòng", address: "Số 82 Mê Linh, Phường An Biên, Lê Chân, Hải Phòng" },
    { id: "hp-ngoquyen", name: "CS5: Ngô Quyền, Hải Phòng", address: "Số 15 Lạch Tray, Ngô Quyền, Hải Phòng" },
  ],
  kidsCourses: [
    { name: "Mầm Sáng Tạo (4–6 tuổi)", focus: "Vận động tinh, làm quen màu nước hữu cơ, trò chơi màu sắc, 75 phút/buổi." },
    { name: "Năng Khiếu Nhí (7–10 tuổi)", focus: "Dựng hình cơ bản, bánh xe màu sắc, kể chuyện qua tranh, 90 phút/buổi." },
    { name: "Hội Họa Thiếu Niên (11–15 tuổi)", focus: "Phối cảnh Perspective, sáng tối Chiaroscuro, Acrylic canvas & Manga, 120 phút/buổi." }
  ],
  adultMediums: [
    "Acrylic Canvas (Dễ vẽ nhất, nhanh khô, mang tranh về treo ngay)",
    "Màu Nước Watercolor (Trong trẻo, thi vị, tĩnh lặng chữa lành)",
    "Sơn Dầu Oil Painting (Đẳng cấp cổ điển, chiều sâu hòa sắc)",
    "Ký Họa Bút Sắt & Chì (Phối cảnh góc phố, du lịch đời sống)"
  ],
  policy: {
    freeTrial: "Tài trợ 100% học phí buổi trải nghiệm đầu tiên (trị giá 350.000đ) + Bao trọn 100% toan vẽ, màu vẽ, cọ vẽ cao cấp.",
    makeUp: "Hỗ trợ học bù tự do, bảo lưu không giới hạn số buổi khi bận việc hoặc ốm.",
    teachers: "100% giáo viên tốt nghiệp chính quy ĐH Mỹ thuật, kèm cặp 1:1 tận tâm, tuyệt đối không vẽ hộ."
  }
};

// Regex detect Vietnamese Phone Number
export function extractPhoneNumber(text) {
  const phoneRegex = /(?:0|84|\+84)(?:3|5|7|8|9)[0-9]{8}\b/;
  const match = text.match(phoneRegex);
  return match ? match[0] : null;
}

import { sendLeadToTelegram } from './telegramService.js';
import { sendLeadToGoogleSheet } from './googleSheetService.js';

/**
 * Phân tích ngữ cảnh đoạn chat để trích xuất Nhu cầu, Tên và Cơ sở nếu khách đề cập
 */
export function analyzeCustomerIntent(conversationHistory = [], currentMessage = '') {
  const allText = [
    ...conversationHistory.map(m => m.text || ''),
    currentMessage
  ].join(' ').toLowerCase();

  let need = 'Quan tâm đăng ký học thử 0đ (Tư vấn qua Chatbot AI)';
  let detectedName = '';
  let branch = '';

  // 1. Nhận diện họ tên khách hàng
  const namePatterns = [
    /(?:tên\s*(?:em|mình|tôi|của\s*mình)?\s*(?:là)?)\s*[:]?\s*([A-Za-zÀ-ỹ\s]+)/i,
    /(?:mình\s*(?:tên\s*là|tên|là))\s*([A-Za-zÀ-ỹ\s]+)/i,
    /(?:em\s*(?:tên\s*là|tên|là))\s*([A-Za-zÀ-ỹ\s]+)/i,
    /(?:tôi\s*(?:tên\s*là|tên|là))\s*([A-Za-zÀ-ỹ\s]+)/i,
    /(?:chị|anh|cô|bác)\s+([A-Za-zÀ-ỹ]+)/i
  ];
  for (const pattern of namePatterns) {
    const match = currentMessage.match(pattern);
    if (match && match[1]) {
      const raw = match[1].trim();
      const stopWords = ['là', 'ở', 'tại', 'nhé', 'nha', 'ạ', 'sđt', 'phone', 'zalo', 'qua', 'cho', 'với', 'nhá', 'muốn', 'cần', 'hỏi', 'có', 'gửi', 'lấy', 'số'];
      const words = raw.split(/\s+/);
      const cleanWords = [];
      for (const w of words) {
        if (stopWords.includes(w.toLowerCase()) || /\d/.test(w)) break;
        cleanWords.push(w);
      }
      if (cleanWords.length > 0 && cleanWords.length <= 4) {
        detectedName = cleanWords.join(' ');
        break;
      }
    }
  }

  // 2. Nhận diện khóa học / nhu cầu
  if (allText.includes('bé') || allText.includes('trẻ em') || allText.includes('con') || allText.includes('cháu') || allText.includes('mầm')) {
    if (allText.includes('4') || allText.includes('5') || allText.includes('6')) {
      need = 'Lớp Vẽ Trẻ Em - Mầm Sáng Tạo (4–6 tuổi)';
    } else if (allText.includes('7') || allText.includes('8') || allText.includes('9') || allText.includes('10')) {
      need = 'Lớp Vẽ Trẻ Em - Năng Khiếu Nhí (7–10 tuổi)';
    } else if (allText.includes('11') || allText.includes('12') || allText.includes('13') || allText.includes('14') || allText.includes('15')) {
      need = 'Lớp Vẽ Trẻ Em - Hội Họa Thiếu Niên (11–15 tuổi)';
    } else {
      need = 'Lớp Vẽ Trẻ Em (4–15 tuổi)';
    }
  } else if (allText.includes('người lớn') || allText.includes('acrylic') || allText.includes('màu nước') || allText.includes('sơn dầu') || allText.includes('ký họa') || allText.includes('chưa biết vẽ')) {
    if (allText.includes('màu nước') || allText.includes('watercolor')) {
      need = 'Mỹ Thuật Người Lớn - Màu Nước Watercolor';
    } else if (allText.includes('sơn dầu') || allText.includes('oil')) {
      need = 'Mỹ Thuật Người Lớn - Sơn Dầu Cổ Điển';
    } else if (allText.includes('ký họa')) {
      need = 'Mỹ Thuật Người Lớn - Ký Họa Phố Cổ';
    } else {
      need = 'Mỹ Thuật Người Lớn (16+ tuổi) - Acrylic / Tự do';
    }
  }

  // 3. Nhận diện cơ sở quan tâm
  if (allText.includes('ba đình') || allText.includes('kim mã')) branch = 'hn-badinh';
  else if (allText.includes('cầu giấy') || allText.includes('hoàng quốc việt')) branch = 'hn-caugiay';
  else if (allText.includes('tây hồ') || allText.includes('tô ngọc vân')) branch = 'hn-tayho';
  else if (allText.includes('lê chân') || allText.includes('mê linh')) branch = 'hp-lechan';
  else if (allText.includes('ngô quyền') || allText.includes('lạch tray')) branch = 'hp-ngoquyen';
  else if (allText.includes('hải phòng')) branch = 'hp-lechan';
  else if (allText.includes('hà nội')) branch = 'hn-badinh';

  return { detectedName, need, branch };
}

// Lưu trữ lead vào localStorage và gửi đồng thời về Telegram + Google Sheet
export function saveLead(leadData) {
  try {
    const existing = JSON.parse(localStorage.getItem('so_khong_leads') || '[]');
    const newLead = {
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...leadData,
      source: leadData.source || 'Chatbot Tư Vấn'
    };
    existing.unshift(newLead);
    localStorage.setItem('so_khong_leads', JSON.stringify(existing));
    
    // Gửi đồng thời về Telegram và Google Sheet Webhook khi có Lead hợp lệ
    sendLeadToTelegram(newLead);
    sendLeadToGoogleSheet(newLead);
    
    console.log('[SỐ KHÔNG Lead Captured & Dispatched]:', newLead);
    return newLead;
  } catch (err) {
    console.error('Error saving lead:', err);
    return null;
  }
}

/**
 * Smart Consultative Dialog Engine
 * Vừa trả lời giải đáp thắc mắc, vừa khéo léo dẫn dắt xin Tên + SĐT để giữ chỗ học thử 0đ
 */
export function generateBotResponse(userMessage, conversationHistory = []) {
  const text = userMessage.toLowerCase().trim();
  const phone = extractPhoneNumber(userMessage);

  // 1. Nếu khách hàng vừa gửi số điện thoại trong tin nhắn
  if (phone) {
    const intent = analyzeCustomerIntent(conversationHistory, userMessage);
    saveLead({
      name: intent.detectedName,
      phone,
      need: intent.need,
      branch: intent.branch,
      rawNote: userMessage,
      source: 'Chatbot Tư Vấn AI'
    });
    return {
      text: `Dạ em đã nhận được số điện thoại **${phone}** của mình rồi ạ! 🎉\n\nBộ phận quản nhiệm lớp tại Xưởng Vẽ Số Không sẽ liên hệ qua Zalo/Điện thoại trong vòng **15 phút** để gửi thời khóa biểu chi tiết và xác nhận suất **học thử miễn phí (0đ)** cho mình.\n\nCho em hỏi thêm là mình đang đăng ký cho **bé** hay **người lớn** và mình tiện học ở cơ sở nào tại **Hà Nội** hay **Hải Phòng** nhất ạ?`,
      showLeadCard: false,
      leadCaptured: true
    };
  }

  // 2. Hỏi về Lớp Trẻ Em / Con / Bé
  if (text.includes('bé') || text.includes('trẻ em') || text.includes('con') || text.includes('cháu') || text.includes('nhỏ') || text.includes('tuổi')) {
    if (text.includes('4') || text.includes('5') || text.includes('6')) {
      return {
        text: `Dạ với các bé từ 4–6 tuổi, xưởng có lớp **Mầm Sáng Tạo** (75 phút/buổi) ạ! 🐣\n\nỞ độ tuổi này, các cô tập trung rèn luyện **vận động tinh** của đôi tay, cho con làm quen với màu nước hữu cơ an toàn và kích thích trí tưởng tượng qua trò chơi màu sắc. Tuyệt đối không gò bó khuôn mẫu hay cầm tay vẽ hộ con đâu ạ.\n\nTuần này xưởng đang có **suất học thử miễn phí (0đ)** cho bé. Anh/chị cho em xin **Số điện thoại hoặc Zalo** để em giữ chỗ và gửi định vị phòng học cho gia đình nhé!`,
        showLeadCard: true
      };
    }
    if (text.includes('7') || text.includes('8') || text.includes('9') || text.includes('10')) {
      return {
        text: `Dạ bé trong độ tuổi 7–10 tuổi sẽ học lớp **Năng Khiếu Nhí** (90 phút/buổi) ạ! 🎨\n\nCác bé sẽ được thầy cô ĐH Mỹ thuật hướng dẫn dựng hình cơ bản, quy luật phối màu tương phản và tự tay kể câu chuyện của mình qua bức tranh hoàn chỉnh. Sau mỗi buổi vẽ, xưởng đều gửi ảnh sản phẩm và nhận xét của thầy cô cho phụ huynh.\n\nAnh/chị có muốn đăng ký cho bé trải nghiệm **01 buổi học thử miễn phí (0đ)** cuối tuần này không ạ? Anh/chị để lại **Số điện thoại/Zalo** em giữ chỗ cho bé nhé!`,
        showLeadCard: true
      };
    }
    return {
      text: `Dạ chào anh/chị! Lớp vẽ trẻ em tại Số Không nhận các bé từ **4 đến 15 tuổi** với 3 cấp độ may đo riêng:\n\n• **4–6 tuổi:** Mầm Sáng Tạo (vận động tinh, màu hữu cơ)\n• **7–10 tuổi:** Năng Khiếu Nhí (dựng hình, phối màu sắc)\n• **11–15 tuổi:** Hội Họa Thiếu Niên (bố cục, acrylic & manga)\n\nBé nhà mình năm nay mấy tuổi rồi ạ? Anh/chị nhắn độ tuổi của bé hoặc để lại **Số điện thoại/Zalo** để cô giáo tư vấn lớp phù hợp nhất cho con nhé!`,
      showLeadCard: true
    };
  }

  // 3. Hỏi về Lớp Người Lớn / Chưa biết vẽ / Đi làm
  if (text.includes('người lớn') || text.includes('đi làm') || text.includes('sinh viên') || text.includes('chưa biết vẽ') || text.includes('hoa tay') || text.includes('năng khiếu')) {
    return {
      text: `Dạ anh/chị hoàn toàn yên tâm nhé! Hơn **92% học viên người lớn** tại Số Không ban đầu đều chưa từng cầm cọ và nghĩ mình không có hoa tay ạ. 🌿\n\nTại xưởng, thầy cô sẽ hướng dẫn chia nhỏ từng bước từ dựng hình đến pha màu rất logic. Không gian xưởng mở có trà hoa, nhạc nhẹ thư giãn sau giờ làm việc.\n\nAnh/chị có thể lựa chọn: **Acrylic trên toan**, **Màu nước**, **Sơn dầu** hoặc **Ký họa phố cổ**. Lịch học ca tối (18h30–21h00) hoặc cuối tuần rất linh hoạt.\n\nAnh/chị có muốn ghé xưởng vẽ thử một bức tranh mang về trong **buổi trải nghiệm 0đ** tuần này không ạ? Nhắn em **Số điện thoại/Zalo** để em giữ chỗ nhé!`,
      showLeadCard: true
    };
  }

  // 4. Hỏi về Cơ sở / Địa chỉ / Hải Phòng / Hà Nội
  if (text.includes('địa chỉ') || text.includes('cơ sở') || text.includes('ở đâu') || text.includes('hải phòng') || text.includes('hà nội') || text.includes('chỗ nào')) {
    return {
      text: `Dạ hiện tại Xưởng Vẽ Số Không có **05 cơ sở hiện đại** tại Hà Nội và Hải Phòng ạ:\n\n📍 **Hà Nội (03 cơ sở):**\n1. Ba Đình: Số 18, Ngõ 92 Kim Mã\n2. Cầu Giấy: Tầng 3, 126 Hoàng Quốc Việt\n3. Tây Hồ: Số 45 Tô Ngọc Vân, Quảng An\n\n📍 **Hải Phòng (02 cơ sở):**\n4. Lê Chân: Số 82 Mê Linh, An Biên\n5. Ngô Quyền: Số 15 Lạch Tray\n\nMình đang ở gần khu vực nào nhất ạ? Anh/chị để lại **Số điện thoại/Zalo**, em gửi vị trí Google Maps và xếp lịch ghé xưởng gần nhà mình nhất nha!`,
      showLeadCard: true
    };
  }

  // 5. Hỏi về Học phí / Giá / Chi phí / Miễn phí
  if (text.includes('học phí') || text.includes('giá') || text.includes('bao nhiêu') || text.includes('tiền') || text.includes('chi phí') || text.includes('miễn phí')) {
    return {
      text: `Dạ buổi học thử đầu tiên là **100% MIỄN PHÍ (0đ)** ạ! Xưởng tài trợ sẵn toàn bộ toan vẽ, màu vẽ và họa cụ cao cấp, vẽ xong mình được mang tranh về nhà luôn ạ. 🎁\n\nHọc phí các khóa chính thức dao động rất hợp lý theo từng lộ trình (đã bao gồm toàn bộ họa cụ, không phát sinh thêm). Đặc biệt xưởng hỗ trợ **học bù và bảo lưu tự do** khi bận việc.\n\nAnh/chị cho em xin **Tên + Số điện thoại/Zalo** để em gửi chi tiết bảng học phí và ưu đãi giảm 20% tháng này qua Zalo cho mình nhé!`,
      showLeadCard: true
    };
  }

  // 6. Hỏi về Lịch học / Thời gian / Buổi tối / Cuối tuần
  if (text.includes('lịch') || text.includes('thời gian') || text.includes('giờ') || text.includes('cuối tuần') || text.includes('tối')) {
    return {
      text: `Dạ thời khóa biểu tại xưởng cực kỳ linh hoạt ạ:\n\n• **Lớp Người Lớn:** Ca tối các ngày trong tuần (18h30 – 21h00) và các ca Sáng / Chiều / Tối Thứ 7 & Chủ Nhật.\n• **Lớp Trẻ Em:** Sáng & Chiều Thứ 7, Chủ Nhật; hoặc ca chiều tan trường trong tuần (17h00 – 18h30).\n\nNếu có hôm bận việc hoặc con ốm, anh/chị chỉ cần báo trước là được **xếp học bù vào ca khác** không bị mất buổi ạ. Mình đang quan tâm ca học nào ạ? Nhắn em số Zalo để em gửi lịch trống tuần này nha!`,
      showLeadCard: true
    };
  }

  // 7. Hỏi về Đăng ký học thử / Trải nghiệm
  if (text.includes('đăng ký') || text.includes('học thử') || text.includes('trải nghiệm') || text.includes('giữ chỗ')) {
    return {
      text: `Dạ tuyệt vời quá ạ! Buổi học thử 90 phút tại Số Không hoàn toàn **miễn phí (0đ)**, mình không cần chuẩn bị bất cứ dụng cụ gì vì xưởng đã lo trọn gói từ A-Z rồi ạ. 🎨\n\nTuần này mỗi cơ sở chỉ còn **4 suất học thử 0đ**. Anh/chị điền thông tin nhanh dưới đây hoặc nhắn em **Số điện thoại** để em giữ chỗ ngay cho mình nhé!`,
      showLeadCard: true
    };
  }

  // 8. Chào hỏi thông thường
  if (text.includes('chào') || text.includes('hello') || text.includes('hi') || text.includes('alo') || text.includes('ơi')) {
    return {
      text: `Dạ em chào anh/chị! Em là trợ lý tư vấn tại **Xưởng Vẽ Số Không** ạ. 🎨\n\nKhông biết anh/chị đang muốn tìm hiểu lớp vẽ sáng tạo cho **bé yêu** hay lớp mỹ thuật thư giãn cho **người lớn** ạ? Em có thể giúp gì cho mình hôm nay ạ?`,
      showLeadCard: false
    };
  }

  // 9. Phản hồi mặc định thông minh & dẫn dắt về giá trị
  return {
    text: `Dạ em hiểu thắc mắc của mình rồi ạ! Tại Xưởng Vẽ Số Không, mọi học viên đều bắt đầu từ **con số 0**, được giáo viên ĐH Mỹ thuật kèm 1:1 theo giáo trình may đo riêng.\n\nHiện xưởng đang có chương trình **Tài trợ 100% học phí buổi trải nghiệm 0đ** tại cả 5 cơ sở Hà Nội & Hải Phòng. Anh/chị có muốn đăng ký thử 1 buổi không ạ?\n\nAnh/chị để lại **Số điện thoại / Zalo** hoặc nhấn các nút gợi ý bên dưới để em hỗ trợ nhanh nhất nhé!`,
    showLeadCard: true
  };
}
