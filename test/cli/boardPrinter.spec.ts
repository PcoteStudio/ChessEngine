import * as chai from 'chai';
import Board from '../../src/chess/board';
import { PIECES } from '../../src/chess/piece';
import { beforeEach } from 'mocha';
import { BoardPrinter } from '../../src/cli/boardPrinter';
import { BoardFactory } from '../../src/chess/boardFactory';

describe('BoardPrinter', () => {
  let board: Board;

  beforeEach(() => {
    board = new Board(8);
    board.set(0, 7, PIECES.BLACK_PAWN);
    board.set(1, 6, PIECES.WHITE_PAWN);
    board = BoardFactory.createStandardBoard(true);
  });

  describe('print()', () => {
    it('should successfully print the board in the console', () => {
      chai.assert.doesNotThrow(() => {
        BoardPrinter.print(board);
      });
    });

  });
});
