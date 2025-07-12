// Apparition au scroll (fade-in, slide-in)
function handleScrollAnimations() {
    const fadeEls = document.querySelectorAll('.fade-in, .slide-in');
    const triggerBottom = window.innerHeight * 0.92;
    fadeEls.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < triggerBottom && rect.bottom > 0) {
            el.classList.add('visible');
        } else {
            el.classList.remove('visible');
        }
    });
}
window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('DOMContentLoaded', handleScrollAnimations);

// Effet typing sur la description du header
function typeEffect(element, text, speed = 45) {
    let i = 0;
    function typing() {
        if (i <= text.length) {
            element.textContent = text.slice(0, i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}
window.addEventListener('DOMContentLoaded', () => {
    const desc = document.querySelector('.description');
    if (desc) {
        const txt = desc.textContent;
        desc.textContent = '';
        desc.classList.add('typing');
        typeEffect(desc, txt);
    }
});

// Effet de particules/étoiles en fond
function initParticles() {
    const canvas = document.getElementById('bg-particles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    const STAR_COLOR = '#60a5fa';
    const STAR_COUNT = Math.floor(w * h / 2200);
    const STAR_SIZE = 1.2;
    const STAR_SPEED = 0.18;
    let stars = [];
    function createStar() {
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * STAR_SIZE + 0.5,
            speed: Math.random() * STAR_SPEED + 0.05,
            alpha: Math.random() * 0.5 + 0.5
        };
    }
    function resize() {
        w = window.innerWidth;
        h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        stars = Array.from({length: STAR_COUNT}, createStar);
    }
    window.addEventListener('resize', resize);
    stars = Array.from({length: STAR_COUNT}, createStar);
    function animate() {
        ctx.clearRect(0, 0, w, h);
        for (let s of stars) {
            ctx.save();
            ctx.globalAlpha = s.alpha;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
            ctx.fillStyle = STAR_COLOR;
            ctx.shadowColor = STAR_COLOR;
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.restore();
            s.y += s.speed;
            if (s.y > h + 10) {
                s.x = Math.random() * w;
                s.y = -10;
                s.r = Math.random() * STAR_SIZE + 0.5;
                s.speed = Math.random() * STAR_SPEED + 0.05;
                s.alpha = Math.random() * 0.5 + 0.5;
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}
window.addEventListener('DOMContentLoaded', initParticles); 