import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ValleyWorld } from "./World";
import { GlassLabel } from "./GlassLabel";

/** Slow orbital drift plus pointer parallax — the maquette is alive, never static. */
function DriftingCamera() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(-7, 5.0, -12));

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime * 0.05;
    const radius = 32;
    const x = Math.sin(t) * radius + pointer.x * 3.6;
    const z = Math.cos(t) * radius * 0.55 + 18;
    const y = 13 - pointer.y * 2.2;
    camera.position.lerp(new THREE.Vector3(x, y, z), 1 - Math.pow(0.001, delta));
    camera.lookAt(target.current);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.8]}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 11, 34], fov: 42 }}
    >
      <fog attach="fog" args={["#C9D8E6", 120, 330]} />
      <DriftingCamera />
      <ValleyWorld />

      {/* Glass annotations pointing at each real model */}
      <GlassLabel
        position={[0, 6.4, 5]}
        eyebrow="The Residence"
        title="From INR 1.00 Crore"
        meta="3 BHK · 1,400 sq ft"
      />
      <GlassLabel
        position={[-26, 20, -62]}
        eyebrow="Behind the house"
        title="The Dhauladhars"
        meta="Snowline · 4,000 m+"
        align="left"
      />
      <GlassLabel
        position={[-17, 5.4, -9]}
        eyebrow="12 minutes away"
        title="HPCA Stadium"
        meta="World cricket in the hills"
        align="right"
      />
      <GlassLabel
        position={[16, 6.4, -20]}
        eyebrow="Walking distance"
        title="Schools & Town"
        meta="Dharamshala · Mcleodganj"
        align="left"
      />
      <GlassLabel
        position={[13, 2.6, 14]}
        eyebrow="Below the terrace"
        title="Kangra Valley Viewpoint"
        meta="Deodar forest & trails"
        align="left"
        leader={40}
      />
    </Canvas>
  );
}
