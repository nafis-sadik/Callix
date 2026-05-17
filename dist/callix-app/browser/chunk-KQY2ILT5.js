import{a as W,b as H}from"./chunk-RJTDDAVK.js";import"./chunk-WDKUC3SW.js";import{a as Y}from"./chunk-MYNZUSOY.js";import{Aa as D,B as u,Ba as r,Bc as P,Cc as j,Dc as O,Ec as V,Fa as F,Fc as z,Ga as I,Gc as c,H as m,Ha as k,Hc as U,Ia as E,N as s,O as x,R as C,S as w,Tc as R,Uc as $,aa as M,ba as o,ca as i,hb as f,l as g,m as v,ma as N,n as y,oa as S,p as n,pa as L,rb as B,tc as d,vc as _,xc as T,zc as A}from"./chunk-3EFON6GN.js";var G=`
    .p-floatlabel {
        display: block;
        position: relative;
    }

    .p-floatlabel label {
        position: absolute;
        pointer-events: none;
        top: 50%;
        transform: translateY(-50%);
        transition-property: all;
        transition-timing-function: ease;
        line-height: 1;
        font-weight: dt('floatlabel.font.weight');
        inset-inline-start: dt('floatlabel.position.x');
        color: dt('floatlabel.color');
        transition-duration: dt('floatlabel.transition.duration');
    }

    .p-floatlabel:has(.p-textarea) label {
        top: dt('floatlabel.position.y');
        transform: translateY(0);
    }

    .p-floatlabel:has(.p-inputicon:first-child) label {
        inset-inline-start: calc((dt('form.field.padding.x') * 2) + dt('icon.size'));
    }

    .p-floatlabel:has(input:focus) label,
    .p-floatlabel:has(input.p-filled) label,
    .p-floatlabel:has(input:-webkit-autofill) label,
    .p-floatlabel:has(textarea:focus) label,
    .p-floatlabel:has(textarea.p-filled) label,
    .p-floatlabel:has(.p-inputwrapper-focus) label,
    .p-floatlabel:has(.p-inputwrapper-filled) label,
    .p-floatlabel:has(input[placeholder]) label,
    .p-floatlabel:has(textarea[placeholder]) label {
        top: dt('floatlabel.over.active.top');
        transform: translateY(0);
        font-size: dt('floatlabel.active.font.size');
        font-weight: dt('floatlabel.active.font.weight');
    }

    .p-floatlabel:has(input.p-filled) label,
    .p-floatlabel:has(textarea.p-filled) label,
    .p-floatlabel:has(.p-inputwrapper-filled) label {
        color: dt('floatlabel.active.color');
    }

    .p-floatlabel:has(input:focus) label,
    .p-floatlabel:has(input:-webkit-autofill) label,
    .p-floatlabel:has(textarea:focus) label,
    .p-floatlabel:has(.p-inputwrapper-focus) label {
        color: dt('floatlabel.focus.color');
    }

    .p-floatlabel-in .p-inputtext,
    .p-floatlabel-in .p-textarea,
    .p-floatlabel-in .p-select-label,
    .p-floatlabel-in .p-multiselect-label,
    .p-floatlabel-in .p-multiselect-label:has(.p-chip),
    .p-floatlabel-in .p-autocomplete-input-multiple,
    .p-floatlabel-in .p-cascadeselect-label,
    .p-floatlabel-in .p-treeselect-label {
        padding-block-start: dt('floatlabel.in.input.padding.top');
        padding-block-end: dt('floatlabel.in.input.padding.bottom');
    }

    .p-floatlabel-in:has(input:focus) label,
    .p-floatlabel-in:has(input.p-filled) label,
    .p-floatlabel-in:has(input:-webkit-autofill) label,
    .p-floatlabel-in:has(textarea:focus) label,
    .p-floatlabel-in:has(textarea.p-filled) label,
    .p-floatlabel-in:has(.p-inputwrapper-focus) label,
    .p-floatlabel-in:has(.p-inputwrapper-filled) label,
    .p-floatlabel-in:has(input[placeholder]) label,
    .p-floatlabel-in:has(textarea[placeholder]) label {
        top: dt('floatlabel.in.active.top');
    }

    .p-floatlabel-on:has(input:focus) label,
    .p-floatlabel-on:has(input.p-filled) label,
    .p-floatlabel-on:has(input:-webkit-autofill) label,
    .p-floatlabel-on:has(textarea:focus) label,
    .p-floatlabel-on:has(textarea.p-filled) label,
    .p-floatlabel-on:has(.p-inputwrapper-focus) label,
    .p-floatlabel-on:has(.p-inputwrapper-filled) label,
    .p-floatlabel-on:has(input[placeholder]) label,
    .p-floatlabel-on:has(textarea[placeholder]) label {
        top: 0;
        transform: translateY(-50%);
        border-radius: dt('floatlabel.on.border.radius');
        background: dt('floatlabel.on.active.background');
        padding: dt('floatlabel.on.active.padding');
    }

    .p-floatlabel:has([class^='p-'][class$='-fluid']) {
        width: 100%;
    }

    .p-floatlabel:has(.p-invalid) label {
        color: dt('floatlabel.invalid.color');
    }
`;var Z=["*"],ee=`
    ${G}

    /* For PrimeNG */
    .p-floatlabel:has(.ng-invalid.ng-dirty) label {
        color: dt('floatlabel.invalid.color');
    }
`,te={root:({instance:e})=>["p-floatlabel",{"p-floatlabel-over":e.variant==="over","p-floatlabel-on":e.variant==="on","p-floatlabel-in":e.variant==="in"}]},q=(()=>{class e extends _{name="floatlabel";style=ee;classes=te;static \u0275fac=(()=>{let t;return function(a){return(t||(t=u(e)))(a||e)}})();static \u0275prov=g({token:e,factory:e.\u0275fac})}return e})();var J=new y("FLOATLABEL_INSTANCE"),h=(()=>{class e extends z{componentName="FloatLabel";_componentStyle=n(q);$pcFloatLabel=n(J,{optional:!0,skipSelf:!0})??void 0;bindDirectiveInstance=n(c,{self:!0});onAfterViewChecked(){this.bindDirectiveInstance.setAttrs(this.ptms(["host","root"]))}variant="over";static \u0275fac=(()=>{let t;return function(a){return(t||(t=u(e)))(a||e)}})();static \u0275cmp=s({type:e,selectors:[["p-floatlabel"],["p-floatLabel"],["p-float-label"]],hostVars:2,hostBindings:function(l,a){l&2&&D(a.cx("root"))},inputs:{variant:"variant"},features:[E([q,{provide:J,useExisting:e},{provide:V,useExisting:e}]),C([c]),w],ngContentSelectors:Z,decls:1,vars:0,template:function(l,a){l&1&&(S(),L(0))},dependencies:[f,d,U],encapsulation:2,changeDetection:0})}return e})(),K=(()=>{class e{static \u0275fac=function(l){return new(l||e)};static \u0275mod=x({type:e});static \u0275inj=v({imports:[h,d,d]})}return e})();var Q=class e{authService=n(T);alertService=n(Y);router=n(B);displayName="";isLoading=!1;login(){if(!this.displayName.trim()){this.alertService.showError("Error","Please enter a display name");return}this.isLoading=!0;let p=crypto.randomUUID(),t={id:p,displayName:this.displayName.trim(),peerId:p};this.authService.setUser(t),this.isLoading=!1,this.router.navigate(["/home"])}static \u0275fac=function(t){return new(t||e)};static \u0275cmp=s({type:e,selectors:[["app-login"]],decls:15,vars:2,consts:[[1,"min-h-screen","flex","items-center","justify-center","bg-[var(--gradient-bg)]","p-4"],[1,"glass-card","p-8","w-full","max-w-md"],[1,"text-center","mb-8"],[1,"text-4xl","font-bold",2,"color","var(--color-primary)"],[1,"mt-2","text-muted-color"],[1,"flex","flex-col","gap-6"],["pInputText","","id","displayName","type","text",1,"w-full",3,"ngModelChange","ngModel"],["for","displayName"],["label","Sign In","styleClass","w-full",3,"onClick","disabled"],[1,"text-center","mt-6","text-sm","text-muted-color"]],template:function(t,l){t&1&&(o(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),r(4,"Callix"),i(),o(5,"p",4),r(6,"P2P meetings & chat \u2014 no servers, no limits"),i()(),o(7,"div",5)(8,"p-floatLabel")(9,"input",6),k("ngModelChange",function(b){return I(l.displayName,b)||(l.displayName=b),b}),i(),o(10,"label",7),r(11,"Display Name"),i()(),o(12,"p-button",8),N("onClick",function(){return l.login()}),i()(),o(13,"p",9),r(14," By continuing, you agree to our terms of service "),i()()()),t&2&&(m(9),F("ngModel",l.displayName),m(3),M("disabled",l.isLoading))},dependencies:[f,O,A,P,j,H,W,$,R,K,h],styles:["[_nghost-%COMP%]{display:block}input[_ngcontent-%COMP%]:focus{border-color:var(--color-primary)!important}button[_ngcontent-%COMP%]:hover{transform:translateY(-1px);transition:transform .15s ease}"],changeDetection:0})};export{Q as LoginComponent};
