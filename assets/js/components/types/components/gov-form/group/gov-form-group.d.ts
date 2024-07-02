import { FormGroupOrientationType, FormGroupSizesType } from "./constants";
export declare class GovFormGroup {
  private readonly h;
  constructor();
  host: HTMLGovFormGroupElement;
  /**
   * Gap's size.
   */
  readonly gap?: FormGroupSizesType;
  /**
   * Elements orientation
   */
  readonly orientation?: FormGroupOrientationType;
  validateGap(newValue: string): void;
  validateOrientation(newValue: string): void;
  componentWillLoad(): void;
  render(): any;
}
