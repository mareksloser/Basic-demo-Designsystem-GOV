import { ButtonSizesType, ButtonVariantType } from '../gov-button/button/constants';
export declare class GovTag {
  private h;
  constructor();
  host: HTMLGovTagElement;
  /**
   * Determine if component should have inverse colors to be used on dark background
   */
  readonly inverse: boolean;
  /**
   * Definition of the button icon on the left. The icon must be defined in the form "type/name".
   */
  readonly iconLeft?: string;
  /**
   * Definition of the button icon on the left. The icon must be defined in the form "type/name".
   */
  readonly iconRight?: string;
  /**
   * Tag’s size.
   */
  readonly size: ButtonSizesType;
  /**
   * Style variation of the tag.
   */
  readonly variant: ButtonVariantType;
  validateVariant(newValue: string): void;
  validateSize(newValue: string): void;
  componentWillLoad(): void;
  render(): any;
}
