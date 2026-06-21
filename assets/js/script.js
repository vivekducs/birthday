document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Customized Wishes & Blessings Array for Jaya Mausi
    // ==========================================================================
    const mausiQuotes = [
        "🌸 Wishing you a day as elegant, warm, and beautiful as your soul, Jaya Mausi. Happy Birthday! 🎂✨",
        "🙏 Mausi, your presence is a constant source of strength and comfort. May God bless you with sound health and long life. Happy Birthday! 💖",
        "🎂 Happy Birthday to the most loving maternal figure! Thank you for always guiding me with your gentle smile and infinite patience. ✨🍰",
        "☀️ May your life always be filled with the bright sunshine of happiness, laughter, and the warmth of family, Mausi! Have a magical birthday. 🧁🌷",
        "💖 Jaya Mausi, you bring so much warmth, love, and grace into our lives. We feel incredibly blessed to celebrate you today. ✨❤️",
        "💌 Sending you a birthday wish wrapped in deep respect, tied with joy, and sealed with a smile. Happy Birthday, dearest Mausi! 💞",
        "🌟 On your special day, Mausi, I wish you endless moments of peace, laughter, and the fulfillment of every heart's desire. You deserve the very best! 🎯🎁",
        "🎀 I hope your birthday is full of your favorite smiles, beautiful moments, and absolute peace. Happy Birthday, Jaya Mausi! 💫",
        "💞 Jaya Mausi, you are not just my aunt—you are a second mother, a patient guide, and a constant support. Happy Birthday from the bottom of my heart! 💖 – Ashish",
        "🌈 May God shower His choicest blessings upon you today, Mausi. Keep shining bright and spreading your warm love. 💎💗 – With respect, Ashish",
        "🌹 Your laughter lights up the entire family. Wishing a very happy birthday to the queen of kindness and elegance—Jaya Mausi! 👑🎂",
        "🌸 Mausi, may this new chapter of your life unfold like a beautiful dream, filled with good health, love, and sweet memories. Happiest of birthdays to you! 💐 – Ashish"
    ];

    let currentQuoteIndex = 0;
    const quoteText = document.getElementById('quote-text');
    const quoteInnerCard = document.getElementById('quote-inner-card');
    const changeQuoteBtn = document.getElementById('change-quote-btn');

    // Function to rotate wishes with flip animation
    function changeQuote() {
        if (!quoteInnerCard || !quoteText) return;

        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * mausiQuotes.length);
        } while (newIndex === currentQuoteIndex);
        currentQuoteIndex = newIndex;

        // Add class to trigger rotation out
        quoteInnerCard.classList.add('flip-out');

        setTimeout(() => {
            quoteText.textContent = `"${mausiQuotes[currentQuoteIndex]}"`;
            // Remove class to trigger rotation in
            quoteInnerCard.classList.remove('flip-out');
        }, 400);
    }

    if (changeQuoteBtn) {
        changeQuoteBtn.addEventListener('click', changeQuote);
    }


    // ==========================================================================
    // 2. High-Performance Canvas Confetti Engine (No External Lib Dependencies)
    // ==========================================================================
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class ConfettiParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 6;
            this.color = this.getRandomColor();
            this.speedX = Math.random() * 6 - 3;
            this.speedY = Math.random() * -10 - 5; // Launch upwards
            this.gravity = 0.25;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 8 - 4;
            this.opacity = 1;
        }

        getRandomColor() {
            // Elegant celebration colors (gold, rose, cream, pink, copper)
            const colors = [
                '#D4A3A1', // Rose gold
                '#8F5B59', // Dark rose gold
                '#D2A85C', // Gold
                '#FFFDF9', // Cream
                '#FFC0CB', // Pink
                '#E8CDCC', // Soft copper
                '#F3C1A1'  // Peach
            ];
            return colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.speedY += this.gravity; // Gravity pull down
            this.rotation += this.rotationSpeed;
            if (this.speedY > 0) {
                this.opacity -= 0.008; // Fade out as it falls
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            // Draw rectangle confetti piece
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            if (particles[i].opacity <= 0 || particles[i].y > canvas.height) {
                particles.splice(i, 1);
            }
        }

        if (particles.length > 0) {
            animationId = requestAnimationFrame(animateConfetti);
        } else {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }

    // Trigger standard burst of confetti
    function fireConfetti(x, y, count = 150) {
        for (let i = 0; i < count; i++) {
            particles.push(new ConfettiParticle(x, y));
        }
        if (!animationId) {
            animateConfetti();
        }
    }


    // ==========================================================================
    // 3. Audio / Background Music Controller
    // ==========================================================================
    const bgAudio = document.getElementById('bg-audio');
    const musicToggleBtn = document.getElementById('music-toggle');
    const musicIcon = document.getElementById('music-icon');

    function toggleMusic() {
        if (!bgAudio) return;

        if (bgAudio.paused) {
            bgAudio.play().then(() => {
                musicToggleBtn.classList.add('playing');
                musicIcon.className = 'fa-solid fa-compact-disc text-xl text-[#8F5B59]';
            }).catch(e => console.log("Audio play blocked by browser:", e));
        } else {
            bgAudio.pause();
            musicToggleBtn.classList.remove('playing');
            musicIcon.className = 'fa-solid fa-play text-xl text-[#8F5B59]';
        }
    }

    if (musicToggleBtn) {
        musicToggleBtn.addEventListener('click', toggleMusic);
    }

    // Auto-play by default on first interaction anywhere on the screen (bypasses browser security)
    function playOnFirstInteraction() {
        if (!bgAudio) return;
        if (bgAudio.paused) {
            bgAudio.muted = false;
            bgAudio.volume = 0.5;
            bgAudio.play().then(() => {
                musicToggleBtn.classList.add('playing');
                musicIcon.className = 'fa-solid fa-compact-disc text-xl text-[#8F5B59]';
                // Remove listeners once successfully playing
                window.removeEventListener('click', playOnFirstInteraction);
                window.removeEventListener('touchstart', playOnFirstInteraction);
            }).catch(e => console.log("First interaction play blocked:", e));
        }
    }
    
    // Listen for any tap/click anywhere to start playing audio
    window.addEventListener('click', playOnFirstInteraction);
    window.addEventListener('touchstart', playOnFirstInteraction);


    // ==========================================================================
    // 4. Interactive Cake Cutting & Blow Candle overlay
    // ==========================================================================
    const overlay = document.getElementById('birthday-overlay');
    const candles = document.querySelectorAll('.candle');
    let candlesBlownCount = 0;

    candles.forEach((candle, index) => {
        candle.addEventListener('click', (e) => {
            if (candle.classList.contains('blown')) return;

            candle.classList.add('blown');
            candlesBlownCount++;

            // Small confetti pop right at the candle click position
            const rect = candle.getBoundingClientRect();
            fireConfetti(rect.left + rect.width / 2, rect.top, 25);

            // Once all candles are blown
            if (candlesBlownCount === candles.length) {
                // Fire massive confetti from bottom corners
                setTimeout(() => {
                    fireConfetti(window.innerWidth * 0.1, window.innerHeight * 0.9, 100);
                    fireConfetti(window.innerWidth * 0.9, window.innerHeight * 0.9, 100);
                }, 300);

                // Auto play music
                if (bgAudio) {
                    bgAudio.muted = false;
                    bgAudio.volume = 0.5;
                    bgAudio.play().then(() => {
                        musicToggleBtn.classList.add('playing');
                        musicIcon.className = 'fa-solid fa-compact-disc text-xl text-rose-800';
                    }).catch(err => console.log("Auto-play blocked:", err));
                }

                // Dismiss overlay with smooth animation
                setTimeout(() => {
                    overlay.classList.add('dismissed');
                    
                    // Continuous slow confetti drop for celebration
                    let dropTimer = setInterval(() => {
                        if (document.hidden) return; // Stop when tab out
                        // Random drop from top
                        particles.push(new ConfettiParticle(Math.random() * window.innerWidth, 0));
                        // Dampen the speed so it falls slowly
                        const p = particles[particles.length - 1];
                        p.speedY = Math.random() * 2 + 1;
                        p.speedX = Math.random() * 2 - 1;
                        if (!animationId) animateConfetti();
                    }, 120);

                    // Clear drop timer after 15 seconds to save battery
                    setTimeout(() => clearInterval(dropTimer), 15000);

                }, 1200);
            }
        });
    });


    // ==========================================================================
    // 5. Image Lightbox Modal (Zoom View)
    // ==========================================================================
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxSpinner = document.getElementById('lightbox-spinner');
    const galleryItems = document.querySelectorAll('.gallery-card img, .zoomable-img');

    galleryItems.forEach(img => {
        img.addEventListener('click', () => {
            // Prevent overlay triggering image click if overlay is still visible
            if (overlay && !overlay.classList.contains('dismissed')) return;

            if (!lightboxModal || !lightboxImg) return;
            
            // Show spinner & reset opacity while image loads
            if (lightboxSpinner) lightboxSpinner.classList.remove('hidden');
            lightboxImg.style.opacity = '0';
            
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            
            lightboxModal.classList.remove('hidden');
            lightboxModal.classList.add('flex');
            lightboxModal.style.opacity = '1';

            lightboxImg.onload = () => {
                if (lightboxSpinner) lightboxSpinner.classList.add('hidden');
                lightboxImg.style.opacity = '1';
            };
        });
    });

    function closeLightbox() {
        if (!lightboxModal) return;
        lightboxModal.style.opacity = '0';
        setTimeout(() => {
            lightboxModal.classList.add('hidden');
            lightboxModal.classList.remove('flex');
        }, 300);
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal || e.target.id === 'lightbox-img-container') {
                closeLightbox();
            }
        });
    }


    // ==========================================================================
    // 6. Customized UPI Blessing Modal
    // ==========================================================================
    const showUpiBtn = document.getElementById('show-upi-btn');
    const upiModal = document.getElementById('upi-modal');
    const closeUpiBtn = document.getElementById('close-upi-btn');

    if (showUpiBtn && upiModal) {
        showUpiBtn.addEventListener('click', () => {
            upiModal.classList.remove('hidden');
            upiModal.classList.add('flex');
        });
    }

    function closeUpiModal() {
        if (!upiModal) return;
        upiModal.classList.add('hidden');
        upiModal.classList.remove('flex');
    }

    if (closeUpiBtn) {
        closeUpiBtn.addEventListener('click', closeUpiModal);
    }
    if (upiModal) {
        upiModal.addEventListener('click', (e) => {
            if (e.target === upiModal) {
                closeUpiModal();
            }
        });
    }


    // ==========================================================================
    // 7. Interactive Do Not Open Box Modal
    // ==========================================================================
    const openSecretBoxBtn = document.getElementById('open-secret-box-btn');
    const secretBoxModal = document.getElementById('secret-box-modal');
    const closeSecretBoxBtn = document.getElementById('close-secret-box-btn');
    
    // Funny Party Horn sound for secret box
    const partyHornSound = new Audio('https://www.soundjay.com/misc/sounds/party-horn-01.mp3');

    if (openSecretBoxBtn && secretBoxModal) {
        openSecretBoxBtn.addEventListener('click', () => {
            // Play funny party sound
            partyHornSound.play().catch(e => console.log('Sound blocked by user settings:', e));
            
            // Pop confetti burst on click
            const rect = openSecretBoxBtn.getBoundingClientRect();
            fireConfetti(rect.left + rect.width / 2, rect.top, 80);

            // Display modal
            secretBoxModal.classList.remove('hidden');
            secretBoxModal.classList.add('flex');
        });
    }

    function closeSecretBox() {
        if (!secretBoxModal) return;
        secretBoxModal.classList.add('hidden');
        secretBoxModal.classList.remove('flex');
    }

    if (closeSecretBoxBtn) {
        closeSecretBoxBtn.addEventListener('click', closeSecretBox);
    }
    if (secretBoxModal) {
        secretBoxModal.addEventListener('click', (e) => {
            if (e.target === secretBoxModal) {
                closeSecretBox();
            }
        });
    }


    // ==========================================================================
    // 8. Scroll Animation System (Intersection Observer)
    // ==========================================================================
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                scrollObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before it enters view fully
    });

    fadeElements.forEach(el => {
        scrollObserver.observe(el);
    });

});
