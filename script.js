// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Add animation to cards
document.addEventListener('DOMContentLoaded', () => {
    // Animate cards
    const cards = document.querySelectorAll('.card, .app-card, .comparison-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate section titles
    const titles = document.querySelectorAll('.section-title, .section-subtitle');
    titles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'all 0.6s ease';
        observer.observe(title);
    });

    // Add active state to nav links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Add counter animation for benchmark scores
    const animateValue = (element, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = progress * (end - start) + start;
            element.textContent = value.toFixed(1) + '%';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    };

    // Observe benchmark table for animation
    const benchmarkTable = document.querySelector('.benchmark-table');
    if (benchmarkTable) {
        const tableObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const cells = entry.target.querySelectorAll('tbody td');
                    cells.forEach((cell, index) => {
                        setTimeout(() => {
                            cell.style.opacity = '1';
                            cell.style.transform = 'translateX(0)';
                        }, index * 50);
                    });
                    tableObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        benchmarkTable.querySelectorAll('tbody td').forEach(cell => {
            cell.style.opacity = '0';
            cell.style.transform = 'translateX(-20px)';
            cell.style.transition = 'all 0.4s ease';
        });

        tableObserver.observe(benchmarkTable);
    }

    // Add hover effect sound (optional, commented out)
    // const cards = document.querySelectorAll('.card, .app-card');
    // cards.forEach(card => {
    //     card.addEventListener('mouseenter', () => {
    //         // Add subtle scale effect
    //         card.style.transition = 'all 0.3s ease';
    //     });
    // });

    // Add copy functionality for API examples (if needed in future)
    const createCopyButton = (codeBlock) => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'کپی';
        button.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent);
            button.textContent = 'کپی شد!';
            setTimeout(() => {
                button.textContent = 'کپی';
            }, 2000);
        });
        return button;
    };

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.scrollY;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Search functionality (future enhancement placeholder)
    const addSearchFunctionality = () => {
        // This can be expanded to add search through models
        console.log('Search functionality ready for implementation');
    };

    // Filter functionality for models (future enhancement)
    const addFilterFunctionality = () => {
        // This can be expanded to filter models by size, type, etc.
        console.log('Filter functionality ready for implementation');
    };

    // Tooltip functionality
    const addTooltips = () => {
        const elements = document.querySelectorAll('[data-tooltip]');
        elements.forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const tooltip = document.createElement('div');
                tooltip.className = 'tooltip';
                tooltip.textContent = e.target.dataset.tooltip;
                document.body.appendChild(tooltip);

                const rect = e.target.getBoundingClientRect();
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
                tooltip.style.left = `${rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2)}px`;
            });

            element.addEventListener('mouseleave', () => {
                const tooltip = document.querySelector('.tooltip');
                if (tooltip) tooltip.remove();
            });
        });
    };

    // Initialize enhancements
    addSearchFunctionality();
    addFilterFunctionality();
    addTooltips();
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or overlays (for future features)
        console.log('Escape pressed');
    }
});

// Performance optimization: Lazy load images if added later
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Call lazy load
lazyLoadImages();

// Add dynamic year to footer
const updateFooterYear = () => {
    const yearElements = document.querySelectorAll('.current-year');
    const currentYear = new Date().getFullYear();
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
};

updateFooterYear();

// Console welcome message
console.log('%c🤖 راهنمای مدل‌های AI', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cساخته شده با ❤️', 'font-size: 14px; color: #64748b;');

// Export functions for potential use in other scripts
window.AIGuideApp = {
    animateValue,
    lazyLoadImages,
    updateFooterYear
};