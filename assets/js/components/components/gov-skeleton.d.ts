import type { Components, JSX } from "../types/components";

interface GovSkeleton extends Components.GovSkeleton, HTMLElement {}
export const GovSkeleton: {
  prototype: GovSkeleton;
  new (): GovSkeleton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
