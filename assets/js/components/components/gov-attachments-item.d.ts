import type { Components, JSX } from "../types/components";

interface GovAttachmentsItem extends Components.GovAttachmentsItem, HTMLElement {}
export const GovAttachmentsItem: {
  prototype: GovAttachmentsItem;
  new (): GovAttachmentsItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
