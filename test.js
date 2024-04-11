var mode = '';
const button = document.getElementById("testButton");
const table = document.getElementById("board");
const dimenstionSelect = document.getElementById("dimensions");
const cell = document.getElementsByClassName("cell")
document.addEventListener('contextmenu', event => event.preventDefault());
window.onload = start();
const randomBinary = getRandomBinary();


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
    buildTable(10,10);
}


// Function to handle left click
function handleLeftClick(event) {
    rebuildTable();
    event.preventDefault();
}


function rebuildTable(){
    let selectedDims = dimenstionSelect.value.split("x");
    let rows = selectedDims[0];
    let cols = selectedDims[1];
    buildTable(rows,cols);
}


function handleCellClick(element){
    if(element.dataset.binary == 1){
        if(element.classList != "cell rselected"){
        element.classList.add("selected");
        }
    }
    if(element.dataset.binary == 0){
        if(element.classList != "cell rselected"){
            element.classList.add("wrong");
            }
    }

    
}
function handleCellRightclick(element){
    if(element.dataset.binary == 1){
        if(element.classList != "cell selected"){
        element.classList.add("wrong");
        }
    }
    if(element.dataset.binary == 0){
        if(element.classList != "cell selected"){
            element.classList.add("rselected");
            }
    }
}


// Add event listener for left click
button.addEventListener("click", handleLeftClick);


function getRandomBinary() {
    const randomNum = Math.random();
    const binaryValue = Math.round(randomNum);
    return binaryValue;
}



function buildTable(rows, cols){
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
            let binary =  getRandomBinary();
            
            row += `<td class="${classes}" data-row="${i}" data-col="${j}" data-binary="${binary}" onClick="handleCellClick(this)" onContextMenu="handleCellRightclick(this)"></td>`;
        }
        row += "</tr>";
        tablehtml+= row;
    }
    tablehtml += "</tbody>";
    table.innerHTML = tablehtml;
    console.log("board")
    numbers(rows, cols);
}
function numbers(rows,cols){
    let rowhints = "";
    let colhints = "";
    let count = 0;
    console.log("numbers!")

    for(let i = 0; i <= rows; i++){
        count = 0;
        let cells = document.querySelectorAll(`[data-row="${i+1}"]`)
        for(let c = 0; c < cells.length; c++){
            if(cells[c].dataset.binary == 1){
                count += 1;
            }else {
                console.log(`row: ${i} cellgroup: ${count}`);
                count = 0
                /*if(rowhint != ""){
                    rowhint += " , ";
                    count = 0
                } else {
                    count = 0
                }*/
            }
            
        }
        if (count > 0){
            console.log(`row: ${i} cellgroup: ${count}`);
            count = 0;
        }

    }
    for(let j = 0; j <= cols; j++){
        count = 0;
        let cells = document.querySelectorAll(`[data-col="${j+1}"]`)
        for(let c = 0; c < cells.length; c++){
            if(cells[c].dataset.binary == 1){
                count += 1;
            }else {
                console.log(`col: ${j} cellgroup: ${count}`);
                count = 0
                /*if(rowhint != ""){
                    rowhint += " , ";
                    count = 0
                } else {
                    count = 0
                }*/
            }
            
        }
        if (count > 0){
            console.log(`row: ${j} cellgroup: ${count}`);
            count = 0;
        }
        
    }
    console.log(rowhints, colhints);
    }
