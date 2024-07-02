import{p as i,H as e,c as r,h as a,d as t}from"./p-2dee9951.js";import{a as o}from"./p-7f2c9830.js";import{v as n}from"./p-dcb5fb35.js";import{W as s,c as v}from"./p-6834d779.js";import{c as d}from"./p-24636c53.js";import{g,b as l,t as m}from"./p-28e59384.js";import{F as c}from"./p-1c1d0bbe.js";import{d as z}from"./p-1f84a302.js";const w='.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-wizard-item{position:relative;display:block;width:100%;margin-bottom:1rem;background:var(--gov-wizard-bg-color, var(--gov-color-neutral-white))}.gov-wizard-item__header{position:relative;width:100%}.gov-wizard-item__arrow{flex:0 0 auto;width:0.75rem;height:0.75rem}.gov-wizard-item__title{margin:0;padding:0;font-family:var(--gov-font-family, "Roboto", sans-serif);font-weight:400;box-sizing:border-box;display:flex;gap:1rem;align-items:baseline}.gov-wizard-item__prefix{display:flex;flex:0 0 auto;justify-content:center;align-items:center;border-radius:50%;text-align:center}.gov-wizard-item__prefix .gov-icon{width:45%;height:45%}.gov-wizard-item__prefix span[slot=prefix]{display:flex;justify-content:center;align-items:center;width:100%;height:100%}.gov-wizard-item__name{display:flex;flex-direction:column}.gov-wizard-item__label{display:flex;gap:0.5rem;align-items:center;font-weight:var(--gov-wizard-title-font-weight, 700)}.gov-wizard-item__annot{color:var(--gov-color-secondary)}.gov-wizard-item__content>*:last-child{margin-bottom:0}.gov-wizard-item[variant=primary] .gov-wizard-item__header{color:var(--gov-wizard-primary-color, var(--gov-color-primary-800))}.gov-wizard-item[variant=primary] .gov-wizard-item__prefix{background:var(--gov-wizard-primary-indicator-bg, var(--gov-color-primary-300));color:var(--gov-wizard-primary-indicator-color, var(--gov-color-primary-800))}.gov-wizard-item[variant=secondary] .gov-wizard-item__header{color:var(--gov-wizard-secondary-color, var(--gov-color-secondary-700))}.gov-wizard-item[variant=secondary] .gov-wizard-item__prefix{background:var(--gov-wizard-secondary-indicator-bg, var(--gov-color-secondary-400));color:var(--gov-wizard-secondary-indicator-color, var(--gov-color-secondary-700))}.gov-wizard-item[variant=success] .gov-wizard-item__header{color:var(--gov-wizard-success-color, var(--gov-color-success-500))}.gov-wizard-item[variant=success] .gov-wizard-item__prefix{background:var(--gov-wizard-success-indicator-bg, var(--gov-color-success));color:var(--gov-wizard-success-indicator-color, var(--gov-color-neutral-white))}.gov-wizard-item[variant=error] .gov-wizard-item__header{color:var(--gov-wizard-error-color, var(--gov-color-error-500))}.gov-wizard-item[variant=error] .gov-wizard-item__prefix{background:var(--gov-wizard-error-indicator-bg, var(--gov-color-error));color:var(--gov-wizard-error-indicator-color, var(--gov-color-neutral-white))}.gov-wizard-item[variant=warning] .gov-wizard-item__header{color:var(--gov-wizard-warning-color, var(--gov-color-warning-500))}.gov-wizard-item[variant=warning] .gov-wizard-item__prefix{background:var(--gov-wizard-warning-indicator-bg, var(--gov-color-warning));color:var(--gov-wizard-warning-indicator-color, var(--gov-color-neutral-white))}.gov-wizard-item__header{gap:1rem;padding:1rem;border-radius:0;text-align:left;transition:150ms linear color}.gov-wizard-item__header:focus{outline:none}.gov-wizard-item__header:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-wizard-item__prefix{position:absolute;left:1rem}.gov-wizard-item__header[aria-expanded=true] .gov-wizard-item__label .gov-icon{transform:scale(-1)}.gov-wizard-item[size=xs] .gov-wizard-item__title,.gov-wizard-item[size=s] .gov-wizard-item__title,.gov-wizard-item[size=m] .gov-wizard-item__title{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing)}.gov-wizard-item[size=xs] .gov-wizard-item__annot,.gov-wizard-item[size=s] .gov-wizard-item__annot,.gov-wizard-item[size=m] .gov-wizard-item__annot{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing)}.gov-wizard-item[size=xs] .gov-wizard-item__prefix,.gov-wizard-item[size=s] .gov-wizard-item__prefix,.gov-wizard-item[size=m] .gov-wizard-item__prefix{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);width:var(--gov-wizard-xs-indicator-size, 1.5rem);height:var(--gov-wizard-xs-indicator-size, 1.5rem);top:var(--gov-wizard-xs-top, 1rem)}.gov-wizard-item[size=xs] .gov-wizard-item__prefix+.gov-wizard-item__header,.gov-wizard-item[size=s] .gov-wizard-item__prefix+.gov-wizard-item__header,.gov-wizard-item[size=m] .gov-wizard-item__prefix+.gov-wizard-item__header{padding:var(--gov-wizard-xs-header-padding, 1rem 1rem 1rem 3.5rem)}.gov-wizard-item[size=xs] .gov-wizard-item__content,.gov-wizard-item[size=s] .gov-wizard-item__content,.gov-wizard-item[size=m] .gov-wizard-item__content{padding:var(--gov-wizard-content-padding, 0rem 1rem 1rem 1rem)}@media not all and (pointer: coarse){.gov-wizard-item[variant=primary][collapsible=""] .gov-wizard-item__header:hover,.gov-wizard-item[variant=primary][collapsible=true i] .gov-wizard-item__header:hover,.gov-wizard-item[variant=primary][collapsible="1"] .gov-wizard-item__header:hover{color:var(--gov-wizard-primary-hover-color, var(--gov-color-primary-900))}}@media not all and (pointer: coarse){.gov-wizard-item[variant=secondary][collapsible=""] .gov-wizard-item__header:hover,.gov-wizard-item[variant=secondary][collapsible=true i] .gov-wizard-item__header:hover,.gov-wizard-item[variant=secondary][collapsible="1"] .gov-wizard-item__header:hover{color:var(--gov-wizard-secondary-hover-color, var(--gov-color-secondary-800))}}@media not all and (pointer: coarse){.gov-wizard-item[variant=success][collapsible=""] .gov-wizard-item__header:hover,.gov-wizard-item[variant=success][collapsible=true i] .gov-wizard-item__header:hover,.gov-wizard-item[variant=success][collapsible="1"] .gov-wizard-item__header:hover{color:var(--gov-wizard-success-hover-color, var(--gov-color-success-600))}}@media not all and (pointer: coarse){.gov-wizard-item[variant=error][collapsible=""] .gov-wizard-item__header:hover,.gov-wizard-item[variant=error][collapsible=true i] .gov-wizard-item__header:hover,.gov-wizard-item[variant=error][collapsible="1"] .gov-wizard-item__header:hover{color:var(--gov-wizard-error-hover-color, var(--gov-color-error-600))}}@media not all and (pointer: coarse){.gov-wizard-item[variant=warning][collapsible=""] .gov-wizard-item__header:hover,.gov-wizard-item[variant=warning][collapsible=true i] .gov-wizard-item__header:hover,.gov-wizard-item[variant=warning][collapsible="1"] .gov-wizard-item__header:hover{color:var(--gov-wizard-warning-hover-color, var(--gov-color-warning-600))}}button.gov-wizard-item__header{display:inline-flex;vertical-align:middle;justify-content:center;align-items:center;border:0;background-color:transparent;text-align:center;text-decoration:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;justify-content:flex-start;text-align:left}button.gov-wizard-item__header:focus{outline:none}@media (min-width: 30em){.gov-wizard-item[size=s] .gov-wizard-item__title,.gov-wizard-item[size=m] .gov-wizard-item__title{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing)}.gov-wizard-item[size=s] .gov-wizard-item__prefix,.gov-wizard-item[size=m] .gov-wizard-item__prefix{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);width:var(--gov-wizard-s-indicator-size, 2rem);height:var(--gov-wizard-s-indicator-size, 2rem);top:var(--gov-wizard-s-top, 0.8125rem)}.gov-wizard-item[size=s] .gov-wizard-item__prefix+.gov-wizard-item__header,.gov-wizard-item[size=m] .gov-wizard-item__prefix+.gov-wizard-item__header{padding:var(--gov-wizard-s-header-padding, 1rem 1rem 1rem 4rem)}}@media (min-width: 48em){.gov-wizard-item[size=m] .gov-wizard-item__title{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing)}.gov-wizard-item[size=m] .gov-wizard-item__prefix{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);width:var(--gov-wizard-m-indicator-size, 2.5rem);height:var(--gov-wizard-m-indicator-size, 2.5rem);top:var(--gov-wizard-m-top, 0.5625rem)}.gov-wizard-item[size=m] .gov-wizard-item__prefix+.gov-wizard-item__header{padding:var(--gov-wizard-m-header-padding, 1rem 1rem 1rem 4.5rem)}.gov-wizard-item[size=xs] .gov-wizard-item__content{padding:var(--gov-wizard-xs-content-padding, 0rem 1rem 1rem 3.5rem)}.gov-wizard-item[size=s] .gov-wizard-item__content{padding:var(--gov-wizard-s-content-padding, 0rem 1rem 1rem 4rem)}.gov-wizard-item[size=m] .gov-wizard-item__content{padding:var(--gov-wizard-m-content-padding, 0rem 1rem 1rem 4.5rem)}}';var h;(function(i){i["DIV"]="div";i["BUTTON"]="button"})(h||(h={}));const p=i(class i extends e{constructor(){super();this.__registerHost();this.govChange=r(this,"gov-change",7);this.variant="primary";this.size="m";this.identifier=undefined;this.collapsible=false;this.annotation=undefined;this.label=undefined;this.disabled=false;this.isExpanded=false;this.labelTag="h3";this.h=g(this.host);this.triggerId=d("GovWizardItem");this.contentId=d("GovWizardContent")}validateLabel(i){if(!i){o(`[${s.root}]: Parameter label is required.`)}}validateTriggerTag(i){const e=["h1","h2","h3","h4","h5","h6","span"];if(i){if(!e.includes(i)){o(`[${s.root}]: Tag ${i} is not allowed.`)}}}validateVariant(i){n(v,i,s.root)}emmitChange(){this.govChange.emit({expanded:this.isExpanded,component:s.root})}componentWillLoad(){this.validateLabel(this.label);this.validateVariant(this.variant);this.validateTriggerTag(this.labelTag)}render(){const i=this.identifier||this.triggerId;const e=this.labelTag;const r=this.collapsible?h.BUTTON:h.DIV;const o=this.h.hasSlot("prefix")&&a("span",{class:s.prefix},a("slot",{name:"prefix"}));const n=a(e,{class:s.title},a("span",{class:s.name},a("span",{class:s.label},a("span",null,this.label),this.collapsible&&a("gov-icon",{class:s.arrow,name:"chevron-down"})),this.annotation&&a("span",{class:s.annot},this.annotation)));return a(t,{class:this.h.classes(s.root),"is-expanded":this.isExpanded,variant:this.variant,size:this.size,role:"listitem",collapsible:this.collapsible},this.collapsible?a(c,null,o,a(r,{id:i,class:s.header,"aria-expanded":l(this.isExpanded),"aria-controls":this.contentId,disabled:this.disabled,"aria-disabled":m(this.disabled),onClick:i=>{i.preventDefault();i.stopPropagation();this.collapsible?this.toggle():false}},n)):a(c,null,o,a("div",{class:s.header},n)),this.collapsible?a("div",{class:s.content,id:this.contentId,"aria-hidden":l(!this.isExpanded),hidden:!this.isExpanded,"aria-labelledby":i},a("slot",null)):a("div",{class:s.content,"aria-hidden":l(!this.isExpanded),hidden:!this.isExpanded},a("slot",null)))}async open(){this.isExpanded=true;this.emmitChange()}async close(){this.isExpanded=false;this.emmitChange()}async toggle(){this.isExpanded=!this.isExpanded;this.emmitChange()}async currentState(){return this.isExpanded}get host(){return this}static get watchers(){return{label:["validateLabel"],labelTag:["validateTriggerTag"],variant:["validateVariant"]}}static get style(){return w}},[4,"gov-wizard-item",{variant:[1],size:[1],identifier:[1],collapsible:[4],annotation:[1],label:[1],disabled:[4],isExpanded:[1028,"is-expanded"],labelTag:[1,"label-tag"],open:[64],close:[64],toggle:[64],currentState:[64]}]);function _(){if(typeof customElements==="undefined"){return}const i=["gov-wizard-item","gov-icon"];i.forEach((i=>{switch(i){case"gov-wizard-item":if(!customElements.get(i)){customElements.define(i,p)}break;case"gov-icon":if(!customElements.get(i)){z()}break}}))}_();const f=p;const x=_;export{f as GovWizardItem,x as defineCustomElement};
//# sourceMappingURL=gov-wizard-item.js.map