export default function Footer() {
  return (
    <footer className="mt-20" style={{ backgroundColor: "#122738", color: "#eadbc0" }}>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-14 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="mb-3 text-xl font-extrabold" style={{ color: "#eadbc0" }}>Southville Forge</h3>
          <p className="text-sm/6" style={{ color: "#eadbc0" }}>
            Crafting automation, websites, and brands that work hard for growing businesses.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h4 className="mb-3 text-lg font-bold" style={{ color: "#eadbc0" }}>Contact</h4>
          <ul className="space-y-2 text-sm/6" style={{ color: "#eadbc0" }}>
            <li>Email: hello@southvilleforge.com</li>
            <li>Phone: +44 (0)117 000 0000</li>
            <li>Bristol, United Kingdom</li>
          </ul>
        </div>

        {/* Menu */}
        <div>
          <h4 className="mb-3 text-lg font-bold" style={{ color: "#eadbc0" }}>Menu</h4>
          <ul className="space-y-2 text-sm/6" style={{ color: "#eadbc0" }}>
            <li><a href="#ai-and-automation" className="hover:underline" style={{ color: "#eadbc0" }}>AI & Automation</a></li>
            <li><a href="#website-design" className="hover:underline" style={{ color: "#eadbc0" }}>Website Design</a></li>
            <li><a href="#branding" className="hover:underline" style={{ color: "#eadbc0" }}>Branding</a></li>
            <li><a href="/contact" className="hover:underline" style={{ color: "#eadbc0" }}>Contact</a></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="mb-3 text-lg font-bold" style={{ color: "#eadbc0" }}>Follow</h4>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="group inline-flex items-center gap-2 rounded-md px-3 py-2"
              style={{ border: "1px solid #eadbc0", color: "#eadbc0" }}
            >
              {/* Instagram icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" style={{ color: "#eadbc0" }}>
                <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 12 16.8 2.8 2.8 0 0 0 12 9.2zM17.5 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <span className="text-sm" style={{ color: "#eadbc0" }}>Instagram</span>
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="group inline-flex items-center gap-2 rounded-md px-3 py-2"
              style={{ border: "1px solid #eadbc0", color: "#eadbc0" }}
            >
              {/* LinkedIn icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" style={{ color: "#eadbc0" }}>
                <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.07c.67-1.27 2.3-2.6 4.73-2.6 5.06 0 6 3.33 6 7.66V24h-5v-7.5c0-1.79-.03-4.09-2.5-4.09-2.5 0-2.88 1.95-2.88 3.96V24h-5V8z"/>
              </svg>
              <span className="text-sm" style={{ color: "#eadbc0" }}>LinkedIn</span>
            </a>
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
