import { ClientOnly } from "@tanstack/react-router";
import {
  Component,
  Suspense,
  lazy,
  type ComponentType,
  type ReactNode,
} from "react";

type SceneProps = { progress?: (() => number) | undefined };

/** Network hiccups on a dynamic chunk shouldn't blank the page — retry, then degrade. */
function lazyWithRetry<T>(load: () => Promise<T>) {
  return lazy(async () => {
    try {
      return (await load()) as never;
    } catch {
      await new Promise((r) => setTimeout(r, 600));
      return (await load()) as never;
    }
  });
}

const HeroScene = lazyWithRetry(() => import("./HeroScene"));
const JourneyScene = lazyWithRetry(() => import("./JourneyScene"));
const BuildingScene = lazyWithRetry(() => import("./BuildingScene"));
const FloorPlanScene = lazyWithRetry(() => import("./FloorPlanScene"));

const SCENES: Record<string, ComponentType<SceneProps>> = {
  hero: HeroScene as ComponentType<SceneProps>,
  journey: JourneyScene as ComponentType<SceneProps>,
  building: BuildingScene as ComponentType<SceneProps>,
  floorplan: FloorPlanScene as ComponentType<SceneProps>,
};

class SceneBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override componentDidCatch(error: unknown) {
    console.error(error);
  }
  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}


function Fallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-charcoal-deep">
      <span className="text-[0.6rem] font-medium tracking-[0.35em] text-brass uppercase">
        Rendering model…
      </span>
    </div>
  );
}

/** SSR-safe mount point for a WebGL scene. */
export function Scene3D({
  name,
  progress,
  fallback,
}: {
  name: "hero" | "journey" | "building" | "floorplan";
  progress?: (() => number) | undefined;
  fallback?: ReactNode;
}) {
  const Comp = SCENES[name]!;
  const fallbackView = fallback ?? <Fallback />;
  return (
    <ClientOnly fallback={fallbackView}>
      <SceneBoundary fallback={fallbackView}>
        <Suspense fallback={fallbackView}>
          <Comp progress={progress} />
        </Suspense>
      </SceneBoundary>
    </ClientOnly>

  );
}
