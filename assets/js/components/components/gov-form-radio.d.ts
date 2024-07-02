import type { Components, JSX } from "../types/components";

interface GovFormRadio extends Components.GovFormRadio, HTMLElement {}
export const GovFormRadio: {
  prototype: GovFormRadio;
  new (): GovFormRadio;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
