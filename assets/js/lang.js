const supportedLangs = ['en', 'es'];
const defaultLang = 'en';

function setLang(lang) {
    // Asegurarse de que el idioma sea válido
    if (!supportedLangs.includes(lang)) lang = defaultLang;
    localStorage.setItem('lang', lang);
    document.documentElement.setAttribute('lang', lang);
    loadLang(lang);

    // Ajusta la ruta de la bandera
    const prefix = window.location.pathname.includes("/projects/") ? "../" : "";
    const flag = document.getElementById('current-flag');
    if (flag) flag.src = `${prefix}assets/img/flags/${lang}.svg`;

    // Si estamos en una página de proyecto, hace scroll al contenido
    if (window.location.pathname.includes("projects/")) {
        setTimeout(() => {
            document.querySelector("main").scrollIntoView({ behavior: "smooth" });
        }, 300);
    }
}

function loadLang(lang) {
    fetch(`../assets/lang/${lang}.json`)
        .then(res => res.json())
        .then(data => {
            // Actualizar los textos de la página
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                const translation = key.split('.').reduce((o, i) => o?.[i], data);
                if (translation) el.innerText = translation;
            });

            // Si estamos en una página de proyecto, añade la navegación
            if (location.pathname.includes("/projects/")) {
                renderProjectNav(data);
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