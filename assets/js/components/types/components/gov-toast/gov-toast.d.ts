import { EventEmitter } from "../../stencil-public-runtime";
import { ToastTypesType, ToastVariantType } from "./constants";
export declare class GovToast {
  private h;
  private timeout;
  private readonly toastId;
  constructor();
  host: HTMLGovToastElement;
  /**
   * Style variation of the toast message.
   */
  readonly variant?: ToastVariantType;
  /**
   * Toast’s gravity
   */
  readonly gravity: "top" | "bottom";
  /**
   * Toast’s position
   */
  readonly position: "left" | "center" | "right";
  /**
   * Toast type
   */
  readonly type?: ToastTypesType;
  /**
   * Number of milliseconds to wait before Toast disappear
   */
  readonly time: number;
  /**
   * Closing button texting instead of icons
   */
  readonly closeLabel: string;
  /**
   * Aria label for the closing button. It is mandatory if the alert is closable
   */
  readonly wcagCloseLabel: string;
  /**
   * Called when the close button is clicked
   */
  govClose: EventEmitter<string>;
  validateVariant(newValue: string): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  private runTimer;
  render(): any;
  private onCloseHandler;
  get isSolid(): boolean;
  get isTimer(): boolean;
  /**
   * Remove toast from dom
   */
  destroy(): Promise<void>;
}
