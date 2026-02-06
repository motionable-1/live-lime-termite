import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, random } from "remotion";

interface FloatingOrbsProps {
  count?: number;
  colors?: string[];
  seed?: string;
  speed?: number;
  minSize?: number;
  maxSize?: number;
}

export const FloatingOrbs: React.FC<FloatingOrbsProps> = ({
  count = 8,
  colors = ["#FFC300", "#003566", "#001D3D"],
  seed = "orbs",
  speed = 0.3,
  minSize = 80,
  maxSize = 250,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = (frame / fps) * speed;

  const orbs = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const r = (key: string) => random(`${seed}-${key}-${i}`);
      return {
        x: r("x") * width,
        y: r("y") * height,
        size: minSize + r("size") * (maxSize - minSize),
        color: colors[Math.floor(r("color") * colors.length)],
        phaseX: r("phx") * Math.PI * 2,
        phaseY: r("phy") * Math.PI * 2,
        speedX: 0.3 + r("sx") * 0.7,
        speedY: 0.3 + r("sy") * 0.7,
        opacity: 0.15 + r("op") * 0.25,
      };
    });
  }, [count, seed, width, height, minSize, maxSize, colors]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {orbs.map((orb, i) => {
        const px = orb.x + Math.sin(time * orb.speedX + orb.phaseX) * 60;
        const py = orb.y + Math.cos(time * orb.speedY + orb.phaseY) * 40;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: px,
              top: py,
              width: orb.size,
              height: orb.size,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${orb.color}80 0%, ${orb.color}00 70%)`,
              opacity: orb.opacity,
              filter: `blur(${orb.size * 0.3}px)`,
              transform: "translate(-50%, -50%)",
            }}
          />
        );
      })}
    </div>
  );
};
