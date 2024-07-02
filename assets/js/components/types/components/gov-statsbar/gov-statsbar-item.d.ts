import { GovHost } from '../../helpers/Dom/template.types';
import { StatsBarIconPositionType } from './constants';
export declare class GovStatsbarItem {
  h: GovHost;
  constructor();
  host: HTMLGovStatsbarItemElement;
  /**
   * Icon’s position
   */
  readonly iconPosition?: StatsBarIconPositionType;
  validateIconPosition(newValue: string): void;
  componentWillLoad(): void;
  render(): any;
}
