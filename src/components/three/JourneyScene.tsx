import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ValleyWorld } from "./World";

type ProgressFn = (() => number) | undefined;

/** Camera waypoints: peaks → village → school → stadium → viewpoint → residence. */
const WAYPOINTS: { pos: [number, number, number]; look: [number, number, number] }[] = [
  { pos: [-2, 30, 12], look: [4, 30, -70] },
  { pos: [-6, 14, -8], look: [-6, 3, -30] },
  { pos: [26, 11, -4], look: [24, 2, -20] },
  { pos: [-17, 10, 8], look: [-17, 1.4, -9] },
  { pos: [17, 6, 24], look: [13, 1.2, 14] },
  { pos: [9, 6.5, 16], look: [0, 2.6, 5] },
];

function lerpVec(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
  out: THREE.Vector3,
) {
  out.set(
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  );
  return out;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function ScrollCamera({ progress }: { progress: ProgressFn }) {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3(...WAYPOINTS[0]!.pos));
  const look = useRef(new THREE.Vector3(...WAYPOINTS[0]!.look));
  const tmpA = useRef(new THREE.Vector3());
  const tmpB = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    const p = THREE.MathUtils.clamp(progress ? progress() : 0, 0, 0.9999);
    const span = 1 / (WAYPOINTS.length - 1);
    const i = Math.min(Math.floor(p / span), WAYPOINTS.length - 2);
    const local = easeInOut((p - i * span) / span);
    const from = WAYPOINTS[i]!;
    const to = WAYPOINTS[i + 1]!;

    lerpVec(from.pos, to.pos, local, tmpA.current);
    lerpVec(from.look, to.look, local, tmpB.current);

    const k = 1 - Math.pow(0.0008, delta);
    pos.current.lerp(tmpA.current, k);
    look.current.lerp(tmpB.current, k);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);
  });
  return null;
}

export default function JourneyScene({ progress }: { progress?: ProgressFn }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.7]}
      gl={{ antialias: true }}
      camera={{ position: WAYPOINTS[0]!.pos, fov: 45 }}
    >
      <fog attach="fog" args={["#C9D8E6", 120, 330]} />
      <ScrollCamera progress={progress} />
      <ValleyWorld />
    </Canvas>
  );
}
