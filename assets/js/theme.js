function toggleTheme() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-button').innerText = isDark ? '☀️' : '🌙';
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
    // Solo usar preferencia del sistema si no hay una guardada
    if (!savedTheme && prefersDark) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
      const themeBtn = document.getElementById('theme-button');
      if (themeBtn) themeBtn.innerText = '☀️';
    } else if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      const themeBtn = document.getElementById('theme-button');
      if (themeBtn) themeBtn.innerText = '☀️';
    }
  });