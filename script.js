// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const desktopNav = document.querySelector('.desktop-nav');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        desktopNav.classList.toggle('active');

        // Animate hamburger icon
        const spans = mobileToggle.querySelectorAll('span');
        if (desktopNav.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking a link
const navLinks = document.querySelectorAll('.desktop-nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (desktopNav.classList.contains('active')) {
            desktopNav.classList.remove('active');
            const spans = mobileToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
});

// Scroll Animations (Intersection Observer)
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-up');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Smooth Scrolling for anchor links
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
};

// Header scroll effect
const initHeaderScroll = () => {
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
            header.style.padding = '0';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            header.style.padding = '5px 0';
        }
    });
};

// Initialize all features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial animations for elements already in viewport
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-up').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);

    animateOnScroll();
    initSmoothScroll();
    initHeaderScroll();
});
