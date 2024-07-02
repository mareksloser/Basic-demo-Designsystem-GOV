import { MessageVariantType } from "./constants";
export declare class GovMessage {
  private h;
  constructor();
  host: HTMLGovMessageElement;
  /**
   * Style variation of the content message.
   */
  readonly variant: MessageVariantType;
  validateVariant(newValue: string): void;
  render(): any;
}
