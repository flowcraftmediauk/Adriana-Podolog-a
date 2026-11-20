import React, { useRef, useState } from 'react';
import { Camera, RotateCcw, Sparkles } from 'lucide-react';
import { BotanicalSprig, FourPointStar } from './BotanicalMotifs';

interface PhotoSlotFrameProps {
  defaultImageSrc: string;
  imageAlt: string;
  captionLabel?: string;
  variant?: 'hero' | 'about';
  showPaletteDots?: boolean;
}

export function PhotoSlotFrame({
  defaultImageSrc,
  imageAlt,
  captionLabel,
  variant = 'hero',
  showPaletteDots = true,
}: PhotoSlotFrameProps) {
  const [customPreviewUrl, setCustomPreviewUrl] = useState<string | null>(null);
  const [imgFailed, setImgFailed] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activeSrc = customPreviewUrl ?? defaultImageSrc;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (customPreviewUrl) {
      URL.revokeObjectURL(customPreviewUrl);
    }
    setImgFailed(false);
    setCustomPreviewUrl(URL.createObjectURL(file));
  };

  const handleReset = () => {
    if (customPreviewUrl) {
      URL.revokeObjectURL(customPreviewUrl);
    }
    setCustomPreviewUrl(null);
    setImgFailed(false);
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
          isHero
            ? '-left-10 bottom-2 w-28 h-44'
            : '-right-10 bottom-3 w-24 h-40 scale-x-[-1]'
        }`}
      />

      {/* Organic asymmetrical blush frame */}
      <div
        className={`relative w-full aspect-[3/4] bg-[#F4D5D2] p-3.5 sm:p-4 shadow-[0_24px_55px_-26px_rgba(104,27,54,0.28)] overflow-hidden ${
          isHero
            ? 'rounded-tl-[96px] rounded-br-[96px] rounded-tr-[24px] rounded-bl-[24px]'
            : 'rounded-tr-[96px] rounded-bl-[96px] rounded-tl-[24px] rounded-br-[24px]'
        }`}
      >
        <div
          className={`group relative w-full h-full bg-[#FFF5EC] overflow-hidden ${
            isHero
              ? 'rounded-tl-[82px] rounded-br-[82px] rounded-tr-[16px] rounded-bl-[16px]'
              : 'rounded-tr-[82px] rounded-bl-[82px] rounded-tl-[16px] rounded-br-[16px]'
          }`}
        >
          {!imgFailed ? (
            <img
              src={activeSrc}
              alt={imageAlt}
              referrerPolicy="no-referrer"
              onError={() => setImgFailed(true)}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#FFF5EC] to-[#F4D5D2]/50">
              <Sparkles className="w-7 h-7 text-[#681B36] mb-3" />
              <p className="font-serif text-lg font-semibold text-[#422B30]">
                {imageAlt}
              </p>
            </div>
          )}

          {/* Subtle bottom gradient + optional real photo preview button */}
          <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-[#422B30]/65 via-[#422B30]/20 to-transparent flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-white/95 truncate">
              {customPreviewUrl
                ? 'Vista previa con foto propia'
                : captionLabel || 'Adriana Podología'}
            </span>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              aria-label={`Cambiar imagen: ${imageAlt}`}
            />

            {customPreviewUrl ? (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/90 text-[#422B30] text-[11px] font-medium hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restaurar</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-[#422B30] text-[11px] font-medium hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                <Camera className="w-3 h-3 text-[#681B36]" />
                <span>Cambiar foto</span>
              </button>
            )}
          </div>
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
