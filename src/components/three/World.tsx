import { Suspense } from "react";
import { Pine, Residence, School, Stadium, TownCluster, Viewpoint } from "./models";
import { DayRig, PhotoGround, PhotoSky } from "./environment";
import { DhauladharRange } from "./mountains";

const PINES: [number, number, number][] = [
  [12, 0, 2],
  [15, 0, -3],
  [9, 0, 8],
  [-8, 0, 9],
  [-24, 0, 4],
  [20, 0, -12],
  [-4, 0, 14],
  [28, 0, 4],
  [34, 0, -6],
  [-34, 0, -4],
];

/**
 * The shared Kangra valley world: real photographic mountains and terrain,
 * with the residence, HPCA-style stadium, village, school and viewpoint
 * modelled in 3D on top of it.
 */
export function ValleyWorld() {
  return (
    <>
      <DayRig />
      <Suspense fallback={null}>
        <PhotoSky />
        <PhotoGround />
      </Suspense>
      <DhauladharRange />

      <Residence position={[0, 0, 5]} />
      <Stadium position={[-17, -0.6, -9]} scale={1.15} />
      <School position={[16, -0.6, -20]} scale={0.9} />
      <Viewpoint position={[13, -0.55, 14]} rotation={-0.5} />
      <TownCluster position={[-6, -0.6, -30]} count={16} spread={22} seed={3} />
      <TownCluster position={[34, -0.6, 8]} count={10} spread={14} seed={9} />

      {PINES.map((p, i) => (
        <Pine key={i} position={p} scale={1.2 + (i % 3) * 0.5} />
      ))}
    </>
  );
}
