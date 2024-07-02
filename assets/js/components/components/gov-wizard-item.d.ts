import type { Components, JSX } from "../types/components";

interface GovWizardItem extends Components.GovWizardItem, HTMLElement {}
export const GovWizardItem: {
  prototype: GovWizardItem;
  new (): GovWizardItem;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
