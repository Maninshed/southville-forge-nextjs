"use client";
import Image from "next/image";

export default function ParallaxBanner() {
  return (
    <section className="relative">
      {/* Background video (was services video) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster="/foundry.jpeg"
        >
          <source src="/machinery.webm" type="video/webm" />
          <source src="/machinery.mp4" type="video/mp4" />
        </video>
        {/* Light overlay at ~30% */}
        <div className="absolute inset-0 bg-white/30" />
      </div>
    </section>
  );
}
