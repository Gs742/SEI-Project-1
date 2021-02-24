function init(){
console.log("JAVASCRIPT CONNECTED")
const grid = document.querySelector('.grid')
  
  const width = 20
  const height = 15
  const cellCount = (width * height)
  const cells = []

  const alien = { }

  const player = {
  playerClass: 'player',
  playerStartPosition: cellCount - width,
  playerCurrentPosition: 0,
  lives: 3
  }

  const asteroid = {

  }

  const gameBoard = createGrid()
  loadObjects(alien, player, asteroid)

  function createGrid() {
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement('div')
      cell.textContent = i
      grid.appendChild(cell)
      cells.push(cell)
    }
    return(cells)   
  }

  function loadObjects(alien, player, asteroid){
  addplayer(player.playerStartPosition)
  console.log(player)

  }

  function addplayer(position) { 
    gameBoard[position].classList.add(player.playerClass) 
    player.playerCurrentPosition = position
  }
  function removeplayer(position) {
    gameBoard[position].classList.remove(player.playerClass)
  }

  

  function addAlien(amount){
  if(gameBoard[0].classList.alien === null){
    gameBoard[0].classList.add(alien)
  }
  }



  function handleKeyUp(event) {
    const key = event.keyCode

    removeplayer(player.playerCurrentPosition)
    
    if (key === 39 && player.playerCurrentPosition < gameBoard.length - 1) {
      player.playerCurrentPosition++
    } else if (key === 37 && player.playerCurrentPosition >= gameBoard.length - width +1 ) {
      player.playerCurrentPosition--
    } else if (key === 38 && player.playerCurrentPosition >= width) {
      //Up
      console.log('Up Pressed - Shoot Projectile')
    } else if (key === 40) {
      console.log('Down Pressed - Shields or something?')
    } else {
      console.log('INVALID KEY')
    }
    
    addplayer(player.playerCurrentPosition)
  }

  // * Event listeners
  document.addEventListener('keyup', handleKeyUp)

  







}
window.addEventListener('DOMContentLoaded', init)