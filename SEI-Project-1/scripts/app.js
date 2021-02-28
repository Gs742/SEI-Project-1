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

  let shooting = false
  //
  
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
    lazerClass: "lazer",
    moveLazer: function (startingLocation) {
      const lazerId = setInterval(()=>{
        if(gameBoard[startingLocation].classList.contains(this.lazerClass) === true){
          gameBoard[startingLocation].classList.remove(this.lazerClass)
          startingLocation -= width      
          if(startingLocation <= 19){
            for(let b = 0; b <= 19; b++){
              if(gameBoard[b].classList.contains('lazer') === true){
                gameBoard[b].classList.remove('lazer')
              }
            }
            clearInterval(lazerId)
          }  
        }
        else if(gameBoard[startingLocation].classList.contains(this.lazerClass) === false){
          //the lazer was deleted in the next bit of code so remove the lazer from the array
          //and stop this setInterval
          console.log("sajhflsdkjhflk")
          clearInterval(lazerId)
        }
        
        if(gameBoard[startingLocation].classList.contains('alien')===true){
          alienWave.filter(obj =>{
            if(obj.alienPosition === startingLocation ){
              console.log("ALIEN WAVE: " + alienWave.length)
              console.log("WORKING BOIII")
              lazerArray.pop(this)
              alienWave.pop(obj)
              gameBoard[startingLocation].classList.remove('alien')
              gameBoard[startingLocation].classList.remove('lazer')
              gameBoard[startingLocation].classList.add('explode')
              console.log("ALIEN WAVE: " + alienWave.length)
              if(alienWave.length === 0){
                waveSpawned =false
                waveCleared = true
                currentWave ++

              }
            }
          })
          let i = startingLocation
          //Add some points
          clearInterval(lazerId)
          setTimeout(()=>{
            gameBoard[i].classList.remove('explode')
          }, 1000)
          
        }else if(gameBoard[startingLocation].classList.contains('asteroid')===true ){
          lazerArray.pop[this]
          gameBoard[startingLocation].classList.remove('alien')
          gameBoard[startingLocation].classList.add('explode')
          let i = startingLocation
          //Add some points
          setTimeout(()=>{
            gameBoard[startingLocation].classList.remove('explode')
          }, 1000)
          clearInterval(lazerId)
        }else if(gameBoard[startingLocation].classList.contains('asteroid')===false && gameBoard[startingLocation].classList.contains('alien')===false){
          gameBoard[startingLocation].classList.add('lazer')
        }
      
      }, 200)
    }
  }
  

  const alienLazer ={
    lazerPosition:0,
    lazerClass: "alienLazer"
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

      grid.appendChild(cell)
      cells.push(cell)
    }
    return(cells)   
  }

  function loadObjects(enemy, player, asteroid){
    let playerCheck = false
    for(g = 0; g<= gameBoard.length - 1; g++){
      if(gameBoard[g].classList.contains('player') === true){
        playerCheck = true
      }
    }
    if(playerCheck === false){
      addplayer(player.playerStartPosition)
    }
  
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
    const waveId = setInterval(()=>{
    if(waveCleared === false){
    let right = false
    let left = false
    let i =0
    alienWave.forEach(element => {
    if(leftEdge.includes(alienWave[i].alienPosition) === true && direction === -1){
    left = true
    direction = 1
    i++
    }else if(rightEdge.includes(alienWave[i].alienPosition) === true && direction === 1 ){
      right = true
      direction = -1
      i++
    }else if(alienWave[i].alienPosition >= 280){
    //end the game
    clearInterval(waveId)
    console.log("GAME OVER")
    }else{
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
      gameBoard.forEach(element =>{
      if(element.classList.contains('alien')===true){
        element.classList.remove('alien')
      }
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
      gameBoard.forEach(element =>{
        if(element.classList.contains('alien')===true){
          element.classList.remove('alien')
        }
        })
      i = 0
      alienWave.forEach(element=>{
        addAlien(alienWave[i].alienPosition)
        i++
      })
      i = 0
    }
    else{
      console.log("Ended up here")
      i = 0
      alienWave.forEach(element=>{
        removeAlien(alienWave[i].alienPosition)
        alienWave[i].alienPosition += direction
        i++
      })
      gameBoard.forEach(element =>{
        if(element.classList.contains('alien')===true){
          element.classList.remove('alien')
        }
        })
      i = 0
      alienWave.forEach(element=>{
        addAlien(alienWave[i].alienPosition)
        i++
      })
      i = 0
    }
      }
      else{
        //wait
        console.log('WAVE CLEARED')
        clearInterval(waveId)
        loadObjects(alien, player, asteroid)
      }
    },1000)
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

  function shootLazer(position, type){
    if(type === 'player'){
      gameBoard[position].classList.add('lazer')
      let newLazer = Object.assign({}, lazer)
      lazerArray.push(newLazer)
      newLazer.moveLazer(position)
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
      if(shooting === false){
        shootLazer(player.currentPosition, 'player')
        shooting = true
        setTimeout(()=>{
        shooting = false
        }, 249 )
      }else{
        console.log("sfjjlkfjhgaskjfhgdsakjf")
      }
      
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