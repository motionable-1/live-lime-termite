import React from "react";
import { AbsoluteFill, Artifact, useCurrentFrame } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { loadFont as loadCormorantGaramond } from "@remotion/google-fonts/CormorantGaramond";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { SceneOpening } from "./scenes/SceneOpening";
import { SceneValue } from "./scenes/SceneValue";
import { SceneTransitionCard } from "./scenes/SceneTransitionCard";
import { SceneOutro } from "./scenes/SceneOutro";
import { flashWhite } from "../library/components/layout/transitions/presentations/flashWhite";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { morph } from "../library/components/layout/transitions/presentations/morph";
import { SoundDesign } from "./SoundDesign";

// Timeline @ 30fps:
// Scene 1 (Opening):      150 frames (0–5s)
// Transition:               15 frames  (blurDissolve)
// Scene 2 (Value: VISION): 120 frames (4.5–8.5s)
// Transition:               12 frames  (morph)
// Scene 3 (TransitionCard): 90 frames (8.1–11.1s)
// Transition:               12 frames  (blurDissolve)
// Scene 4 (Value: PURPOSE): 120 frames (10.7–14.7s)
// Transition:               15 frames  (flashWhite)
// Scene 5 (Outro):         150 frames (14.2–19.2s)
// +30 frames buffer at end
// Total: 150+120+90+120+150 - 15-12-12-15 = 576 frames

const IMAGES = {
  workshop:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/brand-story/1770414804714_v4qv2fddxkl_workshop_craftsmanship.png",
  summit:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/brand-story/1770414812547_6h7s73u13hk_mountain_summit_sunrise.png",
};

export const Main: React.FC = () => {
  const { fontFamily: headingFont } = loadCormorantGaramond("normal", {
    weights: ["400", "600"],
    subsets: ["latin"],
  });
  const { fontFamily: bodyFont } = loadInter("normal", {
    weights: ["400", "500"],
    subsets: ["latin"],
  });

  const frame = useCurrentFrame();

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill style={{ backgroundColor: "#000814" }}>
        {/* Sound Design Layer */}
        <SoundDesign />

        <TransitionSeries>
          {/* Scene 1: Cinematic Opening */}
          <TransitionSeries.Sequence durationInFrames={150}>
            <SceneOpening headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: 15 })}
          />

          {/* Scene 2: Value — VISION */}
          <TransitionSeries.Sequence durationInFrames={120}>
            <SceneValue
              headingFont={headingFont}
              bodyFont={bodyFont}
              title="VISION"
              subtitle="Our Foundation"
              description="We see beyond the horizon, building the future one bold decision at a time."
              accentColor="#FFC300"
              imageUrl={IMAGES.workshop}
              iconShape="diamond"
              orbSeed="vision"
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={morph()}
            timing={linearTiming({ durationInFrames: 12 })}
          />

          {/* Scene 3: Transition Card */}
          <TransitionSeries.Sequence durationInFrames={90}>
            <SceneTransitionCard
              headingFont={headingFont}
              bodyFont={bodyFont}
              text="The journey from idea to impact"
              accentColor="#FFD60A"
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: 12 })}
          />

          {/* Scene 4: Value — PURPOSE */}
          <TransitionSeries.Sequence durationInFrames={120}>
            <SceneValue
              headingFont={headingFont}
              bodyFont={bodyFont}
              title="PURPOSE"
              subtitle="Our Mission"
              description="Every action driven by meaning. Every product shaped by conviction."
              accentColor="#FFD60A"
              imageUrl={IMAGES.summit}
              iconShape="hexagon"
              orbSeed="purpose"
            />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={flashWhite()}
            timing={linearTiming({ durationInFrames: 15 })}
          />

          {/* Scene 5: Outro — Brand Finale */}
          <TransitionSeries.Sequence durationInFrames={180}>
            <SceneOutro headingFont={headingFont} bodyFont={bodyFont} />
          </TransitionSeries.Sequence>
        </TransitionSeries>
      </AbsoluteFill>
    </>
  );
};
