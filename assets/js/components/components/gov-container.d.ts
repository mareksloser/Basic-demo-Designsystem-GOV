import type { Components, JSX } from "../types/components";

interface GovContainer extends Components.GovContainer, HTMLElement {}
export const GovContainer: {
  prototype: GovContainer;
  new (): GovContainer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
