import type { Components, JSX } from "../types/components";

interface GovMessage extends Components.GovMessage, HTMLElement {}
export const GovMessage: {
  prototype: GovMessage;
  new (): GovMessage;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
