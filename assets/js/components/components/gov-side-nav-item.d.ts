import type { Components, JSX } from "../types/components";

interface GovSideNavItem extends Components.GovSideNavItem, HTMLElement {}
export const GovSideNavItem: {
  prototype: GovSideNavItem;
  new (): GovSideNavItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
