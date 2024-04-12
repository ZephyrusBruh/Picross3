var mode = '';
const button = document.getElementById("testButton");
const table = document.getElementById("board");
const dimenstionSelect = document.getElementById("dimensions");
const cell = document.getElementsByClassName("cell")
document.addEventListener('contextmenu', event => event.preventDefault());
window.onload = start();
const randomBinary = getRandomBinary();
button.addEventListener("click", handleLeftClick);

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
    if(element.dataset.binary == 0){
        if(element.classList != "cell rselected"){
            element.classList.add("wrong");
            }
    }
    if(element.dataset.binary == 1){
        if(element.classList != "cell rselected"){
        element.classList.add("selected");
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
    console.log("board")
    numbers(rows, cols);
}

function numbers(rows,cols){
    let rowhints = "";
    let colhints = "";
    let count = 0;
    console.log("numbers!")

    for(let i = 0; i < rows; i++){
        count = 0;
        let cells = document.querySelectorAll(`[data-row="${i+1}"]`)
        for(let c = 0; c < cells.length; c++){
            if(cells[c].dataset.binary == 1){
                count += 1;
                //rowhints += count;
            }else {
                //console.log(`row: ${i} cellgroup: ${count}`);
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
            //console.log(`row: ${i} cellgroup: ${count}`);
            rowhints += " " + count;
        }
        count = 0;
        let hintcell = document.querySelectorAll(`.firstcol`)[i+1];
        hintcell.innerHTML = rowhints;
        rowhints = "";
    }
    console.log("step 0");


    for(let j = 0; j < cols; j++){
        count = 0;
        let cells = document.querySelectorAll(`[data-col="${j+1}"]`)
        for(let c = 0; c < cells.length; c++){
            if(cells[c].dataset.binary == 1){
                count += 1;

            }else {
                if(colhints != "" && count > 0){
                    colhints += " " + count
                    count = 0

                } else {
                    if(count > 0){
                        rowhints += count;
                        count = 0;
                    }
                }
            }            
        }
        if (count > 0){
            //console.log(`row: ${j} cellgroup: ${count}`);
            colhints += " " + count;
        }
        count = 0;
        let hintcell = document.querySelectorAll('.firstrow')[j+1];
        hintcell.innerHTML = colhints;
        colhints = "";      
    }
}

