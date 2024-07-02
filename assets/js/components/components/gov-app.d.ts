import type { Components, JSX } from "../types/components";

interface GovApp extends Components.GovApp, HTMLElement {}
export const GovApp: {
  prototype: GovApp;
  new (): GovApp;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
