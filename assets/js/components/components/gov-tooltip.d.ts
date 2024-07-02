import type { Components, JSX } from "../types/components";

interface GovTooltip extends Components.GovTooltip, HTMLElement {}
export const GovTooltip: {
  prototype: GovTooltip;
  new (): GovTooltip;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
