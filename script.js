const box = document.querySelector('.box');
const randomButton = document.getElementById('randomBtn');
const selButton = document.getElementById('sortStartBtn');
const bblButton = document.querySelector('.bblBtn');
const dropMenuButton = document.getElementById('sortSelBtn');
const dropMenu = document.querySelector('.dropdown-menu');
const dropDownOptions = document.querySelectorAll('.dropdown-option');
const RED = "element-red";
const BLUE = "element-blue";
const GREEN = "element-green";


let barCount = 100;
let BAR_SIZE = 100 / barCount;
let delay = 100;
let currSortOption = '';
var elements = [];


// Generates original set sorted bars
for (var i = 0; i<barCount; i++){
    const div = document.createElement('div');
    div.className = "element";
    div.style.height = (i+1)*BAR_SIZE + "%";
    div.style.width = BAR_SIZE + "%"
    div.style.left = i*BAR_SIZE + "%";
    elements.push(div);
    box.appendChild(div);
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

randomButton.addEventListener('click', ()=> {
    randomize(elements);
})
// bblButton.addEventListener('click', ()=> {
//     bblSort(elements);
// })
selButton.addEventListener('click', ()=> {
    selSort(elements);
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
        dropMenuButton.innerHTML = dropDownOptions[i].innerHTML;
        currSortOption = dropDownOptions[i].innerHTML;
        console.log(currSortOption);
        dropMenu.classList.toggle('active');
    })
}

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

