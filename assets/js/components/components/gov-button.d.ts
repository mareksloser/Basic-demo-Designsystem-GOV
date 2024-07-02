import type { Components, JSX } from "../types/components";

interface GovButton extends Components.GovButton, HTMLElement {}
export const GovButton: {
  prototype: GovButton;
  new (): GovButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
