import type { Components, JSX } from "../types/components";

interface GovFormSwitch extends Components.GovFormSwitch, HTMLElement {}
export const GovFormSwitch: {
  prototype: GovFormSwitch;
  new (): GovFormSwitch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
