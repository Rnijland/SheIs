/* eslint-disable @next/next/no-img-element */
"use client";

import { useRef, useEffect, useState } from "react";

interface MarqueeLoopProps {
  images: string[];
  alt: string;
  direction?: "left" | "right";
}

// Base speed in pixels per second
const PX_PER_SECOND = 40;

export function MarqueeLoop({
  images,
  alt,
  direction = "left",
}: MarqueeLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [setWidth, setSetWidth] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    // Measure the width of one set of images once all images are loaded
    const imgs = track.querySelectorAll("img");
    let loaded = 0;
    const total = imgs.length;
    const measure = () => {
      // Each set is images.length images; measure first set
      let w = 0;
      for (let i = 0; i < images.length && i < imgs.length; i++) {
        w += imgs[i].getBoundingClientRect().width;
      }
      if (w > 0) setSetWidth(w);
    };
    imgs.forEach((img) => {
      if (img.complete) {
        loaded++;
        if (loaded === total) measure();
      } else {
        img.onload = () => {
          loaded++;
          if (loaded === total) measure();
        };
      }
    });
    // Fallback measure after short delay
    const timer = setTimeout(measure, 500);
    return () => clearTimeout(timer);
  }, [images.length]);

  const duration = setWidth > 0 ? setWidth / PX_PER_SECOND : 60;
  const id = `mq-${images.length}-${direction}`;

  const css = setWidth > 0 ? `
@-webkit-keyframes ${id} {
  0% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
  100% { -webkit-transform: translate3d(-${setWidth}px, 0, 0); transform: translate3d(-${setWidth}px, 0, 0); }
}
@keyframes ${id} {
  0% { -webkit-transform: translate3d(0, 0, 0); transform: translate3d(0, 0, 0); }
  100% { -webkit-transform: translate3d(-${setWidth}px, 0, 0); transform: translate3d(-${setWidth}px, 0, 0); }
}
.${id} {
  -webkit-animation: ${id} ${duration}s linear infinite;
  animation: ${id} ${duration}s linear infinite;
}
` : "";

  return (
    <>
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      <section style={{ overflow: "hidden", margin: 0, padding: 0 }}>
        <div
          ref={trackRef}
          className={css ? id : undefined}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            width: "max-content",
            gap: 0,
          }}
        >
          {[0, 1, 2].map((set) =>
            images.map((src, index) => (
              <img
                key={`loop-${set}-${index}`}
                src={src}
                alt={`${alt} ${index + 1}`}
                style={{
                  height: "256px",
                  width: "auto",
                  objectFit: "cover",
                  flexShrink: 0,
                  display: "block",
                }}
              />
            ))
          )}
        </div>
      </section>
    </>
  );
}
