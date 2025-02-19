// Static JSON data for quiz questions (15 unique questions)
const quizData = [
    {
      question: "What is net worth?",
      options: [
        "The total value of your assets minus liabilities.",  // Correct
        "The total amount of money you earn annually.",
        "The amount of money in your savings account.",
        "The sum of your investments only."
      ],
      correct: 0
    },
    {
      question: "Which is a common budgeting method?",
      // We reorder options so that the 50/30/20 rule appears as option B.
      options: [
        "The 70/20/10 rule.",
        "The 50/30/20 rule.", // Correct
        "The 60/20/20 rule.",
        "The 40/40/20 rule."
      ],
      correct: 1
    },
    {
      question: "What does APR stand for?",
      // Reorder options so that "Annual Percentage Rate" is option C.
      options: [
        "Annual Profit Ratio.",
        "Annual Performance Ratio.",
        "Annual Percentage Rate.", // Correct
        "Average Percentage Rate."
      ],
      correct: 2
    },
    {
      question: "What is compound interest?",
      // Reorder so that the correct answer is option D.
      options: [
        "Interest calculated only on the initial principal.",
        "A fixed interest rate that never changes.",
        "Interest paid by the bank on deposits.",
        "Interest calculated on the principal plus previously earned interest." // Correct
      ],
      correct: 3
    },
    {
      question: "What is diversification in investing?",
      // Correct answer (investing in a variety of assets) as option B.
      options: [
        "Keeping money in a single currency.",
        "Investing in a variety of assets to reduce risk.", // Correct
        "Investing all money in one asset.",
        "Avoiding investments altogether."
      ],
      correct: 1
    },
    {
      question: "What is an emergency fund?",
      // Correct answer is option C.
      options: [
        "A loan taken out for emergencies.",
        "Money used exclusively for entertainment.",
        "Savings set aside to cover unexpected expenses or emergencies.", // Correct
        "A long-term investment vehicle."
      ],
      correct: 2
    },
    {
      question: "Which of the following is considered a liability?",
      // Correct answer: Credit card debt as option D.
      options: [
        "Home equity.",
        "Stock investments.",
        "Savings account balance.",
        "Credit card debt." // Correct
      ],
      correct: 3
    },
    {
      question: "What does ROI stand for?",
      // Correct answer: "Return on Investment" as option C.
      options: [
        "Rate of Interest.",
        "Ratio of Income.",
        "Return on Investment.", // Correct
        "Revenue on Inventory."
      ],
      correct: 2
    },
    {
      question: "What is a stock?",
      // Correct answer is option B.
      options: [
        "A type of government bond.",
        "A share in the ownership of a company.", // Correct
        "A loan provided to a company.",
        "A form of bank savings account."
      ],
      correct: 1
    },
    {
      question: "What is inflation?",
      // Correct answer is option C.
      options: [
        "A decrease in the cost of goods and services.",
        "The profit margin of a company.",
        "The rate at which the general level of prices for goods and services is rising.", // Correct
        "A type of investment fund."
      ],
      correct: 2
    },
    {
      question: "What is a mutual fund?",
      // Correct answer is option B.
      options: [
        "A bank loan for investment purposes.",
        "A pool of funds collected from many investors for investing in securities.", // Correct
        "An investment in individual stocks.",
        "A type of savings account."
      ],
      correct: 1
    },
    {
      question: "What is a bond?",
      // Correct answer is option D.
      options: [
        "A share in the ownership of a company.",
        "A savings account with fixed interest.",
        "A type of mutual fund.",
        "A loan from an investor to a corporation or government." // Correct
      ],
      correct: 3
    },
    {
      question: "What is liquidity?",
      // Correct answer is option C.
      options: [
        "The measure of a company's growth.",
        "The amount of profit a company makes.",
        "The ease with which an asset can be converted to cash.", // Correct
        "A type of investment risk."
      ],
      correct: 2
    },
    {
      question: "What is a credit score?",
      // Correct answer is option C.
      options: [
        "An indicator of an individual's net worth.",
        "A score assigned to companies based on their performance.",
        "A numerical representation of an individual's creditworthiness.", // Correct
        "A measurement of how much money one earns."
      ],
      correct: 2
    },
    {
      question: "What is a budget?",
      // Correct answer is option B.
      options: [
        "An investment portfolio.",
        "A plan for how you will spend and save your money.", // Correct
        "A tool for calculating interest rates.",
        "A type of bank account."
      ],
      correct: 1
    }
  ];
  
  let currentQuestionIndex = 0;
  let userAnswers = new Array(quizData.length).fill(null);
  
  document.addEventListener("DOMContentLoaded", () => {
    // Set total questions in the counter
    const totalQuestionsElem = document.getElementById("total-questions");
    if (totalQuestionsElem) {
      totalQuestionsElem.textContent = quizData.length;
    }
    loadQuestion();
  });
  
  function loadQuestion() {
    const quizContent = document.getElementById("quiz-content");
    if (!quizContent) {
      console.error("Element with id 'quiz-content' not found!");
      return;
    }
    
    // Clear previous content
    quizContent.innerHTML = "";
    
    // If all questions have been answered, show results
    if (currentQuestionIndex >= quizData.length) {
      showResults();
      return;
    }
    
    // Update question counter and progress bar
    const currentQuestionNumberElem = document.getElementById("current-question-number");
    if (currentQuestionNumberElem) {
      currentQuestionNumberElem.textContent = currentQuestionIndex + 1;
    }
    
    const progressBarElem = document.getElementById("progress-bar");
    if (progressBarElem) {
      const progressPercent = (currentQuestionIndex / quizData.length) * 100;
      progressBarElem.style.width = progressPercent + "%";
    }
    
    // Display the current question
    const currentQuestion = quizData[currentQuestionIndex];
    const questionTitle = document.createElement("h2");
    questionTitle.textContent = currentQuestion.question;
    quizContent.appendChild(questionTitle);
    
    // Create and append each option as a radio button with label
    currentQuestion.options.forEach((option, index) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
      quizContent.appendChild(label);
      quizContent.appendChild(document.createElement("br"));
    });
    
    // Pre-select an option if already answered
    if (userAnswers[currentQuestionIndex] !== null) {
      const radios = document.getElementsByName("option");
      radios.forEach(radio => {
        if (parseInt(radio.value) === userAnswers[currentQuestionIndex]) {
          radio.checked = true;
        }
      });
    }
    
    // Navigation buttons container
    const navContainer = document.createElement("div");
    navContainer.className = "nav-buttons";
    
    // Previous button (if not the first question)
    if (currentQuestionIndex > 0) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Previous";
      prevBtn.addEventListener("click", () => {
        if (saveAnswer()) {
          currentQuestionIndex--;
          loadQuestion();
        }
      });
      navContainer.appendChild(prevBtn);
    }
    
    // Next or Finish button
    const nextBtn = document.createElement("button");
    if (currentQuestionIndex === quizData.length - 1) {
      nextBtn.textContent = "Finish";
      nextBtn.addEventListener("click", () => {
        if (saveAnswer()) {
          showResults();
        }
      });
    } else {
      nextBtn.textContent = "Next";
      nextBtn.addEventListener("click", () => {
        if (saveAnswer()) {
          currentQuestionIndex++;
          loadQuestion();
        }
      });
    }
    navContainer.appendChild(nextBtn);
    
    quizContent.appendChild(navContainer);
  }
  
  function saveAnswer() {
    // Get the selected answer for the current question
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) {
      alert("Please select an answer!");
      return false;
    }
    userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
    return true;
  }
  
  function showResults() {
    // Calculate score by comparing userAnswers with correct answers
    let score = 0;
    quizData.forEach((question, index) => {
      if (userAnswers[index] === question.correct) {
        score++;
      }
    });
    
    // Set progress bar to full
    const progressBarElem = document.getElementById("progress-bar");
    if (progressBarElem) {
      progressBarElem.style.width = "100%";
    }
    
    // Hide the quiz container and show the result container
    document.getElementById("quiz-container").style.display = "none";
    const resultContainer = document.getElementById("result-container");
    if (resultContainer) {
      resultContainer.style.display = "block";
    }
    
    // Display the final score
    document.getElementById("score").textContent = `Your Score: ${score} / ${quizData.length}`;
    
    // Determine level and extra feedback
    let levelFeedback = "";
    let extraFeedback = "";
    if (score < quizData.length / 2) {
      levelFeedback = "Beginner Level";
      extraFeedback = "You might need to revisit the basics. Consider exploring more introductory financial education resources.";
    } else if (score < quizData.length) {
      levelFeedback = "Intermediate Level";
      extraFeedback = "Good job! You have a solid grasp of financial concepts, but there's room for improvement. Keep learning!";
    } else {
      levelFeedback = "Expert Level";
      extraFeedback = "Excellent work! Your financial literacy is top-notch. Consider mentoring others or exploring advanced topics.";
    }
    document.getElementById("feedback").textContent = `Feedback: ${levelFeedback}. ${extraFeedback}`;
  }
  
  function restartQuiz() {
    // Reset quiz variables and UI elements for a new attempt
    currentQuestionIndex = 0;
    userAnswers = new Array(quizData.length).fill(null);
    document.getElementById("result-container").style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    loadQuestion();
  }
  
