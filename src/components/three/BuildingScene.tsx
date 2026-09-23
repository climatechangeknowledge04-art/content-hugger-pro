import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE, Pine, PottedPlant } from "./models";
import { DayRig } from "./environment";
import { GlassLabel } from "./GlassLabel";

type ProgressFn = (() => number) | undefined;

/* ============================================================
 * Phase 1 — the building, revealed floor by floor
 * ============================================================ */

const W = 4.6;
const D = 3.4;
const H = 1.1;

function Slab({
  index,
  explode,
}: {
  index: number;
  explode: React.RefObject<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const baseY = 0.75 + index * (H + 0.14);
  const eased = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    const target = explode.current ?? 0;
    /* frame-rate independent damping keeps the reveal buttery on any device */
    const k = 1 - Math.exp(-6 * delta);
    eased.current += (target - eased.current) * k;
    const e = eased.current;
    group.current.position.y = baseY + e * index * 1.35;
    group.current.position.x = e * (index - 1) * 0.4;
    group.current.rotation.y = e * (index - 1) * 0.05;
  });


  return (
    <group ref={group}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[W, H, D]} />
        <meshStandardMaterial color={PALETTE.bone} roughness={0.75} />
      </mesh>
      <mesh position={[0, H / 2 + 0.04, 0]}>
        <boxGeometry args={[W + 0.24, 0.08, D + 0.24]} />
        <meshStandardMaterial
          color={PALETTE.brass}
          metalness={0.75}
          roughness={0.3}
        />
      </mesh>
      {/* glazing bands both sides */}
      {[D / 2 + 0.02, -D / 2 - 0.02].map((z, i) => (
        <mesh key={i} position={[0, 0, z]} rotation={[0, i ? Math.PI : 0, 0]}>
          <planeGeometry args={[W * 0.84, 0.58]} />
          <meshStandardMaterial
            color={PALETTE.glass}
            emissive={PALETTE.brassLight}
            emissiveIntensity={0.8}
            metalness={0.45}
            roughness={0.15}
          />
        </mesh>
      ))}
      {/* balcony */}
      <group position={[W / 2 + 0.45, -H / 2 + 0.12, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.9, 0.1, D * 0.7]} />
          <meshStandardMaterial color={PALETTE.boneDim} roughness={0.85} />
        </mesh>
        <mesh position={[0.43, 0.32, 0]}>
          <boxGeometry args={[0.04, 0.6, D * 0.7]} />
          <meshStandardMaterial
            color={PALETTE.brass}
            metalness={0.7}
            roughness={0.35}
          />
        </mesh>
        {/* balcony greenery — every floor */}
        <PottedPlant position={[0.05, 0.05, -D * 0.24]} scale={0.55} />
        <PottedPlant position={[0.05, 0.05, D * 0.26]} scale={0.42} />
      </group>

      {/* furnished terrace above each slab: seating, table, planters */}
      <group position={[0, H / 2 + 0.1, 0]}>
        <mesh position={[-W * 0.24, 0.11, D * 0.1]} castShadow>
          <boxGeometry args={[1.1, 0.22, 0.5]} />
          <meshStandardMaterial color="#8A7357" roughness={0.75} />
        </mesh>
        <mesh position={[-W * 0.24, 0.26, D * 0.28]} castShadow>
          <boxGeometry args={[1.1, 0.32, 0.14]} />
          <meshStandardMaterial color="#6E5A43" roughness={0.75} />
        </mesh>
        <mesh position={[W * 0.16, 0.14, -D * 0.16]} castShadow>
          <boxGeometry args={[0.7, 0.06, 0.5]} />
          <meshStandardMaterial color="#5A4632" roughness={0.7} />
        </mesh>
        <mesh position={[W * 0.16, 0.06, -D * 0.16]}>
          <cylinderGeometry args={[0.05, 0.05, 0.14, 8]} />
          <meshStandardMaterial color={PALETTE.brass} metalness={0.7} roughness={0.35} />
        </mesh>
        <PottedPlant position={[W * 0.4, 0.02, D * 0.22]} scale={0.6} />
        <PottedPlant position={[-W * 0.44, 0.02, -D * 0.24]} scale={0.5} />
        {/* rug */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-W * 0.22, 0.015, D * 0.06]}>
          <planeGeometry args={[1.7, 1.1]} />
          <meshStandardMaterial color="#B7A98C" roughness={1} />
        </mesh>
      </group>
    </group>
  );
}

function BuildingModel({ explode }: { explode: React.RefObject<number> }) {
  return (
    <group>
      <mesh position={[0, -0.25, 0]} receiveShadow>
        <boxGeometry args={[6.4, 0.5, 5]} />
        <meshStandardMaterial color={PALETTE.charcoalSoft} roughness={0.95} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <Slab key={i} index={i} explode={explode} />
      ))}
      <Pine position={[3.6, 0, 2]} scale={0.9} />
      <Pine position={[-3.7, 0, 1.4]} scale={1.1} />
    </group>
  );
}

/* ============================================================
 * Phase 2 — inside the residence: real rooms, built in 3D
 * ============================================================ */

const OX = 40; // interior set origin on X

function Wall({
  x,
  z,
  w,
  d,
  h = 2.7,
}: {
  x: number;
  z: number;
  w: number;
  d: number;
  h?: number;
}) {
  return (
    <mesh position={[OX + x, h / 2, z]} castShadow receiveShadow>
      <boxGeometry args={[w, h, d]} />
      <meshStandardMaterial color={PALETTE.sand} roughness={0.95} />
    </mesh>
  );
}

function Sofa({ x, z, rot = 0 }: { x: number; z: number; rot?: number }) {
  return (
    <group position={[OX + x, 0, z]} rotation={[0, rot, 0]}>
      <mesh position={[0, 0.24, 0]} castShadow>
        <boxGeometry args={[2.4, 0.42, 0.95]} />
        <meshStandardMaterial color="#6E6455" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.62, -0.42]} castShadow>
        <boxGeometry args={[2.4, 0.7, 0.2]} />
        <meshStandardMaterial color="#7A6F5E" roughness={0.9} />
      </mesh>
      {[-0.85, 0.85].map((cx) => (
        <mesh key={cx} position={[cx, 0.56, -0.05]} castShadow>
          <boxGeometry args={[0.55, 0.18, 0.62]} />
          <meshStandardMaterial color={PALETTE.boneDim} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function CoffeeTable({ x, z }: { x: number; z: number }) {
  return (
    <group position={[OX + x, 0, z]}>
      <mesh position={[0, 0.36, 0]} castShadow>
        <boxGeometry args={[1.2, 0.06, 0.65]} />
        <meshStandardMaterial
          color={PALETTE.brass}
          metalness={0.6}
          roughness={0.35}
        />
      </mesh>
      {[
        [-0.5, -0.25],
        [0.5, -0.25],
        [-0.5, 0.25],
        [0.5, 0.25],
      ].map(([lx, lz], i) => (
        <mesh key={i} position={[lx!, 0.18, lz!]}>
          <cylinderGeometry args={[0.03, 0.03, 0.36, 8]} />
          <meshStandardMaterial color={PALETTE.charcoalSoft} />
        </mesh>
      ))}
    </group>
  );
}

function Kitchen({ x, z }: { x: number; z: number }) {
  return (
    <group position={[OX + x, 0, z]}>
      {/* run of base cabinets */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.6, 0.9, 0.65]} />
        <meshStandardMaterial color={PALETTE.charcoalSoft} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.93, 0]}>
        <boxGeometry args={[3.7, 0.07, 0.72]} />
        <meshStandardMaterial
          color={PALETTE.boneDim}
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>
      {/* wall units */}
      <mesh position={[0, 1.85, -0.1]} castShadow>
        <boxGeometry args={[3.2, 0.7, 0.4]} />
        <meshStandardMaterial color={PALETTE.bone} roughness={0.75} />
      </mesh>
      <mesh position={[0, 1.45, -0.12]}>
        <boxGeometry args={[3.2, 0.04, 0.36]} />
        <meshStandardMaterial
          color={PALETTE.brass}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
      {/* island + stools */}
      <group position={[0.2, 0, 1.9]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <boxGeometry args={[2.1, 0.9, 0.9]} />
          <meshStandardMaterial color="#3A362F" roughness={0.55} />
        </mesh>
        <mesh position={[0, 0.94, 0]}>
          <boxGeometry args={[2.25, 0.08, 1.05]} />
          <meshStandardMaterial color={PALETTE.sand} roughness={0.25} />
        </mesh>
        {[-0.6, 0.15, 0.9].map((sx) => (
          <group key={sx} position={[sx, 0, 0.95]}>
            <mesh position={[0, 0.62, 0]} castShadow>
              <cylinderGeometry args={[0.19, 0.19, 0.08, 14]} />
              <meshStandardMaterial color="#6E6455" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.04, 0.05, 0.6, 10]} />
              <meshStandardMaterial
                color={PALETTE.brass}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          </group>
        ))}
      </group>
      <PottedPlant position={[-1.6, 1, -0.1]} scale={0.6} />
    </group>
  );
}

function Bedroom({ x, z }: { x: number; z: number }) {
  return (
    <group position={[OX + x, 0, z]}>
      {/* bed */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.1, 0.44, 2.3]} />
        <meshStandardMaterial color="#4A423A" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.5, 0.05]} castShadow>
        <boxGeometry args={[2.0, 0.22, 2.15]} />
        <meshStandardMaterial color={PALETTE.sand} roughness={0.95} />
      </mesh>
      {/* folded throw */}
      <mesh position={[0, 0.62, 0.7]}>
        <boxGeometry args={[2.0, 0.06, 0.7]} />
        <meshStandardMaterial color={PALETTE.brassLight} roughness={0.9} />
      </mesh>
      {/* pillows */}
      {[-0.48, 0.48].map((px) => (
        <mesh key={px} position={[px, 0.68, -0.85]} castShadow>
          <boxGeometry args={[0.85, 0.18, 0.45]} />
          <meshStandardMaterial color={PALETTE.boneDim} roughness={0.95} />
        </mesh>
      ))}
      {/* headboard */}
      <mesh position={[0, 0.8, -1.24]} castShadow>
        <boxGeometry args={[2.3, 1.2, 0.14]} />
        <meshStandardMaterial color="#5C5346" roughness={0.85} />
      </mesh>
      {/* side tables + brass lamps */}
      {[-1.45, 1.45].map((sx) => (
        <group key={sx} position={[sx, 0, -1]}>
          <mesh position={[0, 0.26, 0]} castShadow>
            <boxGeometry args={[0.5, 0.52, 0.45]} />
            <meshStandardMaterial color={PALETTE.charcoalSoft} roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.72, 0]}>
            <coneGeometry args={[0.17, 0.26, 14]} />
            <meshStandardMaterial
              color={PALETTE.brassLight}
              emissive={PALETTE.brassLight}
              emissiveIntensity={1.4}
              metalness={0.6}
              roughness={0.3}
            />
          </mesh>
          <pointLight
            position={[0, 0.8, 0]}
            intensity={1.4}
            distance={4}
            color="#FFD9A0"
          />
        </group>
      ))}
      <PottedPlant position={[2.1, 0, 1.1]} scale={1.1} />
    </group>
  );
}

function Balcony({ x, z }: { x: number; z: number }) {
  return (
    <group position={[OX + x, 0, z]}>
      {/* deck */}
      <mesh
        position={[0, 0.02, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[6.4, 3.6]} />
        <meshStandardMaterial color="#6A5B45" roughness={0.95} />
      </mesh>
      {/* glass balustrade with brass handrail */}
      <mesh position={[0, 0.6, -1.8]}>
        <boxGeometry args={[6.4, 1.15, 0.05]} />
        <meshPhysicalMaterial
          color="#9FB3BE"
          transparent
          opacity={0.24}
          roughness={0.08}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0, 1.2, -1.8]}>
        <boxGeometry args={[6.5, 0.07, 0.12]} />
        <meshStandardMaterial
          color={PALETTE.brass}
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>
      {/* two lounge chairs + side table */}
      {[-1.4, 1.4].map((cx) => (
        <group key={cx} position={[cx, 0, -0.5]}>
          <mesh position={[0, 0.34, 0]} castShadow>
            <boxGeometry args={[0.8, 0.12, 0.8]} />
            <meshStandardMaterial color={PALETTE.boneDim} roughness={0.9} />
          </mesh>
          <mesh position={[0, 0.62, -0.34]} castShadow>
            <boxGeometry args={[0.8, 0.55, 0.12]} />
            <meshStandardMaterial color={PALETTE.boneDim} roughness={0.9} />
          </mesh>
          {[
            [-0.32, -0.32],
            [0.32, -0.32],
            [-0.32, 0.32],
            [0.32, 0.32],
          ].map(([lx, lz], i) => (
            <mesh key={i} position={[lx!, 0.15, lz!]}>
              <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
              <meshStandardMaterial
                color={PALETTE.brass}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>
          ))}
        </group>
      ))}
      {/* planting */}
      <PottedPlant position={[-2.7, 0, -1.2]} scale={1.3} />
      <PottedPlant position={[2.7, 0, -1.2]} scale={1.15} />
      <PottedPlant position={[0, 0, -1.4]} scale={0.85} />
    </group>
  );
}

export function Apartment() {
  return (
    <group>
      {/* floor plate */}
      <mesh
        position={[OX + 0, 0, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color="#8A7A63" roughness={0.85} />
      </mesh>
      {/* ceiling */}
      <mesh position={[OX + 0, 2.75, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color={PALETTE.sand} roughness={1} />
      </mesh>
      {/* shell walls (balcony side left open) */}
      <Wall x={0} z={5} w={14} d={0.2} />
      <Wall x={7} z={0} w={0.2} d={10} />
      <Wall x={-7} z={1.5} w={0.2} d={7} />
      <Wall x={3.5} z={-5} w={7} d={0.2} />
      {/* internal partitions */}
      <Wall x={0} z={-1} w={0.16} d={8} h={2.7} />
      <Wall x={3.5} z={1} w={7} d={0.16} h={2.7} />

      {/* rooms */}
      <Sofa x={-3.6} z={2.2} rot={0.15} />
      <CoffeeTable x={-3.4} z={3.6} />
      <PottedPlant position={[OX - 6, 0, 3.9]} scale={1.4} />
      <Kitchen x={4.4} z={4.2} />
      <Bedroom x={4.2} z={-2.6} />
      <Balcony x={-3.6} z={-3} />

      {/* warm interior light */}
      <pointLight
        position={[OX - 3, 2.4, 2]}
        intensity={12}
        distance={12}
        color="#FFE0B2"
      />
      <pointLight
        position={[OX + 4, 2.4, 3]}
        intensity={10}
        distance={12}
        color="#FFE9C9"
      />
      <pointLight
        position={[OX - 3, 2.2, -3]}
        intensity={9}
        distance={12}
        color="#CFE0F2"
      />

      <GlassLabel
        position={[OX - 3.6, 1.9, 2.2]}
        eyebrow="Room 01"
        title="Living Room"
        meta="Valley-facing glazing"
      />
      <GlassLabel
        position={[OX + 4.4, 2.1, 4.2]}
        eyebrow="Room 02"
        title="Kitchen"
        meta="Island · stone counters"
        align="right"
      />
      <GlassLabel
        position={[OX + 4.2, 1.9, -2.6]}
        eyebrow="Room 03"
        title="Master Bedroom"
        meta="Brass lamps · oak headboard"
        align="right"
      />
      <GlassLabel
        position={[OX - 3.6, 1.7, -3]}
        eyebrow="Room 04"
        title="Balcony Garden"
        meta="Dhauladhars, uninterrupted"
      />
    </group>
  );
}

/* ============================================================
 * Scroll-driven camera across both phases
 * ============================================================ */

type Stop = {
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
};

const STOPS: Stop[] = [
  { p: 0.0, pos: [9, 4.4, 12], look: [0, 1.8, 0] },
  { p: 0.16, pos: [11, 7.5, 13], look: [0, 2.6, 0] },
  { p: 0.3, pos: [4, 6.4, 9.5], look: [0, 2.4, 0] },
  { p: 0.42, pos: [OX - 9, 1.75, 7.5], look: [OX - 4, 1.6, 2] },
  { p: 0.55, pos: [OX - 5.4, 1.7, 4.6], look: [OX - 3.4, 1.4, 1.4] },
  { p: 0.68, pos: [OX + 1.4, 1.7, 2.0], look: [OX + 4.6, 1.15, 4.4] },
  { p: 0.82, pos: [OX + 1.2, 1.7, 0.2], look: [OX + 4.4, 1.2, -2.8] },
  { p: 1.0, pos: [OX - 3.4, 1.7, 0.6], look: [OX - 3.6, 1.1, -5.4] },
];

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function ScrollRig({
  progress,
  explode,
}: {
  progress: ProgressFn;
  explode: React.RefObject<number>;
}) {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3(...STOPS[0]!.pos));
  const look = useRef(new THREE.Vector3(...STOPS[0]!.look));
  const a = useRef(new THREE.Vector3());
  const b = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    // Keep the original building on screen throughout this chapter; the room
    // walkthrough is shown separately with photography after the reveal.
    const p = THREE.MathUtils.clamp(progress ? progress() : 0, 0, 0.3);

    /* floors separate between 4% and 26% of the section, then re-stack */
    explode.current = THREE.MathUtils.clamp((p - 0.04) / 0.22, 0, 1);

    let i = 0;
    while (i < STOPS.length - 2 && p > STOPS[i + 1]!.p) i++;
    const from = STOPS[i]!;
    const to = STOPS[i + 1]!;
    const local = easeInOut(
      THREE.MathUtils.clamp((p - from.p) / (to.p - from.p), 0, 1),
    );

    a.current.set(
      from.pos[0] + (to.pos[0] - from.pos[0]) * local,
      from.pos[1] + (to.pos[1] - from.pos[1]) * local,
      from.pos[2] + (to.pos[2] - from.pos[2]) * local,
    );
    b.current.set(
      from.look[0] + (to.look[0] - from.look[0]) * local,
      from.look[1] + (to.look[1] - from.look[1]) * local,
      from.look[2] + (to.look[2] - from.look[2]) * local,
    );

    const k = 1 - Math.pow(0.0006, delta);
    pos.current.lerp(a.current, k);
    look.current.lerp(b.current, k);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);
  });
  return null;
}

export default function BuildingScene({ progress }: { progress?: ProgressFn }) {
  const explode = useRef(0);
  return (
    <Canvas
      shadows
      dpr={[1, 1.7]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      camera={{ position: STOPS[0]!.pos, fov: 48 }}
    >
      <DayRig />
      <ScrollRig progress={progress} explode={explode} />
      <BuildingModel explode={explode} />
    </Canvas>
  );
}
