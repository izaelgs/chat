import{_ as c}from"./AppLayout.3eecb1bb.js";import p from"./DeleteUserForm.1f716946.js";import{J as s}from"./SectionBorder.4bc846d9.js";import l from"./LogoutOtherBrowserSessionsForm.880850d6.js";import f from"./TwoFactorAuthenticationForm.7e0641ea.js";import u from"./UpdatePasswordForm.7f9b5743.js";import _ from"./UpdateProfileInformationForm.12623c58.js";import{o,e as d,w as n,a as i,c as r,b as t,i as a,F as h}from"./app.8d5838b4.js";import"./plugin-vue_export-helper.21dcd24c.js";import"./DialogModal.3b019dab.js";import"./InputError.21d89971.js";import"./DangerButton.7047f327.js";import"./Input.51fa6f7a.js";import"./SecondaryButton.baa61015.js";import"./ActionMessage.fa79a039.js";import"./Button.a17f060f.js";import"./Label.a4a6944b.js";import"./FormSection.701cc6bd.js";const g=i("h2",{class:"font-semibold text-xl text-gray-800 leading-tight"}," Profile ",-1),$={class:"max-w-7xl mx-auto py-10 sm:px-6 lg:px-8"},w={key:0},k={key:1},y={key:2},M={__name:"Show",props:{confirmsTwoFactorAuthentication:Boolean,sessions:Array},setup(m){return(e,x)=>(o(),d(c,{title:"Profile"},{header:n(()=>[g]),default:n(()=>[i("div",null,[i("div",$,[e.$page.props.jetstream.canUpdateProfileInformation?(o(),r("div",w,[t(_,{user:e.$page.props.user},null,8,["user"]),t(s)])):a("",!0),e.$page.props.jetstream.canUpdatePassword?(o(),r("div",k,[t(u,{class:"mt-10 sm:mt-0"}),t(s)])):a("",!0),e.$page.props.jetstream.canManageTwoFactorAuthentication?(o(),r("div",y,[t(f,{"requires-confirmation":m.confirmsTwoFactorAuthentication,class:"mt-10 sm:mt-0"},null,8,["requires-confirmation"]),t(s)])):a("",!0),t(l,{sessions:m.sessions,class:"mt-10 sm:mt-0"},null,8,["sessions"]),e.$page.props.jetstream.hasAccountDeletionFeatures?(o(),r(h,{key:3},[t(s),t(p,{class:"mt-10 sm:mt-0"})],64)):a("",!0)])])]),_:1}))}};export{M as default};
