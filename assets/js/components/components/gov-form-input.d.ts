import type { Components, JSX } from "../types/components";

interface GovFormInput extends Components.GovFormInput, HTMLElement {}
export const GovFormInput: {
  prototype: GovFormInput;
  new (): GovFormInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
