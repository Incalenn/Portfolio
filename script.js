let scene, camera, renderer, material, mesh;
let clock = new THREE.Clock();
let backgroundCanvas = null;

function initBackground() {
    backgroundCanvas = document.getElementById('background-canvas');
    
    if (!backgroundCanvas) {
        setTimeout(initBackground, 100);
        return;
    }

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    if (backgroundCanvas.parentElement) {
        const parentRect = backgroundCanvas.parentElement.getBoundingClientRect();
        renderer.setSize(parentRect.width, parentRect.height);
    } else {
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    backgroundCanvas.appendChild(renderer.domElement);
    
    const geometry = new THREE.PlaneGeometry(2, 2);
    
    material = new THREE.ShaderMaterial({
        uniforms: {
            time: { value: 0 },
            resolution: { value: new THREE.Vector2(backgroundCanvas.offsetWidth, backgroundCanvas.offsetHeight) },
            color1: { value: new THREE.Vector3() },
            color2: { value: new THREE.Vector3() }
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader
    });
    
    updateBackgroundColors();

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    
    window.addEventListener('resize', onWindowResize);
    animate();
}

function onWindowResize() {
    if (renderer && backgroundCanvas && backgroundCanvas.parentElement) {
        const parentRect = backgroundCanvas.parentElement.getBoundingClientRect();
        renderer.setSize(parentRect.width, parentRect.height);
        material.uniforms.resolution.value.set(backgroundCanvas.offsetWidth, backgroundCanvas.offsetHeight);
    }
}

function animate() {
    requestAnimationFrame(animate);
    
    if (material && material.uniforms) {
        material.uniforms.time.value = clock.getElapsedTime();
    }
    
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

function updateBackgroundColors() {
    if (material && material.uniforms) {
        if (document.body.classList.contains('light-mode')) {
            material.uniforms.color1.value.set(0.95, 0.95, 0.95);
            material.uniforms.color2.value.set(0.85, 0.85, 0.85);
        } else {
            material.uniforms.color1.value.set(0.15, 0.15, 0.15);
            material.uniforms.color2.value.set(0.05, 0.05, 0.05);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const contentContainer = document.getElementById('content-container');

    const sectionContent = {
        home: `
            <div class='home-center'>
                <img src='logo.png' alt='Logo' class='motif-logo-home' />
            </div>
            <div class='profile-info-bottom'>
                <p>current: In-person & remote<br>
                Paris, France<br>
                I design<br>
                and code<br>
                clean user experiences.<br>
                With a solution<br>
                focused<br>
                approach,<br>
                I am passionate<br>
                about creating<br>
                digital products<br>
                through experiment and<br>
                new tech crafts.</p>
            </div>
        `,
        projects: `
            <div class='content-right'>
                <h2>Projects</h2>
                <div class="project-list">
                    <div class="project-item">
                        <a href="https://incalenn.github.io/alyap/" target="_blank" class="project-title">ALYAP (Experimental) ↗</a>
                        <p class="project-subtitle">May.2025 / Dev / Design: Van Alenn PHAM</p>
                    </div>
                    <div class="project-item">
                        <a href="https://github.com/Incalenn/N8N-AI-Agent" target="_blank" class="project-title">yura (N8N AI Agent) ↗</a>
                        <p class="project-subtitle">April.2025 / No Code Dev / Architecture: Van Alenn PHAM</p>
                    </div>
                    <div class="project-item">
                        <a href="https://github.com/Incalenn/AI-Agent" target="_blank" class="project-title">QRIGIN (AI Agent) ↗</a>
                        <p class="project-subtitle">March.2025 / Dev & AI</p>
                    </div>
                </div>
            </div>
        `,
        info: `
            <div class='content-right'>
                <div class="info-block social-links">
                    <p><a href="https://www.engagement-jeunes.com/fr/recommandations/34568/van-alenn-pham.html">Société Générale - Recommendation ↗</a></p>
                </div>
                <div class="info-block recognitions">
                    <ul>
                        <li><span>Lead Fullstack Developer & Project Manager</span><span>Société Générale - 2024</span></li>
                        <li><span>Fullstack Developer</span><span>https://restaurant-internet.com/ - 2023</span></li>
                        <li><span>Web 3 Community Manager</span><span>White Hearts 3.0 - 2023</span></li>
                        <li><span>Freelance Digital Artist</span><span>APH, ARTIFICIALMANA - 2023</span></li>
                    </ul>
                </div>
            </div>
        `,
        contact: `
            <div class='content-right'>
                <h2>Contact</h2>
                <p>For any inquiries or collaborations, please reach out via email or connect with me on LinkedIn.</p>
                <div class="contact-info">
                    <p>Email: van.alenn.pham@gmail.com</p>
                    <p><a href="https://www.linkedin.com/in/vanalennpham/" target="_blank"><img src="linkedin.png" alt="LinkedIn" class="linkedin-icon"></a></p>
                </div>
            </div>
        `,
        faq: `
            <div class='content-right'>
                <h2>FAQ</h2>
                <div class="faq-list">
                    <div class="faq-item">
                        <h3>How do you stay up to date with new technologies?</h3>
                        <p>I actively follow the latest in AI and software development through hands-on experimentation, open documentation, and curated communities (e.g. GitHub, Hugging Face, Hacker News). I also design personal projects to test emerging tools — most recently with LangChain, GPT-4o, n8n, and Whisper — which helps me apply new tech in real-world use cases quickly and deeply.</p>
                    </div>
                    <div class="faq-item">
                        <h3>What's your typical tech stack for web apps?</h3>
                        <p>I often work with a Python + Flask backend, PostgreSQL, MySQL, MongoDB for data, and React on the frontend. I integrate automation with tools like n8n and APIs (OAuth2, REST), containerize with Docker, and manage source control with Git/GitHub Actions. This stack balances speed, flexibility, and scalability — ideal for both MVPs and robust systems.</p>
                    </div>
                    <div class="faq-item">
                        <h3>How does your interest in visual arts influence your work in tech?</h3>
                        <p>My background in digital art sharpens my eye for user experience, visual coherence, and interface clarity. I approach software not just as code, but as a medium of communication — making sure interactions feel intuitive, purposeful, and polished. This perspective is especially useful in frontend development, dashboard design, and AI interfaces. I will soon publish a blog project that documents all my illustrations - just like an online museum.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Can you share more about your AI agent projects?</h3>
                        <p>I've built two AI agents: one in Python (using LangChain + GPT-4o) for autonomous information retrieval, and another in n8n that processes voice messages via Telegram, transcribes with Whisper, and replies using GPT. Both were designed with modularity, security (dotenv, token handling), and real-world use in mind — aiming to automate workflows and decision-making for creative professionals or teams.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Are you open to collaborations on creative tech ideas?</h3>
                        <p>Absolutely. I'm always excited to collaborate on projects that merge AI, automation, design, or interactive systems. Whether it's a prototype, an open-source tool, or a concept in progress, I bring both technical rigor and a creative mindset to the table.</p>
                    </div>
                    <div class="faq-item">
                        <h3>Where can I follow your latest work or updates?</h3>
                        <p>You can reach out via my professional email or connect with me on LinkedIn. I'm also working on publishing more on GitHub and potentially through this portfolio blog — feel free to get in touch if you'd like early access to any of my upcoming tools or ideas.</p>
                    </div>
                    <div class="faq-item">
                        <h3>What kind of roles or missions are you looking for next?</h3>
                        <p>I'm looking for roles that sit at the intersection of AI, backend architecture, and product development — ideally within teams building scalable, user-centered solutions. Whether it's contributing to an R&D initiative, automating workflows, or leading the technical side of a SaaS product, I seek missions where I can deliver real impact, grow alongside talented people, and push the boundaries of what tech can do.</p>
                    </div>
                </div>
            </div>
        `
    };

    if(contentContainer) {
        contentContainer.innerHTML = sectionContent.home;
    }

    initBackground();

    document.querySelectorAll('#sidebar-nav li').forEach(function(item) {
        item.addEventListener('click', function() {
            document.querySelectorAll('#sidebar-nav li').forEach(function(li) {
                li.classList.remove('active');
            });
            this.classList.add('active');
            var section = this.getAttribute('data-section');
            
            if(contentContainer) {
                contentContainer.innerHTML = sectionContent[section] || '';
                
                if (section === 'faq') {
                    contentContainer.style.overflowY = 'auto';
                } else {
                    contentContainer.style.overflowY = 'hidden';
                }
            }

            onWindowResize();
        });
    });

    var firstLi = document.querySelector('#sidebar-nav li[data-section="home"]');
    if (firstLi) {
        firstLi.classList.add('active');
        if (contentContainer) {
            contentContainer.style.overflowY = 'hidden';
        }
    }

    const toggleSwitch = document.getElementById('darkLightToggle');
    if(toggleSwitch) {
        toggleSwitch.addEventListener('click', function() {
            document.body.classList.toggle('light-mode');
            updateBackgroundColors();
        });
    }

    const loadingScreen = document.getElementById('loading-screen');
    let pageLoaded = false;
    let minimumTimePassed = false;

    function hideLoadingScreen() {
        if (pageLoaded && minimumTimePassed) {
            loadingScreen.classList.add('hidden');
        }
    }

    window.addEventListener('load', function() {
        pageLoaded = true;
        hideLoadingScreen();
    });

    setTimeout(function() {
        minimumTimePassed = true;
        hideLoadingScreen();
    }, 2000);

    if(loadingScreen) {
        loadingScreen.addEventListener('transitionend', function() {
            if(loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
        });
    }

    const contactLink = document.getElementById('contact-link');
    if (contactLink && contentContainer) {
        contactLink.addEventListener('click', function(e) {
            e.preventDefault();
            contentContainer.innerHTML = sectionContent.contact || '';

            document.querySelectorAll('#sidebar-nav li').forEach(function(li) {
                li.classList.remove('active');
            });
            const contactSidebarItem = document.querySelector('#sidebar-nav li[data-section="contact"]');
            if (contactSidebarItem) {
                contactSidebarItem.classList.add('active');
            }
            onWindowResize();
        });
    }
}); 