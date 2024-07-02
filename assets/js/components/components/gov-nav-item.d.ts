import type { Components, JSX } from "../types/components";

interface GovNavItem extends Components.GovNavItem, HTMLElement {}
export const GovNavItem: {
  prototype: GovNavItem;
  new (): GovNavItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
