import type { Components, JSX } from "../types/components";

interface GovModal extends Components.GovModal, HTMLElement {}
export const GovModal: {
  prototype: GovModal;
  new (): GovModal;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
