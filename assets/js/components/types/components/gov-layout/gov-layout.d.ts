import { LayoutType, LayoutVariantType } from './constants';
export declare class GovLayout {
  private h;
  constructor();
  host: HTMLGovLayoutElement;
  /**
   * Layout type
   */
  readonly type?: LayoutType;
  /**
   * Layout align
   */
  readonly variant?: LayoutVariantType;
  /**
   * Determine if component should have inverse column order
   */
  readonly inverse: boolean;
  private typeClass;
  render(): any;
}
