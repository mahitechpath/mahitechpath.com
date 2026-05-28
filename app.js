document.addEventListener('DOMContentLoaded', () => {
  // --- Theme Management ---
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  };

  const updateThemeIcon = (theme) => {
    const btn = document.querySelector('.btn-theme-toggle');
    if (!btn) return;
    if (theme === 'dark') {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"></circle>
          <path d="M12 2v2"></path>
          <path d="M12 20v2"></path>
          <path d="m4.93 4.93 1.41 1.41"></path>
          <path d="m17.66 17.66 1.41 1.41"></path>
          <path d="M2 12h2"></path>
          <path d="M20 12h2"></path>
          <path d="m6.34 17.66-1.41 1.41"></path>
          <path d="m19.07 4.93-1.41 1.41"></path>
        </svg>
      `;
    } else {
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        </svg>
      `;
    }
  };

  // Attach theme toggle handler
  const themeBtn = document.querySelector('.btn-theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }
  initTheme();

  // --- AI Settings & Generation Logic ---
  const injectSettingsButton = () => {
    const navControls = document.querySelector('.nav-controls');
    if (navControls && !document.querySelector('.btn-settings-toggle')) {
      const btn = document.createElement('button');
      btn.className = 'btn-settings-toggle';
      btn.setAttribute('aria-label', 'AI Settings');
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      `;
      const themeBtn = navControls.querySelector('.btn-theme-toggle');
      if (themeBtn) {
        navControls.insertBefore(btn, themeBtn);
      } else {
        navControls.appendChild(btn);
      }
      btn.addEventListener('click', openSettingsModal);
    }
  };

  const openSettingsModal = () => {
    const overlay = document.getElementById('settings-modal-overlay');
    if (overlay) {
      document.getElementById('anthropic-key').value = localStorage.getItem('anthropic-api-key') || '';
      document.getElementById('firebase-config').value = localStorage.getItem('firebase-config') || '';
      overlay.classList.add('open');
    }
  };

  const closeSettingsModal = () => {
    const overlay = document.getElementById('settings-modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
    }
  };

  const saveSettings = () => {
    const key = document.getElementById('anthropic-key').value.trim();
    const config = document.getElementById('firebase-config').value.trim();

    localStorage.setItem('anthropic-api-key', key);
    localStorage.setItem('firebase-config', config);

    closeSettingsModal();
    alert('Settings saved successfully!');
  };

  const injectSettingsModal = () => {
    if (document.getElementById('settings-modal-overlay')) return;
    
    const overlay = document.createElement('div');
    overlay.id = 'settings-modal-overlay';
    overlay.className = 'settings-modal-overlay';
    overlay.innerHTML = `
      <div class="settings-modal">
        <div class="settings-modal-header">
          <h2 class="settings-modal-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: var(--accent);"><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            AI Settings
          </h2>
          <button class="settings-modal-close" id="settings-close">&times;</button>
        </div>
        <div class="settings-modal-body">
          <div class="form-group">
            <label for="anthropic-key">Anthropic API Key</label>
            <input type="password" id="anthropic-key" placeholder="sk-ant-...">
            <p class="help-text">Your API Key is saved securely in your browser's LocalStorage and never sent to any external server other than Anthropic.</p>
          </div>
          <div class="form-group">
            <label for="firebase-config">Firebase Web Config (Optional)</label>
            <textarea id="firebase-config" rows="6" placeholder='{&#10;  "apiKey": "...",&#10;  "authDomain": "...",&#10;  "projectId": "...",&#10;  "storageBucket": "...",&#10;  "messagingSenderId": "...",&#10;  "appId": "..."&#10;}'></textarea>
            <p class="help-text">Optional. Paste your Firebase project configuration JSON to synchronize generated roadmaps across devices. Falls back to local storage if empty.</p>
          </div>
        </div>
        <div class="settings-modal-footer">
          <button class="hero-btn" style="border-radius: 8px; padding: 0.6rem 1.2rem; font-family: var(--font-sans); text-transform: none; letter-spacing: 0;" id="settings-cancel">Cancel</button>
          <button class="hero-btn" style="border-radius: 8px; padding: 0.6rem 1.2rem; background-color: var(--text-primary); color: var(--bg-primary) !important; font-family: var(--font-sans); text-transform: none; letter-spacing: 0;" id="settings-save">Save Settings</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    document.getElementById('settings-close').addEventListener('click', closeSettingsModal);
    document.getElementById('settings-cancel').addEventListener('click', closeSettingsModal);
    document.getElementById('settings-save').addEventListener('click', saveSettings);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSettingsModal();
    });
  };

  const showGenLoader = (query) => {
    const loader = document.createElement('div');
    loader.id = 'gen-loader';
    loader.className = 'gen-loader-overlay';
    loader.innerHTML = `
      <div class="gen-loader-box">
        <div class="spinner"></div>
        <h2>Generating Career Roadmap</h2>
        <p>Building a personalized, premium study guide for "<strong>${query}</strong>" using Claude Sonnet...</p>
        <ul class="gen-steps-list">
          <li class="gen-step-item active" id="step-1">Prompting Claude AI model...</li>
          <li class="gen-step-item pending" id="step-2">Structuring phase-wise syllabus...</li>
          <li class="gen-step-item pending" id="step-3">Designing capstone projects...</li>
          <li class="gen-step-item pending" id="step-4">Compiling placement tips...</li>
          <li class="gen-step-item pending" id="step-5">Saving to database and rendering...</li>
        </ul>
      </div>
    `;
    document.body.appendChild(loader);
  };

  const updateGenStep = (stepNum, status) => {
    const step = document.getElementById(`step-${stepNum}`);
    if (!step) return;
    if (status === 'active') {
      step.className = 'gen-step-item active';
    } else if (status === 'done') {
      step.className = 'gen-step-item done';
    } else if (status === 'pending') {
      step.className = 'gen-step-item pending';
    }
  };

  const generateRoadmapWithAI = async (query) => {
    const apiKey = localStorage.getItem('anthropic-api-key');
    if (!apiKey) {
      alert('Please configure your Anthropic API Key in Settings to generate a custom roadmap with AI.');
      openSettingsModal();
      return;
    }

    showGenLoader(query);

    try {
      updateGenStep(1, 'active');
      const systemPrompt = `You are a professional curriculum designer and career advisor.
Generate a comprehensive, premium, phase-based, week-by-week student career roadmap for the topic: "${query}".
The output must be a single, strictly valid JSON object matching the following structure:
{
  "id": "slugified-lowercase-id",
  "title": "Clean Title",
  "description": "Premium phase-based study guide description.",
  "difficulty": "Medium or Hard",
  "duration": "16 Weeks",
  "role": "Target Professional Role",
  "prerequisites": "Prerequisites list",
  "keywords": "space-separated keywords",
  "phases": [
    {
      "num": "1",
      "title": "Phase 1 Title",
      "desc": "Description of Phase 1",
      "weeks": [
        {
          "title": "Week 1: Week Title",
          "topics": [
            "Topic 1 description and tools",
            "Topic 2 description and tools"
          ]
        }
      ]
    }
  ],
  "capstones": [
    {
      "title": "Capstone Project 1",
      "desc": "Detailed project definition",
      "tech": ["Tech 1", "Tech 2"]
    }
  ],
  "resume_keywords": [
    "Keyword 1",
    "Keyword 2"
  ],
  "interview_focus": [
    "Focus 1",
    "Focus 2"
  ]
}
Return ONLY the raw JSON object. Do not wrap it in markdown block quotes (e.g. \`\`\`json ... \`\`\`), do not output any surrounding text. Make sure it is valid JSON with double quoted strings, no trailing commas, and escaped newlines in strings.`;

      const proxyUrl = "https://api.allorigins.win/raw?url=";
      const targetUrl = "https://api.anthropic.com/v1/messages";
      const fullUrl = proxyUrl + encodeURIComponent(targetUrl);

      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [
            {
              "role": "user",
              "content": systemPrompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API returned status ${response.status}`);
      }

      updateGenStep(1, 'done');
      updateGenStep(2, 'active');

      const result = await response.json();
      let text = result.content[0].text.trim();
      
      if (text.startsWith("```")) {
        text = text.replace(/^```json\s*/, "").replace(/^```\s*/, "").replace(/\s*```$/, "");
      }

      updateGenStep(2, 'done');
      updateGenStep(3, 'active');

      const roadmapData = JSON.parse(text);
      roadmapData.id = (roadmapData.id || query.toLowerCase().replace(/[^a-z0-9]+/g, '-')).trim();

      updateGenStep(3, 'done');
      updateGenStep(4, 'active');
      
      await new Promise(r => setTimeout(r, 800));

      updateGenStep(4, 'done');
      updateGenStep(5, 'active');

      const firebaseConfigStr = localStorage.getItem('firebase-config');
      if (firebaseConfigStr) {
        try {
          const config = JSON.parse(firebaseConfigStr);
          if (config && config.apiKey) {
            const firebaseApp = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
            const firebaseFirestore = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
            
            const app = firebaseApp.initializeApp(config);
            const db = firebaseFirestore.getFirestore(app);
            const docRef = firebaseFirestore.doc(db, 'roadmaps', roadmapData.id);
            await firebaseFirestore.setDoc(docRef, roadmapData);
            console.log("Saved to Firestore successfully.");
          }
        } catch (dbErr) {
          console.error("Failed to write to Firestore, storing locally:", dbErr);
        }
      }

      localStorage.setItem(`custom-roadmap-${roadmapData.id}`, JSON.stringify(roadmapData));

      updateGenStep(5, 'done');
      await new Promise(r => setTimeout(r, 500));

      const isInRoadmapsSubdir = window.location.pathname.includes('/roadmaps/');
      const redirectUrl = isInRoadmapsSubdir ? `viewer.html?id=${roadmapData.id}` : `roadmaps/viewer.html?id=${roadmapData.id}`;
      window.location.href = redirectUrl;

    } catch (err) {
      console.error(err);
      alert('Failed to generate roadmap: ' + err.message);
      const loader = document.getElementById('gen-loader');
      if (loader) loader.remove();
    }
  };

  injectSettingsButton();
  injectSettingsModal();

  // --- Mobile Navigation Menu Drawer ---
  const mobileToggleBtn = document.querySelector('.mobile-nav-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const overlay = document.getElementById('mobile-overlay');
  const drawerCloseBtn = document.getElementById('drawer-close');

  const openMobileNav = () => {
    if (mobileDrawer && overlay) {
      overlay.style.display = 'block';
      setTimeout(() => {
        overlay.style.opacity = '1';
        mobileDrawer.classList.add('open');
      }, 10);
    }
  };

  const closeMobileNav = () => {
    if (mobileDrawer && overlay) {
      mobileDrawer.classList.remove('open');
      overlay.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
      }, 300);
    }
  };

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', openMobileNav);
  }
  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeMobileNav);
  }
  if (overlay) {
    overlay.addEventListener('click', closeMobileNav);
  }

  // --- Checklist & Progress Tracking ---
  const roadmapEl = document.querySelector('[data-roadmap-id]');
  if (roadmapEl) {
    const roadmapId = roadmapEl.getAttribute('data-roadmap-id');
    const checkboxes = document.querySelectorAll('.topic-checkbox');
    const totalCountEl = document.getElementById('total-topics');
    const checkedCountEl = document.getElementById('checked-topics');
    const progressPercentEls = document.querySelectorAll('.progress-percentage');
    const barFills = document.querySelectorAll('.progress-bar-fill');
    const progressRing = document.querySelector('.progress-ring-circle');
    const resetBtn = document.getElementById('reset-progress');

    // Calculate ring properties if circular progress widget is present
    let ringDashArray = 0;
    if (progressRing) {
      const radius = progressRing.r.baseVal.value;
      ringDashArray = 2 * Math.PI * radius;
      progressRing.style.strokeDasharray = `${ringDashArray} ${ringDashArray}`;
    }

    const loadState = () => {
      const savedState = JSON.parse(localStorage.getItem(`roadmap-${roadmapId}`)) || {};
      checkboxes.forEach(cb => {
        if (savedState[cb.id]) {
          cb.checked = true;
        } else {
          cb.checked = false;
        }
      });
      updateProgress();
    };

    const saveState = () => {
      const state = {};
      checkboxes.forEach(cb => {
        if (cb.checked) {
          state[cb.id] = true;
        }
      });
      localStorage.setItem(`roadmap-${roadmapId}`, JSON.stringify(state));
    };

    const updateProgress = () => {
      const total = checkboxes.length;
      const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
      const percent = total > 0 ? Math.round((checked / total) * 100) : 0;

      const totalCountEls = [document.getElementById('total-topics'), document.getElementById('total-topics-mobile')];
      const checkedCountEls = [document.getElementById('checked-topics'), document.getElementById('checked-topics-mobile')];
      
      totalCountEls.forEach(el => { if (el) el.textContent = total; });
      checkedCountEls.forEach(el => { if (el) el.textContent = checked; });

      progressPercentEls.forEach(el => {
        el.textContent = `${percent}%`;
      });

      barFills.forEach(bar => {
        bar.style.width = `${percent}%`;
      });

      if (progressRing && ringDashArray > 0) {
        const offset = ringDashArray - (percent / 100) * ringDashArray;
        progressRing.style.strokeDashoffset = offset;
      }
    };

    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        saveState();
        updateProgress();
      });
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset your progress for this roadmap?')) {
          localStorage.removeItem(`roadmap-${roadmapId}`);
          loadState();
        }
      });
    }

    loadState();
  }

  // --- Scroll Spy Navigation for Desktop Sidebar ---
  const sections = document.querySelectorAll('.phase-section, .placement-section');
  const tocItems = document.querySelectorAll('.toc-item');

  if (sections.length > 0 && tocItems.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Highlights as section enters upper-middle screen
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          tocItems.forEach(item => {
            const link = item.querySelector('a');
            if (link && link.getAttribute('href') === `#${id}`) {
              item.classList.add('active');
            } else {
              item.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });
  }

  // --- Global Homepage Search Filter Logic ---
  const searchInput = document.getElementById('roadmap-search');
  if (searchInput) {
    // 60 Careers Search Database
    const CAREERS_INDEX = [
  {
    "id": "sw-ai-ml",
    "title": "AI / Machine Learning Engineer",
    "emoji": "\ud83e\udde0",
    "desc": "Develop and deploy machine learning models, neural networks, and AI pipelines to solve complex real-world problems.",
    "domain": "software",
    "keywords": "AI Machine Learning Neural Networks Deep Learning PyTorch TensorFlow MLOps Regression Classification",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "sw-cybersecurity",
    "title": "Cybersecurity Engineer",
    "emoji": "\ud83d\udd12",
    "desc": "Protect software systems, networks, and data by designing secure architectures, analyzing threats, and performing pen testing.",
    "domain": "software",
    "keywords": "Cybersecurity Penetration Testing Network Security Cryptography Wireshark Metasploit OWASP Splunk Incident Response",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "sw-cloud-architect",
    "title": "Cloud Architect",
    "emoji": "\u2601\ufe0f",
    "desc": "Design and manage scalable, reliable, and secure cloud infrastructure on public clouds (AWS, GCP, Azure) using modern architectural patterns.",
    "domain": "software",
    "keywords": "Cloud Computing AWS Terraform Kubernetes Docker IAM DevOps CI/CD Microservices High Availability Serverless",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "sw-data-scientist",
    "title": "Data Scientist / Data Engineer",
    "emoji": "\ud83d\udcca",
    "desc": "Analyze large scale data, build statistics pipelines, configure ETL workflows, and prepare enterprise datasets for ML models.",
    "domain": "software",
    "keywords": "Data Engineering Data Science SQL Pandas Spark ETL Airflow Hadoop Data Warehousing Big Data Data Pipelines",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "sw-ai-security",
    "title": "AI Security Specialist",
    "emoji": "\ud83d\udee1\ufe0f",
    "desc": "Secure AI/ML systems against adversarial attacks, data poisoning, prompt injection, and intellectual property theft.",
    "domain": "software",
    "keywords": "AI Security Adversarial Attacks Prompt Injection Data Poisoning Model Evasion Security Auditing LLM Vulnerabilities",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "sw-devops",
    "title": "DevOps / Site Reliability Engineer",
    "emoji": "\u2699\ufe0f",
    "desc": "Automate build pipelines, configure container deployments, write Infrastructure as Code, and manage system observability.",
    "domain": "software",
    "keywords": "DevOps SRE CI/CD Jenkins GitHub Actions Docker Kubernetes Linux Terraform Ansible Prometheus Grafana Ansible",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "sw-quantum",
    "title": "Quantum Computing Specialist",
    "emoji": "\u269b\ufe0f",
    "desc": "Develop quantum algorithms, program quantum circuits using Qiskit, and simulate quantum architectures on modern computing grids.",
    "domain": "software",
    "keywords": "Quantum Computing Qiskit Quantum Circuits Qubits Quantum Algorithms Deutsch-Jozsa Grover Shor Simulation Quantum Physics",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "sw-blockchain",
    "title": "Blockchain Developer",
    "emoji": "\ud83d\udd17",
    "desc": "Design smart contracts, build decentralized applications (DApps), and audit blockchain networks using Solidity and Web3 libraries.",
    "domain": "software",
    "keywords": "Blockchain Ethereum Solidity Smart Contracts Web3.js Hardhat DApp ERC-20 ERC-721 Truffle IPFS",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "sw-datacenter",
    "title": "Data Center Technician",
    "emoji": "\ud83c\udfd7\ufe0f",
    "desc": "Manage physical servers, networking gear, cooling infrastructures, power distribution, and virtualization grids inside enterprise data centers.",
    "domain": "software",
    "keywords": "Data Center Server Hardware Linux OS KVM Hypervisors Cabling UPS PDU Fiber Optics cooling HVAC monitoring",
    "duration": "16 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "sw-enterprise-architect",
    "title": "Digital Transformation / Enterprise Architect",
    "emoji": "\ud83c\udf10",
    "desc": "Align business goals with modern IT strategies. Design microservices, secure legacy migrations, and drive cloud transformation journeys.",
    "domain": "software",
    "keywords": "Enterprise Architecture TOGAF Microservices Domain Driven Design Cloud Migration Legacy Systems Security Governance SOA",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "ece-vlsi",
    "title": "VLSI Design Engineer",
    "emoji": "\ud83e\udde9",
    "desc": "Design and verify integrated circuits, CMOS logic cells, and execute physical design (P&R) pipelines for microchips.",
    "domain": "ece",
    "keywords": "VLSI CMOS Verilog FPGA ASIC Synthesis Layout Floorplanning DRC LVS STA Setup Hold timing",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "ece-embedded",
    "title": "Embedded Systems Engineer",
    "emoji": "\ud83d\udcdf",
    "desc": "Develop hardware-firmware codes, configure RTOS kernel tasks, write driver modules, and design ARM/ESP32 firmware.",
    "domain": "ece",
    "keywords": "Embedded C ARM Cortex RTOS FreeRTOS I2C SPI UART Firmware DMA JTAG Logic Analyzer",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "ece-ai-hardware",
    "title": "AI Hardware Engineer",
    "emoji": "\ud83e\udde0",
    "desc": "Design neuromorphic circuits, design tensor processing units (TPUs), and optimize hardware accelerators for deep neural network execution.",
    "domain": "ece",
    "keywords": "AI Hardware Tensor Processing Unit TPU Accelerator Systolic Array Neuromorphic Quantization MAC Memory Compiler",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "ece-iot",
    "title": "IoT Engineer",
    "emoji": "\ud83d\udce1",
    "desc": "Design smart connected devices, deploy sensor networks, write MQTT cloud integrations, and configure low-power wireless modules.",
    "domain": "ece",
    "keywords": "IoT Sensors ESP32 RaspberryPi MQTT HTTP BLE Zigbee LoRa gateway cloud dashboard integration",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "ece-robotics",
    "title": "Robotics & Automation Engineer",
    "emoji": "\ud83e\udd16",
    "desc": "Design robotic kinematics, implement feedback control loops, write ROS nodes, and integrate vision sensors for autonomous navigation.",
    "domain": "ece",
    "keywords": "Robotics Kinematics ROS C++ PID Control LiDAR OpenCV Path Planning SLAM Odometry Simulation",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "ece-communication",
    "title": "5G / 6G Communication Engineer",
    "emoji": "\ud83d\udcf6",
    "desc": "Design baseband modems, compile wireless channel models, configure OFDM grids, and design beamforming RF systems.",
    "domain": "ece",
    "keywords": "5G 6G Wireless Communication OFDM MIMO Beamforming baseband processing channel modeling SDR RF Link Budget",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "ece-rf",
    "title": "RF Engineer",
    "emoji": "\ud83d\udce1",
    "desc": "Design RF amplifiers, analyze transmission line impedances, design impedance matches on Smith Charts, and perform RF audits.",
    "domain": "ece",
    "keywords": "RF engineering transmission lines impedance matching Smith Chart LNA Mixer filter S-parameters spectrum analyzer",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "ece-ev-electronics",
    "title": "EV Electronics Engineer",
    "emoji": "\u26a1",
    "desc": "Design Battery Management Systems (BMS), motor control circuits, inverter boards, and CAN bus vehicle telemetry networks.",
    "domain": "ece",
    "keywords": "Electric Vehicle BMS CAN bus Motor Control Inverters Microcontrollers Altium automotive design thermal management",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "ece-dsp",
    "title": "DSP Engineer",
    "emoji": "\ud83d\udcca",
    "desc": "Study continuous and discrete signals, Z-transforms, convolution, FFT algorithms, and FIR/IIR filter designs.",
    "domain": "ece",
    "keywords": "DSP digital signal processing convolution FFT DFT FIR IIR filter design z-transform MATLAB sampling multirate adaptive filtering",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "ece-verification",
    "title": "Semiconductor Verification Engineer",
    "emoji": "\ud83d\udd2c",
    "desc": "Write SystemVerilog verification code, build UVM verification environments, configure functional coverage, and run assertions.",
    "domain": "ece",
    "keywords": "SystemVerilog UVM verification ASIC simulation OOP OOP interfaces functional coverage assertions debugging",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "eee-power-systems",
    "title": "Power Systems Engineer",
    "emoji": "\ud83d\udd78\ufe0f",
    "desc": "Master transmission lines, load flows (Newton-Raphson), symmetrical/unsymmetrical faults, and protection relay operations.",
    "domain": "eee",
    "keywords": "power systems EEE transmission lines load flow faults stability relay circuit breakers smart grid HVDC",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "eee-power-electronics",
    "title": "Power Electronics Engineer",
    "emoji": "\ud83c\udf9b\ufe0f",
    "desc": "Learn about power devices (SCR, IGBT), converters, buck/boost choppers, inverters, and PWM switching systems.",
    "domain": "eee",
    "keywords": "power electronics EEE SCR IGBT buck boost converter choppers inverters cycloconverters PWM MATLAB",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "eee-ev",
    "title": "Electric Vehicle (EV) Engineer",
    "emoji": "\ud83d\ude97",
    "desc": "Design electric powertrains, optimize high-voltage traction batteries, configure regenerative braking, and program industrial motor drives.",
    "domain": "eee",
    "keywords": "EV Powertrain Traction Battery PMSM Motor Drives Regenerative Braking BMS High Voltage Safety EEE",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "eee-renewable",
    "title": "Renewable Energy Engineer",
    "emoji": "\u2600\ufe0f",
    "desc": "Design solar PV systems, wind turbine generators, microgrid storage arrays, and configure grid-tied power inverters.",
    "domain": "eee",
    "keywords": "Renewable Energy Solar PV Wind Turbines Microgrids Grid Integration MPPT Battery Storage EEE",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "eee-plc-scada",
    "title": "PLC & SCADA Automation Engineer",
    "emoji": "\ud83e\udd16",
    "desc": "Program industrial PLCs in Ladder logic, design SCADA dashboards, configure fieldbuses, and design plant automation loops.",
    "domain": "eee",
    "keywords": "PLC SCADA Ladder Logic HMI industrial automation Modbus Profibus sensor interfacing motor starter",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "eee-smart-grid",
    "title": "Smart Grid Engineer",
    "emoji": "\u26a1",
    "desc": "Design intelligent power distribution systems, configure smart meters, integrate grid storage, and manage SCADA network security.",
    "domain": "eee",
    "keywords": "Smart Grid Power Systems Smart Meters SCADA Microgrids Cybersecurity Distributed Generation EEE",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "eee-semi-manufacturing",
    "title": "Semiconductor Manufacturing Engineer",
    "emoji": "\ud83c\udfed",
    "desc": "Manage cleanroom systems, photolithography pipelines, silicon wafer oxidation, plasma etching, and chip packaging facilities.",
    "domain": "eee",
    "keywords": "Semiconductor Manufacturing Wafer Fabrication Photolithography Etching Cleanroom Metrology CMP EEE Packaging",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "eee-electrical-design",
    "title": "Electrical Design Engineer",
    "emoji": "\ud83d\udcd0",
    "desc": "Design electrical switchgear layouts, draw control panel schematics in AutoCAD Electrical, size cables, and configure building electrical codes.",
    "domain": "eee",
    "keywords": "Electrical Design AutoCAD Electrical schematics cable sizing switchgear panel design codes standards grounding EEE",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "eee-control-systems",
    "title": "Control Systems Engineer",
    "emoji": "\ud83d\udcc8",
    "desc": "Master transfer functions, block reduction, time response, and stability analysis (Root Locus, Bode, Nyquist plots).",
    "domain": "eee",
    "keywords": "control systems EEE PID transfer function root locus bode plot stability nyquist state space compensators",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "eee-embedded-iot",
    "title": "Embedded & Industrial IoT Engineer",
    "emoji": "\ud83d\udd0c",
    "desc": "Design smart sensor networks, connect PLC fieldbuses to cloud gateways, write Modbus/MQTT brokers, and compile low-power firmware.",
    "domain": "eee",
    "keywords": "IIoT industrial IoT Modbus MQTT gateway Node-RED PLC connection smart sensor dashboard EEE",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "mech-design",
    "title": "Design Engineer",
    "emoji": "\ud83d\udcd0",
    "desc": "Master engineering mechanics, strength of materials, thermodynamics, fluid dynamics, manufacturing processes, and computer-aided design (CAD/CAE).",
    "domain": "mechanical",
    "keywords": "solidworks cad mechanical engineering structural stress mechanics material fluid thermodynamics combustion machining ansys design",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "mech-automotive",
    "title": "Automotive Engineer",
    "emoji": "\ud83d\ude97",
    "desc": "Study internal combustion engines, chassis, transmission gearboxes, brakes, suspension systems, and EV battery drives.",
    "domain": "mechanical",
    "keywords": "automobile engineering EEE mechanical engines chassis transmission gearbox differential steering brakes suspension EV battery",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "mech-robotics",
    "title": "Robotics Engineer",
    "emoji": "\ud83e\udd16",
    "desc": "Design physical robot manipulators, model link joints, calculate kinematics, and configure hydraulic/pneumatic actuators.",
    "domain": "mechanical",
    "keywords": "robotics mechanical kinematics inverse kinematics servos actuators linkages arm design dynamics",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "mech-manufacturing",
    "title": "Manufacturing Engineer",
    "emoji": "\ud83c\udfed",
    "desc": "Study casting riser design, welding processes, metal cutting Merchant circles, Taylor tool life, and CNC machining.",
    "domain": "mechanical",
    "keywords": "manufacturing science EEE mechanical casting gating system welding heat affected zone metal cutting merchant circle tool life forming",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "mech-aerospace",
    "title": "Aerospace Engineer",
    "emoji": "\u2708\ufe0f",
    "desc": "Design aerodynamics wing structures, analyze jet engine cycles, model rocket propulsion systems, and compute flight mechanics trajectories.",
    "domain": "mechanical",
    "keywords": "aerospace engineering aerodynamics compressible flow gas turbines rocket propulsion structural analysis orbit mechanics",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "mech-mechatronics",
    "title": "Mechatronics Engineer",
    "emoji": "\u2699\ufe0f",
    "desc": "Integrate mechanical actuators with microcontrollers, write feedback control algorithms, configure analog sensors, and program PLC systems.",
    "domain": "mechanical",
    "keywords": "mechatronics actuators sensors Arduino C control loops signal conditioning encoders",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "mech-thermal",
    "title": "Thermal Engineer",
    "emoji": "\ud83d\udd25",
    "desc": "Master first/second laws of thermodynamics, Rankine steam cycles, conduction/convection heat transfer, and gas turbines.",
    "domain": "mechanical",
    "keywords": "thermal engineering thermodynamics Rankine cycle steam power Brayton heat transfer conduction convection radiation refrigeration psychrometrics EEE mechanical",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "mech-industrial-automation",
    "title": "Industrial Automation Engineer",
    "emoji": "\ud83e\udd16",
    "desc": "Program manufacturing assembly lines, configure industrial robots (SCARA, Delta), compile PLC ladder logic, and monitor sensors.",
    "domain": "mechanical",
    "keywords": "industrial automation PLC SCADA pneumatic sensors SCARA delta robotics motor starter panels",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "mech-quality-control",
    "title": "Quality Control Engineer",
    "emoji": "\ud83d\udd0d",
    "desc": "Establish quality management frameworks, compile SPC control charts, audit dimensional tolerances, and run Non-Destructive Testing (NDT) audits.",
    "domain": "mechanical",
    "keywords": "quality control metrology NDT non destructive testing SPC statistical process control ISO 9001 GD&T tolerances",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "mech-renewable",
    "title": "Renewable Energy Engineer",
    "emoji": "\u2600\ufe0f",
    "desc": "Design wind turbine aerodynamic blades, model solar thermal power collectors, configure geothermal loops, and run CFD fluid simulations.",
    "domain": "mechanical",
    "keywords": "renewable energy solar thermal wind aerodynamics geothermal biomass CFD simulation mechanical",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-ias",
    "title": "IAS (Indian Administrative Service)",
    "emoji": "\ud83c\udfdb\ufe0f",
    "desc": "Top premier civil service of India, responsible for administering districts, policy implementation, and administrative leadership.",
    "domain": "gov-central",
    "keywords": "UPSC IAS Civil Services GS Prelims Mains CSAT Public Policy Constitution Governance History Indian Economy",
    "duration": "72 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-ips",
    "title": "IPS (Indian Police Service)",
    "emoji": "\ud83d\udee1\ufe0f",
    "desc": "Responsible for state-level security, maintaining law and order, intelligence operations, and policing administration across districts.",
    "domain": "gov-central",
    "keywords": "UPSC IPS Civil Services Law Enforcement Criminal Justice Internal Security Forensics Policing Security Laws",
    "duration": "60 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-ifs",
    "title": "IFS (Indian Foreign Service)",
    "emoji": "\ud83c\udf10",
    "desc": "Indian diplomat represent the nation globally, managing embassies, trade relations, international organizations, and foreign policy.",
    "domain": "gov-central",
    "keywords": "UPSC IFS Foreign Service Diplomacy Foreign Policy International Relations Global Trade Bilateral Treaties UN",
    "duration": "56 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-irs",
    "title": "IRS (Indian Revenue Service)",
    "emoji": "\ud83d\udcb8",
    "desc": "Responsible for managing direct and indirect tax collections, policy formulation, tax audits, and combatting tax evasion.",
    "domain": "gov-central",
    "keywords": "UPSC IRS Revenue Service Taxation Direct Tax GST Income Tax Auditing Money Laundering Customs Finance",
    "duration": "52 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-ssc-cgl",
    "title": "SSC CGL Officer",
    "emoji": "\ud83d\udd0d",
    "desc": "Recruited as Inspectors in Income Tax, Central Excise, Preventive Officers, or ASOs in Central Secretariat and Ministries.",
    "domain": "gov-central",
    "keywords": "SSC CGL Staff Selection Commission Quant Aptitude English Grammar Reasoning General Awareness Audit Files",
    "duration": "36 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-rbi-grade-b",
    "title": "RBI Grade B Officer",
    "emoji": "\ud83c\udfe6",
    "desc": "Manage financial stability, monetary policy operations, government debt, currency circulation, and bank regulatory frameworks.",
    "domain": "gov-central",
    "keywords": "RBI Grade B Reserve Bank Monetary Policy Economic Social Issues Financial Management Banking Regulation Finance",
    "duration": "32 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-banking-po",
    "title": "IBPS PO / SBI PO",
    "emoji": "\ud83d\udcb3",
    "desc": "Manage bank branch operations, credit appraisals, loan processing, customer accounts, and retail banking services.",
    "domain": "gov-central",
    "keywords": "IBPS PO SBI PO Banking Exam Quantitative Aptitude Reasoning English General Awareness Bank Accounts Loans",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-assistant-commandant",
    "title": "Assistant Commandant (CAPF)",
    "emoji": "\ud83d\udc6e",
    "desc": "Officer rank in Central Armed Police Forces (BSF, CRPF, CISF, ITBP, SSB), leading border guarding and internal security units.",
    "domain": "gov-central",
    "keywords": "UPSC CAPF Assistant Commandant BSF CRPF CISF Internal Security Physical Test General Studies Essay Pr\u00e9cis",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-scientist-tech",
    "title": "Scientist/Engineer at ISRO / DRDO",
    "emoji": "\ud83d\ude80",
    "desc": "Design satellite payloads, build launch vehicles, develop missile guidance systems, and conduct advanced defense/space research.",
    "domain": "gov-central",
    "keywords": "ISRO DRDO Scientist Engineering Math Space Systems Aerospace Rockets Missiles Aerospace Defense",
    "duration": "40 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-gate-psu",
    "title": "PSU Officer through GATE",
    "emoji": "\ud83c\udfed",
    "desc": "Recruited as Graduate Engineer Trainees (GET) at Maharatna/Navratna PSUs (NTPC, ONGC, BHEL, IOCL) using GATE scores.",
    "domain": "gov-central",
    "keywords": "GATE Exam PSU Recruitment BHEL ONGC NTPC IOCL Engineering Mathematics Aptitude Technical Syllabus",
    "duration": "32 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-deputy-collector",
    "title": "Deputy Collector (State Civil Services)",
    "emoji": "\ud83c\udfdb\ufe0f",
    "desc": "Recruited through State PSC (Group 1), responsible for sub-divisional administration, land revenue, and local policy implementations.",
    "domain": "gov-state",
    "keywords": "State PSC Civil Services Group 1 Deputy Collector Land Revenue Local Government District Administration Regional Schemes",
    "duration": "48 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-dsp",
    "title": "DSP (Deputy Superintendent of Police)",
    "emoji": "\ud83d\udea8",
    "desc": "State police officer recruited through State PSC, managing sub-divisional police stations, local law enforcement, and crime prevention.",
    "domain": "gov-state",
    "keywords": "State PSC Police Officer DSP Law Enforcement Crime Prevention Local Riots State Police Police Ethics",
    "duration": "32 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-cto",
    "title": "Commercial Tax Officer (CTO)",
    "emoji": "\ud83d\udcc8",
    "desc": "Administer state commercial taxes, monitor SGST compliance, perform business tax audits, and investigate regional tax evasions.",
    "domain": "gov-state",
    "keywords": "State PSC CTO Commercial Tax SGST Compliance Business Audits Tax Evasion Revenue GST Portal",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-aso",
    "title": "Assistant Section Officer (ASO)",
    "emoji": "\ud83d\udcc2",
    "desc": "Process files, manage correspondence, draft government notes, and assist in secretariat policy administrations.",
    "domain": "gov-state",
    "keywords": "State PSC ASO Assistant Section Officer File Processing Secretariat Office Manual Drafting Note Sheets",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-pdo",
    "title": "Panchayat Development Officer (PDO)",
    "emoji": "\ud83c\udf3e",
    "desc": "Manage village panchayat development plans, monitor rural schemes (MGNREGA), allocate local grants, and audit rural infrastructure projects.",
    "domain": "gov-state",
    "keywords": "State PSC PDO Panchayat Development Rural Schemes MGNREGA Village Infrastructure Local Grants Audit",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-municipal-commissioner",
    "title": "Municipal Commissioner",
    "emoji": "\ud83c\udfe2",
    "desc": "Recruited through State PSC, managing urban local bodies (municipalities), urban planning, civic infrastructure, and waste management.",
    "domain": "gov-state",
    "keywords": "State PSC Municipal Commissioner Urban Planning Civic Infrastructure Waste Management Municipal Finance City Administration",
    "duration": "32 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-excise-officer",
    "title": "State Excise Officer",
    "emoji": "\ud83c\udf7e",
    "desc": "Monitor alcoholic beverages manufacturing/distribution, check illicit liquor networks, enforce excise acts, and collect state revenues.",
    "domain": "gov-state",
    "keywords": "State PSC Excise Officer Excise Duty Illicit Liquor Enforce Excise Act Revenue Licenses Checkpoints",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-assistant-engineer",
    "title": "Assistant Engineer (State Departments)",
    "emoji": "\ud83c\udfd7\ufe0f",
    "desc": "Officer in PWD, Water Resources, or Irrigation departments, managing infrastructure design, estimations, contracting, and site execution.",
    "domain": "gov-state",
    "keywords": "State PSC Assistant Engineer PWD Water Resources Infrastructure Design Estimating Contracting Execution",
    "duration": "28 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-lecturer-prof",
    "title": "Government Lecturer/Professor",
    "emoji": "\ud83c\udf93",
    "desc": "Recruited through State PSC or NET, teaching undergraduate/postgraduate courses at government colleges, conducting research, and designing curriculums.",
    "domain": "gov-state",
    "keywords": "State PSC Lecturer Professor UGC NET SET Pedagogy Academic Research Curriculum Design College Education",
    "duration": "24 Weeks",
    "phases": "4 PHASES"
  },
  {
    "id": "gov-state-psu",
    "title": "State PSU Officer",
    "emoji": "\ud83c\udfe2",
    "desc": "Officer in state corporations (electricity boards, transit utilities, state warehouses), managing operations, financial books, and regional projects.",
    "domain": "gov-state",
    "keywords": "State PSC PSU Officer Transit Utilities Electricity Boards Operations Finance Corporate Governance Audits",
    "duration": "20 Weeks",
    "phases": "4 PHASES"
  }
];

    const categoriesContainer = document.getElementById('homepage-categories');
    const searchResultsSection = document.getElementById('search-results-section');
    const searchResultsGrid = document.getElementById('search-results-grid');
    const searchResultsTitle = document.getElementById('search-results-title');

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (query.length === 0) {
        categoriesContainer.style.display = 'grid';
        searchResultsSection.style.display = 'none';
        searchResultsGrid.innerHTML = '';
        
        let fallback = document.getElementById('search-fallback');
        if (fallback) {
          fallback.style.display = 'none';
        }
        return;
      }

      // Hide category cards and show search results
      categoriesContainer.style.display = 'none';
      searchResultsSection.style.display = 'block';

      // Filter careers
      const matches = CAREERS_INDEX.filter(c => {
        return c.title.toLowerCase().includes(query) || 
               c.desc.toLowerCase().includes(query) || 
               c.keywords.toLowerCase().includes(query) ||
               c.domain.toLowerCase().includes(query);
      });

      searchResultsTitle.textContent = `Search Results (${matches.length})`;

      // Render cards
      searchResultsGrid.innerHTML = '';
      matches.forEach(c => {
        let domainColor = "#3182ce";
        let domainLabel = "Software";
        if (c.domain === "ece") {
          domainColor = "#9f7aea";
          domainLabel = "ECE";
        } else if (c.domain === "eee") {
          domainColor = "#dd6b20";
          domainLabel = "EEE";
        } else if (c.domain === "mechanical") {
          domainColor = "#4a5568";
          domainLabel = "Mechanical";
        } else if (c.domain === "gov-central") {
          domainColor = "#319795";
          domainLabel = "Gov-Central";
        } else if (c.domain === "gov-state") {
          domainColor = "#e53e3e";
          domainLabel = "Gov-State";
        }

        const cardHtml = `
          <a href="roadmaps/${c.id}.html" class="card solid-card" style="--domain-color: ${domainColor};">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; margin-bottom: 1rem;">
              <div class="card-icon" style="font-size: 1.5rem; width: auto; height: auto; border: none; background: none; padding: 0;">
                ${c.emoji}
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <span class="badge" style="background-color: var(--accent-light); color: var(--accent); border: 1px solid var(--accent-light-border); font-size: 0.7rem; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block;">${domainLabel}</span>
                <span class="badge" style="background-color: var(--accent-light); color: var(--accent); border: 1px solid var(--accent-light-border); font-size: 0.7rem; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em; display: inline-block;">Top 10</span>
              </div>
            </div>
            <h2 class="card-title">${c.title}</h2>
            <p class="card-desc">${c.desc}</p>
            <div class="card-meta">
              <span class="card-duration">${c.duration} • ${c.phases}</span>
              <span class="card-arrow">&rarr;</span>
            </div>
          </a>
        `;
        searchResultsGrid.insertAdjacentHTML('beforeend', cardHtml);
      });

      // Show/hide search fallback card
      let fallback = document.getElementById('search-fallback');
      if (matches.length === 0) {
        if (!fallback) {
          fallback = document.createElement('div');
          fallback.id = 'search-fallback';
          fallback.className = 'search-fallback-card';
          fallback.innerHTML = `
            <h3>No roadmaps found for "<span id="search-query-highlight"></span>"</h3>
            <p>You can generate a custom, premium week-by-week roadmap for this topic using Claude AI!</p>
            <button id="btn-generate-ai" class="hero-btn">Generate with AI ✨</button>
          `;
          const mainContainer = document.querySelector('main.container');
          if (mainContainer) {
            mainContainer.appendChild(fallback);
          }
          
          document.getElementById('btn-generate-ai').addEventListener('click', () => {
            const currentQuery = document.getElementById('roadmap-search').value.trim();
            if (currentQuery) {
              generateRoadmapWithAI(currentQuery);
            }
          });
        }
        document.getElementById('search-query-highlight').textContent = query;
        fallback.style.display = 'flex';
      } else {
        if (fallback) {
          fallback.style.display = 'none';
        }
      }
    });
  }

  // --- Topic Resources Dropdown Panels ---
  document.querySelectorAll('.topic-text').forEach(textEl => {
    textEl.style.cursor = 'pointer';
    textEl.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const topicItem = textEl.closest('.topic-item');
      if (!topicItem) return;
      const panel = topicItem.querySelector('.topic-resources-panel');
      if (!panel) return;
      
      const isOpen = topicItem.classList.contains('panel-open');
      if (isOpen) {
        panel.style.maxHeight = panel.scrollHeight + 'px';
        panel.offsetHeight; // Force reflow
        panel.style.maxHeight = '0';
        topicItem.classList.remove('panel-open');
      } else {
        topicItem.classList.add('panel-open');
        panel.style.maxHeight = panel.scrollHeight + 'px';
        
        panel.addEventListener('transitionend', function handler(te) {
          if (te.propertyName === 'max-height' && topicItem.classList.contains('panel-open')) {
            panel.style.maxHeight = 'none';
            panel.removeEventListener('transitionend', handler);
          }
        });
      }
    });
  });
});
