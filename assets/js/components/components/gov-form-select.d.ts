import type { Components, JSX } from "../types/components";

interface GovFormSelect extends Components.GovFormSelect, HTMLElement {}
export const GovFormSelect: {
  prototype: GovFormSelect;
  new (): GovFormSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
