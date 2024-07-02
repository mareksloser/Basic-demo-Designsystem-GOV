import type { Components, JSX } from "../types/components";

interface GovCookiebar extends Components.GovCookiebar, HTMLElement {}
export const GovCookiebar: {
  prototype: GovCookiebar;
  new (): GovCookiebar;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
