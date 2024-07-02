import type { Components, JSX } from "../types/components";

interface GovFormLabel extends Components.GovFormLabel, HTMLElement {}
export const GovFormLabel: {
  prototype: GovFormLabel;
  new (): GovFormLabel;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
