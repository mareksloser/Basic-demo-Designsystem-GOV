import{p as t,H as e,h as o,d as i}from"./p-2dee9951.js";import{g as n}from"./p-28e59384.js";import{d as r}from"./p-1f84a302.js";const l={root:"gov-tile",icon:"gov-tile__icon",arrow:"gov-tile__arrow",title:"gov-tile__title",link:"gov-tile__link",content:"gov-tile__content",heading:"gov-tile__heading"};const s='.gov-tile__title::before{content:"";position:absolute;top:0;right:0;bottom:0;left:0;z-index:1}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-tile{position:relative;display:block;width:100%;padding:0.75rem;transition:background-color 150ms}.gov-tile__icon{display:block;margin:0rem 0rem 1.5rem;color:var(--gov-tile-main-color, var(--gov-color-primary))}.gov-tile__icon .gov-icon{width:2.5rem;height:2.5rem}.gov-tile__title{display:flex;gap:0.5rem;justify-content:space-between;align-items:flex-start;color:var(--gov-tile-main-color, var(--gov-color-primary));text-decoration:none;margin-bottom:0.5rem}.gov-tile__title [slot=title]{font-weight:var(--gov-text-xl-font-weight);font-size:var(--gov-text-xl-font-size);line-height:var(--gov-text-xl-line-height);letter-spacing:var(--gov-text-xl-letter-spacing);margin:0}.gov-tile__arrow{flex:0 0 auto;width:1.25rem;height:1.25rem;position:relative;top:0.3125rem;color:inherit}.gov-tile__content{color:var(--gov-tile-text-color, var(--gov-color-secondary-700))}.gov-tile__content>*:last-child{margin-bottom:0}.gov-tile__content a{position:relative;z-index:1}.gov-tile__link{display:block;text-decoration:none}@media not all and (pointer: coarse){.gov-tile[href]:hover{background:var(--gov-tile-hover-bg, var(--gov-color-primary-200))}.gov-tile[href]:hover .gov-tile__title{color:var(--gov-tile-main-color, var(--gov-color-primary))}}@media (min-width: 48em){.gov-tile{padding:1.5rem}.gov-tile__icon{margin:0rem 0rem 1.5rem}.gov-tile__icon .gov-icon{width:3rem;height:3rem}}';const a=t(class t extends e{constructor(){super();this.__registerHost();this.href=undefined;this.target=undefined;this.h=n(this.host)}render(){return o(i,{class:this.h.classes(l.root)},this.href?o("a",{href:this.href,target:this.target,class:l.link,ref:t=>this.triggerRef=t},this.h.hasSlot("icon")&&o("span",{class:l.icon},o("slot",{name:"icon"})),this.h.hasSlot("title")&&o("span",{class:l.title},o("slot",{name:"title"}),o("gov-icon",{class:l.arrow,name:"chevron-right"})),o("div",{class:l.content},o("slot",null))):o("span",null,this.h.hasSlot("icon")&&o("span",{class:l.icon},o("slot",{name:"icon"})),this.h.hasSlot("title")&&o("span",{class:l.title},o("slot",{name:"title"})),o("div",{class:l.content},o("slot",null))))}async getTriggerRef(){return this.triggerRef}get host(){return this}static get style(){return s}},[4,"gov-tile",{href:[513],target:[1],getTriggerRef:[64]}]);function c(){if(typeof customElements==="undefined"){return}const t=["gov-tile","gov-icon"];t.forEach((t=>{switch(t){case"gov-tile":if(!customElements.get(t)){customElements.define(t,a)}break;case"gov-icon":if(!customElements.get(t)){r()}break}}))}c();const g=a;const v=c;export{g as GovTile,v as defineCustomElement};
//# sourceMappingURL=gov-tile.js.map