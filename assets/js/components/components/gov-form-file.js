import{p as e,H as o,c as i,h as a,d as l}from"./p-2dee9951.js";import{c as r}from"./p-24636c53.js";import{g as t,a as s,t as f}from"./p-28e59384.js";import{b as n,c as m}from"./p-4ff831e3.js";import{c as d}from"./p-003e6cca.js";import{d as g}from"./p-03990da5.js";import{g as v}from"./p-53e02bee.js";import{d as h}from"./p-9795ad94.js";import{d as c}from"./p-4ce7b250.js";import{d as _}from"./p-700b19da.js";import{d as b}from"./p-b526e440.js";import{d as p}from"./p-1f84a302.js";const u={root:"gov-form-file",area:"gov-form-file__area",label:"gov-form-file__label",input:"gov-form-file__input",list:"gov-form-file__list",item:"gov-form-file__item",attachments:"gov-form-file__attachments"};function x(e){const o=["bytes","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"];let i=0,a=parseInt(e,10)||0;while(a>=1024&&++i){a=a/1024}return a.toFixed(a<10&&i>0?1:0)+" "+o[i]}function y(e,o){if(typeof o==="string"&&o.length){return o.replace(/\s/g,"").split(",").filter((o=>new RegExp(o.replace("*",".*")).test(e.type))).length>0}else{return true}}function w(e,o){const i=Math.round(e.size);return i<=o}const E='.gov-spin-animation,.gov-pseudo-spin-animation::before{animation:spin 4s linear infinite}@keyframes spin{100%{transform:rotate(360deg)}}@keyframes countdown{to{transform:scaleX(0)}}@keyframes progress{0%{background-position:-200px 0}100%{background-position:calc(200px + 100%) 0}}@keyframes pulse{0%{opacity:1}50%{opacity:0.4}100%{opacity:1}}.gov-form-file{position:relative;display:block;width:100%}.gov-form-file__label .gov-form-label__label>*:last-child{margin-bottom:0}.gov-form-file__input{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;opacity:0.0001;cursor:pointer}.gov-form-file__attachments{margin-top:1rem 0rem 0rem}.gov-form-file__item{display:flex;gap:1rem;align-items:center}.gov-form-file[disabled=""] .gov-form-file__label .gov-form-label__label,.gov-form-file[disabled=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[disabled="1"] .gov-form-file__label .gov-form-label__label{pointer-events:none}.gov-form-file[disabled=""] .gov-form-file__label .gov-form-label__label *,.gov-form-file[disabled=true i] .gov-form-file__label .gov-form-label__label *,.gov-form-file[disabled="1"] .gov-form-file__label .gov-form-label__label *{color:var(--gov-form-file-disabled-color, var(--gov-color-secondary-600))}.gov-form-file[expanded=""] .gov-form-file__area,.gov-form-file[expanded=true i] .gov-form-file__area,.gov-form-file[expanded="1"] .gov-form-file__area{position:relative;width:100%;padding:2rem 1.375rem 1.375rem;border:var(--gov-form-file-border, 0.0625rem dashed var(--gov-color-secondary-500));text-align:center;transition:background-color 150ms ease-in-out;will-change:background-color}.gov-form-file[expanded=""] .gov-form-file__area.highlight,.gov-form-file[expanded=true i] .gov-form-file__area.highlight,.gov-form-file[expanded="1"] .gov-form-file__area.highlight{background-color:var(--gov-color-primary-200)}.gov-form-file[expanded=""] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded="1"] .gov-form-file__label .gov-form-label__label{width:100%;padding:1.375rem;border:var(--gov-form-file-border, 0.0625rem dashed var(--gov-color-secondary-500));text-align:center}.gov-form-file[expanded=""] .gov-form-file__attachments,.gov-form-file[expanded=true i] .gov-form-file__attachments,.gov-form-file[expanded="1"] .gov-form-file__attachments{margin:1.5rem 0rem 0rem}.gov-form-file[expanded=""][invalid=""] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=""][invalid=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=""][invalid="1"] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=true i][invalid=""] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=true i][invalid=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=true i][invalid="1"] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded="1"][invalid=""] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded="1"][invalid=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded="1"][invalid="1"] .gov-form-file__label .gov-form-label__label{border-color:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-file[expanded=""][invalid=""] .gov-form-file__area,.gov-form-file[expanded=""][invalid=true i] .gov-form-file__area,.gov-form-file[expanded=""][invalid="1"] .gov-form-file__area,.gov-form-file[expanded=true i][invalid=""] .gov-form-file__area,.gov-form-file[expanded=true i][invalid=true i] .gov-form-file__area,.gov-form-file[expanded=true i][invalid="1"] .gov-form-file__area,.gov-form-file[expanded="1"][invalid=""] .gov-form-file__area,.gov-form-file[expanded="1"][invalid=true i] .gov-form-file__area,.gov-form-file[expanded="1"][invalid="1"] .gov-form-file__area{border-color:var(--gov-form-state-color-error, var(--gov-color-error))}.gov-form-file[expanded=""][disabled=""] .gov-form-file__area,.gov-form-file[expanded=""][disabled=true i] .gov-form-file__area,.gov-form-file[expanded=""][disabled="1"] .gov-form-file__area,.gov-form-file[expanded=true i][disabled=""] .gov-form-file__area,.gov-form-file[expanded=true i][disabled=true i] .gov-form-file__area,.gov-form-file[expanded=true i][disabled="1"] .gov-form-file__area,.gov-form-file[expanded="1"][disabled=""] .gov-form-file__area,.gov-form-file[expanded="1"][disabled=true i] .gov-form-file__area,.gov-form-file[expanded="1"][disabled="1"] .gov-form-file__area{pointer-events:none;color:var(--gov-form-file-disabled-color, var(--gov-color-secondary-600))}@media (min-width: 30em){.gov-form-file[expanded=""] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded=true i] .gov-form-file__label .gov-form-label__label,.gov-form-file[expanded="1"] .gov-form-file__label .gov-form-label__label{padding:2rem}}';const k=e(class e extends o{constructor(){super();this.__registerHost();this.govFocus=i(this,"gov-focus",7);this.govBlur=i(this,"gov-blur",7);this.govFiles=i(this,"gov-files",7);this.govAddFile=i(this,"gov-add-file",7);this.govRemoveFile=i(this,"gov-remove-file",7);this.expanded=false;this.required=false;this.disabled=false;this.displayAttachments=true;this.name=undefined;this.accept=undefined;this.multiple=false;this.maxFileSize=-1;this.identifier=undefined;this.invalid=undefined;this.errorSize="Soubor je větší než povolená velikost {FILE_SIZE}";this.errorAccept="Soubor tohoto typu není povolen";this.attachmentsLabel="Přílohy";this.wcagDescribedBy=undefined;this.wcagLabelledBy=undefined;this.wcagRemoveLabel="Odebrat soubor {FILE_NAME}";this.wcagAttachmentsLabel="Přílohy";this.files=[];this.fileId=r("GovInputFile");this.h=t(this.host);this.f=v(this.h)}watchDisabled(){this.passControlAttrs()}passControlAttrs(){this.f.passAttrToControl("invalid",s(this.invalid));this.f.passAttrToControl("type","File")}registerListeners(){function e(){this.areaRef.classList.add("highlight")}function o(){this.areaRef.classList.remove("highlight")}this.inputRef.addEventListener("change",(e=>{e.preventDefault();e.stopPropagation();const o=e.target.files;this.validateFiles(o)}),false);if(this.expanded){const i=["dragover","dragleave"];const a=["dragenter","dragover","mouseenter"];const l=["dragleave","drop","mouseleave"];i.map((e=>this.inputRef.addEventListener(e,this.preventDefaults.bind(this),false)));a.map((o=>this.inputRef.addEventListener(o,e.bind(this),false)));l.forEach((e=>this.inputRef.addEventListener(e,o.bind(this),false)));this.areaRef.addEventListener("drop",this.handleDrop.bind(this),false)}}preventDefaults(e){e.preventDefault();e.stopPropagation()}handleDrop(e){const o=e.dataTransfer;this.validateFiles(o.files)}validateFiles(e){let o=[];Array.from(e).map((e=>{const i=this.files.find((o=>o.file.name===e.name&&o.file.size===e.size))||null;if(i===null){const i=typeof this.maxFileSize==="number"&&this.maxFileSize>0?w(e,this.maxFileSize):true;const a=y(e,this.accept);const l={id:r("GovFormFile"),file:e,acceptValid:a,sizeValid:i};if(this.displayAttachments){this.files=[...this.files,l]}else{o=[...o,l]}this.govAddFile.emit({component:u.root,file:l})}}));this.govFiles.emit({component:u.root,files:o.length?o:this.files})}componentWillLoad(){this.f.passAttrToLabel("required",String(this.required));this.watchDisabled()}async componentDidRender(){if(d()){await g(500);await this.validateWcag()}this.registerListeners()}render(){return a(l,{class:this.h.classes([u.root]),invalid:f(this.invalid),expanded:f(this.expanded)},a("div",{class:u.area,ref:e=>this.areaRef=e},a("slot",null),a("input",{class:u.input,ref:e=>this.inputRef=e,id:this.identifier||this.fileId,type:"file",name:this.name,accept:this.accept,multiple:this.multiple,onChange:this.onChangeHandler.bind(this),onFocus:this.onFocusHandler.bind(this),onBlur:this.onBlurHandler.bind(this),required:this.required,disabled:this.disabled,"aria-required":f(this.required),"aria-invalid":f(this.invalid),"aria-describedby":this.wcagDescribedBy,"aria-labelledby":this.wcagLabelledBy,"aria-disabled":f(this.disabled)})),this.h.hasSlot("attachments")?a("div",{class:u.attachments},a("slot",{name:"attachments"})):null,this.files.length&&this.displayAttachments?a("div",{class:u.attachments},a("gov-attachments",{label:this.wcagAttachmentsLabel,"wcag-label":this.wcagAttachmentsLabel},this.files.map((e=>a("gov-attachments-item",{"wcag-remove-labelled-by":e.id,"on-gov-remove":()=>this.onRemoveFileHandler(e)},a("span",{class:"sr-only",id:e.id},this.wcagRemoveLabel.replace("{FILE_NAME}",e.file.name)),e.file.name,e.acceptValid===false?a("gov-form-message",{slot:"message",variant:"error"},a("gov-icon",{slot:"icon",name:"exclamation-triangle-fill"}),e.acceptValid===false?this.errorAccept:null):null,e.sizeValid===false?a("gov-form-message",{slot:"message",variant:"error"},a("gov-icon",{slot:"icon",name:"exclamation-triangle-fill"}),this.errorSize.replace("{FILE_SIZE}",x(this.maxFileSize))):null,a("span",{slot:"info"},"(",x(e.file.size),")")))))):null)}onRemoveFileHandler(e){const o=this.files.findIndex((o=>o.id===e.id));if(o!==-1){const e=this.files;const i=this.files[o];e.splice(o,1);this.files=[...e];this.govRemoveFile.emit({component:u.root,file:i});this.govFiles.emit({component:u.root,files:e})}}onFocusHandler(e){e.stopPropagation();this.govFocus.emit({component:u.root,originalEvent:e})}onBlurHandler(e){e.stopPropagation();this.govBlur.emit({component:u.root,originalEvent:e})}onChangeHandler(e){e.stopPropagation()}async getRef(){return this.inputRef}async getAreaRef(){return this.areaRef}async reset(){this.files=[]}async validateWcag(){n(this.wcagDescribedBy,"wcag-described-by",u.root);n(this.wcagLabelledBy,"wcag-labelled-by",u.root);m(this.identifier||this.fileId,this.wcagLabelledBy,u.root)}get host(){return this}static get watchers(){return{disabled:["watchDisabled"],invalid:["watchDisabled"]}}static get style(){return E}},[4,"gov-form-file",{expanded:[4],required:[4],disabled:[4],displayAttachments:[4,"display-attachments"],name:[1],accept:[1],multiple:[4],maxFileSize:[2,"max-file-size"],identifier:[1],invalid:[4],errorSize:[1,"error-size"],errorAccept:[1,"error-accept"],attachmentsLabel:[1,"attachments-label"],wcagDescribedBy:[1,"wcag-described-by"],wcagLabelledBy:[1,"wcag-labelled-by"],wcagRemoveLabel:[1,"wcag-remove-label"],wcagAttachmentsLabel:[1,"wcag-attachments-label"],files:[32],getRef:[64],getAreaRef:[64],reset:[64],validateWcag:[64]}]);function j(){if(typeof customElements==="undefined"){return}const e=["gov-form-file","gov-attachments","gov-attachments-item","gov-button","gov-form-message","gov-icon"];e.forEach((e=>{switch(e){case"gov-form-file":if(!customElements.get(e)){customElements.define(e,k)}break;case"gov-attachments":if(!customElements.get(e)){h()}break;case"gov-attachments-item":if(!customElements.get(e)){c()}break;case"gov-button":if(!customElements.get(e)){_()}break;case"gov-form-message":if(!customElements.get(e)){b()}break;case"gov-icon":if(!customElements.get(e)){p()}break}}))}j();const F=k;const B=j;export{F as GovFormFile,B as defineCustomElement};
//# sourceMappingURL=gov-form-file.js.map