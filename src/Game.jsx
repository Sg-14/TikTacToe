import React, { useState } from 'react';
import Board from './Board';

function Game() {
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [boardSize, setBoardSize] = useState(3);
  const [board, setBoard] = useState([]);
  const [xIsNext, setXIsNext] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setBoard(Array(boardSize * boardSize).fill(null));
    setXIsNext(true);
    setGameStarted(true);
  };

  const handleClick = (i) => {
    const newBoard = board.slice();
    if (calculateWinner(newBoard) || newBoard[i]) return;
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const handleNewGame = () => {
    setPlayer1('')
    setPlayer2('')
    setBoard([])
    setGameStarted(false)
    setXIsNext(true)
  }

  const winner = calculateWinner(board);
  let name = ''
  if(winner){
    if(winner == 'X'){
        name = player1
    }
    else{
        name = player2
    }
  }
  const currentPlayer = xIsNext ? player1 : player2;
  const status = winner ? `Winner: ${name}` : `Next player: ${currentPlayer}`;

  return (
    <div className="game">
      {!gameStarted && (
        <div className="game-setup">
          <div>
            <label>Player 1 Name: </label>
            <input type="text" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
          </div>
          <div>
            <label>Player 2 Name: </label>
            <input type="text" value={player2} onChange={(e) => setPlayer2(e.target.value)} />
          </div>
          <div>
            <label>Board Size: </label>
            <select value={boardSize} onChange={(e) => setBoardSize(Number(e.target.value))}>
              {[3, 4, 5].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleStartGame}>Start Game</button>

          <p>Click on Start Game to View the Tik Tac Toe Grid</p>
        </div>
      )}
      {gameStarted && (
        <>
          <div className="game-info">
            <div>{status}</div>
          </div>
          <Board boardSize={boardSize} squares={board} onClick={handleClick} />

          <div onClick={handleNewGame}> New Game </div>
        </>
      )}
    </div>
  );
}

function calculateWinner(squares) {
  const boardSize = Math.sqrt(squares.length);
  const lines = [];

  // Create winning lines
  for (let i = 0; i < boardSize; i++) {
    // Rows
    lines.push([...Array(boardSize).keys()].map(j => i * boardSize + j));
    // Columns
    lines.push([...Array(boardSize).keys()].map(j => j * boardSize + i));
  }
  // Diagonals
  lines.push([...Array(boardSize).keys()].map(i => i * boardSize + i));
  lines.push([...Array(boardSize).keys()].map(i => i * boardSize + (boardSize - i - 1)));

  for (let line of lines) {
    const [a, ...rest] = line;
    if (squares[a] && rest.every(index => squares[index] === squares[a])) {
      return squares[a];
    }
  }
  return null;
}

export default Game;
