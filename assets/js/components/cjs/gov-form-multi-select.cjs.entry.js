'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-7b6bba34.js');
const form = require('./form-74063d50.js');
const template = require('./template-4b951d1d.js');
const win = require('./win-5521073d.js');
const props = require('./props-d6146e54.js');
const wcag = require('./wcag-e6257f27.js');
const string_utils = require('./string.utils-0f08c48c.js');
const utils = require('./utils-c9b1bba3.js');
require('./sizes-79872c2a.js');
require('./variants-f5ffeef3.js');
require('./constants-caad94b4.js');
require('./constants-6df82618.js');
require('./constants-97eea364.js');
require('./gov.log-b842920d.js');

const hasOwnProperty = (obj, prop) => {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

const govFormMultiSelectCss = ".gov-form-multi-select__list{margin:0;padding:0}.gov-form-multi-select__list>.gov-form-multi-select__item{margin:0;padding:0;background:none}.gov-form-multi-select__list>.gov-form-multi-select__item::before{display:none}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-multi-select{position:relative;display:flex;width:100%;align-items:center}.gov-form-multi-select .element{position:relative;display:flex;flex:1 1 auto}.gov-form-multi-select input,.gov-form-multi-select select,.gov-form-multi-select textarea{width:100%;border-radius:var(--gov-border-radius, 0.1875rem);background-color:var(--gov-form-bg-color, var(--gov-color-neutral-white));font-family:var(--gov-font-family, \"Roboto\", sans-serif)}.gov-form-multi-select input:focus,.gov-form-multi-select select:focus,.gov-form-multi-select textarea:focus{outline:none}.gov-form-multi-select input:focus-visible,.gov-form-multi-select select:focus-visible,.gov-form-multi-select textarea:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-form-multi-select input::-moz-placeholder,.gov-form-multi-select select::-moz-placeholder,.gov-form-multi-select textarea::-moz-placeholder{color:var(--gov-form-placeholder-color, var(--gov-color-secondary-600))}.gov-form-multi-select input::placeholder,.gov-form-multi-select select::placeholder,.gov-form-multi-select textarea::placeholder{color:var(--gov-form-placeholder-color, var(--gov-color-secondary-600))}.gov-form-multi-select textarea{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);padding:0.5rem 0.75rem;resize:none}.gov-form-multi-select *[slot=left-icon],.gov-form-multi-select *[slot=right-icon]{position:absolute;top:50%;display:flex;justify-content:center;transform:translateY(-50%);pointer-events:none}.gov-form-multi-select *[slot=left-icon]{left:0}.gov-form-multi-select *[slot=right-icon]{right:0}.gov-form-multi-select *[slot=prefix],.gov-form-multi-select *[slot=sufix]{margin:0}[size=s].gov-form-multi-select{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);gap:0.5rem var(--gov-form-input-core-s-icon-size, 1rem)}[size=s].gov-form-multi-select input,[size=s].gov-form-multi-select select{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);height:var(--gov-form-input-core-s-height, 2rem);padding:var(--gov-form-input-core-s-padding, 0.25rem 0.75rem)}[size=s].gov-form-multi-select *[slot=left-icon],[size=s].gov-form-multi-select *[slot=right-icon]{width:var(--gov-form-input-core-s-icon-size, 1rem);height:var(--gov-form-input-core-s-icon-size, 1rem)}[size=s].gov-form-multi-select *[slot=left-icon]{left:calc((var(--gov-form-input-core-s-icon-padding, 2rem) - var(--gov-form-input-core-s-icon-size, 1rem)) / 2)}[size=s].gov-form-multi-select *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-s-icon-padding, 2rem)}[size=s].gov-form-multi-select *[slot=right-icon]{right:calc((var(--gov-form-input-core-s-icon-padding, 2rem) - var(--gov-form-input-core-s-icon-size, 1rem)) / 2)}[size=s].gov-form-multi-select *[slot=right-icon]~input,[size=s].gov-form-multi-select *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-s-icon-padding, 2rem)}[size=m].gov-form-multi-select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);gap:0.5rem var(--gov-form-input-core-m-icon-size, 1rem)}[size=m].gov-form-multi-select input,[size=m].gov-form-multi-select select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);height:var(--gov-form-input-core-m-height, 2.5rem);padding:var(--gov-form-input-core-m-padding, 0.4375rem 0.75rem)}[size=m].gov-form-multi-select *[slot=left-icon],[size=m].gov-form-multi-select *[slot=right-icon]{width:var(--gov-form-input-core-m-icon-size, 1rem);height:var(--gov-form-input-core-m-icon-size, 1rem)}[size=m].gov-form-multi-select *[slot=left-icon]{left:calc((var(--gov-form-input-core-m-icon-padding, 2.5rem) - var(--gov-form-input-core-m-icon-size, 1rem)) / 2)}[size=m].gov-form-multi-select *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-m-icon-padding, 2.5rem)}[size=m].gov-form-multi-select *[slot=right-icon]{right:calc((var(--gov-form-input-core-m-icon-padding, 2.5rem) - var(--gov-form-input-core-m-icon-size, 1rem)) / 2)}[size=m].gov-form-multi-select *[slot=right-icon]~input,[size=m].gov-form-multi-select *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-m-icon-padding, 2.5rem)}[size=l].gov-form-multi-select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);gap:0.5rem var(--gov-form-input-core-l-icon-size, 1rem)}[size=l].gov-form-multi-select input,[size=l].gov-form-multi-select select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);height:var(--gov-form-input-core-l-height, 3rem);padding:var(--gov-form-input-core-l-padding, 0.6875rem 0.75rem)}[size=l].gov-form-multi-select *[slot=left-icon],[size=l].gov-form-multi-select *[slot=right-icon]{width:var(--gov-form-input-core-l-icon-size, 1rem);height:var(--gov-form-input-core-l-icon-size, 1rem)}[size=l].gov-form-multi-select *[slot=left-icon]{left:calc((var(--gov-form-input-core-l-icon-padding, 2.5rem) - var(--gov-form-input-core-l-icon-size, 1rem)) / 2)}[size=l].gov-form-multi-select *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-l-icon-padding, 2.5rem)}[size=l].gov-form-multi-select *[slot=right-icon]{right:calc((var(--gov-form-input-core-l-icon-padding, 2.5rem) - var(--gov-form-input-core-l-icon-size, 1rem)) / 2)}[size=l].gov-form-multi-select *[slot=right-icon]~input,[size=l].gov-form-multi-select *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-l-icon-padding, 2.5rem)}[size=xl].gov-form-multi-select{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);gap:0.5rem var(--gov-form-input-core-xl-icon-size, 1.25rem)}[size=xl].gov-form-multi-select input,[size=xl].gov-form-multi-select select{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);height:var(--gov-form-input-core-xl-height, 3.5rem);padding:var(--gov-form-input-core-xl-padding, 0.9375rem 1rem 0.875rem)}[size=xl].gov-form-multi-select *[slot=left-icon],[size=xl].gov-form-multi-select *[slot=right-icon]{width:var(--gov-form-input-core-xl-icon-size, 1.25rem);height:var(--gov-form-input-core-xl-icon-size, 1.25rem)}[size=xl].gov-form-multi-select *[slot=left-icon]{left:calc((var(--gov-form-input-core-xl-icon-padding, 3rem) - var(--gov-form-input-core-xl-icon-size, 1.25rem)) / 2)}[size=xl].gov-form-multi-select *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-xl-icon-padding, 3rem)}[size=xl].gov-form-multi-select *[slot=right-icon]{right:calc((var(--gov-form-input-core-xl-icon-padding, 3rem) - var(--gov-form-input-core-xl-icon-size, 1.25rem)) / 2)}[size=xl].gov-form-multi-select *[slot=right-icon]~input,[size=xl].gov-form-multi-select *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-xl-icon-padding, 3rem)}[variant=primary].gov-form-multi-select input,[variant=primary].gov-form-multi-select select,[variant=primary].gov-form-multi-select textarea{color:var(--gov-form-input-color-primary, var(--gov-color-secondary-700));border:var(--gov-form-input-border-primary, 0.0625rem solid var(--gov-color-primary-600))}[variant=primary].gov-form-multi-select *[slot=left-icon],[variant=primary].gov-form-multi-select *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-input-icon-color-primary, var(--gov-color-primary))}[variant=secondary].gov-form-multi-select input,[variant=secondary].gov-form-multi-select select,[variant=secondary].gov-form-multi-select textarea{color:var(--gov-form-input-color-secondary, var(--gov-color-secondary-700));border:var(--gov-form-input-border-secondary, 0.0625rem solid var(--gov-color-secondary-700))}[variant=secondary].gov-form-multi-select *[slot=left-icon],[variant=secondary].gov-form-multi-select *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-input-icon-color-secondary, var(--gov-color-primary))}[disabled=\"\"].gov-form-multi-select,[disabled=true i].gov-form-multi-select,[disabled=\"1\"].gov-form-multi-select{pointer-events:none}[disabled=\"\"].gov-form-multi-select input,[disabled=\"\"].gov-form-multi-select select,[disabled=\"\"].gov-form-multi-select textarea,[disabled=true i].gov-form-multi-select input,[disabled=true i].gov-form-multi-select select,[disabled=true i].gov-form-multi-select textarea,[disabled=\"1\"].gov-form-multi-select input,[disabled=\"1\"].gov-form-multi-select select,[disabled=\"1\"].gov-form-multi-select textarea{border-color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600));background:var(--gov-form-input-disabled-bg, var(--gov-color-secondary-300));color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600))}[disabled=\"\"].gov-form-multi-select *[slot=left-icon],[disabled=\"\"].gov-form-multi-select *[slot=right-icon],[disabled=true i].gov-form-multi-select *[slot=left-icon],[disabled=true i].gov-form-multi-select *[slot=right-icon],[disabled=\"1\"].gov-form-multi-select *[slot=left-icon],[disabled=\"1\"].gov-form-multi-select *[slot=right-icon]{color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600)) !important}[invalid=\"\"].gov-form-multi-select input,[invalid=\"\"].gov-form-multi-select select,[invalid=\"\"].gov-form-multi-select textarea,[invalid=true i].gov-form-multi-select input,[invalid=true i].gov-form-multi-select select,[invalid=true i].gov-form-multi-select textarea,[invalid=\"1\"].gov-form-multi-select input,[invalid=\"1\"].gov-form-multi-select select,[invalid=\"1\"].gov-form-multi-select textarea{border-color:var(--gov-form-state-color-error, var(--gov-color-error));color:var(--gov-form-state-color-error, var(--gov-color-error))}[invalid=\"\"].gov-form-multi-select input::-moz-placeholder,[invalid=\"\"].gov-form-multi-select select::-moz-placeholder,[invalid=\"\"].gov-form-multi-select textarea::-moz-placeholder,[invalid=true i].gov-form-multi-select input::-moz-placeholder,[invalid=true i].gov-form-multi-select select::-moz-placeholder,[invalid=true i].gov-form-multi-select textarea::-moz-placeholder,[invalid=\"1\"].gov-form-multi-select input::-moz-placeholder,[invalid=\"1\"].gov-form-multi-select select::-moz-placeholder,[invalid=\"1\"].gov-form-multi-select textarea::-moz-placeholder{color:var(--gov-form-state-color-error, var(--gov-color-error-300))}[invalid=\"\"].gov-form-multi-select input::placeholder,[invalid=\"\"].gov-form-multi-select select::placeholder,[invalid=\"\"].gov-form-multi-select textarea::placeholder,[invalid=true i].gov-form-multi-select input::placeholder,[invalid=true i].gov-form-multi-select select::placeholder,[invalid=true i].gov-form-multi-select textarea::placeholder,[invalid=\"1\"].gov-form-multi-select input::placeholder,[invalid=\"1\"].gov-form-multi-select select::placeholder,[invalid=\"1\"].gov-form-multi-select textarea::placeholder{color:var(--gov-form-state-color-error, var(--gov-color-error-300))}[invalid=\"\"].gov-form-multi-select *[slot=left-icon],[invalid=\"\"].gov-form-multi-select *[slot=right-icon],[invalid=true i].gov-form-multi-select *[slot=left-icon],[invalid=true i].gov-form-multi-select *[slot=right-icon],[invalid=\"1\"].gov-form-multi-select *[slot=left-icon],[invalid=\"1\"].gov-form-multi-select *[slot=right-icon]{color:var(--gov-form-state-color-error, var(--gov-color-error)) !important}[invalid=\"\"].gov-form-multi-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[invalid=true i].gov-form-multi-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[invalid=\"1\"].gov-form-multi-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow){display:none}[success=\"\"].gov-form-multi-select *[slot=right-icon]:not(.icon-arrow),[success=true i].gov-form-multi-select *[slot=right-icon]:not(.icon-arrow),[success=\"1\"].gov-form-multi-select *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-state-color-success, var(--gov-color-success))}[success=\"\"].gov-form-multi-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[success=true i].gov-form-multi-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[success=\"1\"].gov-form-multi-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow){display:none}[multiline=\"\"].gov-form-multi-select *[slot=left-icon],[multiline=\"\"].gov-form-multi-select *[slot=right-icon],[multiline=true i].gov-form-multi-select *[slot=left-icon],[multiline=true i].gov-form-multi-select *[slot=right-icon],[multiline=\"1\"].gov-form-multi-select *[slot=left-icon],[multiline=\"1\"].gov-form-multi-select *[slot=right-icon]{display:none}.gov-form-multi-select{background:none}.gov-form-multi-select select{-webkit-appearance:none;-moz-appearance:none}.gov-form-multi-select select::-ms-expand{display:none}[size=s].gov-form-multi-select *[slot=right-icon]{right:var(--gov-form-select-s-arrow-right-position, 0.75rem);width:var(--gov-form-select-s-arrow-size, 0.75rem);height:var(--gov-form-select-s-arrow-size, 0.75rem)}[size=s][invalid=\"\"].gov-form-multi-select .icon-arrow,[size=s][invalid=true i].gov-form-multi-select .icon-arrow,[size=s][invalid=\"1\"].gov-form-multi-select .icon-arrow{right:calc(3 * var(--gov-form-select-s-arrow-right-position, 0.75rem))}[size=s][success=\"\"].gov-form-multi-select .icon-arrow,[size=s][success=true i].gov-form-multi-select .icon-arrow,[size=s][success=\"1\"].gov-form-multi-select .icon-arrow{right:calc(3 * var(--gov-form-select-s-arrow-right-position, 0.75rem))}[size=m].gov-form-multi-select *[slot=right-icon]{right:var(--gov-form-select-m-arrow-right-position, 1rem);width:var(--gov-form-select-m-arrow-size, 0.75rem);height:var(--gov-form-select-m-arrow-size, 0.75rem)}[size=m][invalid=\"\"].gov-form-multi-select .icon-arrow,[size=m][invalid=true i].gov-form-multi-select .icon-arrow,[size=m][invalid=\"1\"].gov-form-multi-select .icon-arrow{right:calc(3 * var(--gov-form-select-m-arrow-right-position, 1rem))}[size=m][success=\"\"].gov-form-multi-select .icon-arrow,[size=m][success=true i].gov-form-multi-select .icon-arrow,[size=m][success=\"1\"].gov-form-multi-select .icon-arrow{right:calc(3 * var(--gov-form-select-m-arrow-right-position, 1rem))}[size=l].gov-form-multi-select *[slot=right-icon]{right:var(--gov-form-select-l-arrow-right-position, 1rem);width:var(--gov-form-select-l-arrow-size, 1rem);height:var(--gov-form-select-l-arrow-size, 1rem)}[size=l][invalid=\"\"].gov-form-multi-select .icon-arrow,[size=l][invalid=true i].gov-form-multi-select .icon-arrow,[size=l][invalid=\"1\"].gov-form-multi-select .icon-arrow{right:calc(3 * var(--gov-form-select-l-arrow-right-position, 1rem))}[size=l][success=\"\"].gov-form-multi-select .icon-arrow,[size=l][success=true i].gov-form-multi-select .icon-arrow,[size=l][success=\"1\"].gov-form-multi-select .icon-arrow{right:calc(3 * var(--gov-form-select-l-arrow-right-position, 1rem))}[size=xl].gov-form-multi-select *[slot=right-icon]{right:var(--gov-form-select-xl-arrow-right-position, 1.3125rem);width:var(--gov-form-select-xl-arrow-size, 1rem);height:var(--gov-form-select-xl-arrow-size, 1rem)}[size=xl][invalid=\"\"].gov-form-multi-select .icon-arrow,[size=xl][invalid=true i].gov-form-multi-select .icon-arrow,[size=xl][invalid=\"1\"].gov-form-multi-select .icon-arrow{right:calc(3 * var(--gov-form-select-xl-arrow-right-position, 1.3125rem))}[size=xl][success=\"\"].gov-form-multi-select .icon-arrow,[size=xl][success=true i].gov-form-multi-select .icon-arrow,[size=xl][success=\"1\"].gov-form-multi-select .icon-arrow{right:calc(3 * var(--gov-form-select-xl-arrow-right-position, 1.3125rem))}[size=s][invalid=\"\"].gov-form-multi-select *[slot=right-icon]~select,[size=s][invalid=\"\"].gov-form-multi-select *[slot=right-icon]~input,[size=s][invalid=true i].gov-form-multi-select *[slot=right-icon]~select,[size=s][invalid=true i].gov-form-multi-select *[slot=right-icon]~input,[size=s][invalid=\"1\"].gov-form-multi-select *[slot=right-icon]~select,[size=s][invalid=\"1\"].gov-form-multi-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-s-icon-padding, 2rem))}[size=s][success=\"\"].gov-form-multi-select *[slot=right-icon]~select,[size=s][success=\"\"].gov-form-multi-select *[slot=right-icon]~input,[size=s][success=true i].gov-form-multi-select *[slot=right-icon]~select,[size=s][success=true i].gov-form-multi-select *[slot=right-icon]~input,[size=s][success=\"1\"].gov-form-multi-select *[slot=right-icon]~select,[size=s][success=\"1\"].gov-form-multi-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-s-icon-padding, 2rem))}[size=m][invalid=\"\"].gov-form-multi-select *[slot=right-icon]~select,[size=m][invalid=\"\"].gov-form-multi-select *[slot=right-icon]~input,[size=m][invalid=true i].gov-form-multi-select *[slot=right-icon]~select,[size=m][invalid=true i].gov-form-multi-select *[slot=right-icon]~input,[size=m][invalid=\"1\"].gov-form-multi-select *[slot=right-icon]~select,[size=m][invalid=\"1\"].gov-form-multi-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-m-icon-padding, 2.5rem))}[size=m][success=\"\"].gov-form-multi-select *[slot=right-icon]~select,[size=m][success=\"\"].gov-form-multi-select *[slot=right-icon]~input,[size=m][success=true i].gov-form-multi-select *[slot=right-icon]~select,[size=m][success=true i].gov-form-multi-select *[slot=right-icon]~input,[size=m][success=\"1\"].gov-form-multi-select *[slot=right-icon]~select,[size=m][success=\"1\"].gov-form-multi-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-m-icon-padding, 2.5rem))}[size=l][invalid=\"\"].gov-form-multi-select *[slot=right-icon]~select,[size=l][invalid=\"\"].gov-form-multi-select *[slot=right-icon]~input,[size=l][invalid=true i].gov-form-multi-select *[slot=right-icon]~select,[size=l][invalid=true i].gov-form-multi-select *[slot=right-icon]~input,[size=l][invalid=\"1\"].gov-form-multi-select *[slot=right-icon]~select,[size=l][invalid=\"1\"].gov-form-multi-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-l-icon-padding, 2.5rem))}[size=l][success=\"\"].gov-form-multi-select *[slot=right-icon]~select,[size=l][success=\"\"].gov-form-multi-select *[slot=right-icon]~input,[size=l][success=true i].gov-form-multi-select *[slot=right-icon]~select,[size=l][success=true i].gov-form-multi-select *[slot=right-icon]~input,[size=l][success=\"1\"].gov-form-multi-select *[slot=right-icon]~select,[size=l][success=\"1\"].gov-form-multi-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-l-icon-padding, 2.5rem))}[size=xl][invalid=\"\"].gov-form-multi-select *[slot=right-icon]~select,[size=xl][invalid=\"\"].gov-form-multi-select *[slot=right-icon]~input,[size=xl][invalid=true i].gov-form-multi-select *[slot=right-icon]~select,[size=xl][invalid=true i].gov-form-multi-select *[slot=right-icon]~input,[size=xl][invalid=\"1\"].gov-form-multi-select *[slot=right-icon]~select,[size=xl][invalid=\"1\"].gov-form-multi-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-xl-icon-padding, 3rem))}[size=xl][success=\"\"].gov-form-multi-select *[slot=right-icon]~select,[size=xl][success=\"\"].gov-form-multi-select *[slot=right-icon]~input,[size=xl][success=true i].gov-form-multi-select *[slot=right-icon]~select,[size=xl][success=true i].gov-form-multi-select *[slot=right-icon]~input,[size=xl][success=\"1\"].gov-form-multi-select *[slot=right-icon]~select,[size=xl][success=\"1\"].gov-form-multi-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-xl-icon-padding, 3rem))}.gov-form-multi-select{flex-wrap:wrap}.gov-form-multi-select__wrap{display:flex;gap:0.5rem;width:100%}.gov-form-multi-select__list{font-weight:var(--gov-text-xs-font-weight);font-size:var(--gov-text-xs-font-size);line-height:var(--gov-text-xs-line-height);letter-spacing:var(--gov-text-xs-letter-spacing);display:flex;gap:0.5rem;flex-wrap:wrap}.gov-form-multi-select__list>.gov-form-multi-select__item{position:relative;display:flex;flex:0 0 auto;align-items:center;padding:0rem 0rem 0rem 0.5rem;background:var(--gov-form-multiselect-bg, var(--gov-color-primary-200));transition:150ms linear background-color}";

const GovFormMultiSelect = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.govFocus = index.createEvent(this, "gov-focus", 7);
    this.govBlur = index.createEvent(this, "gov-blur", 7);
    this.govChange = index.createEvent(this, "gov-change", 7);
    this.govSelect = index.createEvent(this, "gov-select", 7);
    this.govRemove = index.createEvent(this, "gov-remove", 7);
    this.identifier = undefined;
    this.placeholder = undefined;
    this.variant = undefined;
    this.size = 'm';
    this.name = undefined;
    this.hideSelectedList = false;
    this.required = false;
    this.disabled = false;
    this.invalid = undefined;
    this.success = undefined;
    this.messageEmpty = 'Nebyly nalezeny žádné výsledky';
    this.messageLoading = 'Načítám...';
    this.wcagDescribedBy = undefined;
    this.wcagLabelledBy = undefined;
    this.wcagOwns = undefined;
    this.focused = undefined;
    this.value = undefined;
    this.selectedOptions = [];
    this.options = [];
    this.selectId = string_utils.createID('GovSelect');
    this.listId = string_utils.createID('GovMultiList');
    this.h = template.govHost(this.host);
    this.f = form.govForm(this.h);
  }
  validateVariant(newValue) {
    props.validateProp(form.FormMultiselectVariants, newValue, form.FormMultiSelectClass.root);
  }
  validateSize(newValue) {
    props.validateProp(form.FormMultiselectSizes, newValue, form.FormMultiSelectClass.root);
  }
  watchDisabled() {
    this.passControlAttrs();
  }
  passControlAttrs() {
    this.f.passAttrToControl('size', this.size);
    this.f.passAttrToControl('invalid', template.toBoolAttr(this.invalid));
    this.f.passAttrToControl('success', template.toBoolAttr(this.success));
  }
  componentWillLoad() {
    this.validateVariant(this.variant);
    this.validateSize(this.size);
    this.watchDisabled();
  }
  getAvailableOptions(ignoreFilter = false) {
    if (Array.isArray(this.options) && this.options.length) {
      if (ignoreFilter) {
        return this.options;
      }
      return this.options.filter((option) => {
        const isSelected = this.selectedOptions.findIndex((selected) => selected.value === option.value);
        return (isSelected !== -1 || (option === null || option === void 0 ? void 0 : option.disabled)) ? false : true;
      });
    }
    return Array.from(this.selectRef.querySelectorAll('option'))
      .filter((option) => {
      if (ignoreFilter) {
        return true;
      }
      return !(option.disabled || option.selected);
    })
      .map((option) => ({ name: option.textContent, value: option.value }));
  }
  initAutocomplete() {
    this.autocompleteRef.addEventListener('gov-select', this.onSelectHandler.bind(this));
    this.autocompleteRef.addEventListener('gov-input', this.onInputHandler.bind(this));
    this.autocompleteRef.addEventListener('gov-focus', this.onFocusHandler.bind(this));
    this.autocompleteRef.addEventListener('gov-blur', this.onBlurHandler.bind(this));
    this.autocompleteRef
      .setSearchCallback(value => {
      return new Promise(resolve => {
        const data = this.getAvailableOptions();
        if (String(value).length === 0) {
          return resolve(data);
        }
        resolve(data.filter(({ name }) => {
          if (!name)
            return false;
          return string_utils.removeDiacritics(name).toLowerCase().indexOf(string_utils.removeDiacritics(value).toLowerCase()) > -1;
        }));
      });
    })
      .then();
  }
  getOptionIndex(value) {
    return this.selectedOptions.findIndex(option => option.value === value.value && option.name === value.name);
  }
  getOptionElement(value) {
    return this.selectRef.querySelector('option[value="' + value.value + '"]');
  }
  selectOption(newOption, notify = true) {
    const index = this.getOptionIndex(newOption);
    if (index === -1) {
      this.selectedOptions = [...this.selectedOptions, newOption];
      if (notify) {
        this.govChange.emit({
          component: form.FormMultiSelectClass.root,
          value: this.selectedOptions,
        });
        this.govSelect.emit({
          component: form.FormMultiSelectClass.root,
          value: this.selectedOptions,
        });
      }
      const option = this.getOptionElement(newOption);
      if (option) {
        option.selected = true;
      }
    }
  }
  removeOption(removeOption, notify = true) {
    const index = this.getOptionIndex(removeOption);
    if (index !== -1) {
      this.selectedOptions.splice(index, 1);
      this.selectedOptions = [...this.selectedOptions];
      if (notify) {
        this.govChange.emit({
          component: form.FormMultiSelectClass.root,
          value: this.selectedOptions,
        });
        this.govRemove.emit({
          component: form.FormMultiSelectClass.root,
          value: this.selectedOptions,
        });
      }
      const option = this.getOptionElement(removeOption);
      if (option) {
        option.selected = false;
      }
    }
  }
  async componentDidLoad() {
    this.initAutocomplete();
    this.selectRef.querySelectorAll('option').forEach((option) => {
      if (option.selected) {
        this.selectOption({
          name: option.textContent,
          value: option.value,
        }, false);
      }
    });
    if (win.canValidateWcagOnRender()) {
      await utils.delay(500);
      await this.validateWcag();
    }
  }
  render() {
    return (index.h(index.Host, { class: form.FormMultiSelectClass.root, size: this.size, variant: this.variant }, index.h("div", { class: form.FormMultiSelectClass.wrap }, index.h("div", { class: "element" }, index.h("gov-form-autocomplete", { value: this.value, disabled: this.disabled, identifier: this.identifier || this.selectId, required: false, size: this.size, variant: this.variant, placeholder: this.placeholder, "message-empty": this.messageEmpty, "message-loading": this.messageLoading, ref: el => (this.autocompleteRef = el), minlength: 0, wcagDescribedBy: this.wcagDescribedBy, wcagLabelledBy: this.wcagLabelledBy, wcagOwns: this.listId }), index.h("gov-icon", { slot: "right-icon", class: "icon-arrow", name: "chevron-down" }), this.h.hasSlot('right-icon') && !(this.success || this.invalid) && index.h("slot", { name: "right-icon" }), this.success && index.h("gov-icon", { slot: "right-icon", class: "icon-validation", name: "check-lg" }), this.invalid && index.h("gov-icon", { slot: "right-icon", class: "icon-validation", name: "exclamation-lg" }), index.h("select", { hidden: true, "aria-hidden": template.toBoolAttr(true), multiple: true, required: this.required, name: this.name, disabled: this.disabled, ref: el => (this.selectRef = el), "aria-disabled": template.toBoolAttrIfDefined(this.disabled), "aria-required": template.toBoolAttrIfDefined(this.required), "aria-invalid": template.toBoolAttrIfDefined(this.invalid), "aria-describedby": this.wcagDescribedBy, "aria-labelledby": this.wcagLabelledBy, "aria-owns": this.wcagOwns }, index.h("slot", null), this.options.map((option) => {
      return (index.h("option", { value: option.value, selected: option.value === this.value, disabled: option === null || option === void 0 ? void 0 : option.disabled }, option.name));
    })))), this.hideSelectedList === false ? (index.h("ul", { role: "listbox", id: this.listId, class: form.FormMultiSelectClass.list }, this.selectedOptions.map(option => {
      return (index.h("li", { class: form.FormMultiSelectClass.item, role: "option" }, option.name, index.h("gov-button", { wcagLabel: 'Odebrat vybranou položku ' + option.name, variant: "primary", type: "base", size: "s", "on-gov-click": () => this.onTagRemove(option) }, index.h("gov-icon", { name: "x-lg" }))));
    }))) : null));
  }
  onFocusHandler(e) {
    e.stopPropagation();
    this.focused = true;
    this.govFocus.emit({
      component: form.FormMultiSelectClass.root,
      originalEvent: e,
      value: this.selectedOptions,
    });
  }
  onBlurHandler(e) {
    e.stopPropagation();
    e.stopPropagation();
    this.focused = false;
    this.govBlur.emit({
      component: form.FormMultiSelectClass.root,
      originalEvent: e,
      value: this.selectedOptions,
    });
  }
  onInputHandler(e) {
    this.value = e.detail.value;
    e.stopPropagation();
  }
  onSelectHandler(e) {
    e.stopPropagation();
    const value = e.detail.selected;
    this.selectOption(value);
    this.value = '';
    this.autocompleteRef.clearValue();
    this.autocompleteRef.focus();
  }
  onTagRemove(removeOption) {
    this.removeOption(removeOption);
  }
  /**
   * Returns the current state of the component
   */
  async setFocus(options) {
    return this.selectRef.focus(options);
  }
  /**
   * Sets the ordered value of the element
   */
  async setValue(value) {
    this.value = value;
  }
  /**
   * Returns an instance of the native html select element
   */
  async getRef() {
    return this.selectRef;
  }
  /**
   * Returns a list of selected items
   */
  async getSelectedOptions() {
    return this.selectedOptions;
  }
  /**
   * Setting a list of options to choose from
   */
  async setOptions(options) {
    if (Array.isArray(options)) {
      this.options = [...options];
    }
  }
  /**
   * Returns all available options
   */
  async getOptions(ignoreFilter = true) {
    return this.getAvailableOptions(ignoreFilter);
  }
  /**
   * Setting the list of selected options
   */
  async setSelectedOptions(options) {
    if (Array.isArray(options)) {
      this.selectedOptions = [...options];
    }
  }
  /**
   * To remove an option from the selected list
   */
  async removeSelectedOption(option, notify = false) {
    if (typeof option === 'object' && hasOwnProperty(option, 'name') && hasOwnProperty(option, 'value')) {
      this.removeOption(option, notify);
    }
  }
  /**
   * Returns an instance of the native html select element
   */
  async setSelectedOption(option, notify = false) {
    if (typeof option === 'object' && hasOwnProperty(option, 'name') && hasOwnProperty(option, 'value')) {
      this.selectOption(option, notify);
    }
  }
  /**
   * Validate the WCAG attributes of the component
   */
  async validateWcag() {
    wcag.validateWcagRef(this.wcagDescribedBy, 'wcag-described-by', form.FormMultiSelectClass.root);
    wcag.validateWcagRef(this.wcagLabelledBy, 'wcag-labelled-by', form.FormMultiSelectClass.root);
    wcag.validateWcagRef(this.wcagOwns, 'wcag-owns', form.FormMultiSelectClass.root);
    wcag.validateWcagLabelFor(this.identifier || this.selectId, this.wcagLabelledBy, form.FormMultiSelectClass.root);
  }
  get host() { return index.getElement(this); }
  static get watchers() { return {
    "variant": ["validateVariant"],
    "size": ["validateSize", "watchDisabled"],
    "disabled": ["watchDisabled"],
    "invalid": ["watchDisabled"],
    "success": ["watchDisabled"]
  }; }
};
GovFormMultiSelect.style = govFormMultiSelectCss;

exports.gov_form_multi_select = GovFormMultiSelect;

//# sourceMappingURL=gov-form-multi-select.cjs.entry.js.map