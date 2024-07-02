import { EventEmitter } from "../../../stencil-public-runtime";
import { ButtonSizesType, ButtonTargetType, ButtonVariantType, NativeTypesType, TypesType } from "./constants";
import { ButtonEvent } from "./gov-button.types";
export declare class GovButton {
  private h;
  private triggerRef?;
  constructor();
  host: HTMLGovButtonElement;
  /**
   * Style variation of the button
   */
  readonly variant?: ButtonVariantType;
  /**
   * Button’s size
   */
  readonly size?: ButtonSizesType;
  /**
   * Button's type
   */
  readonly type?: TypesType;
  /**
   * Expands the button to fill 100% of the container width
   */
  readonly expanded: boolean;
  /**
   * Determine if component should have inversed colors to be used on dark background
   */
  readonly inverse: boolean;
  /**
   * The name of the button, which gets paired with the button's value when submitted as part of a form. Corresponds with the native HTML name attribute
   */
  readonly name: string;
  /**
   * Definition of the button icon on the left. The icon must be defined in the form "type/name".
   */
  readonly iconLeft?: string;
  /**
   * Definition of the button icon on the left. The icon must be defined in the form "type/name".
   */
  readonly iconRight?: string;
  /**
   * Makes the button component disabled.
   * This prevents users from being able to interact with the button, and conveys its inactive state to assistive technologies
   */
  readonly disabled: boolean;
  /**
   * Same as original parameter
   * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type
   */
  readonly nativeType?: NativeTypesType;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href
   */
  readonly href: string;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-target
   */
  readonly target?: ButtonTargetType;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download
   */
  readonly download: boolean;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-hreflang
   */
  readonly hreflang: string;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-referrerpolicy
   */
  readonly referrerpolicy: string;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-rel
   */
  readonly rel: string;
  /**
   * Indicates whether an asynchronous process is running
   */
  readonly loading: string;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/focusable
   */
  readonly focusable: boolean;
  /**
   * Custom button identifier
   */
  readonly identifier: string;
  /**
   * Indicates the id of a related component’s visually focused element
   */
  readonly wcagActiveDescendant: string;
  /**
   * Use this property to add an aria-controls attribute to the button. Use the attribute to point to the unique id of the content that the button manages
   */
  readonly wcagControls: string;
  /**
   * Indicates the id of a component that describes the button
   */
  readonly wcagDescribedBy: string;
  /**
   * Aria description the button
   */
  readonly wcagDescription: string;
  /**
   * Details of the component
   */
  readonly wcagDetails: string;
  /**
   * If a button expands or collapses adjacent content, then use the ariaExpanded prop to add the aria-expanded attribute to the button
   * Set the value to convey the current expanded (true) or collapsed (false) state of the content
   */
  readonly wcagExpanded: boolean;
  /**
   * Adds accessible label for the button that is only shown for screen readers
   * Typically, this label text replaces the visible text on the button for users who use assistive technology
   */
  readonly wcagLabel: string;
  /**
   * String of id's that indicate alternative labels elements
   */
  readonly wcagLabelledBy: string;
  /**
   * Indicates the id of a component owned by the button
   */
  readonly wcagOwns: string;
  /**
   * 	Use this property to add an aria-haspopup attribute to a button, if you are using it as a menu button
   */
  readonly wcagHasPopup: string;
  /**
   * Tells screen reader the element is pressed
   */
  readonly wcagPressed: string;
  /**
   * Indicates the current item within a container or set of related elements
   */
  readonly wcagCurrent: string;
  /**
   * Emitted when the button click
   */
  govClick: EventEmitter<ButtonEvent>;
  /**
   * Emitted when the button has focus
   */
  govFocus: EventEmitter<ButtonEvent>;
  /**
   * Emitted when the button loses focus
   */
  govBlur: EventEmitter<ButtonEvent>;
  validateVariant(newValue: string): void;
  validateType(newValue: string): void;
  validateSize(newValue: string): void;
  validateNativeType(newValue: string): void;
  isPressed: boolean;
  componentWillLoad(): void;
  componentDidRender(): Promise<void>;
  get classNames(): string;
  render(): any;
  private onClickHandler;
  private onFocusHandler;
  private onBlurHandler;
  /**
   * Focus button element
   */
  setFocus(): Promise<void>;
  /**
   * Returns a clickable element instance
   */
  getTriggerRef(): Promise<HTMLLinkElement | HTMLButtonElement>;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
