tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#7c5cff", 2: "#00e6b8" },
      },
      boxShadow: {
        soft: "0 10px 35px rgba(0,0,0,.25)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        drift: {
          "0%,100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(12px)" },
        },
        pulseGlow: {
          "0%,100%": { opacity: 0.6 },
          "50%": { opacity: 0.12 },
        },
      },
      animation: {
        float: "floaty 8s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
        pulseGlow: "pulseGlow 4s ease-in-out infinite",
      },
    },
  },
};

window.addEventListener("load", () => {
  setTimeout(() => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("fade-out");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 900); // match fade-out duration
  }, 1000); // loader stays for 1 seconds
});

// back to top button
// Back to top button logic
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  if (window.scrollY > window.innerHeight * 0.8) {
    backToTop.classList.remove("hidden");
  } else {
    backToTop.classList.add("hidden");
  }
});
backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

AOS.init({ duration: 900, once: true, offset: 80 });

// Mobile menu
const mbtn = document.getElementById("menuBtn");
const mmenu = document.getElementById("mobileMenu");
mbtn?.addEventListener("click", () => mmenu.classList.toggle("hidden"));

// Scrollspy: update active link
const navLinks = Array.from(document.querySelectorAll("header nav a"));
const sections = navLinks.map((a) =>
  document.querySelector(a.getAttribute("href"))
);
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.id;
      const link = navLinks.find((l) => l.getAttribute("href") === "#" + id);
      if (entry.isIntersecting) {
        navLinks.forEach((l) => l.classList.remove("text-white"));
        link?.classList.add("text-white");
      }
    });
  },
  { rootMargin: "-60% 0px -35% 0px", threshold: 0 }
);
sections.forEach((s) => s && spy.observe(s));

// Contact form demo validation
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();
  const email = (data.get("email") || "").toString().trim();
  const message = (data.get("message") || "").toString().trim();
  if (!name || !email || !message) {
    status.textContent = "Please fill in all fields.";
    status.style.color = "#ffb4b4";
    return;
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    status.textContent = "Please enter a valid email.";
    status.style.color = "#ffb4b4";
    return;
  }
  status.textContent = "Thanks! Your message has been queued locally (demo).";
  status.style.color = "#cbd5e1";
  form.reset();
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();

AOS.init({ duration: 900, once: true, offset: 80 }); ////Contact form validation const form = document.getElementById("contactForm"); const status = document.getElementById("formStatus"); form?.addEventListener("submit", (e) => { e.preventDefault(); const data = new FormData(form); const name = (data.get("name") || "").toString().trim(); const email = (data.get("email") || "").toString().trim(); const message = (data.get("message") || "").toString().trim(); if (!name || !email || !message) { status.textContent = "Please fill in all fields."; status.style.color = "#ffb4b4"; return; } const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); if (!emailOk) { status.textContent = "Please enter a valid email."; status.style.color = "#ffb4b4"; return; } status.textContent = "Thanks! Your message has been queued locally (demo)."; status.style.color = "#cbd5e1"; form.reset(); }); // Year auto update document.getElementById("year").textContent = new Date().getFullYear();

const phrases = [
  "Data Science Enthusiast",
  "Machine Learning Enthusiast",
  "Full-Stack Developer",
  "Artificial Intelligence Enthusiast",
  "Problem Solver",
  "Python Developer",
];
let index = 0;
const rotatingText = document.getElementById("rotating-text");

setInterval(() => {
  rotatingText.classList.add("opacity-0"); // fade out

  setTimeout(() => {
    index = (index + 1) % phrases.length;
    rotatingText.textContent = phrases[index];
    rotatingText.classList.remove("opacity-0"); // fade in
  }, 500); // matches transition duration
}, 3000); // change every

//header
document.addEventListener("DOMContentLoaded", () => {
  const HEADER_HEIGHT = 80; // ~h-20
  const activeClasses = [
    "bg-gradient-to-r",
    "from-brand",
    "to-brand-2",
    "text-black",
    "shadow-md",
    "ring-1",
    "ring-white/10",
    "scale-[1.02]",
  ];

  const navLinks = Array.from(document.querySelectorAll("#main-nav .nav-link"));
  // Build map: sectionId -> link
  const linkById = new Map(
    navLinks.map((a) => [a.getAttribute("href").replace("#", ""), a])
  );

  // Remove active styles from all links
  function clearActive() {
    navLinks.forEach((a) => a.classList.remove(...activeClasses));
  }

  // Apply active styles
  function setActive(id) {
    if (!id || !linkById.has(id)) return;
    clearActive();
    linkById.get(id).classList.add(...activeClasses);
  }

  // If sections don’t exist yet, this prevents errors
  const sections = Array.from(linkById.keys())
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  // Fallback: set initial active from hash or first link
  setActive((location.hash || "").replace("#", "") || sections[0]?.id || null);

  // Highlight on click immediately (nice UX)
  navLinks.forEach((a) => {
    a.addEventListener("click", () =>
      setActive(a.getAttribute("href").slice(1))
    );
  });

  // Use IntersectionObserver for reliable scroll-based highlighting
  const observer = new IntersectionObserver(
    (entries) => {
      // pick the most visible section in viewport
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target && visible.target.id) {
        setActive(visible.target.id);
      }
    },
    {
      // Keep header height in mind; focus around viewport center
      root: null,
      rootMargin: `-${HEADER_HEIGHT + 20}px 0px -55% 0px`,
      threshold: [0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((sec) => observer.observe(sec));
});

// Add custom rotation animation
// tailwind.config.theme.extend.keyframes.rotatey = {
//   "0%": { transform: "rotateY(0deg)" },
//   "50%": { transform: "rotateY(180deg)" },
//   "100%": { transform: "rotateY(360deg)" },
// };

// tailwind.config.theme.extend.animation.rotate = "rotatey 10s linear infinite";
