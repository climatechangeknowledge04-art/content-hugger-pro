/**
 * The residence, transcribed from the architect's floor plan.
 * 1 unit = 1 foot. Only the left-hand unit is modelled; the right-hand
 * apartment on the drawing is its mirror image.
 */

export type Door = { edge: "n" | "s" | "e" | "w"; at: number; width?: number };

export type Room = {
  id: string;
  name: string;
  dims?: string;
  /** x1,z1 = north-west corner, x2,z2 = south-east corner (feet) */
  x1: number;
  z1: number;
  x2: number;
  z2: number;
  kind: "room" | "balcony";
  doors: Door[];
};

export const ROOMS: Room[] = [
  {
    id: "living-balcony",
    name: "Balcony",
    dims: "4'0\" deep",
    x1: 0,
    z1: -4,
    x2: 14,
    z2: 0,
    kind: "balcony",
    doors: [],
  },
  {
    id: "living",
    name: "Living Room",
    dims: "14'0\" x 17'0\"",
    x1: 0,
    z1: 0,
    x2: 14,
    z2: 17,
    kind: "room",
    doors: [
      { edge: "e", at: 13, width: 4 }, // to hall
      { edge: "e", at: 4, width: 3 }, // to kitchen
      { edge: "n", at: 7, width: 8 }, // to the balcony
    ],
  },
  {
    id: "kitchen",
    name: "Kitchen",
    dims: "8'0\" x 10'0\"",
    x1: 14,
    z1: 0,
    x2: 22,
    z2: 10,
    kind: "room",
    doors: [
      { edge: "w", at: 4, width: 3 },
      { edge: "s", at: 4, width: 3 }, // to hall
    ],
  },
  {
    id: "bedroom-3",
    name: "Bedroom",
    dims: "11'0\" x 10'0\"",
    x1: 22,
    z1: 0,
    x2: 33,
    z2: 10,
    kind: "room",
    doors: [{ edge: "s", at: 3, width: 3 }],
  },
  {
    id: "hall",
    name: "Hall",
    x1: 14,
    z1: 10,
    x2: 22,
    z2: 20,
    kind: "room",
    doors: [
      { edge: "w", at: 3, width: 4 },
      { edge: "n", at: 4, width: 3 },
      { edge: "e", at: 5, width: 5 },
      { edge: "s", at: 4, width: 3 },
    ],
  },
  {
    id: "foyer",
    name: "Entrance",
    x1: 22,
    z1: 10,
    x2: 30,
    z2: 20,
    kind: "room",
    doors: [
      { edge: "w", at: 5, width: 5 },
      { edge: "n", at: 3, width: 3 },
      { edge: "e", at: 5, width: 4 }, // main door from the lift lobby
    ],
  },
  {
    id: "toilet-common",
    name: "Toilet",
    dims: "4'4\" x 8'0\"",
    x1: 30,
    z1: 12,
    x2: 34.33,
    z2: 20,
    kind: "room",
    doors: [{ edge: "w", at: 3, width: 2.5 }],
  },
  {
    id: "bedroom-2",
    name: "Bedroom",
    dims: "12'0\" x 10'0\"",
    x1: 0,
    z1: 20,
    x2: 12,
    z2: 30,
    kind: "room",
    doors: [{ edge: "e", at: 3, width: 3 }],
  },
  {
    id: "master",
    name: "Master Bedroom",
    dims: "13'8\" x 10'4\"",
    x1: 12,
    z1: 20,
    x2: 25.67,
    z2: 30.33,
    kind: "room",
    doors: [
      { edge: "w", at: 3, width: 3 },
      { edge: "n", at: 6, width: 3 },
      { edge: "e", at: 2, width: 2.5 },
      { edge: "e", at: 8, width: 2.5 },
      { edge: "s", at: 6, width: 6 },
    ],
  },
  {
    id: "toilet-master",
    name: "Toilet",
    dims: "8'0\" x 4'0\"",
    x1: 25.67,
    z1: 20,
    x2: 33.67,
    z2: 24,
    kind: "room",
    doors: [{ edge: "w", at: 2, width: 2.5 }],
  },
  {
    id: "toilet-2",
    name: "Toilet",
    dims: "8'3\" x 4'0\"",
    x1: 25.67,
    z1: 26,
    x2: 33.92,
    z2: 30,
    kind: "room",
    doors: [{ edge: "w", at: 2, width: 2.5 }],
  },
  {
    id: "master-balcony",
    name: "Balcony",
    dims: "3'0\" deep",
    x1: 12,
    z1: 30.33,
    x2: 25.67,
    z2: 33.33,
    kind: "balcony",
    doors: [],
  },
];

/** Waypoints of the walk: main door → hall → living → balcony → kitchen → bedrooms. */
export const WALK: { pos: [number, number]; look: [number, number]; label: string }[] = [
  { pos: [29, 15], look: [18, 15], label: "Entrance" },
  { pos: [24, 15], look: [16, 14], label: "Hall" },
  { pos: [17, 14], look: [8, 10], label: "Living Room" },
  { pos: [7, 8], look: [7, -3], label: "Balcony" },
  { pos: [7, 4], look: [18, 5], label: "Kitchen" },
  { pos: [18, 6], look: [18, 15], label: "Hall" },
  { pos: [18, 18], look: [18, 26], label: "Master Bedroom" },
  { pos: [18, 26], look: [18, 33], label: "Master Balcony" },
  { pos: [16, 22], look: [6, 25], label: "Bedroom" },
  { pos: [6, 25], look: [6, 21], label: "Bedroom" },
];

export const CEILING = 10;

/** Is a point inside the walkable envelope? */
export function walkable(x: number, z: number, margin = 1.1) {
  return ROOMS.some(
    (r) =>
      x > r.x1 + margin &&
      x < r.x2 - margin &&
      z > r.z1 + margin &&
      z < r.z2 - margin,
  );
}
