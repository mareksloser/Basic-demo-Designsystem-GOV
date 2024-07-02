import { EventEmitter } from '../../stencil-public-runtime';
import { AccordionSizeType, AccordionVariantType } from './constants';
import { AccordionEvent } from "./gov-accordion.types";
export declare class GovAccordion {
  private h;
  constructor();
  readonly host: HTMLGovAccordionElement;
  /**
   * Accordion’s size.
   */
  readonly size?: AccordionSizeType;
  /**
   * Style variation of the button.
   */
  readonly variant?: AccordionVariantType;
  /**
   * Accordion item underline
   */
  readonly noBorder: boolean;
  /**
   * Adds accessible label for the accordion that is only shown for screen readers.
   */
  readonly wcagLabel: string;
  /**
   * String of id's that indicate alternative labels elements
   */
  readonly wcagLabelledBy: string;
  /**
   * Called when the accordion state changes
   */
  govChange: EventEmitter<AccordionEvent>;
  validateSize(newValue: string): void;
  validateVariant(newValue: string): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  componentDidRender(): Promise<void>;
  render(): any;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
