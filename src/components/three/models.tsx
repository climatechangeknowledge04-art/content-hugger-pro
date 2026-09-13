import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ---------------------------------------------------------------
 * Mont Vue — procedural architectural maquette models.
 * Palette mirrors the design system: bone, charcoal, brass, slate.
 * ------------------------------------------------------------- */

export const PALETTE = {
  bone: "#E9E2D0",
  boneDim: "#CFC6AF",
  sand: "#F5F1E8",
  charcoal: "#1A1A1A",
  charcoalSoft: "#2A2A28",
  brass: "#B08D57",
  brassLight: "#C9A86C",
  slate: "#4A5057",
  slateDeep: "#33383D",
  snow: "#F2F4F6",
  moss: "#5C6B4E",
  glass: "#7E8C93",
};

/* ---------- Himachali village architecture ---------- */

const ROOFS = ["#3F7F6B", "#A6402F", "#4E6E86", "#7E5A33"];

/** A single Kangra-style house: rendered walls, pitched tin roof, windows. */
export function House({
  position,
  rotation = 0,
  scale = 1,
  roof = 0,
  storeys = 2,
}: {
  position: [number, number, number];
  rotation?: number;
  scale?: number;
  roof?: number;
  storeys?: number;
}) {
  const h = 1.1 * storeys;
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <mesh position={[0, h / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, h, 2.1]} />
        <meshStandardMaterial color="#DCD3C0" roughness={0.9} />
      </mesh>
      {/* pitched roof */}
      <mesh position={[0, h + 0.42, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[2.1, 0.9, 4, 1]} />
        <meshStandardMaterial
          color={ROOFS[roof % ROOFS.length]!}
          flatShading
          roughness={0.55}
          metalness={0.25}
        />
      </mesh>
      {/* windows */}
      {Array.from({ length: storeys }, (_, s) =>
        [-0.7, 0.7].map((x) => (
          <mesh key={`${s}-${x}`} position={[x, 0.62 + s * 1.1, 1.06]}>
            <planeGeometry args={[0.5, 0.55]} />
            <meshStandardMaterial
              color="#2E3A40"
              roughness={0.1}
              metalness={0.6}
              emissive="#C9A86C"
              emissiveIntensity={0.25}
            />
          </mesh>
        )),
      )}
      {/* door */}
      <mesh position={[0, 0.45, 1.07]}>
        <planeGeometry args={[0.46, 0.9]} />
        <meshStandardMaterial color="#5A3E27" roughness={0.7} />
      </mesh>
    </group>
  );
}

/** A hillside cluster of village houses — the valley spread, in 3D. */
export function TownCluster({
  position = [0, 0, 0] as [number, number, number],
  count = 14,
  spread = 18,
  seed = 1,
}) {
  const houses = useMemo(() => {
    const rnd = (n: number) => {
      const x = Math.sin(n * 127.1 + seed * 311.7) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: count }, (_, i) => ({
      p: [
        (rnd(i) - 0.5) * spread * 2,
        0,
        (rnd(i + 50) - 0.5) * spread,
      ] as [number, number, number],
      r: rnd(i + 90) * Math.PI,
      s: 0.55 + rnd(i + 130) * 0.45,
      roof: Math.floor(rnd(i + 170) * 4),
      st: rnd(i + 210) > 0.6 ? 3 : 2,
    }));
  }, [count, spread, seed]);

  return (
    <group position={position}>
      {houses.map((h, i) => (
        <House
          key={i}
          position={h.p}
          rotation={h.r}
          scale={h.s}
          roof={h.roof}
          storeys={h.st}
        />
      ))}
    </group>
  );
}

/** Hillside school: long block, courtyard, flagpole, playing field. */
export function School({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 3, 3.4]} />
        <meshStandardMaterial color="#E6DCC6" roughness={0.9} />
      </mesh>
      <mesh position={[0, 3.35, 0]}>
        <boxGeometry args={[12.6, 0.35, 4]} />
        <meshStandardMaterial color="#A6402F" roughness={0.5} metalness={0.25} />
      </mesh>
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} position={[-5 + i * 1.25, 1.7, 1.72]}>
          <planeGeometry args={[0.7, 0.8]} />
          <meshStandardMaterial color="#33454E" roughness={0.15} metalness={0.5} />
        </mesh>
      ))}
      {/* wings */}
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 6.6, 1.2, -3]} castShadow>
          <boxGeometry args={[3.2, 2.4, 6]} />
          <meshStandardMaterial color="#DDD2BB" roughness={0.9} />
        </mesh>
      ))}
      {/* playing field */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 7.5]} receiveShadow>
        <circleGeometry args={[7.5, 40]} />
        <meshStandardMaterial color="#5F7A4A" roughness={1} />
      </mesh>
      {/* flagpole */}
      <mesh position={[7.5, 2.4, 5]}>
        <cylinderGeometry args={[0.06, 0.06, 4.8, 8]} />
        <meshStandardMaterial color="#9AA0A6" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[8.1, 4.4, 5]}>
        <planeGeometry args={[1.2, 0.75]} />
        <meshStandardMaterial color="#E4761B" roughness={0.8} />
      </mesh>
    </group>
  );
}

/** Public viewpoint deck over the valley. */
export function Viewpoint({
  position = [0, 0, 0] as [number, number, number],
  rotation = 0,
  scale = 1,
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <mesh position={[0, 0.1, 0]} receiveShadow castShadow>
        <boxGeometry args={[6, 0.2, 4]} />
        <meshStandardMaterial color="#6B5236" roughness={0.85} />
      </mesh>
      {[-2.9, 2.9].map((x) => (
        <mesh key={x} position={[x, 0.7, 0]}>
          <boxGeometry args={[0.08, 1, 4]} />
          <meshStandardMaterial color={PALETTE.brass} metalness={0.7} roughness={0.35} />
        </mesh>
      ))}
      <mesh position={[0, 0.7, 1.95]}>
        <boxGeometry args={[6, 1, 0.08]} />
        <meshStandardMaterial color={PALETTE.brass} metalness={0.7} roughness={0.35} />
      </mesh>
      {/* telescope */}
      <group position={[1.6, 0.9, 0.9]} rotation={[0, -0.5, 0.35]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.16, 1.1, 12]} />
          <meshStandardMaterial color="#2E3338" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.06, 0.08, 0.9, 8]} />
          <meshStandardMaterial color="#4A5057" metalness={0.6} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

/* ---------- Pine / deodar ---------- */

export function Pine({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.09, 0.13, 0.7, 6]} />
        <meshStandardMaterial color="#3C332A" roughness={1} />
      </mesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0.85 + i * 0.62, 0]}>
          <coneGeometry args={[0.78 - i * 0.2, 1.15, 7, 1]} />
          <meshStandardMaterial color={PALETTE.moss} flatShading roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

/* ---------- Potted plant (used inside the interiors) ---------- */

export function PottedPlant({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const leaves = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (leaves.current) {
      leaves.current.rotation.z = Math.sin(clock.elapsedTime * 0.9) * 0.045;
    }
  });
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.16, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.14, 0.32, 12]} />
        <meshStandardMaterial
          color={PALETTE.brassLight}
          roughness={0.4}
          metalness={0.5}
        />
      </mesh>
      <group ref={leaves} position={[0, 0.32, 0]}>
        {[0, 1, 2, 3, 4].map((i) => {
          const a = (i / 5) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.16, 0.34, Math.sin(a) * 0.16]}
              rotation={[Math.cos(a) * 0.5, a, Math.sin(a) * 0.5]}
            >
              <sphereGeometry args={[0.26, 10, 8]} />
              <meshStandardMaterial
                color={PALETTE.moss}
                flatShading
                roughness={0.9}
              />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

/* ---------- HPCA stadium: bowl of stands around a lit pitch ---------- */

export function Stadium({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
}) {
  const stands = useMemo(
    () => Array.from({ length: 26 }, (_, i) => (i / 26) * Math.PI * 2),
    [],
  );
  return (
    <group position={position} scale={scale}>
      {/* pitch */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.05, 0]}
        receiveShadow
      >
        <circleGeometry args={[3.1, 48]} />
        <meshStandardMaterial color="#4E6B45" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.07, 0]}>
        <planeGeometry args={[0.55, 2.4]} />
        <meshStandardMaterial color={PALETTE.boneDim} roughness={1} />
      </mesh>
      {/* tiered stands */}
      {stands.map((a, i) => (
        <group key={i} rotation={[0, a, 0]}>
          <mesh position={[0, 0.55, 3.65]} rotation={[-0.42, 0, 0]} castShadow>
            <boxGeometry args={[0.85, 1.5, 0.34]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? PALETTE.boneDim : PALETTE.bone}
              flatShading
              roughness={0.8}
            />
          </mesh>
        </group>
      ))}
      {/* roof ring */}
      <mesh position={[0, 1.42, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.0, 0.14, 8, 48]} />
        <meshStandardMaterial
          color={PALETTE.brass}
          metalness={0.7}
          roughness={0.35}
        />
      </mesh>
      {/* floodlights */}
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
        return (
          <group key={i} position={[Math.cos(a) * 4.5, 0, Math.sin(a) * 4.5]}>
            <mesh position={[0, 1.5, 0]}>
              <cylinderGeometry args={[0.07, 0.09, 3, 6]} />
              <meshStandardMaterial color={PALETTE.slate} roughness={0.6} />
            </mesh>
            <mesh position={[0, 3.1, 0]}>
              <boxGeometry args={[0.9, 0.4, 0.14]} />
              <meshStandardMaterial
                color={PALETTE.sand}
                emissive={PALETTE.brassLight}
                emissiveIntensity={1.6}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/* ---------- Mont Vue residence: three-storey maquette ---------- */

export function WindowBand({
  width,
  y,
  depth,
  lit = true,
}: {
  width: number;
  y: number;
  depth: number;
  lit?: boolean;
}) {
  return (
    <>
      <mesh position={[0, y, depth / 2 + 0.02]}>
        <planeGeometry args={[width * 0.82, 0.55]} />
        <meshStandardMaterial
          color={PALETTE.glass}
          emissive={lit ? PALETTE.brassLight : "#000000"}
          emissiveIntensity={lit ? 0.85 : 0}
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>
      <mesh position={[0, y, -depth / 2 - 0.02]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width * 0.82, 0.55]} />
        <meshStandardMaterial
          color={PALETTE.glass}
          emissive={lit ? PALETTE.brassLight : "#000000"}
          emissiveIntensity={lit ? 0.6 : 0}
          roughness={0.15}
          metalness={0.4}
        />
      </mesh>
    </>
  );
}

/** One residential floor slab, used both in the hero villa and the exploded model. */
export function FloorSlab({
  y,
  width = 4.4,
  depth = 3.2,
  height = 1.05,
  lit = true,
  balcony = true,
}: {
  y: number;
  width?: number;
  depth?: number;
  height?: number;
  lit?: boolean;
  balcony?: boolean;
}) {
  return (
    <group position={[0, y, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={PALETTE.bone} roughness={0.75} />
      </mesh>
      {/* brass slab edge */}
      <mesh position={[0, height / 2 + 0.03, 0]}>
        <boxGeometry args={[width + 0.22, 0.07, depth + 0.22]} />
        <meshStandardMaterial
          color={PALETTE.brass}
          metalness={0.75}
          roughness={0.3}
        />
      </mesh>
      <WindowBand width={width} depth={depth} y={0.02} lit={lit} />
      {balcony && (
        <group position={[width / 2 + 0.42, -height / 2 + 0.1, 0]}>
          <mesh receiveShadow>
            <boxGeometry args={[0.85, 0.09, depth * 0.72]} />
            <meshStandardMaterial color={PALETTE.boneDim} roughness={0.85} />
          </mesh>
          <mesh position={[0.4, 0.3, 0]}>
            <boxGeometry args={[0.04, 0.55, depth * 0.72]} />
            <meshStandardMaterial
              color={PALETTE.brass}
              metalness={0.7}
              roughness={0.35}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

export function Residence({
  position = [0, 0, 0] as [number, number, number],
  scale = 1,
}) {
  return (
    <group position={position} scale={scale}>
      {/* plinth */}
      <mesh position={[0, -0.2, 0]} receiveShadow castShadow>
        <boxGeometry args={[5.6, 0.4, 4.4]} />
        <meshStandardMaterial color={PALETTE.charcoalSoft} roughness={0.95} />
      </mesh>
      <FloorSlab y={0.55} />
      <FloorSlab y={1.72} />
      <FloorSlab y={2.89} />
      {/* roof terrace + pergola */}
      <mesh position={[0, 3.5, 0]}>
        <boxGeometry args={[4.6, 0.14, 3.4]} />
        <meshStandardMaterial color={PALETTE.boneDim} roughness={0.85} />
      </mesh>
      {[-1.9, 1.9].map((x) => (
        <mesh key={x} position={[x, 3.85, 0]}>
          <boxGeometry args={[0.09, 0.6, 3.2]} />
          <meshStandardMaterial
            color={PALETTE.brass}
            metalness={0.7}
            roughness={0.35}
          />
        </mesh>
      ))}
      <Pine position={[3.4, -0.02, 1.7]} scale={0.9} />
      <Pine position={[-3.5, -0.02, 1.2]} scale={1.15} />
      <Pine position={[-3.0, -0.02, -1.6]} scale={0.75} />
    </group>
  );
}

/* ---------- shared lighting rig ---------- */

export function DuskRig() {
  return (
    <>
      <hemisphereLight args={["#8FA3B5", "#2A2622", 0.55]} />
      <directionalLight
        position={[14, 20, 10]}
        intensity={2.1}
        color="#FFD9A0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight
        position={[-16, 9, -12]}
        intensity={0.5}
        color="#6E86A8"
      />
      <ambientLight intensity={0.28} />
    </>
  );
}
