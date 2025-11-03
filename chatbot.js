/* chatbot.js
   Final version with all fixes
*/

/* ==========================
   CONFIGURE HERE (top-level)
   ========================== */
const chatbotConfig = {
  botName: "Anwar",
  headerTitle: "Chat with Anwar 🤖",
  welcomeMessage: "Hi! I'm Anwar. How can I help you today?",
  botTypingText: "Anwar is typing...",
  clearingChatText: "Clearing chat...",
  typingDelay: 600,
  contactLinkId: "contact",
  questionsLabel: "Choose a question...",
  notListedText: "❓ Your query not listed? Click here",
  finalContactMessage: "Thanks — your details are submitted. I will get back to you soon.",
  doubleTickDelay: 900,
  persistConversation: false,
  showClearButton: true,
  botAvatar: "img/profile-picture.png",

  // THEME
  theme: {
    headerBg: "#000000",
    headerText: "#ffffff",
    chatBackground: "#f4f4f5",
    userBubbleBg: "#1f1f1f",
    userText: "#ffffff",
    botBubbleBg: "#ffffff",
    botText: "#000000",
    dropdownBg: "#ffffff",
    dropdownText: "#000000",
    buttonBg: "#000000",
    buttonText: "#ffffff",
    widgetShadow: "0 0 30px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4), 0 0 90px rgba(0, 255, 255, 0.2)",
    // fabShadow: "0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4)",
    borderRadius: "14px",
    fabGradient: "linear-gradient(135deg, #1b1b1bff, #5a2dc4ff, #e91717ff, #f72626ff)",
    fabSize: "56px",
    tickColor: "#007bff",
    skipText: "Skip",
    skipTextColor: "#6c757d",
    inputPlaceholder: "Type your message here..."
  },

  // Q&A pairs
faqData: {
  "1️⃣ What kind of roles are you looking for?": `I'm actively looking for
  1️⃣ ReactJS Developer,
  2️⃣ NextJS Developer,
  3️⃣ MERN Stack Developer roles.
  I specialize in MERN Stack development and modern frontend technologies.`,

  "2️⃣ Are you a full-stack developer?": "Yes, I am a Full Stack Web Developer proficient in both frontend and backend development.",

  "3️⃣ Reason for leaving your past organizations?": `1️⃣ Reason for leaving my last organization (Emproto Technologies): Company shutdown.
  2️⃣ Reason for leaving my 1st organization (Vinyasa Tech Solutions): Small company in my native with Tech stack restricted to Core PHP (no React, TypeScript, or Node.js used).`,

  "4️⃣ What technologies do you specialize in?": `1️⃣ Frontend Languages & Frameworks: HTML, CSS, JavaScript, TypeScript, ReactJS, NextJS (App Router, Pages Router, SSR, SSG, ISR).
2️⃣ Frontend Libraries & State Management: React Router, Redux + Thunk, Zustand, Formik, React Hooks, React Query/Tanstack Query, jQuery, AJAX, Axios.
3️⃣ Frontend Styling & UI Frameworks: Bootstrap, Material UI, Shadcn/UI, Tailwind CSS, SASS.
4️⃣ Backend Scripting / Technologies: NodeJS, ExpressJS, Core PHP.
5️⃣ Backend APIs & Integrations: RESTful APIs, Twilio WhatsApp API, Razorpay Payment Gateway.
6️⃣ Databases: MySQL, MongoDB.
7️⃣ Version Control Systems / Repositories: Git, GitHub, Bitbucket.
8️⃣ DevOps & Deployments: Docker, Docker Hub.`,

  "5️⃣ Exp. with API integration and devlpmnt?": "Yes, I’ve built many REST APIs in Node.js and also integrated popular third-party APIs like Razorpay Payment Gateway and Twilio WhatsApp API.",

  "6️⃣ 🎓 What is your educational qualification?": `1️⃣ 🎓MCA (Master of Computer Applications) — 2021 to 2023.
  2️⃣ 🎓BCA (Bachelor of Computer Applications) — 2017 to 2020.`,

  "7️⃣ 📞 What is UR contact / WhatsApp number?": "+91 9972595842",

  "8️⃣ 📧 What is your email address?": "mohammedanwarabbas@gmail.com",

  "9️⃣ 🔗 Do you have a LinkedIn profile?": "https://www.linkedin.com/in/mohammed-anwar-abbas/"
},

  // GOOGLE FORM
  formUrl: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSftjaevhn5NshlCrLGp_W6lNcydGuxJIz0DVCUH3CcMXqXAkw/formResponse",

  // Contact fields mapping with validation
  contactFields: [
    { 
      key: "fullName", 
      label: "Your Name", 
      id: "entry.1563769549", 
      show: true, 
      required: true, 
      skippable: false,
      validate: (value) => ({ valid: true })
    },
    { 
      key: "emailAddress", 
      label: "Email Address", 
      id: "entry.1487511800", 
      show: true, 
      required: true, 
      skippable: false,
      validate: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return { 
            valid: false, 
            message: "Please enter a valid email address (e.g., example@email.com)" 
          };
        }
        return { valid: true };
      }
    },
    { 
      key: "contactNumber", 
      label: "Contact Number", 
      id: "entry.1812610927", 
      show: true, 
      required: false, 
      skippable: true,
      validate: (value) => {
        if (!value || value.toLowerCase() === 'skip') {
          return { valid: true };
        }
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
        if (!phoneRegex.test(value.replace(/\s/g, ''))) {
          return { 
            valid: false, 
            message: "Please enter a valid phone number (e.g., 1234567890 or +911234567890)" 
          };
        }
        return { valid: true };
      }
    },
    { 
      key: "company", 
      label: "Company / Organization", 
      id: "entry.1913643017", 
      show: true, 
      required: false, 
      skippable: true,
      validate: (value) => ({ valid: true })
    },
    { 
      key: "message", 
      label: "Message / Inquiry", 
      id: "entry.2139772844", 
      show: true, 
      required: true, 
      skippable: false,
      validate: (value) => ({ valid: true })
    }
  ],

  welcomeOnOpen: true
};

/* ==========================
   Inject styles
   ========================== */
(function injectChatbotStyles() {
  const t = chatbotConfig.theme;
  const css = `
  /* Overlay when chatbot is open */
  #chatbot-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99998;
    display: none;
  }

  #chatbot-widget-container {
    position: fixed;
    bottom: 10px;
    right: 10px;
    z-index: 99999;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial;
  }

  /* Neon FAB with animation */
  #chatbot-fab {
    width: ${t.fabSize};
    height: ${t.fabSize};
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${t.fabGradient};
    background-size: 400% 400%;
    color: #fff;
    box-shadow: ${t.fabShadow};
    cursor: pointer;
    border: none;
    transition: transform 0.35s ease;
    animation: gradientShift 3s ease infinite, glowPulse 2s ease-in-out infinite;
  }
  
  #chatbot-fab:hover { 
    transform: scale(1.15);
    animation: gradientShift 1.5s ease infinite, glowPulse 1s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  // used to create glowing effect around chabot button
  // @keyframes glowPulse {
  //   0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6), 0 0 60px rgba(0, 255, 255, 0.4); }
  //   50% { box-shadow: 0 0 30px rgba(0, 255, 255, 1), 0 0 60px rgba(0, 255, 255, 0.8), 0 0 90px rgba(0, 255, 255, 0.6); }
  // }

  @keyframes subtleRotate {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(6deg) scale(1.02); }
    100% { transform: rotate(0deg) scale(1); }
  }
  
  #chatbot-fab .fab-inner {
    animation: subtleRotate 4.5s ease-in-out infinite;
    display:flex; align-items:center; justify-content:center;
  }

  /* Chat widget - positioned at bottom-right corner when open */
  #chatbot-widget {
    width: 340px;
    max-width: calc(100vw - 40px);
    height: 520px;
    display: flex;
    flex-direction: column;
    border-radius: 14px 0 0 0; /* Only top-left rounded */
    overflow: hidden;
    box-shadow: ${t.widgetShadow};
    background: ${chatbotConfig.theme.chatBackground};
    position: fixed;
    bottom: 0;
    right: 0;
    z-index: 99999;
  }

  #chatbot-header {
    background: ${chatbotConfig.theme.headerBg};
    color: ${chatbotConfig.theme.headerText};
    padding: 10px 12px;
    display:flex;
    align-items:center;
    gap:8px;
  }
  #chatbot-header .chat-title { font-weight:600; font-size:1rem; flex:1; display:flex; gap:8px; align-items:center;}
  #chatbot-header .chat-title img { width:36px; height:36px; border-radius:50%; object-fit:cover; }
  #chatbot-header .chat-actions { display:flex; gap:8px; align-items:center; }
  #chatbot-header button { background:transparent; border:none; color:inherit; cursor:pointer; font-size:1rem; }

  #chatbot-header .chat-close { 
      font-size: 1.5rem; 
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background: ${chatbotConfig.theme.botBubbleBg}; 
      color: ${chatbotConfig.theme.botText}; 
      border-radius: 6px; 
      padding: 0;
  }

  #chatbot-messages {
    padding: 12px;
    flex: 1;
    overflow-y: auto;
    display:flex;
    flex-direction:column;
    gap: 10px;
    background: ${chatbotConfig.theme.chatBackground};
  }
  
  /* Action buttons container */
  #chatbot-actions-container {
    padding: 8px 12px;
    display: flex;
    gap: 8px;
    background: ${chatbotConfig.theme.chatBackground};
    border-top: 1px solid rgba(0,0,0,0.05);
    margin-bottom: 3rem;
  }

  .chat-action-btn {
    flex: 1;
    background: rgba(0,0,0,0.05); 
    border: 1px solid rgba(0,0,0,0.1);
    color: ${chatbotConfig.theme.dropdownText};
    padding: 8px 12px;
    border-radius: 8px; 
    cursor: pointer;
    font-size: 0.8rem;
    transition: background 0.2s ease;
    text-align: center;
  }
  
  .chat-action-btn:hover { 
    background: rgba(0,0,0,0.1); 
  }

  .msg-row { display:flex; align-items:flex-end; gap:8px; }
  .msg-row.bot { justify-content:flex-start; }
  .msg-row.user { justify-content:flex-end; }

  .bubble {
    max-width: 78%;
    padding: 10px 12px;
    border-radius: 14px;
    font-size: 0.95rem;
    line-height:1.2;
    box-shadow: 0 1px 0 rgba(0,0,0,0.02);
    word-wrap: break-word;
    white-space: pre-wrap;
    position: relative;
    display: flex; 
    flex-direction: column;
  }

  .bubble.bot {
    background: ${chatbotConfig.theme.botBubbleBg};
    color: ${chatbotConfig.theme.botText};
    border-radius: 14px 14px 14px 6px;
  }

  .bubble.user {
    background: ${chatbotConfig.theme.userBubbleBg};
    color: ${chatbotConfig.theme.userText};
    border-radius: 14px 14px 6px 14px;
  }

  .bubble-content {
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
      white-space: pre-wrap;
      word-break: break-word;
      max-width: 100%; 
  }

  .bubble.user .bubble-text { 
      flex: 1; 
      text-align: left;
      word-wrap: break-word; 
      white-space: pre-wrap;
      padding-right: 4px;
      min-width: 50px;
  }

  .bubble .tick {
    display:inline-block;
    margin-left:4px; 
    font-size:0.8rem; 
    opacity:0.95;
    color: ${chatbotConfig.theme.tickColor};
    align-self: flex-end; 
    flex-shrink: 0; 
  }

  .typing-indicator {
    display:inline-flex;
    align-items:center;
    gap:8px;
    opacity:0.85;
    font-size:0.95rem;
  }

  .typing-dots { width:28px; display:inline-flex; gap:4px; align-items:center; }
  .typing-dots > span { display:inline-block; width:6px; height:6px; background:#bbb; border-radius:50%; transform: translateY(0); animation: blink 1s infinite; }
  .typing-dots > span:nth-child(2){ animation-delay: .15s;}
  .typing-dots > span:nth-child(3){ animation-delay: .3s;}
  @keyframes blink { 0%{ opacity: 0.25; transform: translateY(0);} 50%{ opacity: 1; transform: translateY(-4px);} 100%{ opacity: 0.25; transform: translateY(0);} }

  #chatbot-bottom {
    padding: 10px;
    display:flex;
    gap:8px;
    align-items:center;
    background: transparent;
    border-top: 1px solid rgba(0,0,0,0.05);
    min-height: 50px; /* Fixed height for bottom area */
  }

  /* FIXED: Select dropdown with proper sizing */
  #chatbot-select {
    flex: 1;
    min-width: 0; /* Allow shrinking */
    max-width: calc(100% - 50px); /* Reserve space for send button */
    border-radius: 8px;
    padding: 8px 10px;
    border: 1px solid rgba(0,0,0,0.08);
    background: ${chatbotConfig.theme.dropdownBg};
    color: ${chatbotConfig.theme.dropdownText};
    font-size: 0.95rem;
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #chatbot-input {
    flex: 1;
    min-width: 0;
    max-width: calc(100% - 50px);
    border-radius: 8px;
    padding: 8px 10px;
    border: 1px solid rgba(0,0,0,0.08);
    background: ${chatbotConfig.theme.dropdownBg};
    color: ${chatbotConfig.theme.dropdownText};
    font-size: 0.95rem;
  }

  #chatbot-send-btn {
    background: ${chatbotConfig.theme.buttonBg};
    color: ${chatbotConfig.theme.buttonText};
    border: none;
    border-radius: 8px;
    padding: 8px 12px;
    min-width: 40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.15s ease;
    flex-shrink: 0; /* Prevent shrinking */
  }
  #chatbot-send-btn:hover { transform: scale(1.06); }

  @media (max-width: 576px){
    #chatbot-widget { 
      width: 100vw; 
      height: 95vh; /* Reduced from 100vh to 90vh */
      max-width: none;
      border-radius: 0;
      top: 5vh; /* Space only at top */
      bottom: 0; /* Stick to bottom edge */
      right: 0;
    }
    #chatbot-messages { 
      flex: 1;
      padding-bottom: 0;
    }
    #chatbot-bottom {
      padding: 8px 10px;
      min-height: 45px;
    }
    #chatbot-select, #chatbot-input {
      max-width: calc(100% - 45px);
      font-size: 0.9rem;
      padding: 6px 8px;
    }
    #chatbot-send-btn {
      padding: 6px 10px;
      min-width: 35px;
    }
    #chatbot-fab { width:48px; height:48px; }
  }
  `;
  const styleTag = document.createElement("style");
  styleTag.id = "chatbot-generated-styles";
  styleTag.innerHTML = css;
  document.head.appendChild(styleTag);
})();

/* ===========================
   Create DOM structure
   =========================== */
(function createChatbotDOM() {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.id = "chatbot-overlay";
  document.body.appendChild(overlay);

  const container = document.createElement("div");
  container.id = "chatbot-widget-container";

  const fab = document.createElement("button");
  fab.id = "chatbot-fab";
  fab.setAttribute("aria-label", "Open chat");
  fab.title = "Chat with Anwar";
  fab.innerHTML = `<span class="fab-inner"><i class="bi bi-chat-text-fill" style="font-size:22px;"></i></span>`;

  const widget = document.createElement("div");
  widget.id = "chatbot-widget";
  widget.style.display = "none";

  const header = document.createElement("div");
  header.id = "chatbot-header";
  const avatarImg = chatbotConfig.botAvatar ? `<img src="${chatbotConfig.botAvatar}" alt="${chatbotConfig.botName}">` : "";
  header.innerHTML = `
    <div class="chat-title">${avatarImg}<span>${chatbotConfig.headerTitle}</span></div>
    <div class="chat-actions">
      <button class="chat-close" aria-label="Close chat" title="Close chat">&times;</button>
    </div>
  `;

  const messages = document.createElement("div");
  messages.id = "chatbot-messages";
  messages.setAttribute("aria-live", "polite");

  const bottom = document.createElement("div");
  bottom.id = "chatbot-bottom";

  const select = document.createElement("select");
  select.id = "chatbot-select";
  const placeholderOption = document.createElement("option");
  placeholderOption.value = "";
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  placeholderOption.textContent = chatbotConfig.questionsLabel;
  select.appendChild(placeholderOption);

  const faqKeys = Object.keys(chatbotConfig.faqData || {});
  faqKeys.forEach((q) => {
    const opt = document.createElement("option");
    opt.value = q;
    opt.textContent = q;
    select.appendChild(opt);
  });

  const notListedOption = document.createElement("option");
  notListedOption.value = "__NOT_LISTED__";
  notListedOption.textContent = chatbotConfig.notListedText;
  select.appendChild(notListedOption);

  const sendBtn = document.createElement("button");
  sendBtn.id = "chatbot-send-btn";
  sendBtn.setAttribute("aria-label", "Send question");
  sendBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
      <path d="M15.854.146a.5.5 0 0 0-.556-.112L.5 7.5l7 7a.5.5 0 0 0 .854-.353V9.207l6.827-7.06a.5.5 0 0 0-.327-.999z"/>
    </svg>
  `;

  bottom.appendChild(select);
  bottom.appendChild(sendBtn);

  // Actions container with both buttons
  const actionsContainer = document.createElement("div");
  actionsContainer.id = "chatbot-actions-container";
  if (chatbotConfig.showClearButton) {
      actionsContainer.innerHTML = `
        <button id="chat-clear-btn" class="chat-action-btn" title="Clear chat and restart conversation">Clear Chat</button>
        <button id="chat-exit-btn" class="chat-action-btn" title="Close chat">Exit Chat</button>
      `;
  }

  // Assemble widget
  widget.appendChild(header);
  widget.appendChild(messages);
  widget.appendChild(bottom);
  widget.appendChild(actionsContainer);

  container.appendChild(fab);
  container.appendChild(widget);
  document.body.appendChild(container);

  window.__chatbot = {
    container,
    fab,
    widget,
    header,
    messages,
    select,
    sendBtn,
    overlay: document.getElementById('chatbot-overlay')
  };
})();

/* ===========================
   Chatbot behavior
   =========================== */
(function setupChatbotBehavior() {
  const { fab, widget, header, messages, select, sendBtn, overlay } = window.__chatbot;
  const cfg = chatbotConfig;
  const STORAGE_KEY = "chatbot_conversation_v2";

  const state = {
    customMode: false,
    currentFieldIndex: -1,
    collected: {},
    awaitingInput: false
  };

  function appendMessage({ from = "bot", text = "", isTyping = false, skipSave = false }) {
    const row = document.createElement("div");
    row.className = `msg-row ${from === "user" ? "user" : "bot"}`;

    const bubble = document.createElement("div");
    bubble.className = "bubble " + (from === "user" ? "user" : "bot");

    if (isTyping) {
      bubble.innerHTML = `
        <div class="typing-indicator">
          <div class="typing-dots">
            <span></span><span></span><span></span>
          </div>
          <div style="font-size:0.95rem; opacity:0.9; margin-left:6px">${cfg.botTypingText}</div>
        </div>`;
    } else {
      bubble.innerHTML = `<span class="bubble-content"><span class="bubble-text">${sanitize(text)}</span></span>`;
    }

    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight - messages.clientHeight + 60;

    if (!skipSave && cfg.persistConversation) saveConversationToSession();
    return { row, bubble };
  }

  function sanitize(str) {
    if (!str && str !== "") return "";
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function appendUserMessageWithTicks(text) {
    const { row, bubble } = appendMessage({ from: "user", text: text });
    
    const contentWrapper = bubble.querySelector('.bubble-content');
    const tickSpan = document.createElement("span");
    tickSpan.className = "tick single-tick";
    tickSpan.innerHTML = "✓";
    contentWrapper.appendChild(tickSpan);

    setTimeout(() => {
      tickSpan.innerHTML = "✓✓";
    }, cfg.doubleTickDelay || 900);
    return { row, bubble, tickSpan };
  }

  function saveConversationToSession() {
    if (!cfg.persistConversation) return;
    const nodes = Array.from(messages.querySelectorAll(".msg-row")).map((nr) => ({
      side: nr.classList.contains("user") ? "user" : "bot",
      html: nr.querySelector(".bubble-text").innerHTML || ""
    }));
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(nodes));
    } catch (e) {}
  }

  function loadConversationFromSession() {
    if (!cfg.persistConversation) return;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const arr = JSON.parse(raw);
      arr.forEach((m) => appendMessage({ from: m.side, text: m.html, skipSave: true }));
    } catch (e) {}
  }

  function showBotReply(targetBubble, replyText) {
    targetBubble.innerHTML = `<span class="bubble-content"><span class="bubble-text">${sanitize(replyText)}</span></span>`;
    if (cfg.persistConversation) saveConversationToSession();
    messages.scrollTop = messages.scrollHeight - messages.clientHeight + 60;
  }

  function resetBottomToSelect() {
    if (document.getElementById("chatbot-select")) {
      const sel = document.getElementById("chatbot-select");
      sel.selectedIndex = 0;
      sel.focus();
      state.awaitingInput = false;
      return;
    }
    
    const bottom = document.getElementById("chatbot-bottom");
    const input = document.getElementById("chatbot-input");
    if (input) input.remove();
    
    const sel = document.createElement("select");
    sel.id = "chatbot-select";
    const placeholderOption = document.createElement("option");
    placeholderOption.value = "";
    placeholderOption.disabled = true;
    placeholderOption.selected = true;
    placeholderOption.textContent = cfg.questionsLabel;
    sel.appendChild(placeholderOption);
    
    Object.keys(cfg.faqData || {}).forEach((q) => {
      const opt = document.createElement("option");
      opt.value = q;
      opt.textContent = q;
      sel.appendChild(opt);
    });
    
    const notListedOption = document.createElement("option");
    notListedOption.value = "__NOT_LISTED__";
    notListedOption.textContent = cfg.notListedText;
    sel.appendChild(notListedOption);
    
    bottom.insertBefore(sel, document.getElementById("chatbot-send-btn"));
    sel.addEventListener("keydown", selectKeyHandler);
    sel.focus();
    state.awaitingInput = false;
  }

  function switchSelectToInput(placeholder) {
    if (document.getElementById("chatbot-input")) {
      document.getElementById("chatbot-input").placeholder = placeholder;
      document.getElementById("chatbot-input").focus();
      return;
    }
    
    const bottom = document.getElementById("chatbot-bottom");
    const sel = document.getElementById("chatbot-select");
    if (!sel) return;
    
    const input = document.createElement("input");
    input.id = "chatbot-input";
    input.type = "text";
    input.placeholder = placeholder || cfg.theme.inputPlaceholder;
    input.autocomplete = "off";
    input.addEventListener("keydown", function (ev) {
      if (ev.key === "Enter") {
        ev.preventDefault();
        document.getElementById("chatbot-send-btn").click();
      }
    });
    
    bottom.insertBefore(input, document.getElementById("chatbot-send-btn"));
    sel.remove();
    input.focus();
    state.awaitingInput = true;
  }

  function handleSend() {
    const inputElem = document.getElementById("chatbot-input");
    if (inputElem) {
      const val = inputElem.value.trim();
      if (!val) return;
      
      appendUserMessageWithTicks(val);
      
      if (state.customMode) {
        const currentField = cfg.contactFields[state.currentFieldIndex];
        if (currentField) {
          const skipLower = (cfg.theme.skipText || "Skip").toLowerCase();
          if (currentField.skippable && val.toLowerCase() === skipLower) {
            state.collected[currentField.key] = "";
            inputElem.value = "";
            askNextContactField();
            return;
          }
          
          const validation = currentField.validate(val);
          if (!validation.valid) {
            const typing = appendMessage({ from: "bot", isTyping: true });
            setTimeout(() => {
              showBotReply(typing.bubble, validation.message);
              inputElem.value = "";
              inputElem.focus();
            }, cfg.typingDelay || 600);
            return;
          }
          
          state.collected[currentField.key] = val;
          inputElem.value = "";
          askNextContactField();
          return;
        }
      } else {
        const typing = appendMessage({ from: "bot", isTyping: true });
        setTimeout(() => showBotReply(typing.bubble, "Thanks — I'll look into that."), cfg.typingDelay || 600);
        resetBottomToSelect();
        return;
      }
    }

    const sel = document.getElementById("chatbot-select");
    if (!sel) return;
    const selected = sel.value;
    if (!selected) return;

    if (selected === "__NOT_LISTED__") {
      state.customMode = true;
      state.currentFieldIndex = -1;
      state.collected = {};
      
      appendUserMessageWithTicks(cfg.notListedText);
      
      const typing = appendMessage({ from: "bot", isTyping: true });
      setTimeout(() => {
        showBotReply(typing.bubble, "No problem — I will collect a few details to connect you. You can type 'Skip' to skip optional fields.");
        askNextContactField();
      }, cfg.typingDelay || 600);
      
      sel.selectedIndex = 0;
      return;
    }

    appendUserMessageWithTicks(selected);
    const { bubble } = appendMessage({ from: "bot", isTyping: true });
    setTimeout(() => {
      const answer = cfg.faqData[selected] || "Sorry, I don't have an answer for that right now.";
      showBotReply(bubble, answer);
    }, cfg.typingDelay || 600);

    sel.selectedIndex = 0;
  }

  function askNextContactField() {
    state.currentFieldIndex++;
    
    if (state.currentFieldIndex >= cfg.contactFields.length) {
      const typing = appendMessage({ from: "bot", isTyping: true });
      setTimeout(() => {
        showBotReply(typing.bubble, "Submitting your information...");
        submitCollectedToGoogleForm();
      }, cfg.typingDelay || 600);
      return;
    }
    
    const currentField = cfg.contactFields[state.currentFieldIndex];
    const prompt = currentField.label + (currentField.skippable ? ` (or type '${cfg.theme.skipText}')` : "");
    const typing = appendMessage({ from: "bot", isTyping: true });
    
    setTimeout(() => {
      showBotReply(typing.bubble, prompt);
      switchSelectToInput(prompt);
    }, cfg.typingDelay || 600);
  }

  function submitCollectedToGoogleForm() {
    console.log("Submitting collected data:", state.collected);
    
    const formData = new FormData();
    
    cfg.contactFields.forEach((field) => {
      const value = state.collected[field.key] || "";
      console.log(`Submitting field: ${field.key} = "${value}" to ID: ${field.id}`);
      formData.append(field.id, value);
    });

    fetch(cfg.formUrl, {
      method: "POST",
      body: formData,
      mode: "no-cors",
    })
      .then(() => {
        console.log("Form submission successful ==============");
        
        const typing = appendMessage({ from: "bot", isTyping: true });
        setTimeout(() => {
          showBotReply(typing.bubble, cfg.finalContactMessage || "Thanks — we'll reach out soon.");
          
          state.customMode = false;
          state.currentFieldIndex = -1;
          state.collected = {};
          resetBottomToSelect();
        }, cfg.typingDelay || 600);
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        
        const typing = appendMessage({ from: "bot", isTyping: true });
        setTimeout(() => {
          showBotReply(typing.bubble, "There was a network issue. Please check your connection and try again.");
          
          state.customMode = false;
          state.currentFieldIndex = -1;
          state.collected = {};
          resetBottomToSelect();
        }, cfg.typingDelay || 600);
      });
  }

  function clearConversation() {
    const clearingMsg = appendMessage({ from: "bot", text: cfg.clearingChatText || "Clearing chat..." });
    
    setTimeout(() => {
      messages.innerHTML = "";
      state.customMode = false;
      state.currentFieldIndex = -1;
      state.collected = {};
      resetBottomToSelect();
      
      if (cfg.persistConversation) sessionStorage.removeItem(STORAGE_KEY);
      
      if (cfg.welcomeOnOpen) {
        const welcomeBubble = appendMessage({ from: "bot", isTyping: true });
        setTimeout(() => {
          showBotReply(welcomeBubble.bubble, cfg.welcomeMessage || "");
        }, cfg.typingDelay || 600);
      }
    }, 800);
  }

  function closeChat() {
    widget.style.display = "none";
    fab.style.display = "flex";
    overlay.style.display = "none";
  }

  function selectKeyHandler(ev) {
    if (ev.key === "Enter") {
      ev.preventDefault();
      document.getElementById("chatbot-send-btn").click();
    }
  }

  function openChat() {
    widget.style.display = "flex";
    fab.style.display = "none";
    overlay.style.display = "block";
    loadConversationFromSession();
    
    const hasMessages = messages.querySelectorAll(".msg-row").length > 0;
    if (cfg.welcomeOnOpen && !hasMessages) {
      if (cfg.welcomeMessage) {
        const welcomeBubble = appendMessage({ from: "bot", isTyping: true });
        setTimeout(() => {
          showBotReply(welcomeBubble.bubble, cfg.welcomeMessage);
        }, cfg.typingDelay || 600);
      }
    }
    
    setTimeout(() => {
      const sel = document.getElementById("chatbot-select");
      if (sel) sel.focus();
      const inp = document.getElementById("chatbot-input");
      if (inp) inp.focus();
    }, 200);
  }

  // Event listeners
  fab.addEventListener("click", openChat);
  header.querySelector(".chat-close").addEventListener("click", closeChat);
  overlay.addEventListener("click", closeChat);
  sendBtn.addEventListener("click", handleSend);

  const clearBtn = document.getElementById("chat-clear-btn");
  if (clearBtn) clearBtn.addEventListener("click", clearConversation);

  const exitBtn = document.getElementById("chat-exit-btn");
  if (exitBtn) exitBtn.addEventListener("click", closeChat);

  select.addEventListener("keydown", selectKeyHandler);

  window.chatbotSendMessage = function (questionText) {
    if (!questionText) return;
    if (widget.style.display !== "flex") openChat();
    
    appendUserMessageWithTicks(questionText);
    const { bubble } = appendMessage({ from: "bot", isTyping: true });
    setTimeout(() => {
      const answer = cfg.faqData[questionText] || "Sorry, I don't have an answer for that right now.";
      showBotReply(bubble, answer);
    }, cfg.typingDelay || 600);
  };

  fab.addEventListener("click", () => {
    setTimeout(() => {
      const sel = document.getElementById("chatbot-select");
      if (sel) sel.focus();
      const inp = document.getElementById("chatbot-input");
      if (inp) inp.focus();
    }, 300);
  });

  const obs = new MutationObserver(() => {
    messages.scrollTop = messages.scrollHeight - messages.clientHeight + 60;
  });
  obs.observe(messages, { childList: true, subtree: true });

  closeChat();
  const sel = document.getElementById("chatbot-select");
  if (sel) sel.selectedIndex = 0;
})();