import type { Components, JSX } from "../types/components";

interface GovFormGroup extends Components.GovFormGroup, HTMLElement {}
export const GovFormGroup: {
  prototype: GovFormGroup;
  new (): GovFormGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
