import React from "react";
import { Audio } from "@remotion/media";
import { Sequence, useVideoConfig, interpolate } from "remotion";

// ─── Generated SFX URLs ──────────────────────────────────────
const SFX = {
  bassImpact:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770415150346_gz1mwsi7nk_sfx_Deep_cinematic_bass_drop_impac.mp3",
  whoosh:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770415159966_afcumw7v3k_sfx_Fast_cinematic_whoosh_transiti.mp3",
  flashImpact:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770415180766_unt6zuw2sp_sfx_Bright_flash_impact_with_spark.mp3",
  liquidMorph:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770415188425_yg3ur43co8s_sfx_Liquid_bubble_morph_sound__org.mp3",
  uiPop:
    "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1770415194275_2hks1sz0d5v_sfx_Subtle_UI_pop_click__satisfyin.mp3",
} as const;

const MUSIC_URL =
  "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/music/1770415208104_pv5jujp1t88_music_Dark_cinematic_elect.mp3";

// ─── Timeline (at 30 fps, accounting for transition overlaps) ─
//
// Scene 1 (Opening):      frames 0–149 (150f)
// BlurDissolve:           15f overlap → Scene 2 starts ~frame 135
// Scene 2 (Value VISION): frames ~135–246 (120f)
// Morph:                  12f overlap → Scene 3 starts ~frame 243
// Scene 3 (TransCard):    frames ~243–324 (90f)
// BlurDissolve:           12f overlap → Scene 4 starts ~frame 321
// Scene 4 (Value PURPOSE):frames ~321–432 (120f)
// FlashWhite:             15f overlap → Scene 5 starts ~frame 426
// Scene 5 (Outro):        frames ~426–605 (180f)

export const SoundDesign: React.FC = () => {
  const { durationInFrames } = useVideoConfig();

  return (
    <>
      {/* ── Background Music ─────────────────────────────── */}
      <Audio
        src={MUSIC_URL}
        volume={(f) =>
          interpolate(
            f,
            [0, 20, durationInFrames - 60, durationInFrames],
            [0, 0.28, 0.28, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )
        }
      />

      {/* ═══════════════════════════════════════════════════ */}
      {/* Scene 1: Opening (frames 0–149)                    */}
      {/* ═══════════════════════════════════════════════════ */}

      {/* Deep cinematic bass as title sequence begins */}
      <Sequence from={0}>
        <Audio src={SFX.bassImpact} volume={0.5} />
      </Sequence>

      {/* Subtle pop when subtitle fades in (frame ~15) */}
      <Sequence from={15}>
        <Audio src={SFX.uiPop} volume={0.2} />
      </Sequence>

      {/* Main heading "BUILT ON BELIEF" slam (frame ~35) */}
      <Sequence from={35}>
        <Audio src={SFX.bassImpact} volume={0.4} />
      </Sequence>

      {/* Gentle whoosh on divider line draw (frame ~60) */}
      <Sequence from={60}>
        <Audio src={SFX.whoosh} volume={0.25} />
      </Sequence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* BlurDissolve Transition (~frame 135)               */}
      {/* ═══════════════════════════════════════════════════ */}
      <Sequence from={133}>
        <Audio src={SFX.whoosh} volume={0.35} />
      </Sequence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* Scene 2: Value — VISION (frames ~135–246)          */}
      {/* ═══════════════════════════════════════════════════ */}

      {/* Shape entrance pop */}
      <Sequence from={140}>
        <Audio src={SFX.uiPop} volume={0.25} />
      </Sequence>

      {/* "VISION" title reveal (scene frame ~20 = global ~155) */}
      <Sequence from={155}>
        <Audio src={SFX.bassImpact} volume={0.35} />
      </Sequence>

      {/* Description text flow */}
      <Sequence from={185}>
        <Audio src={SFX.liquidMorph} volume={0.2} />
      </Sequence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* Morph Transition (~frame 243)                      */}
      {/* ═══════════════════════════════════════════════════ */}
      <Sequence from={241}>
        <Audio src={SFX.liquidMorph} volume={0.35} />
      </Sequence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* Scene 3: Transition Card (frames ~243–324)         */}
      {/* ═══════════════════════════════════════════════════ */}

      {/* Gentle ambient text reveal */}
      <Sequence from={248}>
        <Audio src={SFX.whoosh} volume={0.2} />
      </Sequence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* BlurDissolve Transition (~frame 321)               */}
      {/* ═══════════════════════════════════════════════════ */}
      <Sequence from={319}>
        <Audio src={SFX.whoosh} volume={0.3} />
      </Sequence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* Scene 4: Value — PURPOSE (frames ~321–432)         */}
      {/* ═══════════════════════════════════════════════════ */}

      {/* Shape entrance */}
      <Sequence from={326}>
        <Audio src={SFX.uiPop} volume={0.25} />
      </Sequence>

      {/* "PURPOSE" title reveal (scene frame ~20 = global ~341) */}
      <Sequence from={341}>
        <Audio src={SFX.bassImpact} volume={0.35} />
      </Sequence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* FlashWhite Transition (~frame 426)                 */}
      {/* ═══════════════════════════════════════════════════ */}
      <Sequence from={424}>
        <Audio src={SFX.flashImpact} volume={0.5} />
      </Sequence>

      {/* ═══════════════════════════════════════════════════ */}
      {/* Scene 5: Outro (frames ~426–605)                   */}
      {/* ═══════════════════════════════════════════════════ */}

      {/* Brand logo reveals with subtle impact */}
      <Sequence from={431}>
        <Audio src={SFX.uiPop} volume={0.3} />
      </Sequence>

      {/* "YOUR BRAND" title (scene frame ~15 = global ~441) */}
      <Sequence from={441}>
        <Audio src={SFX.bassImpact} volume={0.4} />
      </Sequence>

      {/* Value words appear (staggered pops) */}
      <Sequence from={466}>
        <Audio src={SFX.uiPop} volume={0.2} />
      </Sequence>
      <Sequence from={478}>
        <Audio src={SFX.uiPop} volume={0.2} />
      </Sequence>
      <Sequence from={490}>
        <Audio src={SFX.uiPop} volume={0.2} />
      </Sequence>
    </>
  );
};
