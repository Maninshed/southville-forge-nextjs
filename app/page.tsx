export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/machinery.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-label="Background video"
      />

      {/* Overlay to enhance text contrast */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Centered Text */}
      <div className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 text-center">
        <h1
          className="leading-tight tracking-widest text-balance text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          <span className="block bg-gradient-to-r from-[#8b3a3a] to-[#DC143C] bg-clip-text text-transparent">SOUTVILLE FORGE</span>
          <span className="block bg-gradient-to-r from-[#8b3a3a] to-[#DC143C] bg-clip-text text-transparent">This site is under construction</span>
        </h1>
      </div>
    </main>
  );
}
