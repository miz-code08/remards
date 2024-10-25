const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const mode = document.querySelectorAll(`.checkMode`);

const submit = document.querySelector(`.startBtn`);
const cards = [
    "A1", "11", "21", "31", "41", "51", "61", "71", "81", "91", "J1", "Q1", "K1",
    "A2", "12", "22", "32", "42", "52", "62", "72", "82", "92", "J2", "Q2", "K2",
    "A3", "13", "23", "33", "43", "53", "63", "73", "83", "93", "J3", "Q3", "K3",
    "A4", "14", "24", "34", "44", "54", "64", "74", "84", "94", "J4", "Q4", "K4"
];

const listCardImg = document.querySelectorAll(`.listCardImg`);
const listCardImg1 = document.querySelectorAll(`.listCardImg1Img`);
const arrowNext = document.querySelector(`.fa-angles-right`);
const arrowPrev = document.querySelector(`.fa-angles-left`);
const next = document.querySelector(`.fa-angle-right`);
const prev = document.querySelector(`.fa-angle-left`);
const cardIdx = document.querySelector(`.cardIdx`);
const score = document.querySelector(`.score`);
const time = document.querySelector(`.time`);

let viTri = 4;
let calc;
let scoreCnt = 0
let timeCnt;

// lấy mảng từ local
const shuffledCards = JSON.parse(localStorage.getItem("shuffledCards"));
const answer = JSON.parse(localStorage.getItem("answer"));
const endTime = JSON.parse(localStorage.getItem("endTime"));
// console.log(shuffledCards, answer);

// dark light mode 
if (darkModeMediaQuery.matches) {
    mode.forEach(val => {
        val.checked = true;
        mode.forEach(e => { e.checked = true; });
        document.body.style.background = 'var(--dark-bg)';
        document.body.style.color = 'var(--dark-text)';
    });
}

// nếu load tất cả xong
window.onload = function() {
    // ẩn loading
    document.querySelector(".loading").style.display = "none";
    document.querySelector(`.container`).style.display = "block";

    // dark light mode
    mode.forEach((val, idx) => {
        val.addEventListener("change", () => {
            if(val.checked) {
                mode.forEach(e => { e.checked = true; });
                document.body.style.background = 'var(--dark-bg)';
                document.body.style.color = 'var(--dark-text)';
            }
            else {
                mode.forEach(e => { e.checked = false; });
                document.body.style.background = 'var(--light-bg)';
                document.body.style.color = 'var(--light-text)';
            }
        });
    });
    
    // thay hình ? thành bài
    listCardImg.forEach((val, idx) => {
        let link = val.getAttribute('src');
        link = `../img/52/${shuffledCards[idx]}.png`
        val.src = link;    
    });

    answer.forEach((val, idx) => {
        let link = listCardImg1[idx].getAttribute('src');
        link = `../img/52/${val}.png`
        listCardImg1[idx].src = link; 
    });

    // hiệu ứng card
    listCardImg.forEach((val, idx) => {
        val.addEventListener("click", () => {
            viTri = idx;
            calcTranslate();
            removeActive();
            addActive()        
            cardTranslate();
        });        
    });

    listCardImg1.forEach((val, idx) => {
        val.addEventListener("click", () => {
            viTri = idx;
            calcTranslate();
            removeActive();
            addActive()        
            cardTranslate();
        });        
    });

    prev.addEventListener("click", () => {
        if(viTri > 0)
            viTri--;
        calcTranslate();
        removeActive();
        addActive()        
        cardTranslate();
    });

    next.addEventListener("click", () => {
        if(viTri < listCardImg.length - 1)
            viTri++;
        calcTranslate();
        removeActive();
        addActive()        
        cardTranslate();
    });

    arrowPrev.addEventListener("click", () => {
        viTri = 0;
        calcTranslate();
        removeActive();
        addActive()        
        cardTranslate();
    });

    arrowNext.addEventListener("click", () => {
        viTri = listCardImg.length - 1;
        calcTranslate();
        removeActive();
        addActive()        
        cardTranslate();
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            if(viTri > 0)
                viTri--;
            calcTranslate();
            removeActive();
            addActive()        
            cardTranslate();
        } 
        else if (event.key === 'ArrowRight') {
            if(viTri < listCardImg.length - 1)
                viTri++;
            calcTranslate();
            removeActive();
            addActive()        
            cardTranslate();
        }
    })

    function removeActive() {
        listCardImg.forEach((val, idx) => {
            val.classList.remove("active1");
            val.classList.remove("active2");
        });

        listCardImg1.forEach((val, idx) => {
            val.classList.remove("active1");
            val.classList.remove("active2");
        });
    }

    function addActive() {
        if(viTri > 3 && viTri < listCardImg.length - 4) {
            listCardImg[viTri].classList.add("active1");
            listCardImg[viTri-1].classList.add("active2");
            listCardImg[viTri+1].classList.add("active2");

            listCardImg1[viTri].classList.add("active1");
            listCardImg1[viTri-1].classList.add("active2");
            listCardImg1[viTri+1].classList.add("active2");
        }        
        else {
            listCardImg[viTri].classList.add("active2");
            listCardImg1[viTri].classList.add("active2");
        }
    }

    function calcTranslate() {
        calc = (viTri - 4 < 0) ? 0 : (viTri >= listCardImg.length - 4) ? (listCardImg.length - 9) * 100 : (viTri - 4) * 100;
        cardIdx.textContent = `${viTri+1}/52`;
    }

    function cardTranslate() {
        listCardImg.forEach(val => {
            val.style.translate = `-${calc}%`;
        });

        listCardImg1.forEach(val => {
            val.style.translate = `-${calc}%`;
        });
    }  

    // check kết quả
    answer.forEach((val, idx) => {
        if(val === shuffledCards[idx]) {
            listCardImg1[idx].classList.add("green");
            scoreCnt++;
        }
        else {
            listCardImg1[idx].classList.add("red");
        }
    });

    score.textContent = `${scoreCnt}/52`;
    time.textContent = endTime;
};