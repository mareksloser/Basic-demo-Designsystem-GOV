import type { Components, JSX } from "../types/components";

interface GovInfobar extends Components.GovInfobar, HTMLElement {}
export const GovInfobar: {
  prototype: GovInfobar;
  new (): GovInfobar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
