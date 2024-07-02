'use strict';

const variants = require('./variants-f5ffeef3.js');
const utils = require('./utils-c9b1bba3.js');

const TabVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY', 'SUCCESS', 'ERROR', 'WARNING']);
exports.TabTypes = void 0;
(function (TabTypes) {
  TabTypes["TEXT"] = "text";
  TabTypes["CHIP"] = "chip";
})(exports.TabTypes || (exports.TabTypes = {}));
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

exports.TabVariants = TabVariants;
exports.TabsClass = TabsClass;
exports.TabsItemClass = TabsItemClass;

//# sourceMappingURL=constants-427a2843.js.map