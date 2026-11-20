import React, { useRef, useState } from 'react';
import { Camera, RotateCcw } from 'lucide-react';
import { BotanicalSprig, FourPointStar } from './BotanicalMotifs';

interface PhotoSlotFrameProps {
  title: string;
  subtitle: string;
  variant?: 'hero' | 'about';
  showPaletteDots?: boolean;
}

export function PhotoSlotFrame({
  title,
  subtitle,
  variant = 'hero',
  showPaletteDots = true,
}: PhotoSlotFrameProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleReset = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const isHero = variant === 'hero';

  return (
    <div className="relative flex items-center justify-center w-full max-w-md mx-auto">
      {/* Subtle 4-point star accents */}
      <FourPointStar className="hidden sm:block absolute -top-4 left-2 w-6 h-6 text-[#681B36]/80" />
      <FourPointStar className="hidden sm:block absolute top-3 left-9 w-3.5 h-3.5 text-[#D9828B]" />

      {/* Botanical sprig positioned organically on frame edge */}
      <BotanicalSprig
        className={`hidden sm:block absolute z-20 pointer-events-none select-none text-[#422B30]/75 ${
          isHero ? '-left-10 bottom-2 w-28 h-44' : '-right-10 bottom-3 w-24 h-40 scale-x-[-1]'
        }`}
      />

      {/* Organic asymmetrical blush frame */}
      <div
        className={`relative w-full aspect-[4/4.3] bg-[#F4D5D2] p-4 sm:p-5 shadow-[0_20px_50px_-24px_rgba(104,27,54,0.22)] overflow-hidden ${
          isHero
            ? 'rounded-tl-[96px] rounded-br-[96px] rounded-tr-[24px] rounded-bl-[24px]'
            : 'rounded-tr-[96px] rounded-bl-[96px] rounded-tl-[24px] rounded-br-[24px]'
        }`}
      >
        <div
          className={`relative w-full h-full bg-[#FFF5EC] border border-[#681B36]/15 overflow-hidden flex flex-col items-center justify-center text-center p-6 ${
            isHero
              ? 'rounded-tl-[80px] rounded-br-[80px] rounded-tr-[16px] rounded-bl-[16px]'
              : 'rounded-tr-[80px] rounded-bl-[80px] rounded-tl-[16px] rounded-br-[16px]'
          }`}
        >
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt={title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleReset}
                className="relative z-10 mt-auto inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 text-[#422B30] text-xs font-medium shadow-sm hover:bg-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Quitar vista previa</span>
              </button>
            </>
          ) : (
            <div className="flex flex-col items-center max-w-[240px]">
              <div className="w-14 h-14 rounded-full bg-[#F4D5D2]/70 flex items-center justify-center text-[#681B36] mb-4">
                <Camera className="w-6 h-6" strokeWidth={1.6} />
              </div>
              <p className="font-serif text-lg sm:text-xl font-semibold text-[#422B30] leading-snug mb-2">
                {title}
              </p>
              <p className="text-xs sm:text-sm text-[#6B4E54] leading-relaxed mb-5">
                {subtitle}
              </p>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label={`Probar fotografía real para ${title}`}
              />
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#D9828B] text-[#681B36] text-xs font-medium hover:bg-[#F4D5D2]/40 transition-colors cursor-pointer"
              >
                <span>Probar foto real aquí</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3 signature vertical color dots from FEMINE reference */}
      {showPaletteDots && (
        <div
          className={`hidden sm:flex flex-col gap-2.5 absolute ${
            isHero ? '-right-6 bottom-12' : '-left-6 bottom-12'
          }`}
          aria-hidden="true"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-[#F4D5D2] border border-[#681B36]/10" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#D9828B]" />
          <span className="w-3.5 h-3.5 rounded-full bg-[#681B36]" />
        </div>
      )}
    </div>
  );
}
