/**
 * SHOPLENS V4 CORE
 * Refactored for modularity and performance.
 */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initDrawer();
    initScan();
    initAnimations();
    console.log("🚀 ShopLens V4 Initialized");
});

// ==========================================
// AUTH (Security: Secrets handled via Environment Variables)
// ==========================================
// NOTE: Use a .env file or Vercel Environment Variables for keys!
const SUPABASE_URL = process.env.SUPABASE_URL; 
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// ==========================================
// UI INTERACTION
// ==========================================
function initTheme() {
    const theme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
}

function initDrawer() {
    const menuBtn = document.getElementById("menu-toggle");
    const drawer = document.getElementById("mobile-drawer");
    
    if(!menuBtn) return;
    
    menuBtn.onclick = () => drawer.classList.toggle("open");
}

// ==========================================
// SCANNER (Premium V4 Logic)
// ==========================================
function initScan() {
    const scanTrigger = document.getElementById("scan-trigger");
    const filePicker = document.getElementById("filePicker");

    scanTrigger?.addEventListener("click", () => filePicker.click());

    filePicker?.addEventListener("change", (e) => {
        if (!e.target.files.length) return;
        
        // V4: Triggering Premium Loading Animation
        showPremiumLoader();
        
        const reader = new FileReader();
        reader.onload = () => {
            localStorage.setItem("scanImage", reader.result);
            setTimeout(() => window.location.href = "search.html", 1500);
        };
        reader.readAsDataURL(e.target.files[0]);
    });
}

function showPremiumLoader() {
    const loader = document.createElement("div");
    loader.className = "premium-loader";
    loader.innerHTML = `
        <div class="spinner"></div>
        <p>Analyzing with Groq AI...</p>
    `;
    document.body.appendChild(loader);
}

// ==========================================
// ANIMATIONS (Retained & Optimized)
// ==========================================
function initAnimations() {
    // Keep your IntersectionObserver logic here
    // Just ensure the classes match your new CSS
    animateStats();
    orbEffect();
}

function orbEffect() {
    const orb = document.getElementById("glowing-orb");
    if (!orb) return;
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
}
