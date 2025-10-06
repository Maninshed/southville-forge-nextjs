"use client";
import Image from "next/image";
import CTAToggle from "./CTAToggle";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background video for hero only (fixed behind content) */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
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
      </div>

      {/* Logo above the banner with full visibility */}

      {/* Foreground content */}
      <div className="relative z-[96] mx-auto h-full max-w-7xl md:max-w-[1400px] px-6 flex flex-col justify-center">
        {/* Visible logo above banner */}
        <div className="mb-6 flex w-full justify-center">
          <Image
            src="/siteLogo2.webp"
            alt="Southville Forge logo"
            width={780}
            height={270}
            className="object-contain"
            priority
          />
        </div>
        {/* Top hero banner with CTA toggle */}
        <div
          className="mb-10 block w-full rounded-md shadow-lg transition-colors duration-200 ease-out group relative z-[95]"
          style={{ backgroundColor: "#863e11", color: "#eadbc0" }}
        >
          <div className="relative overflow-hidden mx-auto max-w-[900px] px-6 py-10 text-center">
            <h2 className="relative z-10 text-4xl md:text-5xl font-extrabold uppercase tracking-wide" style={{ color: "#eadbc0" }}>
              Practical Design and Automation For Real Businesses.
            </h2>
            <div className="relative z-10 mt-4">
              <CTAToggle />
            </div>
          </div>
        </div>
        {/* 3-column grid */}
        <div className="grid w-full grid-cols-1 items-stretch gap-10 md:[grid-template-columns:1fr_1.5fr_1fr]">
          {/* Left visual */}
          <div className="h-full overflow-hidden rounded-lg md:order-1">
            <div className="relative h-full w-full">
              <Image
                src="/SF8.png"
                alt="Automation illustration"
                fill
                className="object-contain opacity-50"
                sizes="(min-width: 768px) 33vw, 100vw"
                priority
              />
            </div>
          </div>

          {/* Center buttons */}
          <div className="flex h-full flex-col justify-between gap-6 md:order-2">
            <a
              href="#ai-and-automation"
              className="block rounded-md bg-[#863e11] px-16 py-12 text-center text-4xl font-extrabold uppercase tracking-wide text-[#eadbc0] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              AI & Automation Systems
            </a>
            <a
              href="#design-and-branding"
              className="block rounded-md bg-[#863e11] px-16 py-12 text-center text-4xl font-extrabold uppercase tracking-wide text-[#eadbc0] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              Design & Branding
            </a>
            <a
              href="#creative-tech-and-hybrid"
              className="block rounded-md bg-[#863e11] px-16 py-12 text-center text-4xl font-extrabold uppercase tracking-wide text-[#eadbc0] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              Creative Tech & Hybrid Solutions
            </a>
          </div>

          {/* Right visual */}
          <div className="h-full overflow-hidden rounded-lg md:order-3">
            <div className="relative h-full w-full">
              <Image
                src="/SF10.png"
                alt="Parallax feature graphic"
                fill
                className="object-contain opacity-50"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>
        </div>

        

        {/* Forge animated text removed to avoid any runtime issues */}
      </div>
    </section>
  );
}
