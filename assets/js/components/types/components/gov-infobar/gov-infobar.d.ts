import { EventEmitter } from '../../stencil-public-runtime';
import { ButtonEvent } from '../gov-button/button/gov-button.types';
import { VariantType } from './constants';
import { InfobarEvent } from './gov-infobar.types';
export declare class GovInfobar {
  private h;
  constructor();
  host: HTMLGovInfobarElement;
  /**
   * Style variation of the button.
   */
  readonly headline: string;
  /**
   * Style variation of the button.
   */
  readonly variant: VariantType;
  /**
   * Determine if component should have inverse colors to be used on dark background
   */
  readonly inverse: boolean;
  /**
   * Aria label for the closing button. It is mandatory if the infobar is closable
   */
  readonly wcagCloseLabel: string;
  /**
   * Aria label for the toggle button. It is mandatory if the infobar has headline
   */
  readonly wcagToggleLabel: string;
  /**
   * Called when the close button is clicked
   */
  govClose: EventEmitter<InfobarEvent>;
  /**
   * Displays the option to close the infobar
   */
  readonly closable?: boolean;
  toggleContent: boolean;
  validateVariant(newValue: string): void;
  componentWillLoad(): void;
  componentDidRender(): Promise<void>;
  render(): any;
  onCloseHandler(e: CustomEvent<ButtonEvent>): void;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
