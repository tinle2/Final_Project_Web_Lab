(() => {
    const yearEl = document.getElementById("year");
    if (yearEl) {
        yearEl.textContent = String(new Date().getFullYear());
    }

    const themeToggle = document.getElementById("themeToggle");
    const root = document.body;

    function setTheme(theme) {
        root.setAttribute("data-bs-theme", theme);
        const pressed = theme === "dark";
        if (themeToggle) {
            themeToggle.setAttribute("aria-pressed", String(pressed));
            themeToggle.textContent = pressed ? "Light mode" : "Dark mode";
        }
        localStorage.setItem("theme", theme);
    }

    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme === "dark" ? "dark" : "light");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const current = root.getAttribute("data-bs-theme");
            setTheme(current === "dark" ? "light" : "dark");
        });
    }

    const projects = [
        {
            title: "CodeForces Solutions",
            tag: "systems",
            description: "Collection of algorithmic solutions implemented in C++ for Codeforces competitive programming contests. Focused on performance, data structures, and problem-solving strategies.",
            github: "https://github.com/tinle2/CodeForces",
            demo: ""
        },
        {
            title: "Personal Portfolio Website",
            tag: "web",
            description:
            "A responsive single-page portfolio built with HTML, CSS, JavaScript, and Bootstrap to highlight my background and projects.",
            github: "https://github.com/tinle2/Final_Project_Web_Lab",
            demo: "https://tinle2.github.io/Final_Project_Web_Lab/"
        },
        {
            title: "LeetCode Practice",
            tag: "data",
            description: "A continuously growing repository of LeetCode problem solutions in C++. Includes patterns for technical interviews, dynamic programming, greedy strategies, and graph algorithms.",
            github: "https://github.com/tinle2/leetcode",
            demo: ""
        }
    ];

    const grid = document.getElementById("projectGrid");
    const filter = document.getElementById("projectFilter");

    function projectCard(p) {
        const demoLink = p.demo
            ? `<a class="btn btn-sm btn-outline-primary" href="${p.demo}" target="_blank" rel="noreferrer">Live</a>`
            : "";
        return `
      <div class="col-12 col-md-6 col-lg-4" data-tag="${p.tag}">
        <div class="card border-0 shadow-sm rounded-4 h-100">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start gap-2">
              <h3 class="h5 fw-semibold mb-1">${p.title}</h3>
              <span class="badge text-bg-secondary">${p.tag}</span>
            </div>
            <p class="text-secondary mt-2 flex-grow-1">${p.description}</p>
            <div class="d-flex gap-2 flex-wrap">
              <a class="btn btn-sm btn-primary" href="${p.github}" target="_blank" rel="noreferrer">GitHub</a>
              ${demoLink}
            </div>
          </div>
        </div>
      </div>
    `;
    }

    function renderProjects(tag) {
        if (!grid) return;
        const list = tag === "all" ? projects : projects.filter((p) => p.tag === tag);
        grid.innerHTML = list.map(projectCard).join("");
    }

    renderProjects("all");

    if (filter) {
        filter.addEventListener("change", (e) => renderProjects(e.target.value));
    }

    const form = document.getElementById("contactForm");
    const statusEl = document.getElementById("formStatus");
    const fillDemoBtn = document.getElementById("fillDemo");

    if (fillDemoBtn) {
        fillDemoBtn.addEventListener("click", () => {
            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const subject = document.getElementById("subject");
            const message = document.getElementById("message");
            const consent = document.getElementById("consent");

            if (name) name.value = "Demo Visitor";
            if (email) email.value = "visitor@example.com";
            if (subject) subject.value = "Hello Tin";
            if (message)
                message.value =
                    "Hi Tin, I visited your portfolio and wanted to reach out about your projects.";
            if (consent) consent.checked = true;
            if (statusEl) statusEl.textContent = "Demo data filled.";
        });
    }

    function isValidForm() {
        if (!form) return false;
        const ok = form.checkValidity();
        const message = document.getElementById("message");
        if (message) {
            const text = message.value.trim().toLowerCase();
            if (text.includes("http://")) {
                if (statusEl)
                    statusEl.textContent = "Please use https:// links instead of http:// in the message.";
                return false;
            }
        }
        return ok;
    }

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            e.stopPropagation();

            if (!isValidForm()) {
                form.classList.add("was-validated");
                if (statusEl) statusEl.textContent = "Please fix the highlighted fields.";
                return;
            }

            const data = {
                name: form.name.value.trim(),
                email: form.email.value.trim(),
                subject: form.subject.value.trim(),
                message: form.message.value.trim(),
                time: new Date().toISOString()
            };

            localStorage.setItem("lastContactMessage", JSON.stringify(data));
            if (statusEl) statusEl.textContent = "Message saved locally. This is a demo submission.";

            const toastEl = document.getElementById("successToast");
            if (toastEl && window.bootstrap && bootstrap.Toast) {
                const toast = bootstrap.Toast.getOrCreateInstance(toastEl);
                toast.show();
            }

            form.reset();
            form.classList.remove("was-validated");
        });
    }
})();

