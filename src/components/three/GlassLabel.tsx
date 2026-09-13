import { Html } from "@react-three/drei";
import type { ReactNode } from "react";

/**
 * A frosted-glass annotation anchored to a point in the 3D scene, with a
 * brass leader line running back to the model it describes — the way an
 * architect tags a physical maquette.
 */
export function GlassLabel({
  position,
  eyebrow,
  title,
  meta,
  align = "left",
  leader = 56,
  children,
}: {
  position: [number, number, number];
  eyebrow?: string;
  title: string;
  meta?: string;
  align?: "left" | "right";
  leader?: number;
  children?: ReactNode;
}) {
  return (
    <Html position={position} center zIndexRange={[20, 0]} occlude={false}>
      <div
        className={`pointer-events-none flex items-center gap-0 ${
          align === "right" ? "flex-row-reverse" : ""
        }`}
      >
        <span className="mv-anchor" />
        <span className="mv-leader" style={{ width: leader }} />
        <div className="glass-panel px-4 py-3 whitespace-nowrap">
          {eyebrow ? (
            <p className="text-[0.5rem] font-semibold tracking-[0.3em] text-brass uppercase">
              {eyebrow}
            </p>
          ) : null}
          <p className="mt-1 font-display text-lg leading-tight font-medium text-sand">
            {title}
          </p>
          {meta ? (
            <p className="mt-0.5 text-[0.6rem] font-medium tracking-[0.16em] text-sand/65 uppercase">
              {meta}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    </Html>
  );
}
