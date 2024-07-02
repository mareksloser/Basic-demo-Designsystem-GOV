import { EventEmitter } from '../../stencil-public-runtime';
import { GovSideNavItemChangeEvent } from './gov-side-nav-item.d';
export declare class GovSideNavItem {
  private h;
  constructor();
  readonly host: HTMLGovSideNavItemElement;
  isExpandedState: boolean;
  /**
   * Determide if component should have inversed colors to be used on dark background
   */
  readonly inverse: boolean;
  /**
   * Determide if component should have compact styles.
   */
  readonly compact: boolean;
  /**
   * Custom sidenav item identifier. Otherwise, it will be generated
   */
  readonly identifier: string;
  /**
   * Defined the count of nested items
   */
  readonly count: boolean;
  /**
   * Item name of the sidenav
   */
  readonly label: string;
  /**
   * Makes the button component disabled.
   * This prevents users from being able to interact with the button, and conveys its inactive state to assistive technologies.
   */
  readonly disabled: boolean;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href
   */
  readonly href: string;
  /**
   * Defines whether the sidenav is open or closed by button
   */
  readonly isExpanded: boolean;
  /**
   * Called when the sidenav state changes
   */
  govChange: EventEmitter<GovSideNavItemChangeEvent>;
  validateLabel(newValue: string): void;
  private emmitChange;
  componentWillLoad(): void;
  get classNames(): string;
  render(): any;
  /**
   * Opening the sidenav
   */
  open(): Promise<void>;
  /**
   * Closing the sidenav
   */
  close(): Promise<void>;
  /**
   * sidenav switch
   */
  toggle(): Promise<void>;
  /**
   * Returns the current state of the component
   */
  currentState(): Promise<boolean>;
}
