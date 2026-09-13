import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, useTexture } from "@react-three/drei";
import { Suspense } from "react";
import panorama from "@/assets/dhauladhar-panorama.jpg.asset.json";
import * as THREE from "three";
import { CEILING, ROOMS, WALK, walkable, type Room } from "@/lib/floorplan";
import { walkInput } from "@/lib/walk-input";

const WALL_T = 0.55;
const EYE = 5.4;

type Seg = { x: number; z: number; w: number; d: number };

/** Split one room edge into wall segments, leaving the doorways empty. */
function edgeSegments(room: Room, edge: "n" | "s" | "e" | "w"): Seg[] {
  const horizontal = edge === "n" || edge === "s";
  const start = horizontal ? room.x1 : room.z1;
  const end = horizontal ? room.x2 : room.z2;
  const fixed =
    edge === "n" ? room.z1 : edge === "s" ? room.z2 : edge === "w" ? room.x1 : room.x2;

  const gaps = room.doors
    .filter((d) => d.edge === edge)
    .map((d) => {
      const c = start + d.at;
      const half = (d.width ?? 3) / 2;
      return [c - half, c + half] as const;
    })
    .sort((a, b) => a[0] - b[0]);

  const spans: [number, number][] = [];
  let cursor = start;
  for (const [a, b] of gaps) {
    if (a > cursor) spans.push([cursor, a]);
    cursor = Math.max(cursor, b);
  }
  if (cursor < end) spans.push([cursor, end]);

  return spans
    .filter(([a, b]) => b - a > 0.05)
    .map(([a, b]) =>
      horizontal
        ? { x: (a + b) / 2, z: fixed, w: b - a + WALL_T, d: WALL_T }
        : { x: fixed, z: (a + b) / 2, w: WALL_T, d: b - a + WALL_T },
    );
}

function Walls() {
  const segs = useMemo(() => {
    const out: Seg[] = [];
    for (const r of ROOMS) {
      if (r.kind === "balcony") continue;
      for (const e of ["n", "s", "e", "w"] as const) out.push(...edgeSegments(r, e));
    }
    return out;
  }, []);

  return (
    <group>
      {segs.map((s, i) => (
        <mesh
          key={i}
          position={[s.x, CEILING / 2, s.z]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[s.w, CEILING, s.d]} />
          <meshStandardMaterial color="#e8ded0" roughness={0.92} />
        </mesh>
      ))}
    </group>
  );
}

function Ceilings() {
  return (
    <group>
      {ROOMS.filter((r) => r.kind === "room").map((r) => (
        <mesh
          key={r.id}
          rotation-x={Math.PI / 2}
          position={[(r.x1 + r.x2) / 2, CEILING - 0.02, (r.z1 + r.z2) / 2]}
        >
          <planeGeometry args={[r.x2 - r.x1, r.z2 - r.z1]} />
          <meshStandardMaterial color="#f2ebe0" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/** What you see from the balconies: the valley and the Dhauladhar ridge. */
function Backdrop() {
  const tex = useTexture(panorama.url);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.repeat.x = 3;
  return (
    <mesh position={[17, 5, 13]}>
      <cylinderGeometry args={[320, 320, 210, 48, 1, true]} />
      <meshBasicMaterial map={tex} side={THREE.BackSide} toneMapped={false} />
    </mesh>
  );
}

function Outside() {
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[17, -55, 13]} receiveShadow>
        <planeGeometry args={[900, 900]} />
        <meshStandardMaterial color="#3f5236" roughness={1} />
      </mesh>
      <Suspense fallback={null}>
        <Backdrop />
      </Suspense>
    </group>
  );
}

function Floors() {
  return (
    <group>
      {ROOMS.map((r) => {
        const w = r.x2 - r.x1;
        const d = r.z2 - r.z1;
        const wet = r.id.startsWith("toilet");
        return (
          <mesh
            key={r.id}
            rotation-x={-Math.PI / 2}
            position={[(r.x1 + r.x2) / 2, 0.02, (r.z1 + r.z2) / 2]}
            receiveShadow
          >
            <planeGeometry args={[w, d]} />
            <meshStandardMaterial
              color={
                r.kind === "balcony" ? "#8b8378" : wet ? "#c8c3ba" : "#8a5f38"
              }
              roughness={r.kind === "balcony" ? 0.95 : 0.55}
              metalness={0.05}
            />
          </mesh>
        );
      })}
    </group>
  );
}

/** Simple, warm furniture so each room reads as a lived-in space. */
function Box({
  p,
  s,
  color,
}: {
  p: [number, number, number];
  s: [number, number, number];
  color: string;
}) {
  return (
    <mesh position={p} castShadow receiveShadow>
      <boxGeometry args={s} />
      <meshStandardMaterial color={color} roughness={0.7} />
    </mesh>
  );
}

function Furniture() {
  return (
    <group>
      {/* Living */}
      <Box p={[4, 0.8, 8]} s={[7, 1.6, 3]} color="#6d4c3d" />
      <Box p={[9.5, 0.6, 12]} s={[4, 1.2, 2.4]} color="#7b5a45" />
      <Box p={[6.5, 0.25, 9.5]} s={[9, 0.06, 7]} color="#5d4632" />
      {/* Kitchen counters */}
      <Box p={[18, 1.5, 1.2]} s={[7, 3, 2]} color="#3f3a34" />
      <Box p={[15, 1.5, 5]} s={[1.6, 3, 6]} color="#3f3a34" />
      {/* Bedroom 3 */}
      <Box p={[27, 1.1, 5]} s={[6.5, 2.2, 7]} color="#6d4c3d" />
      {/* Bedroom 2 */}
      <Box p={[6, 1.1, 25]} s={[6.5, 2.2, 7]} color="#6d4c3d" />
      {/* Master */}
      <Box p={[19, 1.2, 26]} s={[7, 2.4, 7.5]} color="#5f4436" />
      <Box p={[14, 1.4, 22]} s={[1.2, 2.8, 4]} color="#4a3a30" />
      {/* Balcony railings */}
      <Box p={[7, 1.7, -3.9]} s={[14, 0.12, 0.2]} color="#b08d57" />
      <Box p={[18.8, 1.7, 33.2]} s={[13.6, 0.12, 0.2]} color="#b08d57" />
    </group>
  );
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function WalkCamera({ progress }: { progress?: (() => number) | undefined }) {
  const { camera } = useThree();
  const pos = useRef(new THREE.Vector3(WALK[0]!.pos[0], EYE, WALK[0]!.pos[1]));
  const look = useRef(new THREE.Vector3(WALK[0]!.look[0], EYE, WALK[0]!.look[1]));
  const target = useRef(new THREE.Vector3());
  const aim = useRef(new THREE.Vector3());

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const cam = camera as THREE.PerspectiveCamera;
    const wantFov = state.viewport.aspect < 1 ? 88 : 66;
    if (cam.fov !== wantFov) {
      cam.fov = wantFov;
      cam.updateProjectionMatrix();
    }

    if (walkInput.mode === "plan") {
      target.current.set(17, 58, 34);
      aim.current.set(17, 0, 13);
      camera.position.lerp(target.current, 1 - Math.exp(-4 * dt));
      look.current.lerp(aim.current, 1 - Math.exp(-4 * dt));
      camera.lookAt(look.current);
      return;
    }

    if (walkInput.manual) {
      const speed = 9;
      const yaw = walkInput.yaw;
      const fx = Math.sin(yaw);
      const fz = -Math.cos(yaw);
      const nx = pos.current.x + (fx * walkInput.move.y + Math.cos(yaw) * walkInput.move.x) * speed * dt;
      const nz = pos.current.z + (fz * walkInput.move.y + Math.sin(yaw) * walkInput.move.x) * speed * dt;
      if (walkable(nx, pos.current.z)) pos.current.x = nx;
      if (walkable(pos.current.x, nz)) pos.current.z = nz;
      pos.current.y = EYE;
      camera.position.copy(pos.current);
      const pitch = THREE.MathUtils.clamp(walkInput.pitch, -0.7, 0.7);
      aim.current.set(
        pos.current.x + Math.sin(yaw) * 10,
        EYE + Math.tan(pitch) * 10,
        pos.current.z - Math.cos(yaw) * 10,
      );
      camera.lookAt(aim.current);
      return;
    }

    /* Guided tour, driven by page scroll */
    const p = THREE.MathUtils.clamp(progress ? progress() : 0, 0, 0.9999);
    const span = 1 / (WALK.length - 1);
    const i = Math.min(Math.floor(p / span), WALK.length - 2);
    const t = easeInOut((p - i * span) / span);
    const a = WALK[i]!;
    const b = WALK[i + 1]!;

    target.current.set(
      a.pos[0] + (b.pos[0] - a.pos[0]) * t,
      EYE,
      a.pos[1] + (b.pos[1] - a.pos[1]) * t,
    );
    aim.current.set(
      a.look[0] + (b.look[0] - a.look[0]) * t,
      EYE - 0.4,
      a.look[1] + (b.look[1] - a.look[1]) * t,
    );

    const k = 1 - Math.exp(-5 * dt);
    pos.current.lerp(target.current, k);
    look.current.lerp(aim.current, k);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);

    /* keep the manual camera in sync so taking over feels seamless */
    walkInput.yaw = Math.atan2(
      look.current.x - pos.current.x,
      -(look.current.z - pos.current.z),
    );
  });

  return null;
}

export default function FloorPlanScene({
  progress,
}: {
  progress?: (() => number) | undefined;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{ antialias: true }}
      camera={{ position: [WALK[0]!.pos[0], EYE, WALK[0]!.pos[1]], fov: 68, near: 0.1, far: 400 }}
    >
      <color attach="background" args={["#b9cfe2"]} />
      <fog attach="fog" args={["#b9cfe2", 160, 520]} />
      <ambientLight intensity={0.75} />
      <hemisphereLight args={["#fff0dc", "#3a2f26", 0.7]} />
      <directionalLight
        position={[30, 40, -20]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[7, 8, 8]} intensity={35} color="#ffd9a8" distance={30} />
      <pointLight position={[19, 8, 25]} intensity={30} color="#ffd9a8" distance={30} />
      <pointLight position={[26, 8, 15]} intensity={22} color="#ffe3bd" distance={26} />
      <Environment>
        <Lightformer intensity={1.4} position={[0, 20, 0]} scale={[40, 40, 1]} />
        <Lightformer
          intensity={1}
          color="#cfe2ff"
          position={[-20, 6, 0]}
          rotation-y={Math.PI / 2}
          scale={[40, 8, 1]}
        />
      </Environment>
      <Outside />
      <Floors />
      <Ceilings />
      <Walls />
      <Furniture />
      <WalkCamera progress={progress} />
    </Canvas>
  );
}
