import type { Components, JSX } from "../types/components";

interface GovSpacer extends Components.GovSpacer, HTMLElement {}
export const GovSpacer: {
  prototype: GovSpacer;
  new (): GovSpacer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
