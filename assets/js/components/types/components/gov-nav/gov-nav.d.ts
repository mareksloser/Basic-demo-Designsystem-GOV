export declare class GovNav {
  readonly host: HTMLGovNavElement;
  /**
   * Adds accessible label for the accordion that is only shown for screen readers.
   */
  readonly wcagLabel: string;
  /**
   * String of id's that indicate alternative labels elements
   */
  readonly wcagLabelledBy: string;
  componentDidRender(): Promise<void>;
  render(): any;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
