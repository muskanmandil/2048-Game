// Step 1: Genertaing 2 random positions at start & making sure they are different
let randomPosition1 = Math.floor(Math.random() * 16);
let randomPosition2 = Math.floor(Math.random() * 16);

while (randomPosition1 == randomPosition2) {
    randomPosition2 = Math.floor(Math.random() * 16);
}


// Step 2: Storing all the box elements in an array
const arr = Array.from(document.getElementsByClassName("box"));


// Step 3: A Function to show number in a particular position
const showNumber = (position, value) => {

    arr[position].textContent = value;

    arr[position].classList.remove("false");
    arr[position].classList.add("true");
    arr[position].classList.add("x" + value);
}


// Step 4: A function to hide number at a particular position
const hideNumber = (position, value) => {

    arr[position].textContent = "";

    arr[position].classList.remove("true");
    arr[position].classList.add("false");
    arr[position].classList.remove("x" + value);
}


// Step 5: A function to generate a new Position & show number there
const generateNewPosition = () => {
    let falseArr = Array.from(document.getElementsByClassName("false"));
    let newPosition = falseArr[Math.floor(Math.random() * falseArr.length)].id;

    showNumber(newPosition, 2);
}


// Step 6: A function to update score
let score = 0;
const updateScore = (value) => {
    score += value;
    document.getElementById("score").innerHTML = score;
}


// Step 7: Functions for movements

const moveUp = () => {
    let trueArr = Array.from(document.getElementsByClassName("true"));
    
    trueArr.forEach(element => {

        let pos = Number.parseInt(element.id);
        let rem = pos % 4;

        while (pos != rem) {
            if (arr[pos - 4].classList.contains("true") && arr[pos - 4].textContent != arr[pos].textContent) {
                break;
            }

            if (arr[rem].classList.contains("false")) {
                let value = Number.parseInt(arr[pos].textContent);
                hideNumber(pos, value);
                pos = rem;
                showNumber(pos, value);
                break;
            }

            if (arr[rem].textContent == arr[pos].textContent) {
                let value = Number.parseInt(arr[pos].textContent) * 2;
                hideNumber(pos, value / 2);
                pos = rem;
                hideNumber(pos, value / 2);
                showNumber(pos, value);
                updateScore(value);
                break;
            }

            rem += 4;
        }

        trueArr = Array.from(document.getElementsByClassName("true"));
    });
}


const moveDown = () => {
    let trueArr = Array.from(document.getElementsByClassName("true"));
    trueArr.reverse();

    trueArr.forEach(element => {

        let pos = Number.parseInt(element.id);
        let rem = pos % 4;
        let k = 0;

        while (pos < 12 && pos != 12 + rem - k) {

            if (arr[pos + 4].classList.contains("true") && arr[pos + 4].textContent != arr[pos].textContent) {
                break;
            }

            if (arr[12 + rem - k].classList.contains("false")) {
                let value = Number.parseInt(arr[pos].textContent);
                hideNumber(pos, value);
                pos = 12 + rem - k;
                showNumber(pos, value);
                break;
            }

            if (arr[12 + rem - k].textContent == arr[pos].textContent) {
                let value = Number.parseInt(arr[pos].textContent) * 2;
                hideNumber(pos, value / 2);
                pos = 12 + rem - k;
                hideNumber(pos, value / 2);
                showNumber(pos, value);
                updateScore(value);
                break;
            }

            k += 4;
        }

        trueArr = Array.from(document.getElementsByClassName("true"));
        trueArr.reverse();
    });
}


const moveLeft = () => {
    let trueArr = Array.from(document.getElementsByClassName("true"));

    trueArr.forEach(element => {

        let pos = Number.parseInt(element.id);
        let rem = pos % 4;

        while (rem != 0) {

            if (arr[pos - 1].classList.contains("true") && arr[pos - 1].textContent != arr[pos].textContent) {
                break;
            }

            if (arr[pos - rem].classList.contains("false")) {
                let value = Number.parseInt(arr[pos].textContent);
                hideNumber(pos, value);
                pos = pos - rem;
                showNumber(pos, value);
                break;
            }

            if (arr[pos - rem].textContent == arr[pos].textContent) {
                let value = Number.parseInt(arr[pos].textContent) * 2;
                hideNumber(pos, value / 2);
                pos = pos - rem;
                hideNumber(pos, value / 2);
                showNumber(pos, value);
                updateScore(value);
                break;
            }

            rem--;
        }

        trueArr = Array.from(document.getElementsByClassName("true"));
    });
}


const moveRight = () => {
    let trueArr = Array.from(document.getElementsByClassName("true"));
    trueArr.reverse();

    trueArr.forEach(element => {

        let pos = Number.parseInt(element.id);
        let rem = pos % 4;

        while (rem != 3) {
            if (arr[pos + 1].classList.contains("true") && arr[pos + 1].textContent != arr[pos].textContent) {
                break;
            }

            if (arr[pos + 3 - rem].classList.contains("false")) {
                let value = Number.parseInt(arr[pos].textContent);
                hideNumber(pos, value);
                pos = pos + 3 - rem;
                showNumber(pos, value);
                break;
            }

            if (arr[pos + 3 - rem].textContent == arr[pos].textContent) {
                let value = Number.parseInt(arr[pos].textContent) * 2;
                hideNumber(pos, value / 2);
                pos = pos + 3 - rem;
                hideNumber(pos, value / 2);
                showNumber(pos, value);
                updateScore(value);
                break;
            }

            rem++;
        }

        trueArr = Array.from(document.getElementsByClassName("true"));
        trueArr.reverse();
    });
}

// Step: A function to judge whether game is over or won
// const resultGame = () => {
//     let tempArr = Array.from(document.getElementsByClassName("true"));
    
//     for (let element of tempArr) {
//         if (element.textContent == "2048") {
//             document.getElementsByClassName("game")[0].classList.add("win");
//             document.getElementsByClassName("structure")[1].classList.remove("hidden");
//             break;
//         }
//     }

//     if(tempArr.length == 16){
//         document.getElementsByClassName("gaem")[0].classList.add("lost");   
//         document.getElementsByClassName("structure")[0].classList.remove("hidden");   
//     }
// }

// Step 8: Showing number 2 at those two random positions
showNumber(randomPosition1, 2);
showNumber(randomPosition2, 2);


// Step 9: Event Listener to recognize the direction of movement & calling specific functions
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case 'ArrowUp':
            console.log("up");
            moveUp()
            break;

        case 'ArrowDown':
            console.log("down");
            moveDown()
            break;

        case 'ArrowLeft':
            console.log("left");
            moveLeft();
            break;

        case 'ArrowRight':
            console.log("right");
            moveRight();
            break;
    }
});


// Step 10: Refresh Button
let reloadButtons = Array.from(document.getElementsByClassName("reload"));
reloadButtons.forEach(element => {
    element.addEventListener("click", () => {
        location.reload();
    })

});