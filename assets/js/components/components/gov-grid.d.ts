import type { Components, JSX } from "../types/components";

interface GovGrid extends Components.GovGrid, HTMLElement {}
export const GovGrid: {
  prototype: GovGrid;
  new (): GovGrid;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
