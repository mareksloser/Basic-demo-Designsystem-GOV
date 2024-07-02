import type { Components, JSX } from "../types/components";

interface GovNav extends Components.GovNav, HTMLElement {}
export const GovNav: {
  prototype: GovNav;
  new (): GovNav;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
