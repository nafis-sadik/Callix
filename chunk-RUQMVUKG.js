import{Aa as s,B as r,Ba as H,Ca as Q,Ec as b,Fc as D,Gc as o,H as p,Hc as B,Ia as C,N as g,O as m,R as y,S as v,T as M,U as A,_a as R,aa as c,ba as S,bb as $,ca as k,da as z,db as q,fb as G,ha as P,hb as T,ia as V,l,m as f,n as u,na as x,oa as h,p as a,pa as I,qa as O,sa as E,sc as L,ta as j,tc as d,vc as N}from"./chunk-3EFON6GN.js";var U=`
    .p-iconfield {
        position: relative;
        display: block;
    }

    .p-inputicon {
        position: absolute;
        top: 50%;
        margin-top: calc(-1 * (dt('icon.size') / 2));
        color: dt('iconfield.icon.color');
        line-height: 1;
        z-index: 1;
    }

    .p-iconfield .p-inputicon:first-child {
        inset-inline-start: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputicon:last-child {
        inset-inline-end: dt('form.field.padding.x');
    }

    .p-iconfield .p-inputtext:not(:first-child),
    .p-iconfield .p-inputwrapper:not(:first-child) .p-inputtext {
        padding-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield .p-inputtext:not(:last-child) {
        padding-inline-end: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-iconfield:has(.p-inputfield-sm) .p-inputicon {
        font-size: dt('form.field.sm.font.size');
        width: dt('form.field.sm.font.size');
        height: dt('form.field.sm.font.size');
        margin-top: calc(-1 * (dt('form.field.sm.font.size') / 2));
    }

    .p-iconfield:has(.p-inputfield-lg) .p-inputicon {
        font-size: dt('form.field.lg.font.size');
        width: dt('form.field.lg.font.size');
        height: dt('form.field.lg.font.size');
        margin-top: calc(-1 * (dt('form.field.lg.font.size') / 2));
    }
`;var ie=["*"],oe={root:({instance:e})=>["p-iconfield",{"p-iconfield-left":e.iconPosition=="left","p-iconfield-right":e.iconPosition=="right"}]},J=(()=>{class e extends N{name="iconfield";style=U;classes=oe;static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275prov=l({token:e,factory:e.\u0275fac})}return e})();var K=new u("ICONFIELD_INSTANCE"),ae=(()=>{class e extends D{componentName="IconField";hostName="";_componentStyle=a(J);$pcIconField=a(K,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=a(o,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}iconPosition="left";styleClass;static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275cmp=g({type:e,selectors:[["p-iconfield"],["p-iconField"],["p-icon-field"]],hostVars:2,hostBindings:function(i,n){i&2&&s(n.cn(n.cx("root"),n.styleClass))},inputs:{hostName:"hostName",iconPosition:"iconPosition",styleClass:"styleClass"},features:[C([J,{provide:K,useExisting:e},{provide:b,useExisting:e}]),y([o]),v],ngContentSelectors:ie,decls:1,vars:0,template:function(i,n){i&1&&(h(),I(0))},dependencies:[T,B],encapsulation:2,changeDetection:0})}return e})(),ke=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=m({type:e});static \u0275inj=f({imports:[ae]})}return e})();var re=["*"],se={root:"p-inputicon"},Y=(()=>{class e extends N{name="inputicon";classes=se;static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275prov=l({token:e,factory:e.\u0275fac})}return e})(),Z=new u("INPUTICON_INSTANCE"),ce=(()=>{class e extends D{componentName="InputIcon";hostName="";styleClass;_componentStyle=a(Y);$pcInputIcon=a(Z,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=a(o,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275cmp=g({type:e,selectors:[["p-inputicon"],["p-inputIcon"]],hostVars:2,hostBindings:function(i,n){i&2&&s(n.cn(n.cx("root"),n.styleClass))},inputs:{hostName:"hostName",styleClass:"styleClass"},features:[C([Y,{provide:Z,useExisting:e},{provide:b,useExisting:e}]),y([o]),v],ngContentSelectors:re,decls:1,vars:0,template:function(i,n){i&1&&(h(),I(0))},dependencies:[T,d,B],encapsulation:2,changeDetection:0})}return e})(),Ge=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=m({type:e});static \u0275inj=f({imports:[ce,d,d]})}return e})();var ee=`
    .p-tag {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: dt('tag.primary.background');
        color: dt('tag.primary.color');
        font-size: dt('tag.font.size');
        font-weight: dt('tag.font.weight');
        padding: dt('tag.padding');
        border-radius: dt('tag.border.radius');
        gap: dt('tag.gap');
    }

    .p-tag-icon {
        font-size: dt('tag.icon.size');
        width: dt('tag.icon.size');
        height: dt('tag.icon.size');
    }

    .p-tag-rounded {
        border-radius: dt('tag.rounded.border.radius');
    }

    .p-tag-success {
        background: dt('tag.success.background');
        color: dt('tag.success.color');
    }

    .p-tag-info {
        background: dt('tag.info.background');
        color: dt('tag.info.color');
    }

    .p-tag-warn {
        background: dt('tag.warn.background');
        color: dt('tag.warn.color');
    }

    .p-tag-danger {
        background: dt('tag.danger.background');
        color: dt('tag.danger.color');
    }

    .p-tag-secondary {
        background: dt('tag.secondary.background');
        color: dt('tag.secondary.color');
    }

    .p-tag-contrast {
        background: dt('tag.contrast.background');
        color: dt('tag.contrast.color');
    }
`;var de=["icon"],pe=["*"];function le(e,_){if(e&1&&z(0,"span",4),e&2){let t=x(2);s(t.cx("icon")),c("ngClass",t.icon)("pBind",t.ptm("icon"))}}function fe(e,_){if(e&1&&(P(0),M(1,le,1,4,"span",3),V()),e&2){let t=x();p(),c("ngIf",t.icon)}}function ue(e,_){}function ge(e,_){e&1&&M(0,ue,0,0,"ng-template")}function me(e,_){if(e&1&&(S(0,"span",2),M(1,ge,1,0,null,5),k()),e&2){let t=x();s(t.cx("icon")),c("pBind",t.ptm("icon")),p(),c("ngTemplateOutlet",t.iconTemplate||t._iconTemplate)}}var ye={root:({instance:e})=>["p-tag p-component",{"p-tag-info":e.severity==="info","p-tag-success":e.severity==="success","p-tag-warn":e.severity==="warn","p-tag-danger":e.severity==="danger","p-tag-secondary":e.severity==="secondary","p-tag-contrast":e.severity==="contrast","p-tag-rounded":e.rounded}],icon:"p-tag-icon",label:"p-tag-label"},te=(()=>{class e extends N{name="tag";style=ee;classes=ye;static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275prov=l({token:e,factory:e.\u0275fac})}return e})();var ne=new u("TAG_INSTANCE"),ve=(()=>{class e extends D{componentName="Tag";$pcTag=a(ne,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=a(o,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}styleClass;severity;value;icon;rounded;iconTemplate;templates;_iconTemplate;_componentStyle=a(te);onAfterContentInit(){this.templates?.forEach(t=>{t.getType()==="icon"&&(this._iconTemplate=t.template)})}get dataP(){return this.cn({rounded:this.rounded,[this.severity]:this.severity})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=r(e)))(n||e)}})();static \u0275cmp=g({type:e,selectors:[["p-tag"]],contentQueries:function(i,n,w){if(i&1&&O(w,de,4)(w,L,4),i&2){let F;E(F=j())&&(n.iconTemplate=F.first),E(F=j())&&(n.templates=F)}},hostVars:3,hostBindings:function(i,n){i&2&&(A("data-p",n.dataP),s(n.cn(n.cx("root"),n.styleClass)))},inputs:{styleClass:"styleClass",severity:"severity",value:"value",icon:"icon",rounded:[2,"rounded","rounded",R]},features:[C([te,{provide:ne,useExisting:e},{provide:b,useExisting:e}]),y([o]),v],ngContentSelectors:pe,decls:5,vars:6,consts:[[4,"ngIf"],[3,"class","pBind",4,"ngIf"],[3,"pBind"],[3,"class","ngClass","pBind",4,"ngIf"],[3,"ngClass","pBind"],[4,"ngTemplateOutlet"]],template:function(i,n){i&1&&(h(),I(0),M(1,fe,2,1,"ng-container",0)(2,me,2,4,"span",1),S(3,"span",2),H(4),k()),i&2&&(p(),c("ngIf",!n.iconTemplate&&!n._iconTemplate),p(),c("ngIf",n.iconTemplate||n._iconTemplate),p(),s(n.cx("label")),c("pBind",n.ptm("label")),p(),Q(n.value))},dependencies:[T,$,q,G,d,o],encapsulation:2,changeDetection:0})}return e})(),pt=(()=>{class e{static \u0275fac=function(i){return new(i||e)};static \u0275mod=m({type:e});static \u0275inj=f({imports:[ve,d,d]})}return e})();export{ae as a,ke as b,ce as c,Ge as d,ve as e,pt as f};
