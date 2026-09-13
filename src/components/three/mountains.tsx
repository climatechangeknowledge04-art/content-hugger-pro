import { useEffect, useState } from "react";
import * as THREE from "three";
import peaksAsset from "@/assets/dhauladhar-peaks.jpg.asset.json";
import rangeAsset from "@/assets/dhauladhar-range.jpg.asset.json";

/* ------------------------------------------------------------------
 * Real Dhauladhar geometry, derived from photographs.
 *
 * Each photo is loaded into a canvas and its skyline is extracted by
 * walking every column downwards until the pixel stops being sky. That
 * silhouette becomes a heightmap, which is turned into real mesh
 * geometry and textured with the same photo — so the ranges keep the
 * true profile of the peaks above Dharamshala instead of cone
 * "pyramids", and they parallax correctly as the camera flies.
 * ---------------------------------------------------------------- */

type Ridge = { geometry: THREE.BufferGeometry; texture: THREE.Texture };

const COLS = 260;

/** Column-wise skyline of a photo, normalised 0..1 (1 = top of frame). */
function extractSkyline(img: HTMLImageElement) {
  const w = Math.min(img.naturalWidth, 1024);
  const h = Math.round((w / img.naturalWidth) * img.naturalHeight);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, w, h);
  const { data } = ctx.getImageData(0, 0, w, h);

  /* reference sky colour: average of the top rows of the photograph */
  let sr = 0;
  let sg = 0;
  let sb = 0;
  let n0 = 0;
  const refRows = Math.max(2, Math.round(h * 0.04));
  for (let y = 0; y < refRows; y++) {
    for (let x = 0; x < w; x += 4) {
      const i = (y * w + x) * 4;
      sr += data[i]!;
      sg += data[i + 1]!;
      sb += data[i + 2]!;
      n0++;
    }
  }
  sr /= n0;
  sg /= n0;
  sb /= n0;

  const raw = new Float32Array(COLS);
  for (let c = 0; c < COLS; c++) {
    const x = Math.min(w - 1, Math.round((c / (COLS - 1)) * (w - 1)));
    let row = h - 1;
    for (let y = 0; y < h; y++) {
      const i = (y * w + x) * 4;
      const dr = data[i]! - sr;
      const dg = data[i + 1]! - sg;
      const db = data[i + 2]! - sb;
      /* the skyline is where the pixel stops matching the sky colour */
      if (Math.sqrt(dr * dr + dg * dg + db * db) > 62) {
        row = y;
        break;
      }
    }
    raw[c] = 1 - row / h;
  }


  /* light smoothing removes single-pixel noise (clouds, birds, haze) */
  const out = new Float32Array(COLS);
  for (let c = 0; c < COLS; c++) {
    let sum = 0;
    let n = 0;
    for (let k = -3; k <= 3; k++) {
      const j = c + k;
      if (j >= 0 && j < COLS) {
        sum += raw[j]!;
        n++;
      }
    }
    out[c] = sum / n;
  }
  return out;
}

/**
 * Build a solid ridge from the skyline: a front face whose top edge is the
 * real photographed profile, plus a receding crest that gives the range
 * genuine depth in the scene.
 */
function buildRidgeGeometry(
  skyline: Float32Array,
  width: number,
  height: number,
  depth: number,
) {
  const cols = skyline.length;
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  /* exaggerate the relief so the photographed profile reads as real peaks */
  let lo = 1;
  let hi = 0;
  for (let c = 0; c < cols; c++) {
    lo = Math.min(lo, skyline[c]!);
    hi = Math.max(hi, skyline[c]!);
  }
  const span = Math.max(0.02, hi - lo);
  const relief = (s: number) => 0.22 + ((s - lo) / span) * 0.78;

  /* rows: 0 = base, 1 = crest (front), 2 = crest (pushed back) */
  for (let row = 0; row < 3; row++) {
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1);
      const x = (u - 0.5) * width;
      const peak = relief(skyline[c]!) * height;
      const y = row === 2 ? peak * 0.32 : row === 1 ? peak : 0;
      const z = row === 2 ? -depth : 0;
      /* crest UV follows the photographed skyline so no sky bleeds onto rock */
      positions.push(x, y, z);
      uvs.push(u, row === 0 ? Math.max(0, skyline[c]! - 0.55) : skyline[c]!);
    }
  }


  const quad = (a: number, b: number, c: number, d: number) => {
    indices.push(a, b, d, b, c, d);
  };
  for (let c = 0; c < cols - 1; c++) {
    /* front face */
    quad(c, c + 1, cols + c + 1, cols + c);
    /* crest cap receding into the haze */
    quad(cols + c, cols + c + 1, 2 * cols + c + 1, 2 * cols + c);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3),
  );
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function useRidge(
  url: string,
  width: number,
  height: number,
  depth: number,
): Ridge | null {
  const [ridge, setRidge] = useState<Ridge | null>(null);

  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      if (!alive) return;
      try {
        const skyline = extractSkyline(img);
        const texture = new THREE.Texture(img);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.needsUpdate = true;
        setRidge({
          geometry: buildRidgeGeometry(skyline, width, height, depth),
          texture,
        });
      } catch {
        /* canvas read failed — the photographic sky still covers the horizon */
      }
    };
    return () => {
      alive = false;
    };
  }, [url, width, height, depth]);

  useEffect(
    () => () => {
      ridge?.geometry.dispose();
      ridge?.texture.dispose();
    },
    [ridge],
  );

  return ridge;
}

function PhotoRidge({
  url,
  width,
  height,
  depth,
  position,
  tint = "#ffffff",
  opacity = 1,
}: {
  url: string;
  width: number;
  height: number;
  depth: number;
  position: [number, number, number];
  tint?: string;
  opacity?: number;
}) {
  const ridge = useRidge(url, width, height, depth);
  if (!ridge) return null;
  return (
    <mesh
      geometry={ridge.geometry}
      position={position}
      frustumCulled={false}
      renderOrder={-1}
    >
      <meshBasicMaterial
        map={ridge.texture}
        color={tint}
        transparent={opacity < 1}
        opacity={opacity}
        toneMapped={false}
        side={THREE.DoubleSide}
        depthWrite
      />
    </mesh>
  );
}

/**
 * The Dhauladhars behind Mont Vue: two photo-derived ranges at different
 * distances, so the snowline reads as real terrain with depth.
 */
export function DhauladharRange() {
  return (
    <group>
      {/* far snow wall — the high Dhauladhar crest */}
      <PhotoRidge
        url={rangeAsset.url}
        width={430}
        height={44}
        depth={90}
        position={[6, -2, -150]}
        tint="#DCE7F2"
      />
      {/* nearer peaks, sharper profile */}
      <PhotoRidge
        url={peaksAsset.url}
        width={300}
        height={28}
        depth={55}
        position={[-52, -2, -104]}
      />
    </group>
  );
}
