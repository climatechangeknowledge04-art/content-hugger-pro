/** Shared, mutable input bridge between the DOM controls and the WebGL scene. */
export const walkInput = {
  /** -1..1 forward/strafe from the on-screen joystick or keyboard */
  move: { x: 0, y: 0 },
  /** accumulated yaw / pitch from dragging */
  yaw: 0,
  pitch: 0,
  /** "walk" = first person, "plan" = top-down dollhouse */
  mode: "walk" as "walk" | "plan",
  /** set when the visitor takes over from the guided tour */
  manual: false,
  reset() {
    this.move.x = 0;
    this.move.y = 0;
    this.manual = false;
  },
};
