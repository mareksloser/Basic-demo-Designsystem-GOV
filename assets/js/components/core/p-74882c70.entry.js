import{r as o,c as e,h as l,a as t}from"./p-5bc604a3.js";import{F as r}from"./p-3464136c.js";import"./p-03990da5.js";import"./p-55500e5a.js";const a='.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-label{position:relative;display:flex;width:100%}.gov-form-label__label{display:inline-block;color:var(--gov-form-label-color, #686868);cursor:pointer;box-sizing:border-box}.gov-form-label[legend=""] .gov-form-label__label,.gov-form-label[legend=true i] .gov-form-label__label,.gov-form-label[legend="1"] .gov-form-label__label{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);margin-bottom:1rem;padding:0;color:var(--gov-form-legend-color, #3b3b3b)}';const i=class{constructor(l){o(this,l);this.govClick=e(this,"gov-click",7);this.identifier=undefined;this.size="m";this.required=false;this.legend=false}render(){const o=this.legend?"legend":"label";return l(t,{class:r.root,size:this.size},l(o,{class:r.label,htmlFor:this.identifier,onClick:()=>this.govClick.emit()},l("slot",null),this.required?l("span",{class:"gov-color--error-500"}," *"):null))}};i.style=a;export{i as gov_form_label};
//# sourceMappingURL=p-74882c70.entry.js.map