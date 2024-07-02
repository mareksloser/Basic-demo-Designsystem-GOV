import type { Components, JSX } from "../types/components";

interface GovStatsbar extends Components.GovStatsbar, HTMLElement {}
export const GovStatsbar: {
  prototype: GovStatsbar;
  new (): GovStatsbar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
