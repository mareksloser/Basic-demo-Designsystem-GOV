import type { Components, JSX } from "../types/components";

interface GovCard extends Components.GovCard, HTMLElement {}
export const GovCard: {
  prototype: GovCard;
  new (): GovCard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
