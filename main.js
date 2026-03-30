/* Common Interactive Logic */
document.addEventListener('DOMContentLoaded', () => {
    /* Initialize Theme Logic */
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.documentElement;

    const updateThemeButtons = (theme) => {
        themeToggles.forEach(btn => {
            btn.innerHTML = theme === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
        });
    };

    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.classList.add('dark');
    }
    updateThemeButtons(currentTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            body.classList.toggle('dark');
            const theme = body.classList.contains('dark') ? 'dark' : 'light';
            localStorage.setItem('theme', theme);
            updateThemeButtons(theme);
        });
    });

    /* RTL Support */
    const rtlToggles = document.querySelectorAll('.rtl-toggle');
    
    const updateRtlButtons = (dir) => {
        rtlToggles.forEach(btn => {
            btn.innerHTML = dir === 'rtl' ? 'LTR' : 'RTL';
        });
    };

    const currentRtl = localStorage.getItem('rtl') || 'ltr';
    body.setAttribute('dir', currentRtl);
    updateRtlButtons(currentRtl);

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const dir = body.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
            body.setAttribute('dir', dir);
            localStorage.setItem('rtl', dir);
            updateRtlButtons(dir);
        });
    });

    /* Reveal Animations on Scroll */
    const revealElements = document.querySelectorAll('.reveal-left, .fade-in');
    const revealCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    /* Newsletter Popup (only for index.html) */
    if (document.getElementById('newsletter-popup')) {
        setTimeout(() => {
            if (!sessionStorage.getItem('popup-closed')) {
                document.getElementById('newsletter-popup').classList.add('show');
            }
        }, 3000);

        document.getElementById('close-popup').addEventListener('click', () => {
            document.getElementById('newsletter-popup').classList.remove('show');
            sessionStorage.setItem('popup-closed', 'true');
        });
    }

    /* Auth Page - Password Toggle */
    const pwToggle = document.getElementById('password-toggle');
    if (pwToggle) {
        pwToggle.addEventListener('click', () => {
            const pwInput = document.getElementById('password-input');
            const icon = pwToggle.querySelector('i');
            if (pwInput.type === 'password') {
                pwInput.type = 'text';
                icon.classList.replace('bi-eye-fill', 'bi-eye-slash-fill');
            } else {
                pwInput.type = 'password';
                icon.classList.replace('bi-eye-slash-fill', 'bi-eye-fill');
            }
        });
    }

    /* Mobile Menu Toggle */
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.replace('bi-list', 'bi-x-lg');
                document.body.classList.add('no-scroll');
            } else {
                icon.classList.replace('bi-x-lg', 'bi-list');
                document.body.classList.remove('no-scroll');
            }
        });
        
        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('bi-x-lg', 'bi-list');
                document.body.classList.remove('no-scroll');
            });
        });
        
        // Close menu on outside click if desired
        window.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('bi-x-lg', 'bi-list');
                document.body.classList.remove('no-scroll');
            }
        });
    }
});
