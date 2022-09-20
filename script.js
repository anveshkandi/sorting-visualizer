const box = document.querySelector('.box');
const randomButton = document.querySelector('.randomBtn');
const bblButton = document.querySelector('.bblBtn');
const selButton = document.querySelector('.selBtn');
const RED = "element-red";
const BLUE = "element-blue";

let barCount = 20;
let BAR_WIDTH = 100 / barCount;
let BAR_HEIGHT = 100 / barCount;
let delay = 100;
var elements = []

// Generates original set sorted bars
for (var i = 0; i<barCount; i++){
    const div = document.createElement('div');
    div.className = "element";
    div.style.height = (i+1)*BAR_HEIGHT + "%";
    div.style.width = BAR_WIDTH + "%"
    div.style.left = i*BAR_WIDTH + "%";
    elements.push(div);
    box.appendChild(div);
}

// Randomizes bars
async function randomize(bars){
    for (var i = bars.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        await swap(i,j, 5);
    }
}

async function swap (i,j, delay){
    elements[i].classList.add(RED);
    [elements[i].style.left, elements[j].style.left] = [elements[j].style.left, elements[i].style.left];
    [elements[i],elements[j]] = [elements[j],elements[i]];
    await sleep(delay);
    elements[j].classList.remove(RED);
}

function sleep(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

randomButton.addEventListener('click', ()=> {
    randomize(elements);
})

bblButton.addEventListener('click', ()=> {
    bblSort(elements);
})

selButton.addEventListener('click', ()=> {
    selSort(elements);
})


//////////////////////////////////////////
//            SORT FUNCTIONS            //
//////////////////////////////////////////

// BUBBLE SORT
async function bblSort(bars){
    for(var i = 1; i < bars.length; i++){
      for(var j = 0; j < ( bars.length - i); j++){
        if(bars[j].offsetHeight > bars[j+1].offsetHeight){
            await swap(j,j+1, delay);
        }
      }
    }
   }

// SELECTION SORT
async function selSort(bars){
    for (let i = 0; i < bars.length; i++){
        let min = i;
        for (let j = i+1; j < bars.length; j++){
            if (bars[j].offsetHeight < bars[min].offsetHeight) min = j;
        }

        if (i != min) {
            bars[min].classList.add(BLUE);
            await swap(i, min, delay);
            bars[i].classList.remove(BLUE);
        }
    }
}