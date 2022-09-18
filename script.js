const box = document.querySelector('.box');
let barCount = 20;

for (let i = 0; i<barCount; i++){
    const div = document.createElement('div');
    div.className = "element";
    div.style.height = (i+1) + "%";
    div.style.width = 1 + "%"
    div.style.left = i + "%";
    box.appendChild(div);
}

let bars = document.querySelectorAll('.element');
// [bars[0].style.left, bars[99].style.left] = [bars[99].style.left, bars[0].style.left];
console.log(bars.length)

for (var i = bars.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [bars[i].style.left, bars[j].style.left] = [bars[j].style.left, bars[i].style.left];
}

console.log(box.style.offsetWidth)