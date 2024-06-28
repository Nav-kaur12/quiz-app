const questions =[
    {
        question:"Which is largest animal in the world?",
        answers:[
            {text:"shark", correct:"false"},
            {text:"Blue whale", correct:"true"},
            {text:"Elephant", correct:"false"},
            {text:"Giraffe", correct:"false"},
        ]
    },
    {
        question:"What is the capital city of Australia?",
        answers:[
            {text:"Sydney", correct:"false"},
            {text:"Melbournee", correct:"false"},
            {text:"Canberra", correct:"true"},
            {text:"Brisbane", correct:"false"},
        ]
    },
    {
        question:"Which planet is known as the Red Planet?",
        answers:[
            {text:"Mars", correct:"true"},
            {text:"Earth", correct:"false"},
            {text:"Jupiter", correct:"false"},
            {text:"Venus", correct:"false"},
        ]
    },
    {
        question:"Which element has the chemical symbol 'O'?",
        answers:[
            {text:"Gold", correct:"false"},
            {text:"Oxygen", correct:"true"},
            {text:"Osmium", correct:"false"},
            {text:"Oganesson", correct:"false"},
        ]
    },
    {
        question:"In which year did the Titanic sink?",
        answers:[
            {text:"1905", correct:"false"},
            {text:"1910", correct:"false"},
            {text:"1915", correct:"false"},
            {text:"1912", correct:"true"},
        ]
    },
    {
        question:"Who is known as the 'Father of Computers'?",
        answers:[
            {text:" Bill Gates", correct:"false"},
            {text:" Charles Babbage", correct:"true"},
            {text:" Steve Jobs", correct:"false"},
            {text:"Alan Turing", correct:"false"},
        ]
    }

];

const questionElement=document.getElementById('question');
const answerButton=document.getElementById('answer-buttons');
const nextButton=document.getElementById('next-btn');

function addText() {
    var appDiv = document.querySelector('.app');
    var heading = appDiv.querySelector('h1');

    var newParagraph = document.createElement('p');
    newParagraph.id= 'question-count';

    newParagraph.textContent = `You have ${questions.length}  questions to solve.`;

    heading.insertAdjacentElement('afterend', newParagraph);
}


// Function to hide the paragraph when any answer button is clicked
function hideParagraph() {
    var paragraph = document.getElementById('question-count');
    if (paragraph) {
        paragraph.style.display = 'none';
    }
}

// Add event listeners to the answer buttons
function addEventListeners() {
    var answerButtons = document.querySelectorAll('.btn');
    answerButtons.forEach(button => {
        button.addEventListener('click', hideParagraph);
    });
}

// function addBtn(){
//     var appDiv =document.querySelector('app');
//     var heading =document.querySelector("h1");
//     var newText= document.querySelector('p');

//     var playbtn= document.createElement('button');

//     playbtn.textContent="Let's start";
//     newText.insertAdjacentElement('afterend',playbtn)
// }

window.onload = function(){
    addText();
     addEventListeners();
}









let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion= questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+"."+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button =document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add('btn');
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
        
    })

}

function resetState(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
          }
          button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
    }else{
            showScore();
        }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }
    else{
        startQuiz();

    }
})


startQuiz();

