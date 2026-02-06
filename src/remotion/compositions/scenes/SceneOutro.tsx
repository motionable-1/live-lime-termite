import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Vignette } from "../../library/components/effects/Vignette";
import { Noise } from "../../library/components/effects/Noise";
import { Particles } from "../../library/components/effects/Particles";
import { FloatingOrbs } from "./FloatingOrbs";

interface SceneOutroProps {
  headingFont: string;
  bodyFont: string;
}

export const SceneOutro: React.FC<SceneOutroProps> = ({
  headingFont,
  bodyFont,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo container scale
  const containerScale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
    delay: 5,
  });

  // Three values stagger in
  const values = ["Innovation", "Integrity", "Impact"];

  // Divider dots
  const dotOpacity = interpolate(frame, [60, 75], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final CTA
  const ctaOpacity = interpolate(frame, [90, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const ctaY = interpolate(frame, [90, 110], [20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000814" }}>
      {/* Ambient orbs - golden */}
      <FloatingOrbs
        count={7}
        colors={["#FFC300", "#FFD60A", "#003566", "#001D3D"]}
        seed="outro"
        speed={0.2}
        minSize={100}
        maxSize={280}
      />

      {/* Sparkle particles */}
      <Particles
        type="stars"
        count={30}
        colors={["#FFC300", "#FFD60A", "#FFFFFF"]}
        speed={0.3}
        seed="outro-stars"
        size={[1, 4]}
        gravity={0}
      />

      {/* Content */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            textAlign: "center",
            transform: `scale(${containerScale})`,
          }}
        >
          {/* Company mark / Logo placeholder */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "2px solid #FFC300",
              margin: "0 auto 40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: interpolate(frame, [5, 25], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #FFC300, #FFD60A)",
              }}
            />
          </div>

          {/* Brand name */}
          <TextAnimation
            className="text-7xl text-balance"
            style={{
              fontFamily: headingFont,
              fontWeight: 400,
              color: "#FFFFFF",
              letterSpacing: "0.08em",
              marginBottom: 40,
            }}
            startFrom={15}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, y: 60, scale: 0.8 },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 0.8,
                  stagger: 0.05,
                  ease: "back.out(1.5)",
                },
              );
              return tl;
            }}
          >
            YOUR BRAND
          </TextAnimation>

          {/* Three values in a row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            {values.map((value, i) => {
              const valueDelay = 40 + i * 12;
              const valueOpacity = interpolate(
                frame,
                [valueDelay, valueDelay + 15],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              );
              const valueY = interpolate(
                frame,
                [valueDelay, valueDelay + 15],
                [25, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.out(Easing.cubic),
                },
              );

              return (
                <React.Fragment key={value}>
                  {i > 0 && (
                    <div
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: "#FFC300",
                        opacity: dotOpacity,
                      }}
                    />
                  )}
                  <span
                    style={{
                      fontFamily: bodyFont,
                      fontSize: 22,
                      fontWeight: 400,
                      color: "#FFC300",
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      opacity: valueOpacity,
                      transform: `translateY(${valueY}px)`,
                    }}
                  >
                    {value}
                  </span>
                </React.Fragment>
              );
            })}
          </div>

          {/* CTA */}
          <div
            style={{
              marginTop: 60,
              opacity: ctaOpacity,
              transform: `translateY(${ctaY}px)`,
            }}
          >
            <span
              style={{
                fontFamily: bodyFont,
                fontSize: 16,
                fontWeight: 400,
                color: "#ffffff66",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              Discover Our Story
            </span>
          </div>
        </div>
      </AbsoluteFill>

      <Vignette intensity={0.85} size={0.25} color="#000814" />
      <Noise type="grain" intensity={0.2} speed={0.5} opacity={0.4} />
    </AbsoluteFill>
  );
};
