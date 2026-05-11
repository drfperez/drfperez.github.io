document.addEventListener("DOMContentLoaded", () => {
    fetch('https://drfperez.github.io/navbar2.html')
        .then(response => response.text())
        .then(data => {
            const placeholder = document.getElementById('navbar-placeholder');
            if (!placeholder) return;
            placeholder.innerHTML = data;

            // Inicialitza Bootstrap dropdowns
            document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(el => new bootstrap.Dropdown(el));

            // Marca la pàgina activa
            const currentPath = window.location.pathname;
            const normalize = p => p.replace(/\/$/, '') || '/';
            const current = normalize(currentPath);
            document.querySelectorAll('.navbar-nav .nav-link, .dropdown-item').forEach(link => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    if (normalize(href) === current) {
                        link.classList.add('active');
                        if (link.classList.contains('dropdown-item')) {
                            const parentToggle = link.closest('.dropdown-menu')?.previousElementSibling;
                            if (parentToggle?.classList.contains('dropdown-toggle')) parentToggle.classList.add('active');
                        }
                        link.setAttribute('aria-current', 'page');
                    }
                }
            });

            // ===== Tema fosc/clar =====
            const getStoredTheme = () => localStorage.getItem('theme');
            const setStoredTheme = theme => localStorage.setItem('theme', theme);
            const getPreferredTheme = () => {
                const stored = getStoredTheme();
                if (stored) return stored;
                return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            };
            const setTheme = theme => document.documentElement.setAttribute('data-bs-theme', theme);
            const showActiveTheme = (theme) => {
                const lightIcon = document.getElementById('theme-icon-light');
                const darkIcon = document.getElementById('theme-icon-dark');
                if (!lightIcon || !darkIcon) return;
                lightIcon.classList.toggle('d-none', theme === 'dark');
                darkIcon.classList.toggle('d-none', theme !== 'dark');
            };

            const initialTheme = getPreferredTheme();
            setTheme(initialTheme);
            showActiveTheme(initialTheme);

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
