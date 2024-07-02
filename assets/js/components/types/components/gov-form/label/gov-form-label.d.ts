import { EventEmitter } from '../../../stencil-public-runtime';
import { FormLabelSizesTypes } from './constants';
export declare class GovFormLabel {
  /**
   * Identifier for label.
   */
  readonly identifier: string;
  /**
   * Label's size.
   */
  readonly size?: FormLabelSizesTypes;
  /**
   * Set whether the input is required or not.
   */
  readonly required: boolean;
  /**
   * Use label as a legend for better accessibility.
   * Note: Don't forget to set the fieldset attribute of the gov-form-control component
   */
  readonly legend: boolean;
  /**
   * Emitted when the label click.
   */
  govClick: EventEmitter<PointerEvent>;
  render(): any;
}
