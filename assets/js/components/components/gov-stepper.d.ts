import type { Components, JSX } from "../types/components";

interface GovStepper extends Components.GovStepper, HTMLElement {}
export const GovStepper: {
  prototype: GovStepper;
  new (): GovStepper;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
