import type { Components, JSX } from "../types/components";

interface GovFormControl extends Components.GovFormControl, HTMLElement {}
export const GovFormControl: {
  prototype: GovFormControl;
  new (): GovFormControl;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
