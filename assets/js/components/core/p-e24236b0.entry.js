import{r as o,c as t,h as r,a,g as s}from"./p-5bc604a3.js";import{v as i}from"./p-dcb5fb35.js";import{V as e,T as n}from"./p-ff7365ae.js";import{p as v}from"./p-03990da5.js";import{g as c}from"./p-28e59384.js";import{c as g}from"./p-24636c53.js";import"./p-7f2c9830.js";import"./p-003e6cca.js";const l=v(e,["SUCCESS","WARNING","ERROR","SECONDARY","PRIMARY"]);v(n,["CLASSIC","SOLID"]);const d={root:"gov-toast",hidden:"gov-toast--hidden",icon:"gov-toast__icon",content:"gov-toast__content",close:"gov-toast__close",timer:"gov-toast__timer"};const m=".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-toast{position:relative;display:flex;gap:1rem;flex-direction:column;padding:0.75rem 1rem;border-left:0.25rem solid transparent;background:var(--gov-toast-message-bg, var(--gov-color-neutral-white));z-index:301;position:relative;position:fixed;max-width:23.4375rem;padding-right:3.125rem;opacity:1;transition:opacity 300ms ease-in-out}.gov-toast__icon{flex:0 0 1.25rem;width:1.25rem;height:1.25rem}.gov-toast__content{flex:1 1 auto}.gov-toast__content>*:last-child{margin-bottom:0}.gov-toast__content p{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing)}@media (min-width: 30em){.gov-toast{flex-direction:row}}.gov-toast__content{padding-right:0}.gov-toast__close{position:absolute;top:0.5rem;right:0.75rem}.gov-toast__timer{position:absolute;top:0;right:0;bottom:0;left:0;z-index:-1}.gov-toast--hidden{opacity:0}.gov-toast[gravity=top i]{top:1rem}.gov-toast[gravity=bottom i]{bottom:1rem}.gov-toast[position=left i]{left:1rem}.gov-toast[position=center i]{left:50%;transform:translateX(-50%)}.gov-toast[position=right i]{right:1rem}.gov-toast[type=solid i]{border:none;border-radius:0.25rem;overflow:hidden;box-shadow:none}.gov-toast[type=solid i].is-initialized .gov-toast__timer{transform-origin:right;animation:countdown linear forwards var(--toast-duration, 0)}.gov-toast[variant=warning]{border-left-color:var(--gov-toast-warning-codecor-lor, var(--gov-color-warning))}.gov-toast[variant=warning] .gov-toast__icon{color:var(--gov-toast-warning-codecor-lor, var(--gov-color-warning))}.gov-toast[variant=warning][type=solid i]{background-color:var(--gov-toast-warning-background, var(--gov-color-warning));color:var(--gov-toast-warning-color, var(--gov-color-secondary))}.gov-toast[variant=warning][type=solid i] .gov-toast__icon{color:var(--gov-toast-warning-color, var(--gov-color-secondary))}.gov-toast[variant=warning][type=solid i] .gov-toast__timer{background-color:var(--gov-toast-warning-timer-background, rgba(var(--gov-color-warning-500-rgb), 0.3))}.gov-toast[variant=error]{border-left-color:var(--gov-toast-error-colodecor-r, var(--gov-color-error))}.gov-toast[variant=error] .gov-toast__icon{color:var(--gov-toast-error-colodecor-r, var(--gov-color-error))}.gov-toast[variant=error][type=solid i]{background-color:var(--gov-toast-error-background, var(--gov-color-error));color:var(--gov-toast-error-color, var(--gov-color-neutral-white))}.gov-toast[variant=error][type=solid i] .gov-toast__icon{color:var(--gov-toast-error-color, var(--gov-color-neutral-white))}.gov-toast[variant=error][type=solid i] .gov-toast__timer{background-color:var(--gov-toast-error-timer-background, rgba(var(--gov-color-error-500-rgb), 0.5))}.gov-toast[variant=success]{border-left-color:var(--gov-toast-success-codecor-lor, var(--gov-color-success))}.gov-toast[variant=success] .gov-toast__icon{color:var(--gov-toast-success-codecor-lor, var(--gov-color-success))}.gov-toast[variant=success][type=solid i]{background-color:var(--gov-toast-success-background, var(--gov-color-success-500));color:var(--gov-toast-success-color, var(--gov-color-neutral-white))}.gov-toast[variant=success][type=solid i] .gov-toast__icon{color:var(--gov-toast-success-color, var(--gov-color-neutral-white))}.gov-toast[variant=success][type=solid i] .gov-toast__timer{background-color:var(--gov-toast-success-timer-background, rgba(var(--gov-color-success-600-rgb), 0.5))}.gov-toast[variant=primary]{border-left-color:var(--gov-toast-primary-codecor-lor, var(--gov-color-primary))}.gov-toast[variant=primary] .gov-toast__icon{color:var(--gov-toast-primary-codecor-lor, var(--gov-color-primary))}.gov-toast[variant=primary][type=solid i]{background-color:var(--gov-toast-primary-background, var(--gov-color-primary));color:var(--gov-toast-primary-color, var(--gov-color-neutral-white))}.gov-toast[variant=primary][type=solid i] .gov-toast__icon{color:var(--gov-toast-primary-color, var(--gov-color-neutral-white))}.gov-toast[variant=primary][type=solid i] .gov-toast__timer{background-color:var(--gov-toast-primary-timer-background, rgba(var(--gov-color-primary-700-rgb), 0.5))}.gov-toast[variant=secondary]{border-left-color:var(--gov-toast-secondary-decor-color, var(--gov-color-secondary))}.gov-toast[variant=secondary] .gov-toast__icon{color:var(--gov-toast-secondary-decor-color, var(--gov-color-secondary))}.gov-toast[variant=secondary][type=solid i]{background-color:var(--gov-toast-secondary-background, var(--gov-color-secondary));color:var(--gov-toast-secondary-color, var(--gov-color-neutral-white))}.gov-toast[variant=secondary][type=solid i] .gov-toast__icon{color:var(--gov-toast-secondary-color, var(--gov-color-neutral-white))}.gov-toast[variant=secondary][type=solid i] .gov-toast__timer{background-color:var(--gov-toast-secondary-timer-background, rgba(var(--gov-color-secondary-900-rgb), 0.5))}@media (min-width: 30em){.gov-toast__content{padding-right:2rem}}";const p=class{constructor(r){o(this,r);this.govClose=t(this,"gov-close",7);this.variant="primary";this.gravity="top";this.position="right";this.type="classic";this.time=0;this.closeLabel=undefined;this.wcagCloseLabel=undefined;this.h=c(this.host);this.toastId=g("GovToast")}validateVariant(o){i(l,o,d.root)}componentWillLoad(){this.validateVariant(this.variant);this.runTimer()}disconnectedCallback(){clearTimeout(this.timeout)}runTimer(){if(this.isSolid){this.host.classList.add("is-initialized")}if(this.isTimer){this.timeout=setTimeout((()=>{this.host.classList.add(d.hidden);setTimeout((()=>{this.destroy().catch();this.govClose.emit(this.toastId)}),600)}),this.time)}}render(){return r(a,{class:this.h.classes([d.root,"gov-box-shadow--m"]),"data-toast-id":this.toastId,gravity:this.gravity,position:this.position,variant:this.variant,type:this.type,style:{"--toast-duration":this.time+"ms"}},this.h.hasSlot("icon")&&r("span",{class:d.icon},r("slot",{name:"icon"})),r("div",{class:d.content,"aria-live":"polite",role:"status"},r("slot",null)),r("div",{class:d.close},r("gov-button",{size:"s","wcag-label":this.wcagCloseLabel,variant:this.isSolid?this.variant:"secondary",inverse:this.isSolid,type:"base","on-gov-click":this.onCloseHandler.bind(this)},this.closeLabel?this.closeLabel:r("gov-icon",{name:"x-lg"}))),r("div",{class:d.timer}))}onCloseHandler(){this.destroy().then((()=>this.govClose.emit(this.toastId))).catch()}get isSolid(){return this.type==="solid"}get isTimer(){return Number.isInteger(this.time)&&this.time>0}async destroy(){clearTimeout(this.timeout);const o=document.querySelector(`[data-toast-id="${this.toastId}"]`);if(o){o.classList.add(d.hidden);if(typeof o.remove==="function"){o.remove()}}}get host(){return s(this)}static get watchers(){return{variant:["validateVariant"]}}};p.style=m;export{p as gov_toast};
//# sourceMappingURL=p-e24236b0.entry.js.map