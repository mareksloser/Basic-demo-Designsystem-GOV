import { EventEmitter } from '../../stencil-public-runtime';
import { GovCardChangeEvent } from './interfaces';
export declare class GovCard {
  private h;
  private readonly headlineId;
  private readonly contentId;
  constructor();
  host: HTMLGovCardElement;
  /**
   * Style variation of the card.
   */
  readonly promotion: boolean;
  /**
   * Item label of the card
   */
  readonly label: string;
  /**
   * Defines wether the card can be collapsible
   */
  readonly collapsible: boolean;
  /**
   * Defines whether the card is open or closed by button
   */
  readonly expanded: boolean;
  /**
   * Used to change the HMTL tag in the card headline for correct semantic structure
   */
  readonly headlineTag: string;
  /**
   * Adds accessible label for the collapsible button that is only shown for screen readers.
   */
  wcagTriggerLabel: string;
  /**
   * A string of identifiers that indicate alternative label elements for collapsible card
   */
  wcagTriggerLabelledBy: string;
  /**
   * Called when the card toggle state changes
   */
  govToggle: EventEmitter<GovCardChangeEvent>;
  isExpanded: boolean;
  validateHeadlineTag(newValue: string): void;
  componentWillLoad(): void;
  componentDidRender(): Promise<void>;
  private emmitChange;
  render(): any;
  private onClickHandler;
  /**
   * Open the card if it is collapsible
   */
  open(): Promise<void>;
  /**
   * Close the card if it is collapsible
   */
  close(): Promise<void>;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
