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
    msg.style.margin = "50px"
    plagbtn.style.margin = "10px";
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