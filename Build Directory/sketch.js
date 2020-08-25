boardSize = prompt("What would you like your Board Size to be?")
numQueens = prompt("How many Queens would you like to have?")
fr = prompt("What would you like your frame rate to be?")

var showAttack = false



var allStates = []


var allAttacks = []

console.log(boardSize)


for (let i = 0; i < boardSize; i++) {

  let append = []

  for (let j = 0; j < boardSize; j++) {
    append.push('O')
  }

  allAttacks.push(append)

}


function setup() {

  createCanvas(700, 700);
  setFrameRate(fr)

}

var imgLst = []

var allAttacks = []

// console.log(boardSize)


for (let i = 0; i < boardSize; i++) {

  let append = []

  for (let j = 0; j < boardSize; j++) {
    append.push('O')
  }

  allAttacks.push(append)

}



function preload() {
  let solution = kQueens(numQueens, boardSize)



  for (let i = 0; i < solution.length; i++) {
    img = createImg(
      'https://image.flaticon.com/icons/svg/606/606114.svg', "Queen"

    )
    img.size(700 / boardSize, 700 / boardSize)

    img.position(drawEncode(solution[i][0]), drawEncode(solution[i][1]))


    imgLst.push(img)
  }
}


function drawChessBoard(boardLength) {
  // console.log("draw")
  let curColor = 'white'
  for (let x = 0; x < boardLength; x++) {
    if (boardLength % 2 == 0) {
      if (curColor == 'white') {
        curColor = color(118, 150, 86)
      } else {
        curColor = 'white'
      }
    }
    for (let y = 0; y < boardLength; y++) {
      // console.log(curColor)
      // console.log(allAttacks)

      if (allAttacks[y][x] == 'X' && showAttack) {
        fill(color(255, 0, 0))
        noStroke()
        rect(drawEncode(x), drawEncode(y), 700 / boardSize, 700 / boardSize)

      } else {

        fill(curColor)
        noStroke()
        rect(drawEncode(x), drawEncode(y), 700 / boardSize, 700 / boardSize)

      }

      if (curColor == 'white') {
        curColor = color(118, 150, 86)
      } else {
        curColor = 'white'
      }

    }




  }


}


function drawEncode(x) {
  return x * 700 / boardSize
}

function pretty_print(curAttack) {
  for (let i in curAttack) {
    for (let j in curAttack[i]) {
      process.stdout.write(curAttack[i][j])

    }
    console.log("")
  }
  console.log("")

}

function getQueenAttack(curAttack, queenPos) {

  let notAtStart = true

  if (curAttack[queenPos[1]][queenPos[0]] == 'X') {
    notAtStart = false
  }



  let rowLst = []

  for (let i in curAttack) {
    rowLst.push('X')
  }

  // console.log(queenPos)
  // pretty_print(curAttack)
  queenPos = [Number(queenPos[0]), Number(queenPos[1])]
  curAttack[queenPos[1]] = rowLst
  // pretty_print(curAttack)
  for (let i = 0; i < curAttack.length; i++) {
    curAttack[i][queenPos[0]] = 'X'
  }
  let running = true
  for (let i = 0; i + queenPos[0] < curAttack.length && i + queenPos[1] < curAttack.length; i++) {
    curAttack[queenPos[1] + i][queenPos[0] + i] = 'X'
  }

  for (let i = 0; i + queenPos[1] < curAttack.length && queenPos[0] - i >= 0; i++) {
    curAttack[queenPos[1] + i][queenPos[0] - i] = 'X'
  }
  // pretty_print(curAttack)

  if (notAtStart) {

    curAttack[queenPos[1]][queenPos[0]] = 'O'

  }


  return curAttack

}

function getNext(curQueens, curAttack, k, curNum) {
  if (curNum == k - 1) {
    // pretty_print(curAttack)
    // console.log(curQueens)


    for (let i in curAttack[curNum]) {
      if (curAttack[curNum][i] == 'O') {
        curQueens.push([Number(i), curNum])
        allStates.push(curQueens)
        // console.log(curQueens)
        return curQueens
      }
    }
    return undefined
  }

  // let ogCopy = [...curAttack]

  // pretty_print(curAttack)
  // console.log(curNum)

  // console.log(curAttack.length)

  let curAttackLength = curAttack.length

  for (let i in curAttack[curNum]) {
    let curAttack = []


    for (let i = 0; i < curAttackLength; i++) {
      let append = []

      for (let j = 0; j < curAttackLength; j++) {
        append.push('O')
      }

      curAttack.push(append)

    }
    // console.log(curAttack.length)
    // curAttack = [['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']]
    for (let i in curQueens) {
      curAttack = getQueenAttack(curAttack, curQueens[i])
    }
    // pretty_print(curAttack)

    // for (let i = 7; i >= curNum; i-- ){
    //   curAttack[i] = ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']
    // }
    // console.log(curNum)
    // curAttack = [...ogCopy]
    // console.log(curAttack, ogCopy)
    if (curAttack[curNum][i] == 'O') {
      // pretty_print(curAttack)


      let newAttack = Array.from(curAttack)
      newAttack = getQueenAttack(newAttack, [i, curNum])


      let curQueensCopy = [...curQueens]

      curQueensCopy.push([Number(i), curNum])

      allStates.push(curQueensCopy)

      // for (let i in curQueensCopy){
      //   imgLst[i].position(curQueensCopy[i][0], curQueens[i][1])
      // }

      // console.log(curQueensCopy)

      // console.log(curQueensCopy, curQueens)

      let next = getNext(curQueensCopy, newAttack, k, curNum + 1)

      if (next != undefined) {
        return next
      }


    }


  }
}


function kQueens(k, boardSize) {

  let realLst = []



  for (let i = 0; i < boardSize; i++) {

    let append = []

    for (let j = 0; j < boardSize; j++) {
      append.push('O')
    }

    realLst.push(append)

  }
  // console.log(realLst)
  return getNext([], realLst, k, 0)
}

var curIter = 0

// for (let i in imgLst){
//   i.postion(100, 100)
// }


function draw() {

  background(255)


  for (let i in imgLst) {
    imgLst[i].position(700, 0)
  }



  // let solution = kQueens(8, 8)

  // console.log(solution)


  // console.log(imgLst)




  allAttacks = []

  for (let i = 0; i < boardSize; i++) {

    let append = []

    for (let j = 0; j < boardSize; j++) {
      append.push('O')
    }

    allAttacks.push(append)

  }


  for (let i in allStates[curIter]) {
    imgLst[i].position(drawEncode(allStates[curIter][i][0]), drawEncode(allStates[curIter][i][1]))

    allAttacks = getQueenAttack(allAttacks, allStates[curIter][i])


  }

  if (curIter + 1 < allStates.length) {

    curIter++

  }

  drawChessBoard(boardSize)





  // let cur = getQueenAttack([['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O'], ['O', 'O', 'O', 'O', 'O', 'O', 'O', 'O']], [5, 0])

  // pretty_print(getQueenAttack(cur, [3, 1]))
}