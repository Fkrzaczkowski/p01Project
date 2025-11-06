const questions = [
  { question: "Hoeveel spelers staan er op het veld bij een voetbalteam?", answers: ["9", "10", "11", "12"], correct: "11" },
  { question: "In welke sport is Lionel Messi beroemd?", answers: ["Basketbal", "Tennis", "Voetbal", "Honkbal"], correct: "Voetbal" },
  { question: "Welke kleur trui draagt de leider in de Tour de France?", answers: ["Groen", "Geel", "Rood", "Wit"], correct: "Geel" },
  { question: "Bij welke sport gebruik je een racket en een shuttle?", answers: ["Tennis", "Squash", "Badminton", "Pingpong"], correct: "Badminton" },
  { question: "Welke voetbalclub heeft de meeste Champions League-bekers gewonnen?", answers: ["Barcelona", "AC Milan", "Real Madrid", "Liverpool"], correct: "Real Madrid" },
  { question: "Hoeveel ringen staan er op het logo van de Olympische Spelen?", answers: ["4", "5", "6", "7"], correct: "5" },
  { question: "In welk land werd het WK voetbal 2022 gehouden?", answers: ["Brazilië", "Qatar", "Rusland", "Frankrijk"], correct: "Qatar" },
  { question: "Hoeveel sets moet je winnen om een Grand Slam-tenniswedstrijd te winnen bij de mannen?", answers: ["2", "3", "4", "5"], correct: "3" },
  { question: "In welke sport is Charles Leclerc actief?", answers: ["F1", "Tennis", "Voetbal", "Golf"], correct: "F1" },
  { question: "Wie won de Tour de France in 2023?", answers: ["Tadej Pogacar", "Jonas Vingegaard", "Remco Evenepoel", "Primož Roglič"], correct: "Jonas Vingegaard" },
  { question: "In welke sportdiscipline is Dafne Schippers bekend geworden?", answers: ["Zwemmen", "Atletiek", "Tennis", "Hockey"], correct: "Atletiek" },
  { question: "Wat is de afkorting van de hoogste Nederlandse voetbalcompetitie?", answers: ["KNVB", "Eredivisie", "KKD", "EFD"], correct: "Eredivisie" },
  { question: "Hoeveel spelers heeft een rugbyteam op het veld (in rugby union)?", answers: ["13", "14", "15", "16"], correct: "15" },
  { question: "Welke sport wordt gespeeld op Wimbledon?", answers: ["Tennis", "Golf", "Cricket", "Hockey"], correct: "Tennis" },
  { question: "Wie won de gouden medaille op de 100 meter sprint bij de Olympische Spelen van 2016 (mannen)?", answers: ["Usain Bolt", "Justin Gatlin", "Yohan Blake", "Tyson Gay"], correct: "Usain Bolt" },
  { question: "In welk jaar werd Nederland Europees kampioen voetbal?", answers: ["1988", "1992", "2000", "2010"], correct: "1988" },
  { question: "Wat is de nationale sport van Japan?", answers: ["Judo", "Sumoworstelen", "Baseball", "Karate"], correct: "Sumoworstelen" },
  { question: "Welke Nederlandse zwemster won meerdere gouden medailles op de Olympische Spelen van 2008?", answers: ["Ranomi Kromowidjojo", "Inge de Bruijn", "Marleen Veldhuis", "Maarten van der Weijden"], correct: "Inge de Bruijn" },
  { question: "Hoeveel minuten duurt een officiële handbalwedstrijd (voor volwassenen)?", answers: ["50", "60", "70", "80"], correct: "60" }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Volgende vraag";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer, currentQuestion.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(answer, correctAnswer) {
  const buttons = answerButtons.children;
  for (let btn of buttons) {
    if (btn.innerHTML === correctAnswer) {
      btn.style.background = "#90ee90"; 
    } else if (btn.innerHTML === answer) {
      btn.style.background = "#f08080"; 
    }
    btn.disabled = true;
  }
  if (answer === correctAnswer) score++;
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});


function showScore() {
  resetState(); // verwijdert vorige knoppen
  questionElement.innerHTML = `Je score is ${score} van de ${questions.length}! 🎉`;

  // Maak een container voor de eindknoppen
  const scoreButtonsContainer = document.createElement("div");
  scoreButtonsContainer.style.display = "flex";
  scoreButtonsContainer.style.flexDirection = "column"; 
  scoreButtonsContainer.style.alignItems = "center";    
  scoreButtonsContainer.style.marginTop = "20px";


  const retryButton = document.createElement("button");
  retryButton.innerHTML = "Opnieuw spelen";
  retryButton.classList.add("btn");
  retryButton.addEventListener("click", startQuiz);

  const homeButton = document.createElement("button");
  homeButton.innerHTML = "Terug naar start";
  homeButton.classList.add("btn", "home-btn");
  homeButton.addEventListener("click", () => {
    window.location.href = "home.html"; 
  });

  
  scoreButtonsContainer.appendChild(retryButton);
  scoreButtonsContainer.appendChild(homeButton);

  // Voeg de container met knoppen toe aan het hoofdcontainer voor antwoorden
  answerButtons.appendChild(scoreButtonsContainer);
}

startQuiz();
