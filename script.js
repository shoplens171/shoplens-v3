// ======================================
// SHOPLENS V3
// CORE
// ======================================

document.addEventListener("DOMContentLoaded", () => {

initTheme();

initDrawer();

initScan();

initAnimations();

});

// ======================================
// THEME
// ======================================

function initTheme(){

const html=document.documentElement;

const saved=localStorage.getItem("theme")||"dark";

html.setAttribute("data-theme",saved);

updateThemeIcon(saved);

}

function toggleTheme(){

const html=document.documentElement;

const current=html.getAttribute("data-theme");

const next=current==="dark"?"light":"dark";

html.setAttribute("data-theme",next);

localStorage.setItem("theme",next);

updateThemeIcon(next);

}

function updateThemeIcon(theme){

document.querySelectorAll(".theme-btn,.drawer-theme")

.forEach(btn=>{

btn.textContent=theme==="dark"?"☀️":"🌙";

});

}

// ======================================
// MOBILE DRAWER
// ======================================

function initDrawer(){

const menu=document.getElementById("menuBtn");

const drawer=document.getElementById("mobileDrawer");

const close=document.getElementById("closeDrawer");

const backdrop=document.getElementById("drawerBackdrop");

if(!menu)return;

menu.onclick=()=>{

drawer.classList.add("open");

backdrop.classList.add("show");

document.body.style.overflow="hidden";

};

function hide(){

drawer.classList.remove("open");

backdrop.classList.remove("show");

document.body.style.overflow="";

}

close.onclick=hide;

backdrop.onclick=hide;

drawer.querySelectorAll("a").forEach(link=>{

link.onclick=hide;

});

}

// ======================================
// SCAN
// ======================================

function initScan(){

const trigger=document.getElementById("scanTrigger");

const picker=document.getElementById("filePicker");

if(!trigger)return;

trigger.onclick=()=>picker.click();

picker.onchange=()=>{

if(!picker.files.length)return;

showLoading();

setTimeout(()=>{

window.location.href="search.html";

},1200);

};

}

// ======================================
// LOADING
// ======================================

function showLoading(){

const div=document.createElement("div");

div.id="loadingScreen";

div.innerHTML=`

<div class="loader-card">

<div class="loader-circle"></div>

<h2>Scanning Image...</h2>

<p>Groq AI is analysing your screenshot</p>

</div>

`;

document.body.appendChild(div);

}
// ======================================
// HERO ANIMATIONS
// ======================================

function initAnimations(){

animateStats();

animateCards();

orbEffect();

parallaxBackground();

}

// ======================================
// STATS COUNTER
// ======================================

function animateStats(){

const stats=document.querySelectorAll(".stat-card h2");

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting)return;

const el=entry.target;

const text=el.innerText;

const num=parseInt(text.replace(/\D/g,""));

if(!num)return;

let current=0;

const speed=Math.max(10,Math.floor(num/60));

const timer=setInterval(()=>{

current+=speed;

if(current>=num){

current=num;

clearInterval(timer);

}

if(text.includes("%")){

el.innerText=current+"%";

}else if(text.includes("+")){

el.innerText=current+"+";

}else{

el.innerText=current;

}

},20);

observer.unobserve(el);

});

});

stats.forEach(stat=>observer.observe(stat));

}

// ======================================
// CARD REVEAL
// ======================================

function animateCards(){

const cards=document.querySelectorAll(

".feature-card,.product-card,.stat-card"

);

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

},{threshold:.15});

cards.forEach(card=>{

card.style.opacity="0";

card.style.transform="translateY(40px)";

card.style.transition=".7s ease";

observer.observe(card);

});

}

// ======================================
// FLOATING ORB
// ======================================

function orbEffect(){

const orb=document.querySelector(".orb");

if(!orb)return;

document.addEventListener("mousemove",(e)=>{

const x=(e.clientX/window.innerWidth-.5)*18;

const y=(e.clientY/window.innerHeight-.5)*18;

orb.style.transform=

`translate(${x}px,${y}px)`;

});

}

// ======================================
// PARALLAX
// ======================================

function parallaxBackground(){

window.addEventListener("scroll",()=>{

const y=window.scrollY;

document.body.style.backgroundPosition=

`0 ${y*.05}px`;

});

}

// ======================================
// SPARKLES
// ======================================

document.querySelectorAll(".sparkle").forEach((sparkle,index)=>{

setInterval(()=>{

sparkle.style.opacity=Math.random();

sparkle.style.transform=

`scale(${0.8+Math.random()*1.4})`;

},1800+(index*500));

});

// ======================================
// RIPPLE BUTTON EFFECT
// ======================================

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("click",(e)=>{

const ripple=document.createElement("span");

ripple.className="ripple";

const rect=btn.getBoundingClientRect();

ripple.style.left=(e.clientX-rect.left)+"px";

ripple.style.top=(e.clientY-rect.top)+"px";

btn.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});

// ======================================
// SMOOTH SCROLL LINKS
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(link=>{

link.addEventListener("click",(e)=>{

const target=document.querySelector(

link.getAttribute("href")

);

if(!target)return;

e.preventDefault();

target.scrollIntoView({

behavior:"smooth"

});

});

});

// ======================================
// PERFORMANCE
// ======================================

window.addEventListener("load",()=>{

document.body.classList.add("loaded");

console.log("✅ ShopLens V3 Loaded");

});
// ======================================
// SHOPLENS V3
// FINAL UTILITIES
// ======================================

// IMAGE PREVIEW
const filePicker = document.getElementById("filePicker");

if (filePicker) {

  filePicker.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      localStorage.setItem("scanImage", reader.result);

    };

    reader.readAsDataURL(file);

  });

}

// ======================================
// WISHLIST
// ======================================

function addWishlist(product){

let list=JSON.parse(localStorage.getItem("wishlist")||"[]");

if(!list.includes(product)){

list.push(product);

localStorage.setItem("wishlist",JSON.stringify(list));

showToast("❤️ Added to Wishlist");

}

}

// ======================================
// CART
// ======================================

function addCart(product){

let cart=JSON.parse(localStorage.getItem("cart")||"[]");

cart.push(product);

localStorage.setItem("cart",JSON.stringify(cart));

showToast("🛒 Added to Cart");

}

// ======================================
// TOAST
// ======================================

function showToast(message){

const toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=message;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},50);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>toast.remove(),300);

},2500);

}

// ======================================
// RECENT SEARCHES
// ======================================

function saveRecent(query){

if(!query)return;

let recent=JSON.parse(localStorage.getItem("recentSearches")||"[]");

recent=recent.filter(x=>x!==query);

recent.unshift(query);

recent=recent.slice(0,10);

localStorage.setItem("recentSearches",JSON.stringify(recent));

}

// ======================================
// HEADER EFFECT
// ======================================

window.addEventListener("scroll",()=>{

const nav=document.querySelector(".navbar");

if(!nav)return;

if(window.scrollY>50){

nav.classList.add("navbar-scroll");

}else{

nav.classList.remove("navbar-scroll");

}

});

// ======================================
// KEYBOARD SHORTCUTS
// ======================================

document.addEventListener("keydown",(e)=>{

if(e.key==="/"){

e.preventDefault();

window.location.href="search.html";

}

});

// ======================================
// FUTURE API PLACEHOLDERS
// ======================================

async function scanImage(file){

console.log("Scanning image...");

return [];

}

async function searchProducts(query){

console.log("Searching:",query);

return [];

}

// ======================================
// READY
// ======================================

console.log("%c🚀 ShopLens V3 Ready","color:#8b5cf6;font-size:16px;font-weight:bold;");
