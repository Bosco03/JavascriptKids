const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const backBtn = document.getElementById("back");
const nextBtn = document.getElementById("next");
const resultEl = document.getElementById("result");
const ExamEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 40 * 60;
let selectedAnswers = {};
let wrongAnswers = [];

// ---- Python & Pygame Quiz Questions ----
const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Makeup Language",
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyper Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which tag is used for the largest heading?",
    options: ["<h1>", "<h6>", "<p>", "<head>"],
    answer: "<h1>",
  },
  {
    question: "Which tag is used to display an image?",
    options: ["<img>", "<image>", "<pic>", "<src>"],
    answer: "<img>",
  },

  {
    question: "Which tag creates a bullet list?",
    options: ["<ul>", "<ol>", "<li>", "<br>"],
    answer: "<ul>",
  },
  {
    question: "Which tag is used for a line break?",
    options: ["<break>", "<lb>", "<br>", "<hr>"],
    answer: "<br>",
  },
  {
    question: "Which tag creates a new paragraph?",
    options: ["<p>", "<h2>", "<para>", "<div>"],
    answer: "<p>",
  },
  {
    question: "Which attribute is used in <a> tag to specify a link?",
    options: ["src", "href", "link", "url"],
    answer: "href",
  },
  {
    question: "Which HTML element is used for forms?",
    options: ["<input>", "<form>", "<button>", "<fieldset>"],
    answer: "<form>",
  },
  {
    question: "Which input type creates a checkbox?",
    options: ["radio", "text", "checkbox", "select"],
    answer: "checkbox",
  },
  {
    question: "Which input type creates a radio button?",
    options: ["radio", "button", "checkbox", "select"],
    answer: "radio",
  },
  {
    question: "Which tag is used to create options inside <select>?",
    options: ["<list>", "<group>", "<option>", "<optgroup>"],
    answer: "<option>",
  },

  {
    question: "Which HTML attribute specifies an image source?",
    options: ["src", "href", "alt", "link"],
    answer: "src",
  },
  {
    question: "Which tag is used to display a numbered list?",
    options: ["<ul>", "<li>", "<ol>", "<dl>"],
    answer: "<ol>",
  },
  {
    question: "Which attribute sets alternative text for images?",
    options: ["alt", "title", "src", "desc"],
    answer: "alt",
  },
  {
    question: "Which tag creates a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: "<a>",
  },
  {
    question: "Which tag is used for a drop-down list?",
    options: ["<dropdown>", "<select>", "<list>", "<menu>"],
    answer: "<select>",
  },
  {
    question: "Which attribute specifies inline CSS?",
    options: ["style", "class", "id", "css"],
    answer: "style",
  },
  {
    question: "Which tag represents a checkbox?",
    options: [
      "<input type='check'>",
      "<input type='checkbox'>",
      "<check>",
      "<tick>",
    ],
    answer: "<input type='checkbox'>",
  },
  {
    question: "Which attribute gives a unique name to an element?",
    options: ["id", "class", "style", "tag"],
    answer: "id",
  },
  {
    question: "Which tag defines a list item?",
    options: ["<ul>", "<ol>", "<li>", "<list>"],
    answer: "<li>",
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Computer Style Sheet",
      "Colorful Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },
  {
    question: "Which symbol is used to select an id in CSS?",
    options: [".", "#", "*", "&"],
    answer: "#",
  },
  {
    question: "Which symbol is used to select a class in CSS?",
    options: [".", "#", "*", "%"],
    answer: ".",
  },
  {
    question: "Which property changes background color?",
    options: ["color", "bgcolor", "background-color", "back-color"],
    answer: "background-color",
  },
  {
    question: "Which CSS property makes text bold?",
    options: ["font-weight", "font-style", "text-bold", "weight"],
    answer: "font-weight",
  },
  {
    question: "Which property changes text size?",
    options: ["font-size", "text-size", "size", "font-style"],
    answer: "font-size",
  },
  {
    question: "Which property centers text?",
    options: ["align", "text-align", "center", "text-style"],
    answer: "text-align",
  },
  {
    question: "Which property adds space inside an element?",
    options: ["padding", "margin", "spacing", "border"],
    answer: "padding",
  },
  {
    question: "Which property adds space outside an element?",
    options: ["padding", "margin", "spacing", "border"],
    answer: "margin",
  },
  {
    question: "Which property adds a border?",
    options: ["outline", "border", "frame", "box"],
    answer: "border",
  },
  {
    question: "Which property makes corners round?",
    options: ["corner-radius", "round", "border-radius", "curve"],
    answer: "border-radius",
  },
  {
    question: "Which property hides an element?",
    options: [
      "display: none",
      "hidden: true",
      "visibility: ",
      "Both A and C",
    ],
    answer: "display: none",
  },
  {
    question: "Which property changes the width of an element?",
    options: ["size", "width", "element-width", "box-size"],
    answer: "width",
  },
  {
    question: "Which property changes the height of an element?",
    options: ["size", "height", "element-height", "box-size"],
    answer: "height",
  },
  {
    question: "Which data type is written inside quotes?",
    options: ["String", "Number", "Boolean", "Array"],
    answer: "String",
  },
  {
    question: "Which data type is written without quotes?",
    options: ["Number", "String", "Object", "Function"],
    answer: "Number",
  },
  {
    question: "Which of these is an array?",
    options: [
      '["apple","banana"]',
      '"apple, banana"',
      "{fruit: apple}",
      "apple banana",
    ],
    answer: '["apple","banana"]',
  },
  {
    question: "Which keyword declares a block-scoped variable?",
    options: ["let", "var", "const", "Both let and const"],
    answer: "Both let and const",
  },
  {
    question: "What is the result of 5 + '2' in JavaScript?",
    options: ["7", "'52'", "Error", "undefined"],
    answer: "'52'",
  },
  {
    question: "What is the result of 5 - '2' in JavaScript?",
    options: ["7", "3", "'52'", "Error"],
    answer: "3",
  },
  {
    question: "Which keyword shows a message box?",
    options: ["alert", "msg", "console.log", "popup"],
    answer: "alert",
  },
  {
    question: "Which symbol is used for NOT in JavaScript?",
    options: ["!", "!!", "&&", "||"],
    answer: "!",
  },
  {
    question: "Which symbol is used for OR in JavaScript?",
    options: ["||", "&&", "!", "&"],
    answer: "||",
  },
  {
    question: "Which symbol is used for AND in JavaScript?",
    options: ["&&", "||", "!", "%"],
    answer: "&&",
  },
  {
    question: "Which array method joins items into a string?",
    options: ["join()", "concat()", "split()", "toString()"],
    answer: "join()",
  },
  {
    question: "Which method removes the last element of an array?",
    options: ["pop()", "push()", "shift()", "splice()"],
    answer: "pop()",
  },
  {
    question: "Which method returns array length?",
    options: ["length", "size()", "count()", "index"],
    answer: "length",
  },
  {
    question: "Which operator combines strings?",
    options: ["+", "&", "*", "concat"],
    answer: "+",
  },
  {
    question: "Which keyword is used to declare a function?",
    options: ["function", "func", "method", "def"],
    answer: "function",
  },
  {
    question: "Which DOM method selects an element by id?",
    options: [
      "getElementById()",
      "querySelector()",
      "getElementByClass()",
      "getId()",
    ],
    answer: "getElementById()",
  },
];

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Start Quiz
startBtn.addEventListener("click", () => {
  startScreen.style.display = "none";
  quizContainer.style.display = "block";

  shuffle(questions); // randomize questions

  startTimer();
  loadQuestion(currentQuestion);
});

// Load Question
function loadQuestion(index) {
  let q = questions[index];
  questionEl.textContent = `${index + 1}. ${q.question}`;
  optionsEl.innerHTML = "";

  // randomize answer options too
  let shuffledOptions = [...q.options];
  shuffle(shuffledOptions);

  shuffledOptions.forEach(option => {
    let btn = document.createElement("button");
    btn.textContent = option;
    btn.classList.add("option-btn");

    if (selectedAnswers[index] === option) {
      btn.classList.add("selected");
    }

    btn.addEventListener("click", () => selectAnswer(index, option, btn));
    optionsEl.appendChild(btn);
  });
}

// Select Answer
function selectAnswer(qIndex, answer, btn) {
  selectedAnswers[qIndex] = answer;
  Array.from(optionsEl.children).forEach(b => b.classList.remove("selected"));
  btn.classList.add("selected");
}

// Next Button
nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  } else {
    endQuiz();
  }
});

// Back Button
backBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
});

// Timer
function startTimer() {
  timer = setInterval(() => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    timerEl.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    timeLeft--;

    if (timeLeft < 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

// End Quiz
function endQuiz() {
  clearInterval(timer);
  quizContainer.style.display = "none";

  score = 0;
  wrongAnswers = [];

  questions.forEach((q, i) => {
    if (selectedAnswers[i] === q.answer) {
      score++;
    } else {
      wrongAnswers.push({ question: q.question, correct: q.answer, chosen: selectedAnswers[i] });
    }
  });

  let percentage = ((score / questions.length) * 100).toFixed(2);

  resultEl.innerHTML = `
    <h3>You scored: ${score} out of ${questions.length}</h3>
    <h2>${percentage}%</h2>
  `;

  if (wrongAnswers.length > 0) {
    resultEl.innerHTML += "<h3>Review Your Mistakes:</h3>";
    wrongAnswers.forEach(w => {
      resultEl.innerHTML += `
        <div class="correction-card">
          <p class="question"><strong>Q:</strong> ${w.question}</p>
          <p class="correct"><strong>✔ Correct Answer:</strong> ${w.correct}</p>
          <p class="chosen"><strong>✘ Your Answer:</strong> ${w.chosen || "No Answer"}</p>
        </div>
      `;
    });
  }

  
  resultEl.style.display = "block";
}
