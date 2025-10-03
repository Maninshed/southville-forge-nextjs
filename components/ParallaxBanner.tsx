"use client";
import Image from "next/image";

export default function ParallaxBanner() {
  return (
    <section className="relative">
      {/* Background video (was services video) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          className="fixed left-0 top-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/machinery.mp4"
        />
        {/* Light overlay at ~30% */}
        <div className="absolute inset-0 bg-white/30" />
      </div>
    </section>
  );
}
