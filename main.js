import {highlight, highlightCtx} from './highlight.js'

const board = document.getElementById('board')
const ctx = board.getContext('2d')
const pieceValues = {
    'P': 'assets/pieces/pawnWhite.png',
    'p': 'assets/pieces/pawnBlack.png',
    'R': 'assets/pieces/rookWhite.png',
    'r': 'assets/pieces/rookBlack.png',
    'N': 'assets/pieces/knightWhite.png',
    'n': 'assets/pieces/knightBlack.png',
    'B': 'assets/pieces/bishopWhite.png',
    'b': 'assets/pieces/bishopBlack.png',
    'Q': 'assets/pieces/queenWhite.png',
    'q': 'assets/pieces/queenBlack.png',
    'K': 'assets/pieces/kingWhite.png',
    'k': 'assets/pieces/kingBlack.png'
}

const boardWidth = board.getBoundingClientRect().width
const boardHeight = board.getBoundingClientRect().height
const tileWidth = boardWidth / 8
const tileHeight = boardHeight / 8
const indicator = document.getElementById('indicator')


const isLowerCase = (a) => {
    if (a == a.toLowerCase()) {
        return true
    } else {
        return false
    }
}

const isUpperCase = (a) => {
    if (a == a.toUpperCase()) {
        return true
    } else {
        return false
    }
}

let turn = 'white'

board.viableMove = (piece, [x_1, y_1], [x_2, y_2]) => {
    let viablepositions = []


    let pieceColor = isLowerCase(piece.toString()) ? 'black' : 'white'

    // check if it is moving to a different tile
    if (x_1 === x_2 && y_1 === y_2) {
        return false
    }
    
    // if the desired position is not null, set the variable and also check if it the same color as the piece
    if (board.positions[y_2 * 8 + x_2][2] !== null) {
        let desiredColor = isLowerCase(board.positions[y_2 * 8 + x_2][2].toString()) ? 'black' : 'white'

        if (desiredColor == pieceColor) {
            return false
        }
    }

       ///////////
      // PAWNS //
     ///////////
    
    if (piece == 'p') {
        if (x_1 == x_2 && y_1 === y_2 - 1 && board.positions[y_2 * 8 + x_2][2] === null) {
            return true

        } else {
            // moving 2 spaecs
            if (x_1 == x_2 && y_1 === y_2 - 2 && y_1 === 1 && board.positions[y_2 * 8 + x_2][2] === null && board.positions[(y_2 - 1) * 8 + x_2][2] === null && x_1 == x_2 && y_1 === y_2 - 1 && board.positions[y_2 * 8 + x_2][2] === null) {
                return true

            } else {
                    // taking a piece
                    if (x_1 === x_2 - 1 && y_1 === y_2 - 1 && board.positions[y_2 * 8 + x_2][2] !== null && isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        if (x_1 === x_2 + 1 && y_1 === y_2 - 1 && board.positions[y_2 * 8 + x_2][2] !== null && isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                            return true
                        } else {
                            return false
                        }
                    }
            }
        }


    } else if (piece == 'P') {
        if (x_1 == x_2 && y_1 === y_2 + 1) {
            return true
        } else {
            // moving 2 spaecs
            if (x_1 == x_2 && y_1 === y_2 + 2 && y_1 === 6) {
                return true
            } else {
                // taking a piece
                if (x_1 === x_2 - 1 && y_1 === y_2 + 1 && board.positions[y_2 * 8 + x_2][2] !== null && isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    if (x_1 === x_2 + 1 && y_1 === y_2 + 1 && board.positions[y_2 * 8 + x_2][2] !== null && isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                }
            }
        }
    }
    
     /////////////
    // KNIGHTS //
   /////////////
    
    if (piece == 'n') {
        if (x_1 === x_2 - 1 && y_1 === y_2 - 2 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
            return true
        } else {
            if (x_1 === x_2 - 2 && y_1 === y_2 - 1 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                return true
            } else {
                if (x_1 === x_2 - 2 && y_1 === y_2 + 1 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                    return true
                } else {
                    if (x_1 === x_2 - 1 && y_1 === y_2 + 2 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                        return true
                    } else {
                        if (x_1 === x_2 + 1 && y_1 === y_2 + 2 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                            return true
                        } else {
                            if (x_1 === x_2 + 2 && y_1 === y_2 + 1 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                                return true
                            } else {
                                if (x_1 === x_2 + 2 && y_1 === y_2 - 1 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                                    return true
                                } else {
                                    if (x_1 === x_2 + 1 && y_1 === y_2 - 2 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

    } else if (piece == 'N') {
        if (x_1 === x_2 - 1 && y_1 === y_2 - 2 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
            return true
        } else {
            if (x_1 === x_2 - 2 && y_1 === y_2 - 1 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                return true
            } else {
                if (x_1 === x_2 - 2 && y_1 === y_2 + 1 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                    return true
                } else {
                    if (x_1 === x_2 - 1 && y_1 === y_2 + 2 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                        return true
                    } else {
                        if (x_1 === x_2 + 1 && y_1 === y_2 + 2 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                            return true
                        } else {
                            if (x_1 === x_2 + 2 && y_1 === y_2 + 1 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                                return true
                            } else {
                                if (x_1 === x_2 + 2 && y_1 === y_2 - 1 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                                    return true
                                } else {
                                    if (x_1 === x_2 + 1 && y_1 === y_2 - 2 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

       //////////
      // KING //
     //////////
    
    if (piece == 'k') {
        if (x_1 === x_2 - 1 && y_1 === y_2 - 1 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
            return true
        } else {
            if (x_1 === x_2 && y_1 === y_2 - 1 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                return true
            } else {
                if (x_1 === x_2 + 1 && y_1 === y_2 - 1 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                    return true
                } else {
                    if (x_1 === x_2 - 1 && y_1 === y_2 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                        return true
                    } else {
                        if (x_1 === x_2 + 1 && y_1 === y_2 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                            return true
                        } else {
                            if (x_1 === x_2 - 1 && y_1 === y_2 + 1 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                                return true
                            } else {
                                if (x_1 === x_2 && y_1 === y_2 + 1 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                                    return true
                                } else {
                                    if (x_1 === x_2 + 1 && y_1 === y_2 + 1 && (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2]))) {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if (piece == 'K') {
        if (x_1 === x_2 - 1 && y_1 === y_2 - 1 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
            return true
        } else {
            if (x_1 === x_2 && y_1 === y_2 - 1 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                return true
            } else {
                if (x_1 === x_2 + 1 && y_1 === y_2 - 1 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                    return true
                } else {
                    if (x_1 === x_2 - 1 && y_1 === y_2 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                        return true
                    } else {
                        if (x_1 === x_2 + 1 && y_1 === y_2 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                            return true
                        } else {
                            if (x_1 === x_2 - 1 && y_1 === y_2 + 1 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                                return true
                            } else {
                                if (x_1 === x_2 && y_1 === y_2 + 1 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                                    return true
                                } else {
                                    if (x_1 === x_2 + 1 && y_1 === y_2 + 1 && (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2]))) {
                                        return true
                                    } else {
                                        return false
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    } 

     ////////////
    // ROOKS ///
   ////////////
    
    if (piece == 'r' || piece == 'R') {
        if (x_1 === x_2) {
            if (y_1 > y_2) {
                for (let i = y_2 + 1; i < y_1; i++) {
                    if (board.positions[i * 8 + x_1][2] !== null) {
                        return false
                    }
                }
                if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    return false
                }
            } else {
                for (let i = y_1 + 1; i < y_2; i++) {
                    if (board.positions[i * 8 + x_1][2] !== null) {
                        return false
                    }
                }
                if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            if (y_1 === y_2) {
                if (x_1 > x_2) {
                    for (let i = x_2 + 1; i < x_1; i++) {
                        if (board.positions[y_1 * 8 + i][2] !== null) {
                            return false
                        }
                    }
                    if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    for (let i = x_1 + 1; i < x_2; i++) {
                        if (board.positions[y_1 * 8 + i][2] !== null) {
                            return false
                        }
                    }
                    if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                }
            } else {
                return false
            }
        }
    }
     /////////////
    // BISHOPS //
   /////////////
    
    if (piece == 'B') {
        if (Math.abs(x_1 - x_2) === Math.abs(y_1 - y_2)) {
            if (x_1 > x_2 && y_1 > y_2) {
                for (let i = 1; i < x_1 - x_2; i++) {
                    if (board.positions[(y_1 - i) * 8 + (x_1 - i)][2] !== null) {
                        return false
                    }
                }
                if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    return false
                }
            } else {
                if (x_1 < x_2 && y_1 > y_2) {
                    for (let i = 1; i < x_2 - x_1; i++) {
                        if (board.positions[(y_1 - i) * 8 + (x_1 + i)][2] !== null) {
                            return false
                        }
                    }
                    if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (x_1 > x_2 && y_1 < y_2) {
                        for (let i = 1; i < x_1 - x_2; i++) {
                            if (board.positions[(y_1 + i) * 8 + (x_1 - i)][2] !== null) {
                                return false
                            }
                        }
                        if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        for (let i = 1; i < x_2 - x_1; i++) {
                            if (board.positions[(y_1 + i) * 8 + (x_1 + i)][2] !== null) {
                                return false
                            }
                        }
                        if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                            return true
                        } else {
                            return false
                        }
                    }
                }
            }
        }
    }

    if (piece == 'b') {
        if (Math.abs(x_1 - x_2) === Math.abs(y_1 - y_2)) {
            if (x_1 > x_2 && y_1 > y_2) {
                for (let i = 1; i < x_1 - x_2; i++) {
                    if (board.positions[(y_1 - i) * 8 + (x_1 - i)][2] !== null) {
                        return false
                    }
                }
                if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    return false
                }
            } else {
                if (x_1 < x_2 && y_1 > y_2) {
                    for (let i = 1; i < x_2 - x_1; i++) {
                        if (board.positions[(y_1 - i) * 8 + (x_1 + i)][2] !== null) {
                            return false
                        }
                    }
                    if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (x_1 > x_2 && y_1 < y_2) {
                        for (let i = 1; i < x_1 - x_2; i++) {
                            if (board.positions[(y_1 + i) * 8 + (x_1 - i)][2] !== null) {
                                return false
                            }
                        }
                        if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        for (let i = 1; i < x_2 - x_1; i++) {
                            if (board.positions[(y_1 + i) * 8 + (x_1 + i)][2] !== null) {
                                return false
                            }
                        }
                        if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                            return true
                        }
                    }
                }
            }
        }
    }
     ////////////
    // QUEENS //
   ////////////
    
    if (piece == 'Q') {
        // essentially combine the bishop and rooks together

                if (Math.abs(x_1 - x_2) === Math.abs(y_1 - y_2)) {
            if (x_1 > x_2 && y_1 > y_2) {
                for (let i = 1; i < x_1 - x_2; i++) {
                    if (board.positions[(y_1 - i) * 8 + (x_1 - i)][2] !== null) {
                        return false
                    }
                }
                if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    return false
                }
            } else {
                if (x_1 < x_2 && y_1 > y_2) {
                    for (let i = 1; i < x_2 - x_1; i++) {
                        if (board.positions[(y_1 - i) * 8 + (x_1 + i)][2] !== null) {
                            return false
                        }
                    }
                    if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (x_1 > x_2 && y_1 < y_2) {
                        for (let i = 1; i < x_1 - x_2; i++) {
                            if (board.positions[(y_1 + i) * 8 + (x_1 - i)][2] !== null) {
                                return false
                            }
                        }
                        if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        for (let i = 1; i < x_2 - x_1; i++) {
                            if (board.positions[(y_1 + i) * 8 + (x_1 + i)][2] !== null) {
                                return false
                            }
                        }
                        if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                            return true
                        } else {
                            return false
                        }
                    }
                }
            }
        }

                if (x_1 === x_2) {
            if (y_1 > y_2) {
                for (let i = y_2 + 1; i < y_1; i++) {
                    if (board.positions[i * 8 + x_1][2] !== null) {
                        return false
                    }
                }
                if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    return false
                }
            } else {
                for (let i = y_1 + 1; i < y_2; i++) {
                    if (board.positions[i * 8 + x_1][2] !== null) {
                        return false
                    }
                }
                if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            if (y_1 === y_2) {
                if (x_1 > x_2) {
                    for (let i = x_2 + 1; i < x_1; i++) {
                        if (board.positions[y_1 * 8 + i][2] !== null) {
                            return false
                        }
                    }
                    if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    for (let i = x_1 + 1; i < x_2; i++) {
                        if (board.positions[y_1 * 8 + i][2] !== null) {
                            return false
                        }
                    }
                    if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                }
            } else {
                return false
            }
        }
    }

    if (piece == 'q') {
        if (Math.abs(x_1 - x_2) === Math.abs(y_1 - y_2)) {
            if (x_1 > x_2 && y_1 > y_2) {
                for (let i = 1; i < x_1 - x_2; i++) {
                    if (board.positions[(y_1 - i) * 8 + (x_1 - i)][2] !== null) {
                        return false
                    }
                }
                if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    return false
                }
            } else {
                if (x_1 < x_2 && y_1 > y_2) {
                    for (let i = 1; i < x_2 - x_1; i++) {
                        if (board.positions[(y_1 - i) * 8 + (x_1 + i)][2] !== null) {
                            return false
                        }
                    }
                    if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    if (x_1 > x_2 && y_1 < y_2) {
                        for (let i = 1; i < x_1 - x_2; i++) {
                            if (board.positions[(y_1 + i) * 8 + (x_1 - i)][2] !== null) {
                                return false
                            }
                        }
                        if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                            return true
                        } else {
                            return false
                        }
                    } else {
                        for (let i = 1; i < x_2 - x_1; i++) {
                            if (board.positions[(y_1 + i) * 8 + (x_1 + i)][2] !== null) {
                                return false
                            }
                        }
                        if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                            return true
                        }
                    }
                }
            }
        }

                if (x_1 === x_2) {
            if (y_1 > y_2) {
                for (let i = y_2 + 1; i < y_1; i++) {
                    if (board.positions[i * 8 + x_1][2] !== null) {
                        return false
                    }
                }
                if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    return false
                }
            } else {
                for (let i = y_1 + 1; i < y_2; i++) {
                    if (board.positions[i * 8 + x_1][2] !== null) {
                        return false
                    }
                }
                if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                    return true
                } else {
                    return false
                }
            }
        } else {
            if (y_1 === y_2) {
                if (x_1 > x_2) {
                    for (let i = x_2 + 1; i < x_1; i++) {
                        if (board.positions[y_1 * 8 + i][2] !== null) {
                            return false
                        }
                    }
                    if (board.positions[y_2 * 8 + x_2][2] === null || isLowerCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    for (let i = x_1 + 1; i < x_2; i++) {
                        if (board.positions[y_1 * 8 + i][2] !== null) {
                            return false
                        }
                    }
                    if (board.positions[y_2 * 8 + x_2][2] === null || isUpperCase(board.positions[y_2 * 8 + x_2][2])) {
                        return true
                    } else {
                        return false
                    }
                }
            } else {
                return false
            }
        }
    }


                


    if (viablepositions.includes([x_2, y_2])) {
        return true
    } else {
        return false
    }


}

board.positions = []

// load positions to the array positions

for (let i = 0; i <= 7; i++) {
    for (let j = 0; j <= 7; j++) {
        board.positions.push([i, j, null])
    }
}

board.clear = () => {
    ctx.clearRect(0, 0, 1200, 1200)
}

board.loadPiece = (piece, x, y) => {
    if (piece !== null) {
        const img = new Image()
        img.src = pieceValues[piece]

        img.onload = () => {
            ctx.drawImage(img, x * 150, y * 150, 150, 150)
        }
    } else {
        ctx.clearRect(x * 150, y * 150, 150, 150)
    }
}

// draw the pieces horizontally
const drawBoard = () => {
    board.clear()
    for (let i = 0; i < board.positions.length; i++) {
        board.loadPiece(board.positions[i][2], board.positions[i][1], board.positions[i][0])
    }
}

// load all the default pieces to the board

const loadPieces = () => {
    board.positions[0][2] = 'r'
    board.positions[1][2] = 'n'
    board.positions[2][2] = 'b'
    board.positions[3][2] = 'q'
    board.positions[4][2] = 'k'
    board.positions[5][2] = 'b'
    board.positions[6][2] = 'n'
    board.positions[7][2] = 'r'
    board.positions[8][2] = 'p'
    board.positions[9][2] = 'p'
    board.positions[10][2] = 'p'
    board.positions[11][2] = 'p'
    board.positions[12][2] = 'p'
    board.positions[13][2] = 'p'
    board.positions[14][2] = 'p'
    board.positions[15][2] = 'p'
    board.positions[48][2] = 'P'
    board.positions[49][2] = 'P'
    board.positions[50][2] = 'P'
    board.positions[51][2] = 'P'
    board.positions[52][2] = 'P'
    board.positions[53][2] = 'P'
    board.positions[54][2] = 'P'
    board.positions[55][2] = 'P'
    board.positions[56][2] = 'R'
    board.positions[57][2] = 'N'
    board.positions[58][2] = 'B'
    board.positions[59][2] = 'Q'
    board.positions[60][2] = 'K'
    board.positions[61][2] = 'B'
    board.positions[62][2] = 'N'
    board.positions[63][2] = 'R'
    drawBoard()
}

let prevX = null
let prevY = null
let selectedColor = null

board.addEventListener('click', (mouse) => {
    if (prevX !== null && prevY !== null) {
         ////////////////////
        // PIECE MOVEMENT //
       ////////////////////
        
        
        const x = Math.floor(mouse.offsetX / tileWidth)
        const y = Math.floor(mouse.offsetY / tileHeight)
        const piece = board.positions[prevY * 8 + prevX][2]
        
        if (board.viableMove(piece, [prevX, prevY], [x, y])) {

            // will take the piece that was previously there
            board.positions[y * 8 + x][2] = null
            // - //

            // remove the piece from the previous position
            board.positions[prevY*8 + prevX][2] = null
            board.positions[y * 8 + x][2] = piece

            // visually represent all that we have done
            board.loadPiece(piece, x, y)
            board.loadPiece(null, prevX, prevY)
            board.loadPiece(null, x, y)
            highlight.tile([x, y], 'rgba(255, 245, 135, 0.4)')

            // enable us to highlight again
            prevX = null
            prevY = null

            if (selectedColor == 'white') {
                turn = 'black'
                indicator.innerHTML = 'Black to move.'
            } else {
                turn = 'white'
                indicator.innerHTML = 'White to move.'
            }
        } else {
            highlight.clear()
            prevX = null
            prevY = null
        }



    } else {
         /////////////////////
        // PIECE SELECTION //
       /////////////////////
        
        highlight.clear()
        
        let x = Math.floor(mouse.offsetX / tileWidth)
        let y = Math.floor(mouse.offsetY / tileHeight)

        // check if there is a piece at the clicked position

        for (let i = 0; i < board.positions.length; i++) {
            if (board.positions[i][0] == y && board.positions[i][1] == x && board.positions[i][2] != null) {

                if (isLowerCase(board.positions[i][2]) && turn == 'black') {
                    selectedColor = 'black'
                    console.log(board.positions[i][2])
                    prevX = x
                    prevY = y

                    highlight.tile([x, y], 'rgba(255, 245, 135, 0.4)')
                } else {

                    if (isUpperCase(board.positions[i][2]) && turn == 'white') {
                        selectedColor = 'white'
                        console.log(board.positions[i][2])
                        prevX = x
                        prevY = y

                        highlight.tile([x, y], 'rgba(255, 245, 135, 0.4)')
                    }
                }
            break
        }
    }}
})

loadPieces()





