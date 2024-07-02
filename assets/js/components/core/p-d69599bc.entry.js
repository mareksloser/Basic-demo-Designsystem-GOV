import{r as e,c as o,h as i,a as t,g as r}from"./p-5bc604a3.js";import{g as s,n as l,o as c,p as n}from"./p-0e5fa8bf.js";import{g as a,a as g,t as v}from"./p-28e59384.js";import{c as m}from"./p-003e6cca.js";import{v as f}from"./p-dcb5fb35.js";import{a as d,b as h}from"./p-7724b535.js";import{c as p}from"./p-24636c53.js";import{d as u}from"./p-03990da5.js";import"./p-55500e5a.js";import"./p-ff7365ae.js";import"./p-6278531b.js";import"./p-9dab01be.js";import"./p-3464136c.js";import"./p-7f2c9830.js";const z='.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-select{position:relative;display:flex;width:100%;align-items:center}.gov-form-select .element{position:relative;display:flex;flex:1 1 auto}.gov-form-select input,.gov-form-select select,.gov-form-select textarea{width:100%;border-radius:var(--gov-border-radius, 0.1875rem);background-color:var(--gov-form-bg-color, var(--gov-color-neutral-white));font-family:var(--gov-font-family, "Roboto", sans-serif)}.gov-form-select input:focus,.gov-form-select select:focus,.gov-form-select textarea:focus{outline:none}.gov-form-select input:focus-visible,.gov-form-select select:focus-visible,.gov-form-select textarea:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-form-select input::-moz-placeholder,.gov-form-select select::-moz-placeholder,.gov-form-select textarea::-moz-placeholder{color:var(--gov-form-placeholder-color, var(--gov-color-secondary-600))}.gov-form-select input::placeholder,.gov-form-select select::placeholder,.gov-form-select textarea::placeholder{color:var(--gov-form-placeholder-color, var(--gov-color-secondary-600))}.gov-form-select textarea{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);padding:0.5rem 0.75rem;resize:none}.gov-form-select *[slot=left-icon],.gov-form-select *[slot=right-icon]{position:absolute;top:50%;display:flex;justify-content:center;transform:translateY(-50%);pointer-events:none}.gov-form-select *[slot=left-icon]{left:0}.gov-form-select *[slot=right-icon]{right:0}.gov-form-select *[slot=prefix],.gov-form-select *[slot=sufix]{margin:0}[size=s].gov-form-select{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);gap:0.5rem var(--gov-form-input-core-s-icon-size, 1rem)}[size=s].gov-form-select input,[size=s].gov-form-select select{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);height:var(--gov-form-input-core-s-height, 2rem);padding:var(--gov-form-input-core-s-padding, 0.25rem 0.75rem)}[size=s].gov-form-select *[slot=left-icon],[size=s].gov-form-select *[slot=right-icon]{width:var(--gov-form-input-core-s-icon-size, 1rem);height:var(--gov-form-input-core-s-icon-size, 1rem)}[size=s].gov-form-select *[slot=left-icon]{left:calc((var(--gov-form-input-core-s-icon-padding, 2rem) - var(--gov-form-input-core-s-icon-size, 1rem)) / 2)}[size=s].gov-form-select *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-s-icon-padding, 2rem)}[size=s].gov-form-select *[slot=right-icon]{right:calc((var(--gov-form-input-core-s-icon-padding, 2rem) - var(--gov-form-input-core-s-icon-size, 1rem)) / 2)}[size=s].gov-form-select *[slot=right-icon]~input,[size=s].gov-form-select *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-s-icon-padding, 2rem)}[size=m].gov-form-select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);gap:0.5rem var(--gov-form-input-core-m-icon-size, 1rem)}[size=m].gov-form-select input,[size=m].gov-form-select select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);height:var(--gov-form-input-core-m-height, 2.5rem);padding:var(--gov-form-input-core-m-padding, 0.4375rem 0.75rem)}[size=m].gov-form-select *[slot=left-icon],[size=m].gov-form-select *[slot=right-icon]{width:var(--gov-form-input-core-m-icon-size, 1rem);height:var(--gov-form-input-core-m-icon-size, 1rem)}[size=m].gov-form-select *[slot=left-icon]{left:calc((var(--gov-form-input-core-m-icon-padding, 2.5rem) - var(--gov-form-input-core-m-icon-size, 1rem)) / 2)}[size=m].gov-form-select *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-m-icon-padding, 2.5rem)}[size=m].gov-form-select *[slot=right-icon]{right:calc((var(--gov-form-input-core-m-icon-padding, 2.5rem) - var(--gov-form-input-core-m-icon-size, 1rem)) / 2)}[size=m].gov-form-select *[slot=right-icon]~input,[size=m].gov-form-select *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-m-icon-padding, 2.5rem)}[size=l].gov-form-select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);gap:0.5rem var(--gov-form-input-core-l-icon-size, 1rem)}[size=l].gov-form-select input,[size=l].gov-form-select select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);height:var(--gov-form-input-core-l-height, 3rem);padding:var(--gov-form-input-core-l-padding, 0.6875rem 0.75rem)}[size=l].gov-form-select *[slot=left-icon],[size=l].gov-form-select *[slot=right-icon]{width:var(--gov-form-input-core-l-icon-size, 1rem);height:var(--gov-form-input-core-l-icon-size, 1rem)}[size=l].gov-form-select *[slot=left-icon]{left:calc((var(--gov-form-input-core-l-icon-padding, 2.5rem) - var(--gov-form-input-core-l-icon-size, 1rem)) / 2)}[size=l].gov-form-select *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-l-icon-padding, 2.5rem)}[size=l].gov-form-select *[slot=right-icon]{right:calc((var(--gov-form-input-core-l-icon-padding, 2.5rem) - var(--gov-form-input-core-l-icon-size, 1rem)) / 2)}[size=l].gov-form-select *[slot=right-icon]~input,[size=l].gov-form-select *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-l-icon-padding, 2.5rem)}[size=xl].gov-form-select{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);gap:0.5rem var(--gov-form-input-core-xl-icon-size, 1.25rem)}[size=xl].gov-form-select input,[size=xl].gov-form-select select{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);height:var(--gov-form-input-core-xl-height, 3.5rem);padding:var(--gov-form-input-core-xl-padding, 0.9375rem 1rem 0.875rem)}[size=xl].gov-form-select *[slot=left-icon],[size=xl].gov-form-select *[slot=right-icon]{width:var(--gov-form-input-core-xl-icon-size, 1.25rem);height:var(--gov-form-input-core-xl-icon-size, 1.25rem)}[size=xl].gov-form-select *[slot=left-icon]{left:calc((var(--gov-form-input-core-xl-icon-padding, 3rem) - var(--gov-form-input-core-xl-icon-size, 1.25rem)) / 2)}[size=xl].gov-form-select *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-xl-icon-padding, 3rem)}[size=xl].gov-form-select *[slot=right-icon]{right:calc((var(--gov-form-input-core-xl-icon-padding, 3rem) - var(--gov-form-input-core-xl-icon-size, 1.25rem)) / 2)}[size=xl].gov-form-select *[slot=right-icon]~input,[size=xl].gov-form-select *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-xl-icon-padding, 3rem)}[variant=primary].gov-form-select input,[variant=primary].gov-form-select select,[variant=primary].gov-form-select textarea{color:var(--gov-form-input-color-primary, var(--gov-color-secondary-700));border:var(--gov-form-input-border-primary, 0.0625rem solid var(--gov-color-primary-600))}[variant=primary].gov-form-select *[slot=left-icon],[variant=primary].gov-form-select *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-input-icon-color-primary, var(--gov-color-primary))}[variant=secondary].gov-form-select input,[variant=secondary].gov-form-select select,[variant=secondary].gov-form-select textarea{color:var(--gov-form-input-color-secondary, var(--gov-color-secondary-700));border:var(--gov-form-input-border-secondary, 0.0625rem solid var(--gov-color-secondary-700))}[variant=secondary].gov-form-select *[slot=left-icon],[variant=secondary].gov-form-select *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-input-icon-color-secondary, var(--gov-color-primary))}[disabled=""].gov-form-select,[disabled=true i].gov-form-select,[disabled="1"].gov-form-select{pointer-events:none}[disabled=""].gov-form-select input,[disabled=""].gov-form-select select,[disabled=""].gov-form-select textarea,[disabled=true i].gov-form-select input,[disabled=true i].gov-form-select select,[disabled=true i].gov-form-select textarea,[disabled="1"].gov-form-select input,[disabled="1"].gov-form-select select,[disabled="1"].gov-form-select textarea{border-color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600));background:var(--gov-form-input-disabled-bg, var(--gov-color-secondary-300));color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600))}[disabled=""].gov-form-select *[slot=left-icon],[disabled=""].gov-form-select *[slot=right-icon],[disabled=true i].gov-form-select *[slot=left-icon],[disabled=true i].gov-form-select *[slot=right-icon],[disabled="1"].gov-form-select *[slot=left-icon],[disabled="1"].gov-form-select *[slot=right-icon]{color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600)) !important}[invalid=""].gov-form-select input,[invalid=""].gov-form-select select,[invalid=""].gov-form-select textarea,[invalid=true i].gov-form-select input,[invalid=true i].gov-form-select select,[invalid=true i].gov-form-select textarea,[invalid="1"].gov-form-select input,[invalid="1"].gov-form-select select,[invalid="1"].gov-form-select textarea{border-color:var(--gov-form-state-color-error, var(--gov-color-error));color:var(--gov-form-state-color-error, var(--gov-color-error))}[invalid=""].gov-form-select input::-moz-placeholder,[invalid=""].gov-form-select select::-moz-placeholder,[invalid=""].gov-form-select textarea::-moz-placeholder,[invalid=true i].gov-form-select input::-moz-placeholder,[invalid=true i].gov-form-select select::-moz-placeholder,[invalid=true i].gov-form-select textarea::-moz-placeholder,[invalid="1"].gov-form-select input::-moz-placeholder,[invalid="1"].gov-form-select select::-moz-placeholder,[invalid="1"].gov-form-select textarea::-moz-placeholder{color:var(--gov-form-state-color-error, var(--gov-color-error-300))}[invalid=""].gov-form-select input::placeholder,[invalid=""].gov-form-select select::placeholder,[invalid=""].gov-form-select textarea::placeholder,[invalid=true i].gov-form-select input::placeholder,[invalid=true i].gov-form-select select::placeholder,[invalid=true i].gov-form-select textarea::placeholder,[invalid="1"].gov-form-select input::placeholder,[invalid="1"].gov-form-select select::placeholder,[invalid="1"].gov-form-select textarea::placeholder{color:var(--gov-form-state-color-error, var(--gov-color-error-300))}[invalid=""].gov-form-select *[slot=left-icon],[invalid=""].gov-form-select *[slot=right-icon],[invalid=true i].gov-form-select *[slot=left-icon],[invalid=true i].gov-form-select *[slot=right-icon],[invalid="1"].gov-form-select *[slot=left-icon],[invalid="1"].gov-form-select *[slot=right-icon]{color:var(--gov-form-state-color-error, var(--gov-color-error)) !important}[invalid=""].gov-form-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[invalid=true i].gov-form-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[invalid="1"].gov-form-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow){display:none}[success=""].gov-form-select *[slot=right-icon]:not(.icon-arrow),[success=true i].gov-form-select *[slot=right-icon]:not(.icon-arrow),[success="1"].gov-form-select *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-state-color-success, var(--gov-color-success))}[success=""].gov-form-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[success=true i].gov-form-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[success="1"].gov-form-select *[slot=right-icon]:not(.icon-validation):not(.icon-arrow){display:none}[multiline=""].gov-form-select *[slot=left-icon],[multiline=""].gov-form-select *[slot=right-icon],[multiline=true i].gov-form-select *[slot=left-icon],[multiline=true i].gov-form-select *[slot=right-icon],[multiline="1"].gov-form-select *[slot=left-icon],[multiline="1"].gov-form-select *[slot=right-icon]{display:none}.gov-form-select{background:none}.gov-form-select select{-webkit-appearance:none;-moz-appearance:none}.gov-form-select select::-ms-expand{display:none}[size=s].gov-form-select *[slot=right-icon]{right:var(--gov-form-select-s-arrow-right-position, 0.75rem);width:var(--gov-form-select-s-arrow-size, 0.75rem);height:var(--gov-form-select-s-arrow-size, 0.75rem)}[size=s][invalid=""].gov-form-select .icon-arrow,[size=s][invalid=true i].gov-form-select .icon-arrow,[size=s][invalid="1"].gov-form-select .icon-arrow{right:calc(3 * var(--gov-form-select-s-arrow-right-position, 0.75rem))}[size=s][success=""].gov-form-select .icon-arrow,[size=s][success=true i].gov-form-select .icon-arrow,[size=s][success="1"].gov-form-select .icon-arrow{right:calc(3 * var(--gov-form-select-s-arrow-right-position, 0.75rem))}[size=m].gov-form-select *[slot=right-icon]{right:var(--gov-form-select-m-arrow-right-position, 1rem);width:var(--gov-form-select-m-arrow-size, 0.75rem);height:var(--gov-form-select-m-arrow-size, 0.75rem)}[size=m][invalid=""].gov-form-select .icon-arrow,[size=m][invalid=true i].gov-form-select .icon-arrow,[size=m][invalid="1"].gov-form-select .icon-arrow{right:calc(3 * var(--gov-form-select-m-arrow-right-position, 1rem))}[size=m][success=""].gov-form-select .icon-arrow,[size=m][success=true i].gov-form-select .icon-arrow,[size=m][success="1"].gov-form-select .icon-arrow{right:calc(3 * var(--gov-form-select-m-arrow-right-position, 1rem))}[size=l].gov-form-select *[slot=right-icon]{right:var(--gov-form-select-l-arrow-right-position, 1rem);width:var(--gov-form-select-l-arrow-size, 1rem);height:var(--gov-form-select-l-arrow-size, 1rem)}[size=l][invalid=""].gov-form-select .icon-arrow,[size=l][invalid=true i].gov-form-select .icon-arrow,[size=l][invalid="1"].gov-form-select .icon-arrow{right:calc(3 * var(--gov-form-select-l-arrow-right-position, 1rem))}[size=l][success=""].gov-form-select .icon-arrow,[size=l][success=true i].gov-form-select .icon-arrow,[size=l][success="1"].gov-form-select .icon-arrow{right:calc(3 * var(--gov-form-select-l-arrow-right-position, 1rem))}[size=xl].gov-form-select *[slot=right-icon]{right:var(--gov-form-select-xl-arrow-right-position, 1.3125rem);width:var(--gov-form-select-xl-arrow-size, 1rem);height:var(--gov-form-select-xl-arrow-size, 1rem)}[size=xl][invalid=""].gov-form-select .icon-arrow,[size=xl][invalid=true i].gov-form-select .icon-arrow,[size=xl][invalid="1"].gov-form-select .icon-arrow{right:calc(3 * var(--gov-form-select-xl-arrow-right-position, 1.3125rem))}[size=xl][success=""].gov-form-select .icon-arrow,[size=xl][success=true i].gov-form-select .icon-arrow,[size=xl][success="1"].gov-form-select .icon-arrow{right:calc(3 * var(--gov-form-select-xl-arrow-right-position, 1.3125rem))}[size=s][invalid=""].gov-form-select *[slot=right-icon]~select,[size=s][invalid=""].gov-form-select *[slot=right-icon]~input,[size=s][invalid=true i].gov-form-select *[slot=right-icon]~select,[size=s][invalid=true i].gov-form-select *[slot=right-icon]~input,[size=s][invalid="1"].gov-form-select *[slot=right-icon]~select,[size=s][invalid="1"].gov-form-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-s-icon-padding, 2rem))}[size=s][success=""].gov-form-select *[slot=right-icon]~select,[size=s][success=""].gov-form-select *[slot=right-icon]~input,[size=s][success=true i].gov-form-select *[slot=right-icon]~select,[size=s][success=true i].gov-form-select *[slot=right-icon]~input,[size=s][success="1"].gov-form-select *[slot=right-icon]~select,[size=s][success="1"].gov-form-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-s-icon-padding, 2rem))}[size=m][invalid=""].gov-form-select *[slot=right-icon]~select,[size=m][invalid=""].gov-form-select *[slot=right-icon]~input,[size=m][invalid=true i].gov-form-select *[slot=right-icon]~select,[size=m][invalid=true i].gov-form-select *[slot=right-icon]~input,[size=m][invalid="1"].gov-form-select *[slot=right-icon]~select,[size=m][invalid="1"].gov-form-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-m-icon-padding, 2.5rem))}[size=m][success=""].gov-form-select *[slot=right-icon]~select,[size=m][success=""].gov-form-select *[slot=right-icon]~input,[size=m][success=true i].gov-form-select *[slot=right-icon]~select,[size=m][success=true i].gov-form-select *[slot=right-icon]~input,[size=m][success="1"].gov-form-select *[slot=right-icon]~select,[size=m][success="1"].gov-form-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-m-icon-padding, 2.5rem))}[size=l][invalid=""].gov-form-select *[slot=right-icon]~select,[size=l][invalid=""].gov-form-select *[slot=right-icon]~input,[size=l][invalid=true i].gov-form-select *[slot=right-icon]~select,[size=l][invalid=true i].gov-form-select *[slot=right-icon]~input,[size=l][invalid="1"].gov-form-select *[slot=right-icon]~select,[size=l][invalid="1"].gov-form-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-l-icon-padding, 2.5rem))}[size=l][success=""].gov-form-select *[slot=right-icon]~select,[size=l][success=""].gov-form-select *[slot=right-icon]~input,[size=l][success=true i].gov-form-select *[slot=right-icon]~select,[size=l][success=true i].gov-form-select *[slot=right-icon]~input,[size=l][success="1"].gov-form-select *[slot=right-icon]~select,[size=l][success="1"].gov-form-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-l-icon-padding, 2.5rem))}[size=xl][invalid=""].gov-form-select *[slot=right-icon]~select,[size=xl][invalid=""].gov-form-select *[slot=right-icon]~input,[size=xl][invalid=true i].gov-form-select *[slot=right-icon]~select,[size=xl][invalid=true i].gov-form-select *[slot=right-icon]~input,[size=xl][invalid="1"].gov-form-select *[slot=right-icon]~select,[size=xl][invalid="1"].gov-form-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-xl-icon-padding, 3rem))}[size=xl][success=""].gov-form-select *[slot=right-icon]~select,[size=xl][success=""].gov-form-select *[slot=right-icon]~input,[size=xl][success=true i].gov-form-select *[slot=right-icon]~select,[size=xl][success=true i].gov-form-select *[slot=right-icon]~input,[size=xl][success="1"].gov-form-select *[slot=right-icon]~select,[size=xl][success="1"].gov-form-select *[slot=right-icon]~input{padding-right:calc(2 * var(--gov-form-input-core-xl-icon-padding, 3rem))}';const x=class{constructor(i){e(this,i);this.govFocus=o(this,"gov-focus",7);this.govBlur=o(this,"gov-blur",7);this.govChange=o(this,"gov-change",7);this.value=undefined;this.identifier=undefined;this.variant="secondary";this.size="m";this.name=undefined;this.required=false;this.success=undefined;this.disabled=false;this.invalid=undefined;this.wcagActiveDescendant=undefined;this.wcagControls=undefined;this.wcagDescribedBy=undefined;this.wcagLabelledBy=undefined;this.wcagOwns=undefined;this.focused=undefined;this.options=[];this.h=a(this.host);this.f=s(this.h);this.selectId=p("GovSelect")}validateVariant(e){f(c,e,l.root)}validateSize(e){f(n,e,l.root)}watchDisabled(){this.passControlAttrs()}watchValue(){this.markSelectedValue()}passControlAttrs(){this.f.passAttrToControl("size",this.size);this.f.passAttrToControl("invalid",g(this.invalid));this.f.passAttrToControl("type","select")}componentWillLoad(){this.validateVariant(this.variant);this.validateSize(this.size);this.markSelectedValue();this.passControlAttrs();this.f.passAttrToLabel("required",String(this.required))}async componentDidRender(){if(m()){await u(500);await this.validateWcag()}}markSelectedValue(){this.host.querySelectorAll("option").forEach((e=>{if(e.value===this.value){e.setAttribute("selected","selected")}else{e.removeAttribute("selected")}}))}render(){return i(t,{class:l.root,size:this.size,variant:this.variant},this.h.hasSlot("prefix")&&i("slot",{name:"prefix"}),i("span",{class:"element"},i("gov-icon",{slot:"right-icon",name:"chevron-down",class:"icon-arrow"}),this.h.hasSlot("right-icon")&&!(this.success||this.invalid)&&i("slot",{name:"right-icon"}),this.success&&i("gov-icon",{slot:"right-icon",class:"icon-validation",name:"check-lg"}),this.invalid&&i("gov-icon",{slot:"right-icon",class:"icon-validation",name:"exclamation-lg"}),i("select",{id:this.identifier||this.selectId,onFocus:this.onFocusHandler.bind(this),onChange:this.onChangeHandler.bind(this),onBlur:this.onBlurHandler.bind(this),required:this.required,name:this.name,disabled:this.disabled,ref:e=>this.selectRef=e,"aria-disabled":v(this.disabled),"aria-activedescendant":this.wcagActiveDescendant,"aria-controls":this.wcagControls,"aria-required":v(this.required),"aria-invalid":v(this.invalid),"aria-describedby":this.wcagDescribedBy,"aria-labelledby":this.wcagLabelledBy,"aria-owns":this.wcagOwns},i("slot",null),this.options.map((e=>i("option",{value:e.value,selected:e.value===this.value,disabled:e===null||e===void 0?void 0:e.disabled},e.label))))),this.h.hasSlot("sufix")&&i("slot",{name:"sufix"}))}onFocusHandler(e){this.focused=true;this.govFocus.emit({component:l.root,originalEvent:e,value:this.value})}onBlurHandler(e){this.focused=false;this.govBlur.emit({component:l.root,originalEvent:e,value:this.value})}onChangeHandler(e){this.value=e.target.value;e.stopPropagation();this.govChange.emit({component:l.root,originalEvent:e,value:this.value})}async setFocus(e){return this.selectRef.focus(e)}async setValue(e){this.value=e}async getRef(){return this.selectRef}async setOptions(e){if(Array.isArray(e)){this.options=e}}async validateWcag(){d(this.wcagActiveDescendant,"wcag-active-descendant",l.root);d(this.wcagControls,"wcag-controls",l.root);d(this.wcagDescribedBy,"wcag-described-by",l.root);d(this.wcagOwns,"wcag-owns",l.root);h(this.identifier||this.selectId,this.wcagLabelledBy,l.root)}get host(){return r(this)}static get watchers(){return{variant:["validateVariant"],size:["validateSize","watchDisabled"],disabled:["watchDisabled"],invalid:["watchDisabled"],value:["watchValue"]}}};x.style=z;export{x as gov_form_select};
//# sourceMappingURL=p-d69599bc.entry.js.map