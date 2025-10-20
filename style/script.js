const music = document.getElementById("bgMusic");

async function startMusic() {
    try {
        music.currentTime = 131;
        await music.play();
        console.log("Music is playing 🎶");
    } catch (err) {
        console.log("Autoplay bị chặn, đợi user tương tác...");
        const resume = () => {
            music.play();
            document.removeEventListener("click", resume);
            document.removeEventListener("touchstart", resume);
        };
        document.addEventListener("click", resume);
        document.addEventListener("touchstart", resume);
    }
}

window.addEventListener("load", () => {
    startMusic();
});

const codeTokens = [
    { text: "\n//===== Love Programming=====\n", cls: "comments" },
    { text: "Boy i = ", cls: "" },
    { text: "new", cls: "keyword" },
    { text: " Boy(", cls: "" },
    { text: "\"Akira\"", cls: "string" },
    { text: ");\n", cls: "" },

    { text: "Girl u = ", cls: "" },
    { text: "new", cls: "keyword" },
    { text: " Girl(", cls: "" },
    { text: "\"Annie\"", cls: "string" },
    { text: ");\n", cls: "" },

    { text: "// 24-05-2025 Lần đầu tiên tớ biết đến cậu\n", cls: "comments" },
    { text: "i.fallInLove(u);\n", cls: "" },

    { text: "// Từ sau khi biết đến cậu, ngày nào tớ cũng nghĩ về cậu\n", cls: "comments" },
    { text: "i.loveSick(u);\n", cls: "" },

    { text: "// Chơi với cậu từng giây từng phút\n", cls: "comments" },
    { text: "i.wannaPlay(u);\n", cls: "" },

    { text: "// Tớ đã bày tỏ tình cảm với cậu\n", cls: "comments" },
    { text: "i.confess(u);\n", cls: "" },

    { text: "// Nhưng cậu đã không phản hồi tớ\n", cls: "comments" },
    { text: "// Tớ đợi câu trả lời của cậu mỗi ngày🫶\n", cls: "comments" },

    { text: "boolean", cls: "keyword" },
    { text: " isHesitate = ", cls: "" },
    { text: "true", cls: "keyword" },
    { text: ";", cls: "" },
    { text: " // Tớ biết cậu đang do dự😽\n", cls: "comments" },

    { text: "while", cls: "keyword" },
    { text: " (isHesitate) {\n", cls: "" },
    { text: "    // Tớ biết cậu đang do dự😽\n", cls: "comments" },
    { text: "    i.waitFor(u);\n", cls: "" },
    { text: "    // Thật vui vì đã được đồng hành cùng cậu💕\n", cls: "comments" },
    { text: "    isHesitate = u.accept(i);\n", cls: "" },
    { text: "}\n", cls: "" },

    { text: "// Chúng ta đã bắt đầu ở bên và suy nghĩ cho nhau💜\n", cls: "comments" },
    { text: "i.dating(u);\n", cls: "" },
    { text: "// Chúng ta thật may mắn vì đã cùng nhau trải qua những khó khăn ❤️\n", cls: "comments" },
    { text: "i.loveForever(u);", cls: "" }
];

const typedEl = document.getElementById("typed");
const runBtn = document.getElementById("runBtn");
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const daysEl = document.getElementById("days");
const timeEl = document.getElementById("time");
const rotateMsg = document.getElementById("rotateMsg");
const codeEl = document.getElementById("code");

let tokenIndex = 0, charIndex = 0;
let spanEl = null;
let started = false; 

function typeEffect() {
    if (tokenIndex < codeTokens.length) {
        let token = codeTokens[tokenIndex];

        if (!spanEl) {
            spanEl = document.createElement("span");
            if (token.cls) spanEl.className = token.cls;
            typedEl.appendChild(spanEl);
        }

        if (charIndex < token.text.length) {
            spanEl.innerHTML += token.text[charIndex];
            charIndex++;
            setTimeout(typeEffect, 90);
        } else {
            tokenIndex++;
            charIndex = 0;
            spanEl = null;
            setTimeout(typeEffect, 100);
        }
    } else {
        runBtn.style.display = "block";
    }
}

function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
        rotateMsg.style.display = "block";
        codeEl.style.display = "none";
        runBtn.style.display = "none";
    } else {
        rotateMsg.style.display = "none";
        codeEl.style.display = "block";
        if (!started) {
            started = true;
            typeEffect();
        }
    }
}

checkOrientation();

window.addEventListener("resize", checkOrientation);

runBtn.addEventListener("click", () => {
    overlay.style.display = "block";
    runBtn.style.display = "none";

    var pastDate = new Date("2025-05-24");
    var now = new Date();

    pastDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    var diffTime = now - pastDate;
    var countDate = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    daysEl.textContent = countDate; 

    function updateClock() {
        const now = new Date();
        let hh = String(now.getHours()).padStart(2, '0');
        let mm = String(now.getMinutes()).padStart(2, '0');
        let ss = String(now.getSeconds()).padStart(2, '0');
        daysEl.textContent = `${countDate} Ngày`;
        timeEl.textContent = `${hh} Giờ ${mm} Phút ${ss} Giây`;
    }
    updateClock();
    setInterval(updateClock, 1000);
});

closeBtn.addEventListener("click", () => {
    overlay.style.display = "none";
    runBtn.style.display = "block";
});