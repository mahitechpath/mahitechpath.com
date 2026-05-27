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
    });
  }
});