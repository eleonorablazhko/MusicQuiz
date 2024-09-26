//first page(Introduction)
let countdownValue = 5; 
    function updateCountdown() {
      const countdownElement = document.getElementById('countdown');
      countdownElement.textContent = countdownValue;

      if (countdownValue > 0) {
        countdownValue--;
        setTimeout(updateCountdown, 1000); 
      } else {
        window.location.href = "main.html";
      }
    }
    setTimeout(updateCountdown, 1000); 
//second page(Quiz)    
let currentQuestion = 0;
let selectedAnswers = [];

function showQuestion() {
  const questionContainer = document.getElementById('question');
  const answersContainer = document.getElementById('answers');
  const progressElement = document.getElementById('progress');

  const currentQuizData = quizData[currentQuestion];

  questionContainer.innerHTML = `<h2>${currentQuizData.question}</h2>`;

  answersContainer.innerHTML = "";
  currentQuizData.answers.forEach((answer) => {
    const answerButton = document.createElement('button');
    answerButton.textContent = answer;
    
    answerButton.addEventListener('click', () => {
      const AllAnsBtn = document.querySelectorAll('#answers button');
      AllAnsBtn.forEach(button => button.classList.remove('selected'));
      answerButton.classList.add('selected');
      selectedAnswers[currentQuestion] = answer;
    });
    answersContainer.appendChild(answerButton);
  });
  progressElement.textContent = `Question ${currentQuestion + 1}/${selectedAnswers.length}`;
}

function showExplanation() {
  const explanation = document.getElementById('explanation');
  const currentQuizData = quizData[currentQuestion];

  let displayExplanation = function() {
    explanation.innerHTML = `<p>${currentQuizData.explanation}</p>`;
  };

  let resetImageAndExplanation = function() {
    explanation.innerHTML = '';
  };
  document.getElementById('explanationBox').addEventListener('mouseover', displayExplanation, false);
  document.getElementById('explanationBox').addEventListener('mouseout', resetImageAndExplanation, false);
}

function nextBtn() {
  if (selectedAnswers[currentQuestion]) {
    const questionData = {
      question: quizData[currentQuestion].question,
      answers: quizData[currentQuestion].answers,
      selectedAnswer: selectedAnswers[currentQuestion]
    };
    localStorage.setItem(`question${currentQuestion + 1}`, JSON.stringify(questionData));
    
        if (currentQuestion < 4) {
          currentQuestion++;
          showQuestion();
          
        } if (currentQuestion === 4){
          document.getElementById('finishBtn').style.display = 'inline-block';
          document.getElementById('nextBtn').style.display = 'none';
        }
      }else {
        window.alert("Please select an answer before moving to the next question.");
      }showExplanation();
    }

function finishBtn() {
  const results = window.open("results.html", "Quiz Summary", "width=600", "height=300");
  results.document.body.appendChild(resultsContent);
}

//fisher-yates
function shuffle() {
  for (let i = quizData.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [quizData[i], quizData[j]] = [quizData[j], quizData[i]];
  }
  selectedAnswers = quizData.slice(0,5);
} 

function resultsDisplay(){
  let resultsQs = window.localStorage.getItem("questionContainer");
  console.log(JSON.parse(resultsQs));
  let resultsAns = window.localStorage.getItem("answersContainer");
  console.log(JSON.parse(resultsAns));
}
       //my quiz data 
       let quizData = [
        {
            question: "Who is known as the 'King of Pop'?",
            answers: ["Elvis Presley", "Michael Jackson", "Madonna", "Prince"],
            explanation: "This artist earned the title 'King of Pop' for their groundbreaking contributions to the music and dance industry."
        },
        {
            question: "Which band performed the song 'Stairway to Heaven'?",
            answers: ["The Rolling Stones", "Led Zeppelin", "The Beatles", "Queen"],
            explanation: "This iconic song, known for its intricate guitar work and dynamic composition, was performed by this legendary band."
        },
        {
            question: "Which artist is famous for the album 'Thriller'?",
            answers: ["Whitney Houston", "Prince", "Michael Jackson", "David Bowie"],
            explanation: "The critically acclaimed album 'Thriller' is recognized as one of the best-selling albums of all time and belongs to this artist."
        },
        {
            question: "Who was the lead guitarist for the band Queen?",
            answers: ["Brian May", "Jimmy Page", "Eric Clapton", "Eddie Van Halen"],
            explanation: "This musician served as the lead guitarist for the legendary rock band Queen, contributing to their distinctive sound."
        },
        {
            question: "Which genre is associated with Bob Marley?",
            answers: ["Reggae", "Country", "Hip Hop", "Jazz"],
            explanation: "Bob Marley, an iconic figure, is known for popularizing this musical genre worldwide with hits like 'No Woman, No Cry' and 'One Love.'"
        },
        {
            question: "What instrument does Yo-Yo Ma play?",
            answers: ["Violin", "Cello", "Piano", "Trumpet"],
            explanation: "Yo-Yo Ma is a renowned musician recognized for their exceptional talent and contributions to classical music, particularly playing this instrument."
        },
        {
            question: "Which Beatles album was released in 1967 and is considered a masterpiece?",
            answers: ["Rubber Soul", "Revolver", "The White Album", "Sgt. Pepper's Lonely Hearts Club Band"],
            explanation: "The groundbreaking album 'Sgt. Pepper's Lonely Hearts Club Band,' often hailed as a masterpiece, was released by The Beatles in 1967."
        },
        {
            question: "Who is the lead vocalist of the band U2?",
            answers: ["Bono", "Chris Martin", "Mick Jagger", "Bruce Springsteen"],
            explanation: "Bono, known for their powerful voice and activism on various global issues, is the lead vocalist of this band."
        },
        {
            question: "Which country is the origin of Flamenco music?",
            answers: ["Brazil", "Spain", "Cuba", "Argentina"],
            explanation: "Flamenco music, characterized by passionate singing, guitar playing, and rhythmic footwork, originated in this country."
        },
        {
            question: "What is the name of Adele's best-selling album released in 2011?",
            answers: ["21", "25", "19", "30"],
            explanation: "Adele's best-selling album released in 2011 is titled '21' and features hit songs like 'Rolling in the Deep' and 'Someone Like You.'"
        }
    ];
    
        shuffle();
        showQuestion();
        showExplanation();
        
        
        
       
    
    
    