var mode = '';
const button = document.getElementById("testButton");
const table = document.getElementById("board");
const dimenstionSelect = document.getElementById("dimensions");
const cell = document.getElementsByClassName("cell")
document.addEventListener('contextmenu', event => event.preventDefault());
window.onload = start();
const randomBinary = getRandomBinary();
button.addEventListener("click", handleLeftClick);
var guesses = 0;
var wrongguesses = 0;

// Function to update the variable based on selected radio button
function updateVariable() {
    var radios = document.getElementsByName('Mode');
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
             mode = radios[i].value;
        break;
        }
    }
    Style(mode);
}


function Style(mode){
    var body = document.body;
    body.className = '';
    switch(mode){
        case "Oceanic":
            body.className = '';
            break;
        case "Reef":
            body.classList.add('reef');
            break;
        case "Whale":
            body.classList.add('whale');
            break;
    }
}


function start(){
    updateVariable();
    buildTable(10,10);
}


// Function to handle left click
function handleLeftClick(event) {
    rebuildTable();
    updateWrong();
}


function rebuildTable(){
    let selectedDims = dimenstionSelect.value.split("x");
    let rows = selectedDims[0];
    let cols = selectedDims[1];
    guesses = 0;
    wrongguesses = 0;
    buildTable(rows,cols);
}


function handleCellClick(element){
    if(element.dataset.binary == 1){
        if(element.classList != "cell rselected" && element.classList != "wrong"){
        element.classList.add("selected");
        }
    }
    if(element.dataset.binary == 0){
        if(element.classList != "cell rselected"){
            element.classList.add("wrong");
            wrongguesses +=1;
            }
    }
    guesses += 1;
    endGame();
    updateWrong();
}
function handleCellRightclick(element){
    if(element.dataset.binary == 1){
        if(element.classList != "cell selected"){
            element.classList.add("wrong");
            wrong += 1;

        }
    }
    if(element.dataset.binary == 0){
        if(element.classList != "cell selected" && element.classList != "wrong"){
            element.classList.add("rselected");
            }
    }
    guesses += 1;
    endGame();
    updateWrong();
}




function getRandomBinary() {
    const randomNum = Math.random();
    const binaryValue = Math.round(randomNum);
    return binaryValue;
}

function buildTable(rows, cols){
    guesses = 0;
    wrongguesses = 0;
    let tablehtml =  "<tbody>";
    for(let i = 0; i <= rows; i++){
        let row = "<tr>";
        for(let j = 0; j <= cols; j++){
            let classes = "cell";
            if(i == 0){
                classes += " firstrow";
            } 
            if(j == 0){
                classes += " firstcol";
            }
            if (i != 0 && j != 0){
                let binary =  getRandomBinary();
                row += `<td class="${classes}" data-row="${i}" data-col="${j}" data-binary="${binary}" onClick="handleCellClick(this)" onContextMenu="handleCellRightclick(this)"></td>`;
            } else {
                row += `<td class="${classes}" data-row="${i}" data-col="${j}" onClick="handleCellClick(this)" onContextMenu="handleCellRightclick(this)"></td>`;
            }                      
        }
        row += "</tr>";
        tablehtml+= row;
    }
    tablehtml += "</tbody>";
    table.innerHTML = tablehtml;

    numbers(rows, cols);
}

function numbers(rows,cols){
    let rowhints = "";
    let colhints = "";
    let count = 0;

    for(let i = 0; i < rows; i++){
        count = 0;
        let cells = document.querySelectorAll(`[data-row="${i+1}"]`)
        for(let c = 0; c < cells.length; c++){
            if(cells[c].dataset.binary == 1){
                count += 1;

            }else {
                if(rowhints != "" && count > 0){
                    rowhints += " " + count;
                    count = 0;
                } else {
                    if(count > 0){
                        rowhints += count;
                        count = 0;
                    }
                }
            }
        }
        if (count > 0){
            rowhints += " " + count;
        }
        count = 0;
        let hintcell = document.querySelectorAll(`.firstcol`)[i+1];
        hintcell.innerHTML = rowhints;
        rowhints = "";
    }

    for(let j = 0; j < cols; j++){
        count = 0;
        let cells = document.querySelectorAll(`[data-col="${j+1}"]`)
        for(let c = 0; c < cells.length; c++){
            if(cells[c].dataset.binary == 1){
                count += 1;

            }else {
                if(colhints != "" && count > 0){
                    colhints += " " + count + "<br>";
                    count = 0

                } else {
                    if(count > 0){
                        colhints += count + "<br>";
                        count = 0;
                    }
                }
            }            
        }
        if (count > 0){
            colhints += " " + count;
        }
        count = 0;
        let hintcell = document.querySelectorAll('.firstrow')[j+1];
        hintcell.innerHTML = colhints;
        colhints = "";      
    }
}

function endGame(){
    let selectedDims = dimenstionSelect.value.split("x");
    let rows = selectedDims[0];
    let cols = selectedDims[1];
    var total = cols * rows;
    
    if(guesses == total && wrongguesses == 0){
        for(let c = 0; c < rows; c++){
            c.classList = "perfect"
        }
    } else if(guesses == total){
        console.log("Finished");
    } else if(guesses != total){
        console.log("Not Done");
    }
    

}

function updateWrong(){
    document.getElementById('wrongLbl').innerHTML = "Wrong counter: " + wrongguesses;
}

function crossOuts(rows, cols){
    
}