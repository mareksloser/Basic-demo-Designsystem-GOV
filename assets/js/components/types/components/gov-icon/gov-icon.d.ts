export declare class GovIcon {
  private h;
  constructor();
  host: HTMLGovIconElement;
  /**
   * Name of icon
   */
  name: string;
  /**
   * Type (folder) of icon
   */
  type: string;
  private iconData;
  private visible;
  private error;
  private intersectionObserver;
  private loadIconPathData;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentWillLoad(): Promise<void>;
  private waitUntilVisible;
  render(): any;
}
