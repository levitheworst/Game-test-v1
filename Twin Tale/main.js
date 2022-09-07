///main\\\

const canvas = document.getElementById('display_canvas')
const ctx = canvas.getContext('2d')

canvas.width = 800
canvas.height = 600

resizeScreen()
function resizeScreen()
{
    window.requestAnimationFrame(resizeScreen)
    canvas.height = window.innerHeight
    canvas.width = 8*canvas.height/6
    ctx.scale(canvas.width/800, canvas.height/600)
}

let m = 1

///the user's input (controls and stuff) goes here\\\

//final definition
var userInput = {
    up: false,
    left: false,
    down: false,
    right: false,
    enter: false,
    e: false
}

//input listening
window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'W':
        case 'w':
        case 'ArrowUp':
            userInput.up = true
            break;
        case 'A':
        case 'a':
        case 'ArrowLeft':
            userInput.left = true
            break;
        case 'S':
        case 's':
        case 'ArrowDown':
            userInput.down = true
            break;
        case 'D':
        case 'd':
        case 'ArrowRight':
            userInput.right = true
            break;
        case 'Enter':
            userInput.enter = true
            break;
        case 'E':
        case 'e':
            userInput.e = true
            break;
    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'W':
        case 'w':
        case 'ArrowUp':
            userInput.up = false
            break;
        case 'A':
        case 'a':
        case 'ArrowLeft':
            userInput.left = false
            break;
        case 'S':
        case 's':
        case 'ArrowDown':
            userInput.down = false
            break;
        case 'D':
        case 'd':
        case 'ArrowRight':
            userInput.right = false
            break;
        case 'Enter':
            userInput.enter = false
            break;
        case 'E':
        case 'e':
            userInput.e = false
            break;
    }
})