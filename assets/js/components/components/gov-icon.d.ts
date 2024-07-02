import type { Components, JSX } from "../types/components";

interface GovIcon extends Components.GovIcon, HTMLElement {}
export const GovIcon: {
  prototype: GovIcon;
  new (): GovIcon;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
