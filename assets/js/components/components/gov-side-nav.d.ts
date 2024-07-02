import type { Components, JSX } from "../types/components";

interface GovSideNav extends Components.GovSideNav, HTMLElement {}
export const GovSideNav: {
  prototype: GovSideNav;
  new (): GovSideNav;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
