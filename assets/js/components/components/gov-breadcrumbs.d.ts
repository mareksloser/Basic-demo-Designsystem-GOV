import type { Components, JSX } from "../types/components";

interface GovBreadcrumbs extends Components.GovBreadcrumbs, HTMLElement {}
export const GovBreadcrumbs: {
  prototype: GovBreadcrumbs;
  new (): GovBreadcrumbs;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
