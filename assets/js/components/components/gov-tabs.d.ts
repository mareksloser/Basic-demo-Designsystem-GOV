import type { Components, JSX } from "../types/components";

interface GovTabs extends Components.GovTabs, HTMLElement {}
export const GovTabs: {
  prototype: GovTabs;
  new (): GovTabs;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
