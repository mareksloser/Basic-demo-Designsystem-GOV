import{p as t,H as s,h as e,d as i}from"./p-2dee9951.js";import{i as n,e as o}from"./p-003e6cca.js";import{g as a}from"./p-28e59384.js";var r;(function(t){t["BASIC"]="basic";t["COMPLEX"]="complex";t["COLORED"]="colored"})(r||(r={}));const c={root:"gov-icon",holder:"gov-icon__holder"};const l=t=>{const s=new URL(t,d.t);return s.origin!==h.location.origin?s.href:s.pathname};const h=typeof window!=="undefined"?window:{};const d={i:0,t:"",jmp:t=>t(),raf:t=>requestAnimationFrame(t),ael:(t,s,e,i)=>t.addEventListener(s,e,i),rel:(t,s,e,i)=>t.removeEventListener(s,e,i),ce:(t,s)=>new CustomEvent(t,s)};const f="4.0.4";const p=()=>f;const u={};const m={};const g=t=>t.startsWith("http://")||t.startsWith("https://");const w=(t,s,e)=>{if(g(t)){return`${t}/${e}/${s}.svg?v=${p()}`}return l(`${t}/${e}/${s}.svg`)+`?v=${p()}`};async function y({name:t,type:s}){const e=s+"-"+t;if(u[e]){return u[e]}if(!m[e]){m[e]=fetch(w(n(),t,s)).then((t=>{if(t.status===200){return t.text()}else{throw new Error("Gov Icon doesn't exists")}}))}const i=await m[e];u[e]=i;return i}const v=".gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-icon{display:inline-flex}.gov-icon__holder{display:inline-flex;width:100%;height:100%}.gov-icon__holder+.gov-icon__holder{display:none !important}.gov-icon svg{display:inline-flex;width:100%;height:100%;max-width:100%;max-height:100%}";const b=t(class t extends s{constructor(){super();this.__registerHost();this.name=null;this.type="basic";this.iconData=undefined;this.visible=false;this.error=false;this.h=a(this.host)}async loadIconPathData(){const{name:t,visible:s,type:e}=this;if(!t||!s){return}try{this.iconData=await y({name:t,type:e})}catch(t){this.error=true}}connectedCallback(){if(o()){this.visible=true;this.loadIconPathData().finally()}else{this.waitUntilVisible((async()=>{this.visible=true;await this.loadIconPathData()}))}}disconnectedCallback(){if(this.intersectionObserver){this.intersectionObserver.disconnect();this.intersectionObserver=null}}async componentWillLoad(){await this.loadIconPathData()}waitUntilVisible(t){if(typeof window==="undefined"||!window.IntersectionObserver){t();return}this.intersectionObserver=new IntersectionObserver((s=>{s.forEach((s=>{if(s.isIntersecting){if(this.intersectionObserver){this.intersectionObserver.disconnect();this.intersectionObserver=null}t()}}))}),{rootMargin:"50px"});this.intersectionObserver.observe(this.host)}render(){if(this.error){return null}return e(i,{class:this.h.classes(c.root)},e("span",{class:c.holder,innerHTML:this.iconData}))}static get assetsDirs(){return["assets"]}get host(){return this}static get watchers(){return{name:["loadIconPathData"]}}static get style(){return v}},[0,"gov-icon",{name:[1],type:[1],iconData:[32],visible:[32],error:[32]}]);function x(){if(typeof customElements==="undefined"){return}const t=["gov-icon"];t.forEach((t=>{switch(t){case"gov-icon":if(!customElements.get(t)){customElements.define(t,b)}break}}))}x();export{b as G,x as d};
//# sourceMappingURL=p-1f84a302.js.map