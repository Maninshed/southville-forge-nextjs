"use client";
import Image from "next/image";
import ForgeText from "./ForgeText";

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
          preload="metadata"
          poster="/foundry.jpeg"
          src="/machinery.mp4"
        />
      </div>

      

      {/* Logo */}
      <div className="pointer-events-none absolute inset-x-0 top-6 z-20 flex justify-center md:top-10">
        <Image
          src="/siteLogo2.webp"
          alt="Site logo"
          width={480}
          height={480}
          className="h-auto"
          priority
        />
      </div>

      {/* Foreground content */}
      <div className="relative z-30 mx-auto h-full max-w-7xl md:max-w-[1400px] px-6 flex flex-col justify-center">
        {/* 3-column grid */}
        <div className="grid w-full grid-cols-1 items-stretch gap-10 md:[grid-template-columns:1fr_1.5fr_1fr]">
          {/* Left visual */}
          <div className="h-full overflow-hidden rounded-lg md:order-1">
            <div className="relative h-full w-full">
              <Image
                src="/SF8.png"
                alt="Automation illustration"
                fill
                className="object-contain"
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
              AI and Automation
            </a>
            <a
              href="#website-design"
              className="block rounded-md bg-[#863e11] px-16 py-12 text-center text-4xl font-extrabold uppercase tracking-wide text-[#eadbc0] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              Website Design
            </a>
            <a
              href="#branding"
              className="block rounded-md bg-[#863e11] px-16 py-12 text-center text-4xl font-extrabold uppercase tracking-wide text-[#eadbc0] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:-translate-y-0.5 hover:scale-[1.02]"
            >
              Branding
            </a>
          </div>

          {/* Right visual */}
          <div className="h-full overflow-hidden rounded-lg md:order-3">
            <div className="relative h-full w-full">
              <Image
                src="/SF10.png"
                alt="Parallax feature graphic"
                fill
                className="object-contain"
                sizes="(min-width: 768px) 33vw, 100vw"
              />
            </div>
          </div>
        </div>

        {/* CTA block */}
        <a
          href="#contact"
          className="mt-10 block w-full rounded-md shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#73340f] hover:-translate-y-0.5 hover:scale-[1.02]"
          style={{ backgroundColor: "#863e11", color: "#eadbc0" }}
        >
          <div className="mx-auto max-w-[800px] px-6 py-10 text-center">
            <h2 className="text-3xl font-extrabold uppercase tracking-wide" style={{ color: "#eadbc0" }}>
              Book Your Call
            </h2>
            <h4 className="mt-3 text-lg font-semibold" style={{ color: "#eadbc0" }}>
              Unlock untapped potential with safe, responsible, and powerful AI
              solutions.
            </h4>
          </div>
        </a>

        {/* Forge animated text - positioned bottom-right under CTA */}
        <div className="mx-auto max-w-[800px] px-6 mt-4 flex justify-end">
          <ForgeText />
        </div>
      </div>
    </section>
  );
}
