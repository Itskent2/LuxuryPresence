// Mobile Sidebar Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const sidebarClose = document.querySelector('.sidebar-close');
const sidebar = document.querySelector('.sidebar');

// Create overlay element dynamically
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
document.body.appendChild(overlay);

function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('active');
    overlay.classList.add('active');
    if (mobileBtn) mobileBtn.classList.add('open');
    document.body.classList.add('sidebar-open');
    document.body.style.overflow = 'hidden'; // prevent background scroll
}

function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
    if (mobileBtn) mobileBtn.classList.remove('open');
    document.body.classList.remove('sidebar-open');
    document.body.style.overflow = '';
}

if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });
}

if (sidebarClose && sidebar) {
    sidebarClose.addEventListener('click', closeSidebar);
}

// Close sidebar when clicking the overlay
overlay.addEventListener('click', closeSidebar);


// Sidebar Collapse Toggle / Mobile Close
const sidebarToggleBtn = document.querySelector('.sidebar-toggle');
if (sidebarToggleBtn && sidebar) {
    sidebarToggleBtn.addEventListener('click', () => {
        if (window.innerWidth <= 767 || sidebar.classList.contains('active')) {
            // On mobile: arrow button closes the sidebar drawer
            closeSidebar();
        } else {
            // On tablet and desktop: arrow button collapses/expands the sidebar
            sidebar.classList.toggle('collapsed');
        }
    });
}

// ── Sidebar Nav: Active State via Scroll + Click ──
const navLinks = document.querySelectorAll('.sidebar-nav a');

// Map each nav href to a section ID
const sectionIds = ['home', 'about', 'projects', 'gallery', 'services', 'contact'];

function setActiveNav(targetId) {
    let activeHref = targetId;
    if (targetId === 'gallery') activeHref = 'projects';
    if (targetId === 'services') activeHref = 'contact';

    navLinks.forEach(link => {
        const href = link.getAttribute('href').replace('#', '');
        link.parentElement.classList.toggle('active', href === activeHref);
    });
}

// Click: set immediately
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const rawHref = link.getAttribute('href');
        if (!rawHref || rawHref === 'javascript:void(0)') {
            e.preventDefault();
            return;
        }

        if (window.innerWidth <= 767) {
            closeSidebar();
        }
        const targetId = rawHref.replace('#', '');
        setActiveNav(targetId);
    });
});

// Scroll: watch sections with IntersectionObserver
const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setActiveNav(entry.target.id);
        }
    });
}, observerOptions);

sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
});

// (Removed redundant mobile sidebar close logic, now handled above)

// Theme Toggle — persistent via localStorage
const themeToggle = document.querySelector('.theme-toggle');

const MOON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>`;
const SUN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function applyTheme(isDark) {
    document.body.classList.toggle('dark-theme', isDark);
    if (themeToggle) {
        themeToggle.innerHTML = isDark ? SUN_SVG : MOON_SVG;
        themeToggle.setAttribute('aria-label', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
}

// Apply saved preference on load
const savedTheme = localStorage.getItem('theme');
applyTheme(savedTheme === 'dark');

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const isDark = document.body.classList.contains('dark-theme');
        applyTheme(!isDark);
        localStorage.setItem('theme', !isDark ? 'dark' : 'light');
    });
}

// Bento Card Entry Animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.bento-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
});

// Photo Gallery Carousel
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.carousel-slide');
    const btnPrev = document.querySelector('.carousel-nav.prev');
    const btnNext = document.querySelector('.carousel-nav.next');
    const indicatorsContainer = document.querySelector('.carousel-indicators');

    if (slides.length === 0) return;

    let currentIndex = 0;
    const indicators = [];

    // Create indicators
    if (indicatorsContainer) {
        slides.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'indicator-bar';
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
            indicatorsContainer.appendChild(indicator);
            indicators.push(indicator);
        });
    }

    function updateCarousel() {
        slides.forEach(slide => {
            slide.className = 'carousel-slide hidden'; // reset all classes
        });

        indicators.forEach((indicator, index) => {
            indicator.className = index === currentIndex ? 'indicator-bar active' : 'indicator-bar';
        });

        const centerIndex = currentIndex;
        const leftIndex = (currentIndex - 1 + slides.length) % slides.length;
        const rightIndex = (currentIndex + 1) % slides.length;

        slides[centerIndex].className = 'carousel-slide center';
        slides[leftIndex].className = 'carousel-slide left';
        slides[rightIndex].className = 'carousel-slide right';
    }

    if (btnPrev && btnNext) {
        btnPrev.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        btnNext.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });
    }

    // Allow clicking on left/right images to navigate
    slides.forEach((slide) => {
        slide.addEventListener('click', () => {
            if (slide.classList.contains('left')) {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel();
            } else if (slide.classList.contains('right')) {
                currentIndex = (currentIndex + 1) % slides.length;
                updateCarousel();
            }
        });
    });

    // Initialize
    updateCarousel();
});
