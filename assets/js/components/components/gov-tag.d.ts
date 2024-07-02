import type { Components, JSX } from "../types/components";

interface GovTag extends Components.GovTag, HTMLElement {}
export const GovTag: {
  prototype: GovTag;
  new (): GovTag;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
