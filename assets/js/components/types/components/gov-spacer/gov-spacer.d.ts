import { SpacerBreakpointsType, SpacerSizeType } from './constants';
export declare class GovSpacer {
  private h;
  constructor();
  host: HTMLGovSpacerElement;
  /**
   * Spacer’s size
   */
  readonly size?: SpacerSizeType;
  /**
   * Breakpoint
   */
  readonly breakpoint?: SpacerBreakpointsType;
  validateSize(newValue: string): void;
  validateBreakpoint(newValue: string): void;
  componentWillLoad(): void;
  render(): any;
}
