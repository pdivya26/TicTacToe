let boxes = document.querySelectorAll(".box");
let rstbtn = document.querySelector("#reset");
let plagbtn = document.querySelector("#nwgm");
let clsbtn = document.querySelector("#close");

let msg = document.querySelector("#msg");
let msgcnt = document.querySelector(".msg-container");

let turnO = false;
let hasWinner = false;

let c = 0;

const winpat = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7], [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if(turnO) {
            box.innerText = "O";
            turnO = false;
            box.style.color = "#040443";
            box.style.backgroundColor = "#82ccf7";
        }
        else {
            box.innerText = "X";
            turnO = true;
            box.style.color = "#800000";
            box.style.backgroundColor = "#e7737b";
        }
        box.disabled = true;
        c++;
        console.log(c);

        checkWinner();

        if (!hasWinner) {
            checkTie(); 
        }
    });
});

const showTie = () => {
    msg.innerText = "It's a TIE!!";
    msgcnt.classList.remove("hide");
    if (window.innerWidth <= 320) {
        // Small mobile
        msg.style.margin = "25px auto 10px auto";
        plagbtn.style.margin = "8px";
    } else if (window.innerWidth <= 475) {
        // Large mobile
        msg.style.margin = "40px auto 30px auto";
        plagbtn.style.margin = "9px";
    } else if (window.innerWidth <= 768) {
        // Tablet
        msg.style.margin = "45px auto 35px auto";
        plagbtn.style.margin = "10px";
    } else {
        // Laptop and larger
        msg.style.margin = "55px auto 45px auto";
        plagbtn.style.margin = "12px";
    }
};

checkTie = () => {
    if((c >= 9) && !hasWinner) {
        console.log("TIE!!")
        showTie();
    }
}

const disableBoxes = () => {
    // boxes.forEach(box => {
    //     box.disabled = true;
    // });
    for(box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    // boxes.forEach(box => {
    //     box.disabled = false;
    // });
    for(box of boxes) {
        box.disabled = false;
    }
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations!!\n Player ${winner} is the WINNER!`;
    msgcnt.classList.remove("hide");

    const msgContainer = document.getElementsByClassName("msg-container")[0];

    if (window.innerWidth <= 320) {
        // Small mobile
        msgContainer.style.width = "80vmin";
        msgContainer.style.height = "40vmin";
        msg.style.margin = "5px auto 0px auto";
        msgContainer.style.top = "38%";
        msgContainer.style.left = "10%";
        msg.style.fontSize = "6vmin";
        plagbtn.style.margin = "2px";
    } else if (window.innerWidth <= 475) {
        // Large mobile
        msgContainer.style.width = "80vmin";
        msgContainer.style.height = "40vmin";
        msg.style.margin = "15px auto 0px auto";
        msg.style.fontSize = "7vmin";
        msgContainer.style.top = "38%";
        msgContainer.style.left = "10%";
        plagbtn.style.margin = "2px";
        plagbtn.style.fontSize = "1rem";
    } else if (window.innerWidth <= 768) {
        // Tablet
        msgContainer.style.width = "80vmin";
        msgContainer.style.height = "40vmin";
        msg.style.margin = "5px auto 0px auto";
        msgContainer.style.top = "36%";
        msgContainer.style.left = "16%";
        msg.style.margin = "25px auto 8px auto";
        plagbtn.style.margin = "10px";
        plagbtn.style.fontSize = "1.25rem"
    } else {
        // Laptop and larger
        msgContainer.style.top = "30%";
        msgContainer.style.left = "30%";
        msg.style.margin = "20px auto 8px auto";
        plagbtn.style.margin = "0px";
    }
};

checkWinner = () => {
    for(pat of winpat) {
        let p1 = boxes[pat[0]].innerText;
        let p2 = boxes[pat[1]].innerText;
        let p3 = boxes[pat[2]].innerText;

        if(p1 != "" && p2 != "" && p3 != "") {
            if(p1 === p2 && p2 === p3) {
                console.log("WINNER!!", p1);
                hasWinner = true;
                showWinner(p1);
                disableBoxes();
                return;
            }
        }
    }
};

const newGame = () => {
    c = 0;
    turnO = false;
    hasWinner = false;
    enableBoxes();
    for(box of boxes) {
        box.innerText = "";
        box.style.backgroundColor = "white";
    }
    msgcnt.classList.add("hide");
};

const closeDialog = () => {
    msgcnt.classList.add("hide");
};

rstbtn.addEventListener("click", newGame);
plagbtn.addEventListener("click", newGame);
clsbtn.addEventListener("click", closeDialog);