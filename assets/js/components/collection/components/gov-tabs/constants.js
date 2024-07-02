import { Variants } from "../../core/constants/variants";
import { pick } from "../../utils/utils";
export const TabVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
export var TabTypes;
(function (TabTypes) {
  TabTypes["TEXT"] = "text";
  TabTypes["CHIP"] = "chip";
})(TabTypes || (TabTypes = {}));
export var TabOrientation;
(function (TabOrientation) {
  TabOrientation["HORIZONTAL"] = "horizontal";
  TabOrientation["VERTICAL"] = "vertical";
})(TabOrientation || (TabOrientation = {}));
export const TabsClass = {
  root: 'gov-tabs',
  tabs: 'gov-tabs__tabs',
  list: 'gov-tabs__list',
  item: 'gov-tabs__item',
  btn: 'gov-tabs__btn',
};
export const TabsItemClass = {
  root: 'gov-tabs-item',
  inner: 'gov-tabs-item__inner',
};
//# sourceMappingURL=constants.js.map
