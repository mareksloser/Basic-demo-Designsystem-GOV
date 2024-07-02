import { EventEmitter } from "../../stencil-public-runtime";
import { TabOrientationType, TabType, VariantType } from "./constants";
import { GovTabControllerItem } from "./gov-tabs.types";
import { Nullable } from "../../types/interfaces";
export declare class GovTabs {
  private h;
  private triggerRefs;
  private tabsRef?;
  private readonly formSelectId;
  constructor();
  host: HTMLGovTabsElement;
  controller: GovTabControllerItem[];
  focusIndex: number;
  compactControls: boolean;
  /**
   * Tabs type
   */
  readonly type: TabType;
  /**
   * Style variation of the tab chips.
   */
  readonly variant?: VariantType;
  /**
   * Tabs orientation
   */
  readonly orientation: TabOrientationType;
  /**
   * Adds accessible label for the tabs that is only shown for screen readers.
   */
  readonly wcagLabel: string;
  /**
   * Adds accessible label for the tabs select
   */
  readonly wcagSelectLabel: string;
  /**
   * Indicates the id of a component that labels the tabs.
   */
  readonly wcagLabelledBy: string;
  /**
   * Emitted when the tab is changed.
   */
  govChange: EventEmitter<HTMLGovTabsItemElement>;
  validateType(newValue: string): void;
  validateVariant(newValue: string): void;
  componentWillLoad(): void;
  componentDidRender(): Promise<void>;
  private prepareDataSource;
  private setActiveByIdentifier;
  private reRender;
  private resizeObserver;
  render(): any;
  private getCurrentTab;
  private onSelectHandler;
  private onChangeHandler;
  private onKeydownHandler;
  /**
   * Regenerate tabs controllers
   */
  refresh(): Promise<void>;
  /**
   * Returns the currently selected tabs-item
   */
  currentTab(): Promise<Nullable<HTMLGovTabsItemElement>>;
  /**
   * Regenerate tabs controllers
   */
  setActiveTab(identifier: string): Promise<void>;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
