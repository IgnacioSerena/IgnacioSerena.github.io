const supportedLangs = ['en', 'es'];
const defaultLang = 'en';
let projectNavRendered = false; // Nueva variable para controlar si la navegación ya se renderizó

function setLang(lang) {
    console.log(`setLang llamado con el idioma: ${lang}`);
    if (!supportedLangs.includes(lang)) lang = defaultLang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    loadLang(lang);

    const prefix = window.location.pathname.includes("/projects/") ? "../" : "";
    const flag = document.getElementById('current-flag');
    if (flag) flag.src = `${prefix}assets/img/flags/${lang}.svg`;

    if (window.location.pathname.includes("projects/")) {
        setTimeout(() => {
            document.querySelector("main").scrollIntoView({ behavior: "smooth" });
        }, 300);
    }
    console.log(`setLang completado para el idioma: ${lang}`);
}

function loadLang(lang) {
    fetch(`../assets/lang/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const translation = key.split('.').reduce((o, i) => o?.[i], data);
                if (translation) el.innerText = translation;
            });

            // Renderizar la navegación solo si estamos en una página de proyecto y aún no se ha renderizado
            if (location.pathname.includes("/projects/") && !projectNavRendered) {
                renderProjectNav(data);
                projectNavRendered = true; // Marcar como renderizado
            } else if (location.pathname.includes("/projects/") && projectNavRendered) {
                // Si ya se renderizó, solo actualizar el texto de la navegación existente
                const prevBtn = document.querySelector(".nav-btn.prev");
                const nextBtn = document.querySelector(".nav-btn.next");
                const backBtn = document.querySelector(".nav-btn.back");
                const positionDiv = document.querySelector(".project-position");
                const currentFile = location.pathname.split("/").pop();
                const index = projectPages.findIndex(p => p.file === currentFile);

                if (prevBtn && index > 0) {
                    prevBtn.innerHTML = `← ${getTranslation(data, projectPages[index - 1].key)}`;
                    prevBtn.href = projectPages[index - 1].file;
                }
                if (nextBtn && index < projectPages.length - 1) {
                    nextBtn.innerHTML = `${getTranslation(data, projectPages[index + 1].key)} →`;
                    nextBtn.href = projectPages[index + 1].file;
                }
                if (backBtn) {
                    backBtn.innerText = getTranslation(data, "project.back");
                }
                if (positionDiv && index !== -1) {
                    positionDiv.innerText = `${index + 1} / ${projectPages.length}`;
                }
            }
        })
        .catch(error => {
            console.error("Error al cargar el archivo de idioma:", error);
        });
}

window.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || defaultLang;
    setLang(lang);
});