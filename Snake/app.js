const squares = document.querySelectorAll('.grid div')
const resultDisplay = document.querySelector('#result')
const loseDisplay = document.querySelector('#lose')
const secondsDisplay = document.querySelector('#seconds')

let snakePosition = [206, 205, 204]
let snakePaceId
let direction = 'right'
const width = 20
let fruitLocation = 401
let fruitLocationB = 401
let fruitId 
let controlArray = []
let result = 0
let eaten = false
let timeId
let seconds = 0


snakePosition.map(location => squares[location].classList.add('snake'))
// pinta snake por primera vez

let refreshSnake = () => {
    for(let i = snakePosition.length - 1; i > 0; i--){
        snakePosition[i] = snakePosition[i - 1]
    }
}

let checkEats = () => {
    if(fruitLocation === snakePosition[0]){
        snakePosition.push(fruitLocation)
        squares[fruitLocation].classList.remove('fruit')
        result++
        resultDisplay.innerHTML = result
        eaten = true
    }
    if(fruitLocationB === snakePosition[0]){
        snakePosition.push(fruitLocationB)
        squares[fruitLocationB].classList.remove('fruit')
        result++
        resultDisplay.innerHTML = result
        eaten = true
    }
}

let checkCollisions = () => {
    controlArray = snakePosition.map((location, index, array) => array.indexOf(location,index+1))
    if (controlArray.filter(number => number > -1).length != 0 && !eaten) {
        clearInterval(snakePaceId)
        clearInterval(fruitId)
        clearInterval(timeId)
        loseDisplay.innerHTML = 'YOU LOSE'
    }
}

let drawSnake = () => {
    snakePosition.map(location => {squares[location].classList.remove('snake')})
    eaten = false

    refreshSnake()
    
//La serpiente aparece en el otro lado del cuadro cuando toca un borde

    if (snakePosition[0] % width === 19 && direction === 'right'){
        snakePosition[0] -= width - 1
    } 
    else if(snakePosition[0] % width === 0 && direction === 'left'){
        snakePosition[0] += width - 1
    }
    else if(Math.floor(snakePosition[0] / width) === 0 && direction === 'up'){
        snakePosition[0] += width * width - width
    }
    else if(Math.floor(snakePosition[0] / width) === 19 && direction === 'down'){
        snakePosition[0] -= width * width - width
    }
    else if(direction === 'right') snakePosition[0] += 1

    else if(direction === 'left') snakePosition[0] -= 1

    else if(direction === 'up') snakePosition[0] -= width

    else if(direction === 'down') snakePosition[0] += width

    snakePosition.map(location => {squares[location].classList.add('snake')})
    
    checkEats()
    checkCollisions()
}

let moveSnake = (e) =>{
    switch (e.key){
        case 'ArrowRight':
            if (direction != 'left') direction = 'right'
            break
        case 'ArrowLeft':
            if (direction != 'right') direction = 'left'
            break
        case 'ArrowUp':
            if (direction != 'down')direction = 'up'
            break
        case 'ArrowDown':
            if (direction != 'up') direction = 'down'
            break
    }
}

document.addEventListener('keydown', moveSnake)
snakePaceId = setInterval(drawSnake, 500)

let makeFruit = () => {
    if(fruitLocation < 400 && fruitLocationB < 400){
        squares[fruitLocationB].classList.remove('fruit')
    }
    fruitLocationB = fruitLocation
    //Calculate place to appear fruit
    do {
        fruitLocation = Math.floor(Math.random()*400)
    }
    while(snakePosition.includes(fruitLocation))

    squares[fruitLocation].classList.add('fruit')
    
}

fruitId = setInterval(makeFruit, 5000)

let timer = () => {
    seconds++
    secondsDisplay.innerHTML = seconds
}

timeId = setInterval(timer, 1000)

