import type { Components, JSX } from "../types/components";

interface GovLayout extends Components.GovLayout, HTMLElement {}
export const GovLayout: {
  prototype: GovLayout;
  new (): GovLayout;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
