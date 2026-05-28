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

  initTheme();
  const themeToggle = document.querySelector('.btn-theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // --- Settings Modal and API Key Management ---
  const settingsBtn = document.querySelector('.btn-settings');
  if (settingsBtn) {
    // Ingest DOM settings modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'settings-modal-overlay';
    overlay.id = 'settings-modal-overlay';
    overlay.innerHTML = `
      <div class="settings-modal">
        <div class="settings-modal-header">
          <h3 class="settings-modal-title">\u2699\ufe0f AI Settings</h3>
          <button class="settings-modal-close" id="btn-close-settings">&times;</button>
        </div>
        <div class="settings-modal-body">
          <div class="form-group">
            <label for="input-api-key" style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 500;">Gemini API Key</label>
            <input type="password" id="input-api-key" placeholder="AIzaSy..." style="width: 100%; padding: 0.65rem 0.85rem; border: 1px solid var(--border-color); border-radius: 8px; background: var(--bg-primary); color: var(--text-primary); font-family: inherit; font-size: 0.9rem; box-sizing: border-box;">
            <p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem; line-height: 1.4;">Your API key is saved locally in your browser's localStorage and never sent anywhere except Google's Gemini endpoints.</p>
          </div>
        </div>
        <div class="settings-modal-footer">
          <button class="hero-btn" id="btn-save-settings">Save Config</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const closeBtn = document.getElementById('btn-close-settings');
    const saveBtn = document.getElementById('btn-save-settings');
    const inputKey = document.getElementById('input-api-key');

    const openSettings = () => {
      inputKey.value = localStorage.getItem('gemini_api_key') || '';
      overlay.classList.add('open');
    };

    const closeSettings = () => {
      overlay.classList.remove('open');
    };

    settingsBtn.addEventListener('click', openSettings);
    closeBtn.addEventListener('click', closeSettings);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSettings();
    });

    saveBtn.addEventListener('click', () => {
      const val = inputKey.value.trim();
      if (val) {
        localStorage.setItem('gemini_api_key', val);
      } else {
        localStorage.removeItem('gemini_api_key');
      }
      closeSettings();
    });
  }

  // --- Dynamic Search Portal Engine ---
  const careersIndex = [
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
  const roadmapSearch = document.getElementById('roadmap-search');
  if (roadmapSearch) {
    const searchResultsGrid = document.getElementById('search-results-grid');
    roadmapSearch.addEventListener('input', () => {
      const query = roadmapSearch.value.trim().toLowerCase();
      
      // If empty query, show standard recommended deck, hide fallback
      if (!query) {
        document.querySelectorAll('.card.solid-card').forEach(card => card.style.display = 'flex');
        const fallback = document.getElementById('search-fallback');
        if (fallback) {
          fallback.style.display = 'none';
        }
        return;
      }

      // Hide all standard cards first
      document.querySelectorAll('.card.solid-card').forEach(card => card.style.display = 'none');

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
      let fallback = document.getElementById('search-fallback');
      if (matches.length === 0) {
        if (!fallback) {
          fallback = document.createElement('div');
          fallback.id = 'search-fallback';
          fallback.className = 'search-fallback-card';
          fallback.innerHTML = `
            <h3>No roadmaps found for "<span id="search-query-highlight"></span>"</h3>
            <p>You can generate a custom, premium week-by-week roadmap for this topic using Claude AI!</p>
            <button id="btn-generate-ai" class="hero-btn">Generate with AI \u2728</button>
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

  // --- Phase Lock Manager ---
  const initPhaseLocks = () => {
    if (!roadmapId) return;
    
    const phaseSections = document.querySelectorAll('.phase-section');
    phaseSections.forEach((section, idx) => {
      const phaseNum = parseInt(section.getAttribute('data-phase'));
      if (phaseNum === 1) return; // Phase 1 is always unlocked
      
      const prevPhaseNum = phaseNum - 1;
      const isPrevPassed = localStorage.getItem(`roadmap-${roadmapId}-phase-${prevPhaseNum}-passed`) === 'true';
      
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

  // --- Gemini API Call Core Helper ---
  const askGemini = async (systemPrompt, userPrompt, isJson = false) => {
    const apiKey = localStorage.getItem('gemini_api_key');
    if (!apiKey) {
      throw new Error("API_KEY_MISSING");
    }
    
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [{ text: userPrompt }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      }
    };

    if (isJson) {
      requestBody.generationConfig = {
        responseMimeType: "application/json"
      };
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API_ERROR: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0] && data.candidates[0].content.parts[0].text) {
      return data.candidates[0].content.parts[0].text.trim();
    }
    throw new Error("INVALID_RESPONSE_FORMAT");
  };

  // --- Mock Test Quiz Controller ---
  const initMockTests = () => {
    if (!roadmapId) return;
    
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
        openQuizModal(phaseNum, topics);
      });
    });
  };

  // Helper to open Quiz Modal
  const openQuizModal = (phaseNum, topics) => {
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

    // Fetch quiz questions from Gemini
    const loadQuiz = async () => {
      const apiKey = localStorage.getItem('gemini_api_key');
      if (!apiKey) {
        loadingPanel.innerHTML = `
          <div style="font-size: 0.9rem; color: #e57373; font-weight: 500;">
            Please add your API key in Settings \u2699\ufe0f
          </div>
        `;
        return;
      }

      try {
        const headingEl = document.querySelector('.roadmap-header h1');
        const roadmapTitle = headingEl ? headingEl.textContent.trim() : 'this career path';

        const systemPrompt = "You are an expert examiner. Generate a multiple-choice quiz of exactly 10 questions based on the provided list of topics. Return ONLY a valid JSON array of objects. Each object in the array must have the following keys: 'question' (string), 'options' (array of exactly 4 strings), 'correct' (integer index 0-3 of the correct option), and 'topic' (string matching one of the provided topics).";
        const userPrompt = `Generate 10 MCQ questions for the following phase topics from the "${roadmapTitle}" roadmap:\n${topics.join('\n')}`;

        const reply = await askGemini(systemPrompt, userPrompt, true);
        
        let cleanText = reply.replace(/```json/gi, '').replace(/```/g, '').trim();
        questions = JSON.parse(cleanText);
        
        if (!Array.isArray(questions) || questions.length !== 10) {
          throw new Error("Invalid questions count or structure");
        }

        loadingPanel.style.display = 'none';
        container.style.display = 'block';
        renderQuizState();
      } catch(err) {
        console.error("Failed to load quiz from Gemini:", err);
        loadingPanel.innerHTML = `
          <div style="font-size: 0.9rem; color: #e57373; font-weight: 500;">
            \u26a0\ufe0f Error generating quiz. Please verify your Gemini API key or connection and try again.
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
          localStorage.setItem(`roadmap-${roadmapId}-phase-${phaseNum}-passed`, 'true');
          initPhaseLocks();
          
          try {
            if (typeof confetti !== 'undefined') {
              confetti();
            }
          } catch(e) {}

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
        
        const apiKey = localStorage.getItem('gemini_api_key');
        if (!apiKey) {
          wrapper.innerHTML = `
            <div class="simplified-notes-title">\u2728 Simplified Explanation</div>
            <div style="font-size:0.85rem; color:#e57373; margin-top:0.5rem; font-weight:500;">
              Please add your API key in Settings \u2699\ufe0f
            </div>
          `;
          panel.style.maxHeight = 'none';
          return;
        }
        
        const cacheKey = `roadmap-${roadmapId}-topic-${topic}-simplified`;
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
          const userPrompt = `Summarize the topic "${topic}" in simple, beginner-friendly terms using exactly 5 bullet points. Make it easy to read.`;
          
          const simplified = await askGemini(systemPrompt, userPrompt);
          
          localStorage.setItem(cacheKey, simplified);
          renderSimplifiedNotes(wrapper, simplified);
        } catch(err) {
          console.error("Failed to simplify topic:", err);
          wrapper.innerHTML = `
            <div class="simplified-notes-title">\u2728 Simplified Explanation</div>
            <div style="font-size:0.85rem; color:#e57373; margin-top:0.5rem; font-weight:500;">
              \u26a0\ufe0f Error loading summary. Please verify your API key or connection and try again.
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
    if (!roadmapId) return;
    
    const floatingBtn = document.createElement('button');
    floatingBtn.className = 'ai-doubt-solver-btn';
    floatingBtn.setAttribute('aria-label', 'AI Doubt Solver');
    floatingBtn.innerHTML = `
      <svg viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z"/></svg>
    `;
    document.body.appendChild(floatingBtn);
    
    const headingEl = document.querySelector('.roadmap-header h1');
    const roadmapTitle = headingEl ? headingEl.textContent.trim() : 'this career path';
    
    const chatPanel = document.createElement('div');
    chatPanel.className = 'ai-doubt-solver-panel';
    chatPanel.innerHTML = `
      <div class="ai-chat-header">
        <div class="ai-chat-title">\ud83d\udcac Doubt Solver: ${roadmapTitle}</div>
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
      
      const apiKey = localStorage.getItem('gemini_api_key');
      if (!apiKey) {
        const alertMsg = document.createElement('div');
        alertMsg.className = 'ai-message system-alert';
        alertMsg.innerHTML = `\ud83d\udd11 API Key missing! Please add your API key in Settings \u2699\ufe0f`;
        chatMessages.appendChild(alertMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return;
      }
      
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
        const reply = await askGemini(systemPrompt, query);
        
        loader.remove();
        
        const assistantMsg = document.createElement('div');
        assistantMsg.className = 'ai-message assistant';
        assistantMsg.innerHTML = formatReplyText(reply);
        chatMessages.appendChild(assistantMsg);
      } catch(err) {
        loader.remove();
        const errMsg = document.createElement('div');
        errMsg.className = 'ai-message system-alert';
        errMsg.textContent = `\u26a0\ufe0f Error getting response from Gemini. Please verify your network or API Key and try again.`;
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
  
  // Initialize everything on page load
  initPhaseLocks();
  initMockTests();
  initSmartNotes();
  initDoubtSolver();

  // Attach text toggling panels click listeners
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