import{r as o,c as i,h as t,a as r,g as e}from"./p-5bc604a3.js";import{g as n,k as a,l as s,m as l}from"./p-0e5fa8bf.js";import{g as v,a as g,t as c,c as p}from"./p-28e59384.js";import{c as m}from"./p-003e6cca.js";import{v as f}from"./p-dcb5fb35.js";import{a as u,b as d}from"./p-7724b535.js";import{c as h}from"./p-24636c53.js";import{d as x}from"./p-03990da5.js";import"./p-55500e5a.js";import"./p-ff7365ae.js";import"./p-6278531b.js";import"./p-9dab01be.js";import"./p-3464136c.js";import"./p-7f2c9830.js";const z='.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-input{position:relative;display:flex;width:100%;align-items:center}.gov-form-input .element{position:relative;display:flex;flex:1 1 auto}.gov-form-input input,.gov-form-input select,.gov-form-input textarea{width:100%;border-radius:var(--gov-border-radius, 0.1875rem);background-color:var(--gov-form-bg-color, var(--gov-color-neutral-white));font-family:var(--gov-font-family, "Roboto", sans-serif)}.gov-form-input input:focus,.gov-form-input select:focus,.gov-form-input textarea:focus{outline:none}.gov-form-input input:focus-visible,.gov-form-input select:focus-visible,.gov-form-input textarea:focus-visible{border-radius:var(--gov-border-radius, 0.1875rem);outline:var(--gov-outline-width, 0.125rem) solid var(--gov-color-focus-base);outline-offset:0}.gov-form-input input::-moz-placeholder,.gov-form-input select::-moz-placeholder,.gov-form-input textarea::-moz-placeholder{color:var(--gov-form-placeholder-color, var(--gov-color-secondary-600))}.gov-form-input input::placeholder,.gov-form-input select::placeholder,.gov-form-input textarea::placeholder{color:var(--gov-form-placeholder-color, var(--gov-color-secondary-600))}.gov-form-input textarea{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);padding:0.5rem 0.75rem;resize:none}.gov-form-input *[slot=left-icon],.gov-form-input *[slot=right-icon]{position:absolute;top:50%;display:flex;justify-content:center;transform:translateY(-50%);pointer-events:none}.gov-form-input *[slot=left-icon]{left:0}.gov-form-input *[slot=right-icon]{right:0}.gov-form-input *[slot=prefix],.gov-form-input *[slot=sufix]{margin:0}[size=s].gov-form-input{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);gap:0.5rem var(--gov-form-input-core-s-icon-size, 1rem)}[size=s].gov-form-input input,[size=s].gov-form-input select{font-weight:var(--gov-text-s-font-weight);font-size:var(--gov-text-s-font-size);line-height:var(--gov-text-s-line-height);letter-spacing:var(--gov-text-s-letter-spacing);height:var(--gov-form-input-core-s-height, 2rem);padding:var(--gov-form-input-core-s-padding, 0.25rem 0.75rem)}[size=s].gov-form-input *[slot=left-icon],[size=s].gov-form-input *[slot=right-icon]{width:var(--gov-form-input-core-s-icon-size, 1rem);height:var(--gov-form-input-core-s-icon-size, 1rem)}[size=s].gov-form-input *[slot=left-icon]{left:calc((var(--gov-form-input-core-s-icon-padding, 2rem) - var(--gov-form-input-core-s-icon-size, 1rem)) / 2)}[size=s].gov-form-input *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-s-icon-padding, 2rem)}[size=s].gov-form-input *[slot=right-icon]{right:calc((var(--gov-form-input-core-s-icon-padding, 2rem) - var(--gov-form-input-core-s-icon-size, 1rem)) / 2)}[size=s].gov-form-input *[slot=right-icon]~input,[size=s].gov-form-input *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-s-icon-padding, 2rem)}[size=m].gov-form-input{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);gap:0.5rem var(--gov-form-input-core-m-icon-size, 1rem)}[size=m].gov-form-input input,[size=m].gov-form-input select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);height:var(--gov-form-input-core-m-height, 2.5rem);padding:var(--gov-form-input-core-m-padding, 0.4375rem 0.75rem)}[size=m].gov-form-input *[slot=left-icon],[size=m].gov-form-input *[slot=right-icon]{width:var(--gov-form-input-core-m-icon-size, 1rem);height:var(--gov-form-input-core-m-icon-size, 1rem)}[size=m].gov-form-input *[slot=left-icon]{left:calc((var(--gov-form-input-core-m-icon-padding, 2.5rem) - var(--gov-form-input-core-m-icon-size, 1rem)) / 2)}[size=m].gov-form-input *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-m-icon-padding, 2.5rem)}[size=m].gov-form-input *[slot=right-icon]{right:calc((var(--gov-form-input-core-m-icon-padding, 2.5rem) - var(--gov-form-input-core-m-icon-size, 1rem)) / 2)}[size=m].gov-form-input *[slot=right-icon]~input,[size=m].gov-form-input *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-m-icon-padding, 2.5rem)}[size=l].gov-form-input{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);gap:0.5rem var(--gov-form-input-core-l-icon-size, 1rem)}[size=l].gov-form-input input,[size=l].gov-form-input select{font-weight:var(--gov-text-m-font-weight);font-size:var(--gov-text-m-font-size);line-height:var(--gov-text-m-line-height);letter-spacing:var(--gov-text-m-letter-spacing);height:var(--gov-form-input-core-l-height, 3rem);padding:var(--gov-form-input-core-l-padding, 0.6875rem 0.75rem)}[size=l].gov-form-input *[slot=left-icon],[size=l].gov-form-input *[slot=right-icon]{width:var(--gov-form-input-core-l-icon-size, 1rem);height:var(--gov-form-input-core-l-icon-size, 1rem)}[size=l].gov-form-input *[slot=left-icon]{left:calc((var(--gov-form-input-core-l-icon-padding, 2.5rem) - var(--gov-form-input-core-l-icon-size, 1rem)) / 2)}[size=l].gov-form-input *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-l-icon-padding, 2.5rem)}[size=l].gov-form-input *[slot=right-icon]{right:calc((var(--gov-form-input-core-l-icon-padding, 2.5rem) - var(--gov-form-input-core-l-icon-size, 1rem)) / 2)}[size=l].gov-form-input *[slot=right-icon]~input,[size=l].gov-form-input *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-l-icon-padding, 2.5rem)}[size=xl].gov-form-input{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);gap:0.5rem var(--gov-form-input-core-xl-icon-size, 1.25rem)}[size=xl].gov-form-input input,[size=xl].gov-form-input select{font-weight:var(--gov-text-l-font-weight);font-size:var(--gov-text-l-font-size);line-height:var(--gov-text-l-line-height);letter-spacing:var(--gov-text-l-letter-spacing);height:var(--gov-form-input-core-xl-height, 3.5rem);padding:var(--gov-form-input-core-xl-padding, 0.9375rem 1rem 0.875rem)}[size=xl].gov-form-input *[slot=left-icon],[size=xl].gov-form-input *[slot=right-icon]{width:var(--gov-form-input-core-xl-icon-size, 1.25rem);height:var(--gov-form-input-core-xl-icon-size, 1.25rem)}[size=xl].gov-form-input *[slot=left-icon]{left:calc((var(--gov-form-input-core-xl-icon-padding, 3rem) - var(--gov-form-input-core-xl-icon-size, 1.25rem)) / 2)}[size=xl].gov-form-input *[slot=left-icon]~input{padding-left:var(--gov-form-input-core-xl-icon-padding, 3rem)}[size=xl].gov-form-input *[slot=right-icon]{right:calc((var(--gov-form-input-core-xl-icon-padding, 3rem) - var(--gov-form-input-core-xl-icon-size, 1.25rem)) / 2)}[size=xl].gov-form-input *[slot=right-icon]~input,[size=xl].gov-form-input *[slot=right-icon]~select{padding-right:var(--gov-form-input-core-xl-icon-padding, 3rem)}[variant=primary].gov-form-input input,[variant=primary].gov-form-input select,[variant=primary].gov-form-input textarea{color:var(--gov-form-input-color-primary, var(--gov-color-secondary-700));border:var(--gov-form-input-border-primary, 0.0625rem solid var(--gov-color-primary-600))}[variant=primary].gov-form-input *[slot=left-icon],[variant=primary].gov-form-input *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-input-icon-color-primary, var(--gov-color-primary))}[variant=secondary].gov-form-input input,[variant=secondary].gov-form-input select,[variant=secondary].gov-form-input textarea{color:var(--gov-form-input-color-secondary, var(--gov-color-secondary-700));border:var(--gov-form-input-border-secondary, 0.0625rem solid var(--gov-color-secondary-700))}[variant=secondary].gov-form-input *[slot=left-icon],[variant=secondary].gov-form-input *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-input-icon-color-secondary, var(--gov-color-primary))}[disabled=""].gov-form-input,[disabled=true i].gov-form-input,[disabled="1"].gov-form-input{pointer-events:none}[disabled=""].gov-form-input input,[disabled=""].gov-form-input select,[disabled=""].gov-form-input textarea,[disabled=true i].gov-form-input input,[disabled=true i].gov-form-input select,[disabled=true i].gov-form-input textarea,[disabled="1"].gov-form-input input,[disabled="1"].gov-form-input select,[disabled="1"].gov-form-input textarea{border-color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600));background:var(--gov-form-input-disabled-bg, var(--gov-color-secondary-300));color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600))}[disabled=""].gov-form-input *[slot=left-icon],[disabled=""].gov-form-input *[slot=right-icon],[disabled=true i].gov-form-input *[slot=left-icon],[disabled=true i].gov-form-input *[slot=right-icon],[disabled="1"].gov-form-input *[slot=left-icon],[disabled="1"].gov-form-input *[slot=right-icon]{color:var(--gov-form-state-color-disabled, var(--gov-color-secondary-600)) !important}[invalid=""].gov-form-input input,[invalid=""].gov-form-input select,[invalid=""].gov-form-input textarea,[invalid=true i].gov-form-input input,[invalid=true i].gov-form-input select,[invalid=true i].gov-form-input textarea,[invalid="1"].gov-form-input input,[invalid="1"].gov-form-input select,[invalid="1"].gov-form-input textarea{border-color:var(--gov-form-state-color-error, var(--gov-color-error));color:var(--gov-form-state-color-error, var(--gov-color-error))}[invalid=""].gov-form-input input::-moz-placeholder,[invalid=""].gov-form-input select::-moz-placeholder,[invalid=""].gov-form-input textarea::-moz-placeholder,[invalid=true i].gov-form-input input::-moz-placeholder,[invalid=true i].gov-form-input select::-moz-placeholder,[invalid=true i].gov-form-input textarea::-moz-placeholder,[invalid="1"].gov-form-input input::-moz-placeholder,[invalid="1"].gov-form-input select::-moz-placeholder,[invalid="1"].gov-form-input textarea::-moz-placeholder{color:var(--gov-form-state-color-error, var(--gov-color-error-300))}[invalid=""].gov-form-input input::placeholder,[invalid=""].gov-form-input select::placeholder,[invalid=""].gov-form-input textarea::placeholder,[invalid=true i].gov-form-input input::placeholder,[invalid=true i].gov-form-input select::placeholder,[invalid=true i].gov-form-input textarea::placeholder,[invalid="1"].gov-form-input input::placeholder,[invalid="1"].gov-form-input select::placeholder,[invalid="1"].gov-form-input textarea::placeholder{color:var(--gov-form-state-color-error, var(--gov-color-error-300))}[invalid=""].gov-form-input *[slot=left-icon],[invalid=""].gov-form-input *[slot=right-icon],[invalid=true i].gov-form-input *[slot=left-icon],[invalid=true i].gov-form-input *[slot=right-icon],[invalid="1"].gov-form-input *[slot=left-icon],[invalid="1"].gov-form-input *[slot=right-icon]{color:var(--gov-form-state-color-error, var(--gov-color-error)) !important}[invalid=""].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[invalid=true i].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[invalid="1"].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow){display:none}[success=""].gov-form-input *[slot=right-icon]:not(.icon-arrow),[success=true i].gov-form-input *[slot=right-icon]:not(.icon-arrow),[success="1"].gov-form-input *[slot=right-icon]:not(.icon-arrow){color:var(--gov-form-state-color-success, var(--gov-color-success))}[success=""].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[success=true i].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow),[success="1"].gov-form-input *[slot=right-icon]:not(.icon-validation):not(.icon-arrow){display:none}[multiline=""].gov-form-input *[slot=left-icon],[multiline=""].gov-form-input *[slot=right-icon],[multiline=true i].gov-form-input *[slot=left-icon],[multiline=true i].gov-form-input *[slot=right-icon],[multiline="1"].gov-form-input *[slot=left-icon],[multiline="1"].gov-form-input *[slot=right-icon]{display:none}.gov-form-input[type=reset] input{border-width:0}.gov-form-input[type=reset] input:focus{outline:none}';var b;(function(o){o["INPUT"]="input";o["TEXTAREA"]="textarea"})(b||(b={}));const y=class{constructor(t){o(this,t);this.govFocus=i(this,"gov-focus",7);this.govBlur=i(this,"gov-blur",7);this.govInput=i(this,"gov-input",7);this.govKeyUp=i(this,"gov-keyup",7);this.govKeyDown=i(this,"gov-keydown",7);this.value=undefined;this.identifier=undefined;this.variant="secondary";this.success=undefined;this.size="m";this.name=undefined;this.multiline=undefined;this.rows=undefined;this.cols=undefined;this.required=false;this.disabled=false;this.placeholder=undefined;this.readonly=undefined;this.minlength=undefined;this.maxlength=undefined;this.min=undefined;this.max=undefined;this.autocomplete=undefined;this.autocorrect=undefined;this.type=undefined;this.inputType="text";this.role=undefined;this.invalid=undefined;this.wcagDescribedBy=undefined;this.wcagLabelledBy=undefined;this.wcagOwns=undefined;this.wcagAutocomplete=undefined;this.wcagExpanded=undefined;this.focused=undefined;this.h=v(this.host);this.inputId=h("GovInput");this.f=n(this.h)}validateVariant(o){f(s,o,a.root)}validateSize(o){f(l,o,a.root)}watchDisabled(){this.passControlAttrs()}passControlAttrs(){this.f.passAttrToControl("size",this.size);this.f.passAttrToControl("invalid",g(this.invalid));this.f.passAttrToControl("type",this.multiline?b.TEXTAREA:b.INPUT)}componentWillLoad(){this.validateVariant(this.variant);this.validateSize(this.size);this.passControlAttrs();this.f.passAttrToLabel("required",String(this.required))}async componentDidRender(){if(m()){await x(500);await this.validateWcag()}}render(){const o=this.multiline?b.TEXTAREA:b.INPUT;return t(r,{class:a.root,size:this.size,variant:this.variant,type:this.type},this.h.hasSlot("prefix")&&t("slot",{name:"prefix"}),t("span",{class:"element"},this.h.hasSlot("left-icon")&&t("slot",{name:"left-icon"}),this.h.hasSlot("right-icon")&&!(this.success||this.invalid)&&t("slot",{name:"right-icon"}),this.success&&!this.multiline&&t("gov-icon",{slot:"right-icon",class:"icon-validation",name:"check-lg"}),this.invalid&&!this.multiline&&t("gov-icon",{slot:"right-icon",class:"icon-validation",name:"exclamation-lg"}),t(o,{type:this.inputType,disabled:this.disabled,id:this.identifier||this.inputId,name:this.name,onFocus:this.onFocusHandler.bind(this),onInput:this.onInputHandler.bind(this),onBlur:this.onBlurHandler.bind(this),onKeyUp:this.onKeyUpHandler.bind(this),onKeyDown:this.onKeyDownHandler.bind(this),ref:o=>this.inputRef=o,placeholder:this.placeholder,value:this.value,readonly:c(this.readonly),autocomplete:p(this.autocomplete),autocorrect:p(this.autocorrect),minlength:this.minlength,maxlength:this.maxlength,min:this.min,max:this.max,required:this.required,rows:this.rows,cols:this.cols,role:this.role,"aria-required":c(this.required),"aria-invalid":c(this.invalid),"aria-disabled":c(this.disabled),"aria-describedby":this.wcagDescribedBy,"aria-labelledby":this.wcagLabelledBy,"aria-owns":this.wcagOwns,"aria-expanded":c(this.wcagExpanded),"aria-autocomplete":this.wcagAutocomplete})),this.h.hasSlot("sufix")&&t("slot",{name:"sufix"}))}onFocusHandler(o){o.stopPropagation();this.focused=true;this.govFocus.emit({component:a.root,value:this.value,originalEvent:o})}onBlurHandler(o){o.stopPropagation();this.focused=false;this.govBlur.emit({component:a.root,value:this.value,originalEvent:o})}onKeyUpHandler(o){o.stopPropagation();this.govKeyUp.emit({component:a.root,value:this.value,originalEvent:o})}onKeyDownHandler(o){o.stopPropagation();this.govKeyDown.emit({component:a.root,value:this.value,originalEvent:o})}onInputHandler(o){this.value=o.target.value;o.stopPropagation();this.govInput.emit({component:a.root,value:this.value,originalEvent:o})}async setFocus(o){return this.inputRef.focus(o)}async setValue(o){this.value=o}async clearValue(){this.value="";this.inputRef.value=""}async getRef(){return this.inputRef}async validateWcag(){u(this.wcagDescribedBy,"wcag-described-by",a.root);u(this.wcagLabelledBy,"wcag-labelled-by",a.root);u(this.wcagOwns,"wcag-owns",a.root);d(this.identifier||this.inputId,this.wcagLabelledBy,a.root)}get host(){return e(this)}static get watchers(){return{variant:["validateVariant"],size:["validateSize","watchDisabled"],disabled:["watchDisabled"],invalid:["watchDisabled"],type:["watchDisabled"]}}};y.style=z;export{y as gov_form_input};
//# sourceMappingURL=p-b7d23697.entry.js.map