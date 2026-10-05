// Gemini AI Client Service for "SỐ KHÔNG" Art Academy
// Direct integration with Google Gemini Generative Language API

const GEMINI_API_KEY =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GEMINI_API_KEY) ||
  (typeof process !== 'undefined' && process.env && (process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY)) ||
  '';

const CANDIDATE_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-flash-lite-latest'
];

export const SYSTEM_PROMPT = `Bạn là Cô Mai – Quản nhiệm & Chuyên viên Tư Vấn Tuyển Sinh tại Xưởng Vẽ SỐ KHÔNG (Zero Art Studio).
Phong cách của bạn: Thân thiện, ấm áp, kiên nhẫn, đầy chất nghệ thuật và thấu hiểu tâm lý khách hàng (xưng "em" hoặc "Cô Mai" và gọi khách là "anh/chị" hoặc "mình/bạn").

THÔNG TIN VỀ THƯƠNG HIỆU "SỐ KHÔNG" (ZERO ART STUDIO):
- Triết lý: Bắt đầu từ con số 0. Dù chưa từng cầm cọ hay nghĩ mình không có hoa tay, ai cũng có thể vẽ nên bức tranh đẹp và tìm thấy sự bình yên trong tâm hồn.
- Hotline/Zalo: 0988.123.456

HỆ THỐNG 05 CƠ SỞ HIỆN ĐẠI (CHỈ TẠI HÀ NỘI & HẢI PHÒNG, KHÔNG CÓ TP.HCM):
1. CS1 Ba Đình (Hà Nội): Số 18, Ngõ 92 Kim Mã, Ba Đình
2. CS2 Cầu Giấy (Hà Nội): Tầng 3, 126 Hoàng Quốc Việt, Cầu Giấy
3. CS3 Tây Hồ (Hà Nội): Số 45 Tô Ngọc Vân, Quảng An, Tây Hồ
4. CS4 Lê Chân (Hải Phòng): Số 82 Mê Linh, An Biên, Lê Chân
5. CS5 Ngô Quyền (Hải Phòng): Số 15 Lạch Tray, Ngô Quyền

CÁC HỆ THỐNG ĐÀO TẠO CHÍNH:
1. LỚP VẼ TRẺ EM (4 – 15 tuổi):
   • 4–6 tuổi (Mầm Sáng Tạo): Rèn vận động tinh, màu nước hữu cơ an toàn, trò chơi màu sắc, 75 phút/buổi.
   • 7–10 tuổi (Năng Khiếu Nhí): Dựng hình cơ bản, bánh xe màu sắc, tự do kể chuyện qua tranh, 90 phút/buổi.
   • 11–15 tuổi (Hội Họa Thiếu Niên): Bố cục không gian, phối cảnh Perspective, sáng tối Chiaroscuro, Acrylic toan vải & Manga, 120 phút/buổi.
   * Nguyên tắc vàng: 100% không gò bó khuôn mẫu, không vẽ hộ con. Chụp ảnh sản phẩm và gửi nhận xét cho phụ huynh sau mỗi buổi.

2. MỸ THUẬT NGƯỜI LỚN (16+ tuổi):
   • Dành cho người đi làm & sinh viên muốn giải tỏa căng thẳng sau giờ làm việc.
   • Kèm 1:1 từ số 0 (hơn 92% học viên chưa từng cầm cọ và nghĩ mình không có hoa tay).
   • 4 chất liệu tùy chọn: Acrylic trên toan vải canvas (nhanh khô, mang về treo ngay), Màu nước Watercolor (trong trẻo, tĩnh lặng, chữa lành), Sơn dầu cổ điển (chiều sâu quý phái), Ký họa bút sắt & chì (góc phố, du lịch).
   • Không gian mở có trà hoa, nhạc nhẹ thư giãn.

ĐẶC QUYỀN HỌC THỬ 0Đ (FREE TRIAL):
- Tài trợ 100% học phí buổi trải nghiệm 90–120 phút đầu tiên (trị giá 350.000đ).
- Bao trọn 100% toan vẽ, màu vẽ, cọ vẽ cao cấp.
- Tự tay hoàn thiện và mang 1 bức tranh hoàn chỉnh về nhà ngay sau buổi học.

LỊCH HỌC & CHÍNH SÁCH HỌC PHÍ:
- Thời khóa biểu linh hoạt: Lớp người lớn ca tối trong tuần (18h30–21h00) & cuối tuần; Lớp trẻ em cuối tuần & chiều tan trường.
- Học bù tự do, bảo lưu không giới hạn khi bận việc hoặc ốm.
- 100% giáo viên tốt nghiệp chính quy ĐH Mỹ thuật, có chứng chỉ sư phạm.

QUY TẮC BẮT BUỘC KHI TƯ VẤN & THU THẬP LEAD:
1. Khi khách hỏi tư vấn lớp nói chung (ví dụ "tư vấn lớp cho tôi", "có những lớp nào"): Giới thiệu ngắn gọn, hấp dẫn cả 2 hệ thống Lớp Trẻ Em & Lớp Người Lớn, sau đó hỏi khách đang tìm lớp cho bé hay cho người lớn.
2. Khi khách cung cấp Số điện thoại:
   - Nếu khách CHƯA chọn cơ sở: Hãy niềm nở cảm ơn đã gửi SĐT, và CHỦ ĐỘNG HỎI khách muốn học tại cơ sở nào (trong 5 cơ sở tại Hà Nội hoặc Hải Phòng) để tiện xếp lớp.
   - Nếu khách ĐÃ CÓ cơ sở (hoặc vừa chọn cơ sở): Hãy cảm ơn và thông báo rằng Tư vấn viên tại cơ sở đó sẽ liên hệ lại qua số điện thoại/Zalo của khách trong vòng 15 phút để hoàn tất xếp lớp học thử 0đ.
3. Độ dài câu trả lời: Khoảng 100 - 180 từ, chia đoạn thoáng, dùng icon sinh động, tự nhiên như tin nhắn Zalo của một cô giáo mỹ thuật tận tâm. TUYỆT ĐỐI KHÔNG dùng ký tự thô cứng như "---", "***", "###". Dùng in đậm **từ khóa quan trọng**.`;

/**
 * Gửi tin nhắn tới Google Gemini API
 * @param {Array<{role: string, content: string}>} messages
 * @param {string} systemInstruction
 * @returns {Promise<string|null>}
 */
export async function askGemini(messages = [], systemInstruction = SYSTEM_PROMPT) {
  if (!GEMINI_API_KEY || !Array.isArray(messages) || messages.length === 0) return null;

  // 1. Sanitize & map messages to Gemini API format
  const rawContents = messages
    .filter(m => m && m.content && String(m.content).trim())
    .map(m => ({
      role: m.role === 'assistant' || m.role === 'model' || m.role === 'bot' ? 'model' : 'user',
      parts: [{ text: String(m.content).trim() }]
    }));

  // Gemini bắt buộc lượt đầu tiên phải là role 'user'
  while (rawContents.length > 0 && rawContents[0].role === 'model') {
    rawContents.shift();
  }

  if (rawContents.length === 0) return null;

  // Gộp các lượt liên tiếp cùng role (nếu có) để đảm bảo alternate user/model
  const formattedContents = [];
  for (const msg of rawContents) {
    const prev = formattedContents[formattedContents.length - 1];
    if (prev && prev.role === msg.role) {
      prev.parts[0].text += '\n\n' + msg.parts[0].text;
    } else {
      formattedContents.push(msg);
    }
  }

  // 2. Thử lần lượt các model Gemini tối ưu
  for (const model of CANDIDATE_MODELS) {
    try {
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
      const payload = {
        system_instruction: {
          parts: [{ text: systemInstruction }]
        },
        contents: formattedContents,
        generationConfig: {
          temperature: 0.7,
          topP: 0.95,
          maxOutputTokens: 1024
        }
      };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        const candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (candidateText && candidateText.trim()) {
          return candidateText.trim();
        }
      } else {
        const errJson = await response.json().catch(() => ({}));
        console.warn(`[Gemini Service] Model ${model} returned ${response.status}:`, errJson?.error?.message || response.statusText);
      }
    } catch (err) {
      console.warn(`[Gemini Service] Error calling ${model}:`, err.message);
    }
  }

  return null;
}
