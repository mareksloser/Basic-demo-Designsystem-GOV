import type { Components, JSX } from "../types/components";

interface GovTile extends Components.GovTile, HTMLElement {}
export const GovTile: {
  prototype: GovTile;
  new (): GovTile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
