//Importing Questions
import q from "./Quest.json" assert { type: "json" };

//Vars
let main = document.querySelector("main");
let answers = document.querySelectorAll(".content ul li");
let quest = document.querySelector(".content .quest");
let mainContent = document.querySelector(".content");
let timer = document.querySelector(".det .timer");
let prog = document.querySelectorAll(".det .prog li");
let submit = document.querySelector(".submit");
let currentQuest = 0;
let score = 0;
let sec = 3;
let answerUser = "";
//
crQuest();

//
answers.forEach((el) => {
  el.onclick = () => {
    answers.forEach((ele) => {
      ele.classList.remove("active");
    });
    el.classList.add("active");
    answerUser = el.textContent;
  };
});
//
let timeInterval = setInterval(() => {
  if (sec == 0) {
    nextQuest();
  } else {
    sec--;
  }
  timer.textContent = `00:0${sec}`;
}, 1000);
//
submit.onclick = () => {
  if (answerUser) {
    nextQuest();
  }
};

//Functions
function crQuest() {
  quest.textContent = q[currentQuest].title;

  answers.forEach((el, i) => {
    el.textContent = q[currentQuest][`answer_${i + 1}`];
    el.classList.remove("active");
  });

  answerUser = "";

  prog.forEach((el, i) => {
    if (i < currentQuest) {
      el.classList.add("active");
    }
  });
}
//
function nextQuest() {
  if (currentQuest < 8) {
    validatAnswer();
    currentQuest++;
    crQuest();
    sec = 3;
    timer.textContent = `00:0${sec}`;
  } else {
    validatAnswer();
    prog[currentQuest].classList.add("active");
    endQuiz();
    timer.textContent = `00:00`;
    clearInterval(timeInterval);
  }
}
//
function endQuiz() {
  let res = document.createElement("div");
  let resText = document.createElement("p");
  let resRank = document.createElement("span");
  resRank.textContent = score > 40 ? (score == 90 ? "Perfect" : "Good") : "Bad";
  if (score > 40) {
    if (score == 90) {
      resRank.classList.add("perfect-res");
    } else {
      resRank.classList.add("good-res");
    }
  } else {
    resRank.classList.add("bad-res");
  }
  resText.textContent = `You got ${score} ,`;
  res.classList.add("splash");
  main.append(res);
  res.append(resText);
  resText.append(resRank);
  mainContent.remove();
}
//
function validatAnswer() {
  let rightAnswer = q[currentQuest].right_answer;
  if (rightAnswer == answerUser) {
    score += 10;
  }
  console.log(score);
}
