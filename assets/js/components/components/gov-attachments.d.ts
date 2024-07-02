import type { Components, JSX } from "../types/components";

interface GovAttachments extends Components.GovAttachments, HTMLElement {}
export const GovAttachments: {
  prototype: GovAttachments;
  new (): GovAttachments;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
