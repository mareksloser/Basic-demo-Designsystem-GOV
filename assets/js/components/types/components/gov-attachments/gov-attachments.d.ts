export declare class GovAttachments {
  private h;
  constructor();
  readonly host: HTMLGovAttachmentsElement;
  /**
   * Label of attachments section
   */
  readonly label: string;
  /**
   * Adds accessible label for the attachment section that is only shown for screen readers.
   */
  readonly wcagLabel: string;
  componentDidRender(): Promise<void>;
  render(): any;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
