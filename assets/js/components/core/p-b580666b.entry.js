import{r as o,h as r,a,g as t}from"./p-5bc604a3.js";import{p as i}from"./p-03990da5.js";import{S as s}from"./p-55500e5a.js";import{g as e}from"./p-28e59384.js";import{v as p}from"./p-dcb5fb35.js";import"./p-7f2c9830.js";import"./p-003e6cca.js";const n=i(s,["_2XS","_XS","_S","_M","_L"]);var g;(function(o){o["HORIZONTAL"]="horizontal";o["VERTICAL"]="vertical"})(g||(g={}));const m={root:"gov-form-group"};const l='.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-group{position:relative;display:flex;width:100%;flex-direction:column;align-items:flex-start}.gov-form-group .gov-form-label__label{margin:0}.gov-form-group[orientation=horizontal]{flex-direction:row;flex-wrap:wrap}.gov-form-group[orientation=horizontal] .gov-form-label__label{white-space:nowrap}.gov-form-group[gap="2xs"]{gap:0.25rem}.gov-form-group[gap=xs]{gap:0.5rem}.gov-form-group[gap=s]{gap:0.75rem}.gov-form-group[gap=m]{gap:1rem}.gov-form-group[gap=l]{gap:1.25rem}';const f=class{constructor(r){o(this,r);this.gap=undefined;this.orientation="vertical";this.h=e(this.host)}validateGap(o){if(o){p(n,o,m.root)}}validateOrientation(o){if(o){p(g,o,m.root)}}componentWillLoad(){this.validateGap(this.gap);this.validateOrientation(this.orientation)}render(){return r(a,{gap:this.gap,class:this.h.classes(m.root)},r("slot",null))}get host(){return t(this)}static get watchers(){return{gap:["validateGap"],orientation:["validateOrientation"]}}};f.style=l;export{f as gov_form_group};
//# sourceMappingURL=p-b580666b.entry.js.map