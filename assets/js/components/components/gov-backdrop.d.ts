import type { Components, JSX } from "../types/components";

interface GovBackdrop extends Components.GovBackdrop, HTMLElement {}
export const GovBackdrop: {
  prototype: GovBackdrop;
  new (): GovBackdrop;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
