const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
const mode = document.querySelectorAll(`.checkMode`);

const submit = document.querySelector(`.startBtn`);

const listCardImg = document.querySelectorAll(`.listCardImg`);
const arrowNext = document.querySelector(`.fa-angles-right`);
const arrowPrev = document.querySelector(`.fa-angles-left`);
const next = document.querySelector(`.fa-angle-right`);
const prev = document.querySelector(`.fa-angle-left`);
const cardIdx = document.querySelector(`.cardIdx`);

let viTri = 0;
let calc;

const form = document.querySelector(`.answer`);
const input = document.querySelector(`.input`);
const answer = Array(52).fill("0");

// lấy mảng shuffledCards từ remember
const shuffledCards = JSON.parse(localStorage.getItem("shuffledCards"));

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

    input.focus();
    form.addEventListener("submit", (e) => {
        e.preventDefault(shuffledCards);
        let temp = input.value.toUpperCase();
        if(shuffledCards.includes(temp)) {
            answer[viTri] = temp;
            let link = `../img/52/${temp}.png`;
            listCardImg[viTri].src = link;
            if(viTri < listCardImg.length - 1)
                viTri++;
            calcTranslate();
            removeActive();
            addActive()        
            cardTranslate();
            input.placeholder = "Nhập đáp án"
            input.style.background = "#a370f0";
        }
        else {
            input.placeholder = "Nhập sai kí hiệu"
            input.style.background = "red";
        }
        input.value = "";
        input.focus();
    }); 

    // ngăn sự thoát khỏi trang khi đang nhớ
    window.addEventListener('beforeunload', (e) => {
        e.preventDefault();
        e.returnValue = '';
    });

    submit.addEventListener("click", () => {
        window.location.assign('../answer/index.html');
        // tải hàm answer lên
        localStorage.setItem("answer", JSON.stringify(answer));
    });
};