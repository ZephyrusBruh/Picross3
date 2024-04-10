var mode = '';
const button = document.getElementById("testButton");
const table = document.getElementById("board");
const dimenstionSelect = document.getElementById("dimensions");
const cell = document.getElementsByClassName("cell")
document.addEventListener('contextmenu', event => event.preventDefault());
window.onload = start();
    
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
    console.log("Left click!");
    rebuildTable();
    event.preventDefault();
}

function rebuildTable(){
    getRandomBinary();
    let selectedDims = dimenstionSelect.value.split("x");
    let rows = selectedDims[0];
    let cols = selectedDims[1];
    buildTable(rows,cols);
}

function handleCellClick(element){
    
    element.classList.add("selected");
}
function handleCellRightclick(element){
    element.classList.add("rselected");
    
}


// Add event listener for left click
button.addEventListener("click", handleLeftClick);


function getRandomBinary() {
    const randomNum = Math.random();
    const binaryValue = Math.round(randomNum);

    return binaryValue;
}

const randomBinary = getRandomBinary();
console.log(randomBinary); 

function buildTable(rows, cols){
    let tablehtml =  "<tbody>";
    for(let i = 0; i <= rows; i++){
        let row = "<tr>";
        for(let j = 0; j <= cols; j++){
            let classes = "cell";
            if(i == 0){
                classes += " firstrow";
            } else {
                classes += " " + getRandomBinary();
            }
            if(j == 0){
                classes += " firstcol";
            }
            
            row += `<td class="${classes}" data-row="${i}" data-col="${j}" onClick="handleCellClick(this)" onContextMenu="handleCellRightclick(this)"></td>`;
        }
        row += "</tr>";
        tablehtml+= row;
    }
    tablehtml += "</tbody>";
    table.innerHTML = tablehtml;
}