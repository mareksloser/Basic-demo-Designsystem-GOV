export declare class GovGridItem {
  private h;
  constructor();
  readonly host: HTMLGovGridItemElement;
  /**
   * Cell size as a fraction of 1/12 of the grid size
   */
  readonly size: string;
  /**
   * Cell size for SM media query and up as a fraction of 12 of the grid size
   */
  readonly sizeSm: string;
  /**
   * Cell size for MD media query and up as a fraction of 12 of the grid size
   */
  readonly sizeMd: string;
  /**
   * Cell size for LG media query and up as a fraction of 12 of the grid size
   */
  readonly sizeLg: string;
  /**
   * Cell size for XL media query and up as a fraction of 12 of the grid size
   */
  readonly sizeXl: string;
  render(): any;
}
