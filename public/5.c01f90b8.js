(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{StTC:function(e,t,a){"use strict";var n=a("q1tI"),s=a.n(n),l=a("bItr"),o=a.n(l),i=a("+567");function r(){return(r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}t.a=Object(i.GoogleApiWrapper)({apiKey:"AIzaSyBOlAHWaOh6toAjHbGQwfix_mSSO-tbW64"})((function(e){const[t,a]=s.a.useState(""),[n,i]=s.a.useState({lat:null,lng:null});return e.defaultLocation&&s.a.useEffect(()=>{a(e.defaultLocation)},[e.defaultLocation]),s.a.createElement("span",null,s.a.createElement(o.a,{value:t,onChange:a,onSelect:async n=>{const s=await Object(l.geocodeByAddress)(n),o=await Object(l.getLatLng)(s[0]);a(n),e.location(t),e.latLng(o)}},({getInputProps:e,suggestions:t,getSuggestionItemProps:a,loading:n})=>s.a.createElement("div",null,s.a.createElement("input",r({className:"placesInput"},e({placeholder:"Start typing..."}))),s.a.createElement("div",null,n?s.a.createElement("div",null,"...loading"):null,t.map(e=>{const t={backgroundColor:e.active?"#3366CC":"#ffff"};return s.a.createElement("div",a(e,{style:t}),e.description)})))))}))},iBqQ:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a("q1tI"),s=a.n(n);class l extends s.a.Component{render(){return s.a.createElement("option",{value:this.props.id},this.props.optionValue)}}},oMFo:function(e,t,a){"use strict";a.r(t),a.d(t,"AddEvent",(function(){return g}));var n=a("q1tI"),s=a.n(n),l=a("vDqi"),o=a.n(l),i=a("iBqQ"),r=a("StTC"),c=a("wd/R"),m=a.n(c),d=a("/MKj"),u=a("xcIm"),h=a("TSYQ"),p=a.n(h);class g extends s.a.Component{constructor(e){super(e),this.handleSubmit=this.handleSubmit.bind(this),this.myChangeHandler=this.myChangeHandler.bind(this),this.onBackClick=this.onBackClick.bind(this),this.getLocation=this.getLocation.bind(this),this.getLatLng=this.getLatLng.bind(this),this.state={errors:{},title:String,description:String,status:"",startDate:String,endDate:String,location:String,latLng:[],hosts:[],host:String,evaluator:String,optionValues:[],evaluators:[]}}componentDidMount(){const e="https://https://hackathon-management.herokuapp.com";if(this.props.auth.isAuthenticated){m()(Date.now()).format("YYYY-MM-DD");o.a.get(`${e}/users/getHosts/`,{crossDomain:!0}).then(e=>{this.setState({hosts:e.data})}).catch((function(e){console.log(e)})),o.a.get(`${e}/users/getEvaluators/`,{crossDomain:!0}).then(e=>{this.setState({evaluators:e.data})}).catch((function(e){console.log(e)})),this.setState({status:"Open"}),"HH"===this.props.auth.user.type&&this.setState({host:this.props.auth.user.id})}else this.props.history.push("/login")}UNSAFE_componentWillReceiveProps(e){e.errors&&this.setState({errors:e.errors})}myChangeHandler(e){let t=e.target.name,a=e.target.value;this.setState({[t]:a})}onBackClick(){this.props.history.goBack()}getLocation(e){this.setState({location:e})}getLatLng(e){this.setState({latLng:e})}handleSubmit(e){let t="";t=this.props.auth.isAdmin?"/events":"/userEvents",e.preventDefault();const{title:a,description:n,status:s,startDate:l,endDate:o,location:i,latLng:r,host:c,evaluator:m}=this.state;let d={title:a,description:n,status:s,startDate:l,endDate:o,location:i,latLng:r,host:c,evaluator:m};this.props.addEvent(d,this.props.history,t)}render(){const{errors:e}=this.state,{type:t}=this.props.auth.user,a=s.a.createElement("div",{className:"form-group col-md-6"},s.a.createElement("label",null,"Host :"),s.a.createElement("select",{value:this.state.host,name:"host",onChange:this.myChangeHandler,className:p()("form-control",{"is-invalid":e.host})},s.a.createElement("option",null),this.state.hosts.map((e,t)=>s.a.createElement(i.a,{key:t,id:e._id,optionValue:e.firstName+" "+e.lastName}))),e.evaluator&&s.a.createElement("div",{className:"invalid-feedback"},e.evaluator));return s.a.createElement("div",{className:"container justify-content-center align-content-center",style:{maxWidth:"400px",marginTop:"50px"}},s.a.createElement("div",{className:"justify-content-center"},s.a.createElement("h1",{className:"font-bold text-center",style:{marginBottom:"40px"}},"Add Event")),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"form-group col-md-12"},s.a.createElement("input",{className:p()("form-control cust-input",{"is-invalid":e.title}),placeholder:"Title",type:"text",name:"title",onChange:this.myChangeHandler}),e.title&&s.a.createElement("div",{className:"invalid-feedback"},e.title))),s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"form-group col-md-12"},s.a.createElement("textarea",{style:{height:"150px"},className:p()("form-control",{"is-invalid":e.description}),type:"text",name:"description",placeholder:"Description",onChange:this.myChangeHandler}),e.description&&s.a.createElement("div",{className:"invalid-feedback"},e.description))),s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"form-group col-12 col-sm-6 col-xs-6 col-md-6"},s.a.createElement("label",null,"Status :"),s.a.createElement("select",{value:this.state.status,name:"status",onChange:this.myChangeHandler,className:p()("form-control",{"is-invalid":e.status})},s.a.createElement("option",{value:"Open"},"Open"),s.a.createElement("option",{value:"In Progress"},"In Progress"),s.a.createElement("option",{value:"Closed"},"Closed")),e.startDate&&s.a.createElement("div",{className:"invalid-feedback"},e.status)),s.a.createElement("div",{className:"form-group col-12 col-sm-6 col-xs-6 col-md-6"},s.a.createElement("label",null,"Location :"),s.a.createElement("div",{style:{width:"min-content",padding:0},className:p()("cust-input",{"is-invalid":e.location})},s.a.createElement(r.a,{location:this.getLocation,latLng:this.getLatLng})),e.location&&s.a.createElement("div",{className:"invalid-feedback"},e.location))),s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"form-group col-12 col-sm-6 col-xs-6 col-md-6"},s.a.createElement("label",null,"Start Date :"),s.a.createElement("input",{className:p()("form-control",{"is-invalid":e.startDate}),type:"date",name:"startDate",onChange:this.myChangeHandler}),e.startDate&&s.a.createElement("div",{className:"invalid-feedback"},e.startDate)),s.a.createElement("div",{className:"form-group col-12 col-sm-6 col-xs-6 col-md-6"},s.a.createElement("label",null,"End Date :"),s.a.createElement("input",{className:p()("form-control",{"is-invalid":e.endDate}),type:"date",name:"endDate",onChange:this.myChangeHandler}),e.endDate&&s.a.createElement("div",{className:"invalid-feedback"},e.endDate))),"HH"!==t&&a,s.a.createElement("div",{className:"form-group col-md-6"},s.a.createElement("label",null,"Evaluators : "),s.a.createElement("select",{className:p()("form-control",{"is-invalid":e.evaluator}),value:this.state.evaluator,name:"evaluator",onChange:this.myChangeHandler},s.a.createElement("option",null),this.state.evaluators.map((e,t)=>s.a.createElement(i.a,{key:t,id:e._id,optionValue:e.firstName+" "+e.lastName}))),e.evaluator&&s.a.createElement("div",{className:"invalid-feedback"},e.evaluator)),s.a.createElement("div",{className:"form-row justify-content-around",style:{marginTop:"10px"}},s.a.createElement("button",{className:"btn btn-dark",onClick:this.onBackClick},"Back"),s.a.createElement("button",{className:"btn btn-danger",type:"submit"},"Add Event"))))}}t.default=Object(d.b)(e=>({errors:e.errors,auth:e.auth}),{addEvent:u.a})(g)}}]);