(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{StTC:function(t,e,a){"use strict";var n=a("q1tI"),s=a.n(n),l=a("bItr"),o=a.n(l),i=a("+567");function r(){return(r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t}).apply(this,arguments)}e.a=Object(i.GoogleApiWrapper)({apiKey:"AIzaSyBOlAHWaOh6toAjHbGQwfix_mSSO-tbW64"})((function(t){const[e,a]=s.a.useState(""),[n,i]=s.a.useState({lat:null,lng:null});return t.defaultLocation&&s.a.useEffect(()=>{a(t.defaultLocation)},[t.defaultLocation]),s.a.createElement("span",null,s.a.createElement(o.a,{value:e,onChange:a,onSelect:async n=>{const s=await Object(l.geocodeByAddress)(n),o=await Object(l.getLatLng)(s[0]);a(n),t.location(e),t.latLng(o)}},({getInputProps:t,suggestions:e,getSuggestionItemProps:a,loading:n})=>s.a.createElement("div",null,s.a.createElement("input",r({className:"placesInput"},t({placeholder:"Start typing..."}))),s.a.createElement("div",null,n?s.a.createElement("div",null,"...loading"):null,e.map(t=>{const e={backgroundColor:t.active?"#3366CC":"#ffff"};return s.a.createElement("div",a(t,{style:e}),t.description)})))))}))},iBqQ:function(t,e,a){"use strict";a.d(e,"a",(function(){return l}));var n=a("q1tI"),s=a.n(n);class l extends s.a.Component{render(){return s.a.createElement("option",{value:this.props.id},this.props.optionValue)}}},obHT:function(t,e,a){"use strict";a.r(e),a.d(e,"EditEvent",(function(){return v}));var n=a("q1tI"),s=a.n(n),l=a("vDqi"),o=a.n(l),i=(a("5AJr"),a("wd/R")),r=a.n(i),c=a("iBqQ"),m=a("StTC"),d=a("/MKj"),u=a("xcIm"),h=a("TSYQ"),p=a.n(h);class v extends s.a.Component{constructor(t){super(t),this.getLocation=this.getLocation.bind(this),this.handleChange=this.handleChange.bind(this),this.handleSubmit=this.handleSubmit.bind(this),this.onBackClick=this.onBackClick.bind(this),this.getLatLng=this.getLatLng.bind(this),this.eventsRoute="",this.state={event:"",title:String,description:String,status:String,startDate:String,endDate:String,location:String,eventid:this.props.match.params.id,host:String,evaluator:String,hosts:[],evaluators:[],errors:{}}}componentDidMount(){const t="https://https://hackathon-management.herokuapp.com",{isAdmin:e}=this.props.auth;this.eventsRoute=e?"/events":"/userEvents",o.a.get(`${t}/event/edit/`+this.props.match.params.id,{crossDomain:!0}).then(t=>{this.setState({event:t.data,title:t.data.title,description:t.data.description,status:t.data.status,startDate:r()(t.data.startDate).format("YYYY-MM-DD"),endDate:r()(t.data.endDate).format("YYYY-MM-DD"),location:t.data.location,host:t.data.host,evaluator:t.data.evaluator,latLng:t.data.latLng})}).catch((function(t){console.log(t)})),o.a.get(`${t}/users/getHosts/`,{crossDomain:!0}).then(t=>{this.setState({hosts:t.data})}).catch((function(t){console.log(t)})),o.a.get(`${t}/users/getEvaluators/`,{crossDomain:!0}).then(t=>{this.setState({evaluators:t.data})}).catch((function(t){console.log(t)}))}handleChange(t){t.preventDefault();let e=t.target.name,a=t.target.value;this.setState({[e]:a})}UNSAFE_componentWillReceiveProps(t){t.errors&&this.setState({errors:t.errors})}handleSubmit(t){t.preventDefault();const{match:e,history:a}=this.props,{title:n,description:s,status:l,startDate:o,endDate:i,location:r,host:c,evaluator:m,latLng:d}=this.state;let u={title:n,description:s,status:l,startDate:o,endDate:i,location:r,host:c,evaluator:m,latLng:d};this.props.editEvent(e.params.id,u,a,this.eventsRoute)}onBackClick(t){t.preventDefault(),this.props.history.push(this.eventsRoute)}getLocation(t){this.setState({location:t})}getLatLng(t){this.setState({latLng:t})}render(){const t=s.a.createElement("div",null,s.a.createElement("label",null,"Hosts :",s.a.createElement("select",{value:this.state.host,name:"host",onChange:this.myChangeHandler},s.a.createElement("option",null),this.state.hosts.map((t,e)=>s.a.createElement(c.a,{key:e,id:t._id,optionValue:t.firstName+" "+t.lastName}))))),{errors:e}=this.state,{type:a}=this.props.auth.user;return s.a.createElement("div",{className:"container justify-content-center align-content-center",style:{maxWidth:"400px",marginTop:"50px"}},s.a.createElement("div",{className:"justify-content-center"},s.a.createElement("h1",{className:"font-bold text-center",style:{marginBottom:"40px"}},"Edit Event")),s.a.createElement("form",{onSubmit:this.handleSubmit},s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"form-group col-md-12"},s.a.createElement("input",{className:p()("form-control cust-input",{"is-invalid":e.title}),type:"text",name:"title",defaultValue:this.state.title,onChange:this.handleChange}),e.title&&s.a.createElement("div",{className:"invalid-feedback"},e.title))),s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"form-group col-md-12"},s.a.createElement("textarea",{style:{height:"150px"},className:p()("form-control",{"is-invalid":e.description}),type:"text",name:"description",placeholder:"Description",defaultValue:this.state.description,onChange:this.handleChange}),e.description&&s.a.createElement("div",{className:"invalid-feedback"},e.description))),s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"form-group col-12 col-sm-6 col-xs-6 col-md-6"},s.a.createElement("label",null,"Status: "),s.a.createElement("select",{value:this.state.status,name:"status",onChange:this.handleChange,className:p()("form-control",{"is-invalid":e.status})},s.a.createElement("option",{value:"Open"},"Open"),s.a.createElement("option",{value:"In Progress"},"In Progress"),s.a.createElement("option",{value:"Closed"},"Closed"))),s.a.createElement("div",{className:"form-group col-12 col-sm-6 col-xs-6 col-md-6"},s.a.createElement("div",{style:{display:"flex",flexDirection:"column"}},s.a.createElement("label",null,"Location : "),s.a.createElement("div",{style:{width:"min-content",padding:0},className:p()("cust-input",{"is-invalid":e.location})},s.a.createElement(m.a,{defaultLocation:this.state.location,location:this.getLocation,latLng:this.getLatLng})),e.location&&s.a.createElement("div",{className:"invalid-feedback"},e.location)))),s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"form-group col-12 col-sm-6 col-xs-6 col-md-6"},s.a.createElement("label",null,"Start Date : "),s.a.createElement("input",{className:p()("form-control",{"is-invalid":e.startDate}),type:"date",name:"startDate",defaultValue:this.state.startDate,onChange:this.handleChange}),e.startDate&&s.a.createElement("div",{className:"invalid-feedback"},e.startDate)),s.a.createElement("div",{className:"form-group col-12 col-sm-6 col-xs-6 col-md-6"},s.a.createElement("label",null,"End Date : "),s.a.createElement("input",{className:p()("form-control",{"is-invalid":e.endDate}),type:"date",name:"endDate",defaultValue:this.state.endDate,onChange:this.handleChange}),e.endDate&&s.a.createElement("div",{className:"invalid-feedback"},e.endDate))),"HH"!==a&&t,s.a.createElement("div",{className:"form-row"},s.a.createElement("div",{className:"form-group col-6 col-md-6"},s.a.createElement("label",null,"Evaluators :"),s.a.createElement("select",{className:p()("form-control",{"is-invalid":e.evaluator}),value:this.state.evaluator,name:"evaluator",onChange:this.handleChange},s.a.createElement("option",null),this.state.evaluators.map((t,e)=>s.a.createElement(c.a,{key:e,id:t._id,optionValue:t.firstName+" "+t.lastName}))),e.evaluator&&s.a.createElement("div",{className:"invalid-feedback"},e.evaluator))),s.a.createElement("div",{className:"form-row justify-content-around",style:{marginTop:"10px"}},s.a.createElement("button",{className:"btn btn-primary",type:"submit"},"Edit Event"),s.a.createElement("button",{className:"btn btn-dark",type:"submit",onClick:this.onBackClick},"Back"))))}}e.default=Object(d.b)(t=>({auth:t.auth,errors:t.errors}),{editEvent:u.b})(v)}}]);