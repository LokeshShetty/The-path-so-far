/**
 * Bespoke animated SVG illustrations for each featured work card.
 * One file, dispatched by `variant`. All animations are pure CSS so they're
 * compositor-only and don't add JS work. Plays continuously.
 *
 * Variants:
 *   desktop    — Tauri IDE window (code + terminal + agent badge)
 *   dag        — node-based workflow with flowing edges
 *   schema     — JSON schema → form / table / kanban
 *   layout     — Vite-style isometric stack
 *   table      — data table with dragging column + filter chips
 *   auth       — central shield with concentric labelled rings
 *   billing    — invoice + animated signature
 *   extension  — chrome browser frame with extension popup
 *   survey     — multi-channel chart with animated bars
 *   kyara      — AI insights chatbot — chat thread with embedded chart
 */

export type WorkArtVariant =
  | "desktop"
  | "dag"
  | "schema"
  | "layout"
  | "table"
  | "auth"
  | "billing"
  | "extension"
  | "survey"
  | "kyara";

const ART_CSS = `
  .wa-root { position: absolute; inset: 0; }
  .wa-svg  { width: 100%; height: 100%; display: block; }

  @keyframes wa-pulse        { 0%,100% { opacity: 0.45 } 50% { opacity: 1 } }
  @keyframes wa-blink        { 0%,49%  { opacity: 1 } 50%,100% { opacity: 0 } }
  @keyframes wa-flow         { to { stroke-dashoffset: -40 } }
  @keyframes wa-rise         { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-4px) } }
  @keyframes wa-spin         { to { transform: rotate(360deg) } }
  @keyframes wa-sweep        { 0% { transform: translateX(-30%) } 100% { transform: translateX(130%) } }
  @keyframes wa-grow         { 0% { transform: scaleY(0.2) } 100% { transform: scaleY(1) } }
  @keyframes wa-ring-out     { 0% { transform: scale(0.7); opacity: 0.7 } 100% { transform: scale(1.4); opacity: 0 } }
  @keyframes wa-fadeup       { 0% { opacity: 0; transform: translateY(8px) } 100% { opacity: 1; transform: translateY(0) } }
  @keyframes wa-drag         { 0%,100% { transform: translateX(0) } 50% { transform: translateX(14px) } }
  @keyframes wa-type         { 0% { width: 0 } 100% { width: 100% } }

  .wa-pulse  { animation: wa-pulse 2.4s ease-in-out infinite; }
  .wa-blink  { animation: wa-blink 1.05s steps(2, end) infinite; }
  .wa-flow   { stroke-dasharray: 4 6; animation: wa-flow 1.4s linear infinite; }
  .wa-rise   { animation: wa-rise 4s ease-in-out infinite; transform-origin: center; }
  .wa-spin   { animation: wa-spin 14s linear infinite; transform-origin: center; }
  .wa-sweep  { animation: wa-sweep 4s ease-in-out infinite; }
  .wa-grow   { animation: wa-grow 1.6s ease-out forwards; transform-origin: bottom; }
  .wa-ring   { transform-origin: center; animation: wa-ring-out 2.8s ease-out infinite; }
  .wa-drag   { animation: wa-drag 3.2s ease-in-out infinite; }
  .wa-type   { animation: wa-type 3s steps(40, end) infinite; }

  @media (prefers-reduced-motion: reduce) {
    .wa-pulse,.wa-blink,.wa-rise,.wa-spin,.wa-sweep,.wa-ring,.wa-drag,.wa-type,.wa-flow {
      animation: none !important;
    }
  }
`;

/* ----- shared bg helpers ---------------------------------------------- */
function ArtBg({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-bg`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#1a1330" stopOpacity="1" />
        <stop offset="100%" stopColor="#0a0a0f" stopOpacity="1" />
      </linearGradient>
      <linearGradient id={`${id}-grad`} x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#6366F1" />
        <stop offset="50%" stopColor="#A855F7" />
        <stop offset="100%" stopColor="#EC4899" />
      </linearGradient>
      <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#A855F7" stopOpacity="0.6" />
        <stop offset="100%" stopColor="#A855F7" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

/* ----- variants ------------------------------------------------------- */
function Desktop() {
  return (
    <svg viewBox="0 0 400 250" className="wa-svg" preserveAspectRatio="xMidYMid slice">
      <ArtBg id="d" />
      <rect width="400" height="250" fill="url(#d-bg)" />
      <ellipse cx="200" cy="125" rx="140" ry="80" fill="url(#d-glow)" opacity="0.5" />

      {/* window frame */}
      <g className="wa-rise">
        <rect x="50" y="40" width="300" height="170" rx="10" fill="#0e0a1c" stroke="rgba(168,85,247,0.4)" strokeWidth="1" />
        {/* title bar */}
        <rect x="50" y="40" width="300" height="22" rx="10" fill="#15102a" />
        <circle cx="62" cy="51" r="3" fill="#ef4444" />
        <circle cx="74" cy="51" r="3" fill="#eab308" />
        <circle cx="86" cy="51" r="3" fill="#22c55e" />
        <text x="200" y="55" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.4)">superagi-chat</text>

        {/* sidebar */}
        <rect x="50" y="62" width="60" height="148" fill="#0a0716" />
        <rect x="58" y="74" width="44" height="6" rx="2" fill="rgba(168,85,247,0.5)" />
        <rect x="58" y="86" width="36" height="4" rx="1.5" fill="rgba(255,255,255,0.15)" />
        <rect x="58" y="96" width="40" height="4" rx="1.5" fill="rgba(255,255,255,0.15)" />
        <rect x="58" y="106" width="32" height="4" rx="1.5" fill="rgba(255,255,255,0.15)" />

        {/* code area */}
        <rect x="116" y="74" width="170" height="84" rx="2" fill="#070510" />
        <rect x="124" y="82" width="60" height="3" rx="1" fill="#A855F7" />
        <rect x="124" y="90" width="120" height="3" rx="1" fill="rgba(255,255,255,0.4)" />
        <rect x="132" y="98" width="80" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
        <rect x="132" y="106" width="100" height="3" rx="1" fill="rgba(99,102,241,0.7)" />
        <rect x="124" y="114" width="50" height="3" rx="1" fill="rgba(236,72,153,0.7)" />
        <rect x="124" y="122" width="90" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
        <rect x="132" y="130" width="70" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
        <rect x="124" y="138" width="40" height="3" rx="1" fill="rgba(255,255,255,0.4)" />
        <rect x="170" y="138" width="2" height="3" fill="#A855F7" className="wa-blink" />

        {/* terminal */}
        <rect x="116" y="164" width="226" height="40" rx="2" fill="#050308" />
        <text x="124" y="178" fontSize="7" fontFamily="monospace" fill="#34d399">$ claude run</text>
        <text x="124" y="190" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.5)">› indexing context...</text>
        <rect x="124" y="194" width="80" height="2" rx="1" fill="rgba(168,85,247,0.6)" />

        {/* right tools panel */}
        <rect x="290" y="74" width="52" height="84" rx="2" fill="#0a0716" />
        <rect x="298" y="82" width="36" height="4" rx="1.5" fill="rgba(168,85,247,0.4)" />
        <rect x="298" y="92" width="28" height="4" rx="1.5" fill="rgba(255,255,255,0.15)" />
        <rect x="298" y="102" width="32" height="4" rx="1.5" fill="rgba(255,255,255,0.15)" />
      </g>

      {/* floating Agent badge */}
      <g className="wa-rise" style={{ animationDelay: "1s" }}>
        <rect x="270" y="22" width="92" height="22" rx="11" fill="url(#d-grad)" opacity="0.95" />
        <circle cx="284" cy="33" r="4" fill="white" className="wa-pulse" />
        <text x="298" y="36" fontSize="9" fontFamily="monospace" fill="white" fontWeight="700">CODER · AGENT</text>
      </g>
    </svg>
  );
}

function Dag() {
  // 4 nodes in a small DAG, with flowing edges between them
  const N = (
    x: number,
    y: number,
    label: string,
    color: string,
    delay = 0,
  ) => (
    <g className="wa-rise" style={{ animationDelay: `${delay}s` }}>
      <rect x={x} y={y} width="74" height="34" rx="8" fill="#0e0a1c" stroke={color} strokeWidth="1.2" />
      <circle cx={x + 12} cy={y + 17} r="4" fill={color} />
      <rect x={x + 22} y={y + 11} width="44" height="3.5" rx="1" fill="rgba(255,255,255,0.85)" />
      <rect x={x + 22} y={y + 18} width="32" height="3" rx="1" fill="rgba(255,255,255,0.35)" />
      <text x={x + 37} y={y - 4} fontSize="6" fontFamily="monospace" textAnchor="middle" fill="rgba(255,255,255,0.45)">
        {label}
      </text>
    </g>
  );

  return (
    <svg viewBox="0 0 400 250" className="wa-svg" preserveAspectRatio="xMidYMid slice">
      <ArtBg id="g" />
      <rect width="400" height="250" fill="url(#g-bg)" />
      <ellipse cx="200" cy="125" rx="160" ry="90" fill="url(#g-glow)" opacity="0.4" />

      {/* edges */}
      <g fill="none" strokeWidth="1.5">
        <path d="M124,72 C170,72 170,134 216,134" stroke="rgba(168,85,247,0.55)" />
        <path d="M124,72 C170,72 170,134 216,134" stroke="#A855F7" className="wa-flow" />
        <path d="M290,134 C320,134 310,72 350,72" stroke="rgba(99,102,241,0.55)" strokeDasharray="" />
        <path d="M290,134 C320,134 310,72 350,72" stroke="#6366F1" className="wa-flow" />
        <path d="M290,134 C320,134 310,196 350,196" stroke="rgba(236,72,153,0.55)" />
        <path d="M290,134 C320,134 310,196 350,196" stroke="#EC4899" className="wa-flow" />
      </g>

      {N(50, 55, "TRIGGER", "#A855F7", 0)}
      {N(216, 117, "CONDITION", "#A855F7", 0.3)}
      {N(330, 55, "ACTION", "#6366F1", 0.6)}
      {N(330, 179, "WEBHOOK", "#EC4899", 0.9)}

      {/* port dots */}
      {[124, 124, 216, 290, 290, 350, 350].map((cx, i) => (
        <circle
          key={i}
          cx={cx}
          cy={[72, 72, 134, 134, 134, 72, 196][i]}
          r="2"
          fill="#A855F7"
        />
      ))}
    </svg>
  );
}

function Schema() {
  return (
    <svg viewBox="0 0 400 250" className="wa-svg" preserveAspectRatio="xMidYMid slice">
      <ArtBg id="s" />
      <rect width="400" height="250" fill="url(#s-bg)" />
      <ellipse cx="200" cy="135" rx="160" ry="80" fill="url(#s-glow)" opacity="0.4" />

      {/* schema panel (top-left) */}
      <g className="wa-rise">
        <rect x="32" y="34" width="150" height="100" rx="8" fill="#0e0a1c" stroke="rgba(168,85,247,0.45)" />
        <rect x="32" y="34" width="150" height="14" rx="8" fill="#15102a" />
        <text x="40" y="44" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.5)">schema.json</text>

        <text x="40" y="60" fontSize="8" fontFamily="monospace" fill="#A855F7">{"{"}</text>
        <text x="48" y="72" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.6)">"name": <tspan fill="#34d399">"text"</tspan></text>
        <text x="48" y="84" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.6)">"email": <tspan fill="#34d399">"email"</tspan></text>
        <text x="48" y="96" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.6)">"stage": <tspan fill="#A855F7">"select"</tspan></text>
        <text x="48" y="108" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.6)">"value": <tspan fill="#EC4899">"currency"</tspan></text>
        <text x="48" y="120" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.4)">… 20 more</text>
        <text x="40" y="130" fontSize="8" fontFamily="monospace" fill="#A855F7">{"}"}</text>
      </g>

      {/* arrow */}
      <g>
        <path d="M186,84 L228,84" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" />
        <path d="M186,84 L228,84" stroke="#A855F7" strokeWidth="1.5" className="wa-flow" />
        <polygon points="226,80 232,84 226,88" fill="#A855F7" />
      </g>

      {/* generated UIs (right column) */}
      {/* Form */}
      <g className="wa-rise" style={{ animationDelay: "0.4s" }}>
        <rect x="240" y="40" width="130" height="56" rx="6" fill="#0e0a1c" stroke="rgba(168,85,247,0.3)" />
        <rect x="248" y="48" width="40" height="4" rx="1" fill="rgba(255,255,255,0.4)" />
        <rect x="248" y="56" width="114" height="10" rx="2" fill="#15102a" stroke="rgba(168,85,247,0.3)" />
        <rect x="248" y="72" width="40" height="4" rx="1" fill="rgba(255,255,255,0.4)" />
        <rect x="248" y="80" width="114" height="10" rx="2" fill="#15102a" stroke="rgba(168,85,247,0.3)" />
        <text x="364" y="50" textAnchor="end" fontSize="6" fontFamily="monospace" fill="rgba(168,85,247,0.7)">FORM</text>
      </g>

      {/* Table */}
      <g className="wa-rise" style={{ animationDelay: "0.8s" }}>
        <rect x="240" y="106" width="130" height="48" rx="6" fill="#0e0a1c" stroke="rgba(99,102,241,0.3)" />
        <rect x="240" y="106" width="130" height="12" rx="6" fill="#15102a" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={248 + i * 30} y={108} width="22" height="3" rx="1" fill="rgba(99,102,241,0.6)" />
        ))}
        {[0, 1, 2].map((row) => (
          <g key={row}>
            <line x1="240" y1={124 + row * 10} x2="370" y2={124 + row * 10} stroke="rgba(255,255,255,0.05)" />
            {[0, 1, 2, 3].map((c) => (
              <rect key={c} x={248 + c * 30} y={129 + row * 10} width="20" height="2.5" rx="1" fill="rgba(255,255,255,0.25)" />
            ))}
          </g>
        ))}
        <text x="364" y="116" textAnchor="end" fontSize="6" fontFamily="monospace" fill="rgba(99,102,241,0.7)">TABLE</text>
      </g>

      {/* Kanban */}
      <g className="wa-rise" style={{ animationDelay: "1.2s" }}>
        <rect x="240" y="164" width="130" height="50" rx="6" fill="#0e0a1c" stroke="rgba(236,72,153,0.3)" />
        {[0, 1, 2].map((c) => (
          <g key={c}>
            <rect x={246 + c * 42} y={172} width="38" height="38" rx="3" fill="#15102a" />
            <rect x={250 + c * 42} y={176} width="14" height="3" rx="1" fill="rgba(236,72,153,0.6)" />
            <rect x={250 + c * 42} y={184} width="30" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
            <rect x={250 + c * 42} y={192} width="22" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
            <rect x={250 + c * 42} y={200} width="26" height="3" rx="1" fill="rgba(255,255,255,0.25)" />
          </g>
        ))}
        <text x="364" y="174" textAnchor="end" fontSize="6" fontFamily="monospace" fill="rgba(236,72,153,0.7)">KANBAN</text>
      </g>
    </svg>
  );
}

function Layout() {
  // Vite-style isometric stack
  const layers = [
    { y: 30, label: "DETAIL", opacity: 0.35 },
    { y: 70, label: "TABLE", opacity: 0.55 },
    { y: 110, label: "FORM", opacity: 0.75, glow: true },
    { y: 150, label: "SCHEMA", opacity: 0.95 },
  ];
  return (
    <svg viewBox="0 0 400 250" className="wa-svg" preserveAspectRatio="xMidYMid slice">
      <ArtBg id="l" />
      <rect width="400" height="250" fill="url(#l-bg)" />
      <ellipse cx="200" cy="160" rx="180" ry="60" fill="url(#l-glow)" opacity="0.4" />

      {layers.map((L, i) => (
        <g key={i} className="wa-rise" style={{ animationDelay: `${i * 0.2}s` }}>
          {/* isometric panel: skewed parallelogram */}
          <g transform={`translate(110 ${L.y}) skewX(-25)`}>
            <rect
              width="180"
              height="50"
              rx="8"
              fill="#0e0a1c"
              stroke={L.glow ? "#A855F7" : "rgba(168,85,247,0.35)"}
              strokeWidth={L.glow ? 1.5 : 1}
              opacity={L.opacity}
            />
            {L.glow && (
              <rect width="180" height="50" rx="8" fill="url(#l-grad)" opacity="0.18" />
            )}
            <text x="14" y="30" fontSize="9" fontFamily="monospace" fill={L.glow ? "white" : "rgba(255,255,255,0.6)"} fontWeight={L.glow ? 700 : 400}>
              .{L.label}
            </text>
          </g>
        </g>
      ))}

      {/* connecting lines */}
      <g stroke="rgba(168,85,247,0.4)" strokeWidth="1" strokeDasharray="2 3">
        <line x1="170" y1="55" x2="170" y2="195" />
        <line x1="290" y1="55" x2="290" y2="195" />
      </g>
    </svg>
  );
}

function Table() {
  return (
    <svg viewBox="0 0 400 250" className="wa-svg" preserveAspectRatio="xMidYMid slice">
      <ArtBg id="t" />
      <rect width="400" height="250" fill="url(#t-bg)" />
      <ellipse cx="200" cy="135" rx="170" ry="80" fill="url(#t-glow)" opacity="0.35" />

      {/* filter chips */}
      <g className="wa-rise">
        <rect x="40" y="36" width="56" height="14" rx="7" fill="#15102a" stroke="rgba(168,85,247,0.4)" />
        <text x="68" y="46" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(168,85,247,0.9)">stage = won</text>
        <rect x="102" y="36" width="58" height="14" rx="7" fill="#15102a" stroke="rgba(99,102,241,0.4)" />
        <text x="131" y="46" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(99,102,241,0.9)">value &gt; 10k</text>
        <rect x="166" y="36" width="40" height="14" rx="7" fill="#15102a" stroke="rgba(236,72,153,0.4)" />
        <text x="186" y="46" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(236,72,153,0.9)">+ add</text>
      </g>

      {/* table */}
      <g>
        <rect x="40" y="62" width="320" height="170" rx="8" fill="#0e0a1c" stroke="rgba(168,85,247,0.3)" />
        {/* header */}
        <rect x="40" y="62" width="320" height="22" rx="8" fill="#15102a" />
        {[
          { x: 60, w: 44, label: "name" },
          { x: 130, w: 44, label: "stage" },
          { x: 200, w: 44, label: "value" },
          { x: 270, w: 44, label: "owner" },
        ].map((c, i) => (
          <g key={i}>
            <rect x={c.x} y={70} width={c.w} height={6} rx="1.5" fill="rgba(255,255,255,0.55)" />
            <text x={c.x + c.w + 4} y={76} fontSize="6" fill="rgba(255,255,255,0.3)">⇅</text>
          </g>
        ))}

        {/* dragging column indicator */}
        <g className="wa-drag">
          <rect x="186" y="58" width="60" height="32" rx="4" fill="rgba(168,85,247,0.18)" stroke="#A855F7" strokeDasharray="3 3" />
          <circle cx="216" cy="74" r="3.5" fill="#A855F7" />
          <text x="216" y="92" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="#A855F7">DRAGGING</text>
        </g>

        {/* rows */}
        {[0, 1, 2, 3, 4, 5].map((r) => (
          <g key={r} className="wa-rise" style={{ animationDelay: `${r * 0.15}s` }}>
            <line x1="40" y1={92 + r * 22} x2="360" y2={92 + r * 22} stroke="rgba(255,255,255,0.05)" />
            {[60, 130, 200, 270].map((x, i) => (
              <rect
                key={i}
                x={x}
                y={102 + r * 22}
                width={[44, 32, 36, 50][i]}
                height="5"
                rx="1.5"
                fill={i === 1 ? "rgba(168,85,247,0.4)" : "rgba(255,255,255,0.25)"}
              />
            ))}
          </g>
        ))}
      </g>

      {/* bulk action bar */}
      <g className="wa-rise" style={{ animationDelay: "0.8s" }}>
        <rect x="100" y="206" width="200" height="22" rx="11" fill="url(#t-grad)" opacity="0.95" />
        <text x="200" y="220" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="white" fontWeight="700">
          3 SELECTED · BULK EDIT · ASSIGN · EXPORT
        </text>
      </g>
    </svg>
  );
}

function Auth() {
  return (
    <svg viewBox="0 0 400 250" className="wa-svg" preserveAspectRatio="xMidYMid slice">
      <ArtBg id="a" />
      <rect width="400" height="250" fill="url(#a-bg)" />
      <ellipse cx="200" cy="125" rx="170" ry="80" fill="url(#a-glow)" opacity="0.5" />

      {/* concentric expanding rings */}
      <g style={{ transformOrigin: "200px 125px" }}>
        <circle cx="200" cy="125" r="40" stroke="#A855F7" fill="none" strokeWidth="1" className="wa-ring" />
        <circle cx="200" cy="125" r="40" stroke="#A855F7" fill="none" strokeWidth="1" className="wa-ring" style={{ animationDelay: "0.9s" }} />
        <circle cx="200" cy="125" r="40" stroke="#A855F7" fill="none" strokeWidth="1" className="wa-ring" style={{ animationDelay: "1.8s" }} />
      </g>

      {/* labelled rings */}
      {[
        { r: 50, label: "OIDC" },
        { r: 78, label: "RBAC · ABAC" },
        { r: 106, label: "gRPC · REST" },
        { r: 134, label: "MULTI-TENANT" },
      ].map((ring, i) => (
        <g key={ring.label} className="wa-rise" style={{ animationDelay: `${i * 0.15}s` }}>
          <circle cx="200" cy="125" r={ring.r} fill="none" stroke="rgba(168,85,247,0.25)" strokeDasharray="2 6" />
          <rect x={200 - ring.label.length * 3 - 6} y={125 - ring.r - 7} width={ring.label.length * 6 + 12} height="14" rx="7" fill="#0e0a1c" stroke="rgba(168,85,247,0.4)" />
          <text x="200" y={125 - ring.r + 3} textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.7)" fontWeight="700">
            {ring.label}
          </text>
        </g>
      ))}

      {/* central shield */}
      <g className="wa-rise">
        <circle cx="200" cy="125" r="26" fill="url(#a-grad)" />
        <circle cx="200" cy="125" r="26" fill="url(#a-grad)" opacity="0.4" className="wa-pulse" />
        <path
          d="M200,113 L211,118 L211,128 C211,134 206,140 200,142 C194,140 189,134 189,128 L189,118 Z"
          fill="white"
          fillOpacity="0.95"
        />
        <circle cx="200" cy="124" r="3" fill="#A855F7" />
        <rect x="198.5" y="125" width="3" height="6" fill="#A855F7" />
      </g>
    </svg>
  );
}

function Billing() {
  return (
    <svg viewBox="0 0 400 250" className="wa-svg" preserveAspectRatio="xMidYMid slice">
      <ArtBg id="b" />
      <rect width="400" height="250" fill="url(#b-bg)" />
      <ellipse cx="200" cy="135" rx="170" ry="80" fill="url(#b-glow)" opacity="0.4" />

      <g className="wa-rise">
        <rect x="60" y="30" width="200" height="190" rx="10" fill="#0e0a1c" stroke="rgba(168,85,247,0.4)" />
        {/* header */}
        <text x="76" y="58" fontSize="14" fontWeight="800" fill="white">INVOICE</text>
        <text x="76" y="72" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.4)">№ 2025-INV-0421</text>
        <rect x="200" y="44" width="48" height="20" rx="10" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.45)" />
        <text x="224" y="58" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="#22c55e" fontWeight="700">PAID</text>

        <line x1="76" y1="86" x2="244" y2="86" stroke="rgba(168,85,247,0.2)" />

        {/* line items */}
        {[
          { l: "SuperSales — Pro", v: "$1,200" },
          { l: "Mailbox provisioning", v: "$300" },
          { l: "LinkedIn outreach", v: "$450" },
          { l: "Domain warmup", v: "$120" },
        ].map((row, i) => (
          <g key={i} className="wa-rise" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
            <text x="76" y={104 + i * 16} fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.7)">{row.l}</text>
            <text x="244" y={104 + i * 16} textAnchor="end" fontSize="8" fontFamily="monospace" fill="white">{row.v}</text>
          </g>
        ))}

        <line x1="76" y1="174" x2="244" y2="174" stroke="rgba(168,85,247,0.2)" />
        <text x="76" y="190" fontSize="9" fontFamily="monospace" fill="rgba(255,255,255,0.5)">TOTAL</text>
        <text x="244" y="190" textAnchor="end" fontSize="11" fontWeight="800" fill="white">$2,070</text>

        {/* signature */}
        <text x="76" y="210" fontSize="6" fontFamily="monospace" fill="rgba(255,255,255,0.4)">SIGNED</text>
        <path
          d="M120,206 q 8 -10 18 0 t 18 0 t 18 0 q 6 -6 14 -2"
          fill="none"
          stroke="#A855F7"
          strokeWidth="1.2"
          strokeDasharray="200"
          strokeDashoffset="200"
          style={{ animation: "wa-flow-sig 2.6s ease-out forwards infinite" }}
        />
        <style>{`@keyframes wa-flow-sig { to { stroke-dashoffset: 0 } }`}</style>
      </g>

      {/* esign card hovering */}
      <g className="wa-rise" style={{ animationDelay: "0.5s" }} transform="translate(280 96) rotate(8)">
        <rect width="92" height="74" rx="8" fill="#0e0a1c" stroke="rgba(99,102,241,0.45)" />
        <text x="46" y="22" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(99,102,241,0.9)">E-SIGN</text>
        <line x1="10" y1="44" x2="82" y2="44" stroke="rgba(255,255,255,0.2)" strokeDasharray="2 2" />
        <path d="M14,42 q 6 -8 14 0 t 14 0 t 14 0" fill="none" stroke="white" strokeWidth="1.2" />
        <rect x="10" y="56" width="72" height="10" rx="5" fill="url(#b-grad)" />
        <text x="46" y="63" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="white" fontWeight="700">SUBMIT</text>
      </g>
    </svg>
  );
}

function Extension() {
  return (
    <svg viewBox="0 0 400 250" className="wa-svg" preserveAspectRatio="xMidYMid slice">
      <ArtBg id="x" />
      <rect width="400" height="250" fill="url(#x-bg)" />
      <ellipse cx="200" cy="135" rx="170" ry="80" fill="url(#x-glow)" opacity="0.4" />

      {/* browser frame */}
      <g className="wa-rise">
        <rect x="40" y="32" width="320" height="186" rx="10" fill="#0e0a1c" stroke="rgba(168,85,247,0.35)" />
        {/* tabs */}
        <rect x="40" y="32" width="320" height="22" rx="10" fill="#15102a" />
        <circle cx="52" cy="43" r="3" fill="#ef4444" />
        <circle cx="64" cy="43" r="3" fill="#eab308" />
        <circle cx="76" cy="43" r="3" fill="#22c55e" />
        <rect x="92" y="36" width="80" height="14" rx="3" fill="#0e0a1c" />
        <text x="100" y="46" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.5)">salesforce.com</text>
        {/* address bar */}
        <rect x="50" y="62" width="280" height="14" rx="7" fill="#0a0716" />
        <text x="62" y="72" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.4)">https://lightning.force.com/lead/00Q...</text>
        {/* extension icon */}
        <g className="wa-pulse">
          <rect x="338" y="60" width="18" height="18" rx="4" fill="url(#x-grad)" />
          <text x="347" y="73" textAnchor="middle" fontSize="9" fontFamily="monospace" fill="white" fontWeight="800">SF</text>
        </g>

        {/* content area + lead card */}
        <rect x="50" y="86" width="180" height="124" rx="6" fill="#0a0716" />
        <rect x="60" y="98" width="60" height="6" rx="1.5" fill="rgba(255,255,255,0.5)" />
        <rect x="60" y="110" width="120" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
        <rect x="60" y="118" width="100" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
        <rect x="60" y="128" width="60" height="6" rx="1.5" fill="rgba(99,102,241,0.7)" />
        <rect x="60" y="140" width="140" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
        <rect x="60" y="148" width="120" height="3" rx="1" fill="rgba(255,255,255,0.2)" />
      </g>

      {/* extension popup */}
      <g className="wa-rise" style={{ animationDelay: "0.6s" }}>
        <rect x="240" y="86" width="116" height="124" rx="8" fill="#0e0a1c" stroke="rgba(168,85,247,0.5)" />
        <rect x="240" y="86" width="116" height="20" rx="8" fill="url(#x-grad)" />
        <text x="298" y="100" textAnchor="middle" fontSize="8" fontFamily="monospace" fill="white" fontWeight="800">SUPERAGI</text>

        {/* action buttons */}
        {["Add to sequence", "Quick email", "Quick call", "Sync to CRM"].map((action, i) => (
          <g key={i} className="wa-rise" style={{ animationDelay: `${0.8 + i * 0.1}s` }}>
            <rect x="248" y={114 + i * 22} width="100" height="18" rx="4" fill="#15102a" stroke="rgba(168,85,247,0.25)" />
            <circle cx="258" cy={123 + i * 22} r="3" fill="#A855F7" />
            <text x="266" y={126 + i * 22} fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.85)">{action}</text>
          </g>
        ))}

        {/* MV3 badge */}
        <rect x="248" y="94" width="32" height="8" rx="4" fill="rgba(255,255,255,0.18)" />
        <text x="264" y="100" textAnchor="middle" fontSize="5" fontFamily="monospace" fill="white" fontWeight="700">MV3</text>
      </g>
    </svg>
  );
}

function Survey() {
  const bars = [
    { x: 60, h: 80, label: "Gmail", color: "#A855F7" },
    { x: 100, h: 110, label: "WApp", color: "#34d399" },
    { x: 140, h: 60, label: "SMS", color: "#EC4899" },
    { x: 180, h: 130, label: "Push", color: "#6366F1" },
    { x: 220, h: 95, label: "Slack", color: "#A855F7" },
    { x: 260, h: 70, label: "Web", color: "#EC4899" },
    { x: 300, h: 105, label: "iOS", color: "#6366F1" },
  ];

  return (
    <svg viewBox="0 0 400 250" className="wa-svg" preserveAspectRatio="xMidYMid slice">
      <ArtBg id="v" />
      <rect width="400" height="250" fill="url(#v-bg)" />
      <ellipse cx="200" cy="135" rx="170" ry="80" fill="url(#v-glow)" opacity="0.4" />

      {/* axis */}
      <line x1="40" y1="200" x2="360" y2="200" stroke="rgba(255,255,255,0.18)" />
      <line x1="40" y1="40" x2="40" y2="200" stroke="rgba(255,255,255,0.08)" />

      {/* bars */}
      {bars.map((b, i) => (
        <g key={i}>
          <rect
            x={b.x}
            y={200 - b.h}
            width="22"
            height={b.h}
            rx="3"
            fill={b.color}
            opacity="0.85"
            className="wa-grow"
            style={{ animationDelay: `${i * 0.1}s`, transformOrigin: `${b.x + 11}px 200px` }}
          />
          <text x={b.x + 11} y={216} textAnchor="middle" fontSize="6" fontFamily="monospace" fill="rgba(255,255,255,0.45)">
            {b.label}
          </text>
        </g>
      ))}

      {/* badge */}
      <g className="wa-rise">
        <rect x="220" y="32" width="148" height="40" rx="8" fill="#0e0a1c" stroke="rgba(168,85,247,0.4)" />
        <circle cx="240" cy="52" r="6" fill="#A855F7" className="wa-pulse" />
        <text x="252" y="50" fontSize="9" fontFamily="monospace" fill="white" fontWeight="800">5,000+ / day</text>
        <text x="252" y="62" fontSize="6" fontFamily="monospace" fill="rgba(255,255,255,0.4)">95% delivery rate</text>
      </g>

      {/* sweep highlight */}
      <g style={{ overflow: "hidden" }}>
        <rect className="wa-sweep" x="0" y="40" width="60" height="170" rx="2" fill="url(#v-glow)" opacity="0.55" />
      </g>
    </svg>
  );
}

function Kyara() {
  // Conversational analytics — Kyara chat panel: a question bubble,
  // a typing indicator, and a response containing a sparkline + insight
  // chip. Sparkles drift around the panel.
  return (
    <svg viewBox="0 0 400 250" className="wa-svg" preserveAspectRatio="xMidYMid slice">
      <ArtBg id="k" />
      <rect width="400" height="250" fill="url(#k-bg)" />
      <ellipse cx="200" cy="135" rx="170" ry="80" fill="url(#k-glow)" opacity="0.45" />

      {/* Chat panel frame */}
      <g className="wa-rise">
        <rect x="38" y="28" width="324" height="194" rx="14" fill="#0e0a1c" stroke="rgba(168,85,247,0.45)" />
        {/* Header */}
        <rect x="38" y="28" width="324" height="26" rx="14" fill="#15102a" />
        <circle cx="58" cy="41" r="6" fill="url(#k-grad)" />
        <text x="68" y="44" fontSize="9" fontFamily="monospace" fontWeight="800" fill="white">KYARA · INSIGHTS</text>
        <rect x="320" y="35" width="34" height="12" rx="6" fill="rgba(34,197,94,0.15)" stroke="rgba(34,197,94,0.4)" />
        <text x="337" y="44" textAnchor="middle" fontSize="6" fontFamily="monospace" fill="#22c55e" fontWeight="700">LIVE</text>
      </g>

      {/* User question bubble (right-aligned) */}
      <g className="wa-rise" style={{ animationDelay: "0.2s" }}>
        <rect x="160" y="68" width="186" height="28" rx="14" fill="url(#k-grad)" />
        <text x="172" y="86" fontSize="9" fontFamily="monospace" fill="white" fontWeight="600">
          how is engagement in APAC?
        </text>
        {/* Tail */}
        <path d="M346,90 L356,96 L346,96 Z" fill="#EC4899" />
      </g>

      {/* Bot response — chart + insight */}
      <g className="wa-rise" style={{ animationDelay: "0.6s" }}>
        <rect x="54" y="108" width="248" height="86" rx="12" fill="#15102a" stroke="rgba(168,85,247,0.35)" />
        {/* Tail */}
        <path d="M52,134 L42,140 L52,140 Z" fill="#15102a" stroke="rgba(168,85,247,0.35)" />

        {/* Sparkline chart */}
        <g transform="translate(64 118)">
          <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.08)" />
          <polyline
            points="0,30 14,28 28,22 42,18 56,12 70,16 84,8 100,4"
            fill="none"
            stroke="url(#k-grad)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="200"
            strokeDashoffset="200"
            style={{ animation: "wa-flow-sig 2.2s ease-out forwards infinite" }}
          />
          {/* trailing dot */}
          <circle cx="100" cy="4" r="3" fill="white" className="wa-pulse" />
          <style>{`@keyframes wa-flow-sig { to { stroke-dashoffset: 0 } }`}</style>
        </g>

        {/* Insight chips */}
        <g transform="translate(176 116)">
          <rect width="116" height="20" rx="10" fill="rgba(34,197,94,0.14)" stroke="rgba(34,197,94,0.45)" />
          <circle cx="14" cy="10" r="3" fill="#22c55e" />
          <text x="22" y="14" fontSize="8" fontFamily="monospace" fill="#22c55e" fontWeight="700">+23% MoM</text>
          <text x="74" y="14" fontSize="6" fontFamily="monospace" fill="rgba(255,255,255,0.45)">healthy</text>
        </g>
        <g transform="translate(176 142)">
          <rect width="116" height="20" rx="10" fill="rgba(168,85,247,0.14)" stroke="rgba(168,85,247,0.45)" />
          <text x="58" y="14" textAnchor="middle" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.85)">312 surveys</text>
        </g>

        {/* Body line */}
        <text x="64" y="178" fontSize="8" fontFamily="monospace" fill="rgba(255,255,255,0.7)">
          Strong lift across leadership cohort.
        </text>
        <text x="64" y="190" fontSize="7" fontFamily="monospace" fill="rgba(255,255,255,0.4)">
          tap to drill down →
        </text>
      </g>

      {/* Typing indicator (next message) */}
      <g className="wa-rise" style={{ animationDelay: "1.2s" }}>
        <rect x="54" y="200" width="44" height="14" rx="7" fill="#15102a" stroke="rgba(168,85,247,0.35)" />
        <circle cx="64" cy="207" r="2" fill="rgba(168,85,247,0.9)" className="wa-pulse" />
        <circle cx="74" cy="207" r="2" fill="rgba(168,85,247,0.9)" className="wa-pulse" style={{ animationDelay: "0.3s" }} />
        <circle cx="84" cy="207" r="2" fill="rgba(168,85,247,0.9)" className="wa-pulse" style={{ animationDelay: "0.6s" }} />
      </g>

      {/* Floating sparkles (AI feel) */}
      <g fill="#A855F7">
        <g className="wa-rise" style={{ animationDelay: "0.4s" }} transform="translate(28 78)">
          <path d="M 0 -5 L 1 -1 L 5 0 L 1 1 L 0 5 L -1 1 L -5 0 L -1 -1 Z" />
        </g>
        <g className="wa-rise" style={{ animationDelay: "0.9s" }} transform="translate(372 96) scale(0.7)">
          <path d="M 0 -5 L 1 -1 L 5 0 L 1 1 L 0 5 L -1 1 L -5 0 L -1 -1 Z" fill="#EC4899" />
        </g>
        <g className="wa-rise" style={{ animationDelay: "1.4s" }} transform="translate(20 168) scale(0.6)">
          <path d="M 0 -5 L 1 -1 L 5 0 L 1 1 L 0 5 L -1 1 L -5 0 L -1 -1 Z" fill="#6366F1" />
        </g>
      </g>
    </svg>
  );
}

/* ----- export --------------------------------------------------------- */
export default function WorkArt({ variant }: { variant: WorkArtVariant }) {
  return (
    <div className="wa-root">
      <style>{ART_CSS}</style>
      {variant === "desktop" && <Desktop />}
      {variant === "dag" && <Dag />}
      {variant === "schema" && <Schema />}
      {variant === "layout" && <Layout />}
      {variant === "table" && <Table />}
      {variant === "auth" && <Auth />}
      {variant === "billing" && <Billing />}
      {variant === "extension" && <Extension />}
      {variant === "survey" && <Survey />}
      {variant === "kyara" && <Kyara />}
    </div>
  );
}
