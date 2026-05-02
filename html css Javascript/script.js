document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for saved theme, default to dark
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // 2. Reading Progress Bar
    const progressBar = document.getElementById('myBar');
    
    window.addEventListener('scroll', () => {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / documentHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // 3. Mobile Navigation Toggle
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const icon = mobileToggle.querySelector('i');

    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (sidebar.classList.contains('open')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close sidebar when clicking a link on mobile
    const navLinks = document.querySelectorAll('.toc a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('open');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 4. Highlight active section in sidebar based on current page URL
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        }
    });

    // 5. Interactive Demo (JS Course Module)
    const demoBtn = document.getElementById('demo-btn');
    const counterText = document.getElementById('counter-text');
    
    if(demoBtn && counterText) {
        let count = 0;
        const colors = ['#ec4899', '#14b8a6', '#eab308', '#3b82f6', '#8b5cf6'];
        
        demoBtn.addEventListener('click', () => {
            count++;
            counterText.textContent = count;
            counterText.style.color = colors[count % colors.length];
            
            // Add a little pop animation
            demoBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                demoBtn.style.transform = 'scale(1)';
            }, 100);
        });
    }

    // 6. Intersection Observer for Fade-In Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        // Reset animation so it only triggers when scrolling into view
        section.style.animation = 'none';
        section.style.opacity = '0';
        observer.observe(section);
    });
});
