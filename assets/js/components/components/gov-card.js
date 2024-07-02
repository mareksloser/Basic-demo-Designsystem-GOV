import{p as o,H as e,c as a,h as r,d as i}from"./p-2dee9951.js";import{g as t,b as d}from"./p-28e59384.js";import{c}from"./p-24636c53.js";import{a as s}from"./p-7f2c9830.js";import{v as n}from"./p-4ff831e3.js";import{c as l}from"./p-003e6cca.js";import{d as g}from"./p-03990da5.js";import{d as v}from"./p-1f84a302.js";const h={root:"gov-card",header:"gov-card__header",title:"gov-card__title",inner:"gov-card__inner",img:"gov-card__img",main:"gov-card__main",content:"gov-card__content",icon:"gov-card__icon",btns:"gov-card__btns",footer:"gov-card__footer",arrow:"gov-card__arrow"};const p='.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-card{position:relative;display:flex;width:100%;flex-direction:column;border:var(--gov-card-border-width, 0.0625rem solid var(--gov-color-secondary-500));border-radius:var(--gov-border-radius, 0.1875rem);background:var(--gov-card-bg, var(--gov-color-neutral-white));overflow:hidden}.gov-card__header{gap:1.75rem;width:100%;padding:1.5rem;border-bottom:var(--gov-card-border-width, 0.0625rem solid var(--gov-color-secondary-500));border-radius:0;text-align:left;text-transform:none;transition:background-color 150ms ease-in-out}.gov-card__arrow{flex:0 0 auto;width:1rem;height:1rem;color:var(--gov-card-arrow-color, var(--gov-color-primary))}.gov-card__title{margin:0;padding:0;font-family:var(--gov-font-family, "Roboto", sans-serif);font-weight:400;box-sizing:border-box;font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);color:var(--gov-card-title-color, var(--gov-color-secondary-800));font-weight:700}.gov-card__img{width:100%;margin:0;line-height:1}.gov-card__img img{width:100%;height:auto}.gov-card__inner{display:flex;flex:1 1 auto;flex-direction:column}.gov-card__inner[aria-hidden=""],.gov-card__inner[aria-hidden=true i],.gov-card__inner[aria-hidden="1"]{display:none}.gov-card__main{display:flex;gap:16px 24px;flex:1 1 auto;flex-direction:column;padding:1.5rem}.gov-card__icon{flex:0 0 auto;width:2.5rem;height:2.5rem;color:var(--gov-card-icon-color, var(--gov-color-primary))}.gov-card__btns{display:flex;gap:1rem;flex:0 0 auto;flex-wrap:wrap}.gov-card__content>*:last-child{margin-bottom:0}.gov-card__footer{padding:1rem 1.5rem;background:var(--gov-card-footer-bg, var(--gov-color-primary-100))}.gov-card__footer>*:last-child{margin-bottom:0}.gov-card__footer p{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing)}.gov-card[is-expanded=""],.gov-card[is-expanded=true i],.gov-card[is-expanded="1"]{height:100%}.gov-card[collapsible=""] .gov-card__header,.gov-card[collapsible=true i] .gov-card__header,.gov-card[collapsible="1"] .gov-card__header{display:inline-flex;vertical-align:middle;justify-content:center;align-items:center;border:0;background-color:transparent;text-align:center;text-decoration:none;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;justify-content:space-between;text-align:left}.gov-card[collapsible=""] .gov-card__header:focus,.gov-card[collapsible=true i] .gov-card__header:focus,.gov-card[collapsible="1"] .gov-card__header:focus{outline:none}.gov-card[collapsible=""] .gov-card__header:focus,.gov-card[collapsible=true i] .gov-card__header:focus,.gov-card[collapsible="1"] .gov-card__header:focus{outline:none}.gov-card[collapsible=""] .gov-card__header:focus-visible,.gov-card[collapsible=true i] .gov-card__header:focus-visible,.gov-card[collapsible="1"] .gov-card__header:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:-0.125rem}@media not all and (pointer: coarse){.gov-card[collapsible=""] .gov-card__header:hover,.gov-card[collapsible=true i] .gov-card__header:hover,.gov-card[collapsible="1"] .gov-card__header:hover{background:var(--gov-card-header-hover-bg, var(--gov-color-primary-100))}}.gov-card[collapsible=""][is-expanded=""] .gov-card__header,.gov-card[collapsible=""][is-expanded=true i] .gov-card__header,.gov-card[collapsible=""][is-expanded="1"] .gov-card__header,.gov-card[collapsible=true i][is-expanded=""] .gov-card__header,.gov-card[collapsible=true i][is-expanded=true i] .gov-card__header,.gov-card[collapsible=true i][is-expanded="1"] .gov-card__header,.gov-card[collapsible="1"][is-expanded=""] .gov-card__header,.gov-card[collapsible="1"][is-expanded=true i] .gov-card__header,.gov-card[collapsible="1"][is-expanded="1"] .gov-card__header{border-bottom:var(--gov-card-border-width, 0.0625rem solid var(--gov-color-secondary-500))}.gov-card[collapsible=""][is-expanded=""] .gov-card__arrow,.gov-card[collapsible=""][is-expanded=true i] .gov-card__arrow,.gov-card[collapsible=""][is-expanded="1"] .gov-card__arrow,.gov-card[collapsible=true i][is-expanded=""] .gov-card__arrow,.gov-card[collapsible=true i][is-expanded=true i] .gov-card__arrow,.gov-card[collapsible=true i][is-expanded="1"] .gov-card__arrow,.gov-card[collapsible="1"][is-expanded=""] .gov-card__arrow,.gov-card[collapsible="1"][is-expanded=true i] .gov-card__arrow,.gov-card[collapsible="1"][is-expanded="1"] .gov-card__arrow{transform:scale(-1)}@media (min-width: 30em){.gov-card[promotion=""] .gov-card__main,.gov-card[promotion=true i] .gov-card__main,.gov-card[promotion="1"] .gov-card__main{flex-direction:row;padding:2rem}.gov-card[promotion=""] .gov-card__icon,.gov-card[promotion=true i] .gov-card__icon,.gov-card[promotion="1"] .gov-card__icon{width:3rem;height:3rem}.gov-card[promotion=""] .gov-card__btns,.gov-card[promotion=true i] .gov-card__btns,.gov-card[promotion="1"] .gov-card__btns{flex-direction:column}}';const _=o(class o extends e{constructor(){super();this.__registerHost();this.govToggle=a(this,"gov-toggle",7);this.promotion=false;this.label=undefined;this.collapsible=false;this.expanded=false;this.headlineTag="h3";this.wcagTriggerLabel=undefined;this.wcagTriggerLabelledBy=undefined;this.isExpanded=undefined;this.h=t(this.host);this.headlineId=c("GovCardHeadline");this.contentId=c("GovCardContent")}validateHeadlineTag(o){const e=["h1","h2","h3","h4","h5","h6","span"];if(o){if(!e.includes(o)){s(`[${h.root}]: Tag ${o} is not allowed.`)}}}componentWillLoad(){this.isExpanded=this.label?this.expanded:true;this.validateHeadlineTag(this.headlineTag)}async componentDidRender(){if(l()){await g(500);await this.validateWcag()}}emmitChange(){this.govToggle.emit({open:this.isExpanded,element:this.host})}render(){const o=this.headlineTag;return r(i,{class:this.h.classes(h.root),"is-expanded":this.isExpanded,collapsible:d(this.collapsible),promotion:this.promotion},this.label&&this.collapsible?r("button",{id:this.headlineId,class:h.header,"aria-label":this.wcagTriggerLabel,"aria-labelledby":this.wcagTriggerLabelledBy,"aria-expanded":d(this.isExpanded),"aria-controls":this.contentId,onClick:this.onClickHandler.bind(this)},r(o,{class:h.title},this.label),r("gov-icon",{class:h.arrow,name:"chevron-down"})):null,this.label&&!this.collapsible?r("div",{class:h.header},r(o,{class:h.title},this.label)):null,r("div",{class:h.inner,id:this.contentId,"aria-hidden":this.collapsible?d(!this.isExpanded):undefined,hidden:this.collapsible?!this.isExpanded:undefined,"aria-labelledby":this.collapsible?this.headlineId:undefined},this.h.hasSlot("img")&&r("p",{class:h.img},r("slot",{name:"img"})),r("div",{class:h.main},this.h.hasSlot("icon")&&this.promotion&&r("div",{class:h.icon},r("slot",{name:"icon"})),r("div",{class:h.content},r("slot",null)),this.h.hasSlot("btn")&&this.promotion&&r("div",{class:h.btns},r("slot",{name:"btn"}))),this.h.hasSlot("footer")&&r("div",{class:h.footer},r("slot",{name:"footer"}))))}onClickHandler(o){o.stopPropagation();if(this.collapsible){this.isExpanded=!this.isExpanded;this.emmitChange()}}async open(){if(this.collapsible){this.isExpanded=true;this.emmitChange()}}async close(){if(this.collapsible){this.isExpanded=false;this.emmitChange()}}async validateWcag(){if(this.collapsible){n(this.wcagTriggerLabel,this.wcagTriggerLabelledBy,h.root)}}get host(){return this}static get watchers(){return{headlineTag:["validateHeadlineTag"]}}static get style(){return p}},[4,"gov-card",{promotion:[4],label:[1],collapsible:[4],expanded:[4],headlineTag:[1,"headline-tag"],wcagTriggerLabel:[1,"wcag-trigger-label"],wcagTriggerLabelledBy:[1,"wcag-trigger-labelled-by"],isExpanded:[32],open:[64],close:[64],validateWcag:[64]}]);function m(){if(typeof customElements==="undefined"){return}const o=["gov-card","gov-icon"];o.forEach((o=>{switch(o){case"gov-card":if(!customElements.get(o)){customElements.define(o,_)}break;case"gov-icon":if(!customElements.get(o)){v()}break}}))}m();const f=_;const b=m;export{f as GovCard,b as defineCustomElement};
//# sourceMappingURL=gov-card.js.map