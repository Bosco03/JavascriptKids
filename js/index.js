const startScreen = document.getElementById("start-screen");
    const startBtn = document.getElementById("start-btn");
    const quizContainer = document.getElementById("quiz-container");
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const backBtn = document.getElementById("back");
    const nextBtn = document.getElementById("next");
    const resultEl = document.getElementById("result");
    const timerEl = document.getElementById("timer");

    let currentQuestion = 0;
    let score = 0;
    let timer;
    let timeLeft = 40 * 60;
    let selectedAnswers = {};
    let wrongAnswers = [];

    // Questions Array (JS + HTML + CSS)
    // const questions = [
    //   { question: "Which keyword can declare a variable?", options: ["var", "let", "const", "All of these"], answer: "All of these" },
    //   { question: "Add to the END of an array:", options: ["push()", "pop()", "shift()", "slice()"], answer: "push()" },
    //   { question: "Remove the LAST item of an array:", options: ["pop()", "unshift()", "splice()", "map()"], answer: "pop()" },
    //   { question: "DOM stands for:", options: ["Document Object Model", "Data Object Map", "Doc Order Model", "Display Object Model"], answer: "Document Object Model" },
    //   { question: "Write a single-line comment:", options: ["// comment", "/* comment */", "# comment", "<!-- comment -->"], answer: "// comment" },
    //   { question: "Strict equality operator is:", options: ["==", "===", "!=", "="], answer: "===" },
    //   { question: "Turn a string into an array:", options: ["split()", "join()", "slice()", "toArray()"], answer: "split()" },
    //   { question: "Turn an array into a string:", options: ["join()", "split()", "map()", "reduce()"], answer: "join()" },
    //   { question: "How to pick by ID in DOM:", options: ["getElementById()", "getElementsByClassName()", "querySelectorAll()", "createElement()"], answer: "getElementById()" },
    //   { question: "Which adds a class to an element?", options: [".classList.add()", ".style.add()", ".addClass()", ".setAttribute()"], answer: ".classList.add()" },
    //   { question: "if/else checks a:", options: ["loop", "condition", "function", "style"], answer: "condition" },
    //   { question: "Repeat code a set number of times:", options: ["for loop", "if/else", "function", "querySelector"], answer: "for loop" },
    //   { question: "Check if array contains a value:", options: ["includes()", "indexOf()", "has()", "contains()"], answer: "includes()" },
    //   { question: "Which shows a popup message?", options: ["alert()", "console.log()", "prompt()", "print()"], answer: "alert()" },
    //   { question: "Access object property safely:", options: ["obj.age", "obj['age']", "Both work", "Neither"], answer: "Both work" },
    //   { question: "Which creates a DOM element?", options: ["createElement()", "append()", "innerHTML()", "makeElement()"], answer: "createElement()" },
    //   { question: "Function keyword is:", options: ["function", "func", "def", "=> only"], answer: "function" },
    //   { question: "While loop runs until:", options: ["condition becomes false", "page reloads", "timer ends", "user clicks"], answer: "condition becomes false" },
    //   { question: "Change text inside an element:", options: ["textContent", "innerHTML", "Both", "style"], answer: "Both" },
    //   { question: "Array length is found with:", options: [".size", ".count()", ".length", ".total"], answer: ".length" },
    //   { question: "What does HTML stand for?", options: ["HighText Machine Language", "HyperText Markup Language", "HyperTool Machine Language", "Home Tool Markup Language"], answer: "HyperText Markup Language" },
    //   { question: "Which of these is the correct HTML tag for a paragraph?", options: ["<para>", "<p>", "<paragraph>", "<pg>"], answer: "<p>" },
    //   { question: "Which of these is an attribute in HTML?", options: ["<h1>", 'src="image.jpg"', "<p>", "<ul>"], answer: 'src="image.jpg"' },
    //   { question: "What is the correct file extension for an HTML document?", options: [".htm", ".html", ".web", ".css"], answer: ".html" },
    //   { question: "Which HTML tag is used to insert an image?", options: ["<pic>", "<image>", "<img>", "<src>"], answer: "<img>" },
    //   { question: "Which CSS property is used to change the background color of a webpage?", options: ["color", "background-color", "bgcolor", "text-color"], answer: "background-color" },
    //   { question: "Which CSS property is used to make an image circular?", options: ["border-size", "border-radius", "circle", "image-shape"], answer: "border-radius" },
    //   { question: "Which type of CSS is written directly inside an HTML tag?", options: ["Inline CSS", "Internal CSS", "External CSS", "None of the above"], answer: "Inline CSS" },
    //   { question: "Which of the following is a CSS display type?", options: ["Static", "Inline", "Fixed", "All of the above"], answer: "Inline" },
    //   { question: "What does the <form> tag do in HTML?", options: ["It makes text bold", "It creates a clickable button", "It collects user input", "It links to another page"], answer: "It collects user input" }
    // ];


    // JAVASCRIPT QUESTIONS (25 NEW)
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
    question: "Which tag draws a breaks line?",
    options: ["<line>", "<hr>", "<border>", "<br>"],
    answer: "<br>",
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
    question: "Which HTML element is used for dropdown menus?",
    options: ["<select>", "<option>", "<dropdown>", "<list>"],
    answer: "<select>",
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




    // Start Quiz
    startBtn.addEventListener("click", () => {
      startScreen.style.display = "none";
      quizContainer.style.display = "block";
      startTimer();
      loadQuestion(currentQuestion);
    });

    // Load Question
    function loadQuestion(index) {
      let q = questions[index];
      questionEl.textContent = `${index + 1}. ${q.question}`;
      optionsEl.innerHTML = "";

      q.options.forEach(option => {
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

      resultEl.innerHTML = `<h2>Your Score: ${score}/${questions.length}</h2>`;

      if (wrongAnswers.length > 0) {
        resultEl.innerHTML += "<h3>Questions you missed:</h3><ul>";
        wrongAnswers.forEach(w => {
          resultEl.innerHTML += `<li>${w.question}<br>Correct Answer: ${w.correct} | Your Answer: ${w.chosen || "No Answer"}</li>`;
        });
        resultEl.innerHTML += "</ul>";
      }

      resultEl.innerHTML += `<button onclick="location.reload()">Restart Quiz</button>`;
      resultEl.style.display = "block";
    }