// Selecting all necessary DOM elements
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Track current player's turn (true = Player 0, false = Player X)
let turn0 = true;

// All possible winning combinations (by index of boxes)
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

// Resets game to initial state
const resetGame = () => {
    turn0 = true;
    enableBoxes(); // Re-enable boxes
    msgContainer.classList.add("hide"); // Hide winner message
};

// Add click event to each game box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        // Place 0 or X based on current turn
        if (turn0) {
            box.innerText = "0";
            turn0 = false;
        } else {
            box.innerText = "X";
            turn0 = true;
        }
        box.disabled = true; // Disable the clicked box
        checkWinner(); // Check if someone has won
    });
});

// Disable all boxes (after win)
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Enable and clear all boxes (on reset)
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

// Display the winner and disable the board
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide"); // Show message
    disableBoxes(); // Stop further clicks
};

// Check each winning pattern to see if a player has won
const checkWinner = () => {
    let hasWin=false;
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // We have a winner
                showWinner(pos1Val);
                hasWin=true;
                return;
            }
            //When has no winner.
            if(!hasWin){
                const allboxes = [...boxes].every((box)=>box.innerText !=="");
                if(allboxes){
                    msg.innerText = "Match Draw";
                    msgContainer.classList.remove('hide');
                    console.log('match Draw');                    
                }
            }
        }
    }
};

// Attach reset function to both buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);

 /* i have to do when all filds are done console.log (draw.) game  */