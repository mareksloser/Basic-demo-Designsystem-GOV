import{r as o,c as r,h as e,a,g as t}from"./p-5bc604a3.js";import{v as i}from"./p-7724b535.js";import{c as s}from"./p-003e6cca.js";import{d as n}from"./p-03990da5.js";import{g as c}from"./p-28e59384.js";import"./p-7f2c9830.js";import"./p-24636c53.js";const m={root:"gov-breadcrumbs"};const d=".gov-breadcrumbs ul{margin:0;padding:0}.gov-breadcrumbs li{margin:0;padding:0;background:none}.gov-breadcrumbs li::before{display:none}.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-breadcrumbs ul{position:relative;display:flex;width:100%;padding-bottom:0.3125rem;overflow-x:auto}.gov-breadcrumbs li{display:flex;justify-content:flex-start;align-items:center;white-space:nowrap}.gov-breadcrumbs button{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);padding:0;border:none;background:none;color:var(--gov-breadcrumbs-link-color, var(--gov-color-primary));text-decoration:underline}.gov-breadcrumbs button:hover{text-decoration:none}.gov-breadcrumbs .gov-icon{width:0.625rem;height:0.625rem;margin:0rem 1rem;color:var(--gov-breadcrumbs-arrow-color, var(--gov-color-secondary-600))}";const g=class{constructor(e){o(this,e);this.govChange=r(this,"gov-change",7);this.collapsible=false;this.isExpanded=false;this.wcagLabel=undefined;this.wcagLabelledBy=undefined;this.h=c(this.host)}async componentDidRender(){if(s()){await n(500);await this.validateWcag()}}render(){return e(a,{class:this.h.classes(m.root)},e("nav",{"aria-label":this.wcagLabel,"aria-labelledby":this.wcagLabelledBy},e("slot",null)))}async validateWcag(){i(this.wcagLabel,this.wcagLabelledBy,m.root)}get host(){return t(this)}};g.style=d;export{g as gov_breadcrumbs};
//# sourceMappingURL=p-a6b6dc73.entry.js.map