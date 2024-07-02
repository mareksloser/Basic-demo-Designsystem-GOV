import { StatsBarIconPositionType, StatsBarVariantType } from "./constants";
export declare class GovStatsbar {
  private h;
  constructor();
  host: HTMLGovStatsbarElement;
  /**
   * Icon’s position
   */
  readonly iconPosition?: StatsBarIconPositionType;
  /**
   * Style variation
   */
  readonly variant?: StatsBarVariantType;
  validateIconPosition(newValue: string): void;
  validateVariant(newValue: string): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  render(): any;
}
