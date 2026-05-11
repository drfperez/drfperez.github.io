// navbar.js
document.addEventListener("DOMContentLoaded", () => {
    fetch('https://drfperez.github.io/navbar.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('navbar-placeholder');
            if (!placeholder) return;
            
            placeholder.innerHTML = data;

            // Inicialitza Bootstrap dropdowns
            const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
            dropdowns.forEach(el => new bootstrap.Dropdown(el));

            // === Funcions per a tema fosc/clar ===

            const getStoredTheme = () => localStorage.getItem('theme');
            const setStoredTheme = theme => localStorage.setItem('theme', theme);

            const getPreferredTheme = () => {
                const storedTheme = getStoredTheme();
                if (storedTheme) return storedTheme;
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            };

            const setTheme = theme => {
                document.documentElement.setAttribute('data-bs-theme', theme);
            };

            const showActiveTheme = (theme) => {
                const lightIcon = document.getElementById('theme-icon-light');
                const darkIcon = document.getElementById('theme-icon-dark');
                if (!lightIcon || !darkIcon) return;

                lightIcon.classList.toggle('d-none', theme === 'dark');
                darkIcon.classList.toggle('d-none', theme !== 'dark');
            };

            const applyInitialTheme = () => {
                const initialTheme = getPreferredTheme();
                setTheme(initialTheme);
                showActiveTheme(initialTheme);
            };

            applyInitialTheme();

            // Botó de canvi de tema
            const toggler = document.getElementById('theme-toggler');
            if (toggler) {
                toggler.addEventListener('click', () => {
                    const currentTheme = document.documentElement.getAttribute('data-bs-theme');
                    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                    setStoredTheme(newTheme);
                    setTheme(newTheme);
                    showActiveTheme(newTheme);
                });
            }

            // Escolta canvis del sistema operatiu
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
                if (!getStoredTheme()) {
                    const newTheme = getPreferredTheme();
                    setTheme(newTheme);
                    showActiveTheme(newTheme);
                }
            });

        })
        .catch(error => console.error('Error carregant navbar:', error));
});
