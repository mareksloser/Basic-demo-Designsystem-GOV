import type { Components, JSX } from "../types/components";

interface GovControlGroup extends Components.GovControlGroup, HTMLElement {}
export const GovControlGroup: {
  prototype: GovControlGroup;
  new (): GovControlGroup;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
