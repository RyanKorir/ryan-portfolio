// Decorative skyline silhouette for the hero. Generated from a fixed seed so
// server and client render identically; a handful of windows blink slowly.

interface Win {
  x: number;
  y: number;
  blink: boolean;
  delay: number;
  dur: number;
}

interface Building {
  x: number;
  w: number;
  h: number;
  windows: Win[];
}

const VIEW_W = 1200;
const VIEW_H = 200;

function buildSkyline(): Building[] {
  let seed = 11;
  const rnd = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };

  const buildings: Building[] = [];
  let x = -10;
  while (x < VIEW_W) {
    const w = 24 + Math.floor(rnd() * 40);
    const h = 40 + Math.floor(rnd() * 130);
    const windows: Win[] = [];
    const cols = Math.floor((w - 8) / 10);
    const rows = Math.floor((h - 14) / 14);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        if (rnd() > 0.84) {
          windows.push({
            x: x + 6 + c * 10,
            y: VIEW_H - h + 8 + r * 14,
            blink: rnd() > 0.55,
            delay: Math.round(rnd() * 60) / 10,
            dur: 3 + Math.round(rnd() * 50) / 10
          });
        }
      }
    }
    buildings.push({ x, w, h, windows });
    x += w + Math.floor(rnd() * 6);
  }
  return buildings;
}

const BUILDINGS = buildSkyline();

export default function Skyline() {
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      preserveAspectRatio="xMidYMax slice"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full sm:h-56"
    >
      <defs>
        <linearGradient id="skyline-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#101a2c" />
          <stop offset="1" stopColor="#070b14" />
        </linearGradient>
      </defs>
      {BUILDINGS.map((b, i) => (
        <rect key={i} x={b.x} y={VIEW_H - b.h} width={b.w} height={b.h} fill="url(#skyline-fill)" opacity={0.92} />
      ))}
      {BUILDINGS.flatMap((b, i) =>
        b.windows.map((win, j) => (
          <rect
            key={`${i}-${j}`}
            x={win.x}
            y={win.y}
            width={3}
            height={5}
            className={win.blink ? "win win-blink" : "win"}
            style={win.blink ? ({ "--d": `${win.dur}s`, animationDelay: `${win.delay}s` } as React.CSSProperties) : undefined}
          />
        ))
      )}
    </svg>
  );
}
