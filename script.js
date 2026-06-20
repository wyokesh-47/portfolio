document.addEventListener('DOMContentLoaded', () => {
    const revealElements = document.querySelectorAll('.reveal');
    const customCursor = document.getElementById('custom-cursor');
    const customCursorFollower = document.getElementById('custom-cursor-follower');
    const navMenu = document.getElementById('nav-menu');
    const mobileToggle = document.getElementById('mobile-toggle');

    const revealOnScroll = () => {
        revealElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.classList.add('visible');
            }
        });
    };

    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll, { passive: true });
    window.addEventListener('resize', revealOnScroll);

    if (customCursor && customCursorFollower) {
        window.addEventListener('mousemove', (event) => {
            const x = event.clientX;
            const y = event.clientY;
            customCursor.style.transform = `translate(${x}px, ${y}px)`;
            customCursorFollower.style.transform = `translate(${x}px, ${y}px)`;
        });

        document.querySelectorAll('a, button, .project-link-icon, .social-icon').forEach((element) => {
            element.addEventListener('mouseenter', () => document.body.classList.add('link-hover'));
            element.addEventListener('mouseleave', () => document.body.classList.remove('link-hover'));
        });
    }

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => navMenu.classList.toggle('open'));
    }
});
