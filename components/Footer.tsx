"use client";
import MiniCTAToggle from "./MiniCTAToggle";

export default function Footer() {
  return (
    <footer className="mt-20" style={{ backgroundColor: "#122738", color: "#eadbc0" }}>
      <div className="mx-auto max-w-6xl px-6 py-14 space-y-10">
        {/* Copy line */}
        <div>
          <h3 className="text-xl md:text-2xl font-extrabold" style={{ color: "#eadbc0" }}>
            Building automation, websites, and brands that work hard for growing businesses.
          </h3>
        </div>

        {/* Contact with toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
          <div>
            <h4 className="mb-3 text-lg font-bold" style={{ color: "#eadbc0" }}>Contact</h4>
            <div className="max-w-xs">
              <MiniCTAToggle
                onForm={() => {
                  const el = document.getElementById("quick-form");
                  el?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                onChat={() => {
                  window.dispatchEvent(new CustomEvent("open-chat"));
                }}
              />
            </div>
            <p className="mt-4 text-sm" style={{ color: "#eadbc0" }}>Made In Bristol</p>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(234,219,192,0.2)" }}>
        <div className="mx-auto max-w-6xl px-6 py-4 text-sm" style={{ color: "#eadbc0" }}>
          © Southville Forge 2025
        </div>
      </div>
    </footer>
  );
}
