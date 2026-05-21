const STROKE = "var(--color-ink)";
const FAINT = "var(--color-line-strong)";
const ACCENT = "var(--color-lilac-300)";
const ACCENT_SOFT = "var(--color-lilac-100)";

function FrameIllustration() {
  return (
    <g>
      <rect
        x="50"
        y="40"
        width="140"
        height="140"
        rx="10"
        fill="var(--color-canvas)"
        stroke={FAINT}
        strokeWidth="1"
      />
      <rect x="68" y="58" width="60" height="6" rx="2" fill={STROKE} />
      <rect x="68" y="70" width="90" height="4" rx="2" fill={FAINT} />

      {[92, 114, 136, 158].map((y, i) => (
        <g key={y}>
          <rect
            x="68"
            y={y}
            width="14"
            height="14"
            rx="4"
            fill={i < 2 ? ACCENT_SOFT : "transparent"}
            stroke={i < 2 ? ACCENT : FAINT}
            strokeWidth="1"
          />
          {i < 2 && (
            <path
              d={`M${72} ${y + 7} L${77} ${y + 11} L${83} ${y + 4}`}
              fill="none"
              stroke={ACCENT}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
          <rect x="92" y={y + 4} width="80" height="3" rx="1.5" fill={FAINT} />
          <rect x="92" y={y + 10} width="50" height="3" rx="1.5" fill="var(--color-line)" />
        </g>
      ))}
    </g>
  );
}

function DesignIllustration() {
  return (
    <g>
      <rect
        x="30"
        y="40"
        width="180"
        height="140"
        rx="10"
        fill="var(--color-canvas)"
        stroke={FAINT}
        strokeWidth="1"
      />
      <line x1="30" y1="58" x2="210" y2="58" stroke={FAINT} strokeWidth="1" />
      <circle cx="42" cy="49" r="2" fill={FAINT} />
      <circle cx="50" cy="49" r="2" fill={FAINT} />
      <circle cx="58" cy="49" r="2" fill={FAINT} />

      <rect x="44" y="72" width="50" height="44" rx="6" fill={ACCENT_SOFT} stroke={ACCENT} strokeWidth="1" />
      <circle cx="69" cy="89" r="6" fill={ACCENT} />
      <rect x="58" y="100" width="22" height="3" rx="1.5" fill="var(--color-lilac-400)" opacity="0.55" />

      <rect x="104" y="72" width="100" height="20" rx="4" fill="var(--color-line)" opacity="0.6" />
      <rect x="104" y="98" width="80" height="3" rx="1.5" fill={FAINT} />
      <rect x="104" y="106" width="100" height="3" rx="1.5" fill={FAINT} />
      <rect x="104" y="114" width="60" height="3" rx="1.5" fill={FAINT} />

      <rect x="44" y="128" width="76" height="38" rx="6" fill="none" stroke={FAINT} strokeWidth="1" strokeDasharray="3 3" />
      <rect x="128" y="128" width="76" height="38" rx="6" fill="none" stroke={FAINT} strokeWidth="1" />
      <rect x="138" y="142" width="40" height="4" rx="2" fill={STROKE} />
      <rect x="138" y="152" width="56" height="3" rx="1.5" fill={FAINT} />
    </g>
  );
}

function BuildIllustration() {
  return (
    <g>
      <rect
        x="30"
        y="40"
        width="180"
        height="140"
        rx="10"
        fill="var(--color-canvas)"
        stroke={FAINT}
        strokeWidth="1"
      />
      <rect x="30" y="40" width="180" height="20" rx="10" fill="var(--color-canvas-elevated)" />
      <path d="M30 50 L210 50" stroke="var(--color-line)" strokeWidth="0.5" />
      <circle cx="42" cy="50" r="2" fill={FAINT} />
      <circle cx="50" cy="50" r="2" fill={FAINT} />
      <circle cx="58" cy="50" r="2" fill={FAINT} />

      <text x="46" y="80" fill={ACCENT} fontFamily="ui-monospace, monospace" fontSize="9">$</text>
      <rect x="56" y="74" width="86" height="4" rx="1" fill={STROKE} />

      <rect x="46" y="92" width="6" height="4" rx="1" fill={FAINT} />
      <rect x="56" y="92" width="120" height="4" rx="1" fill={FAINT} />

      <rect x="46" y="104" width="6" height="4" rx="1" fill={FAINT} />
      <rect x="56" y="104" width="100" height="4" rx="1" fill="var(--color-mint-400)" opacity="0.7" />

      <rect x="46" y="116" width="6" height="4" rx="1" fill={FAINT} />
      <rect x="56" y="116" width="140" height="4" rx="1" fill={FAINT} />

      <rect x="46" y="128" width="6" height="4" rx="1" fill={FAINT} />
      <rect x="56" y="128" width="74" height="4" rx="1" fill="var(--color-mint-400)" opacity="0.7" />

      <text x="46" y="156" fill={ACCENT} fontFamily="ui-monospace, monospace" fontSize="9">$</text>
      <rect x="56" y="150" width="40" height="4" rx="1" fill={STROKE} />
      <rect x="100" y="150" width="6" height="4" rx="1" fill={ACCENT} className="animate-pulse" />
    </g>
  );
}

function OperateIllustration() {
  return (
    <g>
      <rect
        x="30"
        y="40"
        width="180"
        height="140"
        rx="10"
        fill="var(--color-canvas)"
        stroke={FAINT}
        strokeWidth="1"
      />
      <rect x="46" y="56" width="60" height="6" rx="2" fill={STROKE} />
      <rect x="46" y="68" width="40" height="4" rx="2" fill={FAINT} />

      <circle cx="186" cy="62" r="6" fill="var(--color-mint-100)" stroke="var(--color-mint-400)" strokeWidth="1" />
      <circle cx="186" cy="62" r="2" fill="var(--color-mint-400)" />

      <path
        d="M46 140 L70 130 L94 134 L118 116 L142 122 L166 100 L194 110"
        fill="none"
        stroke={ACCENT}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M46 140 L70 130 L94 134 L118 116 L142 122 L166 100 L194 110 L194 160 L46 160 Z"
        fill={ACCENT_SOFT}
        opacity="0.55"
      />
      <circle cx="194" cy="110" r="3" fill={ACCENT} />
      <circle cx="194" cy="110" r="7" fill="none" stroke={ACCENT} strokeWidth="1" opacity="0.4" />

      {[100, 120, 140, 160].map((y) => (
        <line
          key={y}
          x1="46"
          y1={y}
          x2="194"
          y2={y}
          stroke={FAINT}
          strokeWidth="0.5"
          strokeDasharray="2 3"
        />
      ))}
    </g>
  );
}

const SHAPES = [FrameIllustration, DesignIllustration, BuildIllustration, OperateIllustration];

export function ProcessShape({ index }: { index: number }) {
  return (
    <svg
      viewBox="0 0 240 220"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
    >
      {SHAPES.map((Shape, i) => (
        <g key={i} style={{ opacity: i === index ? 1 : 0, transition: "opacity 350ms cubic-bezier(0.32, 0.72, 0, 1)" }}>
          <Shape />
        </g>
      ))}
    </svg>
  );
}
