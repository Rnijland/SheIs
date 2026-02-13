/* eslint-disable @next/next/no-img-element */

interface MarqueeLoopProps {
  images: string[];
  alt: string;
  direction?: "left" | "right";
}

// Base speed: 7 images = 60s. Scale proportionally so all loops move at the same pixel speed.
const BASE_IMAGES = 7;
const BASE_DURATION = 60;

export function MarqueeLoop({
  images,
  alt,
  direction = "left",
}: MarqueeLoopProps) {
  const duration = Math.round((images.length / BASE_IMAGES) * BASE_DURATION);
  const id = `mq-${images.length}-${direction}`;

  const css = `
@-webkit-keyframes ${id} {
  0% { -webkit-transform: translateX(0); transform: translateX(0); }
  100% { -webkit-transform: translateX(-33.333%); transform: translateX(-33.333%); }
}
@keyframes ${id} {
  0% { -webkit-transform: translateX(0); transform: translateX(0); }
  100% { -webkit-transform: translateX(-33.333%); transform: translateX(-33.333%); }
}
.${id} {
  -webkit-animation: ${id} ${duration}s linear infinite;
  animation: ${id} ${duration}s linear infinite;
  will-change: transform;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <section style={{ overflow: "hidden", margin: 0, padding: 0 }}>
        <div style={{ position: "relative" }}>
          <div
            className={id}
            style={{
              display: "flex",
              flexWrap: "nowrap",
              width: "max-content",
              gap: 0,
              WebkitTransform: "translateZ(0)",
              transform: "translateZ(0)",
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
                  loading="lazy"
                />
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}
