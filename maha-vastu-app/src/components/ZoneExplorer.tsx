"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Compass, RotateCcw } from "lucide-react";
import { computeDialRotationOffset, getZoneFromDegrees, ZONE_SEGMENTS } from "@/lib/mahaVastu";
import { cn } from "@/lib/utils";

const azimuthPresets = [12, 38, 74, 128, 182, 226, 274, 338];

export function ZoneExplorer() {
  const [compassOffset, setCompassOffset] = useState(4);
  const [frontDoorAzimuth, setFrontDoorAzimuth] = useState(92);
  const zone = useMemo(() => getZoneFromDegrees(frontDoorAzimuth), [frontDoorAzimuth]);
  const rotation = useMemo(
    () => computeDialRotationOffset(compassOffset, frontDoorAzimuth),
    [compassOffset, frontDoorAzimuth]
  );
  const highlightedIndex = useMemo(() => {
    const index = ZONE_SEGMENTS.findIndex((segment) => segment.zone === zone.zone);
    return index >= 0 ? index : 0;
  }, [zone.zone]);

  return (
    <div className="grid gap-8 lg:grid-cols-[3fr,2fr]">
      <div className="relative overflow-hidden rounded-3xl border border-white/40 bg-gradient-to-br from-white via-white/60 to-sand-50 p-8 shadow-inner">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold text-slate-800">
            Degree → MahaVastu Zone
          </h3>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full border border-sand-300/60 bg-white px-4 py-2 text-sm text-sand-700 transition hover:bg-sand-100/70"
            onClick={() => {
              setCompassOffset(0);
              setFrontDoorAzimuth(90);
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>

        <div className="mt-8 grid gap-6">
          <div className="rounded-2xl border border-sand-200/80 bg-white/80 p-6 shadow-sm">
            <label className="flex items-center justify-between text-sm font-medium text-slate-600">
              Magnetic north offset (°)
              <span className="text-xs text-slate-500">Survey from phone or compass</span>
            </label>
            <input
              type="range"
              min={-45}
              max={45}
              value={compassOffset}
              onChange={(event) => setCompassOffset(Number(event.target.value))}
              className="mt-4 w-full accent-sand-500"
            />
            <p className="mt-2 text-sm font-semibold text-slate-700">{compassOffset.toFixed(1)}°</p>
          </div>

          <div className="rounded-2xl border border-sand-200/80 bg-white/80 p-6 shadow-sm">
            <label className="flex items-center justify-between text-sm font-medium text-slate-600">
              Front door azimuth (°)
              <span className="text-xs text-slate-500">Laser measure from centre of home</span>
            </label>
            <input
              type="range"
              min={0}
              max={359}
              value={frontDoorAzimuth}
              onChange={(event) => setFrontDoorAzimuth(Number(event.target.value))}
              className="mt-4 w-full accent-sand-500"
            />
            <p className="mt-2 text-sm font-semibold text-slate-700">{frontDoorAzimuth.toFixed(1)}°</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {azimuthPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setFrontDoorAzimuth(preset)}
                  className={cn(
                    "rounded-full border border-sand-200 px-3 py-1 text-xs font-medium transition",
                    frontDoorAzimuth === preset
                      ? "bg-sand-500 text-white shadow"
                      : "bg-white text-slate-700 hover:bg-sand-100"
                  )}
                >
                  {preset}°
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row">
          <div className="flex flex-1 items-center justify-center">
            <CompassDial rotation={rotation} highlightedIndex={highlightedIndex} />
          </div>
          <div className="flex-1 rounded-2xl border border-sand-200/80 bg-white/80 p-6 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-sand-500">Active zone</p>
            <p className="mt-1 font-display text-3xl text-slate-800">{zone.zone}</p>
            <div className="mt-4 space-y-2 text-sm text-slate-700">
              <div>
                <p className="font-semibold text-slate-800">Archetypes</p>
                <ul className="mt-1 list-inside list-disc text-slate-600">
                  {zone.archetypes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-slate-800">Recommended functions</p>
                <ul className="mt-1 list-inside list-disc text-slate-600">
                  {zone.recommendedFunctions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 rounded-3xl border border-white/40 bg-white/80 p-6 shadow-inner">
        <div className="inline-flex items-center gap-2 rounded-full border border-sand-200/80 bg-sand-100/60 px-3 py-1 text-xs font-medium uppercase tracking-wide text-sand-700">
          <Compass className="h-3.5 w-3.5" />
          Tech Notes
        </div>
        <p className="text-sm text-slate-700">
          Use this calculator to drive automated layout tagging, personalised rituals and AR overlays
          in the mobile experience. Persist raw azimuth, calibrated offset and resolved zone to power
          recommendations and cross-device sync.
        </p>
        <div className="space-y-3 text-sm">
          <p className="font-semibold text-slate-800">Implementation steps</p>
          <ul className="list-inside list-disc space-y-1 text-slate-600">
            <li>Capture azimuth via LiDAR / compass API and normalise using <code>normaliseDegrees</code>.</li>
            <li>Resolve into MahaVastu zone with <code>getZoneFromDegrees</code>.</li>
            <li>Store readings with user, site, timestamp and device meta for explainability.</li>
            <li>Drive UI dial via <code>computeDialRotationOffset</code> to align virtual layouts.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

type CompassDialProps = {
  rotation: number;
  highlightedIndex: number;
};

function CompassDial({ rotation, highlightedIndex }: CompassDialProps) {
  return (
    <div className="relative flex h-64 w-64 items-center justify-center">
      <motion.div
        className="absolute inset-4 rounded-full border-8 border-sand-200/80 bg-white shadow-lg"
        animate={{ rotate: rotation }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-36 w-1 rounded-full bg-sand-500" />
        </div>
      </motion.div>
      <div className="absolute inset-0 m-4 grid place-items-center">
        {ZONE_SEGMENTS.map((segment, index) => (
          <motion.div
            key={segment.zone}
            className={cn(
              "absolute origin-bottom text-xs font-medium uppercase tracking-wide text-slate-500 transition",
              highlightedIndex === index && "text-sand-600"
            )}
            style={{
              transform: `rotate(${segment.start + 11.25}deg) translateY(-120px) rotate(-${
                segment.start + 11.25
              }deg)`
            }}
            initial={false}
            animate={{
              scale: highlightedIndex === index ? 1.1 : 1,
              opacity: highlightedIndex === index ? 1 : 0.7
            }}
          >
            {segment.zone}
          </motion.div>
        ))}
      </div>
      <div className="absolute inset-0 rounded-full border border-sand-200/80" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-sand-300 bg-white text-sm font-semibold text-sand-700 shadow">
        0°
      </div>
    </div>
  );
}
