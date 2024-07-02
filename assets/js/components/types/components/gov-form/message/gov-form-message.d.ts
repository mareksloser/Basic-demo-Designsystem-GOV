import { FormMessageVariantType } from './constants';
import { GovHost } from '../../../helpers/Dom/template.types';
export declare class GovFormMessage {
  h: GovHost;
  private readonly messageId;
  constructor();
  host: HTMLGovFormMessageElement;
  /**
   * Style variation of the message.
   */
  readonly variant?: FormMessageVariantType;
  validateVariant(newValue: string): void;
  componentWillLoad(): void;
  render(): any;
  /**
   * Returns unique identfiier of message
   */
  identifier(): Promise<string>;
}
