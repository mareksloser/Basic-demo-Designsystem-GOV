import{p as e,H as o,c as t,h as l,d as s}from"./p-2dee9951.js";import{F as i}from"./p-3464136c.js";const r='.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-label{position:relative;display:flex;width:100%}.gov-form-label__label{display:inline-block;color:var(--gov-form-label-color, #686868);cursor:pointer;box-sizing:border-box}.gov-form-label[legend=""] .gov-form-label__label,.gov-form-label[legend=true i] .gov-form-label__label,.gov-form-label[legend="1"] .gov-form-label__label{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);margin-bottom:1rem;padding:0;color:var(--gov-form-legend-color, #3b3b3b)}';const n=e(class e extends o{constructor(){super();this.__registerHost();this.govClick=t(this,"gov-click",7);this.identifier=undefined;this.size="m";this.required=false;this.legend=false}render(){const e=this.legend?"legend":"label";return l(s,{class:i.root,size:this.size},l(e,{class:i.label,htmlFor:this.identifier,onClick:()=>this.govClick.emit()},l("slot",null),this.required?l("span",{class:"gov-color--error-500"}," *"):null))}static get style(){return r}},[4,"gov-form-label",{identifier:[1],size:[1],required:[4],legend:[4]}]);function a(){if(typeof customElements==="undefined"){return}const e=["gov-form-label"];e.forEach((e=>{switch(e){case"gov-form-label":if(!customElements.get(e)){customElements.define(e,n)}break}}))}a();const c=n;const g=a;export{c as GovFormLabel,g as defineCustomElement};
//# sourceMappingURL=gov-form-label.js.map