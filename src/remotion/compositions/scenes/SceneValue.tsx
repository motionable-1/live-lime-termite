import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Easing,
  Img,
} from "remotion";
import { TextAnimation } from "../../library/components/text/TextAnimation";
import { Vignette } from "../../library/components/effects/Vignette";
import { Noise } from "../../library/components/effects/Noise";
import { ShapeAnimation } from "../../library/components/effects/ShapeAnimation";
import { FloatingOrbs } from "./FloatingOrbs";

interface SceneValueProps {
  headingFont: string;
  bodyFont: string;
  title: string;
  subtitle: string;
  description: string;
  accentColor: string;
  imageUrl?: string;
  iconShape?: "circle" | "diamond" | "hexagon" | "star";
  orbSeed?: string;
}

export const SceneValue: React.FC<SceneValueProps> = ({
  headingFont,
  bodyFont,
  title,
  subtitle,
  description,
  accentColor,
  imageUrl,
  iconShape = "diamond",
  orbSeed = "value",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background image
  const imgScale = interpolate(frame, [0, 180], [1.1, 1.0], {
    extrapolateRight: "clamp",
  });
  const imgOpacity = imageUrl
    ? interpolate(frame, [0, 40], [0, 0.3], { extrapolateRight: "clamp" })
    : 0;

  // Shape entrance
  const shapeScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: 5,
  });
  const shapeRotate = interpolate(frame, [0, 300], [0, 360]);

  // Accent line width
  const lineWidth = interpolate(frame, [20, 55], [0, 120], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000814" }}>
      {/* Optional background image */}
      {imageUrl && (
        <AbsoluteFill style={{ opacity: imgOpacity }}>
          <Img
            src={imageUrl}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: `scale(${imgScale})`,
            }}
          />
        </AbsoluteFill>
      )}

      {/* Dark gradient overlay */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, #000814cc 0%, #000814 80%)`,
        }}
      />

      {/* Floating orbs */}
      <FloatingOrbs
        count={5}
        colors={[accentColor, "#001D3D", "#003566"]}
        seed={orbSeed}
        speed={0.25}
        minSize={80}
        maxSize={220}
      />

      {/* Decorative shape - top right */}
      <div
        style={{
          position: "absolute",
          right: 120,
          top: 120,
          transform: `scale(${shapeScale}) rotate(${shapeRotate}deg)`,
          opacity: 0.15,
        }}
      >
        <ShapeAnimation
          shape={iconShape}
          animation="breathe"
          size={200}
          color={accentColor}
          strokeColor={accentColor}
          strokeWidth={2}
          speed={0.3}
        />
      </div>

      {/* Small decorative shapes scattered */}
      <div
        style={{
          position: "absolute",
          left: 100,
          bottom: 150,
          opacity: interpolate(frame, [30, 50], [0, 0.12], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          transform: `rotate(${shapeRotate * 0.5}deg)`,
        }}
      >
        <ShapeAnimation
          shape="ring"
          animation="rotate"
          size={100}
          color={accentColor}
          strokeWidth={1.5}
          speed={0.15}
        />
      </div>

      {/* Content */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div style={{ textAlign: "center", maxWidth: 850, padding: "0 60px" }}>
          {/* Subtitle / label */}
          <TextAnimation
            className="text-base tracking-[0.4em] uppercase"
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              color: accentColor,
              marginBottom: 24,
            }}
            startFrom={8}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, scale: 0.5 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.4,
                  stagger: 0.03,
                  ease: "back.out(1.7)",
                },
              );
              return tl;
            }}
          >
            {subtitle}
          </TextAnimation>

          {/* Main value title */}
          <TextAnimation
            className="text-9xl leading-none text-balance"
            style={{
              fontFamily: headingFont,
              fontWeight: 400,
              color: "#FFFFFF",
              letterSpacing: "0.06em",
            }}
            startFrom={20}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "chars" });
              tl.fromTo(
                split.chars,
                { opacity: 0, y: 100, filter: "blur(15px)" },
                {
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 1,
                  stagger: 0.05,
                  ease: "power3.out",
                },
              );
              return tl;
            }}
          >
            {title}
          </TextAnimation>

          {/* Accent line */}
          <div
            style={{
              width: lineWidth,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              margin: "28px auto",
              opacity: interpolate(frame, [20, 40], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />

          {/* Description */}
          <TextAnimation
            className="text-xl"
            style={{
              fontFamily: bodyFont,
              fontWeight: 400,
              color: "#ffffffbb",
              lineHeight: 1.7,
              maxWidth: 650,
              margin: "0 auto",
            }}
            startFrom={50}
            createTimeline={({ textRef, tl, SplitText }) => {
              const split = new SplitText(textRef.current, { type: "words" });
              tl.fromTo(
                split.words,
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.5,
                  stagger: 0.06,
                  ease: "power2.out",
                },
              );
              return tl;
            }}
          >
            {description}
          </TextAnimation>
        </div>
      </AbsoluteFill>

      <Vignette intensity={0.8} size={0.3} color="#000814" />
      <Noise type="grain" intensity={0.2} speed={0.5} opacity={0.4} />
    </AbsoluteFill>
  );
};
