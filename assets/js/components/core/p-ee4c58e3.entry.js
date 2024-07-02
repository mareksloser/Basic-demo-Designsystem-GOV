import{r as e,c as t,h as r,a as o,g as i}from"./p-5bc604a3.js";import{a}from"./p-7f2c9830.js";import{v as s}from"./p-dcb5fb35.js";import{S as p,c as g}from"./p-9144dde1.js";import{c as n}from"./p-24636c53.js";import{g as v,p as c}from"./p-28e59384.js";import"./p-003e6cca.js";import"./p-03990da5.js";import"./p-ff7365ae.js";import"./p-55500e5a.js";const m='.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-stepper-item{position:relative;display:block;width:100%}.gov-stepper-item__header{position:relative;width:100%}.gov-stepper-item__arrow{flex:0 0 auto;width:0.75rem;height:0.75rem}.gov-stepper-item__title{margin:0;padding:0;font-family:var(--gov-font-family, "Roboto", sans-serif);font-weight:400;box-sizing:border-box;display:flex;gap:1rem;align-items:baseline}.gov-stepper-item__prefix{display:flex;flex:0 0 auto;justify-content:center;align-items:center;border-radius:50%;text-align:center}.gov-stepper-item__prefix .gov-icon{width:45%;height:45%}.gov-stepper-item__prefix span[slot=prefix]{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.gov-stepper-item__name{display:flex;flex-direction:column}.gov-stepper-item__label{display:flex;gap:0.5rem;align-items:center;font-weight:var(--gov-wizard-title-font-weight, 700)}.gov-stepper-item__annot{color:var(--gov-color-secondary)}.gov-stepper-item__content>*:last-child{margin-bottom:0}.gov-stepper-item[variant=primary] .gov-stepper-item__header{color:var(--gov-wizard-primary-color, var(--gov-color-primary-800))}.gov-stepper-item[variant=primary] .gov-stepper-item__prefix{background:var(--gov-wizard-primary-indicator-bg, var(--gov-color-primary-300));color:var(--gov-wizard-primary-indicator-color, var(--gov-color-primary-800))}.gov-stepper-item[variant=secondary] .gov-stepper-item__header{color:var(--gov-wizard-secondary-color, var(--gov-color-secondary-700))}.gov-stepper-item[variant=secondary] .gov-stepper-item__prefix{background:var(--gov-wizard-secondary-indicator-bg, var(--gov-color-secondary-400));color:var(--gov-wizard-secondary-indicator-color, var(--gov-color-secondary-700))}.gov-stepper-item[variant=success] .gov-stepper-item__header{color:var(--gov-wizard-success-color, var(--gov-color-success-500))}.gov-stepper-item[variant=success] .gov-stepper-item__prefix{background:var(--gov-wizard-success-indicator-bg, var(--gov-color-success));color:var(--gov-wizard-success-indicator-color, var(--gov-color-neutral-white))}.gov-stepper-item[variant=error] .gov-stepper-item__header{color:var(--gov-wizard-error-color, var(--gov-color-error-500))}.gov-stepper-item[variant=error] .gov-stepper-item__prefix{background:var(--gov-wizard-error-indicator-bg, var(--gov-color-error));color:var(--gov-wizard-error-indicator-color, var(--gov-color-neutral-white))}.gov-stepper-item[variant=warning] .gov-stepper-item__header{color:var(--gov-wizard-warning-color, var(--gov-color-warning-500))}.gov-stepper-item[variant=warning] .gov-stepper-item__prefix{background:var(--gov-wizard-warning-indicator-bg, var(--gov-color-warning));color:var(--gov-wizard-warning-indicator-color, var(--gov-color-neutral-white))}.gov-stepper-item::before{content:"";position:absolute;display:block;width:0.125rem}.gov-stepper-item:last-child::before{content:none}.gov-stepper-item[variant=primary]::before{background:var(--gov-wizard-primary-indicator-bg, var(--gov-color-primary-300))}.gov-stepper-item[variant=secondary]::before{background:var(--gov-wizard-secondary-indicator-bg, var(--gov-color-secondary-400))}.gov-stepper-item[variant=success]::before{background:var(--gov-wizard-success-indicator-bg, var(--gov-color-success))}.gov-stepper-item[variant=error]::before{background:var(--gov-wizard-error-indicator-bg, var(--gov-color-error))}.gov-stepper-item[variant=warning]::before{background:var(--gov-wizard-warning-indicator-bg, var(--gov-color-warning))}.gov-stepper-item[size=xs]{min-height:calc(var(--gov-stepper-xs-indicator-size, 1.5rem) + 3 * var(--gov-stepper-xs-connect-gap, 0.5rem))}.gov-stepper-item[size=xs]::before{top:calc(var(--gov-stepper-xs-indicator-size, 1.5rem) + var(--gov-stepper-xs-connect-gap, 0.5rem));bottom:var(--gov-stepper-xs-connect-gap, 0.5rem);left:calc((var(--gov-stepper-xs-indicator-size, 1.5rem) - 0.125rem) / 2)}.gov-stepper-item[size=xs]:last-child{min-height:0}.gov-stepper-item[size=xs] .gov-stepper-item__title{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing)}.gov-stepper-item[size=xs] .gov-stepper-item__annot{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing)}.gov-stepper-item[size=xs] .gov-stepper-item__prefix{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);width:var(--gov-stepper-xs-indicator-size, 1.5rem);height:var(--gov-stepper-xs-indicator-size, 1.5rem);box-shadow:0 0 0 var(--gov-stepper-xs-connect-gap, 0.5rem) var(--gov-color-neutral-white)}.gov-stepper-item[size=xs] .gov-stepper-item__content{padding:var(--gov-stepper-xs-content-padding, 1rem 1rem 2rem 2.5rem)}.gov-stepper-item--w-annot[size=xs]{min-height:calc(var(--gov-stepper-xs-indicator-size, 1.5rem) * 1.5 + 3 * var(--gov-stepper-xs-connect-gap, 0.5rem))}.gov-stepper-item[size=s]{min-height:calc(var(--gov-stepper-s-indicator-size, 2rem) + 3 * var(--gov-stepper-s-connect-gap, 1rem))}.gov-stepper-item[size=s]::before{top:calc(var(--gov-stepper-s-indicator-size, 2rem) + var(--gov-stepper-s-connect-gap, 1rem));bottom:var(--gov-stepper-s-connect-gap, 1rem);left:calc((var(--gov-stepper-s-indicator-size, 2rem) - 0.125rem) / 2)}.gov-stepper-item[size=s]:last-child{min-height:0}.gov-stepper-item[size=s] .gov-stepper-item__title{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing)}.gov-stepper-item[size=s] .gov-stepper-item__annot{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing)}.gov-stepper-item[size=s] .gov-stepper-item__prefix{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);width:var(--gov-stepper-s-indicator-size, 2rem);height:var(--gov-stepper-s-indicator-size, 2rem);box-shadow:0 0 0 var(--gov-stepper-s-connect-gap, 1rem) var(--gov-color-neutral-white)}.gov-stepper-item[size=s] .gov-stepper-item__content{padding:var(--gov-stepper-s-content-padding, 1rem 1rem 2rem 3rem)}.gov-stepper-item--w-annot[size=s]{min-height:calc(var(--gov-stepper-s-indicator-size, 2rem) * 1.5 + 3 * var(--gov-stepper-s-connect-gap, 1rem))}.gov-stepper-item[size=m]{min-height:calc(var(--gov-stepper-m-indicator-size, 2.5rem) + 3 * var(--gov-stepper-m-connect-gap, 1rem))}.gov-stepper-item[size=m]::before{top:calc(var(--gov-stepper-m-indicator-size, 2.5rem) + var(--gov-stepper-m-connect-gap, 1rem));bottom:var(--gov-stepper-m-connect-gap, 1rem);left:calc((var(--gov-stepper-m-indicator-size, 2.5rem) - 0.125rem) / 2)}.gov-stepper-item[size=m]:last-child{min-height:0}.gov-stepper-item[size=m] .gov-stepper-item__title{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing)}.gov-stepper-item[size=m] .gov-stepper-item__annot{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing)}.gov-stepper-item[size=m] .gov-stepper-item__prefix{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);width:var(--gov-stepper-m-indicator-size, 2.5rem);height:var(--gov-stepper-m-indicator-size, 2.5rem);box-shadow:0 0 0 var(--gov-stepper-m-connect-gap, 1rem) var(--gov-color-neutral-white)}.gov-stepper-item[size=m] .gov-stepper-item__content{padding:var(--gov-stepper-m-content-padding, 1rem 1rem 2rem 3.5rem)}.gov-stepper-item--w-annot[size=m]{min-height:calc(var(--gov-stepper-m-indicator-size, 2.5rem) * 1.5 + 3 * var(--gov-stepper-m-connect-gap, 1rem))}';const l=class{constructor(r){e(this,r);this.govChange=t(this,"gov-change",7);this.isExpandedState=undefined;this.variant="primary";this.size="m";this.identifier=undefined;this.label=undefined;this.annotation=undefined;this.triggerTag="h3";this.h=v(this.host);this.triggerId=n("GovStepperItem");this.contentId=n("GovStepperContent")}validateLabel(e){if(!e){a(`[${p.root}]: Parameter label is required.`)}}validateTriggerTag(e){const t=["h1","h2","h3","h4","h5","h6","span"];if(e){if(!t.includes(e)){a(`[${p.root}]: Tag ${e} is not allowed.`)}}}validateVariant(e){s(g,e,p.root)}componentWillLoad(){this.validateLabel(this.label);this.validateVariant(this.variant);this.validateTriggerTag(this.triggerTag)}render(){const e=this.identifier||this.triggerId;const t=this.contentId;const{label:i}=this;const a=this.triggerTag;return r(o,{class:c([p.root,this.annotation&&p.rootWithAnnot]),variant:this.variant},r("div",{id:e,class:p.header,role:"listitem"},r(a,{class:p.title},this.h.hasSlot("prefix")&&r("span",{class:p.prefix},r("slot",{name:"prefix"})),r("span",{class:p.name},r("span",{class:p.label},i),this.annotation&&r("span",{class:p.annot},this.annotation)))),this.h.hasSlot("content")&&r("div",{class:p.content,id:t,"aria-labelledby":e,role:"tabpanel"},r("slot",{name:"content"})))}async currentState(){return this.isExpandedState}get host(){return i(this)}static get watchers(){return{label:["validateLabel"],triggerTag:["validateTriggerTag"],variant:["validateVariant"]}}};l.style=m;export{l as gov_stepper_item};
//# sourceMappingURL=p-ee4c58e3.entry.js.map