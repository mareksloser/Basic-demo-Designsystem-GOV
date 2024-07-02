import { EventEmitter } from '../../stencil-public-runtime';
import { GovBreadcrumbsChangeEvent } from './gov-breadcrumbs.d';
export declare class GovBreadcrumbs {
  private h;
  constructor();
  readonly host: HTMLGovBreadcrumbsElement;
  /**
   * Defines whether the components can be collapsible when element doesn't fit in one row.
   */
  readonly collapsible: boolean;
  /**
   * Defines whether the breadcrumbs are open or closed by button
   */
  readonly isExpanded: boolean;
  /**
   * Adds accessible label for the pagination that is only shown for screen readers.
   */
  readonly wcagLabel: string;
  /**
   * Indicates the id of a component that labels the pagination.
   */
  readonly wcagLabelledBy: string;
  /**
   * Called when the Breadcrumbs state changes
   */
  govChange: EventEmitter<GovBreadcrumbsChangeEvent>;
  componentDidRender(): Promise<void>;
  render(): any;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
