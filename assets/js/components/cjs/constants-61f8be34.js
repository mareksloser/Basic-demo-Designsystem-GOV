'use strict';

const utils = require('./utils-c9b1bba3.js');
const variants = require('./variants-f5ffeef3.js');

exports.StatsBarIconPosition = void 0;
(function (StatsBarIconPosition) {
  StatsBarIconPosition["LEFT"] = "left";
})(exports.StatsBarIconPosition || (exports.StatsBarIconPosition = {}));
const StatsBarVariants = utils.pick(variants.Variants, ['PRIMARY', 'SECONDARY']);
const StatsBarClass = {
  root: 'gov-statsbar',
  section: 'gov-statsbar__section',
};
const StatsBarItemClass = {
  root: 'gov-statsbar-item',
  icon: 'gov-statsbar-item__icon',
  number: 'gov-statsbar-item__number',
  text: 'gov-statsbar-item__text',
};

exports.StatsBarClass = StatsBarClass;
exports.StatsBarItemClass = StatsBarItemClass;
exports.StatsBarVariants = StatsBarVariants;

//# sourceMappingURL=constants-61f8be34.js.map