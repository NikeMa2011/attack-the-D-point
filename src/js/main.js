const startTextDOM = document.getElementById("startText");
const mainContentDOM = document.getElementById("mainContent");

const connectionNotWellDOM = document.getElementById("connectionNotWell");
const connectionWithServerLostDOM = document.getElementById("connectionWithServerLost");

const crewLockTimeDOM = document.getElementById("crewLockTime");
const crewLockTextDOM = document.getElementById("crewLockText");

const FPSvalueDOM = document.getElementById("FPSvalue");
const pingValueDOM = document.getElementById("pingValue");
const packageLostValueDOM = document.getElementById("packageLostValue");
const packageLostValuePercentSighDOM = document.getElementById("packageLostValuePercentSigh");
const matchIDDOM = document.getElementById("matchID");

const hitReviewDOM = document.getElementById("hitReview");
const hitReviewTextDOM = document.getElementById("hitReviewText");

const cursorCircle = document.getElementById("cursorCircle");
const crosshairCircle = document.getElementById("crosshairCircle");
const mouseCircles = document.getElementById("mouseCircles");

const userInput = document.getElementById("userInput");
const messageArea = document.getElementById("messageArea");

const repairVehicleTextDOM = document.getElementById("repairVehicleText");
const firefightVehicleTextDOM = document.getElementById("firefightVehicleText");

let repairVehicleStatus = {
    "repair": false,
    "firefight": false
};

let cursorX, cursorY;
let cursorNotReady = true;

let windowHeight, windowWidth;

let crosshairSpeed = 5;

let crewLockTime = {
    "minute": 8,
    "second": 0
}

let musicPlayNow = new Audio()
let musicNumber = 0;

let playerName = "player";

let hitReviewTextList = ["未击穿", "未击穿", "命中", "命中", "跳弹", "跳弹", "未对目标造成伤害", "未对目标造成伤害", "命中", "命中", "弹头碎裂", "弹头碎裂", "目标处于出生保护状态", "重创", "致命攻击"];
let hitReviewTextColorList = ["rgb(62, 255, 62)", "rgb(62, 255, 62)", "rgb(255, 255, 255)", "rgb(255, 255, 255)", "rgb(170, 170, 170)", "rgb(170, 170, 170)", "rgb(170, 170, 170)", "rgb(170, 170, 170)", "rgb(255, 181, 70)", "rgb(255, 181, 70)", "rgb(0, 0, 0)", "rgb(0, 0, 0)", "rgb(62, 255, 62)", "rgb(255, 80, 40)", "rgb(255, 80, 40)"];

let hitReviewTimeout;

setTimeout(() => {
    startTextDOM.onclick = () => {
        startTextDOM.style.animation = "disappearShift linear 2s";
        startTextDOM.style.opacity = 0;

        mainContentDOM.hidden = false;
        mainContentDOM.style.animation = "appear linear 2s";

        setTimeout(() => {
            startTextDOM.style.animation = "";
            mainContentDOM.style.animation = "";

            start();
        }, 2000);
    }
}, 2000);

let redColor = "rgba(255, 34, 34, 0.5)";
let yellowColor = "rgba(255, 255, 34, 0.5)";
let whiteColor = "rgba(255, 255, 255, 0.5)";

const musicSrcList = ["audio/music/advance australia.mp3", "audio/music/arise great country.mp3"];
// JS神奇的路径索引

const answers = {
    "attack the D point": "进攻D点"
};

const IDrandomcharactors = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const randomPlayerNames = ["碳酸氢钠 一氧化二氢溶液", "能打胜仗 作风优良", "会飞的豹豹", "Subtile2038", "MickyMice0654", "请西方朋友做出回答", "梦想成为中系战狠", "QUEENnnn00", "noobGamerZ7644", "miligmz", "nihaoyawyt"];

function addRandomPlayerName() {

}

function randomEvent() {

}

function connectionChange() {
    let randomNum = Math.random();
    let randomAnimationDuration = Math.floor(2000 + (randomNum * 10000));

    connectionNotWellDOM.hidden = true;
    connectionWithServerLostDOM.hidden = true;

    connectionNotWellDOM.style = "";
    connectionWithServerLostDOM.style = "";

    if (randomNum > 0.6) {
        connectionNotWellDOM.hidden = false;
        connectionNotWellDOM.style.animation = "textSlash linear 1s infinite";
    } else if (randomNum > 0.4) {
        connectionWithServerLostDOM.hidden = false;
        connectionWithServerLostDOM.style.animation = "textSlash linear 1s infinite";
    }

    setTimeout("connectionChange()", randomAnimationDuration);
}

function crewLocks() {
    crewLockTime.minute = 8;
    crewLockTime.second = 0;

    crewLockTextDOM.hidden = false;

    crewLocksCount();
}

function crewUnlocks() {
    let randomNumber = Math.random();
    let randomDuration = Math.floor(randomNumber * 10000);

    crewLockTextDOM.hidden = true;

    setTimeout("crewLocks()", randomDuration);
}

function crewLocksCount() {
    crewLockTimeDOM.innerHTML = '0' + crewLockTime.minute + "分 " + (crewLockTime.second > 9 ? "" : '0') + crewLockTime.second + '秒';

    crewLockTime.second--;

    if (crewLockTime.second < 0) {
        crewLockTime.minute--;

        if (crewLockTime.minute < 0) {
            setTimeout("crewUnlocks()", 1000);
        } else {
            crewLockTime.second = 59;

            setTimeout("crewLocksCount()", 1000);
        }
    } else {
        setTimeout("crewLocksCount()", 1000);
    }
}

function setgameStatus() {
    FPSvalueDOM.innerHTML = Math.floor(120 + (Math.random() * 40));

    if (connectionWithServerLostDOM.hidden == false) {
        if (Math.random() > 0.8) {
            pingValueDOM.innerHTML = Math.floor(700 + (Math.random() * 299));
            packageLostValueDOM.innerHTML = Math.floor(70 + (Math.random() * 29));
        }
    } else if (connectionNotWellDOM.hidden == false) {
        if (Math.random() > 0.3) {
            pingValueDOM.innerHTML = Math.floor(400 + (Math.random() * 299));
            packageLostValueDOM.innerHTML = Math.floor(40 + (Math.random() * 29));
        }
    } else {
        pingValueDOM.innerHTML = Math.floor(100 + (Math.random() * 299));
        packageLostValueDOM.innerHTML = Math.floor(10 + (Math.random() * 29));
    }

    if (pingValueDOM.innerHTML >= 500) {
        pingValueDOM.style.color = redColor;
    } else if (pingValueDOM.innerHTML >= 200) {
        pingValueDOM.style.color = yellowColor;
    } else {
        pingValueDOM.style.color = whiteColor;
    }

    if (packageLostValueDOM.innerHTML >= 50) {
        packageLostValueDOM.style.color = redColor;
        packageLostValuePercentSighDOM.style.color = redColor;
    } else if (packageLostValueDOM.innerHTML >= 20) {
        packageLostValueDOM.style.color = yellowColor;
        packageLostValuePercentSighDOM.style.color = yellowColor;
    } else {
        packageLostValueDOM.style.color = whiteColor;
        packageLostValuePercentSighDOM.style.color = whiteColor;
    }

    setTimeout("setgameStatus()", 1000);
}

function setRandomID() {
    matchIDDOM.innerHTML = "";

    for (let i = 0; i < 16; i++) {
        matchIDDOM.innerHTML += IDrandomcharactors[Math.floor(Math.random() * IDrandomcharactors.length)];
    }
}

function musicSetAndPlay() {
    if (musicNumber >= musicSrcList.length) {
        musicNumber = 0;
    }

    musicPlayNow.src = musicSrcList[musicNumber];
    musicPlayNow.play();
}

musicPlayNow.addEventListener("ended", () => {
    musicNumber++;

    musicSetAndPlay();
});

function hitReview() {
    clearTimeout(hitReviewTimeout);

    hitReviewDOM.style.opacity = 1;

    let randomPosibility = Math.random();

    for (let i = 0; i < hitReviewTextList.length; i++) {
        let listRatio = i / hitReviewTextList.length;

        if (randomPosibility < listRatio) {
            hitReviewTextDOM.innerHTML = hitReviewTextList[i];
            hitReviewTextDOM.style.color = hitReviewTextColorList[i];

            break;
        }
    }

    hitReviewTimeout = setTimeout(() => {
        hitReviewDOM.style.opacity = 0;
    }, 4000);
}

addEventListener("mousedown", hitReview);

function setCursorXY(event) {
    cursorX = event.clientX;
    cursorY = event.clientY;
}

function setCursorCircle() {
    cursorCircle.style.left = cursorX - (cursorCircle.offsetWidth / 2) + "px";
    cursorCircle.style.top = cursorY - (cursorCircle.offsetHeight / 2) + "px";
}

function setCrosshairCircle() {
    let crosshairXdiffence = (parseInt(cursorCircle.style.left) + (cursorCircle.offsetWidth / 2)) - (parseInt(crosshairCircle.style.left) + (crosshairCircle.offsetWidth / 2));
    let crosshairYdiffence = (parseInt(cursorCircle.style.top) + (cursorCircle.offsetHeight / 2)) - (parseInt(crosshairCircle.style.top) + (crosshairCircle.offsetHeight / 2));

    if (Math.abs(crosshairXdiffence) > crosshairSpeed) {
        crosshairCircle.style.left = parseInt(crosshairCircle.style.left) + (Math.sign(crosshairXdiffence) * crosshairSpeed) + "px";
    } else {
        crosshairCircle.style.left = cursorX - (crosshairCircle.offsetWidth / 2) + "px";
    }

    if (Math.abs(crosshairYdiffence) > crosshairSpeed) {
        crosshairCircle.style.top = parseInt(crosshairCircle.style.top) + (Math.sign(crosshairYdiffence) * crosshairSpeed) + "px";
    } else {
        crosshairCircle.style.top = cursorY - (crosshairCircle.offsetHeight / 2) + "px";
    }

    setTimeout("setCrosshairCircle()", 16);
}

function setCrosshairCircleOnCursor() {
    crosshairCircle.hidden = false;

    crosshairCircle.style.left = cursorX - (crosshairCircle.offsetWidth / 2) + "px";
    crosshairCircle.style.top = cursorY - (crosshairCircle.offsetHeight / 2) + "px";
}

function setWindowWidthHeight() {
    windowHeight = window.innerHeight;
    WindowWidth = window.innerWidth;
}

window.onresize = setWindowWidthHeight();

function sendMessage() {
    if (userInput.value == "") {
        return;
    }
    messageArea.innerHTML += "<p class=\"messageText\"><span class=\"messageFromMate\">[友军]</span><span class=\"messageFromMate\">" + playerName + ": </span><span class=\"messageSend\">" + userInput.value + "</span></p>";

    userInput.value = "";
}

window.onkeydown = (event) => {
    if (event.code == "Enter") {
        sendMessage();
    }
}

function repairVehicle() {
    let randomNumber = Math.random();
    let randomTime = Math.floor(Math.random() * 60000);

    if (randomNumber > 0.5) {
        if (repairVehicleStatus.repair) {
            setTimeout("repairVehicle()", randomTime);

            return;
        } else {
            repairVehicleStatus.repair = true;
        }

        repairVehicleTextDOM.style.opacity = 1;

        if (repairVehicleStatus.firefight) {
            repairVehicleTextDOM.style.animation = "appear 0.2s linear, repairVehicleTextShift 0.2s linear";
            repairVehicleTextDOM.style.bottom = "29vh";

            if (firefightVehicleTextDOM.style.animation == '') {
                firefightVehicleTextDOM.style.animation = "firefightVehicleTextShift 0.2s linear";
            } else {
                firefightVehicleTextDOM.style.animation = "appear 0.2s linear, firefightVehicleTextShift 0.2s linear";
            }

            firefightVehicleTextDOM.style.bottom = "23vh";
        } else {
            repairVehicleTextDOM.style.animation = "appear 0.2s linear";
        }
    } else {
        if (repairVehicleStatus.firefight) {
            setTimeout("repairVehicle()", randomTime);

            return;
        } else {
            repairVehicleStatus.firefight = true;
        }

        firefightVehicleTextDOM.style.opacity = 1;

        if (repairVehicleStatus.repair) {
            firefightVehicleTextDOM.style.animation = "appear 0.2s linear, firefightVehicleTextShift 0.2s linear";
            firefightVehicleTextDOM.style.bottom = "23vh";

            if (repairVehicleTextDOM.style.animation == '') {
                repairVehicleTextDOM.style.animation = "repairVehicleTextShift 0.2s linear";
            } else {
                repairVehicleTextDOM.style.animation = "appear 0.2s linear, repairVehicleTextShift 0.2s linear";
            }

            repairVehicleTextDOM.style.bottom = "29vh";
        } else {
            firefightVehicleTextDOM.style.animation = "appear 0.2s linear";
        }
    }

    setTimeout("repairVehicle()", randomTime);
}

function start() {
    setRandomID();

    musicSetAndPlay();

    connectionChange();
    crewLocks();

    setgameStatus();

    mouseCircles.hidden = false;

    window.onmousemove = (event) => {
        setCursorXY(event);

        setCursorCircle();

        if (cursorNotReady) {
            setCrosshairCircle();
            setCrosshairCircleOnCursor();

            cursorNotReady = false;
        }
    };

    repairVehicle();
}

setWindowWidthHeight();