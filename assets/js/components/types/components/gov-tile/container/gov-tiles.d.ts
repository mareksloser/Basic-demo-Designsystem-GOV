export declare class GovTiles {
  private h;
  constructor();
  /**
   * Number of columns between 1-4
   */
  readonly columns: number;
  /**
   * Tiles border
   */
  readonly noBorder: boolean;
  host: HTMLGovTilesElement;
  get classNames(): string;
  render(): any;
}
