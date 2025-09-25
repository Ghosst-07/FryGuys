"use client";

import { useEffect, useState, useRef, useCallback } from "react";

// Target launch date (placeholder)
const LAUNCH_DATE = new Date("2025-12-31T18:30:00.000Z"); // Adjust as needed

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState(() => targetDate - new Date());
  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(targetDate - new Date());
    }, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  if (timeLeft < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function ComingSoon() {
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);
  const [secretOpen, setSecretOpen] = useState(false);
  const modalRef = useRef(null);
  const [typed, setTyped] = useState("");
  const [fries, setFries] = useState([]); // falling fries
  const friesCounter = useRef(0);
  const receiptRef = useRef(null);

  // Sequence detection for "secret menu"
  useEffect(() => {
    function handleKey(e) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const char = e.key.toLowerCase();
      if (char.length === 1 || char === " ") {
        const next = (typed + char).replace(/[^a-z]/g, "").slice(-20); // keep last 20 letters
        setTyped(next);
        if (next.includes("secretmenu")) {
          setSecretOpen(true);
          setTyped("");
        }
      } else if (e.key === "Escape") {
        setSecretOpen(false);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [typed]);

  // Focus modal when opened
  useEffect(() => {
    if (secretOpen) {
      // Wait a tick for element to mount
      setTimeout(() => modalRef.current?.focus(), 10);
    }
  }, [secretOpen]);

  // Falling fries animation
  const launchFries = useCallback(() => {
    const batch = Array.from({ length: 18 }, () => {
      return {
        id: friesCounter.current++,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        scale: 0.7 + Math.random() * 0.6,
        duration: 3 + Math.random() * 2,
        rotate: (Math.random() * 60 - 30).toFixed(2),
      };
    });
    setFries((prev) => [...prev, ...batch]);
    // Cleanup after longest duration
    setTimeout(() => {
      setFries((prev) => prev.filter((f) => !batch.find((b) => b.id === f.id)));
    }, 6000);
  }, []);

  // Newsletter submit (fake)
  const [submittedEmail, setSubmittedEmail] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    setSubmittedEmail(email);
    e.currentTarget.reset();
    receiptRef.current?.focus();
  };

  return (
    <div className="relative min-h-screen diner-bg text-teal-50 flex flex-col items-center justify-center overflow-hidden px-4 py-10 sm:py-16">
      {/* Neon headline */}
      <header className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight neon relative inline-block">
          <span role="img" aria-label="fries" className="cursor-pointer select-none fries-icon" onClick={launchFries}>
            🍟
          </span>{" "}
          Fry Guys — <span className="inline-block neon-pulse">Coming Soon!</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl font-medium text-teal-100/90">
          We’re cooking up something crispy, cheesy, and downright awesome. Stay hungry.
        </p>
        <p className="sr-only">Type the words "secret menu" for a surprise.</p>
      </header>

      {/* Countdown */}
  <section aria-label="Launch countdown" className="flex gap-4 sm:gap-6 mb-8 flex-wrap justify-center" aria-live="polite">
        {[
          { label: "Days", value: days },
          { label: "Hours", value: hours },
          { label: "Minutes", value: minutes },
          { label: "Seconds", value: seconds },
        ].map((t) => (
          <div
            key={t.label}
            className="flex flex-col items-center bg-teal-900/40 rounded-xl px-4 py-3 shadow-inner backdrop-blur-sm border border-teal-400/30 min-w-[80px]"
          >
            <span className="text-3xl sm:text-4xl font-black font-mono tabular-nums text-yellow-300 drop-shadow-[0_0_6px_rgba(255,197,41,0.65)]">
              {String(t.value).padStart(2, "0")}
            </span>
            <span className="mt-1 text-xs uppercase tracking-widest text-teal-200">{t.label}</span>
          </div>
        ))}
      </section>

      {/* Icon row with interactions */}
      <div className="flex items-center gap-6 sm:gap-10 mb-10 text-4xl sm:text-5xl">
        <button
          onClick={launchFries}
          aria-label="Launch falling fries"
          className="transition hover:scale-125 focus:outline-none focus-visible:ring ring-yellow-300/70"
        >
          🍟
        </button>
        <span role="img" aria-label="burger" className="hover:rotate-6 transition will-change-transform">
          🍔
        </span>
        <span
          role="img"
          aria-label="soda"
          className="hover:-translate-y-1 transition will-change-transform"
        >
          🥤
        </span>
        <span
          role="img"
          aria-label="milkshake"
          className="milkshake inline-block cursor-pointer"
        >
          🥛
        </span>
      </div>

      {/* Newsletter receipt form */}
      <form
        onSubmit={handleSubmit}
        aria-label="Newsletter signup"
        className="receipt relative w-full max-w-md bg-white text-zinc-800 font-mono px-6 py-6 rounded-sm shadow-2xl border border-zinc-300 mb-12"
      >
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-600 text-white text-xs font-bold px-3 py-0.5 rounded-full tracking-wider shadow">SIGN UP</div>
        <h2 className="text-center font-bold text-lg mb-4 tracking-[0.07em] text-red-600">
          Fry Guys Pre-List
        </h2>
        <label className="block text-xs tracking-widest mb-1" htmlFor="email">
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="you@hungry.dev"
          className="w-full mb-4 px-3 py-2 text-sm bg-zinc-100 border border-zinc-300 focus:border-teal-500 focus:outline-none rounded"
        />
        <button
          type="submit"
          className="w-full bg-teal-600 hover:bg-teal-500 active:bg-teal-700 text-white font-semibold py-2 rounded transition shadow relative overflow-hidden"
        >
          <span className="relative z-10">Get Crispy Updates</span>
          <span className="absolute inset-0 opacity-0 hover:opacity-20 bg-gradient-to-r from-yellow-300 via-red-500 to-teal-500 mix-blend-overlay transition" />
        </button>
        <p
          ref={receiptRef}
          tabIndex={-1}
          className="mt-4 text-[10px] leading-relaxed text-center text-zinc-600"
        >
          We respect buns & boundaries. No spam — just sizzling launch news.
        </p>
        {submittedEmail && (
          <p className="mt-3 text-center text-xs font-semibold text-teal-700 animate-fade-in">
            Added {submittedEmail}! Check your inbox soon 🍔
          </p>
        )}
        <div className="mt-6 text-[10px] tracking-widest flex justify-between text-zinc-500">
          <span># ORDER 001</span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </form>

      {/* Footer */}
      <footer className="text-center text-sm text-teal-200/80 mb-4">
        Made with <span className="text-red-400">❤️</span> + Extra Cheese — Fry Guys
      </footer>

      {/* Falling fries layer */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden fries-layer">
        {fries.map((f) => (
          <div
            key={f.id}
            className="fry"
            style={{
              left: f.left + "%",
              animationDelay: f.delay + "s",
              animationDuration: f.duration + "s",
              transform: `translateY(-120%) scale(${f.scale}) rotate(${f.rotate}deg)`,
            }}
          />
        ))}
      </div>

      {/* Secret Menu Modal */}
      {secretOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Secret Menu"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSecretOpen(false)}
          />
          <div
            ref={modalRef}
            tabIndex={-1}
            className="relative z-10 max-w-sm w-full bg-gradient-to-br from-teal-800 via-teal-700 to-teal-900 border border-teal-300/40 rounded-2xl p-6 shadow-neon focus:outline-none"
          >
            <button
              onClick={() => setSecretOpen(false)}
              className="absolute top-2 right-2 text-teal-200 hover:text-yellow-300 focus:outline-none focus-visible:ring ring-teal-300 rounded"
              aria-label="Close secret menu"
            >
              ✕
            </button>
            <h3 className="text-2xl font-extrabold mb-2 neon-sub">Secret Menu</h3>
            <p className="text-sm mb-4 text-teal-100/90">
              Shhh... you unlocked:
            </p>
            <div className="bg-teal-900/50 border border-teal-400/30 rounded-lg p-4 flex gap-4 items-start">
              <span className="text-4xl" role="img" aria-label="mcpuff">
                🥟
              </span>
              <div>
                <p className="font-bold text-yellow-300 leading-tight">
                  McPuff 2.0 — Ultra Crispy Edition
                </p>
                <p className="text-xs mt-1 text-teal-100/80">
                  Quantum-layered pastry. Zero sog. 200% crunch. Served with
                  molten cheese nebula dip.
                </p>
              </div>
            </div>
            <p className="text-[11px] mt-4 text-teal-300/70 italic">
              (Type “secret menu” anytime to toggle this again.)
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
