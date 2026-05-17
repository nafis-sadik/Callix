import{c as W}from"./chunk-RDG6L5OL.js";import{$a as $,Aa as g,B as k,Ba as P,Ca as R,Ec as K,Gc as u,H as r,Hc as Y,Ia as G,Ka as B,N as O,O as N,R as D,Rc as J,S as A,T as y,U as T,Wa as H,X as p,Y as b,_a as L,aa as l,ba as _,ca as C,da as F,fb as j,hb as Q,ja as v,k as x,l as w,m as I,ma as S,n as E,na as c,p as s,qa as z,sa as f,sc as V,ta as h,tc as m,vc as U,w as M,yc as q}from"./chunk-3EFON6GN.js";var X=`
    .p-togglebutton {
        display: inline-flex;
        cursor: pointer;
        user-select: none;
        overflow: hidden;
        position: relative;
        color: dt('togglebutton.color');
        background: dt('togglebutton.background');
        border: 1px solid dt('togglebutton.border.color');
        padding: dt('togglebutton.padding');
        font-size: 1rem;
        font-family: inherit;
        font-feature-settings: inherit;
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
        border-radius: dt('togglebutton.border.radius');
        outline-color: transparent;
        font-weight: dt('togglebutton.font.weight');
    }

    .p-togglebutton-content {
        display: inline-flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;
        gap: dt('togglebutton.gap');
        padding: dt('togglebutton.content.padding');
        background: transparent;
        border-radius: dt('togglebutton.content.border.radius');
        transition:
            background dt('togglebutton.transition.duration'),
            color dt('togglebutton.transition.duration'),
            border-color dt('togglebutton.transition.duration'),
            outline-color dt('togglebutton.transition.duration'),
            box-shadow dt('togglebutton.transition.duration');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover {
        background: dt('togglebutton.hover.background');
        color: dt('togglebutton.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked {
        background: dt('togglebutton.checked.background');
        border-color: dt('togglebutton.checked.border.color');
        color: dt('togglebutton.checked.color');
    }

    .p-togglebutton-checked .p-togglebutton-content {
        background: dt('togglebutton.content.checked.background');
        box-shadow: dt('togglebutton.content.checked.shadow');
    }

    .p-togglebutton:focus-visible {
        box-shadow: dt('togglebutton.focus.ring.shadow');
        outline: dt('togglebutton.focus.ring.width') dt('togglebutton.focus.ring.style') dt('togglebutton.focus.ring.color');
        outline-offset: dt('togglebutton.focus.ring.offset');
    }

    .p-togglebutton.p-invalid {
        border-color: dt('togglebutton.invalid.border.color');
    }

    .p-togglebutton:disabled {
        opacity: 1;
        cursor: default;
        background: dt('togglebutton.disabled.background');
        border-color: dt('togglebutton.disabled.border.color');
        color: dt('togglebutton.disabled.color');
    }

    .p-togglebutton-label,
    .p-togglebutton-icon {
        position: relative;
        transition: none;
    }

    .p-togglebutton-icon {
        color: dt('togglebutton.icon.color');
    }

    .p-togglebutton:not(:disabled):not(.p-togglebutton-checked):hover .p-togglebutton-icon {
        color: dt('togglebutton.icon.hover.color');
    }

    .p-togglebutton.p-togglebutton-checked .p-togglebutton-icon {
        color: dt('togglebutton.icon.checked.color');
    }

    .p-togglebutton:disabled .p-togglebutton-icon {
        color: dt('togglebutton.icon.disabled.color');
    }

    .p-togglebutton-sm {
        padding: dt('togglebutton.sm.padding');
        font-size: dt('togglebutton.sm.font.size');
    }

    .p-togglebutton-sm .p-togglebutton-content {
        padding: dt('togglebutton.content.sm.padding');
    }

    .p-togglebutton-lg {
        padding: dt('togglebutton.lg.padding');
        font-size: dt('togglebutton.lg.font.size');
    }

    .p-togglebutton-lg .p-togglebutton-content {
        padding: dt('togglebutton.content.lg.padding');
    }

    .p-togglebutton-fluid {
        width: 100%;
    }
`;var ot=["icon"],it=["content"],nt=n=>({$implicit:n});function lt(n,a){n&1&&v(0)}function at(n,a){if(n&1&&F(0,"span",0),n&2){let t=c(3);g(t.cn(t.cx("icon"),t.checked?t.onIcon:t.offIcon,t.iconPos==="left"?t.cx("iconLeft"):t.cx("iconRight"))),l("pBind",t.ptm("icon"))}}function dt(n,a){if(n&1&&p(0,at,1,3,"span",2),n&2){let t=c(2);b(t.onIcon||t.offIcon?0:-1)}}function rt(n,a){n&1&&v(0)}function ct(n,a){if(n&1&&y(0,rt,1,0,"ng-container",1),n&2){let t=c(2);l("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)("ngTemplateOutletContext",B(2,nt,t.checked))}}function gt(n,a){if(n&1&&(p(0,dt,1,1)(1,ct,1,4,"ng-container"),_(2,"span",0),P(3),C()),n&2){let t=c();b(t.iconTemplate?1:0),r(2),g(t.cx("label")),l("pBind",t.ptm("label")),r(),R(t.checked?t.hasOnLabel?t.onLabel:"\xA0":t.hasOffLabel?t.offLabel:"\xA0")}}var ut=`
    ${X}

    /* For PrimeNG (iconPos) */
    .p-togglebutton-icon-right {
        order: 1;
    }

    .p-togglebutton.ng-invalid.ng-dirty {
        border-color: dt('togglebutton.invalid.border.color');
    }
`,st={root:({instance:n})=>["p-togglebutton p-component",{"p-togglebutton-checked":n.checked,"p-invalid":n.invalid(),"p-disabled":n.$disabled(),"p-togglebutton-sm p-inputfield-sm":n.size==="small","p-togglebutton-lg p-inputfield-lg":n.size==="large","p-togglebutton-fluid":n.fluid()}],content:"p-togglebutton-content",icon:"p-togglebutton-icon",iconLeft:"p-togglebutton-icon-left",iconRight:"p-togglebutton-icon-right",label:"p-togglebutton-label"},Z=(()=>{class n extends U{name="togglebutton";style=ut;classes=st;static \u0275fac=(()=>{let t;return function(e){return(t||(t=k(n)))(e||n)}})();static \u0275prov=w({token:n,factory:n.\u0275fac})}return n})();var tt=new E("TOGGLEBUTTON_INSTANCE"),pt={provide:q,useExisting:x(()=>et),multi:!0},et=(()=>{class n extends W{componentName="ToggleButton";$pcToggleButton=s(tt,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=s(u,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}onKeyDown(t){switch(t.code){case"Enter":this.toggle(t),t.preventDefault();break;case"Space":this.toggle(t),t.preventDefault();break}}toggle(t){!this.$disabled()&&!(this.allowEmpty===!1&&this.checked)&&(this.checked=!this.checked,this.writeModelValue(this.checked),this.onModelChange(this.checked),this.onModelTouched(),this.onChange.emit({originalEvent:t,checked:this.checked}),this.cd.markForCheck())}onLabel="Yes";offLabel="No";onIcon;offIcon;ariaLabel;ariaLabelledBy;styleClass;inputId;tabindex=0;iconPos="left";autofocus;size;allowEmpty;fluid=H(void 0,{transform:L});onChange=new M;iconTemplate;contentTemplate;templates;checked=!1;onInit(){(this.checked===null||this.checked===void 0)&&(this.checked=!1)}_componentStyle=s(Z);onBlur(){this.onModelTouched()}get hasOnLabel(){return this.onLabel&&this.onLabel.length>0}get hasOffLabel(){return this.offLabel&&this.offLabel.length>0}get active(){return this.checked===!0}_iconTemplate;_contentTemplate;onAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"icon":this._iconTemplate=t.template;break;case"content":this._contentTemplate=t.template;break;default:this._contentTemplate=t.template;break}})}writeControlValue(t,o){this.checked=t,o(t),this.cd.markForCheck()}get dataP(){return this.cn({checked:this.active,invalid:this.invalid(),[this.size]:this.size})}static \u0275fac=(()=>{let t;return function(e){return(t||(t=k(n)))(e||n)}})();static \u0275cmp=O({type:n,selectors:[["p-toggleButton"],["p-togglebutton"],["p-toggle-button"]],contentQueries:function(o,e,d){if(o&1&&z(d,ot,4)(d,it,4)(d,V,4),o&2){let i;f(i=h())&&(e.iconTemplate=i.first),f(i=h())&&(e.contentTemplate=i.first),f(i=h())&&(e.templates=i)}},hostVars:11,hostBindings:function(o,e){o&1&&S("keydown",function(i){return e.onKeyDown(i)})("click",function(i){return e.toggle(i)}),o&2&&(T("aria-labelledby",e.ariaLabelledBy)("aria-label",e.ariaLabel)("aria-pressed",e.checked?"true":"false")("role","button")("tabindex",e.tabindex!==void 0?e.tabindex:e.$disabled()?-1:0)("data-pc-name","togglebutton")("data-p-checked",e.active)("data-p-disabled",e.$disabled())("data-p",e.dataP),g(e.cn(e.cx("root"),e.styleClass)))},inputs:{onLabel:"onLabel",offLabel:"offLabel",onIcon:"onIcon",offIcon:"offIcon",ariaLabel:"ariaLabel",ariaLabelledBy:"ariaLabelledBy",styleClass:"styleClass",inputId:"inputId",tabindex:[2,"tabindex","tabindex",$],iconPos:"iconPos",autofocus:[2,"autofocus","autofocus",L],size:"size",allowEmpty:"allowEmpty",fluid:[1,"fluid"]},outputs:{onChange:"onChange"},features:[G([pt,Z,{provide:tt,useExisting:n},{provide:K,useExisting:n}]),D([J,u]),A],decls:3,vars:9,consts:[[3,"pBind"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],[3,"class","pBind"]],template:function(o,e){o&1&&(_(0,"span",0),y(1,lt,1,0,"ng-container",1),p(2,gt,4,5),C()),o&2&&(g(e.cx("content")),l("pBind",e.ptm("content")),T("data-p",e.dataP),r(),l("ngTemplateOutlet",e.contentTemplate||e._contentTemplate)("ngTemplateOutletContext",B(7,nt,e.checked)),r(),b(e.contentTemplate?-1:2))},dependencies:[Q,j,m,Y,u],encapsulation:2,changeDetection:0})}return n})(),zt=(()=>{class n{static \u0275fac=function(o){return new(o||n)};static \u0275mod=N({type:n});static \u0275inj=I({imports:[et,m,m]})}return n})();export{et as a,zt as b};
