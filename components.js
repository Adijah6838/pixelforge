function validateForm(email, name){
  const errs = {};
  if(!name || name.trim().length < 2) errs.name = "Name must be at least 2 characters";
  if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
  return errs;
}
function showToast(msg, type){
  const t = document.createElement("div");
  t.className = "toast"; t.setAttribute("role", "status");
  t.textContent = (type ? type + ": " : "") + msg;
  document.body.appendChild(t);
  setTimeout(()=>t.remove(), 3000);
}
function openModal(){ document.getElementById("modal").classList.add("open"); document.getElementById("modal").querySelector("button").focus(); }
function closeModal(){ document.getElementById("modal").classList.remove("open"); }
function toggleDropdown(){ const m = document.getElementById("ddMenu"); const open = m.classList.toggle("open"); document.getElementById("ddBtn").setAttribute("aria-expanded", open); }
function switchTab(i){ document.querySelectorAll(".tab").forEach((t,idx)=>t.classList.toggle("active", idx===i)); document.querySelectorAll(".panel").forEach((p,idx)=>p.style.display = idx===i ? "block" : "none"); }
function toggleTheme(){ const cur = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark"; document.documentElement.setAttribute("data-theme", cur); localStorage.setItem("pf-theme", cur); }
document.addEventListener("keydown", e=>{ if(e.key==="Escape"){ closeModal(); document.getElementById("ddMenu").classList.remove("open"); } });
document.addEventListener("DOMContentLoaded", ()=>{
  const saved = localStorage.getItem("pf-theme"); if(saved) document.documentElement.setAttribute("data-theme", saved);
  const form = document.getElementById("demoForm");
  if(form) form.addEventListener("submit", e=>{ e.preventDefault(); const email = document.getElementById("fEmail").value; const name = document.getElementById("fName").value; const errs = validateForm(email, name); document.getElementById("eName").textContent = errs.name || ""; document.getElementById("eEmail").textContent = errs.email || ""; document.getElementById("fName").setAttribute("aria-invalid", !!errs.name); document.getElementById("fEmail").setAttribute("aria-invalid", !!errs.email); if(Object.keys(errs).length===0) showToast("Form submitted", "success"); });
});
