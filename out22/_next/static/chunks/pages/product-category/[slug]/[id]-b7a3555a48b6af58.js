(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[114],{8456:function(r,e,t){"use strict";t.d(e,{Z:function(){return N}});var i=t(3366),n=t(7462),a=t(7294),o=t(512),s=t(8510),c=t(917),l=t(8216),u=t(1657),d=t(948),f=t(1977),h=t(5463);function p(r){return(0,h.ZP)("MuiCircularProgress",r)}(0,f.Z)("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);var m=t(5893);let v=["className","color","disableShrink","size","style","thickness","value","variant"],g=r=>r,x,k,Z,y,_=(0,c.F4)(x||(x=g`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),w=(0,c.F4)(k||(k=g`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),P=r=>{let{classes:e,variant:t,color:i,disableShrink:n}=r,a={root:["root",t,`color${(0,l.Z)(i)}`],svg:["svg"],circle:["circle",`circle${(0,l.Z)(t)}`,n&&"circleDisableShrink"]};return(0,s.Z)(a,p,e)},S=(0,d.ZP)("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver(r,e){let{ownerState:t}=r;return[e.root,e[t.variant],e[`color${(0,l.Z)(t.color)}`]]}})(({ownerState:r,theme:e})=>(0,n.Z)({display:"inline-block"},"determinate"===r.variant&&{transition:e.transitions.create("transform")},"inherit"!==r.color&&{color:(e.vars||e).palette[r.color].main}),({ownerState:r})=>"indeterminate"===r.variant&&(0,c.iv)(Z||(Z=g`
      animation: ${0} 1.4s linear infinite;
    `),_)),j=(0,d.ZP)("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),b=(0,d.ZP)("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver(r,e){let{ownerState:t}=r;return[e.circle,e[`circle${(0,l.Z)(t.variant)}`],t.disableShrink&&e.circleDisableShrink]}})(({ownerState:r,theme:e})=>(0,n.Z)({stroke:"currentColor"},"determinate"===r.variant&&{transition:e.transitions.create("stroke-dashoffset")},"indeterminate"===r.variant&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>"indeterminate"===r.variant&&!r.disableShrink&&(0,c.iv)(y||(y=g`
      animation: ${0} 1.4s ease-in-out infinite;
    `),w)),C=a.forwardRef(function(r,e){let t=(0,u.Z)({props:r,name:"MuiCircularProgress"}),{className:a,color:s="primary",disableShrink:c=!1,size:l=40,style:d,thickness:f=3.6,value:h=0,variant:p="indeterminate"}=t,g=(0,i.Z)(t,v),x=(0,n.Z)({},t,{color:s,disableShrink:c,size:l,thickness:f,value:h,variant:p}),k=P(x),Z={},y={},_={};if("determinate"===p){let w=2*Math.PI*((44-f)/2);Z.strokeDasharray=w.toFixed(3),_["aria-valuenow"]=Math.round(h),Z.strokeDashoffset=`${((100-h)/100*w).toFixed(3)}px`,y.transform="rotate(-90deg)"}return(0,m.jsx)(S,(0,n.Z)({className:(0,o.Z)(k.root,a),style:(0,n.Z)({width:l,height:l},y,d),ownerState:x,ref:e,role:"progressbar"},_,g,{children:(0,m.jsx)(j,{className:k.svg,ownerState:x,viewBox:"22 22 44 44",children:(0,m.jsx)(b,{className:k.circle,style:Z,ownerState:x,cx:44,cy:44,r:(44-f)/2,fill:"none",strokeWidth:f})})}))});var N=C},8214:function(r,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/product-category/[slug]/[id]",function(){return t(1564)}])},1564:function(r,e,t){"use strict";t.r(e);var i=t(7568),n=t(7582),a=t(5893),o=t(1163),s=t(7294),c=t(5789),l=t(5616),u=t(6886),d=t(8456),f=t(5861),h=t(9417),p=t(7007),m=function(){var r,e=(0,o.useRouter)(),t=(0,s.useState)(null),m=t[0],v=t[1],g=(0,s.useState)(!1),x=g[0],k=g[1],Z=e.query,y=Z.slug,_=Z.id,w=(r=(0,i.Z)(function(){var r,e,t;return(0,n.__generator)(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),k(!0),[4,p.Z.get("/product/".concat(_))];case 1:return v(null==(e=i.sent())?void 0:null===(r=e.data)||void 0===r?void 0:r.data),k(!1),[3,3];case 2:return t=i.sent(),k(!1),console.error("Error fetching products:",t),[3,3];case 3:return[2]}})}),function(){return r.apply(this,arguments)});(0,s.useEffect)(function(){_&&w()},[_]);var P=function(r){e.push("/singleproduct/".concat(r))};return y&&_?(0,a.jsx)(c.Z,{children:(0,a.jsx)(l.Z,{sx:{width:"90%",maxWidth:"1500px",margin:"0 auto"},children:(0,a.jsx)(u.ZP,{container:!0,spacing:2,py:8,children:x?(0,a.jsx)("div",{className:"loading-container",children:(0,a.jsx)(d.Z,{})}):null==m?void 0:m.map(function(r,e){var t=(null==r?void 0:r.feature_image)?JSON.parse(r.feature_image):[],i=t.length>0?"".concat(r.img_path,"/").concat(t[0]):"/placeholder.jpg";return(0,a.jsxs)(u.ZP,{item:!0,lg:3,sm:6,sx:{cursor:"pointer"},onClick:function(){return P(r.id)},children:[(0,a.jsx)("img",{src:i,alt:(null==r?void 0:r.p_name)||"Product Image",width:"100%"}),(0,a.jsx)(f.Z,{className:"Medium",fontSize:18,textTransform:"uppercase",children:null==r?void 0:r.p_name}),(0,a.jsx)(h.Z,{variant:"contained",color:"error",onClick:function(){return P(r.id)},children:"View Details"})]},e)})})})}):(0,a.jsx)("p",{children:"Loading..."})};e.default=m}},function(r){r.O(0,[465,789,774,888,179],function(){return r(r.s=8214)}),_N_E=r.O()}]);