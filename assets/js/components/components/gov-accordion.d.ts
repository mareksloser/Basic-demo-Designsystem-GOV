import type { Components, JSX } from "../types/components";

interface GovAccordion extends Components.GovAccordion, HTMLElement {}
export const GovAccordion: {
  prototype: GovAccordion;
  new (): GovAccordion;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
