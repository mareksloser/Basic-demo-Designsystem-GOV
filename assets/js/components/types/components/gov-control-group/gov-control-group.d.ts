import { ControlGroupVariantType } from "./constants";
export declare class GovControlGroup {
  private readonly h;
  constructor();
  host: HTMLGovControlGroupElement;
  /**
   * Style variation of the content message.
   */
  readonly variant: ControlGroupVariantType;
  /**
   * Specifies the display of the border between elements
   */
  readonly noBorder: boolean;
  validateVariant(newValue: string): void;
  render(): any;
}
