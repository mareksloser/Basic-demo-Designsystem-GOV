import type { Components, JSX } from "../types/components";

interface GovStatsbarItem extends Components.GovStatsbarItem, HTMLElement {}
export const GovStatsbarItem: {
  prototype: GovStatsbarItem;
  new (): GovStatsbarItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
