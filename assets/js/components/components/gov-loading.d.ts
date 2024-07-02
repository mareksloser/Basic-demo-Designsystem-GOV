import type { Components, JSX } from "../types/components";

interface GovLoading extends Components.GovLoading, HTMLElement {}
export const GovLoading: {
  prototype: GovLoading;
  new (): GovLoading;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
