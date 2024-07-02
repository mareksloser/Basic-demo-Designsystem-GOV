import type { Components, JSX } from "../types/components";

interface GovTooltipContent extends Components.GovTooltipContent, HTMLElement {}
export const GovTooltipContent: {
  prototype: GovTooltipContent;
  new (): GovTooltipContent;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
