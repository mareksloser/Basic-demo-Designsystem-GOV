import { EventEmitter } from "../../stencil-public-runtime";
import { PaginationSizeType, PaginationVariantType, PaginationType } from "./constants";
import { Pagination } from "./pagination";
import { PaginationEvent } from "./gov-pagination.types";
export declare class GovPagination {
  private h;
  private readonly pageSelectId;
  private spreadSelectRef?;
  constructor();
  readonly host: HTMLGovPaginationElement;
  /**
   * Pagination type
   */
  readonly type: PaginationType;
  /**
   * Currently displayed page
   */
  readonly current: number;
  /**
   * Total count of entries
   */
  readonly total: number;
  /**
   * Set on active page
   */
  readonly inverse: boolean;
  /**
   * Pagination's size
   */
  readonly size?: PaginationSizeType;
  /**
   * Style variation of the pagination.
   */
  readonly variant?: PaginationVariantType;
  /**
   * Maximum number of entries per page
   */
  readonly pageSize: number;
  /**
   * Maximum pages displayed for selection
   */
  readonly maxPages: number;
  /**
   * Setting a link to redirect to a given page.
   * The {PAGE} wildcard can be used in the link to replace the page number.
   * Note that in the case of paging through a link, it is always necessary to send to the component the current page where the user is.
   */
  readonly link: string;
  /**
   * Adds accessible label for the pagination that is only shown for screen readers.
   */
  readonly wcagLabel: string;
  /**
   * Indicates the id of a component that labels the pagination.
   */
  readonly wcagLabelledBy: string;
  /**
   * Adds accessible label for the page select
   */
  readonly wcagSelectLabel: string;
  /**
   * Adds accessible label for the page item
   */
  readonly wcagPageLabel: string;
  /**
   * Event called when changing the page with the current setting of the whole paging
   */
  govPage: EventEmitter<PaginationEvent>;
  pagination: Pagination;
  validateType(newValue: string): void;
  validateSize(newValue: string): void;
  validateVariant(newValue: string): void;
  recalculate(): void;
  componentWillLoad(): void;
  componentDidRender(): Promise<void>;
  private recalculatePagination;
  private isActivePageClass;
  private prepareLinkUrl;
  private resetSelectValue;
  render(): any;
  private onClickHandler;
  private onSelectHandler;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
