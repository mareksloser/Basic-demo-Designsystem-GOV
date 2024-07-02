import type { Components, JSX } from "../types/components";

interface GovAccordionItem extends Components.GovAccordionItem, HTMLElement {}
export const GovAccordionItem: {
  prototype: GovAccordionItem;
  new (): GovAccordionItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
