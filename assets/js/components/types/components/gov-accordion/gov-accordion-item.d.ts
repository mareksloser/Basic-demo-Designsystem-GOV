import { EventEmitter } from "../../stencil-public-runtime";
import { AccordionSizeType, AccordionVariantType } from "./constants";
import { AccordionItemEvent } from "./gov-accordion.types";
export declare class GovAccordionItem {
  private readonly triggerId;
  private readonly contentId;
  private h;
  constructor();
  readonly host: HTMLGovAccordionItemElement;
  isExpandedState: boolean;
  /**
   * Style variation of the button.
   */
  variant?: AccordionVariantType;
  /**
   * Custom accordion item identifier. Otherwise, it will be generated
   */
  readonly identifier: string;
  /**
   * Accordion’s size.
   */
  size?: AccordionSizeType;
  /**
   * Makes the button component disabled.
   * This prevents users from being able to interact with the button, and conveys its inactive state to assistive technologies.
   */
  readonly disabled: boolean;
  /**
   * Defines whether the accordion is open or closed by button
   */
  isExpanded: boolean;
  /**
   * Called when the accordion state changes
   */
  govChange: EventEmitter<AccordionItemEvent>;
  validateSize(newValue: string): void;
  validateVariant(newValue: string): void;
  private emmitChange;
  componentWillLoad(): void;
  getPropsFromParents(): void;
  render(): any;
  /**
   * Opening the accordion
   */
  open(): Promise<void>;
  /**
   * Closing the accordion
   */
  close(): Promise<void>;
  /**
   * Accordion switch
   */
  toggle(): Promise<void>;
  /**
   * Returns the current state of the component
   */
  currentState(): Promise<boolean>;
}
