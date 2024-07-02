import { V as Variants } from './variants-2b936d58.js';
import { p as pick } from './utils-c057a3fa.js';

const TabVariants = pick(Variants, ['PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
var TabTypes;
(function (TabTypes) {
  TabTypes["TEXT"] = "text";
  TabTypes["CHIP"] = "chip";
})(TabTypes || (TabTypes = {}));
var TabOrientation;
(function (TabOrientation) {
  TabOrientation["HORIZONTAL"] = "horizontal";
  TabOrientation["VERTICAL"] = "vertical";
})(TabOrientation || (TabOrientation = {}));
const TabsClass = {
  root: 'gov-tabs',
  tabs: 'gov-tabs__tabs',
  list: 'gov-tabs__list',
  item: 'gov-tabs__item',
  btn: 'gov-tabs__btn',
};
const TabsItemClass = {
  root: 'gov-tabs-item',
  inner: 'gov-tabs-item__inner',
};

export { TabsItemClass as T, TabsClass as a, TabTypes as b, TabVariants as c };

//# sourceMappingURL=constants-6df4edc4.js.map