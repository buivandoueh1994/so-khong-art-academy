import React from 'react';

// Brand Watercolor Circle Stamp Icon
export const BrandStamp = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 8C27 8 8 26 8 50C8 73 25 92 50 92C74 92 92 73 92 50C92 27 73 8 50 8Z"
      fill="#FDE047"
    />
    <path
      d="M51 12C72 11 88 28 88 49C88 71 70 87 49 87C28 87 12 70 12 49C12 28 29 13 51 12Z"
      fill="#FACC15"
      opacity="0.85"
    />
    <circle cx="50" cy="50" r="34" fill="#FEF08A" opacity="0.9" />
    <text
      x="50"
      y="57"
      textAnchor="middle"
      fontSize="36"
      fontWeight="900"
      fill="#18181B"
      fontFamily="'Outfit', sans-serif"
    >
      0
    </text>
  </svg>
);

// Doodle Sun (from reference above Lớp Vẽ)
export const SunDoodle = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="14" stroke="#F59E0B" strokeWidth="3" strokeDasharray="2 1" fill="#FEF08A" />
    <path d="M30 6V11" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    <path d="M30 49V54" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    <path d="M6 30H11" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    <path d="M49 30H54" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    <path d="M13 13L17 17" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    <path d="M43 43L47 47" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    <path d="M13 47L17 43" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    <path d="M43 17L47 13" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// Doodle Palette (from reference above Lớp Vẽ Số Không)
export const PaletteDoodle = ({ className = "w-12 h-12" }) => (
  <svg viewBox="0 0 70 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M38 7C22 7 9 18 9 32C9 42 16 50 26 50C29 50 32 48 32 44C32 41 30 39 30 36C30 32 33 29 37 29H43C53 29 61 22 61 14C61 10 50 7 38 7Z"
      stroke="#18181B"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#FFFBEB"
    />
    <circle cx="23" cy="22" r="3.5" fill="#EF4444" />
    <circle cx="34" cy="18" r="3.5" fill="#3B82F6" />
    <circle cx="46" cy="20" r="3.5" fill="#10B981" />
    <circle cx="20" cy="35" r="3.5" fill="#F59E0B" />
  </svg>
);

// Doodle Paintbrush (from reference above Mỹ Thuật Số Không)
export const BrushDoodle = ({ className = "w-10 h-10" }) => (
  <svg viewBox="0 0 60 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M48 8C43 13 32 24 23 33L21 35L17 45L27 41L29 39C38 30 49 19 54 14C56 12 56 10 54 8C52 6 50 6 48 8Z"
      stroke="#18181B"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#FFFBEB"
    />
    <path d="M22 34L28 40" stroke="#18181B" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M17 45C15 47 11 50 9 52C8 53 10 55 12 54C14 53 18 49 20 47" stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" fill="#FACC15" />
  </svg>
);

// Curving Arrow connecting steps
export const ArrowDoodle = ({ className = "w-8 h-8 text-charcoal-700" }) => (
  <svg viewBox="0 0 50 20" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 10C16 4 28 4 44 10M44 10L36 4M44 10L36 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Sparkle Star Doodle
export const SparkleDoodle = ({ className = "w-6 h-6 text-brand-500" }) => (
  <svg viewBox="0 0 30 30" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 2V28M2 15H28M6 6L24 24M24 6L6 24"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

// Hand drawn underline doodle
export const UnderlineDoodle = ({ className = "w-36 h-4 text-brand-400" }) => (
  <svg viewBox="0 0 200 16" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4 12C45 4 120 3 196 11C150 14 60 15 12 11"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Paint splash background for kids hero
export const PaintSplashBg = ({ className = "absolute" }) => (
  <svg
    viewBox="0 0 600 600"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M120 60C220 -20 480 30 520 180C560 330 460 520 340 550C220 580 80 500 40 380C0 260 20 140 120 60Z"
      fill="#FEF08A"
      opacity="0.35"
    />
    <path
      d="M80 140C160 80 380 90 460 220C540 350 420 490 280 500C140 510 60 410 40 300C20 190 0 200 80 140Z"
      fill="#FDE68A"
      opacity="0.4"
    />
  </svg>
);
