function init(){
console.log("JAVASCRIPT CONNECTED")
const grid = document.querySelector('.grid')
  
  const width = 20
  const height = 15
  const cellCount = (width * height)
  const cells = []

  //#region wave stuff
  const alienWave = []
  let currentWave = 1
  let waveCleared = false;
  //#endregion

  const alien = {
    placeInWave: 0,
    alienClass: 'alien',
    alienLazer: 'alienLazer',
    alienPosition: 0,
    alienShoot: function() {
      gameBoard[alien.alienPosition + width].classList.add(alien.alienLazer)

    }
    
  }

  const player = {
  playerClass: 'player',
  playerShield: 'shields',
  playerStartPosition: cellCount - width/2,
  currentPosition: 0,
  lives: 3
  }

  const asteroid = {
  asteroidClass: 'asteroid'
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

    for(i=0;i <= currentWave + 10; i++){
      alienWave.push(alien)
      alien
      addAlien(i, alien)
      console.log('Alien count: ' + i)
    }
    if(waveCleared === false){
    startMoving()
    }
  }

  function addAlien(position, alienToAdd) {
    if(gameBoard[position].classList.contains(alien.alienClass) === false && gameBoard[position].classList.contains(asteroid.asteroidClass) === false ){
      alienToAdd.alienPosition = position
      gameBoard[position].classList.add(alienToAdd.alienClass)
    }
    else{
      console.log('Lost')
    }
  }

  function startMoving(){
    setInterval(()=>{
      if(waveCleared === false){
        moveWave(alienWave)
      }
      else{
        //wait
        console.log('WAVE CLEARED')
      }
    },2000)
  }
  
  function moveWave(wave){
    let move = 1
    const left = wave[0] % width === 0
    const right = wave[wave.length - 1] % width === width - 1

    if((left && move === -1)|| (right && move === 1)){
      move = width
    }else if(move === width){
      if(left) move = 1
      else move = -1
    }
    console.log()
    for(let i = 0; i <= wave.length - 1; i++){
      if(gameBoard[wave[i].alienPosition].classList.contains(alien.alienClass) === true){
        gameBoard[wave[i].alienPosition].classList.remove(alien.alienClass)
      }
      
    }
    for(let i = 0; i <= wave.length - 1; i++){
      wave[i].alienPosition += wave
    }
    for(let i = 0; i <= wave.length - 1; i++){
      if(gameBoard[wave[i].alienPosition].classList.contains(alien.alienClass) === false){
        gameBoard[wave[i].alienPosition].classList.add(alien.alienClass)
      }
      
    }
  }



  function addplayer(position) { 
    gameBoard[position].classList.add(player.playerClass) 
    player.currentPosition = position
  }
  function removeplayer(position) {
    gameBoard[position].classList.remove(player.playerClass)
      if(gameBoard[position].classList.contains(player.playerShield) === true){
        gameBoard[position].classList.remove(player.playerShield)
      }
  }



  function keyDown(event) {
    const key = event.keyCode

    removeplayer(player.currentPosition)
    
    if (key === 39 && player.currentPosition < gameBoard.length - 1) {
      player.currentPosition++
    } else if (key === 37 && player.currentPosition >= gameBoard.length - width +1 ) {
      player.currentPosition--
    } else if (key === 38 && player.currentPosition >= width) {
      //Up
      console.log('Up Pressed - Shoot Projectile')
    } else if (key === 40) {
      gameBoard[player.currentPosition].classList.add('shields')
      console.log(gameBoard[player.currentPosition].classList) 
      console.log('Down Pressed - Shields or something?')
    } else {
      console.log('INVALID KEY')
    }
    
    addplayer(player.currentPosition)
  }

  // * Event listeners
  document.addEventListener('keydown', keyDown)
}
window.addEventListener('DOMContentLoaded', init)