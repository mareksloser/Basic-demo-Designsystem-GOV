import{p as o,H as a,c as e,h as t,d as r}from"./p-2dee9951.js";import{v as s}from"./p-4ff831e3.js";import{c as i}from"./p-003e6cca.js";import{d as c}from"./p-03990da5.js";import{g as n}from"./p-28e59384.js";const p={root:"gov-backdrop",bg:"gov-backdrop__bg"};const d='.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-backdrop__bg{z-index:100;position:fixed;top:0;right:0;bottom:0;left:0;background-color:var(--gov-backdrop-bg, var(--gov-color-secondary));opacity:var(--gov-backdrop-opacity, 0.45)}.gov-backdrop[inverse=""] .gov-backdrop__bg,.gov-backdrop[inverse=true i] .gov-backdrop__bg,.gov-backdrop[inverse="1"] .gov-backdrop__bg{background-color:var(--gov-backdrop-bg-inverse, var(--gov-color-neutral-white));opacity:var(--gov-backdrop-opacity, 0.8)}';const g=o(class o extends a{constructor(){super();this.__registerHost();this.govClick=e(this,"gov-click",7);this.inverse=false;this.wcagLabel=undefined;this.wcagLabelledBy=undefined;this.h=n(this.host)}async componentDidRender(){if(i()){await c(500);await this.validateWcag()}}render(){return t(r,{class:this.h.classes(p.root)},t("div",{role:"button","aria-label":this.wcagLabel,"aria-labelledby":this.wcagLabelledBy,onClick:o=>this.govClick.emit(o),class:p.bg}))}async validateWcag(){s(this.wcagLabel,this.wcagLabelledBy,p.root)}get host(){return this}static get style(){return d}},[0,"gov-backdrop",{inverse:[4],wcagLabel:[1,"wcag-label"],wcagLabelledBy:[1,"wcag-labelled-by"],validateWcag:[64]}]);function b(){if(typeof customElements==="undefined"){return}const o=["gov-backdrop"];o.forEach((o=>{switch(o){case"gov-backdrop":if(!customElements.get(o)){customElements.define(o,g)}break}}))}b();export{g as G,b as d};
//# sourceMappingURL=p-570803ab.js.map