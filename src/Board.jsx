import React from 'react';
import Square from './Square';

function Board({ boardSize, squares, onClick }) {
  const renderSquare = (i) => {
    return <Square key={i} value={squares[i]} onClick={() => onClick(i)} />;
  };

  const renderBoard = () => {
    let board = [];
    for (let row = 0; row < boardSize; row++) {
      let boardRow = [];
      for (let col = 0; col < boardSize; col++) {
        boardRow.push(renderSquare(row * boardSize + col));
      }
      board.push(
        <div key={row} className="board-row">
          {boardRow}
        </div>
      );
    }
    return board;
  };

  return <div>{renderBoard()}</div>;
}

export default Board;