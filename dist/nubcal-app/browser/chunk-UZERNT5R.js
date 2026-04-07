import{a as ct,b as dt,c as pt,d as mt,e as ht,f as ne,g as ut,h as ft,j as gt}from"./chunk-CF6BEGAK.js";import{a as Tt,b as At}from"./chunk-E64LX7DD.js";import{a as He,b as Qe,c as Ge,d as $e,e as Ye,f as Z,g as Ue,h as Xe,i as Je,j as Ze,k as et,m as tt}from"./chunk-JBN3BVK7.js";import{g as St,h as Et,i as It,m as Dt,o as ge,p as _e,q as Pt}from"./chunk-R2B3EPUN.js";import{E as te,F as _t,G as bt,H as yt,I as xt,J as vt,K as Ct,L as kt,M as Mt,N as wt,O as Ot,c as nt,h as it,i as ot,n as at,p as N,q as rt,s as ee,t as lt,u as fe,w as st,x as z}from"./chunk-4A5U5COS.js";import{e as Be,o as We,p as qe,r as je,t as Ke}from"./chunk-HDYC7OP4.js";import{$a as Ee,$b as s,Ab as l,Bb as r,Cb as v,D as Me,Gb as Ae,Hb as Fe,Jb as I,Kb as Re,Lb as f,M as ce,N as de,Nb as p,O as T,Ob as Y,Pb as L,Qb as Ve,Rb as U,Sb as w,Ta as c,Tb as O,V as A,X as P,Xb as Le,Z as m,Zb as C,_b as Ne,a as ae,ab as Q,ac as D,b as re,bc as k,ca as _,da as b,ea as we,ec as pe,fc as me,g as S,ga as Oe,gb as E,gc as he,hb as R,hc as X,ib as Ie,ka as F,lb as De,ob as Pe,pa as x,pc as ze,q as le,ta as Se,tb as V,ub as h,v as ke,vb as u,vc as J,wa as H,wb as Te,x as K,xb as G,xc as M,y as se,yb as $,yc as ue,zb as g}from"./chunk-LDPHZBOH.js";var q=class{_multiple;_emitChanges;compareWith;_selection=new Set;_deselectedToEmit=[];_selectedToEmit=[];_selected=null;get selected(){return this._selected||(this._selected=Array.from(this._selection.values())),this._selected}changed=new S;constructor(o=!1,e,t=!0,n){this._multiple=o,this._emitChanges=t,this.compareWith=n,e&&e.length&&(o?e.forEach(a=>this._markSelected(a)):this._markSelected(e[0]),this._selectedToEmit.length=0)}select(...o){this._verifyValueAssignment(o),o.forEach(t=>this._markSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}deselect(...o){this._verifyValueAssignment(o),o.forEach(t=>this._unmarkSelected(t));let e=this._hasQueuedChanges();return this._emitChangeEvent(),e}setSelection(...o){this._verifyValueAssignment(o);let e=this.selected,t=new Set(o.map(a=>this._getConcreteValue(a)));o.forEach(a=>this._markSelected(a)),e.filter(a=>!t.has(this._getConcreteValue(a,t))).forEach(a=>this._unmarkSelected(a));let n=this._hasQueuedChanges();return this._emitChangeEvent(),n}toggle(o){return this.isSelected(o)?this.deselect(o):this.select(o)}clear(o=!0){this._unmarkAll();let e=this._hasQueuedChanges();return o&&this._emitChangeEvent(),e}isSelected(o){return this._selection.has(this._getConcreteValue(o))}isEmpty(){return this._selection.size===0}hasValue(){return!this.isEmpty()}sort(o){this._multiple&&this.selected&&this._selected.sort(o)}isMultipleSelection(){return this._multiple}_emitChangeEvent(){this._selected=null,(this._selectedToEmit.length||this._deselectedToEmit.length)&&(this.changed.next({source:this,added:this._selectedToEmit,removed:this._deselectedToEmit}),this._deselectedToEmit=[],this._selectedToEmit=[])}_markSelected(o){o=this._getConcreteValue(o),this.isSelected(o)||(this._multiple||this._unmarkAll(),this.isSelected(o)||this._selection.add(o),this._emitChanges&&this._selectedToEmit.push(o))}_unmarkSelected(o){o=this._getConcreteValue(o),this.isSelected(o)&&(this._selection.delete(o),this._emitChanges&&this._deselectedToEmit.push(o))}_unmarkAll(){this.isEmpty()||this._selection.forEach(o=>this._unmarkSelected(o))}_verifyValueAssignment(o){o.length>1&&this._multiple}_hasQueuedChanges(){return!!(this._deselectedToEmit.length||this._selectedToEmit.length)}_getConcreteValue(o,e){if(this.compareWith){e=e??this._selection;for(let t of e)if(this.compareWith(o,t))return t;return o}else return o}};var Ft=(()=>{class i{_animationsDisabled=te();state="unchecked";disabled=!1;appearance="full";constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=E({type:i,selectors:[["mat-pseudo-checkbox"]],hostAttrs:[1,"mat-pseudo-checkbox"],hostVars:12,hostBindings:function(t,n){t&2&&C("mat-pseudo-checkbox-indeterminate",n.state==="indeterminate")("mat-pseudo-checkbox-checked",n.state==="checked")("mat-pseudo-checkbox-disabled",n.disabled)("mat-pseudo-checkbox-minimal",n.appearance==="minimal")("mat-pseudo-checkbox-full",n.appearance==="full")("_mat-animation-noopable",n._animationsDisabled)},inputs:{state:"state",disabled:"disabled",appearance:"appearance"},decls:0,vars:0,template:function(t,n){},styles:[`.mat-pseudo-checkbox {
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 0.1), background-color 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox::after {
  position: absolute;
  opacity: 0;
  content: "";
  border-bottom: 2px solid currentColor;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 0.1);
}
.mat-pseudo-checkbox._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-pseudo-checkbox._mat-animation-noopable::after {
  transition: none;
}

.mat-pseudo-checkbox-disabled {
  cursor: default;
}

.mat-pseudo-checkbox-indeterminate::after {
  left: 1px;
  opacity: 1;
  border-radius: 2px;
}

.mat-pseudo-checkbox-checked::after {
  left: 1px;
  border-left: 2px solid currentColor;
  transform: rotate(-45deg);
  opacity: 1;
  box-sizing: content-box;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-minimal-selected-checkmark-color, var(--mat-sys-primary));
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-minimal-disabled-selected-checkmark-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-pseudo-checkbox-full {
  border-color: var(--mat-pseudo-checkbox-full-unselected-icon-color, var(--mat-sys-on-surface-variant));
  border-width: 2px;
  border-style: solid;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-disabled {
  border-color: var(--mat-pseudo-checkbox-full-disabled-unselected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate {
  background-color: var(--mat-pseudo-checkbox-full-selected-icon-color, var(--mat-sys-primary));
  border-color: transparent;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  color: var(--mat-pseudo-checkbox-full-selected-checkmark-color, var(--mat-sys-on-primary));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled {
  background-color: var(--mat-pseudo-checkbox-full-disabled-selected-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked.mat-pseudo-checkbox-disabled::after, .mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate.mat-pseudo-checkbox-disabled::after {
  color: var(--mat-pseudo-checkbox-full-disabled-selected-checkmark-color, var(--mat-sys-surface));
}

.mat-pseudo-checkbox {
  width: 18px;
  height: 18px;
}

.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-checked::after {
  width: 14px;
  height: 6px;
  transform-origin: center;
  top: -4.2426406871px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-minimal.mat-pseudo-checkbox-indeterminate::after {
  top: 8px;
  width: 16px;
}

.mat-pseudo-checkbox-full.mat-pseudo-checkbox-checked::after {
  width: 10px;
  height: 4px;
  transform-origin: center;
  top: -2.8284271247px;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.mat-pseudo-checkbox-full.mat-pseudo-checkbox-indeterminate::after {
  top: 6px;
  width: 12px;
}
`],encapsulation:2,changeDetection:0})}return i})();var Ht=["text"],Qt=[[["mat-icon"]],"*"],Gt=["mat-icon","*"];function $t(i,o){if(i&1&&v(0,"mat-pseudo-checkbox",1),i&2){let e=p();g("disabled",e.disabled)("state",e.selected?"checked":"unchecked")}}function Yt(i,o){if(i&1&&v(0,"mat-pseudo-checkbox",3),i&2){let e=p();g("disabled",e.disabled)}}function Ut(i,o){if(i&1&&(l(0,"span",4),s(1),r()),i&2){let e=p();c(),k("(",e.group.label,")")}}var ye=new P("MAT_OPTION_PARENT_COMPONENT"),xe=new P("MatOptgroup");var be=class{source;isUserInput;constructor(o,e=!1){this.source=o,this.isUserInput=e}},B=(()=>{class i{_element=m(H);_changeDetectorRef=m(J);_parent=m(ye,{optional:!0});group=m(xe,{optional:!0});_signalDisableRipple=!1;_selected=!1;_active=!1;_mostRecentViewValue="";get multiple(){return this._parent&&this._parent.multiple}get selected(){return this._selected}value;id=m(ee).getId("mat-option-");get disabled(){return this.group&&this.group.disabled||this._disabled()}set disabled(e){this._disabled.set(e)}_disabled=x(!1);get disableRipple(){return this._signalDisableRipple?this._parent.disableRipple():!!this._parent?.disableRipple}get hideSingleSelectionIndicator(){return!!(this._parent&&this._parent.hideSingleSelectionIndicator)}onSelectionChange=new F;_text;_stateChanges=new S;constructor(){let e=m(it);e.load(bt),e.load(ot),this._signalDisableRipple=!!this._parent&&Pe(this._parent.disableRipple)}get active(){return this._active}get viewValue(){return(this._text?.nativeElement.textContent||"").trim()}select(e=!0){this._selected||(this._selected=!0,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}deselect(e=!0){this._selected&&(this._selected=!1,this._changeDetectorRef.markForCheck(),e&&this._emitSelectionChangeEvent())}focus(e,t){let n=this._getHostElement();typeof n.focus=="function"&&n.focus(t)}setActiveStyles(){this._active||(this._active=!0,this._changeDetectorRef.markForCheck())}setInactiveStyles(){this._active&&(this._active=!1,this._changeDetectorRef.markForCheck())}getLabel(){return this.viewValue}_handleKeydown(e){(e.keyCode===13||e.keyCode===32)&&!N(e)&&(this._selectViaInteraction(),e.preventDefault())}_selectViaInteraction(){this.disabled||(this._selected=this.multiple?!this._selected:!0,this._changeDetectorRef.markForCheck(),this._emitSelectionChangeEvent(!0))}_getTabIndex(){return this.disabled?"-1":"0"}_getHostElement(){return this._element.nativeElement}ngAfterViewChecked(){if(this._selected){let e=this.viewValue;e!==this._mostRecentViewValue&&(this._mostRecentViewValue&&this._stateChanges.next(),this._mostRecentViewValue=e)}}ngOnDestroy(){this._stateChanges.complete()}_emitSelectionChangeEvent(e=!1){this.onSelectionChange.emit(new be(this,e))}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=E({type:i,selectors:[["mat-option"]],viewQuery:function(t,n){if(t&1&&U(Ht,7),t&2){let a;w(a=O())&&(n._text=a.first)}},hostAttrs:["role","option",1,"mat-mdc-option","mdc-list-item"],hostVars:11,hostBindings:function(t,n){t&1&&f("click",function(){return n._selectViaInteraction()})("keydown",function(d){return n._handleKeydown(d)}),t&2&&(Re("id",n.id),V("aria-selected",n.selected)("aria-disabled",n.disabled.toString()),C("mdc-list-item--selected",n.selected)("mat-mdc-option-multiple",n.multiple)("mat-mdc-option-active",n.active)("mdc-list-item--disabled",n.disabled))},inputs:{value:"value",id:"id",disabled:[2,"disabled","disabled",M]},outputs:{onSelectionChange:"onSelectionChange"},exportAs:["matOption"],ngContentSelectors:Gt,decls:8,vars:5,consts:[["text",""],["aria-hidden","true",1,"mat-mdc-option-pseudo-checkbox",3,"disabled","state"],[1,"mdc-list-item__primary-text"],["state","checked","aria-hidden","true","appearance","minimal",1,"mat-mdc-option-pseudo-checkbox",3,"disabled"],[1,"cdk-visually-hidden"],["aria-hidden","true","mat-ripple","",1,"mat-mdc-option-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"]],template:function(t,n){t&1&&(Y(Qt),h(0,$t,1,2,"mat-pseudo-checkbox",1),L(1),l(2,"span",2,0),L(4,1),r(),h(5,Yt,1,1,"mat-pseudo-checkbox",3),h(6,Ut,2,1,"span",4),v(7,"div",5)),t&2&&(u(n.multiple?0:-1),c(5),u(!n.multiple&&n.selected&&!n.hideSingleSelectionIndicator?5:-1),c(),u(n.group&&n.group._inert?6:-1),c(),g("matRippleTrigger",n._getHostElement())("matRippleDisabled",n.disabled||n.disableRipple))},dependencies:[Ft,_t],styles:[`.mat-mdc-option {
  -webkit-user-select: none;
  user-select: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  min-height: 48px;
  padding: 0 16px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  color: var(--mat-option-label-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-option-label-text-font, var(--mat-sys-label-large-font));
  line-height: var(--mat-option-label-text-line-height, var(--mat-sys-label-large-line-height));
  font-size: var(--mat-option-label-text-size, var(--mat-sys-body-large-size));
  letter-spacing: var(--mat-option-label-text-tracking, var(--mat-sys-label-large-tracking));
  font-weight: var(--mat-option-label-text-weight, var(--mat-sys-body-large-weight));
}
.mat-mdc-option:hover:not(.mdc-list-item--disabled) {
  background-color: var(--mat-option-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-option:focus.mdc-list-item, .mat-mdc-option.mat-mdc-option-active.mdc-list-item {
  background-color: var(--mat-option-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-on-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));
  outline: 0;
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) {
  background-color: var(--mat-option-selected-state-layer-color, var(--mat-sys-secondary-container));
}
.mat-mdc-option.mdc-list-item--selected:not(.mdc-list-item--disabled):not(.mat-mdc-option-active, .mat-mdc-option-multiple, :focus, :hover) .mdc-list-item__primary-text {
  color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option .mat-pseudo-checkbox {
  --mat-pseudo-checkbox-minimal-selected-checkmark-color: var(--mat-option-selected-state-label-text-color, var(--mat-sys-on-secondary-container));
}
.mat-mdc-option.mdc-list-item {
  align-items: center;
  background: transparent;
}
.mat-mdc-option.mdc-list-item--disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-option.mdc-list-item--disabled .mat-mdc-option-pseudo-checkbox, .mat-mdc-option.mdc-list-item--disabled .mdc-list-item__primary-text, .mat-mdc-option.mdc-list-item--disabled > mat-icon {
  opacity: 0.38;
}
.mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 32px;
}
[dir=rtl] .mat-mdc-optgroup .mat-mdc-option:not(.mat-mdc-option-multiple) {
  padding-left: 16px;
  padding-right: 32px;
}
.mat-mdc-option .mat-icon,
.mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-icon,
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-full {
  margin-right: 0;
  margin-left: 16px;
}
.mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-left: 16px;
  flex-shrink: 0;
}
[dir=rtl] .mat-mdc-option .mat-pseudo-checkbox-minimal {
  margin-right: 16px;
  margin-left: 0;
}
.mat-mdc-option .mat-mdc-option-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
}
.mat-mdc-option .mdc-list-item__primary-text {
  white-space: normal;
  font-size: inherit;
  font-weight: inherit;
  letter-spacing: inherit;
  line-height: inherit;
  font-family: inherit;
  text-decoration: inherit;
  text-transform: inherit;
  margin-right: auto;
}
[dir=rtl] .mat-mdc-option .mdc-list-item__primary-text {
  margin-right: 0;
  margin-left: auto;
}
@media (forced-colors: active) {
  .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    content: "";
    position: absolute;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    width: 10px;
    height: 0;
    border-bottom: solid 10px;
    border-radius: 10px;
  }
  [dir=rtl] .mat-mdc-option.mdc-list-item--selected:not(:has(.mat-mdc-option-pseudo-checkbox))::after {
    right: auto;
    left: 16px;
  }
}

.mat-mdc-option-multiple {
  --mat-list-list-item-selected-container-color: var(--mat-list-list-item-container-color, transparent);
}

.mat-mdc-option-active .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2,changeDetection:0})}return i})();function Rt(i,o,e){if(e.length){let t=o.toArray(),n=e.toArray(),a=0;for(let d=0;d<i+1;d++)t[d].group&&t[d].group===n[a]&&a++;return a}return 0}function Vt(i,o,e,t){return i<e?i:i+o>e+t?Math.max(0,i-t+o):e}var Lt=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=R({type:i});static \u0275inj=A({imports:[z]})}return i})();var ve=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=R({type:i});static \u0275inj=A({imports:[xt,Lt,B,z]})}return i})();var tn=["trigger"],nn=["panel"],on=[[["mat-select-trigger"]],"*"],an=["mat-select-trigger","*"];function rn(i,o){if(i&1&&(l(0,"span",4),s(1),r()),i&2){let e=p();c(),D(e.placeholder)}}function ln(i,o){i&1&&L(0)}function sn(i,o){if(i&1&&(l(0,"span",11),s(1),r()),i&2){let e=p(2);c(),D(e.triggerValue)}}function cn(i,o){if(i&1&&(l(0,"span",5),h(1,ln,1,0)(2,sn,2,1,"span",11),r()),i&2){let e=p();c(),u(e.customTrigger?1:2)}}function dn(i,o){if(i&1){let e=I();l(0,"div",12,1),f("keydown",function(n){_(e);let a=p();return b(a._handleKeydown(n))}),L(2,1),r()}if(i&2){let e=p();Ne(e.panelClass),C("mat-select-panel-animations-enabled",!e._animationsDisabled)("mat-primary",(e._parentFormField==null?null:e._parentFormField.color)==="primary")("mat-accent",(e._parentFormField==null?null:e._parentFormField.color)==="accent")("mat-warn",(e._parentFormField==null?null:e._parentFormField.color)==="warn")("mat-undefined",!(e._parentFormField!=null&&e._parentFormField.color)),V("id",e.id+"-panel")("aria-multiselectable",e.multiple)("aria-label",e.ariaLabel||null)("aria-labelledby",e._getPanelAriaLabelledby())}}var pn=new P("mat-select-scroll-strategy",{providedIn:"root",factory:()=>{let i=m(Oe);return()=>It(i)}}),mn=new P("MAT_SELECT_CONFIG"),Bt=new P("MatSelectTrigger"),Ce=class{source;value;constructor(o,e){this.source=o,this.value=e}},Wt=(()=>{class i{_viewportRuler=m(St);_changeDetectorRef=m(J);_elementRef=m(H);_dir=m(st,{optional:!0});_idGenerator=m(ee);_renderer=m(Ee);_parentFormField=m(mt,{optional:!0});ngControl=m(Ge,{self:!0,optional:!0});_liveAnnouncer=m(at);_defaultOptions=m(mn,{optional:!0});_animationsDisabled=te();_popoverLocation;_initialized=new S;_cleanupDetach;options;optionGroups;customTrigger;_positions=[{originX:"start",originY:"bottom",overlayX:"start",overlayY:"top"},{originX:"end",originY:"bottom",overlayX:"end",overlayY:"top"},{originX:"start",originY:"top",overlayX:"start",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"},{originX:"end",originY:"top",overlayX:"end",overlayY:"bottom",panelClass:"mat-mdc-select-panel-above"}];_scrollOptionIntoView(e){let t=this.options.toArray()[e];if(t){let n=this.panel.nativeElement,a=Rt(e,this.options,this.optionGroups),d=t._getHostElement();e===0&&a===1?n.scrollTop=0:n.scrollTop=Vt(d.offsetTop,d.offsetHeight,n.scrollTop,n.offsetHeight)}}_positioningSettled(){this._scrollOptionIntoView(this._keyManager.activeItemIndex||0)}_getChangeEvent(e){return new Ce(this,e)}_scrollStrategyFactory=m(pn);_panelOpen=!1;_compareWith=(e,t)=>e===t;_uid=this._idGenerator.getId("mat-select-");_triggerAriaLabelledBy=null;_previousControl;_destroy=new S;_errorStateTracker;stateChanges=new S;disableAutomaticLabeling=!0;userAriaDescribedBy;_selectionModel;_keyManager;_preferredOverlayOrigin;_overlayWidth;_onChange=()=>{};_onTouched=()=>{};_valueId=this._idGenerator.getId("mat-select-value-");_scrollStrategy;_overlayPanelClass=this._defaultOptions?.overlayPanelClass||"";get focused(){return this._focused||this._panelOpen}_focused=!1;controlType="mat-select";trigger;panel;_overlayDir;panelClass;disabled=!1;get disableRipple(){return this._disableRipple()}set disableRipple(e){this._disableRipple.set(e)}_disableRipple=x(!1);tabIndex=0;get hideSingleSelectionIndicator(){return this._hideSingleSelectionIndicator}set hideSingleSelectionIndicator(e){this._hideSingleSelectionIndicator=e,this._syncParentProperties()}_hideSingleSelectionIndicator=this._defaultOptions?.hideSingleSelectionIndicator??!1;get placeholder(){return this._placeholder}set placeholder(e){this._placeholder=e,this.stateChanges.next()}_placeholder;get required(){return this._required??this.ngControl?.control?.hasValidator(Qe.required)??!1}set required(e){this._required=e,this.stateChanges.next()}_required;get multiple(){return this._multiple}set multiple(e){this._selectionModel,this._multiple=e}_multiple=!1;disableOptionCentering=this._defaultOptions?.disableOptionCentering??!1;get compareWith(){return this._compareWith}set compareWith(e){this._compareWith=e,this._selectionModel&&this._initializeSelection()}get value(){return this._value}set value(e){this._assignValue(e)&&this._onChange(e)}_value;ariaLabel="";ariaLabelledby;get errorStateMatcher(){return this._errorStateTracker.matcher}set errorStateMatcher(e){this._errorStateTracker.matcher=e}typeaheadDebounceInterval;sortComparator;get id(){return this._id}set id(e){this._id=e||this._uid,this.stateChanges.next()}_id;get errorState(){return this._errorStateTracker.errorState}set errorState(e){this._errorStateTracker.errorState=e}panelWidth=this._defaultOptions&&typeof this._defaultOptions.panelWidth<"u"?this._defaultOptions.panelWidth:"auto";canSelectNullableOptions=this._defaultOptions?.canSelectNullableOptions??!1;optionSelectionChanges=ke(()=>{let e=this.options;return e?e.changes.pipe(ce(e),de(()=>K(...e.map(t=>t.onSelectionChange)))):this._initialized.pipe(de(()=>this.optionSelectionChanges))});openedChange=new F;_openedStream=this.openedChange.pipe(se(e=>e),le(()=>{}));_closedStream=this.openedChange.pipe(se(e=>!e),le(()=>{}));selectionChange=new F;valueChange=new F;constructor(){let e=m(ut),t=m(Z,{optional:!0}),n=m(Ze,{optional:!0}),a=m(new ze("tabindex"),{optional:!0}),d=m(Dt,{optional:!0});this.ngControl&&(this.ngControl.valueAccessor=this),this._defaultOptions?.typeaheadDebounceInterval!=null&&(this.typeaheadDebounceInterval=this._defaultOptions.typeaheadDebounceInterval),this._errorStateTracker=new ft(e,this.ngControl,n,t,this.stateChanges),this._scrollStrategy=this._scrollStrategyFactory(),this.tabIndex=a==null?0:parseInt(a)||0,this._popoverLocation=d?.usePopover===!1?null:"inline",this.id=this.id}ngOnInit(){this._selectionModel=new q(this.multiple),this.stateChanges.next(),this._viewportRuler.change().pipe(T(this._destroy)).subscribe(()=>{this.panelOpen&&(this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._changeDetectorRef.detectChanges())})}ngAfterContentInit(){this._initialized.next(),this._initialized.complete(),this._initKeyManager(),this._selectionModel.changed.pipe(T(this._destroy)).subscribe(e=>{e.added.forEach(t=>t.select()),e.removed.forEach(t=>t.deselect())}),this.options.changes.pipe(ce(null),T(this._destroy)).subscribe(()=>{this._resetOptions(),this._initializeSelection()})}ngDoCheck(){let e=this._getTriggerAriaLabelledby(),t=this.ngControl;if(e!==this._triggerAriaLabelledBy){let n=this._elementRef.nativeElement;this._triggerAriaLabelledBy=e,e?n.setAttribute("aria-labelledby",e):n.removeAttribute("aria-labelledby")}t&&(this._previousControl!==t.control&&(this._previousControl!==void 0&&t.disabled!==null&&t.disabled!==this.disabled&&(this.disabled=t.disabled),this._previousControl=t.control),this.updateErrorState())}ngOnChanges(e){(e.disabled||e.userAriaDescribedBy)&&this.stateChanges.next(),e.typeaheadDebounceInterval&&this._keyManager&&this._keyManager.withTypeAhead(this.typeaheadDebounceInterval),e.panelClass&&this.panelClass instanceof Set&&(this.panelClass=Array.from(this.panelClass))}ngOnDestroy(){this._cleanupDetach?.(),this._keyManager?.destroy(),this._destroy.next(),this._destroy.complete(),this.stateChanges.complete(),this._clearFromModal()}toggle(){this.panelOpen?this.close():this.open()}open(){this._canOpen()&&(this._parentFormField&&(this._preferredOverlayOrigin=this._parentFormField.getConnectedOverlayOrigin()),this._cleanupDetach?.(),this._overlayWidth=this._getOverlayWidth(this._preferredOverlayOrigin),this._applyModalPanelOwnership(),this._panelOpen=!0,this._overlayDir.positionChange.pipe(Me(1)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this._positioningSettled()}),this._overlayDir.attachOverlay(),this._keyManager.withHorizontalOrientation(null),this._highlightCorrectOption(),this._changeDetectorRef.markForCheck(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!0)))}_trackedModal=null;_applyModalPanelOwnership(){let e=this._elementRef.nativeElement.closest('body > .cdk-overlay-container [aria-modal="true"]');if(!e)return;let t=`${this.id}-panel`;this._trackedModal&&fe(this._trackedModal,"aria-owns",t),lt(e,"aria-owns",t),this._trackedModal=e}_clearFromModal(){if(!this._trackedModal)return;let e=`${this.id}-panel`;fe(this._trackedModal,"aria-owns",e),this._trackedModal=null}close(){this._panelOpen&&(this._panelOpen=!1,this._exitAndDetach(),this._keyManager.withHorizontalOrientation(this._isRtl()?"rtl":"ltr"),this._changeDetectorRef.markForCheck(),this._onTouched(),this.stateChanges.next(),Promise.resolve().then(()=>this.openedChange.emit(!1)))}_exitAndDetach(){if(this._animationsDisabled||!this.panel){this._detachOverlay();return}this._cleanupDetach?.(),this._cleanupDetach=()=>{t(),clearTimeout(n),this._cleanupDetach=void 0};let e=this.panel.nativeElement,t=this._renderer.listen(e,"animationend",a=>{a.animationName==="_mat-select-exit"&&(this._cleanupDetach?.(),this._detachOverlay())}),n=setTimeout(()=>{this._cleanupDetach?.(),this._detachOverlay()},200);e.classList.add("mat-select-panel-exit")}_detachOverlay(){this._overlayDir.detachOverlay(),this._changeDetectorRef.markForCheck()}writeValue(e){this._assignValue(e)}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck(),this.stateChanges.next()}get panelOpen(){return this._panelOpen}get selected(){return this.multiple?this._selectionModel?.selected||[]:this._selectionModel?.selected[0]}get triggerValue(){if(this.empty)return"";if(this._multiple){let e=this._selectionModel.selected.map(t=>t.viewValue);return this._isRtl()&&e.reverse(),e.join(", ")}return this._selectionModel.selected[0].viewValue}updateErrorState(){this._errorStateTracker.updateErrorState()}_isRtl(){return this._dir?this._dir.value==="rtl":!1}_handleKeydown(e){this.disabled||(this.panelOpen?this._handleOpenKeydown(e):this._handleClosedKeydown(e))}_handleClosedKeydown(e){let t=e.keyCode,n=t===40||t===38||t===37||t===39,a=t===13||t===32,d=this._keyManager;if(!d.isTyping()&&a&&!N(e)||(this.multiple||e.altKey)&&n)e.preventDefault(),this.open();else if(!this.multiple){let W=this.selected;d.onKeydown(e);let y=this.selected;y&&W!==y&&this._liveAnnouncer.announce(y.viewValue,1e4)}}_handleOpenKeydown(e){let t=this._keyManager,n=e.keyCode,a=n===40||n===38,d=t.isTyping();if(a&&e.altKey)e.preventDefault(),this.close();else if(!d&&(n===13||n===32)&&t.activeItem&&!N(e))e.preventDefault(),t.activeItem._selectViaInteraction();else if(!d&&this._multiple&&n===65&&e.ctrlKey){e.preventDefault();let W=this.options.some(y=>!y.disabled&&!y.selected);this.options.forEach(y=>{y.disabled||(W?y.select():y.deselect())})}else{let W=t.activeItemIndex;t.onKeydown(e),this._multiple&&a&&e.shiftKey&&t.activeItem&&t.activeItemIndex!==W&&t.activeItem._selectViaInteraction()}}_handleOverlayKeydown(e){e.keyCode===27&&!N(e)&&(e.preventDefault(),this.close())}_onFocus(){this.disabled||(this._focused=!0,this.stateChanges.next())}_onBlur(){this._focused=!1,this._keyManager?.cancelTypeahead(),!this.disabled&&!this.panelOpen&&(this._onTouched(),this._changeDetectorRef.markForCheck(),this.stateChanges.next())}get empty(){return!this._selectionModel||this._selectionModel.isEmpty()}_initializeSelection(){Promise.resolve().then(()=>{this.ngControl&&(this._value=this.ngControl.value),this._setSelectionByValue(this._value),this.stateChanges.next()})}_setSelectionByValue(e){if(this.options.forEach(t=>t.setInactiveStyles()),this._selectionModel.clear(),this.multiple&&e)Array.isArray(e),e.forEach(t=>this._selectOptionByValue(t)),this._sortValues();else{let t=this._selectOptionByValue(e);t?this._keyManager.updateActiveItem(t):this.panelOpen||this._keyManager.updateActiveItem(-1)}this._changeDetectorRef.markForCheck()}_selectOptionByValue(e){let t=this.options.find(n=>{if(this._selectionModel.isSelected(n))return!1;try{return(n.value!=null||this.canSelectNullableOptions)&&this._compareWith(n.value,e)}catch{return!1}});return t&&this._selectionModel.select(t),t}_assignValue(e){return e!==this._value||this._multiple&&Array.isArray(e)?(this.options&&this._setSelectionByValue(e),this._value=e,!0):!1}_skipPredicate=e=>this.panelOpen?!1:e.disabled;_getOverlayWidth(e){return this.panelWidth==="auto"?(e instanceof ge?e.elementRef:e||this._elementRef).nativeElement.getBoundingClientRect().width:this.panelWidth===null?"":this.panelWidth}_syncParentProperties(){if(this.options)for(let e of this.options)e._changeDetectorRef.markForCheck()}_initKeyManager(){this._keyManager=new rt(this.options).withTypeAhead(this.typeaheadDebounceInterval).withVerticalOrientation().withHorizontalOrientation(this._isRtl()?"rtl":"ltr").withHomeAndEnd().withPageUpDown().withAllowedModifierKeys(["shiftKey"]).skipPredicate(this._skipPredicate),this._keyManager.tabOut.subscribe(()=>{this.panelOpen&&(!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction(),this.focus(),this.close())}),this._keyManager.change.subscribe(()=>{this._panelOpen&&this.panel?this._scrollOptionIntoView(this._keyManager.activeItemIndex||0):!this._panelOpen&&!this.multiple&&this._keyManager.activeItem&&this._keyManager.activeItem._selectViaInteraction()})}_resetOptions(){let e=K(this.options.changes,this._destroy);this.optionSelectionChanges.pipe(T(e)).subscribe(t=>{this._onSelect(t.source,t.isUserInput),t.isUserInput&&!this.multiple&&this._panelOpen&&(this.close(),this.focus())}),K(...this.options.map(t=>t._stateChanges)).pipe(T(e)).subscribe(()=>{this._changeDetectorRef.detectChanges(),this.stateChanges.next()})}_onSelect(e,t){let n=this._selectionModel.isSelected(e);!this.canSelectNullableOptions&&e.value==null&&!this._multiple?(e.deselect(),this._selectionModel.clear(),this.value!=null&&this._propagateChanges(e.value)):(n!==e.selected&&(e.selected?this._selectionModel.select(e):this._selectionModel.deselect(e)),t&&this._keyManager.setActiveItem(e),this.multiple&&(this._sortValues(),t&&this.focus())),n!==this._selectionModel.isSelected(e)&&this._propagateChanges(),this.stateChanges.next()}_sortValues(){if(this.multiple){let e=this.options.toArray();this._selectionModel.sort((t,n)=>this.sortComparator?this.sortComparator(t,n,e):e.indexOf(t)-e.indexOf(n)),this.stateChanges.next()}}_propagateChanges(e){let t;this.multiple?t=this.selected.map(n=>n.value):t=this.selected?this.selected.value:e,this._value=t,this.valueChange.emit(t),this._onChange(t),this.selectionChange.emit(this._getChangeEvent(t)),this._changeDetectorRef.markForCheck()}_highlightCorrectOption(){if(this._keyManager)if(this.empty){let e=-1;for(let t=0;t<this.options.length;t++)if(!this.options.get(t).disabled){e=t;break}this._keyManager.setActiveItem(e)}else this._keyManager.setActiveItem(this._selectionModel.selected[0])}_canOpen(){return!this._panelOpen&&!this.disabled&&this.options?.length>0&&!!this._overlayDir}focus(e){this._elementRef.nativeElement.focus(e)}_getPanelAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||null,t=e?e+" ":"";return this.ariaLabelledby?t+this.ariaLabelledby:e}_getAriaActiveDescendant(){return this.panelOpen&&this._keyManager&&this._keyManager.activeItem?this._keyManager.activeItem.id:null}_getTriggerAriaLabelledby(){if(this.ariaLabel)return null;let e=this._parentFormField?.getLabelId()||"";return this.ariaLabelledby&&(e+=" "+this.ariaLabelledby),e||(e=this._valueId),e}get describedByIds(){return this._elementRef.nativeElement.getAttribute("aria-describedby")?.split(" ")||[]}setDescribedByIds(e){let t=this._elementRef.nativeElement;e.length?t.setAttribute("aria-describedby",e.join(" ")):t.removeAttribute("aria-describedby")}onContainerClick(e){let t=nt(e);t&&(t.tagName==="MAT-OPTION"||t.classList.contains("cdk-overlay-backdrop")||t.closest(".mat-mdc-select-panel"))||(this.focus(),this.open())}get shouldLabelFloat(){return this.panelOpen||!this.empty||this.focused&&!!this.placeholder}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=E({type:i,selectors:[["mat-select"]],contentQueries:function(t,n,a){if(t&1&&Ve(a,Bt,5)(a,B,5)(a,xe,5),t&2){let d;w(d=O())&&(n.customTrigger=d.first),w(d=O())&&(n.options=d),w(d=O())&&(n.optionGroups=d)}},viewQuery:function(t,n){if(t&1&&U(tn,5)(nn,5)(_e,5),t&2){let a;w(a=O())&&(n.trigger=a.first),w(a=O())&&(n.panel=a.first),w(a=O())&&(n._overlayDir=a.first)}},hostAttrs:["role","combobox","aria-haspopup","listbox",1,"mat-mdc-select"],hostVars:21,hostBindings:function(t,n){t&1&&f("keydown",function(d){return n._handleKeydown(d)})("focus",function(){return n._onFocus()})("blur",function(){return n._onBlur()}),t&2&&(V("id",n.id)("tabindex",n.disabled?-1:n.tabIndex)("aria-controls",n.panelOpen?n.id+"-panel":null)("aria-expanded",n.panelOpen)("aria-label",n.ariaLabel||null)("aria-required",n.required.toString())("aria-disabled",n.disabled.toString())("aria-invalid",n.errorState)("aria-activedescendant",n._getAriaActiveDescendant()),C("mat-mdc-select-disabled",n.disabled)("mat-mdc-select-invalid",n.errorState)("mat-mdc-select-required",n.required)("mat-mdc-select-empty",n.empty)("mat-mdc-select-multiple",n.multiple)("mat-select-open",n.panelOpen))},inputs:{userAriaDescribedBy:[0,"aria-describedby","userAriaDescribedBy"],panelClass:"panelClass",disabled:[2,"disabled","disabled",M],disableRipple:[2,"disableRipple","disableRipple",M],tabIndex:[2,"tabIndex","tabIndex",e=>e==null?0:ue(e)],hideSingleSelectionIndicator:[2,"hideSingleSelectionIndicator","hideSingleSelectionIndicator",M],placeholder:"placeholder",required:[2,"required","required",M],multiple:[2,"multiple","multiple",M],disableOptionCentering:[2,"disableOptionCentering","disableOptionCentering",M],compareWith:"compareWith",value:"value",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],errorStateMatcher:"errorStateMatcher",typeaheadDebounceInterval:[2,"typeaheadDebounceInterval","typeaheadDebounceInterval",ue],sortComparator:"sortComparator",id:"id",panelWidth:"panelWidth",canSelectNullableOptions:[2,"canSelectNullableOptions","canSelectNullableOptions",M]},outputs:{openedChange:"openedChange",_openedStream:"opened",_closedStream:"closed",selectionChange:"selectionChange",valueChange:"valueChange"},exportAs:["matSelect"],features:[X([{provide:pt,useExisting:i},{provide:ye,useExisting:i}]),Se],ngContentSelectors:an,decls:11,vars:10,consts:[["fallbackOverlayOrigin","cdkOverlayOrigin","trigger",""],["panel",""],["cdk-overlay-origin","",1,"mat-mdc-select-trigger",3,"click"],[1,"mat-mdc-select-value"],[1,"mat-mdc-select-placeholder","mat-mdc-select-min-line"],[1,"mat-mdc-select-value-text"],[1,"mat-mdc-select-arrow-wrapper"],[1,"mat-mdc-select-arrow"],["viewBox","0 0 24 24","width","24px","height","24px","focusable","false","aria-hidden","true"],["d","M7 10l5 5 5-5z"],["cdk-connected-overlay","","cdkConnectedOverlayHasBackdrop","","cdkConnectedOverlayBackdropClass","cdk-overlay-transparent-backdrop",3,"detach","backdropClick","overlayKeydown","cdkConnectedOverlayDisableClose","cdkConnectedOverlayPanelClass","cdkConnectedOverlayScrollStrategy","cdkConnectedOverlayOrigin","cdkConnectedOverlayPositions","cdkConnectedOverlayWidth","cdkConnectedOverlayFlexibleDimensions","cdkConnectedOverlayUsePopover"],[1,"mat-mdc-select-min-line"],["role","listbox","tabindex","-1",1,"mat-mdc-select-panel","mdc-menu-surface","mdc-menu-surface--open",3,"keydown"]],template:function(t,n){if(t&1&&(Y(on),l(0,"div",2,0),f("click",function(){return n.open()}),l(3,"div",3),h(4,rn,2,1,"span",4)(5,cn,3,1,"span",5),r(),l(6,"div",6)(7,"div",7),we(),l(8,"svg",8),v(9,"path",9),r()()()(),De(10,dn,3,16,"ng-template",10),f("detach",function(){return n.close()})("backdropClick",function(){return n.close()})("overlayKeydown",function(d){return n._handleOverlayKeydown(d)})),t&2){let a=Le(1);c(3),V("id",n._valueId),c(),u(n.empty?4:5),c(6),g("cdkConnectedOverlayDisableClose",!0)("cdkConnectedOverlayPanelClass",n._overlayPanelClass)("cdkConnectedOverlayScrollStrategy",n._scrollStrategy)("cdkConnectedOverlayOrigin",n._preferredOverlayOrigin||a)("cdkConnectedOverlayPositions",n._positions)("cdkConnectedOverlayWidth",n._overlayWidth)("cdkConnectedOverlayFlexibleDimensions",!0)("cdkConnectedOverlayUsePopover",n._popoverLocation)}},dependencies:[ge,_e],styles:[`@keyframes _mat-select-enter {
  from {
    opacity: 0;
    transform: scaleY(0.8);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@keyframes _mat-select-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-select {
  display: inline-block;
  width: 100%;
  outline: none;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: var(--mat-select-enabled-trigger-text-color, var(--mat-sys-on-surface));
  font-family: var(--mat-select-trigger-text-font, var(--mat-sys-body-large-font));
  line-height: var(--mat-select-trigger-text-line-height, var(--mat-sys-body-large-line-height));
  font-size: var(--mat-select-trigger-text-size, var(--mat-sys-body-large-size));
  font-weight: var(--mat-select-trigger-text-weight, var(--mat-sys-body-large-weight));
  letter-spacing: var(--mat-select-trigger-text-tracking, var(--mat-sys-body-large-tracking));
}

div.mat-mdc-select-panel {
  box-shadow: var(--mat-select-container-elevation-shadow, 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12));
}

.mat-mdc-select-disabled {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-select-disabled .mat-mdc-select-placeholder {
  color: var(--mat-select-disabled-trigger-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}

.mat-mdc-select-trigger {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.mat-mdc-select-disabled .mat-mdc-select-trigger {
  -webkit-user-select: none;
  user-select: none;
  cursor: default;
}

.mat-mdc-select-value {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mat-mdc-select-value-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mat-mdc-select-arrow-wrapper {
  height: 24px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
}
.mat-form-field-appearance-fill .mdc-text-field--no-label .mat-mdc-select-arrow-wrapper {
  transform: none;
}

.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-invalid .mat-mdc-select-arrow,
.mat-form-field-invalid:not(.mat-form-field-disabled) .mat-mdc-form-field-infix::after {
  color: var(--mat-select-invalid-arrow-color, var(--mat-sys-error));
}

.mat-mdc-select-arrow {
  width: 10px;
  height: 5px;
  position: relative;
  color: var(--mat-select-enabled-arrow-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field.mat-focused .mat-mdc-select-arrow {
  color: var(--mat-select-focused-arrow-color, var(--mat-sys-primary));
}
.mat-mdc-form-field .mat-mdc-select.mat-mdc-select-disabled .mat-mdc-select-arrow {
  color: var(--mat-select-disabled-arrow-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-select-open .mat-mdc-select-arrow {
  transform: rotate(180deg);
}
.mat-form-field-animations-enabled .mat-mdc-select-arrow {
  transition: transform 80ms linear;
}
.mat-mdc-select-arrow svg {
  fill: currentColor;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
@media (forced-colors: active) {
  .mat-mdc-select-arrow svg {
    fill: CanvasText;
  }
  .mat-mdc-select-disabled .mat-mdc-select-arrow svg {
    fill: GrayText;
  }
}

div.mat-mdc-select-panel {
  width: 100%;
  max-height: 275px;
  outline: 0;
  overflow: auto;
  padding: 8px 0;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
  background-color: var(--mat-select-panel-background-color, var(--mat-sys-surface-container));
}
@media (forced-colors: active) {
  div.mat-mdc-select-panel {
    outline: solid 1px;
  }
}
.cdk-overlay-pane:not(.mat-mdc-select-panel-above) div.mat-mdc-select-panel {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  transform-origin: top center;
}
.mat-mdc-select-panel-above div.mat-mdc-select-panel {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  transform-origin: bottom center;
}

.mat-select-panel-animations-enabled {
  animation: _mat-select-enter 120ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-select-panel-animations-enabled.mat-select-panel-exit {
  animation: _mat-select-exit 100ms linear;
}

.mat-mdc-select-placeholder {
  transition: color 400ms 133.3333333333ms cubic-bezier(0.25, 0.8, 0.25, 1);
  color: var(--mat-select-placeholder-text-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-form-field:not(.mat-form-field-animations-enabled) .mat-mdc-select-placeholder, ._mat-animation-noopable .mat-mdc-select-placeholder {
  transition: none;
}
.mat-form-field-hide-placeholder .mat-mdc-select-placeholder {
  color: transparent;
  -webkit-text-fill-color: transparent;
  transition: none;
  display: block;
}

.mat-mdc-form-field-type-mat-select:not(.mat-form-field-disabled) .mat-mdc-text-field-wrapper {
  cursor: pointer;
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mat-mdc-floating-label {
  max-width: calc(100% - 18px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-fill .mdc-floating-label--float-above {
  max-width: calc(100% / 0.75 - 24px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-notched-outline__notch {
  max-width: calc(100% - 60px);
}
.mat-mdc-form-field-type-mat-select.mat-form-field-appearance-outline .mdc-text-field--label-floating .mdc-notched-outline__notch {
  max-width: calc(100% - 24px);
}

.mat-mdc-select-min-line:empty::before {
  content: " ";
  white-space: pre;
  width: 1px;
  display: inline-block;
  visibility: hidden;
}

.mat-form-field-appearance-fill .mat-mdc-select-arrow-wrapper {
  transform: var(--mat-select-arrow-transform, translateY(-8px));
}
`],encapsulation:2,changeDetection:0})}return i})(),qt=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275dir=Ie({type:i,selectors:[["mat-select-trigger"]],features:[X([{provide:Bt,useExisting:i}])]})}return i})(),jt=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=R({type:i});static \u0275inj=A({imports:[Pt,ve,z,Et,ne,ve]})}return i})();var un=(i,o)=>o.value,fn=(i,o)=>o.id;function gn(i,o){i&1&&(l(0,"div",8),v(1,"mat-spinner",10),r())}function _n(i,o){if(i&1){let e=I();l(0,"button",25),f("click",function(){let n=_(e).$implicit,a=p(2);return b(a.mealType=n.value)}),l(1,"mat-icon"),s(2),r(),l(3,"span"),s(4),r()()}if(i&2){let e=o.$implicit,t=p(2);C("active",t.mealType===e.value),c(2),D(e.icon),c(2),D(e.label)}}function bn(i,o){i&1&&s(0),i&2&&k(" ",o.name," ")}function yn(i,o){i&1&&(l(0,"span",31),s(1,"Select a food..."),r())}function xn(i,o){if(i&1&&(l(0,"mat-option",32)(1,"div",35)(2,"span",36),s(3),r(),l(4,"span",37),s(5),r()()()),i&2){let e=o.$implicit;g("value",e.id),c(3),D(e.name),c(2),k("",e.calories," kcal")}}function vn(i,o){if(i&1){let e=I();l(0,"button",38),f("click",function(){_(e);let n=p().$index,a=p(2);return b(a.removeEntry(n))}),l(1,"mat-icon"),s(2,"delete_outline"),r()()}}function Cn(i,o){if(i&1){let e=I();l(0,"div",34)(1,"div",39)(2,"span",40)(3,"mat-icon"),s(4,"local_fire_department"),r(),s(5),r(),l(6,"span",41)(7,"mat-icon"),s(8,"fitness_center"),r(),s(9),r(),l(10,"span",42)(11,"mat-icon"),s(12,"grain"),r(),s(13),r(),l(14,"span",43)(15,"mat-icon"),s(16,"water_drop"),r(),s(17),r()(),l(18,"div",44)(19,"button",45),f("click",function(){_(e);let n=p().$index,a=p(2);return b(a.decrementQty(n))}),l(20,"mat-icon"),s(21,"remove"),r()(),l(22,"input",46),he("ngModelChange",function(n){_(e);let a=p().$implicit;return me(a.quantity,n)||(a.quantity=n),b(n)}),r(),l(23,"button",47),f("click",function(){_(e);let n=p().$index,a=p(2);return b(a.incrementQty(n))}),l(24,"mat-icon"),s(25,"add"),r()()()()}if(i&2){let e=o,t=p(),n=t.$implicit,a=t.$index;c(5),k("",e.calories," kcal "),c(4),k("",e.protein,"g "),c(4),k("",e.carb,"g "),c(4),k("",e.fat,"g "),c(2),g("disabled",n.quantity<=.1),c(3),pe("ngModel",n.quantity),g("name","qty_"+a)}}function kn(i,o){if(i&1){let e=I();l(0,"div",26)(1,"div",27)(2,"mat-form-field",28)(3,"mat-label"),s(4,"Choose food"),r(),l(5,"mat-icon",29),s(6,"search"),r(),l(7,"mat-select",30),he("ngModelChange",function(n){let a=_(e).$implicit;return me(a.foodId,n)||(a.foodId=n),b(n)}),l(8,"mat-select-trigger"),h(9,bn,1,1)(10,yn,2,0,"span",31),r(),G(11,xn,6,3,"mat-option",32,fn),r()(),h(13,vn,3,0,"button",33),r(),h(14,Cn,26,7,"div",34),r()}if(i&2){let e,t,n=o.$implicit,a=o.$index,d=p(2);C("selected",n.foodId),c(7),pe("ngModel",n.foodId),g("name","food_"+a),c(2),u((e=d.getFood(n.foodId))?9:10,e),c(2),$(d.foods()),c(2),u(d.entries().length>1?13:-1),c(),u((t=d.getFood(n.foodId))?14:-1,t)}}function Mn(i,o){i&1&&(l(0,"div",19)(1,"p"),s(2,"No foods yet \u2014 add some first!"),r(),l(3,"button",48)(4,"mat-icon"),s(5,"add_circle"),r(),s(6," Add Food "),r()())}function wn(i,o){if(i&1&&(l(0,"div",22)(1,"mat-icon"),s(2,"error_outline"),r(),l(3,"span"),s(4),r()()),i&2){let e=p(2);c(4),D(e.errorMessage())}}function On(i,o){i&1&&v(0,"mat-spinner",24)}function Sn(i,o){i&1&&(Ae(0),s(1,"Log Meal"),Fe())}function En(i,o){if(i&1){let e=I();l(0,"form",11),f("ngSubmit",function(){_(e);let n=p();return b(n.onSubmit())}),l(1,"div",12),G(2,_n,5,4,"button",13,un),r(),l(4,"div",14)(5,"span",15),s(6,"Food Items"),r(),l(7,"button",16),f("click",function(){_(e);let n=p();return b(n.addEntry())}),l(8,"mat-icon"),s(9,"add"),r(),s(10," Add item "),r()(),l(11,"div",17),G(12,kn,15,7,"div",18,Te),r(),h(14,Mn,7,0,"div",19),l(15,"div",20)(16,"span"),s(17,"Estimated Total"),r(),l(18,"span",21),s(19),r()(),h(20,wn,5,1,"div",22),l(21,"button",23),h(22,On,1,0,"mat-spinner",24)(23,Sn,2,0,"ng-container"),r()()}if(i&2){let e=p();c(2),$(e.mealTypes),c(10),$(e.entries()),c(2),u(e.foods().length===0?14:-1),c(5),k("",e.getTotalCalories()," kcal"),c(),u(e.errorMessage()?20:-1),c(),g("disabled",e.loading()),c(),u(e.loading()?22:23)}}var Kt=class i{constructor(o,e,t){this.supabase=o;this.router=e;this.snackBar=t}mealType="breakfast";foods=x([]);entries=x([{foodId:0,quantity:1}]);loading=x(!1);loadingFoods=x(!0);errorMessage=x("");mealTypes=[{value:"breakfast",label:"Breakfast",icon:"free_breakfast"},{value:"lunch",label:"Lunch",icon:"lunch_dining"},{value:"dinner",label:"Dinner",icon:"dinner_dining"},{value:"snack",label:"Snack",icon:"cookie"}];ngOnInit(){this.loadFoods()}async loadFoods(){try{let o=await this.supabase.getFoods();this.foods.set(o)}catch(o){console.error("Failed to load foods",o)}finally{this.loadingFoods.set(!1)}}addEntry(){this.entries.update(o=>[...o,{foodId:0,quantity:1}])}removeEntry(o){this.entries.update(e=>e.filter((t,n)=>n!==o))}getFoodName(o){return this.foods().find(e=>e.id===o)?.name??""}getFood(o){return this.foods().find(e=>e.id===o)}incrementQty(o){this.entries.update(e=>e.map((t,n)=>n===o?re(ae({},t),{quantity:Math.round((t.quantity+.5)*10)/10}):t))}decrementQty(o){this.entries.update(e=>e.map((t,n)=>n===o?re(ae({},t),{quantity:Math.max(.1,Math.round((t.quantity-.5)*10)/10)}):t))}getTotalCalories(){let o=0;for(let e of this.entries()){let t=this.foods().find(n=>n.id===e.foodId);t&&(o+=t.calories*e.quantity)}return Math.round(o)}async onSubmit(){let o=this.entries().filter(e=>e.foodId&&e.quantity>0);if(o.length===0){this.errorMessage.set("Please add at least one food item.");return}this.loading.set(!0),this.errorMessage.set("");try{let e=await this.supabase.addMeal(this.mealType);for(let t of o)await this.supabase.addMealItem(e.id,t.foodId,t.quantity);this.snackBar.open("Meal logged successfully!","OK",{duration:3e3}),this.router.navigate(["/dashboard"])}catch(e){let t=e instanceof Error?e.message:"Failed to log meal";this.errorMessage.set(t)}finally{this.loading.set(!1)}}static \u0275fac=function(e){return new(e||i)(Q(Ke),Q(We),Q(Tt))};static \u0275cmp=E({type:i,selectors:[["app-add-meal"]],decls:19,vars:1,consts:[[1,"top-nav"],["mat-icon-button","","routerLink","/dashboard"],[1,"nav-title"],[2,"width","40px"],[1,"page"],[1,"form-card"],[1,"card-header"],[1,"icon-circle"],[1,"loading-center"],[1,"meal-form"],["diameter","36"],[1,"meal-form",3,"ngSubmit"],[1,"type-grid"],["type","button",1,"type-btn",3,"active"],[1,"entries-header"],[1,"section-label"],["type","button",1,"add-entry-btn",3,"click"],[1,"entries-list"],[1,"food-card",3,"selected"],[1,"empty-foods"],[1,"total-bar"],[1,"total-val"],[1,"error-msg"],["mat-flat-button","","type","submit",1,"full-width","submit-btn",3,"disabled"],["diameter","22"],["type","button",1,"type-btn",3,"click"],[1,"food-card"],[1,"food-card-top"],["appearance","outline",1,"food-field-styled"],["matPrefix","",1,"field-icon"],["panelClass","food-select-panel",3,"ngModelChange","ngModel","name"],[1,"placeholder-text"],[3,"value"],["mat-icon-button","","type","button",1,"remove-btn"],[1,"food-card-body"],[1,"option-row"],[1,"option-name"],[1,"option-kcal"],["mat-icon-button","","type","button",1,"remove-btn",3,"click"],[1,"food-macros"],[1,"macro-tag","cal"],[1,"macro-tag","pro"],[1,"macro-tag","carb"],[1,"macro-tag","fat"],[1,"qty-stepper"],["type","button",1,"step-btn",3,"click","disabled"],["type","number","min","0.1","step","0.1",1,"step-value",3,"ngModelChange","ngModel","name"],["type","button",1,"step-btn",3,"click"],["mat-flat-button","","type","button","routerLink","/add-food",1,"outline-small"]],template:function(e,t){e&1&&(l(0,"nav",0)(1,"button",1)(2,"mat-icon"),s(3,"arrow_back"),r()(),l(4,"span",2),s(5,"Log Meal"),r(),v(6,"div",3),r(),l(7,"div",4)(8,"div",5)(9,"div",6)(10,"div",7)(11,"mat-icon"),s(12,"restaurant"),r()(),l(13,"h2"),s(14,"Log a Meal"),r(),l(15,"p"),s(16,"Select foods and quantities"),r()(),h(17,gn,2,0,"div",8)(18,En,24,5,"form",9),r()()),e&2&&(c(17),u(t.loadingFoods()?17:18))},dependencies:[Be,tt,Xe,He,Je,$e,Ye,et,Ue,Z,je,qe,ne,ht,ct,dt,gt,jt,Wt,qt,B,Ct,vt,yt,Ot,wt,At,Mt,kt],styles:[".top-nav[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;padding:12px 20px;background:#fff;border-bottom:1px solid #f0f0f0;position:sticky;top:0;z-index:100}.nav-title[_ngcontent-%COMP%]{font-weight:700;font-size:18px;color:#1a1a2e}.page[_ngcontent-%COMP%]{max-width:560px;margin:28px auto;padding:0 16px}.form-card[_ngcontent-%COMP%]{background:#fff;border-radius:20px;padding:32px 28px;box-shadow:0 2px 12px #0000000f}.card-header[_ngcontent-%COMP%]{text-align:center;margin-bottom:24px}.icon-circle[_ngcontent-%COMP%]{width:56px;height:56px;margin:0 auto 12px;border-radius:50%;background:linear-gradient(135deg,#6c5ce7,#a29bfe);display:flex;align-items:center;justify-content:center}.icon-circle[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#fff;font-size:26px;width:26px;height:26px}.card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:22px;font-weight:700;color:#1a1a2e}.card-header[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:4px 0 0;color:#888;font-size:14px}.loading-center[_ngcontent-%COMP%]{display:flex;justify-content:center;padding:40px}.meal-form[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px}.type-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px}.type-btn[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:4px;padding:14px 8px;border-radius:14px;border:2px solid #eee;background:#fafafa;cursor:pointer;transition:all .2s;font-size:12px;font-weight:600;color:#888}.type-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:24px;width:24px;height:24px;color:#aaa;transition:color .2s}.type-btn.active[_ngcontent-%COMP%]{border-color:#6c5ce7;background:#f0edff;color:#6c5ce7}.type-btn.active[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:#6c5ce7}.type-btn[_ngcontent-%COMP%]:hover:not(.active){border-color:#ccc}.entries-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}.section-label[_ngcontent-%COMP%]{font-weight:700;font-size:15px;color:#1a1a2e}.add-entry-btn[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px;padding:6px 14px 6px 10px;border-radius:10px;border:1.5px dashed #6c5ce7;background:transparent;color:#6c5ce7;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s}.add-entry-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.add-entry-btn[_ngcontent-%COMP%]:hover{background:#f0edff}.entries-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px}.food-card[_ngcontent-%COMP%]{border:1.5px solid #eee;border-radius:16px;padding:16px;background:#fafbfd;transition:all .25s}.food-card.selected[_ngcontent-%COMP%]{border-color:#d4cff7;background:#fcfbff;box-shadow:0 2px 12px #6c5ce70f}.food-card-top[_ngcontent-%COMP%]{display:flex;align-items:flex-start;gap:8px}.food-field-styled[_ngcontent-%COMP%]{flex:1}.food-field-styled[_ngcontent-%COMP%]   .field-icon[_ngcontent-%COMP%]{color:#aaa;font-size:20px;width:20px;height:20px}.remove-btn[_ngcontent-%COMP%]{color:#ccc!important;margin-top:8px;transition:color .2s}.remove-btn[_ngcontent-%COMP%]:hover{color:#d63031!important}.food-card-body[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-top:8px;padding-top:12px;border-top:1px solid #f0f0f0;gap:12px}.food-macros[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:6px}.macro-tag[_ngcontent-%COMP%]{display:inline-flex;align-items:center;gap:3px;padding:4px 10px;border-radius:20px;font-size:11.5px;font-weight:600;line-height:1}.macro-tag[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:13px;width:13px;height:13px}.macro-tag.cal[_ngcontent-%COMP%]{background:#fff3e6;color:#e67e22}.macro-tag.pro[_ngcontent-%COMP%]{background:#e8f5e9;color:#388e3c}.macro-tag.carb[_ngcontent-%COMP%]{background:#e3f2fd;color:#1976d2}.macro-tag.fat[_ngcontent-%COMP%]{background:#fff8e1;color:#f9a825}.qty-stepper[_ngcontent-%COMP%]{display:flex;align-items:center;gap:0;background:#fff;border:1.5px solid #eee;border-radius:12px;overflow:hidden;flex-shrink:0}.step-btn[_ngcontent-%COMP%]{width:36px;height:36px;display:flex;align-items:center;justify-content:center;border:none;background:transparent;cursor:pointer;color:#6c5ce7;transition:background .15s}.step-btn[_ngcontent-%COMP%]:hover:not(:disabled){background:#f0edff}.step-btn[_ngcontent-%COMP%]:disabled{color:#ddd;cursor:default}.step-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px}.step-value[_ngcontent-%COMP%]{width:44px;text-align:center;font-size:15px;font-weight:700;color:#1a1a2e;border:none;border-left:1px solid #eee;border-right:1px solid #eee;outline:none;padding:6px 0;background:transparent;-moz-appearance:textfield}.step-value[_ngcontent-%COMP%]::-webkit-outer-spin-button, .step-value[_ngcontent-%COMP%]::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}  .food-select-panel{border-radius:16px!important;margin-top:6px;box-shadow:0 12px 40px #00000026!important;border:1px solid #ece9ff;max-height:320px!important;overflow-y:auto;background:#fff!important}  .food-select-panel .mat-mdc-option{padding:0!important;min-height:auto!important;border-bottom:1px solid #f5f5f5;transition:background .15s}  .food-select-panel .mat-mdc-option:last-child{border-bottom:none}  .food-select-panel .mat-mdc-option:hover{background:#f8f7ff!important}  .food-select-panel .mat-mdc-option.mdc-list-item--selected{background:#f0edff!important}  .food-select-panel .mat-mdc-option .mdc-list-item__primary-text{width:100%}  .food-select-panel .option-row{display:flex;justify-content:space-between;align-items:center;width:100%;gap:12px;padding:14px 18px}  .food-select-panel .option-name{font-weight:600;color:#1a1a2e;font-size:14px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1;min-width:0}  .food-select-panel .option-kcal{font-size:11.5px;font-weight:700;color:#6c5ce7;background:#f0edff;padding:4px 12px;border-radius:20px;white-space:nowrap;flex-shrink:0}  .food-select-panel .mat-mdc-option.mdc-list-item--selected .option-name{color:#6c5ce7}  .food-select-panel .mat-mdc-option.mdc-list-item--selected .option-kcal{background:#6c5ce7;color:#fff}  .food-field-styled .mat-mdc-select-value-text{font-weight:600;color:#1a1a2e}.placeholder-text[_ngcontent-%COMP%]{color:#aaa;font-weight:400}.empty-foods[_ngcontent-%COMP%]{text-align:center;padding:20px;color:#888}.outline-small[_ngcontent-%COMP%]{background:#f0edff!important;color:#6c5ce7!important;border-radius:10px}.total-bar[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:#f7f8fc;border-radius:12px;font-weight:600;color:#1a1a2e}.total-val[_ngcontent-%COMP%]{font-size:20px;font-weight:800;color:#6c5ce7}.full-width[_ngcontent-%COMP%]{width:100%}.submit-btn[_ngcontent-%COMP%]{height:50px;font-size:16px;font-weight:600;border-radius:14px;background:#6c5ce7;color:#fff;margin-top:4px}.submit-btn[_ngcontent-%COMP%]:hover:not(:disabled){background:#5a4bd1}.error-msg[_ngcontent-%COMP%]{display:flex;align-items:center;gap:8px;color:#d63031;font-size:13px;padding:10px 14px;background:#fff0f0;border-radius:10px;border:1px solid #ffd4d4}.error-msg[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:18px;width:18px;height:18px;color:#d63031}@media(max-width:500px){.type-grid[_ngcontent-%COMP%]{grid-template-columns:repeat(2,1fr)}.food-card-body[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}.qty-stepper[_ngcontent-%COMP%]{align-self:flex-end}.food-macros[_ngcontent-%COMP%]{gap:4px}.macro-tag[_ngcontent-%COMP%]{font-size:10.5px;padding:3px 8px}.form-card[_ngcontent-%COMP%]{padding:24px 20px}}"]})};export{Kt as AddMealComponent};
