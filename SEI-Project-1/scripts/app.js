function init(){
console.log("JAVASCRIPT CONNECTED")
const grid = document.querySelector('.grid')
  
  const width = 20
  const height = 15
  const cellCount = (width * height)
  const cells = []
  const spawnCells = [2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37]
  const leftEdge = [0,20,40,60,80,100,120,140,160,180,200,220,240,260,280]
  const rightEdge = [19,39,59,79,99,119,139,159,179,199,219,239,259,279,299]

  //#region wave stuff
  const lazerArray = []
  const alienWave = []
  const deadAliens = []
  let currentWave = 1
  let waveAmount = 30
  let waveCleared = true;
  let waveSpawned = false;
  let direction = -1
  //#endregion

  const alien = {
    alienClass: 'alien',
    alienLazer: 'alienLazer',
    alienPosition: 0
  }
  function createNewAlien(i){
    var newAlien = Object.assign({}, alien)
    newAlien.alienPosition = i
    return(newAlien)
  }

  const lazer ={
    lazerPosition:0,
    lazerClass: "lazer"
  }
  const alienLazer ={
    lazerPosition:0,
    lazerClass: "alienLazer"
  }
  function createNewAlienLazer(i) {
    //alien lazer stuff
  }
  function createNewLazer(i){
    var newLazer = Object.assign({}, lazer)
    newLazer.lazerPosition = i
    return(newLazer)
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
    for(i=0;i <= waveAmount; i++){
      fooEnemy = createNewAlien(spawnCells[i])
      alienWave.push(fooEnemy)
      addAlien(fooEnemy.alienPosition)
    }
    waveSpawned = true
  }
    if(waveCleared === true && waveSpawned === true){
      console.log("SHOULD ONLY PING ONCE")
      console.log(alienWave)
      waveCleared = false 
      startMoving()
    }
  }

  

  function startMoving(){
    console.log("Start MOVING")
    setInterval(()=>{
      if(waveCleared === false){
        moveWave()
      }
      else{
        //wait
        console.log('WAVE CLEARED')
        
      }
    },1000)
  }
  
  function moveWave(){
    let right = false
    let left = false
    let i =0
    alienWave.forEach(element => {
      if(leftEdge.includes(alienWave[i].alienPosition) === true && direction === -1){
        console.log("ITS IN")
        left = true
        direction = 1
        i++
      }
      else if(rightEdge.includes(alienWave[i].alienPosition) === true && direction === 1 ){
        right = true
        direction = -1
        i++
      }
      else{
        console.log("Element not on any edge " + element)
        i++
      }
    });
    i = 0
    if(left === true){
      alienWave.forEach(element =>{
        removeAlien(alienWave[i].alienPosition)
        alienWave[i].alienPosition += width
        i++
      })
      i = 0
      alienWave.forEach(element => {
        addAlien(alienWave[i].alienPosition)
        i++
      })
      i = 0
    }else if(right === true){
      alienWave.forEach(element=>{
        removeAlien(alienWave[i].alienPosition)
        alienWave[i].alienPosition += width
        i++
      })
      i = 0
      alienWave.forEach(element=>{
        addAlien(alienWave[i].alienPosition)
        i++
      })
      i = 0
    }
    //Unless the wave has hit an edge go into this else statement as default
    else{
      console.log("Ended up here")
      i = 0
      alienWave.forEach(element=>{
        removeAlien(alienWave[i].alienPosition)
        alienWave[i].alienPosition += direction
        i++
      })
      i = 0
      alienWave.forEach(element=>{
        addAlien(alienWave[i].alienPosition)
        i++
      })
      i = 0
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
  
  function addAlien(position) {
    if(gameBoard[position].classList.contains(alien.alienClass) === false && gameBoard[position].classList.contains(asteroid.asteroidClass) === false ){
      gameBoard[position].classList.add(alien.alienClass)
    }
    else{
      console.log('Lost')
    }
  }
  function removeAlien(position){
    if(gameBoard[position].classList.contains(alien.alienClass) === true){
      gameBoard[position].classList.remove(alien.alienClass)
    }
    else{
      console.log("trying to remove an alien that doesnt exist")
    }
  }

  function shootLazer(position){
    gameBoard[position].classList.add(lazer.lazerClass)
    let lazer = createNewLazer(position)
    lazerArray.add(lazer)
  }

  setInterval(()=>{
  lazerArray.forEach(element=>{
    if(element.lazerClass === "lazer"){
      gameBoard[element.lazerPosition].classList.remove(element.lazerClass)
      element.lazerPosition += width
    }else if(element.lazerClass === "alienLazer"){
      gameBoard[element.lazerPosition].classList.remove(element.lazerClass)
      element.lazerPosition -= width
    }

    lazerArray.forEach(element=>{
      if(element.lazerClass === "lazer"){
        gameBoard[element.lazerPosition].classList.add(element.lazerClass)
        if(gameBoard[element.lazerPosition].classList.contains(alien.alienClass) === true){
          gameBoard[element.lazerPosition].classList.remove(alien.alienClass)
          gameBoard[element.lazerPosition].classList.add('explode')
          setTimeout(()=> gameBoard[element.lazerPosition].classList.remove('explode'), 250)
          // search the alien wave and find the alien on that grid square and remove it from the array
        }

      }else if(element.lazerClass === "alienLazer"){
        gameBoard[element.lazerPosition].classList.add(element.lazerClass)
        if(gameBoard[element.lazerPosition].classList.contains(player.playerClass)){
          gameBoard[element.lazerPosition].classList.remove(element.lazerClass)
          gameBoard[element.lazerPosition].classList.add('explode')
          setTimeout(()=> gameBoard[element.lazerPosition].classList.remove('explode'), 250)
          player.lives -= 1
          if(player.lives === 0){
            //GAME OVER
          }
        }
      }
    })
  })
  }, 250)


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
      shootLazer(player.currentPosition)
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