const quizData = [
   
    {
        question: "Who is the governer of Nepal Rastra Bank?",
        a: "Maha Prasad Adhikari",
        b: "Dr Chiranjibi Nepal",
        c: "Dr Yubaraj Khatiwada",
        d: "Kalyan Bikram Adhikari",
        correct: "a",
    },
    {
        question: "When was Nepal Rastra Bank established?",
        a: "B.S. 2013 Baishakh 10",
        b: "B.S. 2013 Baishakh 12",
        c: "B.S. 2013 Baishakh 13",
        d: "B.S. 2013 Baishakh 14",
        correct: "d",
    },
    {
        question: "how many Paper Note have been in circulation in Nepal till now?",
        a: "8",
        b: "10",
        c: "11",
        d: "12",
        correct: "c",
    },
 {
        question: "Which of the following is not directly controlled by NRB?",
        a: "CRR",
        b: "CAR",
        c: "Base rate",
        d: "Bank rate",
        correct: "c",
    },
    {
        question: "Who is the first governer of Nepal Rastra Bank?",
        a: "Ganesh Bahadur Thapa",
        b: "Dr Chiranjibi Nepal",
        c: "Dr Yubaraj Khatiwada",
        d: "Himalaya Samsher J B Rana",
        correct: "d",
    },
    

];

const quiz= document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')


let currentQuiz = 0
let score = 0

loadQuiz()

function loadQuiz() {

    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })
    return answer
}


submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
       if(answer === quizData[currentQuiz].correct) {
           score++
       }

       currentQuiz++

       if(currentQuiz < quizData.length) {
           loadQuiz()
       } else {
           quiz.innerHTML = `
           <h2>You answered ${score}/${quizData.length} questions correctly</h2>

           <button onclick="location.reload()">Reload</button>
           `
       }
    }
})