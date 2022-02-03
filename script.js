const img = {
    r: "icons/rock.png",
    p: "icons/paper.png",
    s: "icons/scissor.png",
  },
  choices = ["r", "p", "s"],
  res = {
    rp: 0,
    rs: 1,
    pr: 1,
    ps: 0,
    sr: 0,
    sp: 1,
  };

var userScore = 0,
    sysScore = 0,
    tie = 0,
    turn = 0,
    rock = document.getElementById("r"),
    paper = document.getElementById("p"),
    scissor = document.getElementById("s"),
    userScoreHolder = document.getElementById("userScore"),
    sysScoreHolder = document.getElementById("sysScore"),
    tieScoreHolder = document.getElementById("tieScore"),
    turnHolder = document.getElementById("turn"),
    options = document.querySelectorAll(".options .imgholder"),
    userImg = document.querySelector(".user img"),
    sysImg = document.querySelector(".system img"),
    resScreen = document.querySelector("#resScreen");

window.onkeyup = function (ev) {
  if (ev.keyCode == 82) {
    rock.click();
  }
  if (ev.keyCode == 80) {
    paper.click();
  }
  if (ev.keyCode == 83) {
    scissor.click();
  }
};

options.forEach((el) => {
  el.addEventListener("click", function () {
    turn += 1;
    turnHolder.innerText = turn;
    sysImg.style.visibility = "visible";
    userImg.style.visibility = "visible";
    this.style.transform = "scale(0.8)";
    this.style.backgroundColor = "#656faf";
    var optTimeout = setTimeout(() => {
      this.style.transform = "scale(1)";
      this.style.backgroundColor = "";
    }, 100);
    var userChoice = this.getAttribute("id");
    var sysChoice = choices[Math.floor(Math.random() * 3)];
    sysImg.setAttribute("src", img[sysChoice]);
    userImg.setAttribute("src", img[userChoice]);
    var resCode = userChoice + sysChoice;
    if (resCode === "rr" || resCode == "pp" || resCode == "ss") {
      tie += 1;
      resScreen.innerHTML = "Tie !";
      resScreen.style.display = "initial";
      setTimeout(() => {
        resScreen.style.display = "none";
      }, 1000);
    }
    if (res[resCode] == 0) {
      sysScore += 1;
      resScreen.innerHTML = "Lose !";
      resScreen.style.display = "initial";
      setTimeout(() => {
        resScreen.style.display = "none";
      }, 1000);
    }
    if (res[resCode] == 1) {
      userScore += 1;
      resScreen.innerHTML = "Win !";
      resScreen.style.display = "initial";
      setTimeout(() => {
        resScreen.style.display = "none";
      }, 1000);
    }
    userScoreHolder.innerText = userScore;
    sysScoreHolder.innerText = sysScore;
    tieScoreHolder.innerText = tie;
    if (userScore == 6 || sysScore == 6) {
      options.forEach((el) => {
        el.style.pointerEvents = "none";
        window.onkeyup = function () {};
      });
      setTimeout(() => {
        userScore == 6
          ? (document.body.innerHTML = `
        <div id="finalResScreen">
        <h2>You Win !</h2>
        <button onclick='location.reload()'>Retry</button>
        </div>`)
          : (document.body.innerHTML = `
        <div id="finalResScreen">
        <h2>You Lose !</h2>
        <button onclick='location.reload()'>Retry</button>
        </div>`);
      }, 1000);
    }
  });
});
