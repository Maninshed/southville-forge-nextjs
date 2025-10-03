export default function ServiceWebDesign() {
  return (
    <section className="relative mb-24 md:mb-32">
      {/* Background layer with 50% opacity #eadbc0 */}
      <div
        className="absolute inset-0 -z-10"
        style={{ backgroundColor: "rgba(234, 219, 192, 0.5)" }}
      />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div id="website-design" className="scroll-mt-24">
          <div className="rounded-md bg-[#863e11] p-8 text-[#eadbc0] shadow-lg md:p-12">
            <h2 className="mb-4 text-2xl font-extrabold" style={{ color: "#eadbc0" }}>Website Design</h2>
            <p className="text-lg text-[#eadbc0]">
              Fast, accessible sites designed for clarity and conversion. Built on a modern stack so your brand
              looks sharp and loads instantly on every device.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[#eadbc0]">
              <li>UX‑led layouts that guide visitors to action</li>
              <li>Performance focused (Core Web Vitals ready)</li>
              <li>Clean content structure and visual hierarchy</li>
            </ul>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block rounded-md bg-[#b84d0b] px-5 py-2 text-sm font-extrabold uppercase tracking-wide text-[#f4f1e6] shadow-lg transition-colors duration-200 ease-out will-change-transform transform-gpu hover:bg-[#4d2005] hover:text-[#122738] hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
