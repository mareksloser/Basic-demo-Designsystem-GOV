import { Variants } from "../../../core/constants/variants";
import { ValueOf } from "../../../types/interfaces";
export declare const SkeletonVariants: Pick<typeof Variants, "PRIMARY" | "SECONDARY" | "SUCCESS" | "ERROR" | "WARNING">;
export type SkeletonVariantsType = `${ValueOf<typeof SkeletonVariants>}`;
export declare enum SkeletonShapes {
  CIRCLE = "circle",
  REACT = "rect",
  TEXT = "text"
}
export type SkeletonShapesType = `${ValueOf<typeof SkeletonShapes>}`;
export declare enum SkeletonAnimation {
  PULSE = "pulse",
  PROGRESS = "progress",
  FALSE = "false"
}
export type SkeletonAnimationType = `${ValueOf<typeof SkeletonAnimation>}`;
export declare const SkeletonClass: {
  root: string;
  loader: string;
};
