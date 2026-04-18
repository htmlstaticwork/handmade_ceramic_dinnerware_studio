/* Common Interactive Logic */
document.addEventListener('DOMContentLoaded', () => {
    /* Handle Preloader */
    const loader = document.getElementById('loader');
    if (loader) {
        loader.style.transform = 'scale-x(0.3)';
        window.addEventListener('load', () => {
            loader.style.transform = 'scale-x(1)';
            setTimeout(() => {
                loader.style.opacity = '0';
                setTimeout(() => loader.remove(), 500);
            }, 500);
        });
    }

    /* Initialize Theme Logic */
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const body = document.documentElement;

    const updateThemeButtons = (theme) => {
        themeToggles.forEach(btn => {
            btn.innerHTML = theme === 'dark' ? '<i class="bi bi-sun-fill"></i>' : '<i class="bi bi-moon-fill"></i>';
        });
    };

    // Theme is already initialized in <head>, just sync buttons
    const currentTheme = body.classList.contains('dark') ? 'dark' : 'light';
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
    const revealCallback = (entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target); // Stop watching once revealed for performance
            }
        });
    };

    const observer = new IntersectionObserver(revealCallback, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before the element is fully in view
    });
    
    revealElements.forEach(el => {
        // Immediate check if element is already in view (common for headers/hero)
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('active');
        } else {
            observer.observe(el);
        }
    });

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
        
        // Close menu on outside click
        window.addEventListener('click', (e) => {
            if (mobileMenu.classList.contains('active') && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                mobileMenu.classList.remove('active');
                menuToggle.querySelector('i').classList.replace('bi-x-lg', 'bi-list');
                document.body.classList.remove('no-scroll');
            }
        });
    }

    /* Back to Top Logic */
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* Form Submission Handling */
    const authForms = document.querySelectorAll('form');
    authForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.innerText;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin inline-block"></i> Processing...';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Success!';
                    submitBtn.classList.remove('btn-primary');
                    submitBtn.classList.add('bg-green-600', 'text-white');
                    
                    if (document.title.includes('Login') || document.title.includes('Sign Up')) {
                        setTimeout(() => {
                            window.location.href = 'index.html';
                        }, 1500);
                    } else {
                        setTimeout(() => {
                            submitBtn.disabled = false;
                            submitBtn.innerText = originalText;
                            submitBtn.classList.add('btn-primary');
                            submitBtn.classList.remove('bg-green-600', 'text-white');
                            form.reset();
                        }, 2000);
                    }
                }, 1500);
            }
        });
    });
});
