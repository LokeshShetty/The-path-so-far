import { useEffect, useState } from "react";

function fmtTime(d: Date) {
  return d.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "Asia/Kolkata",
  });
}

const BUILD = Math.random().toString(36).slice(2, 9);

export default function HeroStatusBar() {
  const [time, setTime] = useState(() => fmtTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(fmtTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="hidden md:flex items-center justify-between gap-6 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/40 border-t border-fg/5 mt-12 pt-4">
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
        Online
      </div>
      <div>Bangalore · IST {time}</div>
      <div className="hidden lg:block">12.97°N · 77.59°E</div>
      <div>Build · {BUILD}</div>
    </div>
  );
}
