import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img } from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Vignette } from "../../library/components/effects/Vignette";
import { Noise } from "../../library/components/effects/Noise";
import { FloatingOrbs } from "./FloatingOrbs";

const CITY_IMG = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/brand-story/1770414787089_uzoo2pscapg_cityscape_golden_hour.png";

interface SceneOpeningProps {
  headingFont: string;
  bodyFont: string;
}

export const SceneOpening: React.FC<SceneOpeningProps> = ({ headingFont, bodyFont }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Cinematic image zoom
  const imageScale = interpolate(frame, [0, 180], [1.15, 1.0], {
    extrapolateRight: "clamp",
  });
  const imageOpacity = interpolate(frame, [0, 30], [0, 0.5], {
    extrapolateRight: "clamp",
  });

  // Overlay gradient fade
  const overlayOpacity = interpolate(frame, [0, 20], [1, 0.7], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000814" }}>
      {/* Background image with ken burns */}
      <AbsoluteFill style={{ opacity: imageOpacity }}>
        <Img
          src={CITY_IMG}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `scale(${imageScale})`,
          }}
        />
      </AbsoluteFill>

      {/* Dark overlay */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, #000814ee 0%, #000814cc 40%, #000814ee 100%)`,
          opacity: overlayOpacity,
        }}
      />

      {/* Floating ambient orbs */}
      <FloatingOrbs
        count={6}
        colors={["#FFC300", "#FFD60A", "#003566"]}
        seed="opening"
        speed={0.2}
        minSize={100}
        maxSize={300}
      />

      {/* Main text content */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 900, padding: "0 60px" }}>
          {/* Subtitle line */}
          <TextAnimation
            className="text-lg tracking-[0.35em] uppercase"
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              color: "#FFC300",
              marginBottom: 32,
            }}
            startFrom={15}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.04, ease: "power3.out" }
              );
              return tl;
            }}
          >
            A Story of Purpose
          </TextAnimation>

          {/* Main heading */}
          <TextAnimation
            className="text-8xl leading-none text-balance"
            style={{
              fontFamily: headingFont,
              fontWeight: 400,
              color: "#FFFFFF",
              letterSpacing: "0.04em",
            }}
            startFrom={35}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, y: 80, rotationX: -90 },
                {
                  opacity: 1,
                  y: 0,
                  rotationX: 0,
                  duration: 0.9,
                  stagger: 0.04,
                  ease: "back.out(1.4)",
                }
              );
              return tl;
            }}
          >
            BUILT ON BELIEF
          </TextAnimation>

          {/* Divider line */}
          <div
            style={{
              width: interpolate(frame, [60, 90], [0, 200], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              height: 2,
              background: "linear-gradient(90deg, transparent, #FFC300, transparent)",
              margin: "32px auto",
              opacity: interpolate(frame, [60, 80], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />

          {/* Tagline */}
          <TextAnimation
            className="text-2xl"
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              color: "#ffffffcc",
              lineHeight: 1.6,
            }}
            startFrom={75}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 25, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.08, ease: "power2.out" }
              );
              return tl;
            }}
          >
            Every great company starts with a vision
          </TextAnimation>
        </div>
      </AbsoluteFill>

      <Vignette intensity={0.85} size={0.3} color="#000814" />
      <Noise type="grain" intensity={0.25} speed={0.5} opacity={0.5} />
    </AbsoluteFill>
  );
};
