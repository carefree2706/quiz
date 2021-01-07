//getting all the Element 
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const quit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .continue");
const quiz_box = document.querySelector(".quiz_box");
const timecount =quiz_box.querySelector(".timesecond");
const mcqs = document.querySelector(".mcqs");



start_btn.onclick = () => {
    info_box.classList.add("activeInfo")
}

quit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}

continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); 
    quiz_box.classList.add("activeQuiz");
    showQuestion(0);
    questionCounter(1);
    startTimer(10);
}

let question_count = 0;
let question_number = 1;
let timer_counter;
let timerValue = 10;

const next_btn = quiz_box.querySelector(".next_btn");
const result_box = document.querySelector(".result_box");
const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

//if next button clicked

next_btn.onclick = () => {
    if (question_count < questions.length - 1) {
        question_count++;
        question_number++;
        showQuestion(question_count);
        questionCounter(question_number);
        clearInterval(timer_counter);
        startTimer(timerValue);
        next_btn.style.display = "none";
    }
    else {
        console.log("q completed");
        showResult ()
    }

}



function showQuestion(index) {
    const question_text = document.querySelector(".question");

    let question_tag = '<span>' + questions[index].number + "." + questions[index].mcq + '</span>';
    let mcqs_tag = '<div class = "mcq">' + questions[index].mcqs[0] + '<span> </span></div>'
        + '<div class = "mcq">' + questions[index].mcqs[1] + '<span></span></div>'
        + '<div class = "mcq">' + questions[index].mcqs[2] + '<span></span></div>'
        + '<div class = "mcq">' + questions[index].mcqs[3] + '<span></span></div>';
    question_text.innerHTML = question_tag;
    mcqs.innerHTML = mcqs_tag;
    const mcq = mcqs.querySelectorAll(".mcq");
    for (let i = 0; i < mcq.length; i++) {
        mcq[i].setAttribute("onclick", "optionSelected(this)");

    }
}


function optionSelected(answer) {
    clearInterval(timer_counter);
        
    let userAns = answer.textContent;
    let correctAns = questions[question_count].answer;
    let allOptions = mcqs.children.length;
    if (userAns == correctAns) {
        answer.classList.add("correct");
        console.log("answer is correct");
        
        

    } else {
        answer.classList.add("wrong");
        console.log("answer is wrong");

        for (let i = 0; i < allOptions; i++) {
            if (mcqs.children[i].textContent == correctAns) {
                mcqs.children[i].setAttribute("class", "option correct");
            }
        }

    }
   
    for (let i = 0; i < allOptions; i++) {
        mcqs.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}
function showResult(){
info_box.classList.remove("activeInfo"); 
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");

}
function startTimer(time){
    timer_counter = setInterval(timer, 1000);
    function timer(){
        timecount.textContent = time;
        time--;
        if(time < 9){
            let addZero = timecount.textContent;
            timecount.textContent = '0' + addZero;
        }
        if(time < 0){
            clearInterval(timer_counter);
            timecount.textContent = "00";

            let correctAns = questions[question_count].answer;
            let allOptions = mcqs.children.length;

            for (let i = 0; i < allOptions; i++) {
                if (mcqs.children[i].textContent == correctAns) {
                    mcqs.children[i].setAttribute("class", "option correct");
                }
        }
        for (let i = 0; i < allOptions; i++) {
            mcqs.children[i].classList.add("disabled");
        }
        next_btn.style.display = "block";
    }
        
}   
    }

function questionCounter(index) {
    const bottom_ques_counter = quiz_box.querySelector(".total_mcq");
    let totalQuestionCountTag = '<span><p>' + index + '</p>/<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_counter.innerHTML = totalQuestionCountTag;
}
