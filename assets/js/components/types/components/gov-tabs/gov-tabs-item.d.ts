export declare class GovTabsItem {
  private h;
  private readonly contentId;
  private readonly triggerId;
  constructor();
  host: HTMLGovTabsItemElement;
  /**
   * Custom tab item identifier. Otherwise, it will be generated
   */
  readonly identifier: string;
  /**
   * Custom tab trigger item identifier. Otherwise, it will be generated
   */
  readonly triggerIdentifier: string;
  /**
   * Item name of the tab
   */
  readonly label: string;
  /**
   * Default selected tab
   */
  readonly default: boolean;
  isActive: boolean;
  render(): any;
  /**
   * Returns a unique tab content identifier
   */
  getIdentifier(): Promise<string>;
  /**
   * Returns a unique tab trigger identifier
   */
  getTriggerIdentifier(): Promise<string>;
  /**
   * Set status of tab-item
   */
  setActiveStatus(status: boolean): Promise<void>;
}
