import { TooltipPositionType, TooltipSizeType, TooltipVariantType } from "./constants";
export declare class GovTooltip {
  private h;
  private content;
  private readonly tooltipContentId;
  private readonly tooltipId;
  constructor();
  host: HTMLGovTooltipElement;
  /**
   * Style variation of the tooltip
   */
  readonly variant?: TooltipVariantType;
  /**
   * Tooltip’s size.
   */
  readonly size?: TooltipSizeType;
  /**
   * Tooltip display position
   */
  position: TooltipPositionType;
  /**
   * Information contained in the tooltip
   */
  readonly message: string;
  /**
   * Custom tooltip identifier.
   */
  readonly identifier: string;
  /**
   * Trigger is just an icon
   */
  readonly icon: boolean;
  persist: boolean;
  validateVariant(newValue: string): void;
  validateSize(newValue: string): void;
  validatePosition(newValue: string): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  private createContentWrapper;
  private registerListeners;
  private verifyPositionSpace;
  private showTooltip;
  private hideTooltip;
  private removeContent;
  render(): any;
  /**
   * Showing the modal
   */
  show(): Promise<void>;
  /**
   * Hiding the modal
   */
  hide(): Promise<void>;
}
