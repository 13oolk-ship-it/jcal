import{d as we,h as Ae,k as Te,v as K,w as Tt,x as Me,z as H}from"./chunk-5QXTCHQP.js";import{Aa as it,Ca as le,Cb as ct,D as nt,Da as ue,Db as N,E as ie,Ea as pe,Eb as P,F as re,Fb as At,Gb as he,Gc as U,Hb as ve,Hc as z,Ib as B,Lb as dt,M as at,N as se,P as ot,R as ce,Sb as _e,Tb as mt,Ub as j,V as d,Va as O,W as y,Wb as ge,Xb as ye,Y as l,Yb as xe,_ as r,a as m,ab as rt,ac as Ee,bb as be,bc as lt,cc as M,d as qt,dc as ut,f as Jt,fa as xt,g as _,ga as de,h as te,ha as L,ia as x,ib as I,jb as w,kb as R,m as ee,ma as u,mb as st,nb as fe,q as $,qa as Et,qb as wt,r as ne,rc as Ie,ta as me,u as ae,vb as T,xa as E,ya as It,z as oe}from"./chunk-G7ZQJZE3.js";function Y(n){return n.buttons===0||n.detail===0}function Q(n){let o=n.touches&&n.touches[0]||n.changedTouches&&n.changedTouches[0];return!!o&&o.identifier===-1&&(o.radiusX==null||o.radiusX===1)&&(o.radiusY==null||o.radiusY===1)}var Mt;function ke(){if(Mt==null){let n=typeof document<"u"?document.head:null;Mt=!!(n&&(n.createShadowRoot||n.attachShadow))}return Mt}function kt(n){if(ke()){let o=n.getRootNode?n.getRootNode():null;if(typeof ShadowRoot<"u"&&ShadowRoot&&o instanceof ShadowRoot)return o}return null}function g(n){return n.composedPath?n.composedPath()[0]:n.target}var Dt;try{Dt=typeof Intl<"u"&&Intl.v8BreakIterator}catch{Dt=!1}var p=(()=>{class n{_platformId=r(le);isBrowser=this._platformId?Ae(this._platformId):typeof document=="object"&&!!document;EDGE=this.isBrowser&&/(edge)/i.test(navigator.userAgent);TRIDENT=this.isBrowser&&/(msie|trident)/i.test(navigator.userAgent);BLINK=this.isBrowser&&!!(window.chrome||Dt)&&typeof CSS<"u"&&!this.EDGE&&!this.TRIDENT;WEBKIT=this.isBrowser&&/AppleWebKit/i.test(navigator.userAgent)&&!this.BLINK&&!this.EDGE&&!this.TRIDENT;IOS=this.isBrowser&&/iPad|iPhone|iPod/.test(navigator.userAgent)&&!("MSStream"in window);FIREFOX=this.isBrowser&&/(firefox|minefield)/i.test(navigator.userAgent);ANDROID=this.isBrowser&&/android/i.test(navigator.userAgent)&&!this.TRIDENT;SAFARI=this.isBrowser&&/safari/i.test(navigator.userAgent)&&this.WEBKIT;constructor(){}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var X;function De(){if(X==null&&typeof window<"u")try{window.addEventListener("test",null,Object.defineProperty({},"passive",{get:()=>X=!0}))}finally{X=X||!1}return X}function W(n){return De()?n:!!n.capture}function dn(n,o=0){return Ce(n)?Number(n):arguments.length===2?o:0}function Ce(n){return!isNaN(parseFloat(n))&&!isNaN(Number(n))}function k(n){return n instanceof E?n.nativeElement:n}var Oe=new l("cdk-input-modality-detector-options"),Re={ignoreKeys:[18,17,224,91,16]},Ne=650,Ct={passive:!0,capture:!0},Fe=(()=>{class n{_platform=r(p);_listenerCleanups;modalityDetected;modalityChanged;get mostRecentModality(){return this._modality.value}_mostRecentTarget=null;_modality=new te(null);_options;_lastTouchMs=0;_onKeydown=t=>{this._options?.ignoreKeys?.some(e=>e===t.keyCode)||(this._modality.next("keyboard"),this._mostRecentTarget=g(t))};_onMousedown=t=>{Date.now()-this._lastTouchMs<Ne||(this._modality.next(Y(t)?"keyboard":"mouse"),this._mostRecentTarget=g(t))};_onTouchstart=t=>{if(Q(t)){this._modality.next("keyboard");return}this._lastTouchMs=Date.now(),this._modality.next("touch"),this._mostRecentTarget=g(t)};constructor(){let t=r(u),e=r(x),a=r(Oe,{optional:!0});if(this._options=m(m({},Re),a),this.modalityDetected=this._modality.pipe(at(1)),this.modalityChanged=this.modalityDetected.pipe(re()),this._platform.isBrowser){let i=r(rt).createRenderer(null,null);this._listenerCleanups=t.runOutsideAngular(()=>[i.listen(e,"keydown",this._onKeydown,Ct),i.listen(e,"mousedown",this._onMousedown,Ct),i.listen(e,"touchstart",this._onTouchstart,Ct)])}}ngOnDestroy(){this._modality.complete(),this._listenerCleanups?.forEach(t=>t())}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),q=(function(n){return n[n.IMMEDIATE=0]="IMMEDIATE",n[n.EVENTUAL=1]="EVENTUAL",n})(q||{}),Se=new l("cdk-focus-monitor-default-options"),pt=W({passive:!0,capture:!0}),Ot=(()=>{class n{_ngZone=r(u);_platform=r(p);_inputModalityDetector=r(Fe);_origin=null;_lastFocusOrigin=null;_windowFocused=!1;_windowFocusTimeoutId;_originTimeoutId;_originFromTouchInteraction=!1;_elementInfo=new Map;_monitoredElementCount=0;_rootNodeFocusListenerCount=new Map;_detectionMode;_windowFocusListener=()=>{this._windowFocused=!0,this._windowFocusTimeoutId=setTimeout(()=>this._windowFocused=!1)};_document=r(x);_stopInputModalityDetector=new _;constructor(){let t=r(Se,{optional:!0});this._detectionMode=t?.detectionMode||q.IMMEDIATE}_rootNodeFocusAndBlurListener=t=>{let e=g(t);for(let a=e;a;a=a.parentElement)t.type==="focus"?this._onFocus(t,a):this._onBlur(t,a)};monitor(t,e=!1){let a=k(t);if(!this._platform.isBrowser||a.nodeType!==1)return ee();let i=kt(a)||this._document,s=this._elementInfo.get(a);if(s)return e&&(s.checkChildren=!0),s.subject;let c={checkChildren:e,subject:new _,rootNode:i};return this._elementInfo.set(a,c),this._registerGlobalListeners(c),c.subject}stopMonitoring(t){let e=k(t),a=this._elementInfo.get(e);a&&(a.subject.complete(),this._setClasses(e),this._elementInfo.delete(e),this._removeGlobalListeners(a))}focusVia(t,e,a){let i=k(t),s=this._document.activeElement;i===s?this._getClosestElementsInfo(i).forEach(([c,v])=>this._originChanged(c,e,v)):(this._setOrigin(e),typeof i.focus=="function"&&i.focus(a))}ngOnDestroy(){this._elementInfo.forEach((t,e)=>this.stopMonitoring(e))}_getWindow(){return this._document.defaultView||window}_getFocusOrigin(t){return this._origin?this._originFromTouchInteraction?this._shouldBeAttributedToTouch(t)?"touch":"program":this._origin:this._windowFocused&&this._lastFocusOrigin?this._lastFocusOrigin:t&&this._isLastInteractionFromInputLabel(t)?"mouse":"program"}_shouldBeAttributedToTouch(t){return this._detectionMode===q.EVENTUAL||!!t?.contains(this._inputModalityDetector._mostRecentTarget)}_setClasses(t,e){t.classList.toggle("cdk-focused",!!e),t.classList.toggle("cdk-touch-focused",e==="touch"),t.classList.toggle("cdk-keyboard-focused",e==="keyboard"),t.classList.toggle("cdk-mouse-focused",e==="mouse"),t.classList.toggle("cdk-program-focused",e==="program")}_setOrigin(t,e=!1){this._ngZone.runOutsideAngular(()=>{if(this._origin=t,this._originFromTouchInteraction=t==="touch"&&e,this._detectionMode===q.IMMEDIATE){clearTimeout(this._originTimeoutId);let a=this._originFromTouchInteraction?Ne:1;this._originTimeoutId=setTimeout(()=>this._origin=null,a)}})}_onFocus(t,e){let a=this._elementInfo.get(e),i=g(t);!a||!a.checkChildren&&e!==i||this._originChanged(e,this._getFocusOrigin(i),a)}_onBlur(t,e){let a=this._elementInfo.get(e);!a||a.checkChildren&&t.relatedTarget instanceof Node&&e.contains(t.relatedTarget)||(this._setClasses(e),this._emitOrigin(a,null))}_emitOrigin(t,e){t.subject.observers.length&&this._ngZone.run(()=>t.subject.next(e))}_registerGlobalListeners(t){if(!this._platform.isBrowser)return;let e=t.rootNode,a=this._rootNodeFocusListenerCount.get(e)||0;a||this._ngZone.runOutsideAngular(()=>{e.addEventListener("focus",this._rootNodeFocusAndBlurListener,pt),e.addEventListener("blur",this._rootNodeFocusAndBlurListener,pt)}),this._rootNodeFocusListenerCount.set(e,a+1),++this._monitoredElementCount===1&&(this._ngZone.runOutsideAngular(()=>{this._getWindow().addEventListener("focus",this._windowFocusListener)}),this._inputModalityDetector.modalityDetected.pipe(ot(this._stopInputModalityDetector)).subscribe(i=>{this._setOrigin(i,!0)}))}_removeGlobalListeners(t){let e=t.rootNode;if(this._rootNodeFocusListenerCount.has(e)){let a=this._rootNodeFocusListenerCount.get(e);a>1?this._rootNodeFocusListenerCount.set(e,a-1):(e.removeEventListener("focus",this._rootNodeFocusAndBlurListener,pt),e.removeEventListener("blur",this._rootNodeFocusAndBlurListener,pt),this._rootNodeFocusListenerCount.delete(e))}--this._monitoredElementCount||(this._getWindow().removeEventListener("focus",this._windowFocusListener),this._stopInputModalityDetector.next(),clearTimeout(this._windowFocusTimeoutId),clearTimeout(this._originTimeoutId))}_originChanged(t,e,a){this._setClasses(t,e),this._emitOrigin(a,e),this._lastFocusOrigin=e}_getClosestElementsInfo(t){let e=[];return this._elementInfo.forEach((a,i)=>{(i===t||a.checkChildren&&i.contains(t))&&e.push([i,a])}),e}_isLastInteractionFromInputLabel(t){let{_mostRecentTarget:e,mostRecentModality:a}=this._inputModalityDetector;if(a!=="mouse"||!e||e===t||t.nodeName!=="INPUT"&&t.nodeName!=="TEXTAREA"||t.disabled)return!1;let i=t.labels;if(i){for(let s=0;s<i.length;s++)if(i[s].contains(e))return!0}return!1}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Rt(n){return Array.isArray(n)?n:[n]}var Le=new Set,F,bt=(()=>{class n{_platform=r(p);_nonce=r(pe,{optional:!0});_matchMedia;constructor(){this._matchMedia=this._platform.isBrowser&&window.matchMedia?window.matchMedia.bind(window):ln}matchMedia(t){return(this._platform.WEBKIT||this._platform.BLINK)&&mn(t,this._nonce),this._matchMedia(t)}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function mn(n,o){if(!Le.has(n))try{F||(F=document.createElement("style"),o&&F.setAttribute("nonce",o),F.setAttribute("type","text/css"),document.head.appendChild(F)),F.sheet&&(F.sheet.insertRule(`@media ${n} {body{ }}`,0),Le.add(n))}catch(t){console.error(t)}}function ln(n){return{matches:n==="all"||n==="",media:n,addListener:()=>{},removeListener:()=>{}}}var Nt=(()=>{class n{_mediaMatcher=r(bt);_zone=r(u);_queries=new Map;_destroySubject=new _;constructor(){}ngOnDestroy(){this._destroySubject.next(),this._destroySubject.complete()}isMatched(t){return Pe(Rt(t)).some(a=>this._registerQuery(a).mql.matches)}observe(t){let a=Pe(Rt(t)).map(s=>this._registerQuery(s).observable),i=ne(a);return i=ae(i.pipe(ie(1)),i.pipe(at(1),nt(0))),i.pipe($(s=>{let c={matches:!1,breakpoints:{}};return s.forEach(({matches:v,query:A})=>{c.matches=c.matches||v,c.breakpoints[A]=v}),c}))}_registerQuery(t){if(this._queries.has(t))return this._queries.get(t);let e=this._mediaMatcher.matchMedia(t),i={observable:new Jt(s=>{let c=v=>this._zone.run(()=>s.next(v));return e.addListener(c),()=>{e.removeListener(c)}}).pipe(se(e),$(({matches:s})=>({query:t,matches:s})),ot(this._destroySubject)),mql:e};return this._queries.set(t,i),i}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function Pe(n){return n.map(o=>o.split(",")).reduce((o,t)=>o.concat(t)).map(o=>o.trim())}var un=(()=>{class n{create(t){return typeof MutationObserver>"u"?null:new MutationObserver(t)}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var Be=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=w({type:n});static \u0275inj=y({providers:[un]})}return n})();var ze=new l("liveAnnouncerElement",{providedIn:"root",factory:()=>null}),Ke=new l("LIVE_ANNOUNCER_DEFAULT_OPTIONS"),pn=0,bn=(()=>{class n{_ngZone=r(u);_defaultOptions=r(Ke,{optional:!0});_liveElement;_document=r(x);_sanitizer=r(Te);_previousTimeout;_currentPromise;_currentResolve;constructor(){let t=r(ze,{optional:!0});this._liveElement=t||this._createLiveElement()}announce(t,...e){let a=this._defaultOptions,i,s;return e.length===1&&typeof e[0]=="number"?s=e[0]:[i,s]=e,this.clear(),clearTimeout(this._previousTimeout),i||(i=a&&a.politeness?a.politeness:"polite"),s==null&&a&&(s=a.duration),this._liveElement.setAttribute("aria-live",i),this._liveElement.id&&this._exposeAnnouncerToModals(this._liveElement.id),this._ngZone.runOutsideAngular(()=>(this._currentPromise||(this._currentPromise=new Promise(c=>this._currentResolve=c)),clearTimeout(this._previousTimeout),this._previousTimeout=setTimeout(()=>{!t||typeof t=="string"?this._liveElement.textContent=t:Me(this._liveElement,t,this._sanitizer),typeof s=="number"&&(this._previousTimeout=setTimeout(()=>this.clear(),s)),this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0},100),this._currentPromise))}clear(){this._liveElement&&(this._liveElement.textContent="")}ngOnDestroy(){clearTimeout(this._previousTimeout),this._liveElement?.remove(),this._liveElement=null,this._currentResolve?.(),this._currentPromise=this._currentResolve=void 0}_createLiveElement(){let t="cdk-live-announcer-element",e=this._document.getElementsByClassName(t),a=this._document.createElement("div");for(let i=0;i<e.length;i++)e[i].remove();return a.classList.add(t),a.classList.add("cdk-visually-hidden"),a.setAttribute("aria-atomic","true"),a.setAttribute("aria-live","polite"),a.id=`cdk-live-announcer-${pn++}`,this._document.body.appendChild(a),a}_exposeAnnouncerToModals(t){let e=this._document.querySelectorAll('body > .cdk-overlay-container [aria-modal="true"]');for(let a=0;a<e.length;a++){let i=e[a],s=i.getAttribute("aria-owns");s?s.indexOf(t)===-1&&i.setAttribute("aria-owns",s+" "+t):i.setAttribute("aria-owns",t)}}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var D=(function(n){return n[n.NONE=0]="NONE",n[n.BLACK_ON_WHITE=1]="BLACK_ON_WHITE",n[n.WHITE_ON_BLACK=2]="WHITE_ON_BLACK",n})(D||{}),je="cdk-high-contrast-black-on-white",Ue="cdk-high-contrast-white-on-black",Ft="cdk-high-contrast-active",He=(()=>{class n{_platform=r(p);_hasCheckedHighContrastMode=!1;_document=r(x);_breakpointSubscription;constructor(){this._breakpointSubscription=r(Nt).observe("(forced-colors: active)").subscribe(()=>{this._hasCheckedHighContrastMode&&(this._hasCheckedHighContrastMode=!1,this._applyBodyHighContrastModeCssClasses())})}getHighContrastMode(){if(!this._platform.isBrowser)return D.NONE;let t=this._document.createElement("div");t.style.backgroundColor="rgb(1,2,3)",t.style.position="absolute",this._document.body.appendChild(t);let e=this._document.defaultView||window,a=e&&e.getComputedStyle?e.getComputedStyle(t):null,i=(a&&a.backgroundColor||"").replace(/ /g,"");switch(t.remove(),i){case"rgb(0,0,0)":case"rgb(45,50,54)":case"rgb(32,32,32)":return D.WHITE_ON_BLACK;case"rgb(255,255,255)":case"rgb(255,250,239)":return D.BLACK_ON_WHITE}return D.NONE}ngOnDestroy(){this._breakpointSubscription.unsubscribe()}_applyBodyHighContrastModeCssClasses(){if(!this._hasCheckedHighContrastMode&&this._platform.isBrowser&&this._document.body){let t=this._document.body.classList;t.remove(Ft,je,Ue),this._hasCheckedHighContrastMode=!0;let e=this.getHighContrastMode();e===D.BLACK_ON_WHITE?t.add(Ft,je):e===D.WHITE_ON_BLACK&&t.add(Ft,Ue)}}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})(),fn=(()=>{class n{constructor(){r(He)._applyBodyHighContrastModeCssClasses()}static \u0275fac=function(e){return new(e||n)};static \u0275mod=w({type:n});static \u0275inj=y({imports:[Be]})}return n})();var hn=200,ft=class{_letterKeyStream=new _;_items=[];_selectedItemIndex=-1;_pressedLetters=[];_skipPredicateFn;_selectedItem=new _;selectedItem=this._selectedItem;constructor(o,t){let e=typeof t?.debounceInterval=="number"?t.debounceInterval:hn;t?.skipPredicate&&(this._skipPredicateFn=t.skipPredicate),this.setItems(o),this._setupKeyHandler(e)}destroy(){this._pressedLetters=[],this._letterKeyStream.complete(),this._selectedItem.complete()}setCurrentSelectedItemIndex(o){this._selectedItemIndex=o}setItems(o){this._items=o}handleKey(o){let t=o.keyCode;o.key&&o.key.length===1?this._letterKeyStream.next(o.key.toLocaleUpperCase()):(t>=65&&t<=90||t>=48&&t<=57)&&this._letterKeyStream.next(String.fromCharCode(t))}isTyping(){return this._pressedLetters.length>0}reset(){this._pressedLetters=[]}_setupKeyHandler(o){this._letterKeyStream.pipe(ce(t=>this._pressedLetters.push(t)),nt(o),oe(()=>this._pressedLetters.length>0),$(()=>this._pressedLetters.join("").toLocaleUpperCase())).subscribe(t=>{for(let e=1;e<this._items.length+1;e++){let a=(this._selectedItemIndex+e)%this._items.length,i=this._items[a];if(!this._skipPredicateFn?.(i)&&i.getLabel?.().toLocaleUpperCase().trim().indexOf(t)===0){this._selectedItem.next(i);break}}this._pressedLetters=[]})}};function We(n,...o){return o.length?o.some(t=>n[t]):n.altKey||n.shiftKey||n.ctrlKey||n.metaKey}var V=class{_items;_activeItemIndex=Et(-1);_activeItem=Et(null);_wrap=!1;_typeaheadSubscription=qt.EMPTY;_itemChangesSubscription;_vertical=!0;_horizontal=null;_allowedModifierKeys=[];_homeAndEnd=!1;_pageUpAndDown={enabled:!1,delta:10};_effectRef;_typeahead;_skipPredicateFn=o=>o.disabled;constructor(o,t){this._items=o,o instanceof It?this._itemChangesSubscription=o.changes.subscribe(e=>this._itemsChanged(e.toArray())):wt(o)&&(this._effectRef=me(()=>this._itemsChanged(o()),{injector:t}))}tabOut=new _;change=new _;skipPredicate(o){return this._skipPredicateFn=o,this}withWrap(o=!0){return this._wrap=o,this}withVerticalOrientation(o=!0){return this._vertical=o,this}withHorizontalOrientation(o){return this._horizontal=o,this}withAllowedModifierKeys(o){return this._allowedModifierKeys=o,this}withTypeAhead(o=200){this._typeaheadSubscription.unsubscribe();let t=this._getItemsArray();return this._typeahead=new ft(t,{debounceInterval:typeof o=="number"?o:void 0,skipPredicate:e=>this._skipPredicateFn(e)}),this._typeaheadSubscription=this._typeahead.selectedItem.subscribe(e=>{this.setActiveItem(e)}),this}cancelTypeahead(){return this._typeahead?.reset(),this}withHomeAndEnd(o=!0){return this._homeAndEnd=o,this}withPageUpDown(o=!0,t=10){return this._pageUpAndDown={enabled:o,delta:t},this}setActiveItem(o){let t=this._activeItem();this.updateActiveItem(o),this._activeItem()!==t&&this.change.next(this._activeItemIndex())}onKeydown(o){let t=o.keyCode,a=["altKey","ctrlKey","metaKey","shiftKey"].every(i=>!o[i]||this._allowedModifierKeys.indexOf(i)>-1);switch(t){case 9:this.tabOut.next();return;case 40:if(this._vertical&&a){this.setNextItemActive();break}else return;case 38:if(this._vertical&&a){this.setPreviousItemActive();break}else return;case 39:if(this._horizontal&&a){this._horizontal==="rtl"?this.setPreviousItemActive():this.setNextItemActive();break}else return;case 37:if(this._horizontal&&a){this._horizontal==="rtl"?this.setNextItemActive():this.setPreviousItemActive();break}else return;case 36:if(this._homeAndEnd&&a){this.setFirstItemActive();break}else return;case 35:if(this._homeAndEnd&&a){this.setLastItemActive();break}else return;case 33:if(this._pageUpAndDown.enabled&&a){let i=this._activeItemIndex()-this._pageUpAndDown.delta;this._setActiveItemByIndex(i>0?i:0,1);break}else return;case 34:if(this._pageUpAndDown.enabled&&a){let i=this._activeItemIndex()+this._pageUpAndDown.delta,s=this._getItemsArray().length;this._setActiveItemByIndex(i<s?i:s-1,-1);break}else return;default:(a||We(o,"shiftKey"))&&this._typeahead?.handleKey(o);return}this._typeahead?.reset(),o.preventDefault()}get activeItemIndex(){return this._activeItemIndex()}get activeItem(){return this._activeItem()}isTyping(){return!!this._typeahead&&this._typeahead.isTyping()}setFirstItemActive(){this._setActiveItemByIndex(0,1)}setLastItemActive(){this._setActiveItemByIndex(this._getItemsArray().length-1,-1)}setNextItemActive(){this._activeItemIndex()<0?this.setFirstItemActive():this._setActiveItemByDelta(1)}setPreviousItemActive(){this._activeItemIndex()<0&&this._wrap?this.setLastItemActive():this._setActiveItemByDelta(-1)}updateActiveItem(o){let t=this._getItemsArray(),e=typeof o=="number"?o:t.indexOf(o),a=t[e];this._activeItem.set(a??null),this._activeItemIndex.set(e),this._typeahead?.setCurrentSelectedItemIndex(e)}destroy(){this._typeaheadSubscription.unsubscribe(),this._itemChangesSubscription?.unsubscribe(),this._effectRef?.destroy(),this._typeahead?.destroy(),this.tabOut.complete(),this.change.complete()}_setActiveItemByDelta(o){this._wrap?this._setActiveInWrapMode(o):this._setActiveInDefaultMode(o)}_setActiveInWrapMode(o){let t=this._getItemsArray();for(let e=1;e<=t.length;e++){let a=(this._activeItemIndex()+o*e+t.length)%t.length,i=t[a];if(!this._skipPredicateFn(i)){this.setActiveItem(a);return}}}_setActiveInDefaultMode(o){this._setActiveItemByIndex(this._activeItemIndex()+o,o)}_setActiveItemByIndex(o,t){let e=this._getItemsArray();if(e[o]){for(;this._skipPredicateFn(e[o]);)if(o+=t,!e[o])return;this.setActiveItem(o)}}_getItemsArray(){return wt(this._items)?this._items():this._items instanceof It?this._items.toArray():this._items}_itemsChanged(o){this._typeahead?.setItems(o);let t=this._activeItem();if(t){let e=o.indexOf(t);e>-1&&e!==this._activeItemIndex()&&(this._activeItemIndex.set(e),this._typeahead?.setCurrentSelectedItemIndex(e))}}};var St=class extends V{setActiveItem(o){this.activeItem&&this.activeItem.setInactiveStyles(),super.setActiveItem(o),this.activeItem&&this.activeItem.setActiveStyles()}};var Lt=class extends V{_origin="program";setFocusOrigin(o){return this._origin=o,this}setActiveItem(o){super.setActiveItem(o),this.activeItem&&this.activeItem.focus(this._origin)}};var Pt={},Bt=class n{_appId=r(it);static _infix=`a${Math.floor(Math.random()*1e5).toString()}`;getId(o,t=!1){return this._appId!=="ng"&&(o+=this._appId),Pt.hasOwnProperty(o)||(Pt[o]=0),`${o}${t?n._infix+"-":""}${Pt[o]++}`}static \u0275fac=function(t){return new(t||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})};var Ge=" ";function vn(n,o,t){let e=vt(n,o);t=t.trim(),!e.some(a=>a.trim()===t)&&(e.push(t),n.setAttribute(o,e.join(Ge)))}function _n(n,o,t){let e=vt(n,o);t=t.trim();let a=e.filter(i=>i!==t);a.length?n.setAttribute(o,a.join(Ge)):n.removeAttribute(o)}function vt(n,o){return n.getAttribute(o)?.match(/\S+/g)??[]}var Ze="cdk-describedby-message",ht="cdk-describedby-host",Ut=0,yo=(()=>{class n{_platform=r(p);_document=r(x);_messageRegistry=new Map;_messagesContainer=null;_id=`${Ut++}`;constructor(){r(K).load(Tt),this._id=r(it)+"-"+Ut++}describe(t,e,a){if(!this._canBeDescribed(t,e))return;let i=jt(e,a);typeof e!="string"?(Ve(e,this._id),this._messageRegistry.set(i,{messageElement:e,referenceCount:0})):this._messageRegistry.has(i)||this._createMessageElement(e,a),this._isElementDescribedByMessage(t,i)||this._addMessageReference(t,i)}removeDescription(t,e,a){if(!e||!this._isElementNode(t))return;let i=jt(e,a);if(this._isElementDescribedByMessage(t,i)&&this._removeMessageReference(t,i),typeof e=="string"){let s=this._messageRegistry.get(i);s&&s.referenceCount===0&&this._deleteMessageElement(i)}this._messagesContainer?.childNodes.length===0&&(this._messagesContainer.remove(),this._messagesContainer=null)}ngOnDestroy(){let t=this._document.querySelectorAll(`[${ht}="${this._id}"]`);for(let e=0;e<t.length;e++)this._removeCdkDescribedByReferenceIds(t[e]),t[e].removeAttribute(ht);this._messagesContainer?.remove(),this._messagesContainer=null,this._messageRegistry.clear()}_createMessageElement(t,e){let a=this._document.createElement("div");Ve(a,this._id),a.textContent=t,e&&a.setAttribute("role",e),this._createMessagesContainer(),this._messagesContainer.appendChild(a),this._messageRegistry.set(jt(t,e),{messageElement:a,referenceCount:0})}_deleteMessageElement(t){this._messageRegistry.get(t)?.messageElement?.remove(),this._messageRegistry.delete(t)}_createMessagesContainer(){if(this._messagesContainer)return;let t="cdk-describedby-message-container",e=this._document.querySelectorAll(`.${t}[platform="server"]`);for(let i=0;i<e.length;i++)e[i].remove();let a=this._document.createElement("div");a.style.visibility="hidden",a.classList.add(t),a.classList.add("cdk-visually-hidden"),this._platform.isBrowser||a.setAttribute("platform","server"),this._document.body.appendChild(a),this._messagesContainer=a}_removeCdkDescribedByReferenceIds(t){let e=vt(t,"aria-describedby").filter(a=>a.indexOf(Ze)!=0);t.setAttribute("aria-describedby",e.join(" "))}_addMessageReference(t,e){let a=this._messageRegistry.get(e);vn(t,"aria-describedby",a.messageElement.id),t.setAttribute(ht,this._id),a.referenceCount++}_removeMessageReference(t,e){let a=this._messageRegistry.get(e);a.referenceCount--,_n(t,"aria-describedby",a.messageElement.id),t.removeAttribute(ht)}_isElementDescribedByMessage(t,e){let a=vt(t,"aria-describedby"),i=this._messageRegistry.get(e),s=i&&i.messageElement.id;return!!s&&a.indexOf(s)!=-1}_canBeDescribed(t,e){if(!this._isElementNode(t))return!1;if(e&&typeof e=="object")return!0;let a=e==null?"":`${e}`.trim(),i=t.getAttribute("aria-label");return a?!i||i.trim()!==a:!1}_isElementNode(t){return t.nodeType===this._document.ELEMENT_NODE}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();function jt(n,o){return typeof n=="string"?`${o||""}/${n}`:n}function Ve(n,o){n.id||(n.id=`${Ze}-${o}-${Ut++}`)}var S;function ko(){if(S==null){if(typeof document!="object"||!document||typeof Element!="function"||!Element)return S=!1,S;if(document.documentElement?.style&&"scrollBehavior"in document.documentElement.style)S=!0;else{let n=Element.prototype.scrollTo;n?S=!/\{\s*\[native code\]\s*\}/.test(n.toString()):S=!1}}return S}function Co(){return typeof __karma__<"u"&&!!__karma__||typeof jasmine<"u"&&!!jasmine||typeof jest<"u"&&!!jest||typeof Mocha<"u"&&!!Mocha}var G,$e=["color","button","checkbox","date","datetime-local","email","file","hidden","image","month","number","password","radio","range","reset","search","submit","tel","text","time","url","week"];function No(){if(G)return G;if(typeof document!="object"||!document)return G=new Set($e),G;let n=document.createElement("input");return G=new Set($e.filter(o=>(n.setAttribute("type",o),n.type===o))),G}var gn=new l("MATERIAL_ANIMATIONS"),Ye=null;function zt(){return r(gn,{optional:!0})?.animationsDisabled||r(ue,{optional:!0})==="NoopAnimations"?"di-disabled":(Ye??=r(bt).matchMedia("(prefers-reduced-motion)").matches,Ye?"reduced-motion":"enabled")}function Z(){return zt()!=="enabled"}function Ho(n){return n==null?"":typeof n=="string"?n:`${n}px`}function Vo(n){return n!=null&&`${n}`!="false"}var h=(function(n){return n[n.FADING_IN=0]="FADING_IN",n[n.VISIBLE=1]="VISIBLE",n[n.FADING_OUT=2]="FADING_OUT",n[n.HIDDEN=3]="HIDDEN",n})(h||{}),Kt=class{_renderer;element;config;_animationForciblyDisabledThroughCss;state=h.HIDDEN;constructor(o,t,e,a=!1){this._renderer=o,this.element=t,this.config=e,this._animationForciblyDisabledThroughCss=a}fadeOut(){this._renderer.fadeOutRipple(this)}},Qe=W({passive:!0,capture:!0}),Ht=class{_events=new Map;addHandler(o,t,e,a){let i=this._events.get(t);if(i){let s=i.get(e);s?s.add(a):i.set(e,new Set([a]))}else this._events.set(t,new Map([[e,new Set([a])]])),o.runOutsideAngular(()=>{document.addEventListener(t,this._delegateEventHandler,Qe)})}removeHandler(o,t,e){let a=this._events.get(o);if(!a)return;let i=a.get(t);i&&(i.delete(e),i.size===0&&a.delete(t),a.size===0&&(this._events.delete(o),document.removeEventListener(o,this._delegateEventHandler,Qe)))}_delegateEventHandler=o=>{let t=g(o);t&&this._events.get(o.type)?.forEach((e,a)=>{(a===t||a.contains(t))&&e.forEach(i=>i.handleEvent(o))})}},J={enterDuration:225,exitDuration:150},yn=800,Xe=W({passive:!0,capture:!0}),qe=["mousedown","touchstart"],Je=["mouseup","mouseleave","touchend","touchcancel"],xn=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275cmp=I({type:n,selectors:[["ng-component"]],hostAttrs:["mat-ripple-style-loader",""],decls:0,vars:0,template:function(e,a){},styles:[`.mat-ripple {
  overflow: hidden;
  position: relative;
}
.mat-ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-ripple.mat-ripple-unbounded {
  overflow: visible;
}

.mat-ripple-element {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: scale3d(0, 0, 0);
  background-color: var(--mat-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface) 10%, transparent));
}
@media (forced-colors: active) {
  .mat-ripple-element {
    display: none;
  }
}
.cdk-drag-preview .mat-ripple-element, .cdk-drag-placeholder .mat-ripple-element {
  display: none;
}
`],encapsulation:2,changeDetection:0})}return n})(),tt=class n{_target;_ngZone;_platform;_containerElement;_triggerElement=null;_isPointerDown=!1;_activeRipples=new Map;_mostRecentTransientRipple=null;_lastTouchStartEvent;_pointerUpEventsRegistered=!1;_containerRect=null;static _eventManager=new Ht;constructor(o,t,e,a,i){this._target=o,this._ngZone=t,this._platform=a,a.isBrowser&&(this._containerElement=k(e)),i&&i.get(K).load(xn)}fadeInRipple(o,t,e={}){let a=this._containerRect=this._containerRect||this._containerElement.getBoundingClientRect(),i=m(m({},J),e.animation);e.centered&&(o=a.left+a.width/2,t=a.top+a.height/2);let s=e.radius||En(o,t,a),c=o-a.left,v=t-a.top,A=i.enterDuration,b=document.createElement("div");b.classList.add("mat-ripple-element"),b.style.left=`${c-s}px`,b.style.top=`${v-s}px`,b.style.height=`${s*2}px`,b.style.width=`${s*2}px`,e.color!=null&&(b.style.backgroundColor=e.color),b.style.transitionDuration=`${A}ms`,this._containerElement.appendChild(b);let $t=window.getComputedStyle(b),cn=$t.transitionProperty,Yt=$t.transitionDuration,gt=cn==="none"||Yt==="0s"||Yt==="0s, 0s"||a.width===0&&a.height===0,C=new Kt(this,b,e,gt);b.style.transform="scale3d(1, 1, 1)",C.state=h.FADING_IN,e.persistent||(this._mostRecentTransientRipple=C);let et=null;return!gt&&(A||i.exitDuration)&&this._ngZone.runOutsideAngular(()=>{let Qt=()=>{et&&(et.fallbackTimer=null),clearTimeout(Xt),this._finishRippleTransition(C)},yt=()=>this._destroyRipple(C),Xt=setTimeout(yt,A+100);b.addEventListener("transitionend",Qt),b.addEventListener("transitioncancel",yt),et={onTransitionEnd:Qt,onTransitionCancel:yt,fallbackTimer:Xt}}),this._activeRipples.set(C,et),(gt||!A)&&this._finishRippleTransition(C),C}fadeOutRipple(o){if(o.state===h.FADING_OUT||o.state===h.HIDDEN)return;let t=o.element,e=m(m({},J),o.config.animation);t.style.transitionDuration=`${e.exitDuration}ms`,t.style.opacity="0",o.state=h.FADING_OUT,(o._animationForciblyDisabledThroughCss||!e.exitDuration)&&this._finishRippleTransition(o)}fadeOutAll(){this._getActiveRipples().forEach(o=>o.fadeOut())}fadeOutAllNonPersistent(){this._getActiveRipples().forEach(o=>{o.config.persistent||o.fadeOut()})}setupTriggerEvents(o){let t=k(o);!this._platform.isBrowser||!t||t===this._triggerElement||(this._removeTriggerEvents(),this._triggerElement=t,qe.forEach(e=>{n._eventManager.addHandler(this._ngZone,e,t,this)}))}handleEvent(o){o.type==="mousedown"?this._onMousedown(o):o.type==="touchstart"?this._onTouchStart(o):this._onPointerUp(),this._pointerUpEventsRegistered||(this._ngZone.runOutsideAngular(()=>{Je.forEach(t=>{this._triggerElement.addEventListener(t,this,Xe)})}),this._pointerUpEventsRegistered=!0)}_finishRippleTransition(o){o.state===h.FADING_IN?this._startFadeOutTransition(o):o.state===h.FADING_OUT&&this._destroyRipple(o)}_startFadeOutTransition(o){let t=o===this._mostRecentTransientRipple,{persistent:e}=o.config;o.state=h.VISIBLE,!e&&(!t||!this._isPointerDown)&&o.fadeOut()}_destroyRipple(o){let t=this._activeRipples.get(o)??null;this._activeRipples.delete(o),this._activeRipples.size||(this._containerRect=null),o===this._mostRecentTransientRipple&&(this._mostRecentTransientRipple=null),o.state=h.HIDDEN,t!==null&&(o.element.removeEventListener("transitionend",t.onTransitionEnd),o.element.removeEventListener("transitioncancel",t.onTransitionCancel),t.fallbackTimer!==null&&clearTimeout(t.fallbackTimer)),o.element.remove()}_onMousedown(o){let t=Y(o),e=this._lastTouchStartEvent&&Date.now()<this._lastTouchStartEvent+yn;!this._target.rippleDisabled&&!t&&!e&&(this._isPointerDown=!0,this.fadeInRipple(o.clientX,o.clientY,this._target.rippleConfig))}_onTouchStart(o){if(!this._target.rippleDisabled&&!Q(o)){this._lastTouchStartEvent=Date.now(),this._isPointerDown=!0;let t=o.changedTouches;if(t)for(let e=0;e<t.length;e++)this.fadeInRipple(t[e].clientX,t[e].clientY,this._target.rippleConfig)}}_onPointerUp(){this._isPointerDown&&(this._isPointerDown=!1,this._getActiveRipples().forEach(o=>{let t=o.state===h.VISIBLE||o.config.terminateOnPointerUp&&o.state===h.FADING_IN;!o.config.persistent&&t&&o.fadeOut()}))}_getActiveRipples(){return Array.from(this._activeRipples.keys())}_removeTriggerEvents(){let o=this._triggerElement;o&&(qe.forEach(t=>n._eventManager.removeHandler(t,o,this)),this._pointerUpEventsRegistered&&(Je.forEach(t=>o.removeEventListener(t,this,Xe)),this._pointerUpEventsRegistered=!1))}};function En(n,o,t){let e=Math.max(Math.abs(n-t.left),Math.abs(n-t.right)),a=Math.max(Math.abs(o-t.top),Math.abs(o-t.bottom));return Math.sqrt(e*e+a*a)}var Wt=new l("mat-ripple-global-options"),ii=(()=>{class n{_elementRef=r(E);_animationsDisabled=Z();color;unbounded=!1;centered=!1;radius=0;animation;get disabled(){return this._disabled}set disabled(t){t&&this.fadeOutAllNonPersistent(),this._disabled=t,this._setupTriggerEventsIfEnabled()}_disabled=!1;get trigger(){return this._trigger||this._elementRef.nativeElement}set trigger(t){this._trigger=t,this._setupTriggerEventsIfEnabled()}_trigger;_rippleRenderer;_globalOptions;_isInitialized=!1;constructor(){let t=r(u),e=r(p),a=r(Wt,{optional:!0}),i=r(L);this._globalOptions=a||{},this._rippleRenderer=new tt(this,t,this._elementRef,e,i)}ngOnInit(){this._isInitialized=!0,this._setupTriggerEventsIfEnabled()}ngOnDestroy(){this._rippleRenderer._removeTriggerEvents()}fadeOutAll(){this._rippleRenderer.fadeOutAll()}fadeOutAllNonPersistent(){this._rippleRenderer.fadeOutAllNonPersistent()}get rippleConfig(){return{centered:this.centered,radius:this.radius,color:this.color,animation:m(m(m({},this._globalOptions.animation),this._animationsDisabled?{enterDuration:0,exitDuration:0}:{}),this.animation),terminateOnPointerUp:this._globalOptions.terminateOnPointerUp}}get rippleDisabled(){return this.disabled||!!this._globalOptions.disabled}_setupTriggerEventsIfEnabled(){!this.disabled&&this._isInitialized&&this._rippleRenderer.setupTriggerEvents(this.trigger)}launch(t,e=0,a){return typeof t=="number"?this._rippleRenderer.fadeInRipple(t,e,m(m({},this.rippleConfig),a)):this._rippleRenderer.fadeInRipple(0,0,m(m({},this.rippleConfig),t))}static \u0275fac=function(e){return new(e||n)};static \u0275dir=R({type:n,selectors:[["","mat-ripple",""],["","matRipple",""]],hostAttrs:[1,"mat-ripple"],hostVars:2,hostBindings:function(e,a){e&2&&M("mat-ripple-unbounded",a.unbounded)},inputs:{color:[0,"matRippleColor","color"],unbounded:[0,"matRippleUnbounded","unbounded"],centered:[0,"matRippleCentered","centered"],radius:[0,"matRippleRadius","radius"],animation:[0,"matRippleAnimation","animation"],disabled:[0,"matRippleDisabled","disabled"],trigger:[0,"matRippleTrigger","trigger"]},exportAs:["matRipple"]})}return n})();var In={capture:!0},wn=["focus","mousedown","mouseenter","touchstart"],Vt="mat-ripple-loader-uninitialized",Gt="mat-ripple-loader-class-name",tn="mat-ripple-loader-centered",_t="mat-ripple-loader-disabled",en=(()=>{class n{_document=r(x);_animationsDisabled=Z();_globalRippleOptions=r(Wt,{optional:!0});_platform=r(p);_ngZone=r(u);_injector=r(L);_eventCleanups;_hosts=new Map;constructor(){let t=r(rt).createRenderer(null,null);this._eventCleanups=this._ngZone.runOutsideAngular(()=>wn.map(e=>t.listen(this._document,e,this._onInteraction,In)))}ngOnDestroy(){let t=this._hosts.keys();for(let e of t)this.destroyRipple(e);this._eventCleanups.forEach(e=>e())}configureRipple(t,e){t.setAttribute(Vt,this._globalRippleOptions?.namespace??""),(e.className||!t.hasAttribute(Gt))&&t.setAttribute(Gt,e.className||""),e.centered&&t.setAttribute(tn,""),e.disabled&&t.setAttribute(_t,"")}setDisabled(t,e){let a=this._hosts.get(t);a?(a.target.rippleDisabled=e,!e&&!a.hasSetUpEvents&&(a.hasSetUpEvents=!0,a.renderer.setupTriggerEvents(t))):e?t.setAttribute(_t,""):t.removeAttribute(_t)}_onInteraction=t=>{let e=g(t);if(e instanceof HTMLElement){let a=e.closest(`[${Vt}="${this._globalRippleOptions?.namespace??""}"]`);a&&this._createRipple(a)}};_createRipple(t){if(!this._document||this._hosts.has(t))return;t.querySelector(".mat-ripple")?.remove();let e=this._document.createElement("span");e.classList.add("mat-ripple",t.getAttribute(Gt)),t.append(e);let a=this._globalRippleOptions,i=this._animationsDisabled?0:a?.animation?.enterDuration??J.enterDuration,s=this._animationsDisabled?0:a?.animation?.exitDuration??J.exitDuration,c={rippleDisabled:this._animationsDisabled||a?.disabled||t.hasAttribute(_t),rippleConfig:{centered:t.hasAttribute(tn),terminateOnPointerUp:a?.terminateOnPointerUp,animation:{enterDuration:i,exitDuration:s}}},v=new tt(c,this._ngZone,e,this._platform,this._injector),A=!c.rippleDisabled;A&&v.setupTriggerEvents(t),this._hosts.set(t,{target:c,renderer:v,hasSetUpEvents:A}),t.removeAttribute(Vt)}destroyRipple(t){let e=this._hosts.get(t);e&&(e.renderer._removeTriggerEvents(),this._hosts.delete(t))}static \u0275fac=function(e){return new(e||n)};static \u0275prov=d({token:n,factory:n.\u0275fac,providedIn:"root"})}return n})();var nn=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275cmp=I({type:n,selectors:[["structural-styles"]],decls:0,vars:0,template:function(e,a){},styles:[`.mat-focus-indicator {
  position: relative;
}
.mat-focus-indicator::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  box-sizing: border-box;
  pointer-events: none;
  display: var(--mat-focus-indicator-display, none);
  border-width: var(--mat-focus-indicator-border-width, 3px);
  border-style: var(--mat-focus-indicator-border-style, solid);
  border-color: var(--mat-focus-indicator-border-color, transparent);
  border-radius: var(--mat-focus-indicator-border-radius, 4px);
}
.mat-focus-indicator:focus-visible::before {
  content: "";
}

@media (forced-colors: active) {
  html {
    --mat-focus-indicator-display: block;
  }
}
`],encapsulation:2,changeDetection:0})}return n})();var An=["mat-icon-button",""],Tn=["*"],Mn=new l("MAT_BUTTON_CONFIG");function an(n){return n==null?void 0:z(n)}var Zt=(()=>{class n{_elementRef=r(E);_ngZone=r(u);_animationsDisabled=Z();_config=r(Mn,{optional:!0});_focusMonitor=r(Ot);_cleanupClick;_renderer=r(be);_rippleLoader=r(en);_isAnchor;_isFab=!1;color;get disableRipple(){return this._disableRipple}set disableRipple(t){this._disableRipple=t,this._updateRippleDisabled()}_disableRipple=!1;get disabled(){return this._disabled}set disabled(t){this._disabled=t,this._updateRippleDisabled()}_disabled=!1;ariaDisabled;disabledInteractive;tabIndex;set _tabindex(t){this.tabIndex=t}constructor(){r(K).load(nn);let t=this._elementRef.nativeElement;this._isAnchor=t.tagName==="A",this.disabledInteractive=this._config?.disabledInteractive??!1,this.color=this._config?.color??null,this._rippleLoader?.configureRipple(t,{className:"mat-mdc-button-ripple"})}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0),this._isAnchor&&this._setupAsAnchor()}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._rippleLoader?.destroyRipple(this._elementRef.nativeElement)}focus(t="program",e){t?this._focusMonitor.focusVia(this._elementRef.nativeElement,t,e):this._elementRef.nativeElement.focus(e)}_getAriaDisabled(){return this.ariaDisabled!=null?this.ariaDisabled:this._isAnchor?this.disabled||null:this.disabled&&this.disabledInteractive?!0:null}_getDisabledAttribute(){return this.disabledInteractive||!this.disabled?null:!0}_updateRippleDisabled(){this._rippleLoader?.setDisabled(this._elementRef.nativeElement,this.disableRipple||this.disabled)}_getTabIndex(){return this._isAnchor?this.disabled&&!this.disabledInteractive?-1:this.tabIndex:this.tabIndex}_setupAsAnchor(){this._cleanupClick=this._ngZone.runOutsideAngular(()=>this._renderer.listen(this._elementRef.nativeElement,"click",t=>{this.disabled&&(t.preventDefault(),t.stopImmediatePropagation())}))}static \u0275fac=function(e){return new(e||n)};static \u0275dir=R({type:n,hostAttrs:[1,"mat-mdc-button-base"],hostVars:13,hostBindings:function(e,a){e&2&&(T("disabled",a._getDisabledAttribute())("aria-disabled",a._getAriaDisabled())("tabindex",a._getTabIndex()),ut(a.color?"mat-"+a.color:""),M("mat-mdc-button-disabled",a.disabled)("mat-mdc-button-disabled-interactive",a.disabledInteractive)("mat-unthemed",!a.color)("_mat-animation-noopable",a._animationsDisabled))},inputs:{color:"color",disableRipple:[2,"disableRipple","disableRipple",U],disabled:[2,"disabled","disabled",U],ariaDisabled:[2,"aria-disabled","ariaDisabled",U],disabledInteractive:[2,"disabledInteractive","disabledInteractive",U],tabIndex:[2,"tabIndex","tabIndex",an],_tabindex:[2,"tabindex","_tabindex",an]}})}return n})(),kn=(()=>{class n extends Zt{constructor(){super(),this._rippleLoader.configureRipple(this._elementRef.nativeElement,{centered:!0})}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=I({type:n,selectors:[["button","mat-icon-button",""],["a","mat-icon-button",""],["button","matIconButton",""],["a","matIconButton",""]],hostAttrs:[1,"mdc-icon-button","mat-mdc-icon-button"],exportAs:["matButton","matAnchor"],features:[st],attrs:An,ngContentSelectors:Tn,decls:4,vars:0,consts:[[1,"mat-mdc-button-persistent-ripple","mdc-icon-button__ripple"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(e,a){e&1&&(mt(),B(0,"span",0),j(1),B(2,"span",1)(3,"span",2))},styles:[`.mat-mdc-icon-button {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: none;
  outline: none;
  background-color: transparent;
  fill: currentColor;
  text-decoration: none;
  cursor: pointer;
  z-index: 0;
  overflow: visible;
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
  flex-shrink: 0;
  text-align: center;
  width: var(--mat-icon-button-state-layer-size, 40px);
  height: var(--mat-icon-button-state-layer-size, 40px);
  padding: calc(calc(var(--mat-icon-button-state-layer-size, 40px) - var(--mat-icon-button-icon-size, 24px)) / 2);
  font-size: var(--mat-icon-button-icon-size, 24px);
  color: var(--mat-icon-button-icon-color, var(--mat-sys-on-surface-variant));
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-icon-button .mat-mdc-button-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple,
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-icon-button .mdc-button__label,
.mat-mdc-icon-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-icon-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-icon-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-icon-button .mat-ripple-element {
  background-color: var(--mat-icon-button-ripple-color, color-mix(in srgb, var(--mat-sys-on-surface-variant) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-icon-button-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-icon-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-icon-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-icon-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-icon-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-icon-button-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-icon-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-icon-button-touch-target-size, 48px);
  display: var(--mat-icon-button-touch-target-display, block);
  left: 50%;
  width: var(--mat-icon-button-touch-target-size, 48px);
  transform: translate(-50%, -50%);
}
.mat-mdc-icon-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-icon-button[disabled], .mat-mdc-icon-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-icon-button-disabled-icon-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-icon-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-icon-button img,
.mat-mdc-icon-button svg {
  width: var(--mat-icon-button-icon-size, 24px);
  height: var(--mat-icon-button-icon-size, 24px);
  vertical-align: baseline;
}
.mat-mdc-icon-button .mat-mdc-button-persistent-ripple {
  border-radius: var(--mat-icon-button-container-shape, var(--mat-sys-corner-full, 50%));
}
.mat-mdc-icon-button[hidden] {
  display: none;
}
.mat-mdc-icon-button.mat-unthemed:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-primary:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-accent:not(.mdc-ripple-upgraded):focus::before, .mat-mdc-icon-button.mat-warn:not(.mdc-ripple-upgraded):focus::before {
  background: transparent;
  opacity: 1;
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return n})();var on=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=w({type:n});static \u0275inj=y({imports:[H]})}return n})();var Dn=["matButton",""],Cn=[[["",8,"material-icons",3,"iconPositionEnd",""],["mat-icon",3,"iconPositionEnd",""],["","matButtonIcon","",3,"iconPositionEnd",""]],"*",[["","iconPositionEnd","",8,"material-icons"],["mat-icon","iconPositionEnd",""],["","matButtonIcon","","iconPositionEnd",""]]],On=[".material-icons:not([iconPositionEnd]), mat-icon:not([iconPositionEnd]), [matButtonIcon]:not([iconPositionEnd])","*",".material-icons[iconPositionEnd], mat-icon[iconPositionEnd], [matButtonIcon][iconPositionEnd]"];var rn=new Map([["text",["mat-mdc-button"]],["filled",["mdc-button--unelevated","mat-mdc-unelevated-button"]],["elevated",["mdc-button--raised","mat-mdc-raised-button"]],["outlined",["mdc-button--outlined","mat-mdc-outlined-button"]],["tonal",["mat-tonal-button"]]]),Ri=(()=>{class n extends Zt{get appearance(){return this._appearance}set appearance(t){this.setAppearance(t||this._config?.defaultAppearance||"text")}_appearance=null;constructor(){super();let t=Rn(this._elementRef.nativeElement);t&&this.setAppearance(t)}setAppearance(t){if(t===this._appearance)return;let e=this._elementRef.nativeElement.classList,a=this._appearance?rn.get(this._appearance):null,i=rn.get(t);a&&e.remove(...a),e.add(...i),this._appearance=t}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=I({type:n,selectors:[["button","matButton",""],["a","matButton",""],["button","mat-button",""],["button","mat-raised-button",""],["button","mat-flat-button",""],["button","mat-stroked-button",""],["a","mat-button",""],["a","mat-raised-button",""],["a","mat-flat-button",""],["a","mat-stroked-button",""]],hostAttrs:[1,"mdc-button"],inputs:{appearance:[0,"matButton","appearance"]},exportAs:["matButton","matAnchor"],features:[st],attrs:Dn,ngContentSelectors:On,decls:7,vars:4,consts:[[1,"mat-mdc-button-persistent-ripple"],[1,"mdc-button__label"],[1,"mat-focus-indicator"],[1,"mat-mdc-button-touch-target"]],template:function(e,a){e&1&&(mt(Cn),B(0,"span",0),j(1),he(2,"span",1),j(3,1),ve(),j(4,2),B(5,"span",2)(6,"span",3)),e&2&&M("mdc-button__ripple",!a._isFab)("mdc-fab__ripple",a._isFab)},styles:[`.mat-mdc-button-base {
  text-decoration: none;
}
.mat-mdc-button-base .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
@media (hover: none) {
  .mat-mdc-button-base:hover > span.mat-mdc-button-persistent-ripple::before {
    opacity: 0;
  }
}

.mdc-button {
  -webkit-user-select: none;
  user-select: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  min-width: 64px;
  border: none;
  outline: none;
  line-height: inherit;
  -webkit-appearance: none;
  overflow: visible;
  vertical-align: middle;
  background: transparent;
  padding: 0 8px;
}
.mdc-button::-moz-focus-inner {
  padding: 0;
  border: 0;
}
.mdc-button:active {
  outline: none;
}
.mdc-button:hover {
  cursor: pointer;
}
.mdc-button:disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-button[hidden] {
  display: none;
}
.mdc-button .mdc-button__label {
  position: relative;
}

.mat-mdc-button {
  padding: 0 var(--mat-button-text-horizontal-padding, 12px);
  height: var(--mat-button-text-container-height, 40px);
  font-family: var(--mat-button-text-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-text-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-text-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-text-label-text-transform);
  font-weight: var(--mat-button-text-label-text-weight, var(--mat-sys-label-large-weight));
}
.mat-mdc-button, .mat-mdc-button .mdc-button__ripple {
  border-radius: var(--mat-button-text-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-button:not(:disabled) {
  color: var(--mat-button-text-label-text-color, var(--mat-sys-primary));
}
.mat-mdc-button[disabled], .mat-mdc-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-text-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-button:has(.material-icons, mat-icon, [matButtonIcon]) {
  padding: 0 var(--mat-button-text-with-icon-horizontal-padding, 16px);
}
.mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
[dir=rtl] .mat-mdc-button > .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
.mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-offset, -4px);
  margin-left: var(--mat-button-text-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-text-icon-spacing, 8px);
  margin-left: var(--mat-button-text-icon-offset, -4px);
}
.mat-mdc-button .mat-ripple-element {
  background-color: var(--mat-button-text-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-text-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-text-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-text-touch-target-size, 48px);
  display: var(--mat-button-text-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-unelevated-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-filled-container-height, 40px);
  font-family: var(--mat-button-filled-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-filled-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-filled-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-filled-label-text-transform);
  font-weight: var(--mat-button-filled-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-filled-horizontal-padding, 24px);
}
.mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-unelevated-button > .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
.mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-offset, -8px);
  margin-left: var(--mat-button-filled-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-unelevated-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-filled-icon-spacing, 8px);
  margin-left: var(--mat-button-filled-icon-offset, -8px);
}
.mat-mdc-unelevated-button .mat-ripple-element {
  background-color: var(--mat-button-filled-ripple-color, color-mix(in srgb, var(--mat-sys-on-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-state-layer-color, var(--mat-sys-on-primary));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-filled-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-unelevated-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-unelevated-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-unelevated-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-filled-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-unelevated-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-filled-touch-target-size, 48px);
  display: var(--mat-button-filled-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-unelevated-button:not(:disabled) {
  color: var(--mat-button-filled-label-text-color, var(--mat-sys-on-primary));
  background-color: var(--mat-button-filled-container-color, var(--mat-sys-primary));
}
.mat-mdc-unelevated-button, .mat-mdc-unelevated-button .mdc-button__ripple {
  border-radius: var(--mat-button-filled-container-shape, var(--mat-sys-corner-full));
}
.mat-mdc-unelevated-button[disabled], .mat-mdc-unelevated-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-filled-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-filled-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-unelevated-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-raised-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--mat-button-protected-container-elevation-shadow, var(--mat-sys-level1));
  height: var(--mat-button-protected-container-height, 40px);
  font-family: var(--mat-button-protected-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-protected-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-protected-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-protected-label-text-transform);
  font-weight: var(--mat-button-protected-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-protected-horizontal-padding, 24px);
}
.mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-raised-button > .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
.mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-offset, -8px);
  margin-left: var(--mat-button-protected-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-raised-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-protected-icon-spacing, 8px);
  margin-left: var(--mat-button-protected-icon-offset, -8px);
}
.mat-mdc-raised-button .mat-ripple-element {
  background-color: var(--mat-button-protected-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-raised-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-protected-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-raised-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-raised-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-raised-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-raised-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-protected-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-raised-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-protected-touch-target-size, 48px);
  display: var(--mat-button-protected-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-raised-button:not(:disabled) {
  color: var(--mat-button-protected-label-text-color, var(--mat-sys-primary));
  background-color: var(--mat-button-protected-container-color, var(--mat-sys-surface));
}
.mat-mdc-raised-button, .mat-mdc-raised-button .mdc-button__ripple {
  border-radius: var(--mat-button-protected-container-shape, var(--mat-sys-corner-full));
}
@media (hover: hover) {
  .mat-mdc-raised-button:hover {
    box-shadow: var(--mat-button-protected-hover-container-elevation-shadow, var(--mat-sys-level2));
  }
}
.mat-mdc-raised-button:focus {
  box-shadow: var(--mat-button-protected-focus-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button:active, .mat-mdc-raised-button:focus:active {
  box-shadow: var(--mat-button-protected-pressed-container-elevation-shadow, var(--mat-sys-level1));
}
.mat-mdc-raised-button[disabled], .mat-mdc-raised-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-protected-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-protected-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-raised-button[disabled].mat-mdc-button-disabled, .mat-mdc-raised-button.mat-mdc-button-disabled.mat-mdc-button-disabled {
  box-shadow: var(--mat-button-protected-disabled-container-elevation-shadow, var(--mat-sys-level0));
}
.mat-mdc-raised-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-outlined-button {
  border-style: solid;
  transition: border 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-outlined-container-height, 40px);
  font-family: var(--mat-button-outlined-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-outlined-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-outlined-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-outlined-label-text-transform);
  font-weight: var(--mat-button-outlined-label-text-weight, var(--mat-sys-label-large-weight));
  border-radius: var(--mat-button-outlined-container-shape, var(--mat-sys-corner-full));
  border-width: var(--mat-button-outlined-outline-width, 1px);
  padding: 0 var(--mat-button-outlined-horizontal-padding, 24px);
}
.mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
[dir=rtl] .mat-mdc-outlined-button > .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
.mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-offset, -8px);
  margin-left: var(--mat-button-outlined-icon-spacing, 8px);
}
[dir=rtl] .mat-mdc-outlined-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-outlined-icon-spacing, 8px);
  margin-left: var(--mat-button-outlined-icon-offset, -8px);
}
.mat-mdc-outlined-button .mat-ripple-element {
  background-color: var(--mat-button-outlined-ripple-color, color-mix(in srgb, var(--mat-sys-primary) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-state-layer-color, var(--mat-sys-primary));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-outlined-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-mdc-outlined-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-mdc-outlined-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-mdc-outlined-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-mdc-outlined-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-outlined-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-mdc-outlined-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-outlined-touch-target-size, 48px);
  display: var(--mat-button-outlined-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}
.mat-mdc-outlined-button:not(:disabled) {
  color: var(--mat-button-outlined-label-text-color, var(--mat-sys-primary));
  border-color: var(--mat-button-outlined-outline-color, var(--mat-sys-outline));
}
.mat-mdc-outlined-button[disabled], .mat-mdc-outlined-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-outlined-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  border-color: var(--mat-button-outlined-disabled-outline-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-mdc-outlined-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}

.mat-tonal-button {
  transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
  height: var(--mat-button-tonal-container-height, 40px);
  font-family: var(--mat-button-tonal-label-text-font, var(--mat-sys-label-large-font));
  font-size: var(--mat-button-tonal-label-text-size, var(--mat-sys-label-large-size));
  letter-spacing: var(--mat-button-tonal-label-text-tracking, var(--mat-sys-label-large-tracking));
  text-transform: var(--mat-button-tonal-label-text-transform);
  font-weight: var(--mat-button-tonal-label-text-weight, var(--mat-sys-label-large-weight));
  padding: 0 var(--mat-button-tonal-horizontal-padding, 24px);
}
.mat-tonal-button:not(:disabled) {
  color: var(--mat-button-tonal-label-text-color, var(--mat-sys-on-secondary-container));
  background-color: var(--mat-button-tonal-container-color, var(--mat-sys-secondary-container));
}
.mat-tonal-button, .mat-tonal-button .mdc-button__ripple {
  border-radius: var(--mat-button-tonal-container-shape, var(--mat-sys-corner-full));
}
.mat-tonal-button[disabled], .mat-tonal-button.mat-mdc-button-disabled {
  cursor: default;
  pointer-events: none;
  color: var(--mat-button-tonal-disabled-label-text-color, color-mix(in srgb, var(--mat-sys-on-surface) 38%, transparent));
  background-color: var(--mat-button-tonal-disabled-container-color, color-mix(in srgb, var(--mat-sys-on-surface) 12%, transparent));
}
.mat-tonal-button.mat-mdc-button-disabled-interactive {
  pointer-events: auto;
}
.mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
[dir=rtl] .mat-tonal-button > .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
.mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-offset, -8px);
  margin-left: var(--mat-button-tonal-icon-spacing, 8px);
}
[dir=rtl] .mat-tonal-button .mdc-button__label + .mat-icon {
  margin-right: var(--mat-button-tonal-icon-spacing, 8px);
  margin-left: var(--mat-button-tonal-icon-offset, -8px);
}
.mat-tonal-button .mat-ripple-element {
  background-color: var(--mat-button-tonal-ripple-color, color-mix(in srgb, var(--mat-sys-on-secondary-container) calc(var(--mat-sys-pressed-state-layer-opacity) * 100%), transparent));
}
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-state-layer-color, var(--mat-sys-on-secondary-container));
}
.mat-tonal-button.mat-mdc-button-disabled .mat-mdc-button-persistent-ripple::before {
  background-color: var(--mat-button-tonal-disabled-state-layer-color, var(--mat-sys-on-surface-variant));
}
.mat-tonal-button:hover > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-hover-state-layer-opacity, var(--mat-sys-hover-state-layer-opacity));
}
.mat-tonal-button.cdk-program-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.cdk-keyboard-focused > .mat-mdc-button-persistent-ripple::before, .mat-tonal-button.mat-mdc-button-disabled-interactive:focus > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-focus-state-layer-opacity, var(--mat-sys-focus-state-layer-opacity));
}
.mat-tonal-button:active > .mat-mdc-button-persistent-ripple::before {
  opacity: var(--mat-button-tonal-pressed-state-layer-opacity, var(--mat-sys-pressed-state-layer-opacity));
}
.mat-tonal-button .mat-mdc-button-touch-target {
  position: absolute;
  top: 50%;
  height: var(--mat-button-tonal-touch-target-size, 48px);
  display: var(--mat-button-tonal-touch-target-display, block);
  left: 0;
  right: 0;
  transform: translateY(-50%);
}

.mat-mdc-button,
.mat-mdc-unelevated-button,
.mat-mdc-raised-button,
.mat-mdc-outlined-button,
.mat-tonal-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple,
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: inherit;
}
.mat-mdc-button .mat-mdc-button-ripple,
.mat-mdc-unelevated-button .mat-mdc-button-ripple,
.mat-mdc-raised-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-tonal-button .mat-mdc-button-ripple {
  overflow: hidden;
}
.mat-mdc-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-unelevated-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-raised-button .mat-mdc-button-persistent-ripple::before,
.mat-mdc-outlined-button .mat-mdc-button-persistent-ripple::before,
.mat-tonal-button .mat-mdc-button-persistent-ripple::before {
  content: "";
  opacity: 0;
}
.mat-mdc-button .mdc-button__label,
.mat-mdc-button .mat-icon,
.mat-mdc-unelevated-button .mdc-button__label,
.mat-mdc-unelevated-button .mat-icon,
.mat-mdc-raised-button .mdc-button__label,
.mat-mdc-raised-button .mat-icon,
.mat-mdc-outlined-button .mdc-button__label,
.mat-mdc-outlined-button .mat-icon,
.mat-tonal-button .mdc-button__label,
.mat-tonal-button .mat-icon {
  z-index: 1;
  position: relative;
}
.mat-mdc-button .mat-focus-indicator,
.mat-mdc-unelevated-button .mat-focus-indicator,
.mat-mdc-raised-button .mat-focus-indicator,
.mat-mdc-outlined-button .mat-focus-indicator,
.mat-tonal-button .mat-focus-indicator {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: inherit;
}
.mat-mdc-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-unelevated-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-raised-button:focus-visible > .mat-focus-indicator::before,
.mat-mdc-outlined-button:focus-visible > .mat-focus-indicator::before,
.mat-tonal-button:focus-visible > .mat-focus-indicator::before {
  content: "";
  border-radius: inherit;
}
.mat-mdc-button._mat-animation-noopable,
.mat-mdc-unelevated-button._mat-animation-noopable,
.mat-mdc-raised-button._mat-animation-noopable,
.mat-mdc-outlined-button._mat-animation-noopable,
.mat-tonal-button._mat-animation-noopable {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-button > .mat-icon,
.mat-mdc-unelevated-button > .mat-icon,
.mat-mdc-raised-button > .mat-icon,
.mat-mdc-outlined-button > .mat-icon,
.mat-tonal-button > .mat-icon {
  display: inline-block;
  position: relative;
  vertical-align: top;
  font-size: 1.125rem;
  height: 1.125rem;
  width: 1.125rem;
}

.mat-mdc-outlined-button .mat-mdc-button-ripple,
.mat-mdc-outlined-button .mdc-button__ripple {
  top: -1px;
  left: -1px;
  bottom: -1px;
  right: -1px;
}

.mat-mdc-unelevated-button .mat-focus-indicator::before,
.mat-tonal-button .mat-focus-indicator::before,
.mat-mdc-raised-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 2px) * -1);
}

.mat-mdc-outlined-button .mat-focus-indicator::before {
  margin: calc(calc(var(--mat-focus-indicator-border-width, 3px) + 3px) * -1);
}
`,`@media (forced-colors: active) {
  .mat-mdc-button:not(.mdc-button--outlined),
  .mat-mdc-unelevated-button:not(.mdc-button--outlined),
  .mat-mdc-raised-button:not(.mdc-button--outlined),
  .mat-mdc-outlined-button:not(.mdc-button--outlined),
  .mat-mdc-button-base.mat-tonal-button,
  .mat-mdc-icon-button.mat-mdc-icon-button,
  .mat-mdc-outlined-button .mdc-button__ripple {
    outline: solid 1px;
  }
}
`],encapsulation:2,changeDetection:0})}return n})();function Rn(n){return n.hasAttribute("mat-raised-button")?"elevated":n.hasAttribute("mat-stroked-button")?"outlined":n.hasAttribute("mat-flat-button")?"filled":n.hasAttribute("mat-button")?"text":null}var Ni=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=w({type:n});static \u0275inj=y({imports:[on,H]})}return n})();var Nn=["determinateSpinner"];function Fn(n,o){if(n&1&&(xt(),N(0,"svg",11),At(1,"circle",12),P()),n&2){let t=_e();T("viewBox",t._viewBox()),O(),lt("stroke-dasharray",t._strokeCircumference(),"px")("stroke-dashoffset",t._strokeCircumference()/2,"px")("stroke-width",t._circleStrokeWidth(),"%"),T("r",t._circleRadius())}}var Sn=new l("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:sn})}),sn=100,Ln=10,Vi=(()=>{class n{_elementRef=r(E);_noopAnimations;get color(){return this._color||this._defaultColor}set color(t){this._color=t}_color;_defaultColor="primary";_determinateCircle;constructor(){let t=r(Sn),e=zt(),a=this._elementRef.nativeElement;this._noopAnimations=e==="di-disabled"&&!!t&&!t._forceAnimations,this.mode=a.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&e==="reduced-motion"&&a.classList.add("mat-progress-spinner-reduced-motion"),t&&(t.color&&(this.color=this._defaultColor=t.color),t.diameter&&(this.diameter=t.diameter),t.strokeWidth&&(this.strokeWidth=t.strokeWidth))}mode;get value(){return this.mode==="determinate"?this._value:0}set value(t){this._value=Math.max(0,Math.min(100,t||0))}_value=0;get diameter(){return this._diameter}set diameter(t){this._diameter=t||0}_diameter=sn;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(t){this._strokeWidth=t||0}_strokeWidth;_circleRadius(){return(this.diameter-Ln)/2}_viewBox(){let t=this._circleRadius()*2+this.strokeWidth;return`0 0 ${t} ${t}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=I({type:n,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(e,a){if(e&1&&ge(Nn,5),e&2){let i;ye(i=xe())&&(a._determinateCircle=i.first)}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(e,a){e&2&&(T("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",a.mode==="determinate"?a.value:null)("mode",a.mode),ut("mat-"+a.color),lt("width",a.diameter,"px")("height",a.diameter,"px")("--mat-progress-spinner-size",a.diameter+"px")("--mat-progress-spinner-active-indicator-width",a.diameter+"px"),M("_mat-animation-noopable",a._noopAnimations)("mdc-circular-progress--indeterminate",a.mode==="indeterminate"))},inputs:{color:"color",mode:"mode",value:[2,"value","value",z],diameter:[2,"diameter","diameter",z],strokeWidth:[2,"strokeWidth","strokeWidth",z]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(e,a){if(e&1&&(fe(0,Fn,2,8,"ng-template",null,0,Ie),N(2,"div",2,1),xt(),N(4,"svg",3),At(5,"circle",4),P()(),de(),N(6,"div",5)(7,"div",6)(8,"div",7),dt(9,8),P(),N(10,"div",9),dt(11,8),P(),N(12,"div",10),dt(13,8),P()()()),e&2){let i=Ee(1);O(4),T("viewBox",a._viewBox()),O(),lt("stroke-dasharray",a._strokeCircumference(),"px")("stroke-dashoffset",a._strokeDashOffset(),"px")("stroke-width",a._circleStrokeWidth(),"%"),T("r",a._circleRadius()),O(4),ct("ngTemplateOutlet",i),O(2),ct("ngTemplateOutlet",i),O(2),ct("ngTemplateOutlet",i)}},dependencies:[we],styles:[`.mat-mdc-progress-spinner {
  --mat-progress-spinner-animation-multiplier: 1;
  display: block;
  overflow: hidden;
  line-height: 0;
  position: relative;
  direction: ltr;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-progress-spinner circle {
  stroke-width: var(--mat-progress-spinner-active-indicator-width, 4px);
}
.mat-mdc-progress-spinner._mat-animation-noopable, .mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle {
  transition: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container {
  animation: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle {
  stroke-dasharray: 0 !important;
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle {
    stroke: currentColor;
    stroke: CanvasText;
  }
}

.mat-progress-spinner-reduced-motion {
  --mat-progress-spinner-animation-multiplier: 1.25;
}

.mdc-circular-progress__determinate-container,
.mdc-circular-progress__indeterminate-circle-graphic,
.mdc-circular-progress__indeterminate-container,
.mdc-circular-progress__spinner-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mdc-circular-progress__determinate-container {
  transform: rotate(-90deg);
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container {
  opacity: 0;
}

.mdc-circular-progress__indeterminate-container {
  font-size: 0;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 0;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container {
  opacity: 1;
  animation: mdc-circular-progress-container-rotate calc(1568.2352941176ms * var(--mat-progress-spinner-animation-multiplier)) linear infinite;
}

.mdc-circular-progress__determinate-circle-graphic,
.mdc-circular-progress__indeterminate-circle-graphic {
  fill: transparent;
}

.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
  stroke: var(--mat-progress-spinner-active-indicator-color, var(--mat-sys-primary));
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
    stroke: CanvasText;
  }
}

.mdc-circular-progress__determinate-circle {
  transition: stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);
}

.mdc-circular-progress__gap-patch {
  position: absolute;
  top: 0;
  left: 47.5%;
  box-sizing: border-box;
  width: 5%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic {
  left: -900%;
  width: 2000%;
  transform: rotate(180deg);
}
.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic {
  width: 200%;
}
.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  left: -100%;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-left-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-right-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.mdc-circular-progress__circle-clipper {
  display: inline-flex;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer {
  animation: mdc-circular-progress-spinner-layer-rotate calc(5332ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

@keyframes mdc-circular-progress-container-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes mdc-circular-progress-spinner-layer-rotate {
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
@keyframes mdc-circular-progress-left-spin {
  from {
    transform: rotate(265deg);
  }
  50% {
    transform: rotate(130deg);
  }
  to {
    transform: rotate(265deg);
  }
}
@keyframes mdc-circular-progress-right-spin {
  from {
    transform: rotate(-265deg);
  }
  50% {
    transform: rotate(-130deg);
  }
  to {
    transform: rotate(-265deg);
  }
}
`],encapsulation:2,changeDetection:0})}return n})();var Gi=(()=>{class n{static \u0275fac=function(e){return new(e||n)};static \u0275mod=w({type:n});static \u0275inj=y({imports:[H]})}return n})();export{Y as a,Q as b,g as c,p as d,dn as e,k as f,Ot as g,Rt as h,bt as i,Be as j,bn as k,fn as l,We as m,St as n,Lt as o,Bt as p,vn as q,_n as r,yo as s,Ho as t,Vo as u,ko as v,Co as w,No as x,Z as y,ii as z,nn as A,kn as B,on as C,Ri as D,Ni as E,Vi as F,Gi as G};
