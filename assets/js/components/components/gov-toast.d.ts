import type { Components, JSX } from "../types/components";

interface GovToast extends Components.GovToast, HTMLElement {}
export const GovToast: {
  prototype: GovToast;
  new (): GovToast;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
