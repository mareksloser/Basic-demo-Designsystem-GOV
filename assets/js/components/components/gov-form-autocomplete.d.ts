import type { Components, JSX } from "../types/components";

interface GovFormAutocomplete extends Components.GovFormAutocomplete, HTMLElement {}
export const GovFormAutocomplete: {
  prototype: GovFormAutocomplete;
  new (): GovFormAutocomplete;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
