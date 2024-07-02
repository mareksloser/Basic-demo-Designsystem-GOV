import type { Components, JSX } from "../types/components";

interface GovFormCheckbox extends Components.GovFormCheckbox, HTMLElement {}
export const GovFormCheckbox: {
  prototype: GovFormCheckbox;
  new (): GovFormCheckbox;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
