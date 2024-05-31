var mode = '';
const button = document.getElementById("testButton");
const table = document.getElementById("board");
const dimenstionSelect = document.getElementById("dimensions");
const cell = document.getElementsByClassName("cell")
const seedtext = document.getElementById("seedStart")
document.addEventListener('contextmenu', event => event.preventDefault());

button.addEventListener("click", handleLeftClick);
var guesses = 0;
var wrongguesses = 0;
var total = 0;
var totalguesses = 0;
var progress = 0;


var seed = cyrb128(Math.random().toString());
// Four 32-bit component hashes provide the seed for sfc32.
var rand = sfc32(seed[0], seed[1], seed[2], seed[3]);
//const seedgen = () => (rand());
//const getRand = sfc32(seedgen(), seedgen(), seedgen(), seedgen());

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
    VisualStyle(mode);
}


function VisualStyle(mode){
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
    updateVariable();
    updateProgress();
}


// Function to handle left click
function handleLeftClick(event) {
    console.log("cry");
    if(seedtext.value != ""){
        seed = cyrb128(seedtext.value);
        rand = sfc32(seed[0], seed[1], seed[2], seed[3]);
    }
    seedtext.value = "";
    rebuildTable();
    updateWrong();
    updateProgress();
}


function rebuildTable(){
    let selectedDims = dimenstionSelect.value.split("x");
    let rows = selectedDims[0];
    let cols = selectedDims[1];
    guesses = 0;
    wrongguesses = 0;
    total = 0;
    totalguesses =0;
    progress = 0
    buildTable(rows,cols);
    updateProgress();
}


function handleCellClick(element){
    if (!element.classList.contains("perfect")){
        if(element.dataset.binary == 1){
          if(element.classList != "cell rselected" && !element.classList.contains("wrong")){
                if(element.classList != "cell selected"){
                    guesses += 1;
                    totalguesses +=1   
                }
                element.classList.add("selected");
            }

        }
        if(element.dataset.binary == 0){
            console.log(wrongguesses);
            if(element.classList != "cell rselected" && !element.classList.contains("wrong")){
                element.classList.add("wrong");
                element.classList.add("rselected");
                wrongguesses +=1;
                
             }
        }
        endGame();
        updateWrong();
        updateProgress();
    }
}
function handleCellRightclick(element){
    if (!element.classList.contains("perfect")){
        if(element.dataset.binary == 1){
            if(element.classList != "cell selected"){
                element.classList.add("wrong");
                element.classList.add("selected");
                wrongguesses += 1;
                guesses += 1;
                totalguesses +=1
            }
        }
        if(element.dataset.binary == 0){
            if(element.classList != "cell selected" && !element.classList.contains("wrong")){
                element.classList.add("rselected");
                console.log(wrongguesses);

            }
        }
    
        endGame();
        updateWrong();
        updateProgress();
        crossOuts();
    }   
}


function buildTable(rows, cols){
    guesses = 0;
    wrongguesses = 0;
    total =0;
    totalguesses = 0;
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
                total +=1;
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
    if(guesses == total && wrongguesses == 0){
        for(let c = 0; c < rows; c++){
            let cells = document.querySelectorAll(`[data-row="${c+1}"]`)
            cells.forEach(cell => {
                if(cell.classList == "cell selected"){
                    cell.classList.remove("selected");
                    cell.classList.add("perfect");
                } else if(cell.classList == "cell rselected") {
                    cell.classList.remove("rselected");
                    cell.classList.add("emptyperfect");
                } else {
                    cell.classList.add("emptyperfect")
                }
            
            });
        }
    } else if(guesses == total){
        for(let c = 0; c < rows; c++){
            let cells = document.querySelectorAll(`[data-row="${c+1}"]`)
            cells.forEach(cell => {
                if(cell.classList == "cell selected"){
                    cell.classList.remove("selected");
                    cell.classList.add("finished");
                } else if(cell.classList == "cell rselected") {
                    cell.classList.remove("rselected");
                    cell.classList.add("emptyfinished");
                } else {
                    cell.classList.add("emptyfinished")
                }
            
            });
        }
    }
    
}

function updateWrong(){
    document.getElementById('wrongLbl').innerHTML = wrongguesses;
}
function updateProgress(){
    progress = totalguesses / total;
    progress = progress * 100;
    document.getElementById('progressCounter').innerHTML = (progress.toFixed(1) + '%');
}

function crossOuts(rows, cols){
    
}



rebuildTable();

function cyrb128(str) {
    let h1 = 1779033703, h2 = 3144134277,
        h3 = 1013904242, h4 = 2773480762;
    for (let i = 0, k; i < str.length; i++) {
        k = str.charCodeAt(i);
        h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
        h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
        h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
        h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
    }
    h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
    h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
    h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
    h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
    h1 ^= (h2 ^ h3 ^ h4), h2 ^= h1, h3 ^= h1, h4 ^= h1;
    return [h1>>>0, h2>>>0, h3>>>0, h4>>>0];
  }
  


  
  function sfc32(a, b, c, d) {
  return function() {
    a |= 0; b |= 0; c |= 0; d |= 0;
    let t = (a + b | 0) + d | 0;
    d = d + 1 | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    c = c + t | 0;
    return (t >>> 0) / 4294967296;
  }
  }


  function getRandomBinary(){
    return Math.floor(rand() * 10) % 2;
  }