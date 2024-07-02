import { EventEmitter } from '../../stencil-public-runtime';
export declare class GovAttachmentsItem {
  private h;
  constructor();
  readonly host: HTMLGovAttachmentsItemElement;
  /**
   * Adds accessible label for the remove button that is only shown for screen readers.
   */
  readonly wcagRemoveLabel: string;
  /**
   * Indicates the id of a component that labels the remove button.
   */
  readonly wcagRemoveLabelledBy: string;
  /**
   * Emitted when the file is removed
   */
  govRemove: EventEmitter<PointerEvent>;
  componentDidRender(): Promise<void>;
  render(): any;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
