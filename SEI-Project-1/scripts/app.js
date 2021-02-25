function init(){
console.log("JAVASCRIPT CONNECTED")
const grid = document.querySelector('.grid')
  
  const width = 20
  const height = 15
  const cellCount = (width * height)
  const cells = []

  const leftEdge = [0,20,40,60,80,100,120,140,160,180,200,220,240,260,280]
  const rightEdge = [19,39,59,79,99,119,139,159,179,199,219,239,259,279,299]
  //#region wave stuff
  const alienWave = []
  let currentWave = 1
  let waveCleared = true;
  let waveSpawned = false;
  //#endregion

  const alien = {
    placeInWave: 0,
    alienClass: 'alien',
    alienLazer: 'alienLazer',
    alienPosition: 0,
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

  function loadObjects(enemy, player, asteroid){
  addplayer(player.playerStartPosition)
  if(waveSpawned === false && waveCleared === true ){
    for(i=0;i <= currentWave + 8; i++){
      alienWave.push(enemy)
      enemy.alienPosition = i
      addAlien(enemy.alienPosition, enemy)
      console.log(enemy.alienPosition)
    }
    waveSpawned = true
  }
    if(waveCleared === true && waveSpawned === true){
      waveCleared = false 
      startMoving()
      
    }
  }

  function addAlien(position, alienToAdd) {
    console.log("Add aliens")
    console.log(position +" "+ alienToAdd)

    if(gameBoard[position].classList.contains(alien.alienClass) === false && gameBoard[position].classList.contains(asteroid.asteroidClass) === false ){

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
    console.log(wave)
    let direction = 1
    //remove the wave from their current locations and update the aliens with their new location
    for(i = 0; i < wave.length; i ++){
      if(leftEdge.includes(gameBoard[Number(wave[i].alienPosition)]) === true && direction === -1 ){
        wave.forEach(element => {
          if(gameBoard[element.alienPosition].classList.contains(element.alienClass)=== true){
            gameBoard[element.alienPosition].classList.remove(element.alienClass)
            element.alienPosition += width
          }
          else {
            console.log("SOMETHINGS WRONG")
          }
        });
        direction = 1
        break
      }
      else if(rightEdge.includes(gameBoard[Number(wave[i].alienPosition)]) === true && direction === 1){
        wave.forEach(element => {
          if(gameBoard[element.alienPosition].classList.contains(element.alienClass)=== true){
            gameBoard[element.alienPosition].classList.remove(element.alienClass)
            element.alienPosition += width
          }
          else {
            console.log("SOMETHINGS WRONG")
          }
        });
        direction = -1
        break
      }
      else{  
          if(gameBoard[Number(wave[i].alienPosition)].classList.contains(alien.alienClass)=== true){
            gameBoard[Number(wave[i].alienPosition)].classList.remove(alien.alienClass)
            gameBoard[Number(wave[i].alienPosition)].alienPosition += direction
          }
          else{
            console.log("SOMETHINGS WRONG 2")
          }
        break;
      }
    }

    for(i = 0; i < wave.length - 1; i++){
      addAlien(wave[i].alienPosition , wave[i])
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