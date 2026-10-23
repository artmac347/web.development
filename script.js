const progressBar = document.getElementById("progress");
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

const updateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};

window.addEventListener("scroll", updateProgress);
window.addEventListener("load", updateProgress);

menuBtn.addEventListener("click", () => {
  nav.classList.toggle("open");
  const expanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", String(!expanded));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -30px 0px"
  }
);

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

const codeLines = [
  "<!DOCTYPE html>",
  "<html lang='en'>",
  "  <head>",
  "    <title>Clifford</title>",
  "  </head>",
  "  <body>",
  "    <main>",
  "      <h1>Hello, world!</h1>",
  "      <p>Build something amazing.</p>",
  "    </main>",
  "  </body>",
  "</html>"
];

const typewriter = document.getElementById("typewriter");
const replayBtn = document.getElementById("replay");

let runId = 0;

function startTypewriter() {
  const id = ++runId;          // kapag pinindot ulit ang Replay, titigil ang luma
  typewriter.textContent = ""; // textContent para hindi ma-render ang mga tag
  let lineIndex = 0;
  let typeIndex = 0;
  let lineEl = null;

  function tick() {
    if (id !== runId || lineIndex >= codeLines.length) return;

    const line = codeLines[lineIndex];

    if (typeIndex === 0) {
      lineEl = document.createElement("div");
      lineEl.style.minHeight = "1.8em";
      lineEl.style.whiteSpace = "pre";
      typewriter.appendChild(lineEl);
    }

    typeIndex++;
    lineEl.textContent = line.slice(0, typeIndex);

    if (typeIndex >= line.length) {
      lineIndex++;
      typeIndex = 0;
      setTimeout(tick, 160);
    } else {
      setTimeout(tick, 28);
    }
  }

  tick();
}

replayBtn.addEventListener("click", startTypewriter);

// Magsisimula kapag nakita na ang panel sa screen
new IntersectionObserver((entries, observer) => {
  if (entries[0].isIntersecting) {
    startTypewriter();
    observer.disconnect();
  }
}, { threshold: 0.4 }).observe(typewriter);

const tabs = {
  html: {
    title: "HTML builds the structure of a page.",
    code: `<section>\n  <h1>Hello, world!</h1>\n  <p>Welcome to my site.</p>\n</section>`
  },
  css: {
    title: "CSS makes the page beautiful and responsive.",
    code: `body {\n  background: #0f172a;\n  color: white;\n  font-family: Arial, sans-serif;\n}\n\nh1 {\n  color: tomato;\n  text-align: center;\n}`
  },
  js: {
    title: "JavaScript adds behavior and interaction.",
    code: `const button = document.querySelector('button');\nbutton.addEventListener('click', () => {\n  alert('Hello, developer!');\n});`
  }
};

const tabButtons = document.querySelectorAll(".tab");
const tabText = document.getElementById("tabText");
const tabCode = document.getElementById("tabCode");
const copyBtn = document.getElementById("copyBtn");

const setActiveTab = (tabKey) => {
  const current = tabs[tabKey];
  tabButtons.forEach((button) => {
    const active = button.dataset.tab === tabKey;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-selected", String(active));
  });

  tabText.textContent = current.title;
  tabCode.textContent = current.code;
};

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(tabCode.textContent);
    copyBtn.textContent = "Copied!";
    setTimeout(() => {
      copyBtn.textContent = "Copy code";
    }, 1200);
  } catch {
    copyBtn.textContent = "Copy failed";
    setTimeout(() => {
      copyBtn.textContent = "Copy code";
    }, 1200);
  }
});

const colorInput = document.getElementById("colorInput");
const tryDemo = document.getElementById("tryDemo");

const updateDemoColor = () => {
  const color = colorInput.value.trim();
  if (!color) return;
  tryDemo.style.color = color;
  tryDemo.style.background = `linear-gradient(135deg, ${color}22, rgba(139, 92, 246, 0.12))`;
};

colorInput.addEventListener("input", updateDemoColor);
setActiveTab("html");
updateDemoColor();

const toolCards = document.querySelectorAll(".tool-card");
const toolDetailBadge = document.getElementById("toolDetailBadge");
const toolDetailKind = document.getElementById("toolDetailKind");
const toolDetailName = document.getElementById("toolDetailName");
const toolDetailText = document.getElementById("toolDetailText");

const updateToolDetail = (card) => {
  toolCards.forEach((item) => {
    item.classList.toggle("is-active", item === card);
  });

  toolDetailBadge.textContent = card.dataset.badge;
  toolDetailKind.textContent = card.dataset.kind;
  toolDetailName.textContent = card.dataset.name;
  toolDetailText.textContent = card.dataset.description;
};

toolCards.forEach((card) => {
  card.addEventListener("click", () => updateToolDetail(card));
});

const quizData = [
  {
    question: "What does HTML do in web development?",
    options: [
      "Adds styling and animation",
      "Structures the content of a web page",
      "Runs server logic",
      "Creates databases"
    ],
    answer: 1
  },
  {
    question: "Which language controls the look and layout of a webpage?",
    options: ["Python", "CSS", "MySQL", "Git"],
    answer: 1
  },
  {
    question: "What is the purpose of JavaScript?",
    options: [
      "To create the webpage structure",
      "To add interactivity and behavior",
      "To store files on the server",
      "To format image files"
    ],
    answer: 1
  }
];

const quizQ = document.getElementById("quizQ");
const quizOpts = document.getElementById("quizOpts");
const quizFb = document.getElementById("quizFb");
const quizNext = document.getElementById("quizNext");

let currentQuestion = 0;
let answered = false;

const renderQuestion = () => {
  const item = quizData[currentQuestion];
  quizQ.textContent = `${currentQuestion + 1}. ${item.question}`;
  quizOpts.innerHTML = "";

  item.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => handleAnswer(index, button));
    quizOpts.appendChild(button);
  });

  quizFb.textContent = "";
  quizFb.className = "quiz-feedback";
  quizNext.hidden = true;
  answered = false;
};

const handleAnswer = (index) => {
  if (answered) return;
  answered = true;

  const item = quizData[currentQuestion];
  const optionButtons = [...quizOpts.children];

  optionButtons.forEach((button, buttonIndex) => {
    button.disabled = true;

    if (buttonIndex === item.answer) {
      button.classList.add("correct");
    }

    if (buttonIndex === index && buttonIndex !== item.answer) {
      button.classList.add("wrong");
    }
  });

  if (index === item.answer) {
    quizFb.textContent = "Correct! Nice job.";
    quizFb.classList.add("success");
  } else {
    quizFb.textContent = `Not quite. The correct answer is: ${item.options[item.answer]}.`;
    quizFb.classList.add("error");
  }

  quizNext.hidden = false;
};

quizNext.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    renderQuestion();
  } else {
    quizQ.textContent = "You finished the quiz!";
    quizOpts.innerHTML = "";
    quizFb.textContent = "Amazing work! Keep practicing and keep building.";
    quizFb.classList.remove("error");
    quizFb.classList.add("success");
    quizNext.hidden = true;
  }
});

renderQuestion();