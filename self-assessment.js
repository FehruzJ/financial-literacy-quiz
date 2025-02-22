// Define our self-assessment questions
// Each question has 10 questions with 4 options, and each option maps to a spending category:
// Option A: "Impulsive", Option B: "Balanced", Option C: "Saver", Option D: "Cautious"
const assessmentData = [
    {
      question: "How do you typically track your spending?",
      options: [
        "I don’t track it at all—I just spend.",
        "I check my bank balance occasionally.",
        "I use a budget but don’t always follow it.",
        "I track every expense carefully."
      ],
      mapping: ["Impulsive", "Balanced", "Saver", "Cautious"]
    },
    {
      question: "You receive an unexpected $500. What do you do first?",
      options: [
        "Spend it on something fun immediately.",
        "Save part of it but treat myself too.",
        "Invest it or put it in a high-yield savings account.",
        "Keep it untouched in case of an emergency."
      ],
      mapping: ["Impulsive", "Balanced", "Saver", "Cautious"]
    },
    {
      question: "When shopping, what describes you best?",
      options: [
        "I buy whatever catches my eye, no second thoughts.",
        "I sometimes make impulse purchases, but I try to control myself.",
        "I compare prices and look for deals before buying.",
        "I plan all purchases carefully and rarely buy spontaneously."
      ],
      mapping: ["Impulsive", "Balanced", "Saver", "Cautious"]
    },
    {
      question: "What’s your approach to budgeting?",
      options: [
        "Budgeting? Never heard of it.",
        "I try, but I don’t always stick to it.",
        "I budget and mostly follow it.",
        "I have a strict budget and track every expense."
      ],
      mapping: ["Impulsive", "Balanced", "Saver", "Cautious"]
    },
    {
      question: "How do you handle credit cards or debt?",
      options: [
        "I spend freely and pay only the minimum.",
        "I have some debt but manage to pay it off over time.",
        "I use credit wisely and always pay more than the minimum.",
        "I avoid debt at all costs."
      ],
      mapping: ["Impulsive", "Balanced", "Saver", "Cautious"]
    },
    {
      question: "When it comes to saving money, you…",
      options: [
        "Hardly save—I prefer to enjoy my money now.",
        "Save a little, but only if there’s money left.",
        "Regularly save a percentage of my income.",
        "Prioritize saving and have a solid emergency fund."
      ],
      mapping: ["Impulsive", "Balanced", "Saver", "Cautious"]
    },
    {
      question: "How do you feel when you check your bank account balance?",
      options: [
        "I avoid looking—it stresses me out.",
        "I check occasionally but don’t obsess over it.",
        "I check regularly to stay informed.",
        "I always know exactly how much I have."
      ],
      mapping: ["Impulsive", "Balanced", "Saver", "Cautious"]
    },
    {
      question: "What’s your biggest financial priority?",
      options: [
        "Enjoying life and spending freely.",
        "Finding a balance between spending and saving.",
        "Growing my wealth through investments.",
        "Protecting my financial stability at all costs."
      ],
      mapping: ["Impulsive", "Balanced", "Saver", "Cautious"]
    },
    {
      question: "If a friend asks you to lend money, what do you do?",
      options: [
        "Give it without a second thought.",
        "Lend it but set a reminder to ask for it back.",
        "Lend only if I’m sure I won’t need it soon.",
        "I don’t lend money—I keep finances separate."
      ],
      mapping: ["Impulsive", "Balanced", "Saver", "Cautious"]
    },
    {
      question: "At the end of the month, how much do you usually have left after expenses?",
      options: [
        "Nothing—I spend everything I earn.",
        "A little, but I don’t keep track.",
        "A decent amount—I make sure to save something.",
        "A lot—I plan carefully to maximize savings."
      ],
      mapping: ["Impulsive", "Balanced", "Saver", "Cautious"]
    }
  ];
  
  let currentQuestionIndex = 0;
  let userAnswers = new Array(assessmentData.length).fill(null);
  
  document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
  });
  
  function loadQuestion() {
    const contentDiv = document.getElementById("assessment-content");
    if (!contentDiv) {
      console.error("Assessment content element not found!");
      return;
    }
    // Clear current content
    contentDiv.innerHTML = "";
    
    // Check if we have finished all questions
    if (currentQuestionIndex >= assessmentData.length) {
      showResults();
      return;
    }
    
    // Display current question
    const currentData = assessmentData[currentQuestionIndex];
    const qTitle = document.createElement("h2");
    qTitle.textContent = `Question ${currentQuestionIndex + 1}: ${currentData.question}`;
    contentDiv.appendChild(qTitle);
    
    // Display options (radio buttons)
    currentData.options.forEach((option, idx) => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="radio" name="option" value="${idx}"> ${option}`;
      contentDiv.appendChild(label);
      contentDiv.appendChild(document.createElement("br"));
    });
    
    // If an answer was already selected, pre-select it
    if (userAnswers[currentQuestionIndex] !== null) {
      const radios = document.getElementsByName("option");
      Array.from(radios).forEach(radio => {
        if (parseInt(radio.value) === userAnswers[currentQuestionIndex]) {
          radio.checked = true;
        }
      });
    }
    
    // Navigation buttons container
    const navDiv = document.createElement("div");
    navDiv.className = "nav-buttons";
    
    if (currentQuestionIndex > 0) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "Previous";
      prevBtn.addEventListener("click", () => {
        saveAnswer();
        currentQuestionIndex--;
        loadQuestion();
      });
      navDiv.appendChild(prevBtn);
    }
    
    const nextBtn = document.createElement("button");
    if (currentQuestionIndex === assessmentData.length - 1) {
      nextBtn.textContent = "Finish";
      nextBtn.addEventListener("click", () => {
        saveAnswer();
        showResults();
      });
    } else {
      nextBtn.textContent = "Next";
      nextBtn.addEventListener("click", () => {
        saveAnswer();
        currentQuestionIndex++;
        loadQuestion();
      });
    }
    navDiv.appendChild(nextBtn);
    
    contentDiv.appendChild(navDiv);
  }
  
  function saveAnswer() {
    const selected = document.querySelector('input[name="option"]:checked');
    // If no option is selected, leave answer as null (user may skip)
    if (selected) {
      userAnswers[currentQuestionIndex] = parseInt(selected.value);
    }
  }
  
  function showResults() {
    // Hide the assessment content and show the result container
    document.getElementById("assessment-content").style.display = "none";
    const resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "block";
    
    // Tally scores by category
    const tally = {
      "Impulsive": 0,
      "Balanced": 0,
      "Saver": 0,
      "Cautious": 0
    };
    
    assessmentData.forEach((q, idx) => {
      const answerIdx = userAnswers[idx];
      if (answerIdx !== null) {
        // Use mapping array to get category
        const category = q.mapping[answerIdx];
        tally[category]++;
      }
    });
    
    // Determine the highest category
    let highestCategory = "";
    let highestCount = -1;
    for (const cat in tally) {
      if (tally[cat] > highestCount) {
        highestCount = tally[cat];
        highestCategory = cat;
      }
    }
    
    // Prepare personalized advice
    let advice = "";
    if (highestCategory === "Impulsive") {
      advice = "You tend to spend without much planning. Consider tracking your expenses and setting a small budget to curb impulse buying.";
    } else if (highestCategory === "Balanced") {
      advice = "You have a balanced approach, but there's room for improvement. Try setting clearer spending limits and saving more consistently.";
    } else if (highestCategory === "Saver") {
      advice = "Great job prioritizing savings! To further enhance your financial health, consider learning about investment opportunities and diversifying your portfolio.";
    } else if (highestCategory === "Cautious") {
      advice = "You are very cautious with your money. While safety is important, you might explore ways to invest a portion of your funds to grow your wealth over time.";
    }
    
    // Display results
    document.getElementById("profile").textContent = `Your spending profile is: ${highestCategory}`;
    document.getElementById("advice").textContent = advice;
  }
  
  function restartAssessment() {
    currentQuestionIndex = 0;
    userAnswers = new Array(assessmentData.length).fill(null);
    document.getElementById("result-container").style.display = "none";
    document.getElementById("assessment-content").style.display = "block";
    loadQuestion();
  }
  