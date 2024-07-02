import type { Components, JSX } from "../types/components";

interface GovWizard extends Components.GovWizard, HTMLElement {}
export const GovWizard: {
  prototype: GovWizard;
  new (): GovWizard;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
