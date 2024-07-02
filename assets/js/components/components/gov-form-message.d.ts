import type { Components, JSX } from "../types/components";

interface GovFormMessage extends Components.GovFormMessage, HTMLElement {}
export const GovFormMessage: {
  prototype: GovFormMessage;
  new (): GovFormMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
