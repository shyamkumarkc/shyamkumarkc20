(function(){

const API = "https://shyamkumarkc20.com.np/js/ipo.json";
const containerID = "nepal-ipo-dashboard";
const refreshTime = 300000; // 5 minutes

function init(){

let container = document.getElementById(containerID);

if(!container){
container = document.createElement("div");
container.id = containerID;
document.body.appendChild(container);
}

container.innerHTML = `
<div class="ipo-box">
<div class="ipo-header">Nepal IPO Dashboard</div>
<div class="ipo-loading">Loading IPO data...</div>
</div>
`;

fetchData();

}

function fetchData(){

fetch(API)
.then(res=>res.json())
.then(data=>{
render(data);
})
.catch(()=>{
document.getElementById(containerID).innerHTML = `
<div class="ipo-box">
<div class="ipo-header">Nepal IPO Dashboard</div>
<div class="ipo-error">IPO data unavailable</div>
</div>`;
});

}

function render(data){

let html = `
<div class="ipo-box">
<div class="ipo-header">Nepal IPO Dashboard</div>
`;

if(data.ipo && data.ipo.length){

data.ipo.forEach(i=>{

let units = Number(i.units || 0);
let applied = Number(i.applied || 0);

let progress = 0;

if(units > 0){
progress = Math.min(100,(applied/units)*100);
}

let statusClass = "ipo-upcoming";

if(i.status === "Open") statusClass = "ipo-open";
if(i.status === "Closed") statusClass = "ipo-closed";

html += `

<div class="ipo-card">

<div class="ipo-company">
${i.company}

<span class="ipo-status ${statusClass}">
${i.status}
</span>

</div>

<div class="ipo-meta">

Units: ${units.toLocaleString()} <br>
Price: Rs ${i.price} <br>
Open: ${i.open} <br>
Close: ${i.close}

</div>

<div class="ipo-progress">
<div class="ipo-bar" style="width:${progress}%"></div>
</div>

<div class="ipo-progress-text">
${progress.toFixed(0)}% Applied
</div>

</div>

`;

});

}else{

html += `<div class="ipo-empty">No active IPO currently</div>`;

}

html += `

<div class="ipo-credit">
Powered by
<a href="https://shyamkumarkc20.com.np" target="_blank">
shyamkumarkc20.com.np
</a>
</div>

</div>
`;

document.getElementById(containerID).innerHTML = html;

}

function loadStyle(){

const css = `

.ipo-box{
font-family:Segoe UI,Arial;
background:#ffffff;
border:1px solid #ddd;
border-radius:12px;
padding:15px;
max-width:420px;
box-shadow:0 4px 15px rgba(0,0,0,0.05);
}

.ipo-header{
font-size:18px;
font-weight:600;
margin-bottom:10px;
}

.ipo-card{
border-top:1px solid #eee;
padding:10px 0;
}

.ipo-company{
font-weight:600;
font-size:15px;
display:flex;
justify-content:space-between;
align-items:center;
}

.ipo-status{
font-size:11px;
padding:3px 7px;
border-radius:4px;
color:#fff;
}

.ipo-open{
background:#16a34a;
}

.ipo-closed{
background:#dc2626;
}

.ipo-upcoming{
background:#2563eb;
}

.ipo-meta{
font-size:13px;
color:#555;
margin-top:5px;
}

.ipo-progress{
height:6px;
background:#eee;
border-radius:5px;
margin-top:8px;
overflow:hidden;
}

.ipo-bar{
height:100%;
background:#2563eb;
}

.ipo-progress-text{
font-size:12px;
margin-top:4px;
color:#666;
}

.ipo-credit{
font-size:11px;
margin-top:10px;
color:#777;
}

.ipo-credit a{
text-decoration:none;
color:#2563eb;
}

.ipo-loading{
font-size:13px;
color:#666;
}

.ipo-error{
font-size:13px;
color:red;
}

`;

const style = document.createElement("style");
style.innerHTML = css;
document.head.appendChild(style);

}

loadStyle();
init();
setInterval(fetchData, refreshTime);

})();
