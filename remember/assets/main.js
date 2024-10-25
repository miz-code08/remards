const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const mode = document.querySelectorAll(`.checkMode`);

const startBtn = document.querySelector(`.startBtn`);
const cards = [
    "A1", "11", "21", "31", "41", "51", "61", "71", "81", "91", "J1", "Q1", "K1",
    "A2", "12", "22", "32", "42", "52", "62", "72", "82", "92", "J2", "Q2", "K2",
    "A3", "13", "23", "33", "43", "53", "63", "73", "83", "93", "J3", "Q3", "K3",
    "A4", "14", "24", "34", "44", "54", "64", "74", "84", "94", "J4", "Q4", "K4"
];

const listCardImg = document.querySelectorAll(`.listCardImg`);
const arrowNext = document.querySelector(`.fa-angles-right`);
const arrowPrev = document.querySelector(`.fa-angles-left`);
const next = document.querySelector(`.fa-angle-right`);
const prev = document.querySelector(`.fa-angle-left`);
const cardIdx = document.querySelector(`.cardIdx`);

let viTri = 4;
let calc;

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
    
    const shuffledCards = shuffleArray(cards);
    listCardImg.forEach((val, idx) => {
        let link = val.getAttribute('src');
        link = `../img/52card/${cards[idx]}.png`
        val.src = link;
        console.log(link);       
    });

    // Hàm để trộn các phần tử trong mảng
    function shuffleArray(array) {
        let newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

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
    }

    function addActive() {
        if(viTri > 3 && viTri < listCardImg.length - 4) {
            listCardImg[viTri].classList.add("active1");
            listCardImg[viTri-1].classList.add("active2");
            listCardImg[viTri+1].classList.add("active2");
        }        
        else {
            listCardImg[viTri].classList.add("active2");
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
    }
    
    // ngăn sự thoát khỏi trang khi đang nhớ
    let isFormDirty = true;

    // Sự kiện trước khi người dùng rời khỏi trang
    window.addEventListener('beforeunload', function (event) {
        event.preventDefault();
        event.returnValue = '';
    });
};