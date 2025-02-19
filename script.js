// Static JSON data for quiz questions (15 unique questions)
const quizData = [
    {
      question: "What is net worth?",
      options: [
        "The total value of your assets minus liabilities.",
        "The total amount of money you earn annually.",
        "The amount of money in your savings account.",
        "The sum of your investments only."
      ],
      correct: 0
    },
    {
      question: "Which is a common budgeting method?",
      options: [
        "The 50/30/20 rule.",
        "The 40/40/20 rule.",
        "The 60/20/20 rule.",
        "The 70/20/10 rule."
      ],
      correct: 0
    },
    {
      question: "What does APR stand for?",
      options: [
        "Annual Percentage Rate",
        "Annual Performance Ratio",
        "Average Percentage Rate",
        "Annual Profit Ratio"
      ],
      correct: 0
    },
    {
      question: "What is compound interest?",
      options: [
        "Interest calculated on the principal plus previously earned interest.",
        "Interest calculated only on the initial principal.",
        "Interest paid by the bank on deposits.",
        "A fixed interest rate that never changes."
      ],
      correct: 0
    },
    {
      question: "What is diversification in investing?",
      options: [
        "Investing in a variety of assets to reduce risk.",
        "Investing all money in one asset.",
        "Keeping money in a single currency.",
        "Avoiding investments altogether."
      ],
      correct: 0
    },
    {
      question: "What is an emergency fund?",
      options: [
        "Savings set aside to cover unexpected expenses or emergencies.",
        "Money used exclusively for entertainment.",
        "A long-term investment vehicle.",
        "A loan taken out for emergencies."
      ],
      correct: 0
    },
    {
      question: "Which of the following is considered a liability?",
      options: [
        "Credit card debt.",
        "Savings account balance.",
        "Home equity.",
        "Stock investments."
      ],
      correct: 0
    },
    {
      question: "What does ROI stand for?",
      options: [
        "Return on Investment.",
        "Rate of Interest.",
        "Ratio of Income.",
        "Revenue on Inventory."
      ],
      correct: 0
    },
    {
      question: "What is a stock?",
      options: [
        "A share in the ownership of a company.",
        "A type of government bond.",
        "A form of bank savings account.",
        "A loan provided to a company."
      ],
      correct: 0
    },
    {
      question: "What is inflation?",
      options: [
        "The rate at which the general level of prices for goods and services is rising.",
        "A decrease in the cost of goods and services.",
        "The profit margin of a company.",
        "A type of investment fund."
      ],
      correct: 0
    },
    {
      question: "What is a mutual fund?",
      options: [
        "A pool of funds collected from many investors for investing in securities.",
        "A type of savings account.",
        "A bank loan for investment purposes.",
        "An investment in individual stocks."
      ],
      correct: 0
    },
    {
      question: "What is a bond?",
      options: [
        "A loan from an investor to a corporation or government.",
        "A share in the ownership of a company.",
        "A type of mutual fund.",
        "A savings account with fixed interest."
      ],
      correct: 0
    },
    {
      question: "What is liquidity?",
      options: [
        "The ease with which an asset can be converted to cash.",
        "The amount of profit a company makes.",
        "The measure of a company's growth.",
        "A type of investment risk."
      ],
      correct: 0
    },
    {
      question: "What is a credit score?",
      options: [
        "A numerical representation of an individual's creditworthiness.",
        "A measurement of how much money one earns.",
        "An indicator of an individual's net worth.",
        "A score assigned to companies based on their performance."
      ],
      correct: 0
    },
    {
      question: "What is a budget?",
      options: [
        "A plan for how you will spend and save your money.",
        "An investment portfolio.",
        "A tool for calculating interest rates.",
        "A type of bank account."
      ],
      correct: 0
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
    
    // Check if all questions have been answered (handled in finish)
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
    
    // Previous button (only show if not the first question)
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
    // Get selected answer for the current question
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
  