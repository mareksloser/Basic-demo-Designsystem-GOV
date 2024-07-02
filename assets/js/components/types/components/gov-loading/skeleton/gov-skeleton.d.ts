import { SkeletonAnimationType, SkeletonShapesType, SkeletonVariantsType } from "./constants";
import { GovHost } from "../../../helpers/Dom/template.types";
export declare class GovSkeleton {
  h: GovHost;
  constructor();
  host: HTMLGovSkeletonElement;
  /**
   * Style variation of the skeleton.
   */
  readonly variant?: SkeletonVariantsType;
  /**
   * Number of rows of current skeleton type
   */
  count: number;
  /**
   * Shape of the skeleton
   */
  shape?: SkeletonShapesType;
  /**
   * Width of the skeleton ex. 100px, 100%, auto etc.
   */
  width: string;
  /**
   * Height of the skeleton ex. 100px, 100%, auto etc.
   */
  height: string;
  /**
   * Animation type
   */
  animation?: SkeletonAnimationType;
  /**
   * Adds accessible label for the skeleton that is only shown for screen readers.
   */
  readonly wcagLabel: string;
  items: number[];
  validateVariant(newValue: string): void;
  validateShape(newValue: string): void;
  validateAnimation(newValue: string): void;
  componentWillLoad(): void;
  componentWillUpdate(): void;
  componentDidRender(): Promise<void>;
  init(): void;
  get style(): {
    width?: string;
    height?: string;
  };
  render(): any;
  /**
   * Validate the WCAG attributes of the component
   */
  validateWcag(): Promise<void>;
}
