import { useMemo } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import rangeAsset from "@/assets/dhauladhar-range.jpg.asset.json";
import valleyAsset from "@/assets/kangra-valley-town.jpg.asset.json";
import townAsset from "@/assets/dharamshala-town.jpg.asset.json";

/* ------------------------------------------------------------------
 * Photographic environment: real Dhauladhar range as a 360° backdrop
 * and a real Kangra valley aerial as the ground — no cone "pyramids".
 * ---------------------------------------------------------------- */

export function PhotoSky() {
  const tex = useTexture(rangeAsset.url);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.repeat.set(3, 0.42);
    tex.offset.set(0, 0.58);
  }, [tex]);

  return (
    <mesh position={[0, 60, 0]} rotation={[0, Math.PI * 0.15, 0]}>
      <cylinderGeometry args={[420, 420, 200, 64, 1, true]} />
      <meshBasicMaterial
        map={tex}
        side={THREE.BackSide}
        toneMapped={false}
        fog={false}
      />
    </mesh>
  );
}


/** Distant forested ridge line that sits between the sky photo and the site. */
export function RidgeLine() {
  const tex = useTexture(townAsset.url);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
  }, [tex]);
  return (
    <mesh position={[0, 14, -84]}>
      <planeGeometry args={[240, 135]} />
      <meshBasicMaterial map={tex} toneMapped={false} />
    </mesh>
  );
}

export function PhotoGround() {
  const tex = useTexture(valleyAsset.url);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(3.4, 2.0);
    tex.offset.set(0, 0.5);
  }, [tex]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.62, -6]} receiveShadow>
      <planeGeometry args={[280, 280]} />
      <meshStandardMaterial map={tex} color="#9FA98C" roughness={0.95} />
    </mesh>
  );
}

/** Daylight rig matched to the photographic backdrop. */
export function DayRig() {
  return (
    <>
      <hemisphereLight args={["#CFE3F5", "#6B6A55", 1.15]} />
      <directionalLight
        position={[26, 34, 18]}
        intensity={2.4}
        color="#FFF3DC"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
      />
      <directionalLight position={[-22, 14, -18]} intensity={0.6} color="#AFC6E0" />
      <ambientLight intensity={0.35} />
    </>
  );
}
