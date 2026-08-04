const defs = (
  <defs>
    <radialGradient id="gk-glow" cx="50%" cy="45%" r="60%">
      <stop offset="0%" stopColor="#6f8fff" stopOpacity="0.9" />
      <stop offset="45%" stopColor="#3b5bff" stopOpacity="0.35" />
      <stop offset="100%" stopColor="#04050a" stopOpacity="0" />
    </radialGradient>
    <linearGradient id="gk-line" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#6f8fff" stopOpacity="0.9" />
      <stop offset="100%" stopColor="#3b5bff" stopOpacity="0.1" />
    </linearGradient>
    <pattern id="gk-grid" width="28" height="28" patternUnits="userSpaceOnUse">
      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#3b5bff" strokeOpacity="0.15" strokeWidth="1" />
    </pattern>
  </defs>
);

const base = "h-full w-full";

export function EnergyCoreArt() {
  return (
    <svg viewBox="0 0 600 600" className={base} preserveAspectRatio="xMidYMid slice">
      {defs}
      <rect width="600" height="600" fill="#04050a" />
      <rect width="600" height="600" fill="url(#gk-grid)" />
      <circle cx="300" cy="300" r="260" fill="url(#gk-glow)" />
      {[220, 160, 100].map((r, i) => (
        <circle
          key={r}
          cx="300"
          cy="300"
          r={r}
          fill="none"
          stroke="#6f8fff"
          strokeOpacity={0.5 - i * 0.1}
          strokeWidth="1"
        />
      ))}
      <g stroke="#dfe6ff" strokeWidth="1.4" opacity="0.85">
        <polygon points="300,190 390,245 390,355 300,410 210,355 210,245" fill="#3b5bff" fillOpacity="0.12" />
        <polygon points="300,190 390,245 390,355 300,410 210,355 210,245" fill="none" />
        <line x1="300" y1="190" x2="300" y2="410" />
        <line x1="210" y1="245" x2="390" y2="355" />
        <line x1="210" y1="355" x2="390" y2="245" />
      </g>
      <circle cx="300" cy="300" r="14" fill="#f2f4fb" />
    </svg>
  );
}

export function HolographicCityArt() {
  const towers = [
    { x: 60, w: 40, h: 260 },
    { x: 120, w: 30, h: 340 },
    { x: 170, w: 46, h: 220 },
    { x: 240, w: 34, h: 400 },
    { x: 300, w: 50, h: 300 },
    { x: 370, w: 28, h: 360 },
    { x: 420, w: 42, h: 240 },
    { x: 480, w: 34, h: 320 },
  ];
  return (
    <svg viewBox="0 0 600 600" className={base} preserveAspectRatio="xMidYMid slice">
      {defs}
      <rect width="600" height="600" fill="#04050a" />
      <rect width="600" height="600" fill="url(#gk-grid)" />
      <ellipse cx="300" cy="560" rx="320" ry="60" fill="url(#gk-glow)" />
      {towers.map((t, i) => (
        <g key={t.x}>
          <rect x={t.x} y={560 - t.h} width={t.w} height={t.h} fill="#0a0d17" stroke="url(#gk-line)" strokeWidth="1" />
          {Array.from({ length: Math.floor(t.h / 24) }).map((_, r) => (
            <rect
              key={r}
              x={t.x + 6}
              y={560 - t.h + 10 + r * 24}
              width={t.w - 12}
              height="3"
              fill="#6f8fff"
              opacity={(i + r) % 3 === 0 ? 0.9 : 0.25}
            />
          ))}
        </g>
      ))}
      <line x1="0" y1="560" x2="600" y2="560" stroke="#3b5bff" strokeOpacity="0.6" />
    </svg>
  );
}

export function OrbitStationArt() {
  return (
    <svg viewBox="0 0 600 600" className={base} preserveAspectRatio="xMidYMid slice">
      {defs}
      <rect width="600" height="600" fill="#04050a" />
      <circle cx="300" cy="300" r="260" fill="url(#gk-glow)" opacity="0.6" />
      <circle cx="300" cy="300" r="120" fill="#0a0d17" stroke="#6f8fff" strokeWidth="1.5" />
      <circle cx="300" cy="300" r="95" fill="none" stroke="#3b5bff" strokeOpacity="0.5" strokeWidth="1" />
      {[
        { rx: 240, ry: 90, rot: 20 },
        { rx: 260, ry: 70, rot: -15 },
        { rx: 210, ry: 100, rot: 55 },
      ].map((e, i) => (
        <ellipse
          key={i}
          cx="300"
          cy="300"
          rx={e.rx}
          ry={e.ry}
          fill="none"
          stroke="#6f8fff"
          strokeOpacity="0.35"
          strokeWidth="1"
          transform={`rotate(${e.rot} 300 300)`}
        />
      ))}
      <circle cx="540" cy="260" r="6" fill="#dfe6ff" />
      <circle cx="90" cy="360" r="4" fill="#dfe6ff" />
      {Array.from({ length: 60 }).map((_, i) => (
        <circle
          key={i}
          cx={(i * 137) % 600}
          cy={(i * 251) % 600}
          r={i % 5 === 0 ? 1.6 : 0.9}
          fill="#8890a6"
          opacity="0.6"
        />
      ))}
    </svg>
  );
}

export function VelocityJetArt() {
  return (
    <svg viewBox="0 0 600 600" className={base} preserveAspectRatio="xMidYMid slice">
      {defs}
      <rect width="600" height="600" fill="#04050a" />
      <rect width="600" height="600" fill="url(#gk-grid)" />
      <ellipse cx="260" cy="320" rx="320" ry="140" fill="url(#gk-glow)" opacity="0.7" />
      <g stroke="#dfe6ff" strokeWidth="1.6" fill="none" strokeLinejoin="round">
        <path d="M120 320 L360 300 L520 260 L500 285 L360 320 L500 355 L520 380 L360 340 Z" fill="#0a0d17" />
        <path d="M120 320 L360 300 L520 260 L500 285 L360 320 L500 355 L520 380 L360 340 Z" />
        <path d="M220 300 L220 220 L260 300" opacity="0.7" />
        <path d="M220 340 L220 420 L260 340" opacity="0.7" />
      </g>
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={60 - i * 40}
          y1={320 + i * 14}
          x2={140 - i * 40}
          y2={320 + i * 14}
          stroke="#6f8fff"
          strokeOpacity={0.6 - i * 0.15}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}

export function ArenaProtocolArt() {
  return (
    <svg viewBox="0 0 600 600" className={base} preserveAspectRatio="xMidYMid slice">
      {defs}
      <rect width="600" height="600" fill="#04050a" />
      <ellipse cx="300" cy="420" rx="280" ry="120" fill="url(#gk-glow)" opacity="0.8" />
      {[220, 170, 120, 70].map((r, i) => (
        <ellipse
          key={r}
          cx="300"
          cy="420"
          rx={r}
          ry={r * 0.42}
          fill="none"
          stroke="#6f8fff"
          strokeOpacity={0.55 - i * 0.1}
          strokeWidth="1.2"
        />
      ))}
      <rect x="230" y="120" width="140" height="180" fill="#0a0d17" stroke="url(#gk-line)" />
      <polygon points="230,120 370,120 300,80" fill="#3b5bff" fillOpacity="0.3" stroke="#6f8fff" />
      {Array.from({ length: 6 }).map((_, i) => (
        <rect key={i} x={244 + i * 18} y={150 + (i % 2) * 30} width="10" height="40" fill="#6f8fff" opacity="0.6" />
      ))}
    </svg>
  );
}

export function ApexConceptArt() {
  return (
    <svg viewBox="0 0 600 600" className={base} preserveAspectRatio="xMidYMid slice">
      {defs}
      <rect width="600" height="600" fill="#04050a" />
      <rect width="600" height="600" fill="url(#gk-grid)" />
      <ellipse cx="300" cy="360" rx="300" ry="120" fill="url(#gk-glow)" />
      <g stroke="#dfe6ff" strokeWidth="1.6" fill="#0a0d17">
        <path d="M120 380 Q160 300 260 290 L380 290 Q460 300 490 370 L470 400 L140 400 Z" />
        <path d="M180 400 q10 40 55 40 q45 0 55 -40" fill="none" />
        <path d="M370 400 q10 40 55 40 q45 0 55 -40" fill="none" />
      </g>
      <rect x="250" y="300" width="110" height="30" fill="#3b5bff" fillOpacity="0.35" stroke="#6f8fff" />
      {[0, 1, 2, 3].map((i) => (
        <line
          key={i}
          x1={40}
          y1={430 + i * 10}
          x2={140 - i * 20}
          y2={430 + i * 10}
          stroke="#6f8fff"
          strokeOpacity={0.5 - i * 0.1}
          strokeWidth="2"
        />
      ))}
    </svg>
  );
}
