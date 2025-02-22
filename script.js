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
    correct: 0,
    explanation: "Net worth is calculated by subtracting your liabilities from your assets, reflecting your overall financial health."
  },
  {
    question: "Which is a common budgeting method?",
    options: [
      "The 70/20/10 rule.",
      "The 50/30/20 rule.",
      "The 60/20/20 rule.",
      "The 40/40/20 rule."
    ],
    correct: 1,
    explanation: "The 50/30/20 rule divides your income into 50% needs, 30% wants, and 20% savings and debt repayment."
  },
  {
    question: "What does APR stand for?",
    options: [
      "Annual Profit Ratio.",
      "Annual Performance Ratio.",
      "Annual Percentage Rate.",
      "Average Percentage Rate."
    ],
    correct: 2,
    explanation: "APR is the Annual Percentage Rate, indicating the yearly cost of borrowing or the return on an investment."
  },
  {
    question: "What is compound interest?",
    options: [
      "Interest calculated only on the initial principal.",
      "A fixed interest rate that never changes.",
      "Interest paid by the bank on deposits.",
      "Interest calculated on the principal plus previously earned interest."
    ],
    correct: 3,
    explanation: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods."
  },
  {
    question: "What is diversification in investing?",
    options: [
      "Keeping money in a single currency.",
      "Investing in a variety of assets to reduce risk.",
      "Investing all money in one asset.",
      "Avoiding investments altogether."
    ],
    correct: 1,
    explanation: "Diversification spreads your investments across various asset classes to reduce risk."
  },
  {
    question: "What is an emergency fund?",
    options: [
      "A loan taken out for emergencies.",
      "Money used exclusively for entertainment.",
      "Savings set aside to cover unexpected expenses or emergencies.",
      "A long-term investment vehicle."
    ],
    correct: 2,
    explanation: "An emergency fund is money saved specifically to cover unexpected expenses or financial emergencies."
  },
  {
    question: "Which of the following is considered a liability?",
    options: [
      "Home equity.",
      "Stock investments.",
      "Savings account balance.",
      "Credit card debt."
    ],
    correct: 3,
    explanation: "Liabilities are debts or obligations. Credit card debt is a common liability."
  },
  {
    question: "What does ROI stand for?",
    options: [
      "Rate of Interest.",
      "Ratio of Income.",
      "Return on Investment.",
      "Revenue on Inventory."
    ],
    correct: 2,
    explanation: "ROI stands for Return on Investment, a measure of the profitability of an investment."
  },
  {
    question: "What is a stock?",
    options: [
      "A type of government bond.",
      "A share in the ownership of a company.",
      "A loan provided to a company.",
      "A form of bank savings account."
    ],
    correct: 1,
    explanation: "A stock represents partial ownership in a company."
  },
  {
    question: "What is inflation?",
    options: [
      "A decrease in the cost of goods and services.",
      "The profit margin of a company.",
      "The rate at which the general level of prices for goods and services is rising.",
      "A type of investment fund."
    ],
    correct: 2,
    explanation: "Inflation is the rate at which prices for goods and services increase over time, reducing purchasing power."
  },
  {
    question: "What is a mutual fund?",
    options: [
      "A bank loan for investment purposes.",
      "A pool of funds collected from many investors for investing in securities.",
      "An investment in individual stocks.",
      "A type of savings account."
    ],
    correct: 1,
    explanation: "A mutual fund pools money from multiple investors to purchase a diversified portfolio of stocks, bonds, or other securities."
  },
  {
    question: "What is a bond?",
    options: [
      "A share in the ownership of a company.",
      "A savings account with fixed interest.",
      "A type of mutual fund.",
      "A loan from an investor to a corporation or government."
    ],
    correct: 3,
    explanation: "A bond is essentially a loan made by an investor to a borrower (corporate or governmental), which pays interest over time."
  },
  {
    question: "What is liquidity?",
    options: [
      "The measure of a company's growth.",
      "The amount of profit a company makes.",
      "The ease with which an asset can be converted to cash.",
      "A type of investment risk."
    ],
    correct: 2,
    explanation: "Liquidity refers to how quickly an asset can be sold for cash without affecting its price."
  },
  {
    question: "What is a credit score?",
    options: [
      "An indicator of an individual's net worth.",
      "A score assigned to companies based on their performance.",
      "A numerical representation of an individual's creditworthiness.",
      "A measurement of how much money one earns."
    ],
    correct: 2,
    explanation: "A credit score is a numerical expression that represents a person’s creditworthiness, based on credit history."
  },
  {
    question: "What is a budget?",
    options: [
      "An investment portfolio.",
      "A plan for how you will spend and save your money.",
      "A tool for calculating interest rates.",
      "A type of bank account."
    ],
    correct: 1,
    explanation: "A budget is a financial plan that helps you track your income, spending, and savings."
  }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(quizData.length).fill(null);

document.addEventListener("DOMContentLoaded", () => {
  const totalElem = document.getElementById("total-questions");
  if (totalElem) {
    totalElem.textContent = quizData.length;
  }
  loadQuestion();
});

function loadQuestion() {
  const quizContent = document.getElementById("quiz-content");
  if (!quizContent) {
    console.error("Quiz content element not found!");
    return;
  }
  
  // Clear previous question content
  quizContent.innerHTML = "";
  
  // If we've gone past the last question, show results
  if (currentQuestionIndex >= quizData.length) {
    showResults();
    return;
  }
  
  // Update question counter and progress bar
  const currentNumElem = document.getElementById("current-question-number");
  if (currentNumElem) {
    currentNumElem.textContent = currentQuestionIndex + 1;
  }
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    const progressPercent = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = progressPercent + "%";
  }
  
  // Display current question
  const currentQuestion = quizData[currentQuestionIndex];
  const questionTitle = document.createElement("h2");
  questionTitle.textContent = currentQuestion.question;
  quizContent.appendChild(questionTitle);
  
  // Display each option as a radio button with label
  currentQuestion.options.forEach((option, index) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="option" value="${index}"> ${option}`;
    quizContent.appendChild(label);
    quizContent.appendChild(document.createElement("br"));
  });
  
  // Pre-select an answer if already saved
  if (userAnswers[currentQuestionIndex] !== null) {
    const radios = document.getElementsByName("option");
    Array.from(radios).forEach(radio => {
      if (parseInt(radio.value) === userAnswers[currentQuestionIndex]) {
        radio.checked = true;
      }
    });
  }
  
  // Navigation buttons container
  const navContainer = document.createElement("div");
  navContainer.className = "nav-buttons";
  
  if (currentQuestionIndex > 0) {
    const prevBtn = document.createElement("button");
    prevBtn.textContent = "Previous";
    prevBtn.addEventListener("click", () => {
      // Save answer if selected
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
      }
      currentQuestionIndex--;
      loadQuestion();
    });
    navContainer.appendChild(prevBtn);
  }
  
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
  
  // Render the question navigator
  renderNavigator();
}

function saveAnswer() {
  const selectedOption = document.querySelector('input[name="option"]:checked');
  // If an option is selected, store it; otherwise, leave it as null.
  if (selectedOption) {
    userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
  }
  return true;
}

function renderNavigator() {
  const navigatorContainer = document.getElementById("question-navigator");
  if (!navigatorContainer) {
    console.error("Question navigator element not found!");
    return;
  }
  navigatorContainer.innerHTML = "";
  
  for (let i = 0; i < quizData.length; i++) {
    const navBtn = document.createElement("button");
    navBtn.textContent = i + 1;
    navBtn.title = `Jump to Question ${i + 1}`;
    
    if (userAnswers[i] !== null) {
      navBtn.classList.add("answered");
    }
    if (i === currentQuestionIndex) {
      navBtn.classList.add("current");
    }
    
    navBtn.addEventListener("click", () => {
      const selectedOption = document.querySelector('input[name="option"]:checked');
      if (selectedOption) {
        userAnswers[currentQuestionIndex] = parseInt(selectedOption.value);
      }
      currentQuestionIndex = i;
      loadQuestion();
    });
    
    navigatorContainer.appendChild(navBtn);
  }
}

function showResults() {
  let score = 0;
  quizData.forEach((question, index) => {
    if (userAnswers[index] === question.correct) {
      score++;
    }
  });
  
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = "100%";
  }
  
  document.getElementById("quiz-container").style.display = "none";
  const resultContainer = document.getElementById("result-container");
  if (resultContainer) {
    resultContainer.style.display = "block";
  }
  
  const scoreElem = document.getElementById("score");
  if (scoreElem) {
    scoreElem.textContent = `Your Score: ${score} / ${quizData.length}`;
  }
  
  let levelFeedback = "";
  let extraFeedback = "";
  if (score < quizData.length / 2) {
    levelFeedback = "Beginner Level";
    extraFeedback = "It seems you need to strengthen your financial fundamentals. We recommend revisiting our basic guides on budgeting and key financial concepts.";
  } else if (score < quizData.length) {
    levelFeedback = "Intermediate Level";
    extraFeedback = "Good job! You have a solid grasp of financial concepts, though there's still room for improvement. Check out our intermediate resources for deeper insights.";
  } else {
    levelFeedback = "Expert Level";
    extraFeedback = "Outstanding work! Your financial literacy is excellent. Consider exploring advanced topics or sharing your expertise with others.";
  }
  
  const feedbackElem = document.getElementById("feedback");
  if (feedbackElem) {
    feedbackElem.textContent = `Feedback: ${levelFeedback}. ${extraFeedback}`;
  }
}

function reviewAnswers() {
  // Hide the result container and quiz container
  document.getElementById("result-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "none";
  
  // Show the review container
  const reviewContainer = document.getElementById("review-container");
  if (!reviewContainer) {
    console.error("Review container not found!");
    return;
  }
  reviewContainer.style.display = "block";
  
  // Build the review content
  const reviewContent = document.getElementById("review-content");
  reviewContent.innerHTML = "";
  
  quizData.forEach((question, index) => {
    const reviewDiv = document.createElement("div");
    reviewDiv.className = "review-question";
    
    const qTitle = document.createElement("h3");
    qTitle.textContent = `Q${index + 1}: ${question.question}`;
    reviewDiv.appendChild(qTitle);
    
    const userAnswer = document.createElement("p");
    const userAnsText = userAnswers[index] !== null 
      ? question.options[userAnswers[index]]
      : "No answer given";
    userAnswer.textContent = `Your Answer: ${userAnsText}`;
    reviewDiv.appendChild(userAnswer);
    
    const correctAnswer = document.createElement("p");
    correctAnswer.textContent = `Correct Answer: ${question.options[question.correct]}`;
    reviewDiv.appendChild(correctAnswer);
    
    const explanation = document.createElement("p");
    explanation.textContent = `Explanation: ${question.explanation}`;
    reviewDiv.appendChild(explanation);
    
    reviewContent.appendChild(reviewDiv);
  });
}

function goBackToResults() {
  // Hide the review container and show the result container
  document.getElementById("review-container").style.display = "none";
  document.getElementById("result-container").style.display = "block";
}
  
function restartQuiz() {
  currentQuestionIndex = 0;
  userAnswers = new Array(quizData.length).fill(null);
  document.getElementById("result-container").style.display = "none";
  document.getElementById("review-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  loadQuestion();
}
