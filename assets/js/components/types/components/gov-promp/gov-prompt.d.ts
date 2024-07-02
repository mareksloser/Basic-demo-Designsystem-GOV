import { EventEmitter } from '../../stencil-public-runtime';
import { Nullable } from '../../types/interfaces';
export declare class GovPrompt {
  private h;
  private readonly labelId;
  private readonly contentId;
  constructor();
  host: HTMLGovPromptElement;
  /**
   * Attribute for modal window display
   */
  open: boolean;
  /**
   * Title of modal window
   */
  label: string;
  /**
   * Role of modal
   */
  role: Nullable<string>;
  /**
   * Used to change the HTML tag in the modal label for correct semantic structure
   */
  readonly labelTag: string;
  /**
   * String of id's that indicate alternative labels elements
   */
  wcagLabelledBy: string;
  /**
   * Indicates the id of a component that describes the modal.
   */
  wcagDescribedBy: string;
  /**
   * Adds accessible label for the modal close button that is only shown for screen readers.
   */
  readonly wcagCloseLabel: string;
  /**
   * A string of identifiers that indicate alternative label elements for closing the modal window
   */
  wcagCloseLabelledBy: string;
  /**
   * Emitted when modal window closes.
   */
  govClose: EventEmitter<PointerEvent>;
  validateLabelTag(newValue: string): void;
  watchOpen(newValue: boolean): void;
  private showModal;
  private hideModal;
  componentWillRender(): Promise<void>;
  componentDidRender(): Promise<void>;
  render(): any;
  private onCloseHandler;
  /**
   * Showing the modal
   */
  show(): Promise<void>;
  /**
   * Hiding the modal
   */
  hide(): Promise<void>;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
