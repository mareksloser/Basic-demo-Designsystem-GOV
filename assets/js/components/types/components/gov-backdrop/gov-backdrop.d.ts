import { EventEmitter } from '../../stencil-public-runtime';
export declare class GovBackdrop {
  private h;
  constructor();
  host: HTMLGovBackdropElement;
  /**
   * Determine if component should have inverse colors to be used on dark background.
   */
  readonly inverse: boolean;
  /**
   * Adds accessible label for the backdrop that is only shown for screen readers.
   */
  readonly wcagLabel: string;
  /**
   * String of id's that indicate alternative labels elements
   */
  readonly wcagLabelledBy: string;
  /**
   * Emitted when button clicks.
   */
  govClick: EventEmitter<MouseEvent>;
  componentDidRender(): Promise<void>;
  render(): any;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
