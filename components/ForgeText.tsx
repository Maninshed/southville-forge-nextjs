"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ForgeText() {
  const textRef = useRef<HTMLHeadingElement>(null);
  const [glitchText, setGlitchText] = useState("Southville Forge");

  useEffect(() => {
    let tween: gsap.core.Tween | null = null;

    if (textRef.current) {
      // Animation temporarily disabled
      // tween = gsap.to(textRef.current, {
      //   x: "-85vw",        // small shift left
      //   y: "-150vh",       // climb upward (off screen)
      //   scale: 0.25,        // shrink
      //   opacity: 0,         // fade out
      //   color: "#ff6600",  // furnace orange
      //   ease: "power2.inOut",
      //   scrollTrigger: {
      //     trigger: textRef.current,
      //     start: "top 120%",
      //     end: "top 40%",
      //     scrub: true,
      //   },
      // });
    }

    // Flicker effect
    const interval = setInterval(() => {
      const original = "Southville Forge";
      const letters = original.split("");
      const i = Math.floor(Math.random() * letters.length);
      letters[i] = `<span class="serif">${letters[i]}</span>`;
      setGlitchText(letters.join(""));

      setTimeout(() => {
        setGlitchText(original);
      }, 120);
    }, 2500);

    return () => {
      clearInterval(interval);
      // Animation cleanup disabled while tween is commented out
      // if (tween) {
      //   (tween as any)?.scrollTrigger?.kill?.();
      //   (tween as any)?.kill?.();
      // }
    };
  }, []);

  return (
    <h1
      ref={textRef}
      className="forge-text"
      dangerouslySetInnerHTML={{ __html: glitchText }}
    />
  );
}
