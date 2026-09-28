import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
}) => {
  const sizeMap = {
    sm: { icon: 32, text: 'text-lg', sub: 'text-xs' },
    md: { icon: 48, text: 'text-2xl', sub: 'text-sm' },
    lg: { icon: 72, text: 'text-3xl', sub: 'text-base' },
    xl: { icon: 96, text: 'text-4xl', sub: 'text-lg' },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Exact Vector Emblem based on Smart Kids Lab emblem */}
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: current.icon, height: current.icon }}
      >
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          {/* Sparkles / Stars */}
          <path
            d="M 66 40 Q 66 46 60 46 Q 66 46 66 52 Q 66 46 72 46 Q 66 46 66 40 Z"
            fill="#FBBF24"
          />
          <path
            d="M 160 56 Q 160 62 154 62 Q 160 62 160 68 Q 160 62 166 62 Q 160 62 160 56 Z"
            fill="#06B6D4"
          />

          {/* Rocket Ship */}
          <g transform="translate(132, 18) rotate(24) scale(0.65)">
            {/* Flame */}
            <path
              d="M 18 55 Q 24 78 24 88 Q 24 78 30 55 Z"
              fill="#F97316"
            />
            <path
              d="M 21 55 Q 24 72 24 78 Q 24 72 27 55 Z"
              fill="#FBBF24"
            />
            {/* Rocket Wings */}
            <path
              d="M 6 35 L 14 48 L 14 30 Z"
              fill="#0284C7"
            />
            <path
              d="M 42 35 L 34 48 L 34 30 Z"
              fill="#0284C7"
            />
            {/* Rocket Body */}
            <path
              d="M 24 5 C 14 20 14 42 14 55 L 34 55 C 34 42 34 20 24 5 Z"
              fill="#0284C7"
            />
            {/* Window */}
            <circle cx="24" cy="28" r="5" fill="#FFFFFF" />
            <circle cx="24" cy="28" r="3.2" fill="#0EA5E9" />
          </g>

          {/* Left Brain Lobe (Organic folds in Royal Blue) */}
          <g>
            <path
              d="M 98 42 C 86 42 78 48 76 56 C 68 56 62 64 64 74 C 58 78 58 88 64 94 C 60 102 66 112 74 114 C 80 116 88 116 98 116 Z"
              fill="#0284C7"
            />
            {/* Left Brain Gyri / Folds */}
            <path
              d="M 88 56 C 80 58 78 68 85 73"
              stroke="#E0F2FE"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 72 82 C 70 90 78 96 86 92"
              stroke="#E0F2FE"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M 76 102 C 82 108 92 106 95 98"
              stroke="#E0F2FE"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </g>

          {/* Right Brain Lobe (Digital Circuit Board in Cyan) */}
          <g>
            <path
              d="M 102 42 C 114 42 122 48 124 56 C 132 56 138 64 136 74 C 142 78 142 88 136 94 C 140 102 134 112 126 114 C 120 116 112 116 102 116 Z"
              fill="#06B6D4"
            />
            {/* Circuit Traces & Nodes */}
            <path
              d="M 107 106 L 107 58 L 118 58"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="118" cy="58" r="4" fill="#FFFFFF" />

            <path
              d="M 112 72 L 126 72"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="126" cy="72" r="4" fill="#FFFFFF" />

            <path
              d="M 112 90 L 122 90"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="122" cy="90" r="4" fill="#FFFFFF" />
          </g>

          {/* Open Book Pages (Cyan top layer, Deep Blue bottom layer) */}
          {/* Top Page Layer */}
          <path
            d="M 100 114 C 80 105 45 106 36 114 L 38 126 C 50 118 80 118 100 126 C 120 118 150 118 162 126 L 164 114 C 155 106 120 105 100 114 Z"
            fill="#22D3EE"
          />
          {/* Main Book Body */}
          <path
            d="M 100 126 C 75 116 40 118 28 128 L 30 144 C 44 134 76 134 100 144 C 124 134 156 134 170 144 L 172 128 C 160 118 125 116 100 126 Z"
            fill="#0284C7"
          />
          {/* Book Spine Center Notch */}
          <polygon points="100,126 95,142 100,146 105,142" fill="#0369A1" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-extrabold tracking-tight text-blue-900 leading-none ${current.text}`}
            style={{ fontFamily: "'Fredoka', sans-serif" }}
          >
            Smart Kids
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="h-0.5 w-3 bg-amber-500 rounded-full" />
            <span
              className={`font-black tracking-wide text-cyan-600 uppercase leading-none ${current.sub}`}
              style={{ fontFamily: "'Fredoka', sans-serif" }}
            >
              Lab
            </span>
            <span className="h-0.5 w-3 bg-amber-500 rounded-full" />
          </div>
        </div>
      )}
    </div>
  );
};
