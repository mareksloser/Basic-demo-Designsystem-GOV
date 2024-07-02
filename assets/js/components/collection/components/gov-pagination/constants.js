import { Sizes } from "../../core/constants/sizes";
import { Variants } from "../../core/constants/variants";
import { pick } from "../../utils/utils";
export const PaginationSizes = pick(Sizes, ['_S', '_M']);
export const PaginationVariants = pick(Variants, ['PRIMARY', 'SECONDARY']);
export var PaginationTypes;
(function (PaginationTypes) {
  PaginationTypes["BUTTON"] = "button";
  PaginationTypes["SELECT"] = "select";
})(PaginationTypes || (PaginationTypes = {}));
export const PaginationClass = {
  root: 'gov-pagination',
  list: 'gov-pagination__list',
  item: 'gov-pagination__item',
  itemArrow: 'gov-pagination__item--arrow',
  itemMore: 'gov-pagination__item--more',
  itemSelect: 'gov-pagination__item--select',
  inner: 'gov-pagination__inner',
  arrow: 'gov-pagination__arrow',
};
//# sourceMappingURL=constants.js.map
