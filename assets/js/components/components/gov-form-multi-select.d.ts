import type { Components, JSX } from "../types/components";

interface GovFormMultiSelect extends Components.GovFormMultiSelect, HTMLElement {}
export const GovFormMultiSelect: {
  prototype: GovFormMultiSelect;
  new (): GovFormMultiSelect;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
