import React from 'react';

export function FourPointStar({
  className = 'w-5 h-5 text-[#681B36]',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C12.9 7.2 16.8 11.1 24 12C16.8 12.9 12.9 16.8 12 24C11.1 16.8 7.2 12.9 0 12C7.2 11.1 11.1 7.2 12 0Z" />
    </svg>
  );
}

export function BotanicalSprig({
  className = 'w-28 h-44 text-[#681B36]/80',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 200"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M58 195C59 145 57 98 48 22"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M55 152C38 140 24 124 20 105"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M54 126C70 112 85 96 92 78"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M51 94C36 82 28 65 24 48"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M50 64C64 52 75 37 82 22"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <ellipse
        cx="20"
        cy="102"
        rx="8"
        ry="4.5"
        transform="rotate(-35 20 102)"
        fill="#D9828B"
        fillOpacity="0.45"
        stroke="currentColor"
        strokeWidth="1"
      />
      <ellipse
        cx="31"
        cy="126"
        rx="7"
        ry="4"
        transform="rotate(-22 31 126)"
        fill="#F4D5D2"
        stroke="currentColor"
        strokeWidth="1"
      />
      <ellipse
        cx="93"
        cy="75"
        rx="8.5"
        ry="4.5"
        transform="rotate(32 93 75)"
        fill="#D9828B"
        fillOpacity="0.4"
        stroke="currentColor"
        strokeWidth="1"
      />
      <ellipse
        cx="75"
        cy="98"
        rx="7"
        ry="4"
        transform="rotate(20 75 98)"
        fill="#F4D5D2"
        stroke="currentColor"
        strokeWidth="1"
      />
      <ellipse
        cx="23"
        cy="45"
        rx="7.5"
        ry="4"
        transform="rotate(-30 23 45)"
        fill="#F4D5D2"
        stroke="currentColor"
        strokeWidth="1"
      />
      <ellipse
        cx="83"
        cy="20"
        rx="7"
        ry="3.8"
        transform="rotate(28 83 20)"
        fill="#D9828B"
        fillOpacity="0.45"
        stroke="currentColor"
        strokeWidth="1"
      />
      <ellipse
        cx="47"
        cy="16"
        rx="6"
        ry="3.5"
        transform="rotate(-82 47 16)"
        fill="#681B36"
        fillOpacity="0.25"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

export function WaveTransition({
  fillColor,
  flip = false,
}: {
  fillColor: string;
  flip?: boolean;
}) {
  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none ${
        flip ? 'rotate-180' : ''
      }`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 72"
        preserveAspectRatio="none"
        className="w-full h-10 sm:h-14 md:h-16 block"
      >
        <path
          d="M0,12 C360,72 1080,72 1440,12 L1440,72 L0,72 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}

export function WhatsAppIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M16.004 3.2c-7.058 0-12.8 5.742-12.8 12.8 0 2.256.59 4.458 1.71 6.398L3.1 28.98l6.752-1.771a12.744 12.744 0 006.152 1.585h.005c7.057 0 12.796-5.743 12.796-12.8 0-3.42-1.331-6.635-3.75-9.051a12.716 12.716 0 00-9.051-3.743zm7.454 18.187c-.314.883-1.832 1.689-2.548 1.797-.65.097-1.472.138-2.375-.148-.548-.174-1.25-.406-2.148-.795-3.781-1.633-6.25-5.442-6.439-5.694-.188-.252-1.538-2.047-1.538-3.904 0-1.857.973-2.771 1.318-3.149.345-.377.754-.472 1.005-.472.252 0 .503.003.723.013.232.012.543-.088.85.648.314.755 1.069 2.613 1.163 2.802.094.189.157.409.031.661-.126.252-.189.409-.377.629-.189.22-.396.491-.566.66-.189.188-.385.393-.165.771.22.377.979 1.615 2.103 2.617 1.445 1.289 2.663 1.689 3.04 1.878.377.188.597.157.817-.094.22-.252.943-1.101 1.195-1.478.252-.377.503-.314.849-.189.346.126 2.199 1.037 2.576 1.226.377.189.628.283.723.44.094.157.094.912-.22 1.795z" />
    </svg>
  );
}
