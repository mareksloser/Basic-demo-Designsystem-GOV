export interface Pagination {
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  startIndex: number;
  endIndex: number;
  pages: number[];
}
export declare function paginate(totalItems: number, currentPage?: number, pageSize?: number, maxPages?: number): Pagination;
