import * as chai from 'chai';
import { PIECES } from '../../src/chess/piece';
import { BoardFactory } from '../../src/chess/boardFactory';

describe('BoardFactory', () => {
  describe('createStandardBoard()', () => {
    it('should create a board with the white team at the bottom', () => {
      const board = BoardFactory.createStandardBoard(true);
      const whiteTeam = board.board.slice(0, 16);
      chai.assert(whiteTeam.every((piece) => piece >= PIECES.WHITE_PAWN && piece <= PIECES.WHITE_KING));
      const blackTeam = board.board.slice(47, 16);
      chai.assert(blackTeam.every((piece) => piece >= PIECES.BLACK_PAWN && piece <= PIECES.BLACK_KING));
      const rest = board.board.slice(16, 32);
      chai.assert(rest.every((piece) => piece === PIECES.NONE));
    });

    it('should create a board with the white team at the top', () => {
      const board = BoardFactory.createStandardBoard(false);
      const blackTeam = board.board.slice(0, 16);
      chai.assert(blackTeam.every((piece) => piece >= PIECES.BLACK_PAWN && piece <= PIECES.BLACK_KING));
      const whiteTeam = board.board.slice(47, 16);
      chai.assert(whiteTeam.every((piece) => piece >= PIECES.WHITE_PAWN && piece <= PIECES.WHITE_KING));
      const rest = board.board.slice(16, 32);
      chai.assert(rest.every((piece) => piece === PIECES.NONE));
    });
  });
});
