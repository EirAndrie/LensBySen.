gsap.registerPlugin(ScrollTrigger);

// script to reveal text as a whole batch in 1 animation
gsap.utils.toArray('.revealOnScroll').forEach(el => {
            const delay = parseFloat(el.dataset.delay) || 0;
            const startAnimation = el.dataset.triggerAnimate || "top 100%";
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: startAnimation,
                    toggleActions: "play none none none"
                },
                y: 50,
                opacity: 0,
                duration: 1,
                delay: delay,
                ease: "power3.out"
            });
        });

//script to reveal each text in 1 animation on scroll
    // STEP 1: Loop over elements
document.querySelectorAll('.revealOnScrollEachLetter').forEach(el => {
    const clone = el.cloneNode(true);
    const delay = parseFloat(el.dataset.delay) || "top 80%";
    el.innerHTML = ''; // Clear

    function wrapTextNodes(node, parentEl) {
        [...node.childNodes].forEach(child => {
        if (child.nodeType === Node.TEXT_NODE) {
            [...child.textContent].forEach(char => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            parentEl.appendChild(span);
            });
        } else if (child.nodeType === Node.ELEMENT_NODE) {
            const newEl = child.cloneNode(false);
            parentEl.appendChild(newEl);
            wrapTextNodes(child, newEl);
        }
        });
    }

    wrapTextNodes(clone, el);

    gsap.from(el.querySelectorAll('span'), {
        scrollTrigger: {
            trigger: el,
            start: "top 100%",
            toggleActions: 'play none none none',
        },
        delay: delay,
        y: 80,
        opacity: 0,
        stagger: 0.03,
        duration: 0.5,
        ease: 'power3.out',
    });
});
 //end

//script to animate images move towards to the position set on css
document.querySelectorAll('.moveElement').forEach(img => {
    const x = parseFloat(img.dataset.x) || 0;
    const y = parseFloat(img.dataset.y) || 0;
    const animateOnScroll = img.dataset.scroll !== "false";

    const animationSettings = {
        x: x,
        y: y,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out"
    };

    if (animateOnScroll) {
        // Animate on scroll using ScrollTrigger
        gsap.from(img, {
            ...animationSettings,
            scrollTrigger: {
                trigger: img,
                start: "top 60%", // adjust as needed
                toggleActions: "play none none none"
            }
        });
    } else {
        // Animate immediately
        gsap.from(img, animationSettings);
    }
});

//script for text color animation on scroll
        document.querySelectorAll('.colorScrollText').forEach(el => {
            el.innerHTML = el.innerHTML
                .split(/(<br\s*\/?>)/gi)
                .map(part => {
                    if (part.match(/<br\s*\/?>/i)) return part;
                    return part.replace(/([^\s<>])/g, '<span>$1</span>');
                }).join('');
            const spans = el.querySelectorAll('span');
            gsap.to(spans, {
                color: "#fdf0d5",
                stagger: {
                    each: 0.03,
                    from: "start"
                },
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    end: "bottom 20%",
                    scrub: true,
                    toggleActions: "play reverse play reverse"
                }
            });
        });

//script for cylinder effect on scroll
gsap.utils.toArray('.skillCards').forEach(el => {
    gsap.fromTo(el,
        {
            scale: 0.2,
            opacity: 0,
            y: 34,
        },
        {
            scale: 1,
            opacity: 1,
            y: -40,
            scrollTrigger: {
                trigger: el,
                start: "bottom 200%",   // bottom of element hits bottom of viewport
                end: "top 42%",       // top of element hits top of viewport
                scrub: true,
                onUpdate: self => {
                    // Optional: add a curve-like y offset
                    const progress = self.progress;
                    const curve = Math.sin(progress * Math.PI); // creates a smooth curve
                    gsap.set(el, { y: 2 * curve }); // lift in the middle
                }
            },
            ease: "power2.out"
        }
    );
});

//script to animate x y animation first then moves toward the screen
document.querySelectorAll('.slideInAnimation').forEach(el => {
    const x = parseFloat(el.dataset.x) || 0;
    const y = parseFloat(el.dataset.y) || 0;
    const z = parseFloat(el.dataset.z) || 0;
    const scale = parseFloat(el.dataset.scale) || 1;
    const delay = parseFloat(el.dataset.delay) || 0;
    const pause = parseFloat(el.dataset.pause) || 0.2;
    const duration = parseFloat(el.dataset.duration) || 1;
    const mode = el.dataset.mode || "scroll";
    const triggerScroll = parseFloat(el.dataset.triggerScroll) || "top 80%";

    const tl = gsap.timeline({
    delay: delay,
        ...(mode === "scroll" && {
        scrollTrigger: {
            trigger: el,
            start: triggerScroll,
            toggleActions: 'play none none none'
        }
        })
    });
    
    // Phase 1: Smooth slide in
    tl.from(el, {
        x: x,
        y: y,
        opacity: 0,
        duration: duration,
        ease: 'power3.out'
    });

    // Phase 2: Snap-in zoom forward
    tl.to(el, {
        z: z,
        scale: scale,
        duration: 0.8,
        ease: 'back.out(1)' // <- this is the snap effect!
    }, `+=${pause}`);
});

//magnetic mouse follow on move effect
document.querySelectorAll('.magnetic').forEach(el => {
    const strength = parseFloat(el.dataset.strength) || 20;

    window.addEventListener('mousemove', e => {
        const { innerWidth, innerHeight } = window;
        const relX = (e.clientX / innerWidth - 0.5) * 2;
        const relY = (e.clientY / innerHeight - 0.5) * 2;

        const moveX = relX * strength;
        const moveY = relY * strength;

        gsap.to(el, {
        x: moveX,
        y: moveY,
        ease: 'power2.out',
        duration: 0.6
        });
    });

    window.addEventListener('mouseleave', () => {
        gsap.to(el, {
        x: 0,
        y: 0,
        ease: 'power3.out',
        duration: 0.8
        });
    });
});

ScrollTrigger.refresh();    

//script for toggle darkmode
const toggleLi = document.getElementById('darkModeToggle');

toggleLi.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    toggleLi.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
});

  // Load saved theme
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        toggleLi.textContent = 'Light Mode';
    }
});
