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
    console.log(mode);
    Style(mode);
}


function Style(mode){
    switch(mode){
        case "Oceanic":
            console.log("butt");
            $('body').addClass("oceanic");
        case "Reef":
            console.log("butt1");
            $('body').addClass('reef');
        case "Whale":
            console.log("butt2");
            $('body').addClass('whale')
    }


}
function start(){
    let tablehtml =  "<tbody>";
    let colors = " butt"
    for(let i = 0; i <= 10; i++){
        let row = "<tr>";
        for(let j = 0; j <= 10; j++){
            let classes = "cell";
            if(i == 0){
                classes += " firstrow";
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
            row += `<td class="${classes}" data-row="${i}" data-col="${j}" onClick="handleCellClick(this)" onContextMenu="handleCellRightclick(this)"></td>`;
        }
        row += "</tr>";
        tablehtml+= row;
    }
    tablehtml += "</tbody>";
    table.innerHTML = tablehtml;
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