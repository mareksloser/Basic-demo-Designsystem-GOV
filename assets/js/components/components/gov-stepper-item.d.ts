import type { Components, JSX } from "../types/components";

interface GovStepperItem extends Components.GovStepperItem, HTMLElement {}
export const GovStepperItem: {
  prototype: GovStepperItem;
  new (): GovStepperItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
