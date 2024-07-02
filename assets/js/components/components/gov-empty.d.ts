import type { Components, JSX } from "../types/components";

interface GovEmpty extends Components.GovEmpty, HTMLElement {}
export const GovEmpty: {
  prototype: GovEmpty;
  new (): GovEmpty;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
