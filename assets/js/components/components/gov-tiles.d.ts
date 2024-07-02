import type { Components, JSX } from "../types/components";

interface GovTiles extends Components.GovTiles, HTMLElement {}
export const GovTiles: {
  prototype: GovTiles;
  new (): GovTiles;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
