import type { Components, JSX } from "../types/components";

interface GovDropdown extends Components.GovDropdown, HTMLElement {}
export const GovDropdown: {
  prototype: GovDropdown;
  new (): GovDropdown;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
