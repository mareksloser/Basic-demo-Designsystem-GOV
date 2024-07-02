import{p as t,H as o,c as e,h as r,d as a}from"./p-2dee9951.js";import{v as s}from"./p-dcb5fb35.js";import{T as i,a as n,b as c,c as v}from"./p-fa1e4aea.js";import{g as l,a as g}from"./p-28e59384.js";import{a as b,v as d}from"./p-4ff831e3.js";import{c as h}from"./p-003e6cca.js";import{d as m,t as p}from"./p-03990da5.js";import{c as f}from"./p-24636c53.js";import{d as u}from"./p-e9e8b6ed.js";import{d as y}from"./p-036e0f9e.js";import{d as _}from"./p-1f84a302.js";const w=".gov-tabs__list{margin:0;padding:0}.gov-tabs__list>.gov-tabs__item{margin:0;padding:0;background:none}.gov-tabs__list>.gov-tabs__item::before{display:none}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-tabs{position:relative;display:block;width:100%}.gov-tabs__list{display:flex;flex-wrap:wrap;margin:0rem 0rem 1.25rem}.gov-tabs__list>.gov-tabs__item{display:flex;margin:0}.gov-tabs__btn{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);display:inline-flex;vertical-align:middle;justify-content:center;align-items:center;border:0;background-color:transparent;text-align:center;text-decoration:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;margin:0;padding:0.75rem 0rem 0.625rem;border-bottom:0.125rem solid transparent;font-weight:700;text-align:center;transition:150ms linear color, 150ms linear border-color}.gov-tabs__btn:focus{outline:none}.gov-tabs__btn:focus{outline:none}.gov-tabs__btn:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-tabs[type=text] .gov-tabs__list{gap:0.5rem 2rem;border-bottom:var(--gov-tabs-list-border-width, 0.0625rem solid var(--gov-color-secondary-500))}.gov-tabs[type=chip] .gov-tabs__list{gap:0.5rem 1rem}.gov-tabs[variant=primary][type=text] .gov-tabs__btn{color:var(--gov-tabs-primary-color, var(--gov-color-primary))}@media not all and (pointer: coarse){.gov-tabs[variant=primary][type=text] .gov-tabs__btn:hover{color:var(--gov-tabs-primary-color-hover, var(--gov-color-primary-800))}}.gov-tabs[variant=primary][type=text] .gov-tabs__btn[aria-selected=true]{border-bottom-color:var(--gov-tabs-primary-color-active, var(--gov-color-primary-800));color:var(--gov-tabs-primary-color-active, var(--gov-color-primary-800))}.gov-tabs[variant=secondary][type=text] .gov-tabs__btn{color:var(--gov-tabs-secondary-color, var(--gov-color-secondary-700))}@media not all and (pointer: coarse){.gov-tabs[variant=secondary][type=text] .gov-tabs__btn:hover{color:var(--gov-tabs-secondary-color-hover, var(--gov-color-secondary-900))}}.gov-tabs[variant=secondary][type=text] .gov-tabs__btn[aria-selected=true]{border-bottom-color:var(--gov-tabs-secondary-color-active, var(--gov-color-secondary-900));color:var(--gov-tabs-secondary-color-active, var(--gov-color-secondary-900))}.gov-tabs[variant=success][type=text] .gov-tabs__btn{color:var(--gov-tabs-success-color, var(--gov-color-success-500))}@media not all and (pointer: coarse){.gov-tabs[variant=success][type=text] .gov-tabs__btn:hover{color:var(--gov-tabs-success-color-hover, var(--gov-color-success-700))}}.gov-tabs[variant=success][type=text] .gov-tabs__btn[aria-selected=true]{border-bottom-color:var(--gov-tabs-success-color-active, var(--gov-color-success-700));color:var(--gov-tabs-success-color-active, var(--gov-color-success-700))}.gov-tabs[variant=warning][type=text] .gov-tabs__btn{color:var(--gov-tabs-warning-color, var(--gov-color-warning-500))}@media not all and (pointer: coarse){.gov-tabs[variant=warning][type=text] .gov-tabs__btn:hover{color:var(--gov-tabs-warning-color-hover, var(--gov-color-warning-700))}}.gov-tabs[variant=warning][type=text] .gov-tabs__btn[aria-selected=true]{border-bottom-color:var(--gov-tabs-warning-color-active, var(--gov-color-warning-700));color:var(--gov-tabs-warning-color-active, var(--gov-color-warning-700))}.gov-tabs[variant=error][type=text] .gov-tabs__btn{color:var(--gov-tabs-error-color, var(--gov-color-error-400))}@media not all and (pointer: coarse){.gov-tabs[variant=error][type=text] .gov-tabs__btn:hover{color:var(--gov-tabs-error-color-hover, var(--gov-color-error-600))}}.gov-tabs[variant=error][type=text] .gov-tabs__btn[aria-selected=true]{border-bottom-color:var(--gov-tabs-error-color-active, var(--gov-color-error-600));color:var(--gov-tabs-error-color-active, var(--gov-color-error-600))}.gov-tabs[orientation=vertical] .gov-tabs__btn{text-align:left}@media (min-width: 75em){.gov-tabs[orientation=vertical]{display:flex;flex-direction:row}.gov-tabs[orientation=vertical] .gov-tabs__list{flex-wrap:nowrap;flex-direction:column;width:-moz-max-content;width:max-content;max-width:30vw;margin-right:1.25rem;padding:0rem 0.5rem;border-bottom:none;border-right:var(--gov-tabs-list-border-width, 0.0625rem solid var(--gov-color-secondary-500))}.gov-tabs[orientation=vertical] .gov-tabs__item{justify-content:flex-end}.gov-tabs[orientation=vertical] .gov-tabs__btn{padding:0.5rem 0.75rem;text-align:right}}";const x=t(class t extends o{constructor(){super();this.__registerHost();this.govChange=e(this,"gov-change",7);this.triggerRefs={};this.controller=[];this.focusIndex=0;this.compactControls=false;this.type="text";this.variant="primary";this.orientation="horizontal";this.wcagLabel=undefined;this.wcagSelectLabel=undefined;this.wcagLabelledBy=undefined;this.h=l(this.host);this.formSelectId=f("GovFormSelect")}validateType(t){s(c,t,n.root)}validateVariant(t){s(v,t,n.root)}componentWillLoad(){this.prepareDataSource()}async componentDidRender(){if(h()){await m(500);await this.validateWcag()}this.resizeObserver()}prepareDataSource(){this.controller=[];const t=[];this.host.querySelectorAll(i.root).forEach((o=>{const e=Promise.all([o.getIdentifier(),o.getTriggerIdentifier()]).then((([t,e])=>{const r=typeof o.getAttribute("default")==="string";return{label:o.getAttribute("label"),contentIdentifier:t,triggerIdentifier:e,element:o,active:false,default:r}}));t.push(e)}));Promise.all(t).then((t=>{let o=t.findIndex((t=>t.default));if(o===-1)o=0;this.focusIndex=o;t[o].active=true;this.controller=[...t];this.reRender()}))}setActiveByIdentifier(t){const o=[];this.controller.map((e=>{e.active=t===e.triggerIdentifier||t===e.contentIdentifier;o.push(e)}));this.controller=[...o]}reRender(){this.controller.map((t=>{t.element.setActiveStatus(t.active)}))}resizeObserver(){const t=new ResizeObserver(p((()=>{}),200));t.observe(this.tabsRef)}render(){return r(a,{class:this.h.classes(n.root),variant:this.variant,type:this.type,role:"tablist",ref:t=>this.tabsRef=t,"aria-label":this.wcagLabel,"aria-labelledby":this.wcagLabelledBy,onKeyDown:this.onKeydownHandler.bind(this)},r("div",{class:n.tabs,"aria-hidden":g(this.compactControls)},r("ul",{class:n.list},this.controller.map(((t,o)=>r("li",{class:n.item},this.type=="text"?r("button",{class:n.btn,id:t.triggerIdentifier,role:"tab",onClick:()=>this.onSelectHandler(t,o),"aria-selected":g(t.active),"aria-controls":t.contentIdentifier,tabindex:t.active?0:-1,ref:o=>this.triggerRefs[t.triggerIdentifier]=o},t.label):r("gov-chip",{role:"tab",tag:"button",identifier:t.triggerIdentifier,"wcag-selected":t.active,"wcag-controls":t.contentIdentifier,focusable:t.active,variant:this.variant,inverse:!t.active,ref:o=>this.triggerRefs[t.triggerIdentifier]=o,"on-gov-click":()=>this.onSelectHandler(t,o)},t.label)))))),r("span",{id:this.formSelectId,hidden:true},this.wcagSelectLabel),this.compactControls?r("gov-form-select",{"wcag-labelled-by":this.formSelectId,"onGov-change":this.onChangeHandler.bind(this)},this.controller.map((t=>r("option",{value:t.triggerIdentifier,selected:t.active},t.label)))):null,r("slot",null))}getCurrentTab(){return this.controller.find((t=>t.active))||null}onSelectHandler(t,o){this.focusIndex=o;this.setActiveByIdentifier(t.triggerIdentifier);this.reRender();this.govChange.emit(this.getCurrentTab().element)}onChangeHandler(t){const o=t.target.value;t.stopPropagation();this.setActiveByIdentifier(o);this.reRender();this.govChange.emit(this.getCurrentTab().element)}onKeydownHandler(t){const o=t.keyCode;t.stopPropagation();if([37,38,39,40].includes(o)){if(false===(this.focusIndex>=0&&this.focusIndex<=this.controller.length-1)){return}this.controller[this.focusIndex].active=false;if(o===39||o===40){this.focusIndex++;if(this.focusIndex>=this.controller.length){this.focusIndex=0}}else if(o===37||o===38){this.focusIndex--;if(this.focusIndex<0){this.focusIndex=this.controller.length-1}}if(this.focusIndex>=0&&this.focusIndex<=this.controller.length-1){const t=this.controller[this.focusIndex];t.active=true;const o=this.triggerRefs[t.triggerIdentifier];if(o.nodeName.toLowerCase()==="gov-chip"){this.triggerRefs[t.triggerIdentifier].setFocus()}else{this.triggerRefs[t.triggerIdentifier].focus()}this.controller=[...this.controller];this.reRender();this.govChange.emit(this.getCurrentTab().element)}}}async refresh(){this.prepareDataSource()}async currentTab(){return this.getCurrentTab().element||null}async setActiveTab(t){this.setActiveByIdentifier(t);this.reRender()}async validateWcag(){b(this.wcagSelectLabel,"wcag-select-label",n.root);d(this.wcagLabel,this.wcagLabelledBy,n.root)}get host(){return this}static get watchers(){return{type:["validateType"],variant:["validateVariant"]}}static get style(){return w}},[4,"gov-tabs",{type:[1],variant:[1],orientation:[1],wcagLabel:[1,"wcag-label"],wcagSelectLabel:[1,"wcag-select-label"],wcagLabelledBy:[1,"wcag-labelled-by"],controller:[32],focusIndex:[32],compactControls:[32],refresh:[64],currentTab:[64],setActiveTab:[64],validateWcag:[64]}]);function k(){if(typeof customElements==="undefined"){return}const t=["gov-tabs","gov-chip","gov-form-select","gov-icon"];t.forEach((t=>{switch(t){case"gov-tabs":if(!customElements.get(t)){customElements.define(t,x)}break;case"gov-chip":if(!customElements.get(t)){u()}break;case"gov-form-select":if(!customElements.get(t)){y()}break;case"gov-icon":if(!customElements.get(t)){_()}break}}))}k();const j=x;const T=k;export{j as GovTabs,T as defineCustomElement};
//# sourceMappingURL=gov-tabs.js.map