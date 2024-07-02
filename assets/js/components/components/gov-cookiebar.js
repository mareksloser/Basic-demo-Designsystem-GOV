import{p as o,H as a,h as r,d as i}from"./p-2dee9951.js";import{g as e}from"./p-28e59384.js";const t={root:"gov-cookiebar",holder:"gov-cookiebar__holder",content:"gov-cookiebar__content",actions:"gov-cookiebar__actions",actionsPrimary:"gov-cookiebar__actions-primary",actionsSecondary:"gov-cookiebar__actions-secondary"};const n=".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-cookiebar{z-index:51;position:fixed;right:0;bottom:0;left:0;background-color:var(--gov-cookiebar-bg, var(--gov-color-neutral-white));box-shadow:var(--gov-cookiebar-box-shadow, 0 0.0625rem 2.5rem rgba(var(--gov-color-secondary-800-rgb), 0.45))}.gov-cookiebar__holder{display:block;width:100%;max-width:calc(var(--gov-container-width, 73.75rem) + 2 * var(--gov-container-padding, 2.5rem));margin-right:auto;margin-left:auto;padding-right:var(--gov-container-padding-mobile, 1.25rem);padding-left:var(--gov-container-padding-mobile, 1.25rem);padding-top:1.25rem;padding-bottom:1.25rem}@media (min-width: 48em){.gov-cookiebar__holder{padding-right:var(--gov-container-padding, 2.5rem);padding-left:var(--gov-container-padding, 2.5rem)}}.gov-cookiebar__holder>*{margin-bottom:0}.gov-cookiebar__holder>*+*{margin-top:2rem}.gov-cookiebar__content>*{margin-bottom:0}.gov-cookiebar__content>*+*{margin-top:0.75rem}.gov-cookiebar__content p{color:var(--gov-cookiebar-color, var(--gov-color-secondary-700));letter-spacing:0.0125em}.gov-cookiebar__actions,.gov-cookiebar__actions-primary,.gov-cookiebar__actions-secondary{display:flex;gap:0.625rem;flex-wrap:wrap;justify-content:space-between}@media (min-width: 48em){.gov-cookiebar__holder{padding-top:2rem;padding-bottom:2rem}.gov-cookiebar__actions,.gov-cookiebar__actions-primary,.gov-cookiebar__actions-secondary{gap:1rem}}";const c=o(class o extends a{constructor(){super();this.__registerHost();this.h=e(this.host)}render(){return r(i,{class:this.h.classes(t.root)},r("div",{class:t.holder},r("div",{class:t.content},r("slot",null)),(this.h.hasSlot("actions-primary")||this.h.hasSlot("actions-secondary"))&&r("div",{class:t.actions},this.h.hasSlot("actions-primary")&&r("div",{class:t.actionsPrimary},r("slot",{name:"actions-primary"})),this.h.hasSlot("actions-secondary")&&r("div",{class:t.actionsSecondary},r("slot",{name:"actions-secondary"})))))}get host(){return this}static get style(){return n}},[4,"gov-cookiebar"]);function s(){if(typeof customElements==="undefined"){return}const o=["gov-cookiebar"];o.forEach((o=>{switch(o){case"gov-cookiebar":if(!customElements.get(o)){customElements.define(o,c)}break}}))}s();const g=c;const d=s;export{g as GovCookiebar,d as defineCustomElement};
//# sourceMappingURL=gov-cookiebar.js.map