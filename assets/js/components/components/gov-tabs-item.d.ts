import type { Components, JSX } from "../types/components";

interface GovTabsItem extends Components.GovTabsItem, HTMLElement {}
export const GovTabsItem: {
  prototype: GovTabsItem;
  new (): GovTabsItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
