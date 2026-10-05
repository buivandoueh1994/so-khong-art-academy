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
import { sendLeadToGoogleSheet, formatBranchName } from './googleSheetService.js';

/**
 * Trợ giúp tên ngắn gọn của cơ sở cho thông báo
 */
export function getShortBranchName(branchId) {
  const shortMap = {
    'hn-badinh': 'Ba Đình (Hà Nội)',
    'hn-caugiay': 'Cầu Giấy (Hà Nội)',
    'hn-tayho': 'Tây Hồ (Hà Nội)',
    'hp-lechan': 'Lê Chân (Hải Phòng)',
    'hp-ngoquyen': 'Ngô Quyền (Hải Phòng)'
  };
  return shortMap[branchId] || branchId || 'gần bạn nhất';
}

/**
 * Nhận diện cơ sở từ văn bản tin nhắn
 */
export function detectBranch(text) {
  if (!text) return null;
  const t = text.toLowerCase();
  if (t.includes('ba đình') || t.includes('kim mã') || t.includes('cs1') || t.includes('cơ sở 1')) return 'hn-badinh';
  if (t.includes('cầu giấy') || t.includes('hoàng quốc việt') || t.includes('cs2') || t.includes('cơ sở 2')) return 'hn-caugiay';
  if (t.includes('tây hồ') || t.includes('tô ngọc vân') || t.includes('quảng an') || t.includes('cs3') || t.includes('cơ sở 3')) return 'hn-tayho';
  if (t.includes('lê chân') || t.includes('mê linh') || t.includes('an biên') || t.includes('cs4') || t.includes('cơ sở 4')) return 'hp-lechan';
  if (t.includes('ngô quyền') || t.includes('lạch tray') || t.includes('cs5') || t.includes('cơ sở 5')) return 'hp-ngoquyen';
  if (t.includes('hải phòng')) return 'hp-lechan';
  if (t.includes('hà nội')) return 'hn-badinh';
  return null;
}

// Bộ nhớ lưu Lead đang chờ bổ sung thông tin cơ sở
let memoryPendingLead = null;

export function getPendingLead() {
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      const data = sessionStorage.getItem('so_khong_pending_lead');
      if (data) return JSON.parse(data);
    } catch (_) {}
  }
  return memoryPendingLead;
}

export function setPendingLead(lead) {
  memoryPendingLead = lead;
  if (typeof window !== 'undefined' && window.sessionStorage) {
    try {
      if (lead) {
        sessionStorage.setItem('so_khong_pending_lead', JSON.stringify(lead));
      } else {
        sessionStorage.removeItem('so_khong_pending_lead');
      }
    } catch (_) {}
  }
}

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
  let branch = detectBranch(allText);

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

  return { detectedName, need, branch };
}

// Lưu trữ lead vào localStorage và gửi đồng thời về Telegram + Google Sheet
export function saveLead(leadData) {
  try {
    const newLead = {
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...leadData,
      source: leadData.source || 'Chatbot Tư Vấn'
    };

    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const existing = JSON.parse(localStorage.getItem('so_khong_leads') || '[]');
        existing.unshift(newLead);
        localStorage.setItem('so_khong_leads', JSON.stringify(existing));
      } catch (_) {}
    }
    
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
  const pendingLead = getPendingLead();
  const detectedBranch = detectBranch(userMessage);

  // 1. TRƯỜNG HỢP A: Đã có SĐT chờ từ trước, và khách vừa chọn/nhắn cơ sở muốn học
  if (pendingLead && detectedBranch) {
    const finalBranch = detectedBranch;
    const finalLead = {
      name: pendingLead.name || '',
      phone: pendingLead.phone,
      branch: finalBranch,
      need: pendingLead.need || 'Quan tâm đăng ký học thử 0đ',
      note: pendingLead.rawNote ? `${pendingLead.rawNote} | Khách chọn cơ sở: ${userMessage}` : `Khách chọn cơ sở: ${userMessage}`,
      source: 'Chatbot Tư Vấn AI'
    };

    saveLead(finalLead);
    setPendingLead(null); // Đã chốt lead thành công

    return {
      text: `Dạ em cảm ơn ${finalLead.name ? 'anh/chị **' + finalLead.name + '**' : 'mình'} rất nhiều ạ! 🎉\n\nEm đã lưu thông tin đăng ký giữ **01 suất học thử miễn phí (0đ)** của mình tại **${formatBranchName(finalBranch)}**.\n\n📞 **Tư vấn viên tại cơ sở ${getShortBranchName(finalBranch)} sẽ liên hệ lại với ${finalLead.name ? finalLead.name : 'mình'} sớm nhất** (trong vòng 15 phút) qua số điện thoại/Zalo **${finalLead.phone}** để gửi thời khóa biểu và chuẩn bị họa cụ đón tiếp mình chu đáo nhất nhé ạ! 🎨`,
      showLeadCard: false,
      leadCaptured: true
    };
  }

  // 2. TRƯỜNG HỢP B: Khách vừa gửi số điện thoại trong tin nhắn
  if (phone) {
    const intent = analyzeCustomerIntent(conversationHistory, userMessage);
    const branch = intent.branch || detectedBranch;

    // B1: Khách ĐÃ CÓ CẢ CƠ SỞ (Đủ điều kiện chốt lead theo quy định)
    if (branch) {
      saveLead({
        name: intent.detectedName,
        phone,
        branch,
        need: intent.need,
        rawNote: userMessage,
        source: 'Chatbot Tư Vấn AI'
      });
      setPendingLead(null);

      return {
        text: `Dạ em cảm ơn ${intent.detectedName ? 'anh/chị **' + intent.detectedName + '**' : 'mình'} rất nhiều ạ! 🎉\n\nEm đã chuyển thông tin đăng ký giữ **01 suất học thử miễn phí (0đ)** lớp **${intent.need}** của mình tới **${formatBranchName(branch)}**.\n\n📞 **Tư vấn viên tại cơ sở ${getShortBranchName(branch)} sẽ liên hệ lại với ${intent.detectedName ? intent.detectedName : 'mình'} sớm nhất** (trong vòng 15 phút) qua số điện thoại/Zalo **${phone}** để xác nhận lịch học và hoàn tất xếp lớp nhé ạ! 🎨`,
        showLeadCard: false,
        leadCaptured: true
      };
    }

    // B2: Khách CHƯA NÓI CƠ SỞ -> CHỦ ĐỘNG HỎI CƠ SỞ TRƯỚC KHI CHỐT THÔNG TIN (Theo Quy tắc 2)
    setPendingLead({
      phone,
      name: intent.detectedName,
      need: intent.need,
      rawNote: userMessage
    });

    return {
      text: `Dạ em đã nhận được số điện thoại **${phone}** của mình rồi ạ! 🎉\n\nĐể xếp lớp và giữ suất **học thử miễn phí (0đ)** thuận tiện nhất cho mình, **anh/chị muốn học tại cơ sở nào** của xưởng ạ?\n\n📍 **Khu vực Hà Nội (03 cơ sở):**\n• **CS1 Ba Đình:** Số 18, Ngõ 92 Kim Mã\n• **CS2 Cầu Giấy:** Tầng 3, 126 Hoàng Quốc Việt\n• **CS3 Tây Hồ:** Số 45 Tô Ngọc Vân, Quảng An\n\n📍 **Khu vực Hải Phòng (02 cơ sở):**\n• **CS4 Lê Chân:** Số 82 Mê Linh, An Biên\n• **CS5 Ngô Quyền:** Số 15 Lạch Tray\n\n*(Anh/chị có thể bấm chọn nhanh các nút cơ sở bên dưới hoặc nhắn tên khu vực tiện đi lại nhất nhé!)*`,
      showLeadCard: false,
      leadCaptured: false,
      branchOptions: [
        { id: 'hn-badinh', name: 'CS1: Ba Đình (Hà Nội)' },
        { id: 'hn-caugiay', name: 'CS2: Cầu Giấy (Hà Nội)' },
        { id: 'hn-tayho', name: 'CS3: Tây Hồ (Hà Nội)' },
        { id: 'hp-lechan', name: 'CS4: Lê Chân (Hải Phòng)' },
        { id: 'hp-ngoquyen', name: 'CS5: Ngô Quyền (Hải Phòng)' }
      ]
    };
  }

  // 3. Khách hỏi Tư vấn lớp chung chung ("tư vấn lớp cho tôi", "tư vấn giúp", "có những lớp nào", "tôi muốn học vẽ",...)
  const isGeneralConsultRequest =
    text.includes('tư vấn lớp') ||
    text.includes('tư vấn giúp') ||
    text.includes('tư vấn cho') ||
    text.includes('tư vấn khoá') ||
    text.includes('tư vấn khóa') ||
    text.includes('có những lớp nào') ||
    text.includes('có những khoá nào') ||
    text.includes('có những khóa nào') ||
    text.includes('có các lớp nào') ||
    text.includes('các lớp vẽ') ||
    text.includes('các khóa học') ||
    text.includes('các khoá học') ||
    text.includes('học những gì') ||
    text.includes('dạy những gì') ||
    text.includes('tôi muốn học vẽ') ||
    text.includes('mình muốn học vẽ') ||
    text.includes('em muốn học vẽ') ||
    text.includes('tìm hiểu lớp') ||
    text.includes('tìm hiểu khóa') ||
    text.includes('tìm hiểu khoá') ||
    text.includes('chọn lớp') ||
    text.includes('lớp nào phù hợp') ||
    text.includes('khóa học nào') ||
    text.includes('khoá học nào') ||
    (text.includes('tư vấn') && !text.includes('học phí') && !text.includes('địa chỉ'));

  if (isGeneralConsultRequest) {
    return {
      text: `Dạ em chào anh/chị! Em là **Cô Mai – Quản nhiệm lớp tại Xưởng Vẽ Số Không** ạ. 🎨\n\nHiện tại xưởng đang đào tạo **2 hệ thống lớp chuyên sâu** may đo theo từng đối tượng:\n\n🧒 **1. LỚP VẼ TRẺ EM (4 – 15 tuổi):**\n• **4–6 tuổi (Mầm Sáng Tạo):** Làm quen màu nước hữu cơ an toàn, rèn vận động tinh của đôi tay, tự do tưởng tượng (75 phút/buổi).\n• **7–10 tuổi (Năng Khiếu Nhí):** Dựng hình cơ bản, bánh xe màu sắc, kể câu chuyện của mình qua bức tranh hoàn chỉnh (90 phút/buổi).\n• **11–15 tuổi (Hội Họa Thiếu Niên):** Bố cục phối cảnh Perspective, sáng tối Chiaroscuro, Acrylic toan vẽ & Manga (120 phút/buổi).\n*(Đặc biệt: 100% không gò bó khuôn mẫu, không vẽ hộ con).* \n\n🌿 **2. MỸ THUẬT NGƯỜI LỚN (16+ tuổi):**\n• Dành cho người đi làm & sinh viên muốn giải tỏa căng thẳng sau giờ làm việc.\n• **Kèm cặp 1:1 từ con số 0** – hơn 92% học viên chưa từng cầm cọ vẫn vẽ được tranh đẹp ngay buổi đầu.\n• Đa dạng chất liệu: **Acrylic trên toan**, **Màu nước trong trẻo**, **Sơn dầu cổ điển** hoặc **Ký họa phố cổ**.\n\n👉 Không biết **mình đang quan tâm tìm lớp cho bé yêu hay cho bản thân/người lớn** ạ? Anh/chị bấm chọn nhanh bên dưới hoặc nhắn độ tuổi để em hỗ trợ nhé!`,
      showLeadCard: false,
      quickReplies: ['🎨 Lớp Vẽ Cho Bé (4–15t)', '🖌️ Mỹ Thuật Người Lớn', '⚡ Suất học thử 0đ', '📍 5 Cơ sở HN & HP']
    };
  }

  // 4. Khách hỏi cụ thể về Lớp Trẻ Em / Con / Bé / Độ tuổi
  if (text.includes('bé') || text.includes('trẻ em') || text.includes('con') || text.includes('cháu') || text.includes('nhỏ') || text.includes('thiếu nhi') || (text.includes('tuổi') && !text.includes('người lớn'))) {
    if (text.includes('4') || text.includes('5') || text.includes('6')) {
      return {
        text: `Dạ với các bé từ **4–6 tuổi**, xưởng có lớp **Mầm Sáng Tạo** (75 phút/buổi) ạ! 🐣\n\nỞ độ tuổi này, các cô tập trung rèn luyện **vận động tinh** của đôi tay, cho con làm quen với màu nước hữu cơ an toàn và kích thích trí tưởng tượng qua trò chơi màu sắc. Tuyệt đối không gò bó khuôn mẫu hay cầm tay vẽ hộ con đâu ạ.\n\n🎁 Tuần này xưởng đang có **suất học thử miễn phí (0đ)** (bao trọn màu vẽ, giấy vẽ cao cấp). Anh/chị cho em xin **Số điện thoại hoặc Zalo** để em giữ chỗ và gửi định vị phòng học cho gia đình nhé!`,
        showLeadCard: true,
        quickReplies: ['⚡ Giữ suất học thử 0đ cho bé', '📍 Xem 5 cơ sở HN & HP', '⏰ Lịch học cuối tuần']
      };
    }
    if (text.includes('7') || text.includes('8') || text.includes('9') || text.includes('10')) {
      return {
        text: `Dạ bé trong độ tuổi **7–10 tuổi** sẽ học lớp **Năng Khiếu Nhí** (90 phút/buổi) ạ! 🎨\n\nCác bé sẽ được thầy cô ĐH Mỹ thuật hướng dẫn dựng hình cơ bản, quy luật phối màu tương phản và tự tay kể câu chuyện của mình qua bức tranh hoàn chỉnh. Sau mỗi buổi vẽ, xưởng đều chụp ảnh sản phẩm và gửi nhận xét chi tiết của thầy cô cho phụ huynh.\n\n🎁 Anh/chị có muốn đăng ký cho bé trải nghiệm **01 buổi học thử miễn phí (0đ)** cuối tuần này không ạ? Anh/chị để lại **Số điện thoại/Zalo** em giữ chỗ cho bé nhé!`,
        showLeadCard: true,
        quickReplies: ['⚡ Giữ suất học thử 0đ cho bé', '📍 Xem 5 cơ sở HN & HP', '⏰ Lịch học cuối tuần']
      };
    }
    if (text.includes('11') || text.includes('12') || text.includes('13') || text.includes('14') || text.includes('15')) {
      return {
        text: `Dạ các bạn từ **11–15 tuổi** sẽ tham gia lớp **Hội Họa Thiếu Niên** (120 phút/buổi) ạ! 🏛️\n\nChương trình chuyên sâu về luật phối cảnh không gian, sáng tối, vẽ chất liệu Acrylic trên toan vải canvas và sáng tác phong cách truyện tranh Manga/Anime. Rất tốt cho các bạn định hướng thi năng khiếu hoặc phát triển thẩm mỹ cá nhân.\n\n🎁 Xưởng đang tài trợ **01 buổi vẽ thử 0đ trên toan canvas thật**. Anh/chị để lại **Số điện thoại/Zalo** em gửi thời khóa biểu lớp thiếu niên tuần này nhé!`,
        showLeadCard: true,
        quickReplies: ['⚡ Giữ suất học thử 0đ', '⏰ Lịch học ca tối/cuối tuần']
      };
    }
    return {
      text: `Dạ chào anh/chị! Lớp vẽ trẻ em tại Số Không nhận các bé từ **4 đến 15 tuổi** với 3 cấp độ may đo riêng:\n\n• **4–6 tuổi (Mầm Sáng Tạo):** Vận động tinh, màu nước hữu cơ an toàn.\n• **7–10 tuổi (Năng Khiếu Nhí):** Dựng hình, bánh xe màu sắc, kể chuyện qua tranh.\n• **11–15 tuổi (Hội Họa Thiếu Niên):** Bố cục không gian, Acrylic toan vẽ & Manga.\n\nBé nhà mình năm nay mấy tuổi rồi ạ? Anh/chị nhắn độ tuổi của bé hoặc để lại **Số điện thoại/Zalo** để cô giáo tư vấn lớp phù hợp nhất cho con nhé!`,
      showLeadCard: true,
      quickReplies: ['Bé 4–6 tuổi', 'Bé 7–10 tuổi', 'Bé 11–15 tuổi', '⚡ Đăng ký học thử 0đ']
    };
  }

  // 5. Khách hỏi về Lớp Người Lớn / Chưa biết vẽ / Đi làm / Hoa tay / Năng khiếu
  if (
    text.includes('người lớn') ||
    text.includes('đi làm') ||
    text.includes('sinh viên') ||
    text.includes('chưa biết vẽ') ||
    text.includes('không biết vẽ') ||
    text.includes('chưa cầm cọ') ||
    text.includes('hoa tay') ||
    text.includes('năng khiếu') ||
    text.includes('bắt đầu từ đầu') ||
    text.includes('mới bắt đầu') ||
    text.includes('cho người lớn')
  ) {
    return {
      text: `Dạ anh/chị hoàn toàn yên tâm nhé! Hơn **92% học viên người lớn** tại Số Không ban đầu đều chưa từng cầm cọ và nghĩ mình không có hoa tay ạ. 🌿\n\nTại xưởng, thầy cô sẽ hướng dẫn chia nhỏ từng bước từ dựng hình đến pha phối màu rất trực quan logic. Không gian xưởng mở có trà hoa, nhạc nhẹ thư giãn sau giờ làm việc.\n\nAnh/chị có thể lựa chọn 4 chất liệu tùy thích:\n• **Acrylic trên toan:** Dễ vẽ nhất, nhanh khô, màu sắc rực rỡ, mang tranh về treo ngay.\n• **Màu Nước (Watercolor):** Trong trẻo, thi vị, tĩnh lặng chữa lành tâm hồn.\n• **Sơn Dầu cổ điển:** Đẳng cấp, chiều sâu hòa sắc sang trọng.\n• **Ký Họa bút sắt & chì:** Thích hợp vẽ góc phố Hà Nội/Hải Phòng, du lịch đời sống.\n\nLịch học ca tối (18h30–21h00) hoặc cuối tuần rất linh hoạt. Tuần này xưởng đang có **suất học thử miễn phí (0đ)** tài trợ trọn gói toan vẽ & màu vẽ. Mình có muốn ghé xưởng vẽ thử 1 bức mang về không ạ? Nhắn em **Số điện thoại/Zalo** để em giữ chỗ nhé!`,
      showLeadCard: true,
      quickReplies: ['Khóa vẽ Acrylic toan', 'Khóa Màu Nước thư giãn', 'Khóa Sơn Dầu cổ điển', '⚡ Đăng ký học thử 0đ']
    };
  }

  // 6. Hỏi chi tiết về chất liệu vẽ cụ thể
  if (text.includes('màu nước') || text.includes('watercolor')) {
    return {
      text: `Dạ khóa **Màu Nước (Watercolor)** tại Số Không rất được các bạn yêu thích nhờ tính chất trong trẻo, tĩnh lặng và chữa lành tâm hồn ạ! 💧\n\nBạn sẽ được hướng dẫn làm chủ các kỹ thuật: loang ướt trên ướt (wet-on-wet), chồng lớp tạo chiều sâu trên giấy vẽ Arches/Baohong 300gsm cao cấp. Tranh vẽ xong có thể đóng khung bàn làm việc hoặc làm thiệp tặng bạn bè.\n\nTuần này xưởng đang có **suất trải nghiệm màu nước 0đ**. Bạn để lại **Số điện thoại/Zalo** mình giữ chỗ cho bạn nhé!`,
      showLeadCard: true,
      quickReplies: ['⚡ Đăng ký học thử Màu Nước 0đ', '⏰ Lịch học ca tối', '💰 Học phí khóa màu nước']
    };
  }

  if (text.includes('acrylic')) {
    return {
      text: `Dạ **Acrylic trên toan canvas** là chất liệu lý tưởng nhất cho người mới bắt đầu ạ! 🖼️\n\nƯu điểm của Acrylic là độ che phủ cực tốt (vẽ sai tô đè lên sửa được ngay), nhanh khô và màu sắc rất rực rỡ hiện đại. Sau buổi vẽ 90–120 phút, bạn sẽ tự tay hoàn thiện ngay 1 bức tranh kích thước 30x40cm hoặc 40x50cm mang về treo phòng khách hay phòng ngủ luôn ạ!\n\nNhắn em **Số điện thoại/Zalo** để nhận suất học thử Acrylic 0đ tuần này nhé!`,
      showLeadCard: true,
      quickReplies: ['⚡ Đăng ký học thử Acrylic 0đ', '📍 Xem 5 cơ sở HN & HP']
    };
  }

  if (text.includes('sơn dầu') || text.includes('oil')) {
    return {
      text: `Dạ khóa **Sơn Dầu (Oil Painting)** là đỉnh cao của hội họa cổ điển với chiều sâu màu sắc và độ bền hàng trăm năm ạ! 🎨\n\nTại Số Không, bạn được hướng dẫn kỹ thuật hòa sắc, đắp nổi bay vẽ palette knife và các lớp láng màu truyền thống. Xưởng sử dụng dung môi dầu lanh cao cấp không mùi độc hại, an toàn tuyệt đối.\n\nNhắn em **Số điện thoại/Zalo** để được xếp lịch trải nghiệm sơn dầu nhé!`,
      showLeadCard: true,
      quickReplies: ['⚡ Đăng ký học thử Sơn Dầu 0đ', '💰 Học phí khóa sơn dầu']
    };
  }

  if (text.includes('ký họa') || text.includes('sketch') || text.includes('bút sắt') || text.includes('chì')) {
    return {
      text: `Dạ khóa **Ký Họa Phố Cổ & Đời Sống** giúp bạn rèn luyện khả năng quan sát và bắt trọn khoảnh khắc chỉ bằng chiếc bút kim, bút sắt hoặc bút chì ạ! ✒️\n\nBạn sẽ học cách bắt dáng nhân vật nhanh, luật viễn cận phối cảnh góc phố cổ Hà Nội / Hải Phòng và điểm màu nước sinh động vào cuốn sổ ký họa du lịch.\n\nNhắn em **Số điện thoại/Zalo** để nhận thời khóa biểu lớp ký họa tuần này nhé!`,
      showLeadCard: true,
      quickReplies: ['⚡ Đăng ký học thử Ký Họa 0đ', '⏰ Lịch học cuối tuần']
    };
  }

  // 7. Hỏi về Địa chỉ / Cơ sở / Hải Phòng / Hà Nội
  if (text.includes('địa chỉ') || text.includes('cơ sở') || text.includes('ở đâu') || text.includes('hải phòng') || text.includes('hà nội') || text.includes('chỗ nào') || text.includes('chi nhánh') || text.includes('địa điểm')) {
    return {
      text: `Dạ hiện tại Xưởng Vẽ Số Không có **05 cơ sở hiện đại** tại Hà Nội và Hải Phòng ạ: 🎨\n\n📍 **Hà Nội (03 cơ sở):**\n1. **CS1 Ba Đình:** Số 18, Ngõ 92 Kim Mã, Ba Đình\n2. **CS2 Cầu Giấy:** Tầng 3, 126 Hoàng Quốc Việt, Cầu Giấy\n3. **CS3 Tây Hồ:** Số 45 Tô Ngọc Vân, Quảng An, Tây Hồ\n\n📍 **Hải Phòng (02 cơ sở):**\n4. **CS4 Lê Chân:** Số 82 Mê Linh, An Biên, Lê Chân\n5. **CS5 Ngô Quyền:** Số 15 Lạch Tray, Ngô Quyền\n\nTất cả cơ sở đều có điều hòa, phòng học thoáng sáng, giá vẽ gỗ sồi và trà hoa thư giãn. Mình đang ở gần khu vực nào nhất ạ? Anh/chị để lại **Số điện thoại/Zalo**, em gửi vị trí Google Maps và xếp lịch ghé xưởng gần nhà mình nhất nha!`,
      showLeadCard: true,
      quickReplies: ['CS1: Ba Đình (HN)', 'CS2: Cầu Giấy (HN)', 'CS3: Tây Hồ (HN)', 'CS4: Lê Chân (HP)', 'CS5: Ngô Quyền (HP)']
    };
  }

  // 8. Hỏi về Học phí / Giá / Chi phí / Tiền học
  if (text.includes('học phí') || text.includes('giá') || text.includes('bao nhiêu tiền') || text.includes('tiền') || text.includes('chi phí') || text.includes('bảng giá') || text.includes('phí')) {
    return {
      text: `Dạ tại Xưởng Vẽ Số Không:\n🎁 **Buổi học thử đầu tiên (90–120 phút) là 100% MIỄN PHÍ (0đ)** (trị giá 350.000đ) ạ! Xưởng tài trợ sẵn toàn bộ toan vẽ, màu vẽ và họa cụ cao cấp, vẽ xong mình được mang tranh về nhà luôn ạ.\n\n📚 **Học phí các khóa chính thức:**\n• Rất hợp lý và **đã bao gồm trọn gói 100% họa cụ cao cấp** (không phát sinh bất kỳ phụ phí nào).\n• Được **học bù tự do, bảo lưu không giới hạn** số buổi khi bận việc hoặc ốm.\n• Tháng này xưởng đang có ưu đãi **giảm 20% học phí** khi đăng ký theo khóa.\n\nAnh/chị cho em xin **Tên + Số điện thoại/Zalo** để em gửi chi tiết bảng học phí và ưu đãi giảm 20% qua Zalo cho mình nhé!`,
      showLeadCard: true,
      quickReplies: ['⚡ Giữ suất học thử 0đ', '📍 Xem 5 cơ sở HN & HP', '⏰ Lịch học trong tuần']
    };
  }

  // 9. Hỏi về Lịch học / Thời gian / Buổi tối / Cuối tuần / Học bù
  if (text.includes('lịch') || text.includes('thời gian') || text.includes('giờ') || text.includes('cuối tuần') || text.includes('tối') || text.includes('thứ 7') || text.includes('chủ nhật') || text.includes('ca học') || text.includes('học bù')) {
    return {
      text: `Dạ thời khóa biểu tại xưởng cực kỳ linh hoạt cho người bận rộn và học sinh ạ:\n\n• **Lớp Người Lớn:** Ca tối các ngày trong tuần (18h30 – 21h00) và các ca Sáng / Chiều / Tối Thứ 7 & Chủ Nhật.\n• **Lớp Trẻ Em:** Sáng & Chiều Thứ 7, Chủ Nhật; hoặc ca chiều tan trường trong tuần (17h00 – 18h30).\n\n✨ **Đặc quyền học bù:** Nếu có hôm bận việc hoặc con ốm, anh/chị chỉ cần báo trước là được **xếp học bù vào ca khác** không bị mất buổi ạ.\n\nMình đang quan tâm ca học nào ạ? Nhắn em số Zalo để em gửi lịch trống tuần này nha!`,
      showLeadCard: true,
      quickReplies: ['⚡ Đăng ký học thử ca tối', '⚡ Đăng ký học thử cuối tuần', '📍 Địa chỉ 5 cơ sở']
    };
  }

  // 10. Hỏi về Giáo viên / Giảng viên
  if (text.includes('giáo viên') || text.includes('thầy cô') || text.includes('ai dạy') || text.includes('giảng viên')) {
    return {
      text: `Dạ tại Xưởng Vẽ Số Không, **100% giáo viên đều tốt nghiệp chính quy ĐH Mỹ thuật Việt Nam hoặc ĐH Mỹ thuật Công nghiệp** và có chứng chỉ nghiệp vụ sư phạm ạ. 👩‍🏫\n\nCác thầy cô trẻ trung, nhiệt huyết, phương pháp sư phạm kiên nhẫn và kèm cặp 1:1 theo năng lực từng học viên.\nĐặc biệt, xưởng tuân thủ nguyên tắc: **Tuyệt đối không cầm tay vẽ hộ hay áp đặt khuôn mẫu**, chỉ hướng dẫn tư duy dựng hình và kỹ thuật hòa sắc để học viên tự tay tạo nên bức tranh mang đậm cá tính của chính mình!\n\nAnh/chị để lại số Zalo để nhận hồ sơ năng lực và các tác phẩm của thầy cô nhé!`,
      showLeadCard: true,
      quickReplies: ['⚡ Đăng ký học thử 0đ', '🎨 Xem tranh học viên']
    };
  }

  // 11. Hỏi về Mang tranh về / Tranh vẽ xong
  if (text.includes('mang về') || text.includes('lấy tranh') || text.includes('giữ tranh') || text.includes('tranh vẽ xong')) {
    return {
      text: `Dạ 100% tranh vẽ tại xưởng là **thuộc về bạn và được mang về nhà ngay sau buổi học** ạ! 🖼️\n\nXưởng có sẵn máy sấy nhiệt để tranh khô ráo, bao bọc cẩn thận và hướng dẫn bạn cách bảo quản, treo tranh phong thủy đẹp nhất tại nhà hoặc phòng làm việc.\n\nNhắn em **Số điện thoại/Zalo** để đăng ký buổi trải nghiệm 0đ mang tranh đầu tay về treo nhé!`,
      showLeadCard: true,
      quickReplies: ['⚡ Đăng ký học thử 0đ mang tranh về', '📍 Xem 5 cơ sở']
    };
  }

  // 12. Hỏi về Đăng ký học thử / Trải nghiệm
  if (text.includes('đăng ký') || text.includes('học thử') || text.includes('trải nghiệm') || text.includes('giữ chỗ')) {
    return {
      text: `Dạ tuyệt vời quá ạ! Buổi học thử 90 phút tại Số Không hoàn toàn **MIỄN PHÍ (0đ)**, mình không cần chuẩn bị bất cứ dụng cụ gì vì xưởng đã lo trọn gói từ A-Z rồi ạ. 🎨\n\nTuần này mỗi cơ sở chỉ còn **4 suất học thử 0đ**. Anh/chị điền thông tin nhanh dưới đây hoặc nhắn em **Số điện thoại** để em giữ chỗ ngay cho mình nhé!`,
      showLeadCard: true,
      quickReplies: ['⚡ Điền form giữ chỗ 0đ', '📍 Xem 5 cơ sở HN & HP']
    };
  }

  // 13. Chào hỏi thông thường
  if (text.includes('chào') || text.includes('hello') || text.includes('hi') || text.includes('alo') || text.includes('ơi') || text.includes('ad ơi') || text.includes('cô mai')) {
    return {
      text: `Dạ em chào anh/chị! Em là **Cô Mai – Quản nhiệm lớp tại Xưởng Vẽ Số Không** ạ. 🎨\n\nKhông biết anh/chị đang muốn tìm hiểu lớp vẽ sáng tạo cho **bé yêu (4–15 tuổi)** hay lớp mỹ thuật thư giãn cho **người lớn** để em hỗ trợ tư vấn lộ trình phù hợp nhất ạ?`,
      showLeadCard: false,
      quickReplies: ['🎨 Lớp Vẽ Cho Bé (4–15t)', '🖌️ Mỹ Thuật Người Lớn', '⚡ Suất học thử 0đ', '📍 5 Cơ sở HN & HP']
    };
  }

  // 14. Phản hồi mặc định thông minh & dẫn dắt về giá trị
  return {
    text: `Dạ em là **Cô Mai tại Xưởng Vẽ Số Không** ạ! 🎨\n\nEm luôn sẵn sàng hỗ trợ mình về:\n• 🎨 **Tư vấn chọn lớp:** Lớp bé (4–15 tuổi) hoặc Mỹ thuật người lớn (từ số 0)\n• ⚡ **Đăng ký học thử 0đ:** Trải nghiệm 90 phút miễn phí & mang tranh về\n• 📍 **Địa chỉ 5 cơ sở:** Tại Hà Nội & Hải Phòng\n• 💰 **Học phí & Thời khóa biểu linh hoạt**\n\nAnh/chị đang quan tâm thông tin nào nhất ạ? Nhắn em hoặc bấm các nút gợi ý bên dưới để em hỗ trợ nhanh nhất nhé!`,
    showLeadCard: true,
    quickReplies: ['🎨 Tư vấn chọn lớp', '⚡ Đăng ký học thử 0đ', '💰 Bảng học phí', '📍 Xem 5 cơ sở']
  };
}
