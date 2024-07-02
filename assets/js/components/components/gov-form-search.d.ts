import type { Components, JSX } from "../types/components";

interface GovFormSearch extends Components.GovFormSearch, HTMLElement {}
export const GovFormSearch: {
  prototype: GovFormSearch;
  new (): GovFormSearch;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
