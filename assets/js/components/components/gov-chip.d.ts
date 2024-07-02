import type { Components, JSX } from "../types/components";

interface GovChip extends Components.GovChip, HTMLElement {}
export const GovChip: {
  prototype: GovChip;
  new (): GovChip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
