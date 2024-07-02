export declare class GovNavItem {
  readonly host: HTMLGovNavItemElement;
  isExpandedState: boolean;
  /**
   * Same as original parameter
   * @link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-href
   */
  readonly href: string;
  validateHref(newValue: string): void;
  componentWillLoad(): void;
  render(): any;
}
