<script>
(function(){

const IPO_API="https://shyamkumarkc20.com.np/js/ipo.json";

/* ---------- CREATE HTML STRUCTURE ---------- */

const container=document.createElement("div");

container.innerHTML=`

<div class="container">
  <div class="ipo-widgets">

    <div class="ipo-widget" id="currentIPOWidget">
      <div id="currentIPOBox">Loading...</div>
    </div>

    <div class="ipo-widget" id="upcomingIPOWidget">
      <div id="upcomingIPOBox">Loading...</div>
    </div>

  </div>
</div>

`;

document.currentScript.parentNode.insertBefore(container,document.currentScript);


/* ---------- ADD STYLES ---------- */

const style=document.createElement("style");

style.innerHTML=`

.container{
max-width:900px;
margin:auto;
padding:20px;
}

.ipo-widgets{
display:grid;
grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
gap:20px;
margin-bottom:25px;
}

.ipo-widget{
background:#fff;
padding:20px;
border-radius:14px;
box-shadow:0 3px 12px rgba(0,0,0,.08);
transition:background .3s;
}

.ipo-badge{
display:inline-block;
padding:6px 12px;
border-radius:20px;
font-weight:600;
margin-bottom:5px;
}

.current-badge{
background:#e7f7ee;
color:#0c7a43;
}

.upcoming-badge{
background:#eef3ff;
color:#1a4fd8;
}

.none-badge{
background:#222;
color:#fff;
}

.current-widget{
background:#1abc9c;
color:#fff;
}

.upcoming-widget{
background:#3498db;
color:#fff;
}

.none-widget{
background:#222;
color:#fff;
}

.ipo-name{
font-size:18px;
font-weight:700;
margin:8px 0;
}

@media(max-width:600px){

.ipo-name{
font-size:16px;
}

.ipo-badge{
font-size:12px;
padding:5px 10px;
}

.ipo-widget{
padding:15px;
}

}

`;

document.head.appendChild(style);


/* ---------- FETCH IPO DATA ---------- */

fetch(IPO_API)

.then(res=>res.json())

.then(result=>{

let data=result.ipo;

let now=new Date();

let currentIPO=null;

let upcomingIPO=null;

let nearestDiff=Infinity;


/* ---------- FIND CURRENT & UPCOMING IPO ---------- */

data.forEach(ipo=>{

if(!ipo.openingDate || ipo.openingDate.trim()==="") return;

let open=new Date(ipo.openingDate+"T10:00:00");

let close=new Date(ipo.closingDate+"T17:00:00");


if(now>=open && now<=close){

currentIPO=ipo;

}


if(now<open){

let diff=open-now;

if(diff<nearestDiff){

nearestDiff=diff;

upcomingIPO=ipo;

}

}

});


/* ---------- RENDER CURRENT IPO ---------- */

if(currentIPO){

renderIPO(

currentIPO,

"Current IPO",

"current-badge",

"currentIPOBox",

"currentIPOWidget",

"current-widget"

);

}else{

renderPlaceholder(

"No Current IPO",

"currentIPOBox",

"currentIPOWidget",

"none-widget"

);

}


/* ---------- RENDER UPCOMING IPO ---------- */

if(upcomingIPO){

renderIPO(

upcomingIPO,

"Upcoming IPO",

"upcoming-badge",

"upcomingIPOBox",

"upcomingIPOWidget",

"upcoming-widget"

);

}else{

renderPlaceholder(

"No Upcoming IPO",

"upcomingIPOBox",

"upcomingIPOWidget",

"none-widget"

);

}


/* ---------- FUNCTIONS ---------- */

function renderIPO(ipo,title,badgeCls,boxId,widgetId,widgetCls){

document.getElementById(widgetId).className="ipo-widget "+widgetCls;

document.getElementById(boxId).innerHTML=`

<div class="ipo-badge ${badgeCls}">${title}</div>

<div class="ipo-name">${ipo.company}</div>

`;

}


function renderPlaceholder(text,boxId,widgetId,widgetCls){

document.getElementById(widgetId).className="ipo-widget "+widgetCls;

document.getElementById(boxId).innerHTML=`

<div class="ipo-badge none-badge">${text}</div>

`;

}

})

.catch(()=>{

document.getElementById("currentIPOBox").innerText="Failed to load";

document.getElementById("upcomingIPOBox").innerText="Failed to load";

});

})();
</script>
