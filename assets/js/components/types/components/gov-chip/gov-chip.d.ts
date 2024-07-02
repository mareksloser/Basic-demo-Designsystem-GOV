import { EventEmitter } from "../../stencil-public-runtime";
import { NativeTypesType } from "./constants";
import { ButtonSizesType, ButtonVariantType } from "../gov-button/button/constants";
export declare class GovChip {
  private triggerRef?;
  private h;
  private readonly chipId;
  constructor();
  host: HTMLGovChipElement;
  /**
   * Determine if component should have inverse colors to be used on dark background
   */
  readonly inverse: boolean;
  /**
   * Makes the chip component disabled.
   * This prevents users from being able to interact with the button, and conveys its inactive state to assistive technologies.
   */
  readonly disabled: boolean;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href
   */
  readonly href: string;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
   */
  readonly target: string;
  /**
   * Definition of the button icon on the left. The icon must be defined in the form "type/name".
   */
  readonly iconLeft?: string;
  /**
   * Definition of the button icon on the left. The icon must be defined in the form "type/name".
   */
  readonly iconRight?: string;
  /**
   * Chip’s size.
   */
  readonly size: ButtonSizesType;
  /**
   * Used to change the HTML tag in the chip
   */
  readonly tag: NativeTypesType;
  /**
   * Style variation of the chip.
   */
  readonly variant: ButtonVariantType;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/focusable
   */
  readonly focusable: boolean;
  /**
   * Custom chip identifier. Otherwise, it will be generated
   */
  readonly identifier: string;
  /**
   * Adds accessible label for the button that is only shown for screen readers.
   * Typically, this label text replaces the visible text on the button for users who use assistive technology.
   */
  readonly wcagLabel: string;
  /**
   * Use this property to add an aria-controls attribute to the button. Use the attribute to point to the unique id of the content that the button manages
   */
  readonly wcagControls: string;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected
   */
  readonly wcagSelected: boolean;
  /**
   * Emitted when the button click.
   */
  govClick: EventEmitter<PointerEvent>;
  validateVariant(newValue: string): void;
  validateSize(newValue: string): void;
  componentWillLoad(): void;
  render(): any;
  private onClickHandler;
  /**
   * Returns a clickable element instance
   */
  getTriggerRef(): Promise<HTMLLinkElement | HTMLButtonElement | HTMLSpanElement>;
  /**
   * Returns a unique tab trigger identifier
   */
  getTriggerIdentifier(): Promise<string>;
  /**
   * Focus button element
   */
  setFocus(): Promise<void>;
}
