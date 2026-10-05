import React, { useState } from 'react';
import { Eye, Heart, Sparkles, Filter, X } from 'lucide-react';

export const ArtGallery = ({ onOpenTrialModal }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  const artworks = [
    {
      id: 1,
      title: 'Vườn Hướng Dương Nắng Vàng',
      author: 'Bé Minh An – 7 tuổi',
      category: 'kids',
      medium: 'Sáp dầu & Màu nước',
      milestone: 'Bắt đầu từ số 0 (Khóa 2 tháng)',
      image: '/assets/art_kids_sunflower.jpg',
      comment: 'Bé tự tin phối màu ấm sáng và hoàn thiện tranh độc lập không cần cô cầm tay.',
      likes: 128
    },
    {
      id: 2,
      title: 'Hoàng Hôn Hồ Suối Vàng',
      author: 'Anh Đức Hải – 32 tuổi (Kỹ sư)',
      category: 'adults',
      medium: 'Acrylic trên canvas 40x50cm',
      milestone: 'Sau 6 buổi học người lớn',
      image: '/assets/art_adult_landscape.jpg',
      comment: 'Làm chủ kỹ thuật đắp màu tạo khối mây và bóng nước phản chiếu.',
      likes: 215
    },
    {
      id: 3,
      title: 'Bình Hoa Hồng Cổ Mùa Thu',
      author: 'Chị Thảo My – 27 tuổi (Marketing)',
      category: 'adults',
      medium: 'Sơn dầu thư giãn',
      milestone: 'Hoàn thiện sau 8 buổi',
      image: '/assets/art_adult_floral.jpg',
      comment: 'Bức tranh đầu tay hoàn chỉnh để treo trang trí phòng khách tại nhà.',
      likes: 184
    },
    {
      id: 4,
      title: 'Sắc Màu Tuổi Thơ & Cảm Xúc',
      author: 'Bé Bảo Nam – 5 tuổi',
      category: 'kids',
      medium: 'Gouache & Cọ lông mềm',
      milestone: 'Học viên lớp Mầm Sáng Tạo',
      image: '/assets/art_kids_colors.jpg',
      comment: 'Phát triển tư duy màu tương phản và khả năng tập trung kiên nhẫn.',
      likes: 96
    },
    {
      id: 5,
      title: 'Tĩnh Vật Trái Cây & Bình Thủy Tinh',
      author: 'Chị Hoàng Oanh – 35 tuổi (Kế toán)',
      category: 'adults',
      medium: 'Sơn dầu cổ điển',
      milestone: 'Sau 1 khóa cơ bản',
      image: '/assets/art_adult_stilllife.jpg',
      comment: 'Kỹ thuật ánh sáng sáng - tối (Chiaroscuro) được kiểm soát xuất sắc.',
      likes: 162
    },
    {
      id: 6,
      title: 'Bảng Màu Rực Rỡ Của Em',
      author: 'Bé Gia Hân – 9 tuổi',
      category: 'kids',
      medium: 'Màu nước cơ bản',
      milestone: 'Lớp Năng Khiếu Nhí',
      image: '/assets/art_kids_palette.jpg',
      comment: 'Bé thỏa sức thể hiện góc nhìn cá nhân về thế giới xung quanh.',
      likes: 110
    },
    {
      id: 7,
      title: 'Nhịp Điệu Không Gian & Trừu Tượng',
      author: 'Bạn Tuấn Kiệt – 22 tuổi (Sinh viên)',
      category: 'adults',
      medium: 'Acrylic bay & cọ xước',
      milestone: 'Khóa Nâng cao tự do',
      image: '/assets/art_adult_abstract.jpg',
      comment: 'Tác phẩm giải tỏa cảm xúc sau chuỗi ngày thi cử áp lực.',
      likes: 175
    }
  ];

  const filteredArtworks = activeFilter === 'all'
    ? artworks
    : artworks.filter(a => a.category === activeFilter);

  return (
    <section id="tac-pham" className="py-16 lg:py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-charcoal-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-300 uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Trưng Bày Tác Phẩm
          </div>

          <h2 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-charcoal-900">
            Tác phẩm thực tế từ học viên Số Không
          </h2>
          <p className="mt-3 text-sm sm:text-base text-charcoal-600">
            100% tác phẩm dưới đây được vẽ bởi học viên bắt đầu từ con số 0, 
            không qua chỉnh sửa hay vẽ hộ.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeFilter === 'all'
                  ? 'bg-charcoal-900 text-white shadow-md'
                  : 'bg-amber-50 text-charcoal-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              Tất cả tác phẩm ({artworks.length})
            </button>
            <button
              onClick={() => setActiveFilter('kids')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeFilter === 'kids'
                  ? 'bg-brand-400 text-charcoal-900 shadow-md border-2 border-charcoal-900'
                  : 'bg-amber-50 text-charcoal-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              🎨 Tranh Bé (4–15 tuổi)
            </button>
            <button
              onClick={() => setActiveFilter('adults')}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeFilter === 'adults'
                  ? 'bg-stone-800 text-amber-200 shadow-md'
                  : 'bg-amber-50 text-charcoal-700 hover:bg-amber-100 border border-amber-200'
              }`}
            >
              🖌️ Tranh Người Lớn (16+)
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map((art) => (
            <div
              key={art.id}
              className="group bg-[#FFFDF9] rounded-3xl overflow-hidden border-2 border-amber-200/90 hover:border-charcoal-900 transition-all duration-300 hover:shadow-[4px_4px_0px_0px_#18181B] flex flex-col"
            >
              {/* Image with overlay */}
              <div
                className="relative h-64 sm:h-72 overflow-hidden cursor-pointer bg-stone-100"
                onClick={() => setSelectedArtwork(art)}
              >
                <img
                  src={art.image}
                  alt={art.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/30 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 bg-white text-charcoal-900 px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-all">
                    <Eye className="w-3.5 h-3.5" /> Phóng to xem chi tiết
                  </span>
                </div>

                {/* Milestone Badge on Image */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg border border-amber-300 text-[11px] font-bold text-charcoal-800 shadow-sm">
                  {art.milestone}
                </div>

                {/* Category Chip */}
                <div className="absolute top-3 right-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    art.category === 'kids'
                      ? 'bg-amber-400 text-charcoal-900 border border-amber-500'
                      : 'bg-charcoal-900 text-amber-200 border border-stone-700'
                  }`}>
                    {art.category === 'kids' ? 'Lớp Trẻ Em' : 'Lớp Người Lớn'}
                  </span>
                </div>
              </div>

              {/* Artwork Information */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-black text-lg text-charcoal-900 leading-snug mb-1">
                    {art.title}
                  </h3>
                  
                  <div className="flex items-center justify-between text-xs text-amber-800 font-bold mb-3">
                    <span className="font-hand text-base text-stone-800">{art.author}</span>
                    <span className="bg-amber-100 px-2 py-0.5 rounded text-[11px] font-mono text-charcoal-700">
                      {art.medium}
                    </span>
                  </div>

                  <p className="text-xs text-charcoal-600 italic bg-amber-50/70 p-2.5 rounded-xl border border-amber-100/80 leading-relaxed">
                    "{art.comment}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between">
                  <span className="text-[11px] text-charcoal-500 flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                    <span>{art.likes} lượt yêu thích</span>
                  </span>

                  <button
                    onClick={onOpenTrialModal}
                    className="text-xs font-bold text-amber-800 hover:text-amber-950 underline decoration-amber-400 decoration-2 underline-offset-4"
                  >
                    Đăng ký vẽ thử →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedArtwork && (
          <div
            className="fixed inset-0 z-50 bg-charcoal-900/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedArtwork(null)}
          >
            <div
              className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden border-2 border-charcoal-900 shadow-2xl relative"
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 bg-charcoal-900 text-white rounded-full flex items-center justify-center hover:bg-stone-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative max-h-[60vh] bg-stone-900 flex items-center justify-center overflow-hidden">
                <img
                  src={selectedArtwork.image}
                  alt={selectedArtwork.title}
                  className="max-h-[60vh] w-auto object-contain"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <h3 className="text-xl font-heading font-black text-charcoal-900">
                    {selectedArtwork.title}
                  </h3>
                  <span className="text-xs font-bold bg-amber-100 text-charcoal-800 px-3 py-1 rounded-full border border-amber-300">
                    {selectedArtwork.milestone}
                  </span>
                </div>

                <p className="text-sm font-semibold text-amber-700 mb-2 font-hand text-lg">
                  Tác giả: {selectedArtwork.author} • Chất liệu: {selectedArtwork.medium}
                </p>

                <p className="text-sm text-charcoal-700 leading-relaxed bg-amber-50 p-3 rounded-xl border border-amber-200 mb-4">
                  <strong>Nhận xét chuyên môn:</strong> {selectedArtwork.comment}
                </p>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedArtwork(null)}
                    className="px-4 py-2 text-xs font-bold text-charcoal-700 hover:bg-stone-100 rounded-xl"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={() => {
                      setSelectedArtwork(null);
                      onOpenTrialModal();
                    }}
                    className="px-5 py-2 bg-brand-400 text-charcoal-900 font-bold text-xs rounded-xl border-2 border-charcoal-900 shadow-[2px_2px_0px_#18181B]"
                  >
                    Đăng ký học thử để vẽ tranh như thế này
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
