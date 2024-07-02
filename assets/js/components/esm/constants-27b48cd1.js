import { p as pick } from './utils-c057a3fa.js';
import { V as Variants } from './variants-2b936d58.js';

var StatsBarIconPosition;
(function (StatsBarIconPosition) {
  StatsBarIconPosition["LEFT"] = "left";
})(StatsBarIconPosition || (StatsBarIconPosition = {}));
const StatsBarVariants = pick(Variants, ['PRIMARY', 'SECONDARY']);
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

export { StatsBarVariants as S, StatsBarItemClass as a, StatsBarClass as b, StatsBarIconPosition as c };

//# sourceMappingURL=constants-27b48cd1.js.map