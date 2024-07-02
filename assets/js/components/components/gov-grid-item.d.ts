import type { Components, JSX } from "../types/components";

interface GovGridItem extends Components.GovGridItem, HTMLElement {}
export const GovGridItem: {
  prototype: GovGridItem;
  new (): GovGridItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
