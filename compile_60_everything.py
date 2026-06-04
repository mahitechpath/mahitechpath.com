# -*- coding: utf-8 -*-
import os
import sys
import re
import json

workspace_dir = r"C:\Users\shiva\.gemini\antigravity\scratch\student-career-roadmaps"

# Add scratch to sys.path to import data
sys.path.append(r"C:\Users\shiva\.gemini\antigravity\scratch")

try:
    from generate_40_roadmaps import careers_data as engineering_careers
    from generate_60_roadmaps import government_careers
    careers_data = engineering_careers + government_careers
    print(f"[OK] Successfully imported all {len(careers_data)} careers.")
except Exception as e:
    print("[ERROR] Failed to import careers datasets:", e)
    sys.exit(1)

# Portals config (6 Portals)
portals_config = {
    "software": {
        "filename": "btech-software.html",
        "title": "Software Engineering Roadmaps - CareerPath India",
        "description": "Top 10 software engineering roadmaps including AI/ML, Cloud, DevOps, Blockchain, and Cybersecurity.",
        "hero_title": "💻 Software Engineering Roadmaps",
        "hero_description": "Choose your core software specialization. Track your learning progress week by week.",
        "color": "#3182ce"
    },
    "ece": {
        "filename": "btech-ece.html",
        "title": "Electronics & Communication Engineering Roadmaps - CareerPath India",
        "description": "Top 10 ECE career paths including VLSI design, embedded systems, robotics, and communication.",
        "hero_title": "📡 Electronics & Communication Roadmaps",
        "hero_description": "Explore core electronics, VLSI layout design, automation, IoT, and embedded software systems.",
        "color": "#9f7aea"
    },
    "eee": {
        "filename": "btech-eee.html",
        "title": "Electrical & Electronics Engineering Roadmaps - CareerPath India",
        "description": "Top 10 EEE career paths including power electronics, electric vehicles, and renewable grids.",
        "hero_title": "⚡ Electrical & Electronics Roadmaps",
        "hero_description": "Master power grids, smart energy, electric vehicles, industrial PLC & SCADA, and machinery.",
        "color": "#dd6b20"
    },
    "mechanical": {
        "filename": "btech-mechanical.html",
        "title": "Mechanical Engineering Roadmaps - CareerPath India",
        "description": "Top 10 mechanical engineering roadmaps including CAD/CAM, automotive design, robotics, and thermal.",
        "hero_title": "⚙️ Mechanical Engineering Roadmaps",
        "hero_description": "Explore structural mechanics, CAD design systems, mechatronics, and thermal energy pipelines.",
        "color": "#4a5568"
    },
    "gov-central": {
        "filename": "government-central.html",
        "title": "Central Government Exam Roadmaps - CareerPath India",
        "description": "Top 10 Central Government exam roadmaps including IAS, IPS, IFS, IRS, and SSC CGL.",
        "hero_title": "🏛️ Central Government Exam Roadmaps",
        "hero_description": "Explore phase-by-phase learning paths for premier national competitive examinations.",
        "color": "#319795"
    },
    "gov-state": {
        "filename": "government-state.html",
        "title": "State Government Exam Roadmaps - CareerPath India",
        "description": "Top 10 State Government exam roadmaps including Deputy Collector, DSP, CTO, and Panchayat Officer.",
        "hero_title": "🌲 State Government Exam Roadmaps",
        "hero_description": "Navigate through civil services, administrative officers, and department examinations at state levels.",
        "color": "#e53e3e"
    }
}

# Template for portal pages
portal_template = """<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{title}</title>
  <meta name="description" content="{description}">
  <link rel="icon" type="image/png" href="images/logo.png">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <!-- Top Navigation Bar -->
  <header>
    <div class="container navbar">
      <a href="index.html" class="nav-brand"><img src="images/logo.png" class="nav-logo" alt="Logo">Career<span>Path</span> India</a>
      
      <nav>
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link">Home</a></li>
          <li><a href="leaderboard.html" class="nav-link">Leaderboard</a></li>
          <li class="nav-dropdown">
            <span class="nav-link dropdown-trigger active">
              Roadmaps
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </span>
            <ul class="dropdown-menu">
              <li class="dropdown-header">B.Tech Portals</li>
              <li><a href="btech.html">🎓 B.Tech Hub</a></li>
              <li><a href="btech-software.html">💻 Software Engineering</a></li>
              <li><a href="btech-hardware.html">🛠️ Hardware Engineering Hub</a></li>
              <li><a href="btech-ece.html">📡 Electronics &amp; Communication (ECE)</a></li>
              <li><a href="btech-eee.html">⚡ Electrical &amp; Electronics (EEE)</a></li>
              <li><a href="btech-mechanical.html">⚙️ Mechanical Engineering</a></li>
              <li class="dropdown-header">Government Exams</li>
              <li><a href="government.html">🏛️ Government Hub</a></li>
              <li><a href="government-central.html">🏛️ Central Government Exams</a></li>
              <li><a href="government-state.html">🌲 State Government Exams</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="nav-controls">
        <div id="user-profile-container" class="profile-container">
          <button id="btn-login" class="btn-login-google">
            <svg class="google-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.133 1 1.18 5.925 1.18 12s4.953 11 11.06 11c6.373 0 10.602-4.475 10.602-10.795 0-.727-.08-1.284-.175-1.92H12.24z"/>
            </svg>
            <span>Sign In</span>
          </button>
          
          <div id="user-avatar-menu" class="user-avatar-wrapper" style="display: none;">
            <img id="user-avatar-img" class="user-avatar" src="" alt="User Profile">
            <div class="profile-dropdown">
              <div class="profile-dropdown-header">
                <div id="user-display-name" class="user-name">Guest</div>
                <div id="user-display-email" class="user-email">guest@example.com</div>
              </div>
              <div class="profile-dropdown-badges" id="profile-badges-container">
                <!-- Badges dynamically rendered -->
              </div>
              <div class="profile-dropdown-divider"></div>
              <a href="leaderboard.html" class="profile-dropdown-item leaderboard-link-item">🏆 Leaderboard</a>
              <button id="btn-logout" class="profile-dropdown-item btn-logout-item">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        <button class="btn-theme-toggle" aria-label="Toggle Theme"></button>
        <button class="mobile-nav-toggle" aria-label="Toggle Navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Overlay & Drawer -->
  <div class="mobile-menu-overlay" id="mobile-overlay"></div>
  <div class="mobile-menu-drawer" id="mobile-drawer">
    <div class="mobile-menu-header">
      <a href="index.html" class="nav-brand"><img src="images/logo.png" class="nav-logo" alt="Logo">Career<span>Path</span> India</a>
      <button class="mobile-menu-close" id="drawer-close" aria-label="Close menu">&times;</button>
    </div>
    <ul class="mobile-menu-links">
      <li><a href="index.html" class="mobile-menu-link">Home</a></li>
      <li><a href="leaderboard.html" class="mobile-menu-link">🏆 Leaderboard</a></li>
      <li class="mobile-menu-section-title">B.Tech Portals</li>
      <li><a href="btech.html" class="mobile-menu-link">🎓 B.Tech Hub</a></li>
      <li><a href="btech-software.html" class="mobile-menu-link">💻 Software Engineering</a></li>
      <li><a href="btech-hardware.html" class="mobile-menu-link">🛠️ Hardware Engineering Hub</a></li>
      <li><a href="btech-ece.html" class="mobile-menu-link">📡 Electronics &amp; Communication</a></li>
      <li><a href="btech-eee.html" class="mobile-menu-link">⚡ Electrical &amp; Electronics</a></li>
      <li><a href="btech-mechanical.html" class="mobile-menu-link">⚙️ Mechanical Engineering</a></li>
      <li class="mobile-menu-section-title">Government Exams</li>
      <li><a href="government.html" class="mobile-menu-link">🏛️ Government Hub</a></li>
      <li><a href="government-central.html" class="mobile-menu-link">🏛️ Central Government</a></li>
      <li><a href="government-state.html" class="mobile-menu-link">🌲 State Government</a></li>
    </ul>
  </div>

  <!-- Hero Section -->
  <section class="hero-wrap" style="padding: 3rem 0; margin-bottom: 2rem;">
    <div class="container hero" style="text-align: center; max-width: 800px; margin: 0 auto; padding: 0 1rem;">
      <h1 style="font-family: var(--font-sans); font-size: clamp(2rem, 5vw, 3rem); font-weight: 800; line-height: 1.2; letter-spacing: -0.02em; color: var(--text-primary); margin-bottom: 1rem;">
        {hero_title}
      </h1>
      <p style="font-size: 1rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto; line-height: 1.6;">
        {hero_description}
      </p>
    </div>
  </section>

  <main class="container">
    <div class="grid" style="margin-top: 2rem; margin-bottom: 5rem;">
      {cards_html}
    </div>
  </main>

  <!-- Footer -->
  <footer>
    <div class="container">
      <p class="footer-quote">
        &ldquo;The journey ends, but the grind never does.&rdquo;
      </p>
    </div>
  </footer>

  <script src="app.js"></script>
</body>
</html>
"""

# Generate the 6 portal pages
for domain, config in portals_config.items():
    domain_careers = [c for c in careers_data if c["domain"] == domain]
    cards_html_list = []
    
    for idx, c in enumerate(domain_careers):
        badge_label = "Top 10 Career"
        badge_style = "background-color: var(--accent-light); color: var(--accent); border: 1px solid var(--accent-light-border);"
        
        card_html = f"""      <!-- {c['title']} -->
      <a href="roadmaps/{c['id']}.html" class="card solid-card" style="--domain-color: {config['color']};">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; width: 100%; margin-bottom: 1rem;">
          <div class="card-icon" style="font-size: 1.5rem; width: auto; height: auto; border: none; background: none; padding: 0;">
            {c['emoji']}
          </div>
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <span class="badge" style="background-color: var(--border-color); color: var(--text-secondary); font-size: 0.7rem; font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 4px;">#{idx+1}</span>
            <span class="badge" style="{badge_style} font-size: 0.7rem; font-weight: 600; padding: 0.25rem 0.5rem; border-radius: 4px; text-transform: uppercase; letter-spacing: 0.05em;">{badge_label}</span>
          </div>
        </div>
        <h2 class="card-title">{c['title']}</h2>
        <p class="card-desc">{c['description']}</p>
        <div class="card-meta">
          <span class="card-duration">{c['duration']} • {len(c['phases'])} PHASES</span>
          <span class="card-arrow">&rarr;</span>
        </div>
      </a>"""
        cards_html_list.append(card_html)
        
    portal_html = portal_template.format(
        title=config["title"],
        description=config["description"],
        hero_title=config["hero_title"],
        hero_description=config["hero_description"],
        cards_html="\n\n".join(cards_html_list)
    )
    
    portal_filepath = os.path.join(workspace_dir, config["filename"])
    with open(portal_filepath, "w", encoding="utf-8") as f:
        f.write(portal_html)
    print(f"[OK] Compiled Portal: {config['filename']}")

# 1b. Compile intermediate hub pages (btech, btech-hardware, government)
    intermediate_configs = [
        {
            "filename": "btech.html",
            "title": "B.Tech Career Roadmaps - CareerPath India",
            "description": "Select between Software and Hardware engineering branches.",
            "hero_title": "🎓 B.Tech Engineering Hub",
            "hero_description": "Choose between software specializations and core hardware engineering branches.",
            "cards_html": """
          <!-- Software Engineering -->
          <a href="btech-software.html" class="card solid-card" style="--domain-color: #3182ce; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; text-decoration: none;">
            <div style="font-size: 3rem; margin-bottom: 1.5rem;">💻</div>
            <h2 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.75rem;">Software Engineering</h2>
            <p class="card-desc" style="margin-bottom: 1.5rem;">Detailed week-by-week guides for AI/ML, Cloud, DevOps, Blockchain, and Cybersecurity.</p>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--accent); display: inline-flex; align-items: center; gap: 0.25rem;">View Software Careers &rarr;</span>
          </a>

          <!-- Hardware Engineering -->
          <a href="btech-hardware.html" class="card solid-card" style="--domain-color: #9f7aea; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; text-decoration: none;">
            <div style="font-size: 3rem; margin-bottom: 1.5rem;">🛠️</div>
            <h2 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.75rem;">Hardware Engineering</h2>
            <p class="card-desc" style="margin-bottom: 1.5rem;">Syllabus and placement roadmaps for ECE, EEE, and Mechanical Engineering.</p>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--accent); display: inline-flex; align-items: center; gap: 0.25rem;">View Hardware Branches &rarr;</span>
          </a>
    """
        },
        {
            "filename": "btech-hardware.html",
            "title": "Hardware Engineering Hub - CareerPath India",
            "description": "Explore core hardware engineering branches: ECE, EEE, and Mechanical Engineering.",
            "hero_title": "🛠️ Hardware Engineering Hub",
            "hero_description": "Navigate through core engineering syllabus guides and industrial career tracks.",
            "cards_html": """
          <!-- ECE -->
          <a href="btech-ece.html" class="card solid-card" style="--domain-color: #9f7aea; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; text-decoration: none;">
            <div style="font-size: 3rem; margin-bottom: 1.5rem;">📡</div>
            <h2 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.75rem;">Electronics &amp; Communication</h2>
            <p class="card-desc" style="margin-bottom: 1.5rem;">VLSI design, embedded systems, robotics, IoT, and communication engineering.</p>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--accent); display: inline-flex; align-items: center; gap: 0.25rem;">Explore ECE Roadmaps &rarr;</span>
          </a>

          <!-- EEE -->
          <a href="btech-eee.html" class="card solid-card" style="--domain-color: #dd6b20; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; text-decoration: none;">
            <div style="font-size: 3rem; margin-bottom: 1.5rem;">⚡</div>
            <h2 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.75rem;">Electrical &amp; Electronics</h2>
            <p class="card-desc" style="margin-bottom: 1.5rem;">Electric vehicles, smart grids, solar energy, and automation systems.</p>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--accent); display: inline-flex; align-items: center; gap: 0.25rem;">Explore EEE Roadmaps &rarr;</span>
          </a>

          <!-- Mechanical -->
          <a href="btech-mechanical.html" class="card solid-card" style="--domain-color: #4a5568; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; text-decoration: none;">
            <div style="font-size: 3rem; margin-bottom: 1.5rem;">⚙️</div>
            <h2 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.75rem;">Mechanical Engineering</h2>
            <p class="card-desc" style="margin-bottom: 1.5rem;">CAD/CAM design, automotive systems, thermal energy, and robotics.</p>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--accent); display: inline-flex; align-items: center; gap: 0.25rem;">Explore Mechanical Roadmaps &rarr;</span>
          </a>
    """
        },
        {
            "filename": "government.html",
            "title": "Government Exams Hub - CareerPath India",
            "description": "Explore preparation roadmaps for Central and State government examinations.",
            "hero_title": "🏛️ Government Exams Hub",
            "hero_description": "Choose between Central civil services and State level departmental examinations.",
            "cards_html": """
          <!-- Central -->
          <a href="government-central.html" class="card solid-card" style="--domain-color: #319795; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; text-decoration: none;">
            <div style="font-size: 3rem; margin-bottom: 1.5rem;">🏛️</div>
            <h2 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.75rem;">Central Government</h2>
            <p class="card-desc" style="margin-bottom: 1.5rem;">National level civil services, banking, railways, space, and defense exams.</p>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--accent); display: inline-flex; align-items: center; gap: 0.25rem;">Explore Central Exams &rarr;</span>
          </a>

          <!-- State -->
          <a href="government-state.html" class="card solid-card" style="--domain-color: #e53e3e; padding: 2.5rem; display: flex; flex-direction: column; align-items: center; text-align: center; text-decoration: none;">
            <div style="font-size: 3rem; margin-bottom: 1.5rem;">🌲</div>
            <h2 class="card-title" style="font-size: 1.5rem; margin-bottom: 0.75rem;">State Government</h2>
            <p class="card-desc" style="margin-bottom: 1.5rem;">State civil services, sub-inspectors, engineering services, and local PSC exams.</p>
            <span style="font-size: 0.9rem; font-weight: 600; color: var(--accent); display: inline-flex; align-items: center; gap: 0.25rem;">Explore State Exams &rarr;</span>
          </a>
    """
        }
    ]

    for iconf in intermediate_configs:
        html = portal_template.format(
            title=iconf["title"],
            description=iconf["description"],
            hero_title=iconf["hero_title"],
            hero_description=iconf["hero_description"],
            cards_html=iconf["cards_html"]
        )
        filepath = os.path.join(workspace_dir, iconf["filename"])
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(html)
        print(f"[OK] Compiled Intermediate Hub: {iconf['filename']}")

# 2. Compile index.html
index_html = """<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CareerPath India - Student Tech Career Roadmap</title>
  <meta name="description" content="CareerPath India - Student Tech Career Roadmap. A premium, phase-based tech career roadmap and interactive curriculum tracker for students across Engineering and Government Exams.">
  <link rel="icon" type="image/png" href="images/logo.png">
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <!-- Top Navigation Bar -->
  <header>
    <div class="container navbar">
      <a href="index.html" class="nav-brand"><img src="images/logo.png" class="nav-logo" alt="Logo">Career<span>Path</span> India</a>
      
      <nav>
        <ul class="nav-links">
          <li><a href="index.html" class="nav-link active">Home</a></li>
          <li><a href="leaderboard.html" class="nav-link">Leaderboard</a></li>
          <li class="nav-dropdown">
            <span class="nav-link dropdown-trigger">
              Roadmaps
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </span>
            <ul class="dropdown-menu">
              <li class="dropdown-header">B.Tech Portals</li>
              <li><a href="btech.html">🎓 B.Tech Hub</a></li>
              <li><a href="btech-software.html">💻 Software Engineering</a></li>
              <li><a href="btech-hardware.html">🛠️ Hardware Engineering Hub</a></li>
              <li><a href="btech-ece.html">📡 Electronics &amp; Communication (ECE)</a></li>
              <li><a href="btech-eee.html">⚡ Electrical &amp; Electronics (EEE)</a></li>
              <li><a href="btech-mechanical.html">⚙️ Mechanical Engineering</a></li>
              <li class="dropdown-header">Government Exams</li>
              <li><a href="government.html">🏛️ Government Hub</a></li>
              <li><a href="government-central.html">🏛️ Central Government Exams</a></li>
              <li><a href="government-state.html">🌲 State Government Exams</a></li>
            </ul>
          </li>
        </ul>
      </nav>

      <div class="nav-controls">
        <div id="user-profile-container" class="profile-container">
          <button id="btn-login" class="btn-login-google">
            <svg class="google-icon" viewBox="0 0 24 24" width="16" height="16">
              <path fill="currentColor" d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.133 1 1.18 5.925 1.18 12s4.953 11 11.06 11c6.373 0 10.602-4.475 10.602-10.795 0-.727-.08-1.284-.175-1.92H12.24z"/>
            </svg>
            <span>Sign In</span>
          </button>
          
          <div id="user-avatar-menu" class="user-avatar-wrapper" style="display: none;">
            <img id="user-avatar-img" class="user-avatar" src="" alt="User Profile">
            <div class="profile-dropdown">
              <div class="profile-dropdown-header">
                <div id="user-display-name" class="user-name">Guest</div>
                <div id="user-display-email" class="user-email">guest@example.com</div>
              </div>
              <div class="profile-dropdown-badges" id="profile-badges-container">
                <!-- Badges dynamically rendered -->
              </div>
              <div class="profile-dropdown-divider"></div>
              <a href="leaderboard.html" class="profile-dropdown-item leaderboard-link-item">🏆 Leaderboard</a>
              <button id="btn-logout" class="profile-dropdown-item btn-logout-item">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        <button class="btn-theme-toggle" aria-label="Toggle Theme"></button>
        <button class="mobile-nav-toggle" aria-label="Toggle Navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Overlay & Drawer -->
  <div class="mobile-menu-overlay" id="mobile-overlay"></div>
  <div class="mobile-menu-drawer" id="mobile-drawer">
    <div class="mobile-menu-header">
      <a href="index.html" class="nav-brand"><img src="images/logo.png" class="nav-logo" alt="Logo">Career<span>Path</span> India</a>
      <button class="mobile-menu-close" id="drawer-close" aria-label="Close menu">&times;</button>
    </div>
    <ul class="mobile-menu-links">
      <li><a href="index.html" class="mobile-menu-link">Home</a></li>
      <li><a href="leaderboard.html" class="mobile-menu-link">🏆 Leaderboard</a></li>
      <li class="mobile-menu-section-title">B.Tech Portals</li>
      <li><a href="btech.html" class="mobile-menu-link">🎓 B.Tech Hub</a></li>
      <li><a href="btech-software.html" class="mobile-menu-link">💻 Software Engineering</a></li>
      <li><a href="btech-hardware.html" class="mobile-menu-link">🛠️ Hardware Engineering Hub</a></li>
      <li><a href="btech-ece.html" class="mobile-menu-link">📡 Electronics &amp; Communication</a></li>
      <li><a href="btech-eee.html" class="mobile-menu-link">⚡ Electrical &amp; Electronics</a></li>
      <li><a href="btech-mechanical.html" class="mobile-menu-link">⚙️ Mechanical Engineering</a></li>
      <li class="mobile-menu-section-title">Government Exams</li>
      <li><a href="government.html" class="mobile-menu-link">🏛️ Government Hub</a></li>
      <li><a href="government-central.html" class="mobile-menu-link">🏛️ Central Government</a></li>
      <li><a href="government-state.html" class="mobile-menu-link">🌲 State Government</a></li>
    </ul>
  </div>

  <!-- Hero Section -->
  <div id="hero-spline-root"></div>

  <main class="container">

    <!-- Search Section -->
    <div class="search-container">
      <p class="search-quote" style="text-align: center; color: var(--text-secondary); margin-bottom: 1.5rem; font-size: 1.15rem; font-family: var(--font-serif); font-style: italic;">
        "The roadmap you need — anything, anytime. Just search and get it. ✨"
      </p>
      <div class="search-wrapper">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input type="text" id="roadmap-search" placeholder="Search domains, libraries, or tools (e.g., React, Python, K8s, VLSI, IAS, SSC)..." aria-label="Search roadmaps">
      </div>
    </div>

    <!-- Category Navigation Cards (Portals) - 3 Premium Horizontal Cards -->
    <div class="categories-container" id="homepage-categories">
      <!-- Card 1: B.Tech Roadmaps -->
      <a href="btech.html" class="premium-feature-card btech-card">
        <div class="card-left-wrapper">
          <div class="premium-card-icon-illustration">🎓</div>
          <div class="premium-card-details">
            <div class="premium-card-header-row">
              <h2 class="premium-card-title">B.Tech Roadmaps</h2>
              <span class="premium-card-badge">40 Roadmaps</span>
            </div>
            <p class="premium-card-subtitle">Comprehensive week-by-week syllabus and placement guides for Software and Hardware (ECE, EEE, Mechanical) branches.</p>
            <div class="premium-card-sub-icons">
              <span class="sub-icon-chip">💻 Software</span>
              <span class="sub-icon-chip">📡 ECE</span>
              <span class="sub-icon-chip">⚡ EEE</span>
              <span class="sub-icon-chip">⚙️ Mechanical</span>
            </div>
          </div>
        </div>
        <div class="card-right-wrapper">
          <span class="premium-explore-btn">
            Explore B.Tech
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </div>
      </a>

      <!-- Card 2: Government Exams -->
      <a href="government.html" class="premium-feature-card gov-card">
        <div class="card-left-wrapper">
          <div class="premium-card-icon-illustration">🏛️</div>
          <div class="premium-card-details">
            <div class="premium-card-header-row">
              <h2 class="premium-card-title">Government Exams</h2>
              <span class="premium-card-badge">20 Roadmaps</span>
            </div>
            <p class="premium-card-subtitle">Structured preparation roadmaps, recommended books, exam patterns, and strategy guides for Central and State civil service exams.</p>
            <div class="premium-card-sub-icons">
              <span class="sub-icon-chip">🏛️ IAS / IPS</span>
              <span class="sub-icon-chip">🔍 SSC CGL</span>
              <span class="sub-icon-chip">🏦 Banking PO</span>
              <span class="sub-icon-chip">🌲 State PSC</span>
            </div>
          </div>
        </div>
        <div class="card-right-wrapper">
          <span class="premium-explore-btn">
            Explore Gov Exams
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </div>
      </a>

      <!-- Card 3: AI Generated Roadmaps -->
      <a href="#roadmap-search" class="premium-feature-card ai-card">
        <div class="card-left-wrapper">
          <div class="premium-card-icon-illustration ai-glow-illustration">✨</div>
          <div class="premium-card-details">
            <div class="premium-card-header-row">
              <h2 class="premium-card-title">AI Generated Roadmaps</h2>
              <span class="premium-card-badge" style="background: rgba(168, 85, 247, 0.15); border-color: rgba(168, 85, 247, 0.3); color: #c084fc;">Gemini AI</span>
            </div>
            <p class="premium-card-subtitle">Can't find your specialization? Type any career topic in the search bar below to generate a custom week-by-week tracker instantly.</p>
            <div class="premium-card-sub-icons">
              <span class="sub-icon-chip">🤖 Custom AI Engine</span>
              <span class="sub-icon-chip">☁️ Cloud Sync</span>
              <span class="sub-icon-chip">📈 Progress Tracker</span>
            </div>
          </div>
        </div>
        <div class="card-right-wrapper">
          <span class="premium-explore-btn" style="border-color: rgba(168, 85, 247, 0.3);">
            Generate Custom
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </span>
        </div>
      </a>
    </div>

    <!-- Global Search Results Section -->
    <div id="search-results-section" style="display: none; margin-top: 2rem; margin-bottom: 5rem; scroll-margin-top: 6rem;">
      <h2 class="category-section-title" id="search-results-title">Search Results</h2>
      <div id="search-results-grid" class="grid"></div>
    </div>

    <!-- What This Roadmap Doesn't Cover Section -->
    <section class="out-of-scope-section" style="margin: 4rem 0 6rem; scroll-margin-top: 8rem;">
      <h2 style="font-family: var(--font-serif); font-size: 1.85rem; font-weight: 600; margin-bottom: 2rem; text-align: center; color: var(--text-primary);">What This Roadmap Doesn't Cover</h2>
      <div class="out-of-scope-card" style="background-color: var(--bg-secondary); border: var(--card-border); border-left: 4px solid var(--accent); border-radius: 12px; padding: 2.25rem; max-width: 720px; margin: 0 auto; box-shadow: var(--card-shadow); color: var(--text-primary);">
        <div style="display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem;">
          <svg style="color: var(--accent); flex-shrink: 0;" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <div>
            <h3 style="font-size: 1.15rem; font-weight: 600; color: var(--text-primary);">Out of Scope Topics</h3>
            <p style="font-size: 0.9rem; color: var(--text-secondary); margin-top: 0.25rem;">This study guide is focused strictly on core technical execution and domain engineering/exam pipelines. To maintain focus, we exclude the following career preparation details:</p>
          </div>
        </div>
        <ul style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.85rem; list-style: none; padding-left: 0.5rem;">
          <li style="font-size: 0.9rem; color: var(--text-primary); position: relative; padding-left: 1.25rem;">
            <span style="position: absolute; left: 0; color: var(--accent); font-weight: bold;">&bull;</span>Soft skills & communication training
          </li>
          <li style="font-size: 0.9rem; color: var(--text-primary); position: relative; padding-left: 1.25rem;">
            <span style="position: absolute; left: 0; color: var(--accent); font-weight: bold;">&bull;</span>Company-specific interview prep
          </li>
          <li style="font-size: 0.9rem; color: var(--text-primary); position: relative; padding-left: 1.25rem;">
            <span style="position: absolute; left: 0; color: var(--accent); font-weight: bold;">&bull;</span>College academics & exam preparation
          </li>
          <li style="font-size: 0.9rem; color: var(--text-primary); position: relative; padding-left: 1.25rem;">
            <span style="position: absolute; left: 0; color: var(--accent); font-weight: bold;">&bull;</span>Internship hunting strategies
          </li>
          <li style="font-size: 0.9rem; color: var(--text-primary); position: relative; padding-left: 1.25rem;">
            <span style="position: absolute; left: 0; color: var(--accent); font-weight: bold;">&bull;</span>Entrepreneurship & startup building
          </li>
        </ul>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer>
    <div class="container">
      <p class="footer-quote">
        &ldquo;The journey ends, but the grind never does.&rdquo;
      </p>
    </div>
  </footer>

  <script type="module" src="/src/main.tsx"></script>
  <script src="app.js"></script>
</body>
</html>
"""

index_filepath = os.path.join(workspace_dir, "index.html")
with open(index_filepath, "w", encoding="utf-8") as f:
    f.write(index_html)
print("[OK] Compiled index.html")

# 3. Create app.js
# Format the careers_data for app.js
js_careers_index = []
for c in careers_data:
    js_careers_index.append({
        "id": c["id"],
        "title": c["title"],
        "emoji": c["emoji"],
        "desc": c["description"],
        "domain": c["domain"],
        "keywords": c["keywords"],
        "duration": c["duration"],
        "phases": f"{len(c['phases'])} PHASES"
    })

# Write the full updated app.js (matching standard template)
app_js_content = r"""document.addEventListener('DOMContentLoaded', () => {
  let firebaseManager = null;
  // --- Active Roadmap ID Resolution ---
  const getRoadmapIdFromPath = () => {
    try {
      const path = window.location.pathname;
      const filename = path.substring(path.lastIndexOf('/') + 1);
      if (filename && filename.endsWith('.html') && filename !== 'index.html' && filename !== 'viewer.html') {
        return filename.replace('.html', '');
      }
      if (filename === 'viewer.html') {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
      }
    } catch (e) {}
    return null;
  };

  let activeRoadmapId = null;
  if (typeof roadmapId !== 'undefined') {
    activeRoadmapId = roadmapId;
  } else {
    activeRoadmapId = getRoadmapIdFromPath();
  }

  // --- Theme Management ---
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
    updateThemeIcon(savedTheme);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.remove('light-mode');
      document.body.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark-mode');
      document.body.classList.add('light-mode');
    }
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

  initTheme();
  const themeToggle = document.querySelector('.btn-theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // --- Secure Gemini API Helper ---
  const askGemini = async (prompt, systemPrompt = null, isJson = false) => {
    const headers = { 'Content-Type': 'application/json' };
    
    let apiEndpoint = '/api/gemini';
    if (window.location.protocol === 'file:') {
      const isNested = window.location.pathname.includes('/roadmaps/');
      apiEndpoint = isNested ? '../api/gemini' : 'api/gemini';
    }

    const res = await fetch(apiEndpoint, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ prompt, systemPrompt, isJson })
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || `HTTP Error ${res.status}`);
    }

    const data = await res.json();
    return data.reply;
  };

  const renderFallbackExists = (fallbackEl, slug, query) => {
    fallbackEl.innerHTML = `
      <h3>Custom roadmap for "<span id="search-query-highlight"></span>" is ready!</h3>
      <p>A customized week-by-week career plan has already been generated for this topic.</p>
      <button id="btn-view-ai" class="hero-btn">View AI Roadmap 🚀</button>
    `;
    document.getElementById('search-query-highlight').textContent = query;
    document.getElementById('btn-view-ai').addEventListener('click', () => {
      const isNested = window.location.pathname.includes('/roadmaps/');
      const viewerUrl = isNested ? `viewer.html?id=${slug}` : `roadmaps/viewer.html?id=${slug}`;
      window.location.href = viewerUrl;
    });
  };

  const renderFallbackGenerate = (fallbackEl, slug, query) => {
    fallbackEl.innerHTML = `
      <h3>No roadmaps found for "<span id="search-query-highlight"></span>"</h3>
      <p>You can generate a custom, premium week-by-week roadmap for this topic using Gemini AI!</p>
      <button id="btn-generate-ai" class="hero-btn">Generate Roadmap with AI \u2728</button>
    `;
    document.getElementById('search-query-highlight').textContent = query;
    document.getElementById('btn-generate-ai').addEventListener('click', () => {
      generateRoadmapWithAI(query, slug, fallbackEl);
    });
  };

  const generateRoadmapWithAI = async (query, slug, fallbackEl) => {
    fallbackEl.innerHTML = `
      <h3>Generating roadmap for "${query}"...</h3>
      <p style="margin-bottom: 1.5rem;">Designing curriculum, 4 phases, 10 mock test MCQs per phase, capstones, and interview strategy. This may take up to a minute...</p>
      <div class="typing-indicator" style="margin: 0 auto 1.5rem auto; justify-content: center;">
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
        <span class="typing-dot"></span>
      </div>
    `;

    try {
      const systemPrompt = 'You are a world-class education curriculum designer. Generate a highly detailed, premium, phase-based learning roadmap for "' + query + '". The output MUST be a single, valid JSON object with the following keys and structure:\n{\n  "id": "' + slug + '",\n  "title": "' + query + ' Career Roadmap",\n  "description": "A comprehensive, dynamic career roadmap to master ' + query + ' with week-by-week curriculum trackers, mock test questions, and capstone projects.",\n  "duration": "16 Weeks",\n  "difficulty": "Intermediate",\n  "role": "' + query + ' Specialist",\n  "prerequisites": "Basic understanding of programming and technology",\n  "phases": [\n    {\n      "num": 1,\n      "title": "Phase 1 Title",\n      "desc": "Phase 1 detailed overview description",\n      "weeks": [\n        {\n          "title": "Week 1: Week Title",\n          "topics": ["Sub-topic A details", "Sub-topic B details"]\n        },\n        {\n          "title": "Week 2: Week Title",\n          "topics": ["Sub-topic C details", "Sub-topic D details"]\n        },\n        {\n          "title": "Week 3: Week Title",\n          "topics": ["Sub-topic E details", "Sub-topic F details"]\n        },\n        {\n          "title": "Week 4: Week Title",\n          "topics": ["Sub-topic G details", "Sub-topic H details"]\n        }\n      ],\n      "mock_questions": [\n        {\n          "question": "A multiple choice question related to Phase 1 topics?",\n          "options": ["Option 0 text", "Option 1 text", "Option 2 text", "Option 3 text"],\n          "correct": 0,\n          "topic": "Sub-topic A details"\n        }\n      ]\n    }\n  ],\n  "capstones": [\n    {\n      "title": "Capstone Project 1 Title",\n      "desc": "Project 1 description and deliverables",\n      "tech": ["Technology 1", "Technology 2"]\n    },\n    {\n      "title": "Capstone Project 2 Title",\n      "desc": "Project 2 description and deliverables",\n      "tech": ["Technology 3", "Technology 4"]\n    }\n  ],\n  "resume_keywords": ["keyword 1", "keyword 2", "keyword 3"],\n  "interview_focus": ["Focus area 1", "Focus area 2"]\n}\nEnsure there are exactly 4 phases, with exactly 4 weeks per phase, and exactly 2 topics per week. Each phase MUST have a "mock_questions" array containing exactly 10 multiple-choice questions with 4 options each, and a 0-3 index for correct. Ensure all JSON keys and values are strictly valid JSON, escaping double quotes properly. Do NOT wrap output in markdown formatting, return ONLY the raw JSON string.';

      const prompt = 'Create a custom learning roadmap for "' + query + '" with exactly 4 phases, 4 weeks per phase (16 weeks total), 10 MCQs per phase, 2 capstones, resume keywords, and interview focus points.';

      const responseText = await askGemini(prompt, systemPrompt, true);
      let cleanJson = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
      const parsedData = JSON.parse(cleanJson);
      
      if (!parsedData.title || !parsedData.phases || parsedData.phases.length !== 4) {
        throw new Error("Invalid roadmap structure returned by AI");
      }

      localStorage.setItem(`custom-roadmap-${slug}`, JSON.stringify(parsedData));

      if (firebaseManager && firebaseManager.db) {
        const currentUser = firebaseManager.auth ? firebaseManager.auth.currentUser : null;
        const uid = currentUser ? currentUser.uid : (firebaseManager.user ? firebaseManager.user.uid : null);
        if (uid) {
          const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
          const docRef = doc(firebaseManager.db, 'users', uid, 'roadmaps', slug);
          await setDoc(docRef, parsedData);
        }
      }

      fallbackEl.innerHTML = `
        <h3 style="color:var(--accent);">\u2728 Roadmap Generated Successfully!</h3>
        <p>Redirecting to viewer...</p>
      `;

      setTimeout(() => {
        const isNested = window.location.pathname.includes('/roadmaps/');
        const viewerUrl = isNested ? `viewer.html?id=${slug}` : `roadmaps/viewer.html?id=${slug}`;
        window.location.href = viewerUrl;
      }, 1500);

    } catch (err) {
      console.error("AI Roadmap generation failed:", err);
      fallbackEl.innerHTML = `
        <h3 style="color:#e57373;">⚠️ Generation Failed</h3>
        <p style="font-size:0.9rem; margin-bottom:1rem;">${err.message || err}</p>
        <button id="btn-retry-ai" class="hero-btn">Try Again</button>
      `;
      document.getElementById('btn-retry-ai').addEventListener('click', () => {
        generateRoadmapWithAI(query, slug, fallbackEl);
      });
    }
  };

  // --- Dynamic Search Portal Engine ---
  const careersIndex = {js_careers_index_placeholder};
  const roadmapSearch = document.getElementById('roadmap-search');
  if (roadmapSearch) {
    const searchResultsGrid = document.getElementById('search-results-grid');
    roadmapSearch.addEventListener('input', () => {
      const query = roadmapSearch.value.trim().toLowerCase();
      
      // If empty query, show standard recommended deck, hide fallback
      if (!query) {
        document.querySelectorAll('.card.solid-card').forEach(card => card.style.display = 'flex');
        const categories = document.getElementById('homepage-categories');
        if (categories) categories.style.display = 'grid';
        const resultsSection = document.getElementById('search-results-section');
        if (resultsSection) resultsSection.style.display = 'none';
        const fallback = document.getElementById('search-fallback');
        if (fallback) {
          fallback.style.display = 'none';
        }
        return;
      }

      // Hide all standard cards first
      document.querySelectorAll('.card.solid-card').forEach(card => card.style.display = 'none');
      const categories = document.getElementById('homepage-categories');
      if (categories) categories.style.display = 'none';
      const resultsSection = document.getElementById('search-results-section');
      if (resultsSection) resultsSection.style.display = 'block';

      // Filter matches
      const matches = careersIndex.filter(c => {
        return c.title.toLowerCase().includes(query) || 
               c.desc.toLowerCase().includes(query) || 
               c.keywords.toLowerCase().includes(query);
      });

      // Clear search fallbacks first
      const existingSearchResults = document.querySelectorAll('.search-result-injected');
      existingSearchResults.forEach(el => el.remove());

      matches.forEach(c => {
        let domainColor = "var(--accent)";
        let domainLabel = "Software";
        
        if (c.domain === "hardware") {
          domainColor = "#dd6b20";
          domainLabel = "Hardware";
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
          <a href="roadmaps/${c.id}.html" class="card solid-card search-result-injected" style="--domain-color: ${domainColor};">
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
      if (matches.length === 0 && query.length > 1) {
        const slug = query.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        
        let fallback = document.getElementById('search-fallback');
        if (!fallback) {
          fallback = document.createElement('div');
          fallback.id = 'search-fallback';
          fallback.className = 'search-fallback-card';
          const container = document.getElementById('search-results-section') || document.querySelector('main.container');
          if (container) {
            container.appendChild(fallback);
          }
        }
        
        fallback.style.display = 'flex';
        
        const localRoadmap = localStorage.getItem(`custom-roadmap-${slug}`);
        if (localRoadmap) {
          renderFallbackExists(fallback, slug, query);
        } else if (firebaseManager && firebaseManager.db) {
          const checkFirestoreRoadmap = async (uid) => {
            fallback.innerHTML = `
              <h3>Checking database for "<span id="search-query-highlight">${query}</span>"...</h3>
              <div class="typing-indicator" style="margin: 1rem auto; justify-content: center;">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
              </div>
            `;
            try {
              const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
              const docRef = doc(firebaseManager.db, 'users', uid, 'roadmaps', slug);
              const docSnap = await getDoc(docRef);
              if (docSnap.exists()) {
                localStorage.setItem(`custom-roadmap-${slug}`, JSON.stringify(docSnap.data()));
                renderFallbackExists(fallback, slug, query);
              } else {
                const globalDocRef = doc(firebaseManager.db, 'roadmaps', slug);
                const globalDocSnap = await getDoc(globalDocRef);
                if (globalDocSnap.exists()) {
                  localStorage.setItem(`custom-roadmap-${slug}`, JSON.stringify(globalDocSnap.data()));
                  renderFallbackExists(fallback, slug, query);
                } else {
                  renderFallbackGenerate(fallback, slug, query);
                }
              }
            } catch (err) {
              console.error("Error checking Firestore for roadmap:", err);
              renderFallbackGenerate(fallback, slug, query);
            }
          };

          const currentUser = firebaseManager.auth ? firebaseManager.auth.currentUser : null;
          const uid = currentUser ? currentUser.uid : (firebaseManager.user ? firebaseManager.user.uid : null);
          if (uid) {
            checkFirestoreRoadmap(uid);
          } else {
            // Wait for auth to resolve
            const unsubscribe = firebaseManager.auth.onAuthStateChanged(user => {
              if (user) {
                checkFirestoreRoadmap(user.uid);
                unsubscribe();
              } else {
                renderFallbackGenerate(fallback, slug, query);
                unsubscribe();
              }
            });
          }
        }
      } else {
        const fallback = document.getElementById('search-fallback');
        if (fallback) {
          fallback.style.display = 'none';
        }
      }
    });
  }

  // --- Phase Lock Manager ---
  const initPhaseLocks = () => {
    if (!activeRoadmapId) return;
    
    const phaseSections = document.querySelectorAll('.phase-section');
    phaseSections.forEach((section, idx) => {
      const phaseNum = parseInt(section.getAttribute('data-phase'));
      if (phaseNum === 1) return; // Phase 1 is always unlocked
      
      const prevPhaseNum = phaseNum - 1;
      const isPrevPassed = localStorage.getItem(`roadmap-${activeRoadmapId}-phase-${prevPhaseNum}-passed`) === 'true';
      
      // Remove existing lock overlay if any
      const existingOverlay = section.querySelector('.phase-lock-overlay');
      if (existingOverlay) {
        existingOverlay.remove();
      }
      
      const contentWrapper = section.querySelector('.phase-content-wrapper');
      const checkboxes = section.querySelectorAll('.topic-checkbox');
      const simplifyBtns = section.querySelectorAll('.simplify-btn');
      
      if (!isPrevPassed) {
        section.classList.add('phase-locked');
        if (contentWrapper) {
          contentWrapper.style.filter = 'blur(5px)';
          contentWrapper.style.pointerEvents = 'none';
          contentWrapper.style.opacity = '0.4';
        }
        
        checkboxes.forEach(cb => cb.disabled = true);
        simplifyBtns.forEach(btn => btn.style.display = 'none');
        
        // Inject Lock Overlay
        const overlay = document.createElement('div');
        overlay.className = 'phase-lock-overlay';
        overlay.innerHTML = `
          <div class="phase-lock-card">
            <div class="phase-lock-icon">\ud83d\udd12</div>
            <div class="phase-lock-title">Phase ${phaseNum} Locked</div>
            <div class="phase-lock-desc">Complete the Phase ${prevPhaseNum} Mock Test with 80% or above to unlock this phase.</div>
          </div>
        `;
        section.appendChild(overlay);
      } else {
        section.classList.remove('phase-locked');
        if (contentWrapper) {
          contentWrapper.style.filter = 'none';
          contentWrapper.style.pointerEvents = 'auto';
          contentWrapper.style.opacity = '1';
        }
        checkboxes.forEach(cb => cb.disabled = false);
        simplifyBtns.forEach(btn => btn.style.display = 'inline-flex');
      }
    });
  };


  // --- Mock Test Quiz Controller ---
  const initMockTests = () => {
    if (!activeRoadmapId) return;
    
    const quizCards = document.querySelectorAll('.mock-test-card');
    quizCards.forEach(card => {
      const phaseNum = parseInt(card.getAttribute('data-phase'));
      const startBtn = card.querySelector('.btn-start-test');
      
      if (!startBtn) return;
      
      startBtn.addEventListener('click', () => {
        // Collect topics of the current phase section
        const phaseSection = card.closest('.phase-section');
        const topics = [];
        if (phaseSection) {
          phaseSection.querySelectorAll('.topic-text').forEach(el => {
            const topicName = el.textContent.trim();
            if (topicName) {
              topics.push(topicName);
            }
          });
        }
        openQuizModal(phaseNum, topics, card);
      });
    });
  };

  // Helper to open Quiz Modal
  const openQuizModal = (phaseNum, topics, card) => {
    let currentQuestionIdx = 0;
    let score = 0;
    let userAnswers = [];
    let selectedOptionIdx = null;
    let questions = [];

    // Create modal elements
    const overlay = document.createElement('div');
    overlay.className = 'quiz-modal-overlay';
    overlay.innerHTML = `
      <div class="quiz-modal">
        <div class="quiz-modal-header">
          <h3 class="quiz-modal-title">\ud83d\udcdd Phase ${phaseNum} Mock Test</h3>
          <button class="quiz-modal-close" aria-label="Close Quiz">&times;</button>
        </div>
        <div class="quiz-modal-body">
          <div class="mock-test-loading" style="text-align: center; padding: 2rem;">
            <div class="typing-indicator" style="margin: 0 auto 1rem auto; justify-content: center;">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">Generating 10 custom questions using Gemini AI...</p>
          </div>
          <div class="mock-test-quiz-container" style="display: none;"></div>
          <div class="mock-test-results" style="display: none;"></div>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const closeBtn = overlay.querySelector('.quiz-modal-close');
    const loadingPanel = overlay.querySelector('.mock-test-loading');
    const container = overlay.querySelector('.mock-test-quiz-container');
    const resultsPanel = overlay.querySelector('.mock-test-results');

    const closeModal = () => {
      overlay.classList.remove('open');
      setTimeout(() => overlay.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });

    // Force reflow and add open class
    overlay.offsetHeight;
    overlay.classList.add('open');

    // Fetch quiz questions from Gemini serverless proxy
    const loadQuiz = async () => {
      try {
        if (card && card.getAttribute('data-questions')) {
          try {
            const rawQuestions = card.getAttribute('data-questions');
            const decoded = rawQuestions.startsWith('%') ? decodeURIComponent(rawQuestions) : rawQuestions;
            questions = JSON.parse(decoded);
            if (Array.isArray(questions) && questions.length > 0) {
              loadingPanel.style.display = 'none';
              container.style.display = 'block';
              renderQuizState();
              return;
            }
          } catch (e) {
            console.error("Failed to parse data-questions attribute, falling back to API", e);
          }
        }

        const headingEl = document.querySelector('.roadmap-header h1');
        const roadmapTitle = headingEl ? headingEl.textContent.trim() : 'this career path';

        const systemPrompt = "You are an expert examiner. Generate a multiple-choice quiz of exactly 10 questions based on the provided list of topics. Return ONLY a valid JSON array of objects. Each object in the array must have the following keys: 'question' (string), 'options' (array of exactly 4 strings), 'correct' (integer index 0-3 of the correct option), and 'topic' (string matching one of the provided topics).";
        const prompt = `Generate 10 MCQ questions for the following phase topics from the "${roadmapTitle}" roadmap:\n${topics.join('\n')}`;

        const reply = await askGemini(prompt, systemPrompt, true);
        let cleanText = reply.replace(/```json/gi, '').replace(/```/g, '').trim();
        questions = JSON.parse(cleanText);
        
        if (!Array.isArray(questions) || questions.length !== 10) {
          throw new Error("Invalid questions count or structure");
        }

        loadingPanel.style.display = 'none';
        container.style.display = 'block';
        renderQuizState();
      } catch(err) {
        console.error("Failed to load quiz from API:", err);
        loadingPanel.innerHTML = `
          <div style="font-size: 0.9rem; color: #e57373; font-weight: 500;">
            ⚠️ Error: ${err.message || err}
          </div>
        `;
      }
    };

    const renderQuizState = () => {
      if (currentQuestionIdx < questions.length) {
        const q = questions[currentQuestionIdx];
        selectedOptionIdx = null;
        
        const optionsHtml = q.options.map((opt, oIdx) => `
          <li>
            <button class="quiz-option-btn" data-index="${oIdx}">
              <span class="quiz-option-letter">${String.fromCharCode(65 + oIdx)}</span>
              <span class="quiz-option-val">${opt}</span>
            </button>
          </li>
        `).join('');
        
        container.innerHTML = `
          <div class="quiz-progress">Question ${currentQuestionIdx + 1} of ${questions.length}</div>
          <div class="quiz-question-container">
            <div class="quiz-question-text">${q.question}</div>
            <ul class="quiz-options-list">
              ${optionsHtml}
            </ul>
          </div>
          <div class="quiz-controls">
            <button class="btn-next-question hero-btn" disabled>Next Question</button>
          </div>
        `;
        
        const optBtns = container.querySelectorAll('.quiz-option-btn');
        const nextBtn = container.querySelector('.btn-next-question');
        
        optBtns.forEach(btn => {
          btn.addEventListener('click', () => {
            optBtns.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
            selectedOptionIdx = parseInt(btn.getAttribute('data-index'));
            nextBtn.disabled = false;
          });
        });
        
        nextBtn.addEventListener('click', () => {
          userAnswers.push(selectedOptionIdx);
          if (selectedOptionIdx === q.correct) {
            score++;
          }
          currentQuestionIdx++;
          renderQuizState();
        });
      } else {
        container.innerHTML = '';
        container.style.display = 'none';
        resultsPanel.style.display = 'block';
        
        const passed = score >= 8;
        const scoreClass = passed ? 'passed' : 'failed';
        const message = passed 
          ? `\uD83C\uDF89 Congratulations! You Passed.<span>You scored ${score}/10 (80% or above) and unlocked the next phase.</span>`
          : `\u274C Keep Practicing!<span>You scored ${score}/10. You need at least 80% (8/10) to unlock the next phase.</span>`;
        
        let revisionHtml = '';
        if (!passed) {
          const wrongTopics = [];
          questions.forEach((q, idx) => {
            if (userAnswers[idx] !== q.correct && q.topic) {
              wrongTopics.push(q.topic);
            }
          });
          
          const uniqueWrongTopics = [...new Set(wrongTopics)];
          const topicsLi = uniqueWrongTopics.map(t => `<li>${t}</li>`).join('');
          
          revisionHtml = `
            <div class="revision-section">
              <div class="revision-title">Topics to Revise:</div>
              <ul class="revision-list">
                ${topicsLi || '<li>Phase Concepts</li>'}
              </ul>
            </div>
          `;
        }
        
        resultsPanel.innerHTML = `
          <div class="results-score-row">
            <div class="results-score-circle ${scoreClass}">${score}/10</div>
            <div class="results-message">${message}</div>
          </div>
          ${revisionHtml}
          <div class="quiz-controls" style="margin-top:1.5rem;">
            ${passed 
              ? '<button class="btn-close-quiz hero-btn">Close Quiz & Explore</button>' 
              : '<button class="btn-retry-test hero-btn">Retry Test \uD83D\uDD04</button>'}
          </div>
        `;
        
        if (passed) {
          localStorage.setItem(`roadmap-${activeRoadmapId}-phase-${phaseNum}-passed`, 'true');
          initPhaseLocks();
          
          try {
            if (typeof confetti !== 'undefined') {
              confetti();
            }
          } catch(e) {}

          if (firebaseManager && firebaseManager.isLoggedIn()) {
            firebaseManager.checkAndUnlockBadge('phase-complete', '🏆 Phase Complete Badge Unlocked!');
            if (score === 10) {
              firebaseManager.checkAndUnlockBadge('perfect-100', '💯 Perfect Score Badge Unlocked!');
            }
          }

          resultsPanel.querySelector('.btn-close-quiz').addEventListener('click', closeModal);
        } else {
          resultsPanel.querySelector('.btn-retry-test').addEventListener('click', () => {
            resultsPanel.style.display = 'none';
            container.style.display = 'block';
            currentQuestionIdx = 0;
            score = 0;
            userAnswers = [];
            renderQuizState();
          });
        }
      }
    };

    loadQuiz();
  };

  // --- Smart Notes ("\u2728 Simplify") Controller ---
  const initSmartNotes = () => {
    const simplifyBtns = document.querySelectorAll('.simplify-btn');
    simplifyBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const topic = btn.getAttribute('data-topic');
        const topicItem = btn.closest('.topic-item');
        if (!topicItem) return;
        
        const panel = topicItem.querySelector('.topic-resources-panel');
        if (!panel) return;
        
        if (!topicItem.classList.contains('panel-open')) {
          topicItem.classList.add('panel-open');
          panel.style.maxHeight = panel.scrollHeight + 'px';
          panel.addEventListener('transitionend', function handler(te) {
            if (te.propertyName === 'max-height' && topicItem.classList.contains('panel-open')) {
              panel.style.maxHeight = 'none';
              panel.removeEventListener('transitionend', handler);
            }
          });
        }
        
        let wrapper = panel.querySelector('.simplified-notes-wrapper');
        if (!wrapper) {
          wrapper = document.createElement('div');
          wrapper.className = 'simplified-notes-wrapper';
          panel.appendChild(wrapper);
        }
        
        const cacheKey = `roadmap-${activeRoadmapId}-topic-${topic}-simplified`;
        const cachedNotes = localStorage.getItem(cacheKey);
        
        if (cachedNotes) {
          renderSimplifiedNotes(wrapper, cachedNotes);
          panel.style.maxHeight = 'none';
          return;
        }
        
        btn.classList.add('loading');
        btn.textContent = '\u2728 Simplifying...';
        wrapper.innerHTML = `
          <div class="simplified-notes-title">\u2728 Simplified Explanation</div>
          <div style="font-size:0.85rem; color:var(--text-secondary); display:flex; align-items:center; gap:0.5rem; margin-top:0.5rem;">
            <div class="typing-indicator">
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
              <span class="typing-dot"></span>
            </div>
            Summarizing topic for beginners...
          </div>
        `;
        
        panel.style.maxHeight = 'none';
        
        try {
          const systemPrompt = "You are a world-class educational assistant that simplifies complex, technical topics for absolute beginners. Explain terms cleanly, avoiding jargon, and structure your response as exactly 5 high-impact bullet points.";
          const prompt = `Summarize the topic "${topic}" in simple, beginner-friendly terms using exactly 5 bullet points. Make it easy to read.`;

          const simplified = await askGemini(prompt, systemPrompt, false);
          
          localStorage.setItem(cacheKey, simplified);
          renderSimplifiedNotes(wrapper, simplified);
        } catch(err) {
          console.error("Failed to simplify topic:", err);
          wrapper.innerHTML = `
            <div class="simplified-notes-title">\u2728 Simplified Explanation</div>
            <div style="font-size:0.85rem; color:#e57373; margin-top:0.5rem; font-weight:500;">
              ⚠️ Error: ${err.message || err}
            </div>
          `;
        } finally {
          btn.classList.remove('loading');
          btn.textContent = '\u2728 Simplify';
          panel.style.maxHeight = 'none';
        }
      });
    });
    
    const renderSimplifiedNotes = (container, text) => {
      const lines = text.split('\n')
        .map(l => l.replace(/^[-*•]\s*/, '').trim())
        .filter(l => l.length > 0)
        .slice(0, 5);
        
      const lis = lines.map(line => `<li>${line}</li>`).join('');
      container.innerHTML = `
        <div class="simplified-notes-title">\u2728 Beginner-Friendly Summary</div>
        <ul class="simplified-notes-list" style="margin-top:0.5rem;">
          ${lis}
        </ul>
      `;
    };
  };

  // --- AI Doubt Solver Chat Panel ---
  const initDoubtSolver = () => {
    // Show Doubt Solver on all pages
    const floatingBtn = document.createElement('button');
    floatingBtn.className = 'ai-doubt-solver-btn';
    floatingBtn.setAttribute('aria-label', 'AI Doubt Solver');
    floatingBtn.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
    `;
    document.body.appendChild(floatingBtn);
    
    const headingEl = document.querySelector('.roadmap-header h1') || document.querySelector('.hero h1') || document.querySelector('.hero-section-wrap h1');
    const roadmapTitle = headingEl ? headingEl.textContent.trim() : 'CareerPath India';
    
    const chatPanel = document.createElement('div');
    chatPanel.className = 'ai-doubt-solver-panel';
    chatPanel.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-chat-title">💬 Doubt Solver: ${roadmapTitle}</div>
        <button class="ai-chat-close">&times;</button>
      </div>
      <div class="ai-chat-messages">
        <div class="ai-message assistant">
          Hi! I am your AI assistant for the <strong>${roadmapTitle}</strong> roadmap. Feel free to ask me any doubts about the topics in this guide!
        </div>
      </div>
      <div class="ai-chat-input-area">
        <textarea class="ai-chat-input" placeholder="Ask your doubt..."></textarea>
        <button class="ai-chat-send" aria-label="Send message">
          <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
        </button>
      </div>
    `;
    document.body.appendChild(chatPanel);
    
    const chatClose = chatPanel.querySelector('.ai-chat-close');
    const chatInput = chatPanel.querySelector('.ai-chat-input');
    const chatSend = chatPanel.querySelector('.ai-chat-send');
    const chatMessages = chatPanel.querySelector('.ai-chat-messages');
    
    floatingBtn.addEventListener('click', () => {
      const isOpen = chatPanel.classList.contains('open');
      if (isOpen) {
        chatPanel.classList.remove('open');
      } else {
        chatPanel.classList.add('open');
        chatInput.focus();
      }
    });
    
    chatClose.addEventListener('click', () => {
      chatPanel.classList.remove('open');
    });
    
    const sendMessage = async () => {
      const query = chatInput.value.trim();
      if (!query) return;
      
      chatInput.value = '';
      
      const userMsg = document.createElement('div');
      userMsg.className = 'ai-message user';
      userMsg.textContent = query;
      chatMessages.appendChild(userMsg);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      const loader = document.createElement('div');
      loader.className = 'ai-message assistant';
      loader.innerHTML = `
        <div class="typing-indicator">
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
          <span class="typing-dot"></span>
        </div>
      `;
      chatMessages.appendChild(loader);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      
      try {
        const systemPrompt = `You are an expert technical mentor and tutor. The user is studying the "${roadmapTitle}" roadmap. Explain concepts clearly, comprehensively, and in simple terms suited to their level. Use markdown formatting for structures, code snippets, or bullet points if needed.`;
        const reply = await askGemini(query, systemPrompt, false);
        
        loader.remove();
        
        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'ai-message assistant';
        assistantMsg.innerHTML = formatReplyText(reply);
        chatMessages.appendChild(assistantMsg);
      } catch(err) {
        loader.remove();
        const errMsg = document.createElement('div');
        errMsg.className = 'ai-message system-alert';
        errMsg.textContent = `⚠️ Error: ${err.message || err}`;
        chatMessages.appendChild(errMsg);
      } finally {
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
    };
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    const formatReplyText = (text) => {
      let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n\n/g, "</p><p>")
        .replace(/\n-\s*(.*)/g, "<li>$1</li>")
        .replace(/`(.*?)`/g, "<code>$1</code>");
        
      if (html.includes("<li>")) {
        html = html.replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>");
      }
      
      return `<p>${html}</p>`.replace(/<p><\/p>/g, '');
    };
  };

  // --- Domain Page Canvas Animations ---
  const initDomainCanvasAnimations = () => {
    // Find either .hero-wrap (for portals) or .roadmap-header (for individual roadmaps)
    const target = document.querySelector('.hero-wrap') || document.querySelector('.roadmap-header');
    if (!target) return;

    // Create canvas
    const canvas = document.createElement('canvas');
    canvas.className = 'hero-canvas';
    target.style.position = 'relative'; // Ensure relative layout
    target.insertBefore(canvas, target.firstChild);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const resizeCanvas = () => {
      canvas.width = target.clientWidth;
      canvas.height = target.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Detect domain
    const path = window.location.pathname.toLowerCase();
    
    let domainType = '';
    if (path.includes('sw-ai-') || path.includes('sw-data-') || path.includes('viewer.html')) {
      domainType = 'ml-ai';
    } else if (path.includes('software') || path.includes('sw-')) {
      domainType = 'software';
    } else if (path.includes('ece') || path.includes('eee') || path.includes('electrical')) {
      domainType = 'ece-eee';
    } else if (path.includes('government') || path.includes('gov-')) {
      domainType = 'government';
    }

    if (!domainType) return; // Only animate on designated domain pages

    const isDarkMode = () => document.documentElement.getAttribute('data-theme') === 'dark';

    // 1. Software: floating code particles
    if (domainType === 'software') {
      const snippets = ['{}', '0', '1', 'const', 'let', 'import', 'function', '=>', 'class', 'console', '[]', 'null', 'true', 'false'];
      const particles = [];
      const particleCount = 20;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height + canvas.height,
          text: snippets[Math.floor(Math.random() * snippets.length)],
          speed: 0.4 + Math.random() * 0.8,
          fontSize: 10 + Math.random() * 12,
          opacity: 0.1 + Math.random() * 0.3,
          dx: -0.2 + Math.random() * 0.4
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${isDarkMode() ? 'bold ' : ''}12px var(--font-mono)`;
        
        particles.forEach(p => {
          ctx.font = `${p.fontSize}px var(--font-mono)`;
          ctx.fillStyle = isDarkMode() ? `rgba(0, 255, 204, ${p.opacity})` : `rgba(45, 74, 62, ${p.opacity * 0.6})`;
          ctx.fillText(p.text, p.x, p.y);
          
          p.y -= p.speed;
          p.x += p.dx;
          
          if (p.y < -30) {
            p.y = canvas.height + 20;
            p.x = Math.random() * canvas.width;
            p.opacity = 0.1 + Math.random() * 0.3;
          }
        });
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();
    }

    // 2. ECE/EEE: glowing circuit board traces
    else if (domainType === 'ece-eee') {
      const traces = [];
      const traceCount = 8;
      
      const createTrace = () => {
        const startTop = Math.random() > 0.5;
        const x = Math.random() * canvas.width;
        const y = startTop ? 0 : canvas.height;
        return {
          segments: [[x, y]],
          currentX: x,
          currentY: y,
          dirX: 0,
          dirY: startTop ? 1 : -1,
          speed: 1.5 + Math.random() * 2,
          color: isDarkMode() ? 'rgba(0, 255, 204, 0.4)' : 'rgba(45, 74, 62, 0.25)',
          pulseRadius: 3 + Math.random() * 3,
          maxSegments: 4,
          segmentLength: 50 + Math.random() * 100,
          currentSegmentProgress: 0
        };
      };

      for (let i = 0; i < traceCount; i++) {
        traces.push(createTrace());
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        traces.forEach((t, index) => {
          ctx.beginPath();
          ctx.strokeStyle = t.color;
          ctx.lineWidth = 1.5;
          ctx.shadowBlur = isDarkMode() ? 4 : 0;
          ctx.shadowColor = isDarkMode() ? '#00ffcc' : 'transparent';
          
          ctx.moveTo(t.segments[0][0], t.segments[0][1]);
          for (let i = 1; i < t.segments.length; i++) {
            ctx.lineTo(t.segments[i][0], t.segments[i][1]);
          }
          ctx.lineTo(t.currentX, t.currentY);
          ctx.stroke();
          
          // Draw head dot
          ctx.beginPath();
          ctx.fillStyle = isDarkMode() ? '#00ffcc' : '#2d4a3e';
          ctx.arc(t.currentX, t.currentY, t.pulseRadius, 0, Math.PI * 2);
          ctx.fill();
          
          // Move head
          t.currentX += t.dirX * t.speed;
          t.currentY += t.dirY * t.speed;
          t.currentSegmentProgress += t.speed;
          
          // Should turn?
          if (t.currentSegmentProgress >= t.segmentLength) {
            t.segments.push([t.currentX, t.currentY]);
            if (t.segments.length > t.maxSegments) {
              t.segments.shift();
            }
            
            // Turn 90 degrees
            t.currentSegmentProgress = 0;
            t.segmentLength = 40 + Math.random() * 80;
            if (t.dirX === 0) {
              t.dirX = Math.random() > 0.5 ? 1 : -1;
              t.dirY = 0;
            } else {
              t.dirX = 0;
              t.dirY = Math.random() > 0.5 ? 1 : -1;
            }
          }
          
          // Reset trace if off bounds
          if (t.currentX < -20 || t.currentX > canvas.width + 20 || t.currentY < -20 || t.currentY > canvas.height + 20) {
            traces[index] = createTrace();
          }
        });
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();
    }

    // 3. Government: floating documents/scrolls (simplified outlines)
    else if (domainType === 'government') {
      const docs = [];
      const docCount = 12;

      for (let i = 0; i < docCount; i++) {
        docs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height + canvas.height,
          w: 12 + Math.random() * 8,
          h: 16 + Math.random() * 10,
          speed: 0.3 + Math.random() * 0.5,
          angle: Math.random() * Math.PI * 2,
          rotSpeed: -0.01 + Math.random() * 0.02,
          swaySpeed: 0.01 + Math.random() * 0.02,
          swayAmp: 0.5 + Math.random() * 1.5,
          swayTime: Math.random() * 100,
          opacity: 0.08 + Math.random() * 0.15
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        docs.forEach(d => {
          ctx.save();
          ctx.translate(d.x, d.y);
          ctx.rotate(d.angle);
          
          ctx.strokeStyle = isDarkMode() ? `rgba(255, 255, 255, ${d.opacity})` : `rgba(0, 0, 0, ${d.opacity * 0.8})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          // Draw a sheet of paper (rectangle with a folded corner)
          ctx.moveTo(-d.w/2, -d.h/2);
          ctx.lineTo(d.w/2 - 4, -d.h/2);
          ctx.lineTo(d.w/2, -d.h/2 + 4);
          ctx.lineTo(d.w/2, d.h/2);
          ctx.lineTo(-d.w/2, d.h/2);
          ctx.closePath();
          ctx.stroke();
          
          // Draw fold line
          ctx.beginPath();
          ctx.moveTo(d.w/2 - 4, -d.h/2);
          ctx.lineTo(d.w/2 - 4, -d.h/2 + 4);
          ctx.lineTo(d.w/2, -d.h/2 + 4);
          ctx.stroke();
          
          // Draw internal dummy text lines
          ctx.beginPath();
          ctx.moveTo(-d.w/2 + 3, -d.h/2 + 8);
          ctx.lineTo(d.w/2 - 3, -d.h/2 + 8);
          ctx.moveTo(-d.w/2 + 3, -d.h/2 + 12);
          ctx.lineTo(d.w/2 - 5, -d.h/2 + 12);
          ctx.moveTo(-d.w/2 + 3, -d.h/2 + 16);
          ctx.lineTo(d.w/2 - 3, -d.h/2 + 16);
          ctx.stroke();
          
          ctx.restore();
          
          // Move
          d.y -= d.speed;
          d.x += Math.sin(d.swayTime) * d.swayAmp * 0.5;
          d.angle += d.rotSpeed;
          d.swayTime += d.swaySpeed;
          
          if (d.y < -30) {
            d.y = canvas.height + 30;
            d.x = Math.random() * canvas.width;
          }
        });
        
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();
    }

    // 4. ML/AI: neural network particle plexus
    else if (domainType === 'ml-ai') {
      const particles = [];
      const particleCount = 35;
      const maxDistance = 110;

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: -0.3 + Math.random() * 0.6,
          vy: -0.3 + Math.random() * 0.6,
          radius: 2 + Math.random() * 3,
          opacity: 0.15 + Math.random() * 0.35
        });
      }

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Update particles
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = isDarkMode() ? `rgba(0, 255, 204, ${p.opacity})` : `rgba(45, 74, 62, ${p.opacity * 0.7})`;
          ctx.fill();
        });
        
        // Draw lines
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const p1 = particles[i];
            const p2 = particles[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = (dx * dx + dy * dy)**0.5;
            
            if (dist < maxDistance) {
              const alpha = (1 - dist / maxDistance) * 0.18;
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = isDarkMode() ? `rgba(0, 255, 204, ${alpha})` : `rgba(45, 74, 62, ${alpha})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }
        
        animationFrameId = requestAnimationFrame(animate);
      };
      animate();
    }
  };

  // --- Blocker Login Gate Logic ---
  const injectLoginGate = () => {
    if (document.getElementById('gate-login-overlay')) return;

    const imgPath = window.location.pathname.includes('/roadmaps/') ? '../images/logo.png' : 'images/logo.png';

    const overlay = document.createElement('div');
    overlay.className = 'gate-login-overlay';
    overlay.id = 'gate-login-overlay';
    overlay.innerHTML = `
      <!-- Animated Splash Screen Container -->
      <div class="splash-screen-container" id="splash-container">
        <div class="splash-logo-wrapper">
          <img src="${imgPath}" class="splash-logo-img" alt="Logo">
        </div>
        <div class="splash-title">
          <span class="splash-text-blue" id="splash-text-part1"></span>
          <span class="splash-text-green" style="margin-left: 0.5rem;" id="splash-text-part2"></span>
        </div>
        <div class="splash-subtitle">Roadmaps for Different Domains</div>
      </div>

      <!-- Login Gate Card (initially hidden) -->
      <div class="gate-login-card" id="gate-login-card-el" style="display: none; opacity: 0; transition: opacity 0.5s ease;">
        <div id="gate-content" style="text-align: center;">
          <img src="${imgPath}" class="login-logo" alt="Logo" style="width: 80px; height: 80px; margin-bottom: 1.5rem; object-fit: contain; filter: drop-shadow(0 0 10px rgba(49, 130, 206, 0.3));">
          <h2 class="gate-brand" style="margin-bottom:0.75rem;">Career<span>Path</span> India</h2>
          <p class="gate-subtitle">Please sign in to access B.Tech engineering roadmaps and government exam study guides.</p>
          
          <button class="gate-btn-google" id="gate-btn-login" style="margin: 1.5rem auto 0; max-width: 280px; display: inline-flex;">
            <svg class="google-icon" viewBox="0 0 24 24" width="16" height="16" style="vertical-align: middle; margin-right: 0.5rem;">
              <path fill="currentColor" d="M12.24 10.285V13.4h6.887c-.275 1.565-1.88 4.604-6.887 4.604-4.33 0-7.866-3.577-7.866-8s3.536-8 7.866-8c2.46 0 4.105 1.025 5.047 1.926l2.427-2.334C17.955 2.192 15.34 1 12.24 1 6.133 1 1.18 5.925 1.18 12s4.953 11 11.06 11c6.373 0 10.602-4.475 10.602-10.795 0-.727-.08-1.284-.175-1.92H12.24z"/>
            </svg>
            <span>Sign In with Google</span>
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    // Typewriter text typing animation logic
    const textPart1 = "CAREERPATH";
    const textPart2 = "INDIA";
    const elPart1 = document.getElementById('splash-text-part1');
    const elPart2 = document.getElementById('splash-text-part2');
    
    let charIdx = 0;
    const typeNextChar = () => {
      if (charIdx < textPart1.length) {
        elPart1.textContent += textPart1[charIdx];
        charIdx++;
        setTimeout(typeNextChar, 40);
      } else if (charIdx - textPart1.length < textPart2.length) {
        const p2Idx = charIdx - textPart1.length;
        elPart2.textContent += textPart2[p2Idx];
        charIdx++;
        setTimeout(typeNextChar, 40);
      }
    };

    // Start typewriter effect after logo entry completes roughly
    setTimeout(typeNextChar, 800);

    // Timeout to transition splash screen to login card after exactly 3 seconds
    setTimeout(() => {
      const splash = document.getElementById('splash-container');
      const loginCard = document.getElementById('gate-login-card-el');
      if (splash && loginCard) {
        splash.style.opacity = '0';
        setTimeout(() => {
          splash.style.display = 'none';
          loginCard.style.display = 'block';
          loginCard.classList.add('gate-login-card-entry');
          setTimeout(() => {
            loginCard.style.opacity = '1';
          }, 50);
        }, 500);
      }
    }, 3000);

    // Interactive 3D mousemove tracking event listeners
    const loginCardEl = document.getElementById('gate-login-card-el');
    if (loginCardEl) {
      loginCardEl.addEventListener('mousemove', (e) => {
        const rect = loginCardEl.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const px = x / rect.width;
        const py = y / rect.height;
        const rx = (0.5 - py) * 20; // Tilt around X
        const ry = (px - 0.5) * 20; // Tilt around Y
        loginCardEl.style.setProperty('--rx', `${rx}deg`);
        loginCardEl.style.setProperty('--ry', `${ry}deg`);
        loginCardEl.style.setProperty('--mx', `${px * 100}%`);
        loginCardEl.style.setProperty('--my', `${py * 100}%`);
      });
      loginCardEl.addEventListener('mouseleave', () => {
        loginCardEl.style.setProperty('--rx', '0deg');
        loginCardEl.style.setProperty('--ry', '0deg');
      });
    }
  };

  const removeLoginGate = () => {
    const overlay = document.getElementById('gate-login-overlay');
    if (overlay) {
      overlay.style.transition = 'opacity 0.3s ease';
      overlay.style.opacity = '0';
      setTimeout(() => overlay.remove(), 300);
    }
  };

  const showGateLoginScreen = () => {
    injectLoginGate();
    
    const loginBtn = document.getElementById('gate-btn-login');

    if (loginBtn) {
      loginBtn.disabled = false;
      loginBtn.style.opacity = '1';
      loginBtn.style.cursor = 'pointer';
      
      loginBtn.onclick = async () => {
        if (firebaseManager && firebaseManager.auth) {
          try {
            const { GoogleAuthProvider, signInWithPopup } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
            const provider = new GoogleAuthProvider();
            await signInWithPopup(firebaseManager.auth, provider);
            
            const isNested = window.location.pathname.includes('/roadmaps/');
            window.location.href = isNested ? '../index.html' : 'index.html';
          } catch (err) {
            console.error("Login gate authentication error:", err);
            alert("⚠️ Login failed. Please verify connection and try again.");
          }
        }
      };
    }
  };

  // --- Progress Sync UI Updater ---
  const updateProgressUI = () => {
    if (!activeRoadmapId) return;
    const checkboxes = document.querySelectorAll('.topic-checkbox');
    const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
    const totalCount = checkboxes.length;

    const checkedEl = document.getElementById('checked-topics');
    const checkedMobileEl = document.getElementById('checked-topics-mobile');
    if (checkedEl) checkedEl.textContent = checkedCount;
    if (checkedMobileEl) checkedMobileEl.textContent = checkedCount;

    const totalEl = document.getElementById('total-topics');
    const totalMobileEl = document.getElementById('total-topics-mobile');
    if (totalEl) totalEl.textContent = totalCount;
    if (totalMobileEl) totalMobileEl.textContent = totalCount;

    const percent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;
    
    // Update text indicators
    document.querySelectorAll('.progress-percentage').forEach(el => {
      el.textContent = `${percent}%`;
    });

    // Update linear progress bar fills
    document.querySelectorAll('.progress-bar-fill').forEach(el => {
      el.style.width = `${percent}%`;
    });

    // Update circular progress ring
    document.querySelectorAll('.progress-ring-circle').forEach(circle => {
      const radius = circle.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      circle.style.strokeDasharray = `${circumference} ${circumference}`;
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
    });
  };

  // --- Local Progress Tracker Initializer ---
  const initProgressTracker = () => {
    if (!activeRoadmapId) return;

    const checkboxes = document.querySelectorAll('.topic-checkbox');
    if (checkboxes.length === 0) return;

    // Load progress from local storage
    let progress = {};
    const localProgStr = localStorage.getItem(`roadmap-${activeRoadmapId}-progress`);
    if (localProgStr) {
      try {
        progress = JSON.parse(localProgStr);
      } catch(e) {}
    }

    checkboxes.forEach(cb => {
      cb.checked = !!progress[cb.id];
      cb.addEventListener('change', async () => {
        let currentProg = {};
        const storedStr = localStorage.getItem(`roadmap-${activeRoadmapId}-progress`);
        if (storedStr) {
          try { currentProg = JSON.parse(storedStr); } catch(e) {}
        }
        
        if (cb.checked) {
          currentProg[cb.id] = true;
        } else {
          delete currentProg[cb.id];
        }

        // Save locally
        localStorage.setItem(`roadmap-${activeRoadmapId}-progress`, JSON.stringify(currentProg));
        updateProgressUI();

        // Save to Firebase Cloud
        if (firebaseManager && firebaseManager.isLoggedIn()) {
          await firebaseManager.saveProgressToCloud(activeRoadmapId, currentProg);
        }
      });
    });

    updateProgressUI();

    const resetBtn = document.getElementById('reset-progress');
    if (resetBtn) {
      resetBtn.style.cursor = 'pointer';
      resetBtn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to reset all your progress for this roadmap?')) {
          checkboxes.forEach(cb => cb.checked = false);
          
          localStorage.removeItem(`roadmap-${activeRoadmapId}-progress`);
          updateProgressUI();

          if (firebaseManager && firebaseManager.isLoggedIn()) {
            await firebaseManager.saveProgressToCloud(activeRoadmapId, {});
          }
        }
      });
    }
  };

  // --- Firebase Cloud Synchronization Manager ---
  class FirebaseSyncManager {
    constructor() {
      this.db = null;
      this.auth = null;
      this.user = null;
      this.initialized = false;
    }

    async init() {
      const config = {
        apiKey: "AIzaSyDS5o-fMCUkNh0jGwlnj74ggKp1AIiFiVs",
        authDomain: "careerpathindia-343a1.firebaseapp.com",
        projectId: "careerpathindia-343a1",
        storageBucket: "careerpathindia-343a1.appspot.com",
        messagingSenderId: "717563492580",
        appId: "1:717563492580:web:8d094fcad2b1a8541954f1"
      };

      let authResolved = false;
      const timeoutId = setTimeout(() => {
        if (!authResolved) {
          authResolved = true;
          console.warn("Firebase auth check timed out after 3 seconds. Proceeding to login screen.");
          showGateLoginScreen(true);
        }
      }, 3000);

      try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js');
        const { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js');
        const { getFirestore, doc, setDoc, getDoc, collection, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');

        const app = initializeApp(config);
        this.db = getFirestore(app);
        this.auth = getAuth(app);
        this.initialized = true;

        // Attach login button handler
        const loginBtn = document.getElementById('btn-login');
        if (loginBtn) {
          loginBtn.addEventListener('click', async () => {
            try {
              const provider = new GoogleAuthProvider();
              await signInWithPopup(this.auth, provider);
            } catch (err) {
              console.error("Firebase Login Error:", err);
              alert("⚠️ Error during Google Sign-in. Please verify connection and try again.");
            }
          });
        }

        // Attach logout button handler
        const logoutBtn = document.getElementById('btn-logout');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', async () => {
            try {
              await signOut(this.auth);
              window.location.reload();
            } catch (err) {
              console.error("Firebase Logout Error:", err);
            }
          });
        }

        // User avatar dropdown menu toggle
        const avatarMenu = document.getElementById('user-avatar-menu');
        if (avatarMenu) {
          avatarMenu.addEventListener('click', (e) => {
            e.stopPropagation();
            avatarMenu.classList.toggle('active');
          });
          document.addEventListener('click', () => {
            avatarMenu.classList.remove('active');
          });
        }

        // Handle auth state changes
        onAuthStateChanged(this.auth, async (user) => {
          if (!authResolved) {
            authResolved = true;
            clearTimeout(timeoutId);
          }
          if (user) {
            this.user = user;
            await this.onUserLoggedIn(user);
            removeLoginGate();
          } else {
            this.user = null;
            this.onUserLoggedOut();
            showGateLoginScreen(true);
          }
        });

      } catch (err) {
        console.error("Firebase Initialization Error:", err);
        if (!authResolved) {
          authResolved = true;
          clearTimeout(timeoutId);
        }
        showGateLoginScreen(false);
      }
    }

    isLoggedIn() {
      return this.user !== null;
    }

    async onUserLoggedIn(user) {
      localStorage.setItem('isLoggedIn', 'true');
      // Toggle navbar UI
      const loginBtn = document.getElementById('btn-login');
      const avatarMenu = document.getElementById('user-avatar-menu');
      const avatarImg = document.getElementById('user-avatar-img');
      const displayName = document.getElementById('user-display-name');
      const displayEmail = document.getElementById('user-display-email');

      if (loginBtn) loginBtn.style.display = 'none';
      if (avatarMenu) avatarMenu.style.display = 'flex';
      if (avatarImg) avatarImg.src = user.photoURL || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
      if (displayName) displayName.textContent = user.displayName || 'Guest';
      if (displayEmail) displayEmail.textContent = user.email || '';

      // Initialize Firestore document
      const { doc, getDoc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
      const userDocRef = doc(this.db, 'users', user.uid);
      let userSnap = await getDoc(userDocRef);
      let userData = {};

      if (!userSnap.exists()) {
        userData = {
          name: user.displayName || 'Guest',
          photoURL: user.photoURL || '',
          email: user.email || '',
          badges: [],
          totalProgressPercent: 0,
          domainProgress: {
            software: 0,
            ece: 0,
            eee: 0,
            mechanical: 0,
            gov: 0
          },
          lastActive: new Date().toISOString(),
          streakDates: [new Date().toDateString()]
        };
        await setDoc(userDocRef, userData);
      } else {
        userData = userSnap.data();
        userData = await this.updateStreak(userDocRef, userData);
      }

      this.renderBadges(userData.badges || []);

      // Synchronize checkboxes
      if (activeRoadmapId) {
        await this.syncRoadmapProgress(activeRoadmapId);
      }
    }

    onUserLoggedOut() {
      localStorage.removeItem('isLoggedIn');
      const loginBtn = document.getElementById('btn-login');
      const avatarMenu = document.getElementById('user-avatar-menu');
      if (loginBtn) loginBtn.style.display = 'inline-flex';
      if (avatarMenu) avatarMenu.style.display = 'none';
    }

    async updateStreak(userDocRef, userData) {
      const { updateDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
      const todayStr = new Date().toDateString();
      let streakDates = userData.streakDates || [];
      
      if (!streakDates.includes(todayStr)) {
        streakDates.push(todayStr);
        const sortedDates = streakDates.map(d => new Date(d)).sort((a,b) => a-b);
        if (sortedDates.length > 15) {
          sortedDates.shift();
        }
        
        const newStreakDates = sortedDates.map(d => d.toDateString());
        let currentStreak = 1;
        
        for (let i = newStreakDates.length - 1; i > 0; i--) {
          const d1 = new Date(newStreakDates[i]);
          const d2 = new Date(newStreakDates[i-1]);
          const diffTime = Math.abs(d1 - d2);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            currentStreak++;
          } else if (diffDays > 1) {
            break;
          }
        }

        let badges = userData.badges || [];
        if (currentStreak >= 7 && !badges.includes('streak-7')) {
          badges.push('streak-7');
          this.triggerBadgeUnlock('streak-7', '🔥 7-Day Streak Badge Unlocked!');
        }

        await updateDoc(userDocRef, {
          streakDates: newStreakDates,
          badges: badges,
          lastActive: new Date().toISOString()
        });
        userData.streakDates = newStreakDates;
        userData.badges = badges;
      }
      return userData;
    }

    renderBadges(badges) {
      const container = document.getElementById('profile-badges-container');
      if (!container) return;
      container.innerHTML = '';
      
      const badgeMeta = {
        'phase-complete': { emoji: '🏆', title: 'Phase Complete' },
        'roadmap-complete': { emoji: '🎓', title: 'Roadmap Complete' },
        'streak-7': { emoji: '🔥', title: '7-Day Streak' },
        'perfect-100': { emoji: '💯', title: 'Perfect Score' }
      };

      badges.forEach(bId => {
        const meta = badgeMeta[bId];
        if (meta) {
          const span = document.createElement('span');
          span.className = 'profile-badge-icon';
          span.title = meta.title;
          span.textContent = meta.emoji;
          container.appendChild(span);
        }
      });
    }

    async syncRoadmapProgress(roadmapId) {
      const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
      const progDocRef = doc(this.db, 'users', this.user.uid, 'progress', roadmapId);
      const progSnap = await getDoc(progDocRef);
      
      let localProg = {};
      const localProgStr = localStorage.getItem(`roadmap-${roadmapId}-progress`);
      if (localProgStr) {
        try { localProg = JSON.parse(localProgStr); } catch(e) {}
      }

      let cloudProg = {};
      if (progSnap.exists()) {
        cloudProg = progSnap.data().checkedTopics || {};
      }

      const mergedProg = { ...localProg, ...cloudProg };
      localStorage.setItem(`roadmap-${roadmapId}-progress`, JSON.stringify(mergedProg));

      const checkboxes = document.querySelectorAll('.topic-checkbox');
      checkboxes.forEach(cb => {
        cb.checked = !!mergedProg[cb.id];
      });
      updateProgressUI();

      await this.saveProgressToCloud(roadmapId, mergedProg);
    }

    async saveProgressToCloud(roadmapId, checkedTopics) {
      if (!this.initialized || !this.user) return;

      try {
        const { doc, setDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
        
        const checkboxes = document.querySelectorAll('.topic-checkbox');
        const totalCount = checkboxes.length;
        const checkedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percent = totalCount > 0 ? Math.round((checkedCount / totalCount) * 100) : 0;

        const progDocRef = doc(this.db, 'users', this.user.uid, 'progress', roadmapId);
        await setDoc(progDocRef, {
          checkedTopics: checkedTopics,
          percent: percent,
          lastUpdated: new Date().toISOString()
        }, { merge: true });

        await this.updateUserProgressMetrics();

        if (percent === 100) {
          await this.checkAndUnlockBadge('roadmap-complete', '🎓 Roadmap Complete Badge Unlocked!');
        }

      } catch (err) {
        console.error("Error saving progress:", err);
      }
    }

    async updateUserProgressMetrics() {
      const { doc, getDocs, collection, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
      
      const progressCollRef = collection(this.db, 'users', this.user.uid, 'progress');
      const querySnap = await getDocs(progressCollRef);
      
      let softwareSum = 0, softwareCount = 0;
      let eceSum = 0, eceCount = 0;
      let eeeSum = 0, eeeCount = 0;
      let mechanicalSum = 0, mechanicalCount = 0;
      let govSum = 0, govCount = 0;
      
      let overallSum = 0;
      let totalRoadmaps = 0;

      const getDomainFromRoadmapId = (rId) => {
        if (rId.startsWith('sw-') || rId.startsWith('software-')) return 'software';
        if (rId.startsWith('ece-')) return 'ece';
        if (rId.startsWith('eee-')) return 'eee';
        if (rId.startsWith('mech-') || rId.startsWith('mechanical-')) return 'mechanical';
        if (rId.startsWith('gov-')) return 'gov';
        return 'software';
      };

      querySnap.forEach(docSnap => {
        const data = docSnap.data();
        const percent = data.percent || 0;
        const domain = getDomainFromRoadmapId(docSnap.id);
        
        overallSum += percent;
        totalRoadmaps++;

        if (domain === 'software') {
          softwareSum += percent;
          softwareCount++;
        } else if (domain === 'ece') {
          eceSum += percent;
          eceCount++;
        } else if (domain === 'eee') {
          eeeSum += percent;
          eeeCount++;
        } else if (domain === 'mechanical') {
          mechanicalSum += percent;
          mechanicalCount++;
        } else if (domain === 'gov') {
          govSum += percent;
          govCount++;
        }
      });

      const overallAvg = totalRoadmaps > 0 ? Math.round(overallSum / totalRoadmaps) : 0;
      const softwareAvg = softwareCount > 0 ? Math.round(softwareSum / softwareCount) : 0;
      const eceAvg = eceCount > 0 ? Math.round(eceSum / eceCount) : 0;
      const eeeAvg = eeeCount > 0 ? Math.round(eeeSum / eeeCount) : 0;
      const mechanicalAvg = mechanicalCount > 0 ? Math.round(mechanicalSum / mechanicalCount) : 0;
      const govAvg = govCount > 0 ? Math.round(govSum / govCount) : 0;

      const userDocRef = doc(this.db, 'users', this.user.uid);
      await updateDoc(userDocRef, {
        totalProgressPercent: overallAvg,
        domainProgress: {
          software: softwareAvg,
          ece: eceAvg,
          eee: eeeAvg,
          mechanical: mechanicalAvg,
          gov: govAvg
        }
      });
    }

    async checkAndUnlockBadge(badgeId, message) {
      if (!this.initialized || !this.user) return;
      try {
        const { doc, getDoc, updateDoc } = await import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js');
        const userDocRef = doc(this.db, 'users', this.user.uid);
        const userSnap = await getDoc(userDocRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          let badges = userData.badges || [];
          if (!badges.includes(badgeId)) {
            badges.push(badgeId);
            await updateDoc(userDocRef, { badges: badges });
            this.triggerBadgeUnlock(badgeId, message);
            this.renderBadges(badges);
          }
        }
      } catch (err) {
        console.error("Error unlocking badge:", err);
      }
    }

    triggerBadgeUnlock(badgeId, message) {
      try {
        if (typeof confetti !== 'undefined') {
          confetti();
        }
      } catch(e) {}

      const toast = document.createElement('div');
      toast.className = 'badge-toast';
      toast.innerHTML = `
        <div class="badge-toast-content">
          <span style="font-size: 2rem;">${badgeId === 'phase-complete' ? '🏆' : badgeId === 'roadmap-complete' ? '🎓' : badgeId === 'streak-7' ? '🔥' : '💯'}</span>
          <div>
            <div style="font-weight: 700; color: #fff; font-size: 0.95rem;">${message}</div>
            <div style="font-size: 0.75rem; color: #a0aec0; margin-top: 0.15rem;">You earned a new achievement!</div>
          </div>
        </div>
      `;
      document.body.appendChild(toast);

      setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 500);
      }, 4000);
    }
  }

  // Inject blocker gate immediately if not logged in previously
  const wasLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!wasLoggedIn) {
    injectLoginGate();
  }

  const isViewerPage = window.location.pathname.endsWith('viewer.html');

  const attachTopicTextListeners = () => {
    document.querySelectorAll('.topic-text').forEach(textEl => {
      if (textEl.getAttribute('data-listener-attached')) return;
      textEl.setAttribute('data-listener-attached', 'true');
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
  };

  // Helper to track mouse coordinate hover glow on premium cards
  const initPremiumCardsMouseTracking = () => {
    document.querySelectorAll('.premium-feature-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
      });
    });
  };

  if (!isViewerPage) {
    initPhaseLocks();
    initMockTests();
    initSmartNotes();
    initDoubtSolver();
    initProgressTracker();
    attachTopicTextListeners();
    initPremiumCardsMouseTracking();
    initDomainCanvasAnimations();
  }

  firebaseManager = new FirebaseSyncManager();
  firebaseManager.init();

  window.addEventListener('roadmap-rendered', () => {
    console.log("Roadmap rendered dynamically, initializing listeners.");
    activeRoadmapId = getRoadmapIdFromPath();
    initPhaseLocks();
    initMockTests();
    initSmartNotes();
    initDoubtSolver();
    initProgressTracker();
    attachTopicTextListeners();
    initDomainCanvasAnimations();
  });
});"""

# Replace index placeholder in app_js_content
app_js_formatted = app_js_content.replace("{js_careers_index_placeholder}", json.dumps(js_careers_index, indent=2))

app_js_filepath = os.path.join(workspace_dir, "app.js")
with open(app_js_filepath, "w", encoding="utf-8") as f:
    f.write(app_js_formatted)
print("[OK] Compiled app.js with global search database.")
print("--- Compilation Complete! ---")
