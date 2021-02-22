function init(){
console.log("JAVASCRIPT CONNECTED")
const grid = document.querySelector('.grid')
  
  const width = 10
  const cellCount = width * width
  const cells = []

  const playerClass = 'player'
  const playerStartPosition = cellCount - width/2 
  let playerCurrentPosition = 0


  createGrid(playerStartPosition)
  addplayer(playerStartPosition)


  // * Make a grid
  function createGrid(playerStartPos) {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    
  }

  function addplayer(position) { 
    cells[position].classList.add(playerClass) 
    playerCurrentPosition = position
  }

  function removeplayer(position) {
    cells[position].classList.remove(playerClass)
  }


  function handleKeyUp(event) {
    const key = event.keyCode

    removeplayer(playerCurrentPosition)
    
    if (key === 39 && playerCurrentPosition % width !== width - 1) {
      playerCurrentPosition++
    } else if (key === 37 && playerCurrentPosition % width !== 0) {
      playerCurrentPosition--

    } else if (key === 38 && playerCurrentPosition >= width) {
      //Up
      console.log('Up Pressed - Shoot Projectile')
    } else if (key === 40) {
      console.log('Down Pressed - Shields or something?')
    } else {
      console.log('INVALID KEY')
    }
    
    addplayer(playerCurrentPosition)
  }

  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)

  







}
window.addEventListener('DOMContentLoaded', init)