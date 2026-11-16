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
            const shift = Math.min(scrolled * 0.25, 90);
            hero.style.transform = `translateY(${shift}px)`;
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

(function drawFireFrame() {
    const canvas = document.getElementById('fire-frame');
    const hero = document.querySelector('.hero');
    if (!canvas || !hero) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = hero.clientWidth;
        canvas.height = hero.clientHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const flames = [];
    function seed() {
        flames.length = 0;
        const w = canvas.width;
        const h = canvas.height;
        const add = (edge, pos) => {
            const strands = 3 + Math.floor(Math.random() * 3);
            flames.push({
                edge,
                pos,
                phase: Math.random() * Math.PI * 2,
                len: 45 + Math.random() * 70,
                speed: 0.012 + Math.random() * 0.02,
                strands,
                wobble: 0.4 + Math.random() * 0.8,
                width: 10 + Math.random() * 12
            });
        };
        for (let x = -40; x < w + 40; x += 18) {
            add('top', x);
            add('bottom', x);
        }
        for (let y = -40; y < h + 40; y += 18) {
            add('left', y);
            add('right', y);
        }
    }
    seed();
    window.addEventListener('resize', seed);

    function flamePath(len, w, t, strand) {
        const segs = 7;
        const pts = [];
        for (let i = 0; i <= segs; i++) {
            const p = i / segs;
            const taper = Math.pow(1 - p, 0.6);
            const curl = Math.sin(t * 1.6 + p * 6 + strand) * w * (0.35 + p * 1.4)
                + Math.sin(t * 0.7 + p * 3 + strand * 2) * w * 0.5 * p;
            pts.push({ x: p * len, y: curl, half: w * taper * (0.55 + 0.45 * Math.sin(strand + 1)) });
        }
        ctx.beginPath();
        ctx.moveTo(0, -pts[0].half);
        for (let i = 1; i < pts.length; i++) {
            const a = pts[i - 1];
            const b = pts[i];
            ctx.quadraticCurveTo(a.x, a.y - a.half, (a.x + b.x) / 2, (a.y + b.y) / 2 - (a.half + b.half) / 2);
        }
        const tip = pts[pts.length - 1];
        ctx.lineTo(tip.x, tip.y);
        for (let i = pts.length - 1; i > 0; i--) {
            const a = pts[i];
            const b = pts[i - 1];
            ctx.quadraticCurveTo(a.x, a.y + a.half, (a.x + b.x) / 2, (a.y + b.y) / 2 + (a.half + b.half) / 2);
        }
        ctx.closePath();
    }

    function drawFlame(x, y, angle, len, w, t) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        for (let s = 0; s < 3; s++) {
            const g = ctx.createLinearGradient(0, 0, len, 0);
            if (s === 0) {
                g.addColorStop(0, 'rgba(120,0,0,0.55)');
                g.addColorStop(0.35, 'rgba(255,60,0,0.55)');
                g.addColorStop(0.7, 'rgba(255,140,0,0.25)');
                g.addColorStop(1, 'rgba(255,200,0,0)');
            } else if (s === 1) {
                g.addColorStop(0, 'rgba(255,120,0,0.8)');
                g.addColorStop(0.4, 'rgba(255,190,30,0.6)');
                g.addColorStop(1, 'rgba(255,255,180,0)');
            } else {
                g.addColorStop(0, 'rgba(255,255,230,0.9)');
                g.addColorStop(0.3, 'rgba(255,230,120,0.45)');
                g.addColorStop(1, 'rgba(255,255,255,0)');
            }
            ctx.fillStyle = g;
            flamePath(len * (1 - s * 0.18), w * (1 - s * 0.32), t + s * 0.6, s);
            ctx.fill();
        }
        ctx.restore();
    }

    function frame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        flames.forEach((f) => {
            f.phase += f.speed;
            const flicker = 0.8 + Math.sin(f.phase) * 0.15 + Math.sin(f.phase * 2.7) * 0.08;
            const len = f.len * flicker;
            let x, y, base;
            if (f.edge === 'left') { x = 0; y = f.pos; base = 0; }
            else if (f.edge === 'right') { x = canvas.width; y = f.pos; base = Math.PI; }
            else if (f.edge === 'top') { x = f.pos; y = 0; base = Math.PI / 2; }
            else { x = f.pos; y = canvas.height; base = -Math.PI / 2; }
            const angle = base + Math.sin(f.phase * f.wobble) * 0.25;
            drawFlame(x, y, angle, len, f.width, f.phase);
        });
        ctx.globalCompositeOperation = 'source-over';
        requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
})();

// Console welcome message
console.log('%c🤖 راهنمای مدل‌های AI', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cساخته شده با ❤️', 'font-size: 14px; color: #64748b;');

// Export functions for potential use in other scripts
window.AIGuideApp = {
    animateValue,
    lazyLoadImages,
    updateFooterYear
};