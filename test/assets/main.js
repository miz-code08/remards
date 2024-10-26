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

    // ======================================================CARD======================================================
    // 
    const updateCard = (newIndex) => {
        viTri = newIndex;
        calcTranslate();
        removeActive();
        addActive();
        cardTranslate();
    };
    
    listCardImg.forEach((val, idx) => {
        val.addEventListener("click", () => updateCard(idx));
    });
    
    prev.addEventListener("click", () => {
        if (viTri > 0) 
            updateCard(--viTri);
    });
    
    next.addEventListener("click", () => {
        if (viTri < listCardImg.length - 1) 
            updateCard(++viTri);
    });
    
    arrowPrev.addEventListener("click", () => updateCard(0));
    arrowNext.addEventListener("click", () => updateCard(listCardImg.length - 1));
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft' && viTri > 0)
            updateCard(--viTri);
        else if (event.key === 'ArrowRight' && viTri < listCardImg.length - 1)
            updateCard(++viTri);
    });
    
    const removeActive = () => {
        listCardImg.forEach(val => {
            val.classList.remove("active1", "active2");
        });
    };
    
    const addActive = () => {
        listCardImg[viTri].classList.add("active1");
        if (viTri > 0) 
            listCardImg[viTri - 1].classList.add("active2");
        if (viTri < listCardImg.length - 1) 
            listCardImg[viTri + 1].classList.add("active2");
    };
    
    const calcTranslate = () => {
        calc = Math.max(0, Math.min((viTri - 4) * 100, (listCardImg.length - 9) * 100));
        cardIdx.textContent = `${viTri + 1}/52`;
    };
    
    const cardTranslate = () => {
        listCardImg.forEach(val => {
            val.style.translate = `-${calc}%`;
        });
    };

    // ======================================================INPUT======================================================
    setInterval(() => input.focus(), 100);
    
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const temp = input.value.toUpperCase();
        if (shuffledCards.includes(temp)) {
            answer[viTri] = temp;
            listCardImg[viTri].src = `../img/52/${temp}.png`;
            if (viTri < listCardImg.length - 1)
                updateCard(++viTri);
            input.placeholder = "Nhập đáp án";
            input.style.background = "#a370f0";
        } 
        else {
            input.placeholder = "Nhập sai kí hiệu";
            input.style.background = "red";
        }
        input.value = "";
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