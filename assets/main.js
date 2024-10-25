const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

const mode = document.querySelectorAll(`.checkMode`);

const startBtn = document.querySelector(`.startBtn`);

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

    // chuyển hướng đến trang nhớ
    startBtn.addEventListener("click", () => {
        document.querySelector(".loading").style.display = "flex";
        document.querySelector(`.container`).style.display = "none";
        
        setTimeout(() => {
            window.location.assign('./remember/index.html');
            const shuffledCards = shuffleArray(cards);
            console.log(shuffledCards);
        }, 1000);
    })
};