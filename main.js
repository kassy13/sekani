/* ============================================================
   GSAP + ScrollTrigger â€” Birthday Website v4
   6 Scenes: Gift | Card+Carousel | Timeline | 31 Wishes | Cake | Guestbook
   + Cursor Trail | Countdown Stats | Karaoke Lyrics | Cinematic Intro
   ============================================================ */
gsap.registerPlugin(ScrollTrigger);
(function () {
    /* â”€â”€ PARTICLES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var canvas = document.getElementById('particleCanvas');
    var ctx = canvas.getContext('2d');
    var W,
        H,
        particles = [];
    function resizeCanvas() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    function createParticles() {
        particles = [];
        var n = Math.floor((W * H) / 13000);
        var cols = ['#FF6B9D', '#C8B8FF', '#7B2FBE', '#FFE4F0', '#9D4EDD'];
        for (var i = 0; i < n; i++)
            particles.push({
                x: Math.random() * W,
                y: Math.random() * H,
                r: Math.random() * 1.6 + 0.3,
                vx: (Math.random() - 0.5) * 0.14,
                vy: (Math.random() - 0.5) * 0.14,
                alpha: Math.random() * 0.45 + 0.08,
                color: cols[Math.floor(Math.random() * cols.length)],
            });
    }
    function drawParticles() {
        ctx.clearRect(0, 0, W, H);
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.alpha;
            ctx.fill();
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(drawParticles);
    }
    resizeCanvas();
    createParticles();
    drawParticles();
    window.addEventListener('resize', function () {
        resizeCanvas();
        createParticles();
        ScrollTrigger.refresh();
    });

    /* â”€â”€ CONFETTI FIELD â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var cfField = document.createElement('div');
    cfField.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:999;overflow:hidden';
    document.body.appendChild(cfField);
    var cfColors = ['#FF6B9D', '#C8B8FF', '#7B2FBE', '#F5C842', '#FFE4F0', '#9D4EDD', '#FF8FB3'];
    var cfSpawned = false;
    function spawnConfetti(n) {
        n = n || 100;
        for (var i = 0; i < n; i++) {
            (function (d) {
                setTimeout(function () {
                    var el = document.createElement('div');
                    var sz = Math.random() * 12 + 4,
                        dur = Math.random() * 3 + 2;
                    el.style.cssText = [
                        'position:absolute',
                        'left:' + Math.random() * 100 + '%',
                        'top:-20px',
                        'width:' + sz + 'px',
                        'height:' + sz * (Math.random() * 1.5 + 0.5) + 'px',
                        'background:' + cfColors[Math.floor(Math.random() * cfColors.length)],
                        'border-radius:' + (Math.random() > 0.5 ? '50%' : '2px'),
                        'animation:cfFall ' + dur + 's linear forwards',
                        'opacity:1',
                    ].join(';');
                    cfField.appendChild(el);
                    setTimeout(
                        function () {
                            el.remove();
                        },
                        dur * 1000 + 100,
                    );
                }, d);
            })(i * 30);
        }
    }

    /* â”€â”€ SPARKLE FIELD (gift scene) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var sparkleField = document.getElementById('sparkleField');
    var sparkleColors = ['#FF6B9D', '#C8B8FF', '#FFE4F0', '#F5C842', '#9D4EDD'];
    function buildSparkles() {
        sparkleField.innerHTML = '';
        for (var i = 0; i < 30; i++) {
            var el = document.createElement('div');
            el.className = 'sparkle';
            var sz = Math.random() * 10 + 4;
            el.style.cssText = [
                'left:' + Math.random() * 100 + '%',
                'top:' + Math.random() * 100 + '%',
                '--sz:' + sz + 'px',
                '--sc:' + sparkleColors[Math.floor(Math.random() * sparkleColors.length)],
                '--sd:' + (Math.random() * 2 + 1.5) + 's',
                '--sdel:' + Math.random() * 3 + 's',
            ].join(';');
            sparkleField.appendChild(el);
        }
    }
    buildSparkles();

    /* â”€â”€ CINEMATIC INTRO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var introCinematic = document.getElementById('introCinematic');
    var countdownStats = document.getElementById('countdownStats');
    // Hide intro text immediately â€” removed per design
    if (introCinematic) introCinematic.style.display = 'none';
    // Show stats after a short delay
    gsap.to(countdownStats, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        delay: 0.8,
    });

    /* â”€â”€ COUNTDOWN STATS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    // Sekani's birthday: May 31, 1995
    var birthday = new Date('1995-05-31T00:00:00');
    var now = new Date();
    var msAlive = now - birthday;
    var daysAlive = Math.floor(msAlive / (1000 * 60 * 60 * 24));
    var heartbeats = Math.floor(daysAlive * 24 * 60 * 70); // ~70 bpm avg

    function formatBig(n) {
        return n.toLocaleString();
    }
    function animateCount(el, target, duration) {
        var start = 0;
        var startTime = null;
        function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / (duration * 1000), 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = formatBig(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }
    // Trigger count-up when stats become visible
    setTimeout(function () {
        var dEl = document.getElementById('statDays');
        var hEl = document.getElementById('statHeartbeats');
        if (dEl) animateCount(dEl, daysAlive, 2);
        if (hEl) animateCount(hEl, heartbeats, 2.5);
    }, 900);

    /* â”€â”€ POSTCARD DATA (31 wishes as polaroid postcards) â”€â”€â”€â”€â”€ */
    var postcardData = [
        {
            img: 'https://picsum.photos/seed/pc1/400/500',
            wish: 'May this year bring you everything your heart has been quietly hoping for. You deserve every single bit of it.',
            author: 'Mom',
            tilt: -3,
        },
        {
            img: 'https://picsum.photos/seed/pc2/400/500',
            wish: '31 looks incredible on you. Watching you grow into the person you are today has been the greatest privilege of my life.',
            author: 'Dad',
            tilt: 2,
        },
        {
            img: 'https://picsum.photos/seed/pc3/400/500',
            wish: "You light up every room you walk into without even trying. Here's to 31 more years of your magic and laughter.",
            author: 'Zara',
            tilt: -2,
        },
        {
            img: 'https://picsum.photos/seed/pc4/400/500',
            wish: "You've always been the calm in every storm. May 31 be the year the universe gives back everything you've poured into others.",
            author: 'Kofi',
            tilt: 3,
        },
        {
            img: 'https://picsum.photos/seed/pc5/400/500',
            wish: 'To the most thoughtful, brilliant, and genuinely kind person I know â€” may 31 be the chapter where everything clicks into place.',
            author: 'Amara',
            tilt: -1,
        },
        {
            img: 'https://picsum.photos/seed/pc6/400/500',
            wish: 'Happy 31st! You make the world a better, warmer, more interesting place just by being in it.',
            author: 'Temi',
            tilt: 2.5,
        },
        {
            img: 'https://picsum.photos/seed/pc7/400/500',
            wish: "May every dream you've been nurturing in silence finally bloom this year. You've been patient enough.",
            author: 'Nana',
            tilt: -3.5,
        },
        {
            img: 'https://picsum.photos/seed/pc8/400/500',
            wish: '31 years of you is 31 years of the world being a better place. Keep shining, keep growing.',
            author: 'Ade',
            tilt: 1.5,
        },
        {
            img: 'https://picsum.photos/seed/pc9/400/500',
            wish: 'You have this rare gift of making everyone around you feel seen. May this year, someone does the same for you.',
            author: 'Sola',
            tilt: -2.5,
        },
        {
            img: 'https://picsum.photos/seed/pc10/400/500',
            wish: "Here's to the woman who turns ordinary moments into extraordinary memories. Happy 31st, Sekani.",
            author: 'Bisi',
            tilt: 3,
        },
        {
            img: 'https://picsum.photos/seed/pc11/400/500',
            wish: 'May 31 be the year you finally give yourself the same grace you so freely give to everyone else.',
            author: 'Chidi',
            tilt: -1.5,
        },
        {
            img: 'https://picsum.photos/seed/pc12/400/500',
            wish: 'You are proof that kindness and strength can live in the same heart. Wishing you a year as beautiful as you are.',
            author: 'Lola',
            tilt: 2,
        },
        {
            img: 'https://picsum.photos/seed/pc13/400/500',
            wish: '31 candles, 31 reasons the world is lucky to have you. May this year be your most luminous yet.',
            author: 'Emeka',
            tilt: -3,
        },
        {
            img: 'https://picsum.photos/seed/pc14/400/500',
            wish: 'To the person who always shows up â€” may this year, the universe shows up for you in ways that take your breath away.',
            author: 'Funmi',
            tilt: 1,
        },
        {
            img: 'https://picsum.photos/seed/pc15/400/500',
            wish: "You've spent 31 years being someone's reason to smile. Now it's your turn to smile the biggest.",
            author: 'Kemi',
            tilt: -2,
        },
        {
            img: 'https://picsum.photos/seed/pc16/400/500',
            wish: "May your 31st year be filled with the kind of joy that doesn't need a reason â€” just pure, effortless happiness.",
            author: 'Dayo',
            tilt: 3.5,
        },
        {
            img: 'https://picsum.photos/seed/pc17/400/500',
            wish: "Here's to 31 years of a soul that makes the world softer. May this chapter be your favourite one yet.",
            author: 'Yemi',
            tilt: -1,
        },
        {
            img: 'https://picsum.photos/seed/pc18/400/500',
            wish: 'You carry so much light in you, Sekani. May 31 be the year you finally let yourself bask in it.',
            author: 'Tunde',
            tilt: 2.5,
        },
        {
            img: 'https://picsum.photos/seed/pc19/400/500',
            wish: '31 years of choosing love, choosing growth, choosing to show up. May this year choose you right back.',
            author: 'Ngozi',
            tilt: -3,
        },
        {
            img: 'https://picsum.photos/seed/pc20/400/500',
            wish: "May every door that was closed finally swing wide open for you this year. You've been knocking long enough.",
            author: 'Seun',
            tilt: 1.5,
        },
        {
            img: 'https://picsum.photos/seed/pc21/400/500',
            wish: 'To 31 years of being exactly who you are â€” unapologetically, beautifully, powerfully you.',
            author: 'Ify',
            tilt: -2.5,
        },
        {
            img: 'https://picsum.photos/seed/pc22/400/500',
            wish: "May this birthday mark the beginning of the season you've been waiting for. Your time is now.",
            author: 'Gbenga',
            tilt: 3,
        },
        {
            img: 'https://picsum.photos/seed/pc23/400/500',
            wish: "You've given so much of yourself to others. May 31 be the year you pour into yourself just as generously.",
            author: 'Toyin',
            tilt: -1.5,
        },
        {
            img: 'https://picsum.photos/seed/pc24/400/500',
            wish: 'Happy birthday to the person who makes every gathering warmer just by walking in. We love you, Sekani.',
            author: 'The Squad',
            tilt: 2,
        },
        {
            img: 'https://picsum.photos/seed/pc25/400/500',
            wish: '31 years of resilience, grace, and quiet power. May this year be loud with blessings.',
            author: 'Mama Titi',
            tilt: -3.5,
        },
        {
            img: 'https://picsum.photos/seed/pc26/400/500',
            wish: 'May you wake up every morning of your 31st year knowing exactly how loved and valued you are.',
            author: 'Remi',
            tilt: 1,
        },
        {
            img: 'https://picsum.photos/seed/pc27/400/500',
            wish: "Here's to the woman who turns pain into poetry and setbacks into stepping stones. Happy 31st.",
            author: 'Chisom',
            tilt: -2,
        },
        {
            img: 'https://picsum.photos/seed/pc28/400/500',
            wish: "May 31 bring you the peace you've been searching for, the love you deserve, and the rest you've earned.",
            author: 'Biodun',
            tilt: 3,
        },
        {
            img: 'https://picsum.photos/seed/pc29/400/500',
            wish: 'You are one of the rare ones â€” the kind of person who makes the world better just by existing in it.',
            author: 'Fola',
            tilt: -1,
        },
        {
            img: 'https://picsum.photos/seed/pc30/400/500',
            wish: '31 years of you is a gift to everyone who knows you. May this year gift you back tenfold.',
            author: 'Ola',
            tilt: 2.5,
        },
        {
            img: 'https://picsum.photos/seed/pc31/400/500',
            wish: 'And here we are â€” 31 beautiful years later. The best is absolutely still ahead of you. We love you, Sekani. â™¥',
            author: 'Everyone',
            tilt: -2,
        },
    ];

    /* -- MEMORY LANE (Scene 3) -- photo postcard carousel -- */
    var memoryPath = document.getElementById('memoryPath');
    var realImgs = ['Images/slide1.jpeg', 'Images/slide2.jpeg', 'Images/slide3.jpeg', 'Images/slide4.jpeg', 'Images/slide5.jpeg'];
    var memCurrent = 0;
    var memCards = [];

    if (memoryPath) {
        postcardData.forEach(function (p, i) {
            var card = document.createElement('div');
            card.className = 'mem-card' + (i === 0 ? ' active' : '');
            card.style.setProperty('--tilt', p.tilt * 0.5 + 'deg');
            card.innerHTML =
                '<div class="mem-card-inner">' +
                '<div class="mem-photo-wrap">' +
                '<img src="' +
                realImgs[i % realImgs.length] +
                '" alt="Memory ' +
                (i + 1) +
                '" loading="lazy" />' +
                '<span class="mem-num">' +
                (i + 1) +
                '</span>' +
                '</div>' +
                '<div class="mem-wish-wrap">' +
                '<p class="mem-wish">\u201c' +
                p.wish +
                '\u201d</p>' +
                '</div>' +
                '</div>';
            memoryPath.appendChild(card);
            memCards.push(card);
        });
    }

    function goMem(idx) {
        var prev = memCurrent;
        memCurrent = (idx + postcardData.length) % postcardData.length;
        memCards[prev].classList.remove('active');
        memCards[prev].classList.add(memCurrent > prev ? 'exit-left' : 'exit-right');
        setTimeout(function () {
            memCards[prev].classList.remove('exit-left', 'exit-right');
        }, 500);
        memCards[memCurrent].classList.add('active');
        var fill = document.getElementById('memFill');
        var ctr = document.getElementById('memCounter');
        if (fill) fill.style.width = (memCurrent / (postcardData.length - 1)) * 100 + '%';
        if (ctr) ctr.textContent = memCurrent + 1;
    }

    var memPrevBtn = document.getElementById('memPrev');
    var memNextBtn = document.getElementById('memNext');
    if (memPrevBtn)
        memPrevBtn.addEventListener('click', function () {
            goMem(memCurrent - 1);
        });
    if (memNextBtn)
        memNextBtn.addEventListener('click', function () {
            goMem(memCurrent + 1);
        });

    if (memoryPath) {
        var msx = 0;
        memoryPath.addEventListener(
            'touchstart',
            function (e) {
                msx = e.touches[0].clientX;
            },
            {passive: true},
        );
        memoryPath.addEventListener(
            'touchend',
            function (e) {
                var d = msx - e.changedTouches[0].clientX;
                if (Math.abs(d) > 40) goMem(d > 0 ? memCurrent + 1 : memCurrent - 1);
            },
            {passive: true},
        );
    }

    /* â”€â”€ 31 THINGS WE LOVE (Scene 6) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var loveItems = [
        'Your laugh that fills the whole room',
        'The way you make everyone feel seen',
        'Your quiet, steady strength',
        'How you turn pain into poetry',
        'Your ridiculous sense of humour',
        'The warmth you carry everywhere',
        'Your loyalty â€” fierce and unwavering',
        'How you remember the small things',
        'Your ability to find beauty in ordinary moments',
        'The way you show up, every single time',
        "Your honesty, even when it's hard",
        'How you love without keeping score',
        'Your curiosity about everything',
        'The grace you extend to others',
        'Your voice â€” speaking and singing',
        'How you hold space for people',
        'Your ambition wrapped in humility',
        "The way you dance like no one's watching",
        'Your taste â€” in music, in life, in people',
        'How you make hard days feel lighter',
        'Your resilience â€” quiet and unshakeable',
        'The way you dream, big and bold',
        'Your kindness that asks for nothing back',
        'How you make ordinary days feel special',
        'Your patience â€” a rare and precious gift',
        'The way you celebrate others genuinely',
        'Your creativity that surprises everyone',
        'How you carry your culture with pride',
        'Your heart â€” open, generous, full',
        'The way you keep growing, keep becoming',
        'Simply being you â€” Sekani Chiamaka Joy â™¥',
    ];

    var loveGrid = document.getElementById('loveGrid');
    if (loveGrid) {
        loveItems.forEach(function (item, i) {
            var card = document.createElement('div');
            card.className = 'love-card';
            card.innerHTML = '<span class="love-num">' + (i + 1) + '</span>' + '<p class="love-text">' + item + '</p>';
            loveGrid.appendChild(card);
        });
    }

    /* â”€â”€ PHOTO CAROUSEL (Scene 2) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var carouselTrack = document.getElementById('carouselTrack');
    var carouselDots = document.getElementById('carouselDots');
    var carouselPrev = document.getElementById('carouselPrev');
    var carouselNext = document.getElementById('carouselNext');
    var carouselImgs = carouselTrack ? carouselTrack.querySelectorAll('img') : [];
    var carouselIdx = 0;
    var carouselTimer = null;

    function buildCarouselDots() {
        carouselDots.innerHTML = '';
        carouselImgs.forEach(function (_, i) {
            var d = document.createElement('div');
            d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            d.addEventListener('click', function () {
                goCarousel(i);
            });
            carouselDots.appendChild(d);
        });
    }
    function goCarousel(idx) {
        carouselIdx = (idx + carouselImgs.length) % carouselImgs.length;
        carouselTrack.style.transform = 'translateX(-' + carouselIdx * 100 + '%)';
        carouselDots.querySelectorAll('.carousel-dot').forEach(function (d, i) {
            d.classList.toggle('active', i === carouselIdx);
        });
        resetCarouselTimer();
    }
    function resetCarouselTimer() {
        clearInterval(carouselTimer);
        carouselTimer = setInterval(function () {
            goCarousel(carouselIdx + 1);
        }, 3500);
    }
    if (carouselImgs.length) {
        buildCarouselDots();
        carouselPrev.addEventListener('click', function () {
            goCarousel(carouselIdx - 1);
        });
        carouselNext.addEventListener('click', function () {
            goCarousel(carouselIdx + 1);
        });
        resetCarouselTimer();
    }

    /* â”€â”€ VIRTUAL CAKE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var micBtn = document.getElementById('micBtn');
    var micLabel = document.getElementById('micLabel');
    var cakePrompt = document.getElementById('cakePrompt');
    var cakeSubText = document.getElementById('cakeSubText');
    var flames = document.querySelectorAll('.flame');
    var candlesBlown = false;
    var isListening = false;
    var recognition = null;

    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SR();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.onstart = function () {
            isListening = true;
            micBtn.classList.add('listening');
            micLabel.textContent = 'Wishing...';
        };
        recognition.onend = function () {
            isListening = false;
            micBtn.classList.remove('listening');
            micLabel.textContent = 'Hold to Wish';
            if (!candlesBlown) showBlowPrompt();
        };
        recognition.onerror = function () {
            isListening = false;
            micBtn.classList.remove('listening');
            micLabel.textContent = 'Hold to Wish';
        };
    }

    function advanceCakeStep(stepNum) {
        document.querySelectorAll('.cake-step').forEach(function (s) {
            s.classList.remove('active', 'done');
        });
        for (var s = 1; s < stepNum; s++) {
            var el = document.getElementById('step' + s);
            if (el) el.classList.add('done');
        }
        var cur = document.getElementById('step' + stepNum);
        if (cur) cur.classList.add('active');
    }

    function showBlowPrompt() {
        advanceCakeStep(2);
        cakePrompt.textContent = 'Beautiful wish \u2728 Now take a deep breath and blow out the candles!';
        cakePrompt.classList.add('visible');
        cakeSubText.textContent = 'Blow into your microphone...';
        micLabel.textContent = '\uD83D\uDCA8 Blow!';
        startBlowDetection();
    }

    function startBlowDetection() {
        if (!navigator.mediaDevices) {
            micBtn.onclick = function () {
                blowCandles(null, null);
            };
            return;
        }
        navigator.mediaDevices
            .getUserMedia({audio: true})
            .then(function (stream) {
                var ac = new AudioContext();
                var src = ac.createMediaStreamSource(stream);
                var analyser = ac.createAnalyser();
                analyser.fftSize = 256;
                src.connect(analyser);
                var buf = new Uint8Array(analyser.frequencyBinCount);
                var blowFrames = 0;
                function check() {
                    if (candlesBlown) return;
                    analyser.getByteFrequencyData(buf);
                    var avg =
                        buf.reduce(function (a, b) {
                            return a + b;
                        }, 0) / buf.length;
                    if (avg > 28) {
                        blowFrames++;
                    } else {
                        blowFrames = Math.max(0, blowFrames - 1);
                    }
                    if (blowFrames > 12) {
                        blowCandles(stream, ac);
                        return;
                    }
                    requestAnimationFrame(check);
                }
                check();
            })
            .catch(function () {
                cakePrompt.textContent = 'Beautiful wish \u2728 Click the button to blow out the candles!';
                micLabel.textContent = '\uD83D\uDCA8 Blow!';
                micBtn.onclick = function () {
                    blowCandles(null, null);
                };
            });
    }

    function blowCandles(stream, ac) {
        if (candlesBlown) return;
        candlesBlown = true;
        advanceCakeStep(3);
        if (stream)
            stream.getTracks().forEach(function (t) {
                t.stop();
            });
        if (ac) ac.close();
        var flash = document.createElement('div');
        flash.className = 'cake-flash';
        document.body.appendChild(flash);
        setTimeout(function () {
            flash.remove();
        }, 700);
        flames.forEach(function (f, i) {
            setTimeout(function () {
                f.classList.add('out');
            }, i * 150);
        });
        setTimeout(
            function () {
                micBtn.style.display = 'none';
                var micRing = document.getElementById('micRing');
                if (micRing) micRing.style.display = 'none';
            },
            flames.length * 150 + 200,
        );
        setTimeout(function () {
            spawnConfetti(180);
        }, 500);
        setTimeout(function () {
            cakePrompt.textContent = '\uD83C\uDF82 Your wish has been sent to the universe. Happy 31st Birthday, Sekani! \u2665';
            cakeSubText.textContent = 'May every candle carry your dream forward.';
        }, 900);
    }

    micBtn.addEventListener('mousedown', function () {
        if (candlesBlown) return;
        if (recognition && !isListening) {
            try {
                recognition.start();
            } catch (e) {}
        }
    });
    micBtn.addEventListener('mouseup', function () {
        if (recognition && isListening) {
            try {
                recognition.stop();
            } catch (e) {}
        }
    });
    micBtn.addEventListener('touchstart', function (e) {
        e.preventDefault();
        if (candlesBlown) return;
        if (recognition && !isListening) {
            try {
                recognition.start();
            } catch (e) {}
        }
    });
    micBtn.addEventListener('touchend', function (e) {
        e.preventDefault();
        if (recognition && isListening) {
            try {
                recognition.stop();
            } catch (e) {}
        }
    });

    /* â”€â”€ GSAP SCENE REFS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var scene1 = document.getElementById('scene1');
    var scene2 = document.getElementById('scene2');
    var scene3 = document.getElementById('scene3');
    var scene4 = document.getElementById('scene4');
    var scene5 = document.getElementById('scene5');
    var scene6 = document.getElementById('scene6');
    var giftLid = document.getElementById('giftLid');
    var giftBox = document.getElementById('giftBox');
    var giftInnerGlow = document.getElementById('giftInnerGlow');
    var risingCard = document.getElementById('risingCard');
    var burst = document.getElementById('burst');
    var confettiBurst = document.getElementById('confettiBurst');

    /* â”€â”€ INITIAL STATES â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    gsap.set(scene2, {y: '8vh', scale: 0.92, opacity: 0, filter: 'blur(10px)'});
    gsap.set(scene3, {y: '10vh', scale: 0.88, opacity: 0, filter: 'blur(12px)'});
    gsap.set(scene4, {y: '12vh', scale: 0.85, opacity: 0, filter: 'blur(14px)'});
    gsap.set(scene5, {y: '14vh', scale: 0.82, opacity: 0, filter: 'blur(16px)'});
    gsap.set(scene6, {y: '16vh', scale: 0.79, opacity: 0, filter: 'blur(18px)'});
    gsap.set(giftInnerGlow, {opacity: 0});
    gsap.set(risingCard, {y: 0, opacity: 0});
    gsap.set(burst, {opacity: 0, scale: 0.5});
    gsap.set(confettiBurst.querySelectorAll('span'), {x: 0, y: 0, opacity: 0, rotation: 0});

    /* â”€â”€ MASTER TIMELINE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var tl = gsap.timeline({defaults: {ease: 'expo.inOut'}});

    // Beat 0â†’1: gift opens
    tl.to(giftLid, {y: -200, rotation: -30, scale: 0.75, opacity: 0, ease: 'back.in(1.5)', duration: 0.8}, 0);
    tl.to(giftInnerGlow, {opacity: 1, duration: 0.4}, 0.3);
    tl.to(burst, {opacity: 1, scale: 1.8, duration: 0.7, ease: 'power2.out'}, 0.35);
    tl.to(risingCard, {y: -170, opacity: 1, duration: 0.7, ease: 'back.out(1.4)'}, 0.45);
    tl.to(
        confettiBurst.querySelectorAll('span'),
        {
            x: function (i) {
                return [[-120, 100, -80, 140, -160, 60, -40, 180, -200, 220, -100, 80][i]];
            },
            y: function (i) {
                return [[-80, -100, -140, -60, -50, -160, -180, -90, -70, -120, -200, -220][i]];
            },
            rotation: function (i) {
                return [[25, -15, 40, -30, 10, -45, 55, -20, 35, -50, 60, -25][i]];
            },
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.03,
        },
        0.45,
    );

    // Beat 1â†’2
    tl.to(scene1, {y: '-110vh', scale: 0.84, opacity: 0, filter: 'blur(18px)', duration: 1}, 1);
    tl.to(scene2, {y: '0vh', scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1}, 1);

    // Beat 2â†’3
    tl.to(scene2, {y: '-110vh', scale: 0.84, opacity: 0, filter: 'blur(18px)', duration: 1}, 2);
    tl.to(scene3, {y: '0vh', scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1}, 2);

    // Beat 3â†’4
    tl.to(scene3, {y: '-110vh', scale: 0.84, opacity: 0, filter: 'blur(18px)', duration: 1}, 3);
    tl.to(scene4, {y: '0vh', scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1}, 3);

    // Beat 4->5
    tl.to(scene4, {y: '-110vh', scale: 0.84, opacity: 0, filter: 'blur(18px)', duration: 1}, 4);
    tl.to(scene5, {y: '0vh', scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1}, 4);

    // Beat 5->6 (31 Things)
    tl.to(scene5, {y: '-110vh', scale: 0.84, opacity: 0, filter: 'blur(18px)', duration: 1}, 5);
    tl.to(scene6, {y: '0vh', scale: 1, opacity: 1, filter: 'blur(0px)', duration: 1}, 5);

    /* -- MAIN SCROLL TRIGGER -- */
    ScrollTrigger.create({
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom bottom',
        pin: '#mainWrapper',
        pinSpacing: false,
        scrub: 2,
        animation: tl,
        onUpdate: function (self) {
            var p = self.progress;
            var idx = p < 0.12 ? 0 : p < 0.3 ? 1 : p < 0.5 ? 2 : p < 0.7 ? 3 : 4;
            document.querySelectorAll('.prog-dot').forEach(function (d, i) {
                d.classList.toggle('active', i === idx);
            });
            if (p > 0.1 && p < 0.26 && !cfSpawned) {
                cfSpawned = true;
                spawnConfetti(120);
            }
        },
    });

    /* -- ENTRANCE ANIMATIONS -- */
    gsap.from(giftBox, {scale: 0.65, opacity: 0, y: 70, duration: 1.5, ease: 'back.out(1.6)', delay: 0.3});

    ScrollTrigger.create({
        trigger: '.scroll-container',
        start: '20% top',
        once: true,
        onEnter: function () {
            gsap.from(
                '#scene2 .bday-eyebrow,#scene2 .bday-name,#scene2 .bday-rule,#scene2 .bday-age-row,#scene2 .bday-quote,#scene2 .bday-date,#scene2 .bday-tags',
                {opacity: 0, y: 30, duration: 0.7, ease: 'power3.out', stagger: 0.08},
            );
            gsap.from('#scene2 .bday-photo-scene', {opacity: 0, scale: 0.85, duration: 1, ease: 'back.out(1.4)', delay: 0.2});
        },
    });
    ScrollTrigger.create({
        trigger: '.scroll-container',
        start: '38% top',
        once: true,
        onEnter: function () {
            gsap.from('#scene3 .mem-card.active', {opacity: 0, y: 40, scale: 0.9, duration: 0.8, ease: 'back.out(1.4)'});
        },
    });
    ScrollTrigger.create({
        trigger: '.scroll-container',
        start: '56% top',
        once: true,
        onEnter: function () {
            gsap.from('#scene4 .cake-wrap', {opacity: 0, y: 50, scale: 0.9, duration: 1, ease: 'back.out(1.4)'});
            gsap.from('#scene4 .cake-header', {opacity: 0, y: 20, duration: 0.7, ease: 'power3.out', delay: 0.3});
            gsap.from('#scene4 .cake-controls', {opacity: 0, scale: 0.8, duration: 0.7, ease: 'back.out(1.6)', delay: 0.5});
        },
    });
    ScrollTrigger.create({
        trigger: '.scroll-container',
        start: '74% top',
        once: true,
        onEnter: function () {
            gsap.from('#scene5 .mosaic-item', {opacity: 0, scale: 0.9, duration: 0.7, ease: 'back.out(1.4)', stagger: 0.1});
        },
    });

    /* â”€â”€ PROGRESS DOT CLICK â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var snapPts = [0, 1 / 4, 2 / 4, 3 / 4, 1];
    document.querySelectorAll('.prog-dot').forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            var total = document.querySelector('.scroll-container').offsetHeight - window.innerHeight;
            window.scrollTo({top: total * snapPts[i], behavior: 'smooth'});
        });
    });

    /* â”€â”€ AUDIO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var audio = document.getElementById('bgAudio');
    var audioBtn = document.getElementById('audioBtn');
    var iconPlay = document.getElementById('iconPlay');
    var iconMute = document.getElementById('iconMute');
    var audioBars = document.getElementById('audioBars');
    var playing = false;
    function setPlaying(s) {
        playing = s;
        if (s) {
            audio.play().catch(function () {});
            iconPlay.style.display = 'none';
            iconMute.style.display = 'block';
            audioBars.classList.add('playing');
        } else {
            audio.pause();
            iconPlay.style.display = 'block';
            iconMute.style.display = 'none';
            audioBars.classList.remove('playing');
        }
    }
    audioBtn.addEventListener('click', function () {
        setPlaying(!playing);
    });
    // Attempt autoplay immediately; browsers may block it until user interaction
    audio
        .play()
        .then(function () {
            setPlaying(true);
        })
        .catch(function () {
            // Autoplay blocked â€” start on first interaction
            var startOnce = function () {
                if (!playing) setPlaying(true);
                window.removeEventListener('wheel', startOnce);
                window.removeEventListener('touchstart', startOnce);
                window.removeEventListener('click', startOnce);
            };
            window.addEventListener('wheel', startOnce, {passive: true});
            window.addEventListener('touchstart', startOnce, {passive: true});
            window.addEventListener('click', startOnce, {passive: true});
        });

    /* â”€â”€ CURSOR TRAIL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    var trailCanvas = document.getElementById('cursorTrail');
    var tCtx = trailCanvas.getContext('2d');
    var trailW, trailH;
    var trailParticles = [];
    var mouseX = -999,
        mouseY = -999;

    function resizeTrail() {
        trailW = trailCanvas.width = window.innerWidth;
        trailH = trailCanvas.height = window.innerHeight;
    }
    resizeTrail();
    window.addEventListener('resize', resizeTrail);

    var trailColors = ['#FF6B9D', '#C8B8FF', '#FFE4F0', '#9D4EDD', '#FF8FB3', '#F5C842'];
    window.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        for (var i = 0; i < 3; i++) {
            trailParticles.push({
                x: mouseX + (Math.random() - 0.5) * 8,
                y: mouseY + (Math.random() - 0.5) * 8,
                r: Math.random() * 4 + 1.5,
                alpha: Math.random() * 0.7 + 0.3,
                vx: (Math.random() - 0.5) * 1.2,
                vy: (Math.random() - 0.5) * 1.2 - 0.5,
                decay: Math.random() * 0.025 + 0.015,
                color: trailColors[Math.floor(Math.random() * trailColors.length)],
                shape: Math.random() > 0.6 ? 'star' : 'circle',
            });
        }
    });

    function drawStar(ctx, x, y, r) {
        ctx.save();
        ctx.translate(x, y);
        ctx.beginPath();
        for (var i = 0; i < 5; i++) {
            var angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            var xi = Math.cos(angle) * r;
            var yi = Math.sin(angle) * r;
            i === 0 ? ctx.moveTo(xi, yi) : ctx.lineTo(xi, yi);
        }
        ctx.closePath();
        ctx.restore();
    }

    function animateTrail() {
        tCtx.clearRect(0, 0, trailW, trailH);
        for (var i = trailParticles.length - 1; i >= 0; i--) {
            var p = trailParticles[i];
            tCtx.globalAlpha = p.alpha;
            tCtx.fillStyle = p.color;
            if (p.shape === 'star') {
                drawStar(tCtx, p.x, p.y, p.r);
                tCtx.fill();
            } else {
                tCtx.beginPath();
                tCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                tCtx.fill();
            }
            p.x += p.vx;
            p.y += p.vy;
            p.alpha -= p.decay;
            p.r *= 0.97;
            if (p.alpha <= 0) trailParticles.splice(i, 1);
        }
        tCtx.globalAlpha = 1;
        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    /* â”€â”€ KARAOKE LYRICS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
    // Edit these lines to match your actual song lyrics and timestamps (in seconds)
    // Format: { t: startTime, text: 'lyric line', words: [wordEndTimes...] }
    // Set t:-1 for section breaks (blank spacer lines)
    var lyricsData = [
        // Verse 1
        {t: 11, text: 'Sekani Chiamaka Joy, today is yours', words: []},
        {t: 15, text: 'A little sun in the shape of a girl', words: []},
        {t: 19, text: 'You make the hard days feel less heavy', words: []},
        {t: 23, text: 'You bring a kind of peace to my world', words: []},
        {t: -1, text: '', words: []},
        // Pre-Chorus
        {t: 28, text: 'And I hope you know', words: []},
        {t: 31, text: 'What you mean to me', words: []},
        {t: 34, text: 'Every laugh you give', words: []},
        {t: 37, text: 'Feels like a blessing to me', words: []},
        {t: -1, text: '', words: []},
        // Chorus
        {t: 41, text: 'Happy birthday, my sister', words: []},
        {t: 44, text: 'Happy birthday, my friend', words: []},
        {t: 47, text: 'Sekani Chiamaka Joy', words: []},
        {t: 50, text: "I'll love you to the end", words: []},
        {t: 53, text: 'Happy birthday, my sister', words: []},
        {t: 56, text: 'You shine in every way', words: []},
        {t: 59, text: 'Sekani Chiamaka Joy', words: []},
        {t: 62, text: "I'm grateful every day", words: []},
        {t: -1, text: '', words: []},
        // Verse 2
        {t: 67, text: "You've held my heart in the gentlest hands", words: []},
        {t: 71, text: 'You knew my silence before I spoke', words: []},
        {t: 75, text: 'You turn small moments into memories', words: []},
        {t: 79, text: 'And heal my soul with a simple joke', words: []},
        {t: -1, text: '', words: []},
        // Pre-Chorus 2
        {t: 84, text: 'So I pray for you', words: []},
        {t: 87, text: 'More joy than you can hold', words: []},
        {t: 90, text: 'More grace on your road', words: []},
        {t: 93, text: "And a love that's pure as gold", words: []},
        {t: -1, text: '', words: []},
        // Chorus
        {t: 97, text: 'Happy birthday, my sister', words: []},
        {t: 100, text: 'Happy birthday, my friend', words: []},
        {t: 103, text: 'Sekani Chiamaka Joy', words: []},
        {t: 106, text: "I'll love you to the end", words: []},
        {t: 109, text: 'Happy birthday, my sister', words: []},
        {t: 112, text: 'You shine in every way', words: []},
        {t: 115, text: 'Sekani Chiamaka Joy', words: []},
        {t: 118, text: "I'm grateful every day", words: []},
        {t: -1, text: '', words: []},
        // Bridge
        {t: 123, text: "If I had one wish, I'd lay it at your feet", words: []},
        {t: 127, text: 'For open doors and a heart so free', words: []},
        {t: 131, text: "For every dream you've kept tucked inside", words: []},
        {t: 135, text: 'May they bloom in time', words: []},
        {t: 138, text: 'May they bloom in light', words: []},
        {t: -1, text: '', words: []},
        // Final Chorus
        {t: 143, text: 'Happy birthday, my sister', words: []},
        {t: 146, text: 'Happy birthday, my friend', words: []},
        {t: 149, text: 'Sekani Chiamaka Joy', words: []},
        {t: 152, text: "I'll love you to the end", words: []},
        {t: 155, text: 'Happy birthday, my sister', words: []},
        {t: 158, text: 'You shine in every way', words: []},
        {t: 161, text: 'Sekani Chiamaka Joy', words: []},
        {t: 164, text: "I'm grateful every day", words: []},
        {t: 167, text: 'Happy birthday, my sister', words: []},
        {t: 170, text: "You're my forever stay", words: []},
        {t: 173, text: 'Sekani Chiamaka Joy', words: []},
        {t: 176, text: 'I love you more than words can say â™¥', words: []},
    ];

    var lyricsModal = document.getElementById('lyricsModal');
    var lyricsBody = document.getElementById('lyricsBody');
    var lyricsClose = document.getElementById('lyricsClose');
    var lyricsBackdrop = document.getElementById('lyricsBackdrop');
    var lyricsVinyl = document.getElementById('lyricsVinyl');
    var lyricsFill = document.getElementById('lyricsProgressFill');
    var lyricsCurrent = document.getElementById('lyricsCurrentTime');
    var lyricsDuration = document.getElementById('lyricsDuration');
    var lyricsPillBtn = document.getElementById('lyricsPillBtn');
    var lyricsOpen = false;
    var lyricsRAF = null;
    var currentLyricIdx = 0;

    // Build lyric lines â€” tap-to-advance mode
    var lyricLineEls = [];
    lyricsData.forEach(function (line) {
        if (line.t === -1) {
            var br = document.createElement('div');
            br.className = 'lyric-section-break';
            lyricsBody.appendChild(br);
            return;
        }
        var el = document.createElement('div');
        el.className = 'lyric-line';
        el.textContent = line.text;
        lyricsBody.appendChild(el);
        lyricLineEls.push(el);
    });

    // Tap any line to make it active, or tap active to advance
    lyricLineEls.forEach(function (el, i) {
        el.addEventListener('click', function () {
            setActiveLyricLine(i);
        });
    });

    function setActiveLyricLine(i) {
        currentLyricIdx = i;
        lyricLineEls.forEach(function (el, j) {
            el.classList.toggle('active', j === i);
            el.classList.toggle('sung', j < i);
        });
        lyricLineEls[i].scrollIntoView({behavior: 'smooth', block: 'center'});
    }

    // Tap anywhere on the modal body to advance to next line
    lyricsBody.addEventListener('click', function (e) {
        if (e.target === lyricsBody) {
            var next = currentLyricIdx + 1;
            if (next < lyricLineEls.length) setActiveLyricLine(next);
        }
    });

    function formatTime(s) {
        var m = Math.floor(s / 60);
        var sec = Math.floor(s % 60);
        return m + ':' + (sec < 10 ? '0' : '') + sec;
    }

    // Progress bar still tracks audio time
    function updateProgressBar() {
        if (!lyricsOpen) return;
        var t = audio.currentTime;
        var dur = audio.duration || 1;
        if (lyricsFill) lyricsFill.style.width = (t / dur) * 100 + '%';
        if (lyricsCurrent) lyricsCurrent.textContent = formatTime(t);
        if (lyricsDuration) lyricsDuration.textContent = formatTime(dur);
        lyricsRAF = requestAnimationFrame(updateProgressBar);
    }
    function openLyrics() {
        lyricsOpen = true;
        lyricsModal.classList.add('open');
        document.body.style.overflow = 'hidden';
        if (lyricsVinyl && playing) lyricsVinyl.classList.add('spinning');
        cancelAnimationFrame(lyricsRAF);
        updateProgressBar();
        // Highlight first line on open
        if (lyricLineEls.length && currentLyricIdx === 0) setActiveLyricLine(0);
    }
    function closeLyrics() {
        lyricsOpen = false;
        lyricsModal.classList.remove('open');
        document.body.style.overflow = '';
        cancelAnimationFrame(lyricsRAF);
    }

    if (lyricsPillBtn)
        lyricsPillBtn.addEventListener('click', function () {
            lyricsOpen ? closeLyrics() : openLyrics();
        });
    if (lyricsClose) lyricsClose.addEventListener('click', closeLyrics);
    if (lyricsBackdrop) lyricsBackdrop.addEventListener('click', closeLyrics);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lyricsOpen) closeLyrics();
    });

    // Keep vinyl spinning in sync â€” patch the audio button click
    if (audioBtn) {
        audioBtn.addEventListener('click', function () {
            setTimeout(function () {
                if (lyricsVinyl) lyricsVinyl.classList.toggle('spinning', playing);
            }, 50);
        });
    }
})();
