import type { Components, JSX } from "../types/components";

interface GovPrompt extends Components.GovPrompt, HTMLElement {}
export const GovPrompt: {
  prototype: GovPrompt;
  new (): GovPrompt;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
