import type { Components, JSX } from "../types/components";

interface GovLayoutColumn extends Components.GovLayoutColumn, HTMLElement {}
export const GovLayoutColumn: {
  prototype: GovLayoutColumn;
  new (): GovLayoutColumn;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
