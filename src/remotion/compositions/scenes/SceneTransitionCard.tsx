import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Noise } from "../../library/components/effects/Noise";
import { FloatingOrbs } from "./FloatingOrbs";

interface SceneTransitionCardProps {
  headingFont: string;
  bodyFont: string;
  text: string;
  accentColor?: string;
}

export const SceneTransitionCard: React.FC<SceneTransitionCardProps> = ({
  headingFont,
  bodyFont,
  text,
  accentColor = "#FFC300",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Pulsing glow behind text
  const glowPulse = 0.5 + 0.5 * Math.sin((frame / fps) * Math.PI * 2 * 0.5);
  const glowSize = 200 + glowPulse * 80;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000814" }}>
      {/* Subtle ambient orbs */}
      <FloatingOrbs
        count={4}
        colors={[accentColor, "#001D3D"]}
        seed="transition"
        speed={0.15}
        minSize={120}
        maxSize={350}
      />

      {/* Center glow */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: glowSize,
          height: glowSize,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}30 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          filter: "blur(40px)",
        }}
      />

      {/* Text */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <TextAnimation
          className="text-5xl text-center text-balance"
          style={{
            fontFamily: bodyFont,
            fontWeight: 400,
            color: "#ffffffee",
            maxWidth: 800,
            padding: "0 60px",
            lineHeight: 1.5,
          }}
          startFrom={5}
          createTimeline={({ textRef, tl, SplitText }) => {
            const split = new SplitText(textRef.current, { type: "words" });
            tl.fromTo(
              split.words,
              { opacity: 0, y: 40, filter: "blur(10px)" },
              {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                duration: 0.7,
                stagger: 0.1,
                ease: "power3.out",
              }
            );
            return tl;
          }}
        >
          {text}
        </TextAnimation>
      </AbsoluteFill>

      <Noise type="subtle" intensity={0.15} speed={0.3} opacity={0.3} />
    </AbsoluteFill>
  );
};
