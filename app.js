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
          max_tokens": 4000,
          messages: [
            {
              "role": "user",
              "content": systemPrompt
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(\`API returned status \${response.status}\`);
      }

      updateGenStep(1, 'done');
      updateGenStep(2, 'active');

      const result = await response.json();
      let text = result.content[0].text.trim();
      
      if (text.startsWith("```")) {
        text = text.replace(/^```json\\s*/, "").replace(/^```\\s*/, "").replace(/\\s*```$/, "");
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

      localStorage.setItem(\`custom-roadmap-\${roadmapData.id}\`, JSON.stringify(roadmapData));

      updateGenStep(5, 'done');
      await new Promise(r => setTimeout(r, 500));

      const isInRoadmapsSubdir = window.location.pathname.includes('/roadmaps/');
      const redirectUrl = isInRoadmapsSubdir ? \`viewer.html?id=\${roadmapData.id}\` : \`roadmaps/viewer.html?id=\${roadmapData.id}\`;
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

  // --- Homepage Card Filter Search ---
  const searchInput = document.getElementById('roadmap-search');
  if (searchInput) {
    const subcats = document.querySelectorAll('.subcategory-wrapper');
    const sections = document.querySelectorAll('.roadmap-category-section');
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      let totalVisibleCount = 0;
      
      subcats.forEach(subcat => {
        const cards = subcat.querySelectorAll('.card');
        let visibleCount = 0;
        cards.forEach(card => {
          const title = card.querySelector('.card-title').textContent.toLowerCase();
          const desc = card.querySelector('.card-desc').textContent.toLowerCase();
          const duration = card.querySelector('.card-duration').textContent.toLowerCase();
          const keywords = card.getAttribute('data-keywords') || '';
          
          if (
            title.includes(query) || 
            desc.includes(query) || 
            duration.includes(query) ||
            keywords.toLowerCase().includes(query)
          ) {
            card.style.display = 'flex';
            visibleCount++;
            totalVisibleCount++;
          } else {
            card.style.display = 'none';
          }
        });
        
        // Hide subcategory wrapper if no cards match
        if (visibleCount > 0) {
          subcat.style.display = 'block';
        } else {
          subcat.style.display = 'none';
        }
      });

      // Hide parent category sections if no subcategories are visible
      sections.forEach(sec => {
        const visibleSubcats = Array.from(sec.querySelectorAll('.subcategory-wrapper'))
          .filter(sub => sub.style.display !== 'none');
        if (visibleSubcats.length > 0) {
          sec.style.display = 'block';
        } else {
          sec.style.display = 'none';
        }
      });

      // Show/hide search fallback card
      let fallback = document.getElementById('search-fallback');
      if (totalVisibleCount === 0 && query.length > 0) {
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
});