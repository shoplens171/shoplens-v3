document.addEventListener("DOMContentLoaded", () => {
    // UI Init
    const menuBtn = document.getElementById("menu-toggle");
    menuBtn?.addEventListener("click", () => alert("Drawer Logic Here"));

    // Scan Logic
    const trigger = document.getElementById("scan-trigger");
    const picker = document.getElementById("filePicker");

    trigger?.addEventListener("click", () => picker.click());

    picker?.addEventListener("change", (e) => {
        if (!e.target.files.length) return;
        
        // V4 Loading State
        const loader = document.createElement("div");
        loader.className = "loader";
        loader.textContent = "Analyzing...";
        document.body.appendChild(loader);
        
        setTimeout(() => window.location.href = "search.html", 1200);
    });
});

function toggleTheme() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
}
