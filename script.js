const box = document.querySelector('.box');
const randomButton = document.querySelector('.randomBtn')
const sortButton = document.querySelector('.sortBtn')
let barCount = 20;
let BAR_WIDTH = 100 / barCount;
let BAR_HEIGHT = 100 / barCount;

var elements = []

for (var i = 0; i<barCount; i++){
    const div = document.createElement('div');
    div.className = "element";
    div.textContent = i + 1;
    div.style.height = (i+1)*BAR_HEIGHT + "%";
    div.style.width = BAR_WIDTH + "%"
    div.style.left = i*BAR_WIDTH + "%";
    elements.push(div);
    box.appendChild(div);
}
// [bars[0].style.left, bars[99].style.left] = [bars[99].style.left, bars[0].style.left];

function randomize(bars){
    for (var i = bars.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [bars[i].style.left, bars[j].style.left] = [bars[j].style.left, bars[i].style.left];
        [bars[i],bars[j]] = [bars[j],bars[i]]
    }
    console.log(bars[0].style.height);
}

function bblSort(bars){
    console.log("Entering sort!");
    for(var i = 1; i < bars.length; i++){
      for(var j = 0; j < ( bars.length - i); j++){
        if(bars[j].style.height > bars[j+1].style.height){
            console.log("Ahh!");
            [bars[j].style.left, bars[j+1].style.left] = [bars[j+1].style.left, bars[j].style.left];
        }
      }
    }
   }

randomButton.addEventListener('click', ()=> {
    randomize(elements);
})

sortButton.addEventListener('click', ()=> {
    bblSort(elements);
})