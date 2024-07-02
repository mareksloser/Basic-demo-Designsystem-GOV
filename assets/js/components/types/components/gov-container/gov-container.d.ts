export declare class GovContainer {
  private h;
  constructor();
  host: HTMLGovContainerElement;
  render(): any;
  /**
   * Returns slotted children
   *
   * @return {Promise<Node[]>}
   */
  slottedChildren(): Promise<Node[]>;
}
