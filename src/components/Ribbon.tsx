import React from 'react';

const IconGoogle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.9999 12.24C21.9999 11.4933 21.9333 10.76 21.8066 10.0533H12.3333V14.16H17.9533C17.7333 15.3467 17.0133 16.3733 15.9666 17.08V19.68H19.5266C21.1933 18.16 21.9999 15.4533 21.9999 12.24Z" fill="#4285F4" />
    <path d="M12.3333 22C15.2333 22 17.6866 21.0533 19.5266 19.68L15.9666 17.08C15.0199 17.7333 13.7933 18.16 12.3333 18.16C9.52659 18.16 7.14659 16.28 6.27992 13.84H2.59326V16.5133C4.38659 20.0267 8.05992 22 12.3333 22Z" fill="#34A853" />
    <path d="M6.2799 13.84C6.07324 13.2267 5.9599 12.58 5.9599 11.92C5.9599 11.26 6.07324 10.6133 6.2799 10L2.59326 7.32667C1.86659 8.78667 1.45326 10.32 1.45326 11.92C1.45326 13.52 1.86659 15.0533 2.59326 16.5133L6.2799 13.84Z" fill="#FBBC05" />
    <path d="M12.3333 5.68C13.8933 5.68 15.3133 6.22667 16.3866 7.24L19.6 4.02667C17.68 2.29333 15.2266 1.33333 12.3333 1.33333C8.05992 1.33333 4.38659 3.97333 2.59326 7.32667L6.27992 10C7.14659 7.56 9.52659 5.68 12.3333 5.68Z" fill="#EA4335" />
  </svg>
);

const IconMeta = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 12C5.2 7.5 9 7.5 11.6 12C14.2 16.5 18 16.5 20.2 12" stroke="#0081FB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M3 12C5.2 16.5 9 16.5 11.6 12C14.2 7.5 18 7.5 20.2 12" stroke="#0081FB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IconSnapchat = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#FFFC00" />
    <text
      x="12"
      y="12"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="11"
      fontWeight="700"
      fontFamily="Inter, Arial, sans-serif"
      fill="#111111"
    >
      S
    </text>
  </svg>
);

const IconTikTok = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#0B0B0B" />
    <text
      x="12"
      y="12"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="11"
      fontWeight="700"
      fontFamily="Inter, Arial, sans-serif"
      fill="#FFFFFF"
    >
      T
    </text>
  </svg>
);

const IconInstagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ig-ribbon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F58529" />
        <stop offset="50%" stopColor="#DD2A7B" />
        <stop offset="100%" stopColor="#515BD4" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#ig-ribbon-grad)" />
    <rect x="7" y="7" width="10" height="10" rx="3" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2.5" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="16" cy="8" r="1" fill="#FFFFFF" />
  </svg>
);

const IconFacebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#1877F2" />
    <text
      x="12"
      y="12.5"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="12"
      fontWeight="700"
      fontFamily="Inter, Arial, sans-serif"
      fill="#FFFFFF"
    >
      f
    </text>
  </svg>
);

const logos = [
  { id: 'google', Svg: IconGoogle, label: 'Google' },
  { id: 'meta', Svg: IconMeta, label: 'Meta' },
  { id: 'snapchat', Svg: IconSnapchat, label: 'Snapchat' },
  { id: 'tiktok', Svg: IconTikTok, label: 'TikTok' },
  { id: 'instagram', Svg: IconInstagram, label: 'Instagram' },
  { id: 'facebook', Svg: IconFacebook, label: 'Facebook' },
];

export default function Ribbon() {
  return (
    <section className="relative w-full overflow-hidden bg-transparent">
      <div className="py-3">
        <div className="ribbon-marquee flex items-center">
          <div className="ribbon-track flex items-center gap-8 whitespace-nowrap px-4">
            {logos.map(({ id, Svg, label }) => (
              <span key={`ribbon-logo-${id}`} className="inline-flex items-center opacity-80">
                <Svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" aria-label={label} />
              </span>
            ))}
          </div>
          <div className="ribbon-track flex items-center gap-8 whitespace-nowrap px-4" aria-hidden="true">
            {logos.map(({ id, Svg, label }) => (
              <span key={`ribbon-logo-dup-${id}`} className="inline-flex items-center opacity-80">
                <Svg className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" aria-label={label} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
