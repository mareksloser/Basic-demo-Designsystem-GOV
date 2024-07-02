import type { Components, JSX } from "../types/components";

interface GovPagination extends Components.GovPagination, HTMLElement {}
export const GovPagination: {
  prototype: GovPagination;
  new (): GovPagination;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
