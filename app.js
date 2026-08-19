document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. THEME TOGGLING (DARK / LIGHT MODE)
  // ==========================================
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Sync theme with localStorage or system preferences
  const savedTheme = localStorage.getItem('theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'light') {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
  } else if (savedTheme === 'dark' || systemPrefersDark) {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
  }

  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }
  });

  // ==========================================
  // 2. LIVE DASHBOARD STREAM SIMULATION
  // ==========================================
  const consoleLogs = document.getElementById('console-logs');
  const statIps = document.getElementById('stat-ips');
  const statHeals = document.getElementById('stat-heals');

  const logTemplates = [
    { type: 'info', text: 'Initiated session rotation for host: linkedin.com' },
    { type: 'info', text: 'Allocated residential node IP: 104.244.73.18' },
    { type: 'warn', text: 'Cloudflare TLS signature challenge detected.' },
    { type: 'info', text: 'Applying JA3 TLS fingerprint match...' },
    { type: 'success', text: 'Challenge resolved. HTTP/2 stream established.' },
    { type: 'warn', text: 'Target selector ".job-card-title" returned 0 nodes. Structural shift suspected.' },
    { type: 'info', text: 'Auto-healing: Mapping target path using DOM tree similarity metrics...' },
    { type: 'success', text: 'Selector restored! Found match at "div[class*=\'job-card-container\'] h3"' },
    { type: 'success', text: 'Ingested 24 job listings. Pushing data payload.' }
  ];

  let logIndex = 0;
  let simulatedIpsCount = 24912;
  let simulatedHealsCount = 1402;

  function addLogLine() {
    if (!consoleLogs) return;

    // Keep console logs limited to 12 items
    if (consoleLogs.children.length > 12) {
      consoleLogs.removeChild(consoleLogs.firstChild);
    }

    const timestamp = new Date().toLocaleTimeString();
    const log = logTemplates[logIndex];
    
    let levelClass = 'console-level-info';
    let levelText = '[INFO]';
    if (log.type === 'warn') {
      levelClass = 'console-level-warn';
      levelText = '[WARN]';
    } else if (log.type === 'success') {
      levelClass = 'console-level-success';
      levelText = '[SUCCESS]';
    }

    const logRow = document.createElement('div');
    logRow.className = 'console-row';
    logRow.innerHTML = `<span class="console-timestamp">${timestamp}</span><span class="${levelClass}">${levelText}</span> <span class="console-text">${log.text}</span>`;
    consoleLogs.appendChild(logRow);
    consoleLogs.scrollTop = consoleLogs.scrollHeight;

    // Advance index
    logIndex = (logIndex + 1) % logTemplates.length;

    // Randomize some stats slightly
    if (Math.random() > 0.7) {
      simulatedIpsCount += Math.floor(Math.random() * 5) - 2;
      statIps.textContent = Number(simulatedIpsCount).toLocaleString();
    }
    if (log.type === 'success' && log.text.includes('Selector restored') && Math.random() > 0.5) {
      simulatedHealsCount++;
      statHeals.textContent = Number(simulatedHealsCount).toLocaleString();
    }
  }

  // Populate initial logs quickly, then stream
  for (let i = 0; i < 6; i++) {
    addLogLine();
  }
  setInterval(addLogLine, 3500);


  // ==========================================
  // 3. INTERACTIVE SANDBOX SIMULATOR
  // ==========================================
  const sandboxUrlInput = document.getElementById('sandbox-url');
  const sandboxRunBtn = document.getElementById('sandbox-run-btn');
  const sandboxTrace = document.getElementById('sandbox-trace');
  const sandboxJsonOutput = document.getElementById('sandbox-json-output');
  const jsonStatus = document.getElementById('json-status');

  const traceSteps = [
    { text: 'Resolving domain name & matching proxy subnet...', type: 'pending' },
    { text: 'Routing connection via residential node: US-East-4', type: 'success' },
    { text: 'Spoofing browser signature & user-agent headers', type: 'success' },
    { text: 'Verifying TLS signature integrity against Target WAF', type: 'success' },
    { text: 'Page body loaded (248.4 KB). Executing selector queries...', type: 'success' },
    { text: 'Class name change detected. Launching selector heuristic matching...', type: 'pending' },
    { text: 'Self-healed: DOM selector updated from ".job-title" to ".jobs-search-results__list-item h3"', type: 'success' },
    { text: 'Clean job structure extracted successfully.', type: 'success' }
  ];

  const mockJobsJson = [
    {
      "title": "Senior Frontend Developer",
      "company": "Acdyon Technologies",
      "salary": "$120,000 - $150,000",
      "location": "Remote",
      "source": "LinkedIn (Mock)"
    },
    {
      "title": "Staff Ingestion Engineer",
      "company": "DataFlow Corp",
      "salary": "$160,000",
      "location": "New York, NY",
      "source": "LinkedIn (Mock)"
    },
    {
      "title": "Developer Relations Engineer",
      "company": "API Layer",
      "salary": "$110,000",
      "location": "San Francisco, CA",
      "source": "LinkedIn (Mock)"
    }
  ];

  if (sandboxRunBtn) {
      sandboxRunBtn.addEventListener('click', () => {
        // Prevent multiple parallel runs
        if (sandboxRunBtn.disabled) return;

        const targetUrl = sandboxUrlInput.value.trim() || 'https://linkedin.com/jobs';
        sandboxRunBtn.disabled = true;
        sandboxRunBtn.textContent = 'Ingesting...';
        
        // Hide download button during execution
        if (downloadBtn) downloadBtn.style.display = 'none';

        // Clear previous outputs
        sandboxTrace.innerHTML = '';
        sandboxJsonOutput.textContent = '{\n  "status": "processing"\n}';
        jsonStatus.textContent = 'Running';
        jsonStatus.className = 'status-indicator-badge running';

        let step = 0;
        function runNextStep() {
          if (step < traceSteps.length) {
            const currentStep = traceSteps[step];
            const traceItem = document.createElement('li');
            traceItem.className = 'trace-item';
            
            let icon = '⚡';
            if (currentStep.type === 'success') icon = '✓';
            if (currentStep.type === 'pending') icon = '⚙';

            traceItem.innerHTML = `<span class="trace-icon ${currentStep.type}">${icon}</span><span class="trace-text">${currentStep.text}</span>`;
            sandboxTrace.appendChild(traceItem);
            sandboxTrace.scrollTop = sandboxTrace.scrollHeight;
            
            step++;
            setTimeout(runNextStep, 900);
          } else {
            // Finished successfully
            sandboxRunBtn.disabled = false;
            sandboxRunBtn.textContent = 'Ingest Page';
            jsonStatus.textContent = 'Completed';
            jsonStatus.className = 'status-indicator-badge completed';
            
            // Show download button
            if (downloadBtn) downloadBtn.style.display = 'inline-block';

            // Print formatted JSON
            sandboxJsonOutput.textContent = JSON.stringify(mockJobsJson, null, 2);
          }
        }

        runNextStep();
      });
  }


  // ==========================================
  // 4. EASTER EGG RETRO TERMINAL & KONAMI CODE
  // ==========================================
  const logo = document.getElementById('navbar-logo');
  const retroTerminal = document.getElementById('retro-terminal');
  const closeTerminal = document.getElementById('close-terminal');
  const terminalInput = document.getElementById('terminal-input');
  const terminalBody = document.getElementById('terminal-body');

  let logoClicks = 0;
  
  // Clicking logo 5 times opens terminal
  if (logo) {
    logo.addEventListener('click', (e) => {
      // If header is clicked, do not navigate immediately
      logoClicks++;
      if (logoClicks >= 5) {
        e.preventDefault();
        openRetroTerminal();
        logoClicks = 0;
      }
    });
  }

  // Konami Code detector
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 
    'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 
    'ArrowLeft', 'ArrowRight', 
    'b', 'a'
  ];
  let konamiIndex = 0;

   document.addEventListener('keydown', (e) => {
     // Toggle terminal with backtick/tilde (`) key
     if (e.key === '`') {
       e.preventDefault();
       if (retroTerminal.classList.contains('hidden')) {
         openRetroTerminal();
       } else {
         closeRetroTerminal();
       }
       return;
     }

     if (e.key === konamiCode[konamiIndex]) {
       konamiIndex++;
       if (konamiIndex === konamiCode.length) {
         openRetroTerminal();
         konamiIndex = 0;
       }
     } else {
       konamiIndex = 0;
     }
   });

  function openRetroTerminal() {
    if (retroTerminal) {
      retroTerminal.classList.remove('hidden');
      terminalInput.focus();
    }
  }

  function closeRetroTerminal() {
    if (retroTerminal) {
      retroTerminal.classList.add('hidden');
    }
  }

  if (closeTerminal) {
    closeTerminal.addEventListener('click', closeRetroTerminal);
  }

  // Handle Terminal input commands
  if (terminalInput) {
    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmd = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';
        executeTerminalCommand(cmd);
      }
    });
  }

  function printToTerminal(text, isError = false) {
    const outputContainer = terminalBody.querySelector('.terminal-output') || terminalBody;
    const p = document.createElement('p');
    if (isError) {
      p.className = 'terminal-err';
    }
    p.innerHTML = text;
    
    // Insert before the input line
    const inputLine = terminalBody.querySelector('.terminal-input-line');
    terminalBody.insertBefore(p, inputLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function executeTerminalCommand(cmd) {
    printToTerminal(`<span class="terminal-prompt">acdyon$</span> ${cmd}`);

    if (cmd === '') return;

    switch (cmd) {
      case 'help':
        printToTerminal('Available commands:<br>' +
          '  <span class="highlight-text">decisions</span>        Show decisions made in the submission design.<br>' +
          '  <span class="highlight-text">system-diagnose</span>  Scan API and check residency nodes status.<br>' +
          '  <span class="highlight-text">hack</span>             Run matrix-like aesthetic overlay.<br>' +
          '  <span class="highlight-text">clear</span>            Clear terminal history.<br>' +
          '  <span class="highlight-text">exit</span>             Exit the retro terminal.');
        break;

      case 'decisions':
        printToTerminal('=== DECISIONS SUMMARY ===<br>' +
          'Ingestion Strategy chosen: Stealth Dynamic Mocking instead of static selectors.<br>' +
          'Trade-offs: Vanilla HTML/CSS over Next.js to maximize layout control and raw rendering speeds.<br>' +
          'AI usage: Used as a coding partner for layout checks and sandbox logic structures.');
        break;

      case 'system-diagnose':
        printToTerminal('Diagnosing node structures...<br>' +
          'Residential node subnets: ACTIVE (24,912 nodes operational).<br>' +
          'Fingerprint database: 184 profiles loaded.<br>' +
          'Self-healing system mapping rules: OK.<br>' +
          'Overall status: OPERATIONAL.');
        break;

      case 'hack':
        printToTerminal('Initializing matrix bypass stream... Success.<br>' +
          'Accessing mainframes... bypass credentials generated.<br>' +
          'Congratulations: Easter Egg uncovered properly!');
        break;

      case 'clear':
        const outputs = terminalBody.querySelectorAll('p');
        outputs.forEach(el => el.remove());
        break;

      case 'exit':
        closeRetroTerminal();
        break;

      default:
        printToTerminal(`Command not found: "${cmd}". Type "help" for a list of commands.`, true);
        break;
    }
  }

  // ==========================================
  // 5. ADDITIONAL PREMIUM INTERACTIONS
  // ==========================================

  // A. Vercel-style Spotlight Hover Effect on cards
  const spotlightCards = document.querySelectorAll('.dashboard-card, .feature-card');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // B. Copy Code Button
  const copyBtn = document.getElementById('hero-copy-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const codeText = `import { AcdyonIngest } from '@acdyon/ingest';
const client = new AcdyonIngest({
  apiKey: process.env.ACDYON_KEY,
  behavior: 'stealth-dynamic'
});
const data = await client.extract({
  url: 'https://linkedin.com/jobs/search',
  schema: {
    title: '.job-card-title',
    company: '.company-name',
    salary: '.salary-range'
  },
  options: {
    rotateFingerprint: true,
    solveCaptchas: true,
    autoHealSelectors: true
  }
});`;
      navigator.clipboard.writeText(codeText).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 2000);
      });
    });
  }

  // C. Download Schema Action (Sandbox)
  const downloadBtn = document.getElementById('sandbox-download-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      const jsonContent = JSON.stringify(mockJobsJson, null, 2);
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'acdyon-ingest-schema.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Hook button reveal into trace loading state
  const originalRunBtnHandler = sandboxRunBtn.onclick; // wait, sandboxRunBtn is handled via eventListener, let's update it in app.js
});

