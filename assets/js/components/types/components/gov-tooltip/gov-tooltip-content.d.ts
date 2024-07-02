import { TooltipSizeType, TooltipVariantType } from "./constants";
export declare class GovTooltipContent {
  private timeout;
  host: HTMLGovTooltipContentElement;
  /**
   * Style variation of the tooltip
   */
  readonly variant?: TooltipVariantType;
  /**
   * Tooltip’s size.
   */
  readonly size?: TooltipSizeType;
  /**
   * Tooltip is still visible.
   */
  persist?: boolean;
  /**
   * Indicates display of tooltip content
   */
  isVisible: boolean;
  /**
   * Indicates display of tooltip content
   */
  parentId: string;
  visibleContent(newValue: boolean): void;
  hideContent(): void;
  render(): any;
}
