import{p as t,H as n,h as o,d as e}from"./p-2dee9951.js";import{g as i,s as r}from"./p-28e59384.js";const a={root:"gov-container"};const s=".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-container{display:block;width:100%;max-width:calc(var(--gov-container-width, 73.75rem) + 2 * var(--gov-container-padding, 2.5rem));margin-right:auto;margin-left:auto;padding-right:var(--gov-container-padding-mobile, 1.25rem);padding-left:var(--gov-container-padding-mobile, 1.25rem)}@media (min-width: 48em){.gov-container{padding-right:var(--gov-container-padding, 2.5rem);padding-left:var(--gov-container-padding, 2.5rem)}}";const c=t(class t extends n{constructor(){super();this.__registerHost();this.h=i(this.host)}render(){return o(e,{class:this.h.classes(a.root)},o("slot",null))}async slottedChildren(){return Promise.resolve(r(this.host))}get host(){return this}static get style(){return s}},[4,"gov-container",{slottedChildren:[64]}]);function d(){if(typeof customElements==="undefined"){return}const t=["gov-container"];t.forEach((t=>{switch(t){case"gov-container":if(!customElements.get(t)){customElements.define(t,c)}break}}))}d();const g=c;const m=d;export{g as GovContainer,m as defineCustomElement};
//# sourceMappingURL=gov-container.js.map