import type { Components, JSX } from "../types/components";

interface GovErrorCode extends Components.GovErrorCode, HTMLElement {}
export const GovErrorCode: {
  prototype: GovErrorCode;
  new (): GovErrorCode;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
