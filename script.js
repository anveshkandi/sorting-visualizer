const box = document.querySelector('.box');
const randomButton = document.getElementById('randomBtn');
const sortButton = document.getElementById('sortStartBtn');
const dropMenuButton = document.getElementById('sortSelBtn');
const bblButton = document.querySelector('.bblBtn');
const dropMenu = document.querySelector('.dropdown-menu');
const dropDownOptions = document.querySelectorAll('.dropdown-option');
const RED = "element-red";
const WHITE = "element-white";
const GREEN = "element-green";

var slide = document.querySelector('.slider'), 
    sliderVal = document.querySelector('.slider-val');


let barCount = slide.value;
let barSize = 100 / barCount;
let delay = 100;
let currSortOption = '';
var elements = [];

window.addEventListener('load', ()=>{
    genBars(barCount);
})


randomButton.addEventListener('click', ()=> {
    randomize(elements);
})

sortButton.addEventListener('click', ()=>{
    switch(currSortOption){
    case 'Bubble Sort':
        bblSort(elements);
        break;
    case 'Selection Sort':
        selSort(elements);
        break;
    case 'Insertion Sort':
        insSort(elements);
        break;
    default:
        dropMenuButton.classList.add('error');
        break;
    }
    
})

// Handles sort menu drop down
document.addEventListener('click', e => {
    const isDropdownButton = e.target.matches('[data-dropdown-button]');

    if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return;

    let currentDropdown; //Button that opens dropdwon menu 
    if(isDropdownButton) {
        currentDropdown = e.target.closest('[data-dropdown]');
        currentDropdown.classList.toggle('active');
    }


    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        if (dropdown == currentDropdown) return;
        dropdown.classList.remove('active');
    })
})

// Adds a click event listener to all of the drop down menu options
// Allows user to select a sort from drop down menu
// When user selects option, displays the current sort option
for (let i=0; i < dropDownOptions.length; i++){
        dropDownOptions[i].addEventListener('click', () => {
            if(dropMenuButton.classList.contains('error')) dropMenuButton.classList.remove('error');

            dropMenuButton.innerHTML = dropDownOptions[i].innerHTML;
            currSortOption = dropDownOptions[i].innerHTML;
            dropMenu.classList.toggle('active');
    })
}

slide.oninput = function() {
    sliderVal.innerHTML = "Elements: " + this.value;
    genBars(this.value);
}

// Generates original set sorted bars
function genBars(barCount){
    clearBox(box);
    barSize = 100 / barCount;
    elements = [];

    for (var i = 0; i<barCount; i++){
        const div = document.createElement('div');
        div.className = "element";
        div.style.height = (i+1)*barSize + "%";
        div.style.width = barSize + "%"
        div.style.left = i*barSize + "%";
        elements.push(div);
        box.appendChild(div);
    }
}

function clearBox(box) {
    while (box.lastElementChild) {
        elements.pop();
        box.removeChild(box.lastElementChild);
    }
}

// Randomizes bars
async function randomize(bars){
    for (var i = bars.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        await swap(i,j, 10);
    }
}

// Swaps two values in an array, paints swapped bar red
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

//////////////////////////////////////////
//            SORT FUNCTIONS            //
//////////////////////////////////////////

// BUBBLE SORT
async function bblSort(bars){
    delay = 5000/bars.length;
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
    delay = 5000/bars.length;
    for (let i = 0; i < bars.length; i++){
        let min = i;
        for (let j = i+1; j < bars.length; j++){
            if (bars[j].offsetHeight < bars[min].offsetHeight) min = j;
        }

        if (i != min) {
            bars[min].classList.add(WHITE);
            await swap(i, min, delay);
            bars[i].classList.remove(WHITE);
        }
    }
}

async function insSort(bars){
    delay = 5000/bars.length;
    for (let i=1; i < bars.length; i++) {
        let j = i;
        while((j > 0) && (bars[j].offsetHeight < bars[j-1].offsetHeight)){
            await swap(j, j-1, delay);
            j--;
        }
    }
}

async function quickSort(bars, left, right){
    delay = 5000/bars.length;

}

