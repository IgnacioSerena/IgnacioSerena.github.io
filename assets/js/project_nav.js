const projectPages = [
    { file: "http_server.html", key: "projects.http_server_title" },
    { file: "Game-of-the-ant.html", key: "projects.Game-of-the-ant_title" },
    { file: "Sistema-Domotico.html", key: "projects.Sistema-Domotico_title" },
];

function getTranslation(langData, key) {
    return key.split('.').reduce((o, i) => (o ? o[i] : null), langData) || key;
}

function renderProjectNav(langData) {
    console.log('renderProjectNav llamado'); 
    const currentFile = location.pathname.split("/").pop();
    const index = projectPages.findIndex(p => p.file === currentFile);
    if (index === -1) return;

    const existingNav = document.querySelector(".project-nav");
    if (existingNav) {
        console.log('Barra de navegación existente encontrada y eliminada'); 
        existingNav.remove();
    }

    const navContainer = document.createElement("div");
    navContainer.className = "project-nav";

    if (index > 0) {
        const prev = document.createElement("a");
        prev.href = projectPages[index - 1].file;
        prev.className = "nav-btn prev";
        prev.innerHTML = `← ${getTranslation(langData, projectPages[index - 1].key)}`;
        navContainer.appendChild(prev);
    }

    const back = document.createElement("a");
    back.href = "../projects.html";
    back.className = "nav-btn back";
    back.innerText = getTranslation(langData, "project.back");
    navContainer.appendChild(back);

    const position = document.createElement("div");
    position.className = "project-position";
    position.innerText = `${index + 1} / ${projectPages.length}`;
    navContainer.appendChild(position);

    if (index < projectPages.length - 1) {
        const next = document.createElement("a");
        next.href = projectPages[index + 1].file;
        next.className = "nav-btn next";
        next.innerHTML = `${getTranslation(langData, projectPages[index + 1].key)} →`;
        navContainer.appendChild(next);
    }

    const mainElement = document.querySelector("main");
    if (mainElement) {
        mainElement.appendChild(navContainer);
        console.log('Nueva barra de navegación añadida'); 
    } else {
        console.error("No se encuentra el elemento 'main'");
    }
}