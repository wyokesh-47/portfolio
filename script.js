document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Sticky Navigation & Shrink on Scroll
    // ----------------------------------------------------
    const header = document.querySelector('.header');
    const scrollThreshold = 50;

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // ----------------------------------------------------
    // 2. Mobile Menu Toggle
    // ----------------------------------------------------
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    };

    mobileToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ----------------------------------------------------
    // 3. Scroll Reveal Animation using Intersection Observer
    // ----------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add class visible to element
                entry.target.classList.add('visible');
                // Unobserve since we only want to reveal once
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px' // reveal slightly before entering viewport
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ----------------------------------------------------
    // 4. Project Filters with Smooth Transition
    // ----------------------------------------------------
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from other buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // First fade out and shrink
                card.style.opacity = '0';
                card.style.transform = 'scale(0.92) translateY(10px)';
                card.style.transition = 'opacity 0.4s var(--ease-out-expo), transform 0.4s var(--ease-out-expo)';

                setTimeout(() => {
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                        // Trigger reflow to ensure the transition runs
                        card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1) translateY(0)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 400);
            });
        });
    });

    // ----------------------------------------------------
    // 5. Parallax Background Blobs
    // ----------------------------------------------------
    const blobs = document.querySelectorAll('.blob');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Normalized values (-0.5 to 0.5)
        const normX = (mouseX / window.innerWidth) - 0.5;
        const normY = (mouseY / window.innerHeight) - 0.5;

        // Apply translation offset to each blob based on speed factors
        blobs.forEach((blob, idx) => {
            const speed = (idx + 1) * 35; // Different speed for parallax depth
            const xOffset = normX * speed;
            const yOffset = normY * speed;
            
            // We read the existing inline style / animation to merge it, or just use variables
            blob.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    });

    // ----------------------------------------------------
    // 6. Custom Interactive Cursor
    // ----------------------------------------------------
    const cursorDot = document.getElementById('custom-cursor');
    const cursorFollower = document.getElementById('custom-cursor-follower');
    
    let mousePos = { x: 0, y: 0 };
    let dotPos = { x: 0, y: 0 };
    let followerPos = { x: 0, y: 0 };

    window.addEventListener('mousemove', (e) => {
        mousePos.x = e.clientX;
        mousePos.y = e.clientY;
        
        // Immediate movement for inner dot
        cursorDot.style.left = `${mousePos.x}px`;
        cursorDot.style.top = `${mousePos.y}px`;
    });

    // Animate the follower with simple interpolation (lerp) for smooth lag effect
    const animateCursor = () => {
        const delay = 0.15; // Lower = faster, Higher = slower lag
        
        followerPos.x += (mousePos.x - followerPos.x) * delay;
        followerPos.y += (mousePos.y - followerPos.y) * delay;

        cursorFollower.style.left = `${followerPos.x}px`;
        cursorFollower.style.top = `${followerPos.y}px`;

        requestAnimationFrame(animateCursor);
    };
    
    animateCursor();

    // Hover states for links
    const hoverElements = document.querySelectorAll('a, button, .filter-btn, .project-card, .social-icon');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('link-hover');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('link-hover');
        });
    });

    // ----------------------------------------------------
    // 7. Interactive Form Handling (Form removed)
    // ----------------------------------------------------
});
