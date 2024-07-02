import type { Components, JSX } from "../types/components";

interface GovFormFile extends Components.GovFormFile, HTMLElement {}
export const GovFormFile: {
  prototype: GovFormFile;
  new (): GovFormFile;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
