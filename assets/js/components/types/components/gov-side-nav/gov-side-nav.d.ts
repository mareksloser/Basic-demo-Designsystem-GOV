import { EventEmitter } from '../../stencil-public-runtime';
import { GovSideNavItemChangeEvent } from './gov-side-nav-item.d';
export declare class GovSideNav {
  readonly host: HTMLGovSideNavElement;
  /**
   * Determide if component should have inversed colors to be used on dark background.
   */
  readonly inverse: boolean;
  /**
   * Determide if component should have compact styles.
   */
  readonly compact: boolean;
  /**
   * Adds accessible label for the sidenav that is only shown for screen readers.
   */
  readonly wcagLabel: string;
  /**
   * String of id's that indicate alternative labels elements
   */
  readonly wcagLabelledBy: string;
  /**
   * Called when the sidenav state changes
   */
  govChange: EventEmitter<GovSideNavItemChangeEvent>;
  componentDidLoad(): void;
  componentDidRender(): Promise<void>;
  render(): any;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
