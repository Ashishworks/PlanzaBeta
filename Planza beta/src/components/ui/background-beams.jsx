"use client";
import React, { useEffect, useRef } from "react";

export const BackgroundBeams = ({ className }) => {
  const beamsRef = useRef(null);

  useEffect(() => {
    const beams = beamsRef.current;
    if (!beams) return;

    const handleMouseMove = (e) => {
      const rect = beams.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      beams.style.setProperty("--mouse-x", `${mouseX}px`);
      beams.style.setProperty("--mouse-y", `${mouseY}px`);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={beamsRef}
      className={`absolute inset-0 overflow-hidden [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] ${className}`}
    >
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 dark:from-blue-600/20 dark:via-purple-600/20 dark:to-blue-600/20" />
      
      {/* Interactive mouse-following beam */}
      <div
        className="absolute inset-0 opacity-30 [background:radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(120,119,198,0.15),transparent_40%)] transition-opacity duration-500"
        style={{
          "--mouse-x": "0px",
          "--mouse-y": "0px",
        }}
      />
      
      {/* Additional radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.2),rgba(255,255,255,0))] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),rgba(0,0,0,0))]" />
      
      {/* Animated floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 dark:bg-blue-300/40 rounded-full animate-pulse"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}; 