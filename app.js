/**
 * Portfolio Interactive Logic
 * Muhammad Jahanzaib - Systems Engineer & IT Support Portfolio
 * -------------------------------------------------------------
 * Features:
 * 1. Interactive Canvas Network Background (Virtualization/Nodes theme)
 * 2. Typing animation for roles
 * 3. Mobile Navigation Menu toggle
 * 4. Tab filtering for Technical Skills
 * 5. Scroll-reveal animations via IntersectionObserver
 * 6. Interactive Command Line Interface (CLI/Terminal)
 * 7. Contact Form submission simulation
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. CANVAS NETWORK BACKGROUND EFFECT
    // ==========================================
    const canvas = document.getElementById('network-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 150 };

        // Adjust canvas sizing
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        // Track cursor
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor(x, y, vx, vy, radius) {
                this.x = x;
                this.y = y;
                this.vx = vx;
                this.vy = vy;
                this.radius = radius;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(0, 240, 255, 0.4)';
                ctx.fill();
            }

            update() {
                // Collision with boundaries
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;

                this.x += this.vx;
                this.y += this.vy;

                this.draw();
            }
        }

        const initParticles = () => {
            particles = [];
            // Dynamically scale particle count based on screen size
            const count = Math.floor((canvas.width * canvas.height) / 18000);
            const particleCount = Math.min(Math.max(count, 30), 100);

            for (let i = 0; i < particleCount; i++) {
                const radius = Math.random() * 2 + 1.5;
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                const vx = (Math.random() - 0.5) * 0.4;
                const vy = (Math.random() - 0.5) * 0.4;
                particles.push(new Particle(x, y, vx, vy, radius));
            }
        };

        const connectParticles = () => {
            const maxDistance = 120;
            for (let a = 0; a < particles.length; a++) {
                for (let b = a + 1; b < particles.length; b++) {
                    const dx = particles[a].x - particles[b].x;
                    const dy = particles[a].y - particles[b].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDistance) {
                        const alpha = (1 - (dist / maxDistance)) * 0.15;
                        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(particles[b].x, particles[b].y);
                        ctx.stroke();
                    }
                }

                // Interactive connection with cursor
                if (mouse.x !== null && mouse.y !== null) {
                    const dxMouse = particles[a].x - mouse.x;
                    const dyMouse = particles[a].y - mouse.y;
                    const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                    if (distMouse < mouse.radius) {
                        const alpha = (1 - (distMouse / mouse.radius)) * 0.25;
                        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
                        ctx.lineWidth = 1.2;
                        ctx.beginPath();
                        ctx.moveTo(particles[a].x, particles[a].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => p.update());
            connectParticles();
            requestAnimationFrame(animate);
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animate();
    }


    // ==========================================
    // 2. AUTO-TYPING SUBTITLES
    // ==========================================
    const typingSpan = document.getElementById('typing-sub');
    if (typingSpan) {
        const roles = [
            'IT Support Executive',
            'Systems Engineer',
            'IT Infrastructure Specialist',
            'Microsoft 365 Admin'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        const type = () => {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingSpan.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50; // Faster deleting
            } else {
                typingSpan.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100; // Normal typing
            }

            if (!isDeleting && charIndex === currentRole.length) {
                // Pause at the end of word
                isDeleting = true;
                typingSpeed = 2000; 
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before typing next word
            }

            setTimeout(type, typingSpeed);
        };

        setTimeout(type, 1000);
    }


    // ==========================================
    // 3. MOBILE NAVIGATION MENU
    // ==========================================
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-terminal, .btn-contact');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('open');
            // Toggle hamburger animation
            const bars = navToggle.querySelectorAll('.bar');
            if (navToggle.classList.contains('open')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('open');
                const bars = navToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }


    // ==========================================
    // 4. SKILLS TAB FILTERING
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const skillCards = document.querySelectorAll('.skill-category-card');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Toggle active class on buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });


    // ==========================================
    // 5. SCROLL REVEAL ANIMATIONS
    // ==========================================
    const revealElements = document.querySelectorAll('[data-reveal]');
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Trigger once
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        revealElements.forEach(el => el.classList.add('revealed'));
    }


    // ==========================================
    // 6. INTERACTIVE COMMAND LINE TERMINAL
    // ==========================================
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');

    if (terminalInput && terminalBody) {
        // Set focus to input when terminal wrapper is clicked
        const terminalWrapper = document.querySelector('.terminal-wrapper');
        terminalWrapper.addEventListener('click', () => {
            terminalInput.focus();
        });

        // Command history
        let commandHistory = [];
        let historyIndex = -1;

        // Command Registry
        const commands = {
            help: () => {
                return `Available system commands:
  <span class="term-highlight">help</span>        - Display all active shell commands
  <span class="term-highlight">skills</span>      - Query technical skills database
  <span class="term-highlight">experience</span>  - View chronological systems experience
  <span class="term-highlight">education</span>   - View academic qualifications
  <span class="term-highlight">certify</span>     - Display professional certifications
  <span class="term-highlight">contact</span>     - View infrastructure connectivity links
  <span class="term-highlight">sysinfo</span>     - Fetch mock virtualization systems stats
  <span class="term-highlight">clear</span>       - Flush terminal console buffer`;
            },
            skills: () => {
                return `[QUERY RESULTS: TECHNICAL SKILLS DATABASE]
-----------------------------------------------------------
- Virtualization  :: VMware vSphere/ESXi, Proxmox VE
- Systems & OS    :: Windows Server, Ubuntu/Linux
- Cloud Platforms :: M365 Admin Center, Azure AD, Exchange
- Networking      :: Network Admin, VLANs, TCP/IP, PBX/VoIP
- Cyber Security  :: Antivirus/EDR Management, Hardening
- Data Continuity :: Backup & DR Planning, Data Integrity
- ITSM Framework  :: Helpdesk L1/L2, Jira Service Desk`;
            },
            experience: () => {
                return `[CHRONOLOGICAL EXPERIENCE REPORT]
-----------------------------------------------------------
1. Oct 2024 - Present :: IT Support Executive @ Wemsol (Keenu)
   * Managing VMware & Proxmox hypervisors, M365 Admin.
2. Jun 2023 - Aug 2024 :: IT Officer @ Strugbits
   * Downtime reduced by 20% via network monitoring.
3. Dec 2022 - Jun 2023 :: IT Support Assistant @ Icon Global
   * Upgraded workplace infra & workstation migrations.
4. Feb 2021 - May 2022 :: IT Assistant @ Jamil's Restaurant
   * POS systems optimization & PM planning.`;
            },
            education: () => {
                return `[ACADEMIC STATUS REPORT]
-----------------------------------------------------------
* B.S. Software Engineering Technology (In Progress)
  - Ziauddin University (Exp: Sep 2027)
* Diploma of Associate Engineering (DAE) - Computer IT
  - Aligarh Institute of Technology (2023)
* Matriculation (Science)
  - Saint Mary Cambridge School (2020)`;
            },
            certify: () => {
                return `[ACTIVE PROFESSIONAL CREDENTIALS]
-----------------------------------------------------------
* Microsoft 365 Certified: Fundamentals (MS-900)
* CompTIA A+ (Core Hardware & OS Troubleshooting)
* ITIL Foundation (IT Service Management Framework)`;
            },
            contact: () => {
                return `[ESTABLISHING CONNECTIVITY LINKS...]
-----------------------------------------------------------
- Email    :: jahanzai06@gmail.com
- Mobile   :: +92 339 4090120
- Location :: Karachi, Pakistan
- LinkedIn :: linkedin.com/in/muhammad-jahanzaib-28909b185`;
            },
            sysinfo: () => {
                const cores = Math.floor(Math.random() * 8) + 16;
                const ram = Math.floor(Math.random() * 32) + 64;
                const activeVMs = Math.floor(Math.random() * 12) + 18;
                return `[FETCHING HOST INFRASTRUCTURE STATS...]
-----------------------------------------------------------
- Hypervisor Host  :: Proxmox VE 8.1 / ESXi 8.0.2
- CPU Allocation   :: ${cores} Cores Assigned
- RAM Allocation   :: ${ram} GB ECC Registered DDR4
- Active Guests    :: ${activeVMs} Virtual Machines
- Firewall Status  :: OPNsense Active (0 packets dropped)
- Disk Array Health :: ZFS RAIDZ2 [ONLINE]`;
            },
            clear: () => {
                const outputDiv = terminalBody.querySelector('.terminal-output');
                outputDiv.innerHTML = '';
                return '';
            }
        };

        // Handle terminal inputs
        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const fullInput = terminalInput.value.trim();
                const cmd = fullInput.toLowerCase();
                
                if (fullInput) {
                    commandHistory.push(fullInput);
                    historyIndex = commandHistory.length;
                }

                // Create input feedback line
                const outputDiv = terminalBody.querySelector('.terminal-output');
                const cmdLine = document.createElement('p');
                cmdLine.className = 'terminal-line';
                cmdLine.innerHTML = `<span class="terminal-prompt">guest@jahanzaib-infra:~$</span> <span class="term-command">${fullInput}</span>`;
                outputDiv.appendChild(cmdLine);

                // Command Executor
                if (cmd) {
                    if (cmd === 'clear') {
                        commands.clear();
                    } else if (commands[cmd]) {
                        const response = commands[cmd]();
                        const respLine = document.createElement('p');
                        respLine.className = 'terminal-line welcome-msg';
                        respLine.innerHTML = response.replace(/\n/g, '<br>');
                        outputDiv.appendChild(respLine);
                    } else if (cmd === 'sudo rm -rf /') {
                        // Easter egg countdown
                        const respLine = document.createElement('p');
                        respLine.className = 'terminal-line';
                        respLine.style.color = '#ef4444';
                        respLine.innerHTML = 'WARNING: INITIATING DELETION PROTOCOL IN 3 SECONDS...<br>Access Denied: guest user does not possess root configuration privileges.';
                        outputDiv.appendChild(respLine);
                    } else {
                        const errLine = document.createElement('p');
                        errLine.className = 'terminal-line';
                        errLine.style.color = '#f59e0b';
                        errLine.innerHTML = `bash: command not found: ${fullInput}. Type 'help' to review directory listings.`;
                        outputDiv.appendChild(errLine);
                    }
                }

                // Reset field & scroll to bottom
                terminalInput.value = '';
                terminalBody.scrollTop = terminalBody.scrollHeight;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    terminalInput.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    terminalInput.value = commandHistory[historyIndex];
                } else {
                    historyIndex = commandHistory.length;
                    terminalInput.value = '';
                }
            }
        });
    }


    // ==========================================
    // 7. CONTACT FORM SIMULATION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSubmitBtn = document.getElementById('form-submit-btn');
    const formStatus = document.getElementById('form-status');

    if (contactForm && formSubmitBtn && formStatus) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const message = document.getElementById('form-message').value;

            // Update UI status to sending
            const btnText = formSubmitBtn.querySelector('.btn-text');
            const spinner = formSubmitBtn.querySelector('.loading-spinner');

            btnText.style.display = 'none';
            spinner.style.display = 'inline-block';
            formSubmitBtn.disabled = true;

            formStatus.className = 'form-status-msg';
            formStatus.textContent = '';

            // Simulate form submission API delay
            setTimeout(() => {
                btnText.style.display = 'inline-block';
                spinner.style.display = 'none';
                formSubmitBtn.disabled = false;

                formStatus.classList.add('success');
                formStatus.textContent = `Transmission successful! Thank you, ${name}. I will contact you shortly.`;

                // Reset fields
                contactForm.reset();
            }, 1800);
        });
    }

});
