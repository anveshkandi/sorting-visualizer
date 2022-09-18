const box = document.querySelector('.box');
const randomButton = document.querySelector('.randomBtn');
const bblButton = document.querySelector('.bblBtn');
const selButton = document.querySelector('.selBtn');
const BLUE = "element-blue";

let barCount = 100;
let BAR_WIDTH = 100 / barCount;
let BAR_HEIGHT = 100 / barCount;

var elements = []

for (var i = 0; i<barCount; i++){
    const div = document.createElement('div');
    div.className = "element";
    // div.textContent = i + 1;
    div.style.height = (i+1)*BAR_HEIGHT + "%";
    div.style.width = BAR_WIDTH + "%"
    div.style.left = i*BAR_WIDTH + "%";
    elements.push(div);
    box.appendChild(div);
}

async function randomize(bars){
    for (var i = bars.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        await swap(i,j);
    }
}

async function bblSort(bars){
    for(var i = 1; i < bars.length; i++){
      for(var j = 0; j < ( bars.length - i); j++){
        if(bars[j].offsetHeight > bars[j+1].offsetHeight){
            await swap(j,j+1);
        }
      }
    }
   }

async function swap (i,j){
    elements[i].classList.add(BLUE);
    [elements[i].style.left, elements[j].style.left] = [elements[j].style.left, elements[i].style.left];
    [elements[i],elements[j]] = [elements[j],elements[i]];
    await sleep(15);
    elements[j].classList.remove(BLUE);
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
    bblSort(elements);
})