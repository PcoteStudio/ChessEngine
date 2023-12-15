import * as chai from 'chai';
import Board from '../../src/chess/board';
import { PIECES } from '../../src/chess/piece';
import { ArgumentOutOfBounds } from '../../src/chess/error';
import { beforeEach } from 'mocha';

describe('Board', () => {
  describe('constructor()', () => {
    it('should create a board of any positive size', () => {
      let board = new Board(0);
      chai.assert.equal(board.size, 0);
      chai.assert.equal(board.board.length, 0);

      board = new Board(1);
      chai.assert.equal(board.size, 1);
      chai.assert.equal(board.board.length, 1);

      board = new Board(2);
      chai.assert.equal(board.size, 2);
      chai.assert.equal(board.board.length, 4);

      board = new Board(75);
      chai.assert.equal(board.size, 75);
      chai.assert.equal(board.board.length, 5625);
    });

    it('should throw an error when trying to create a board of any negative size', () => {
      /* eslint-disable no-new */
      const expectedError = new ArgumentOutOfBounds({});

      chai.assert.throw(() => {
        new Board(-1);
      }, expectedError.message);

      chai.assert.throw(() => {
        new Board(-2);
      }, expectedError.message);

      chai.assert.throw(() => {
        new Board(-987);
      }, expectedError.message);
      /* eslint-enable no-new */
    });

    it('should fill the board with empty tiles', () => {
      let board = new Board(2);
      chai.assert(board.board.every((tile) => tile === PIECES.NONE));

      board = new Board(78);
      chai.assert(board.board.every((tile) => tile === PIECES.NONE));
    });
  });

  describe('count()', () => {
    const size = 4;
    let board: Board;

    beforeEach(() => {
      board = new Board(size);
    });

    it('should always return the total number of pieces', () => {
      chai.assert.equal(board.count(), 0);

      board.board[0] = PIECES.BLACK_KING;
      chai.assert.equal(board.count(), 1);

      board.board[(size * size) - 1] = PIECES.BLACK_PAWN;
      chai.assert.equal(board.count(), 2);

      board.board[0] = PIECES.BLACK_PAWN;
      chai.assert.equal(board.count(), 2);

      board.board[3] = PIECES.WHITE_BISHOP;
      chai.assert.equal(board.count(), 3);
    });
  });

  describe('get()', () => {
    const size = 4;
    let board: Board;

    beforeEach(() => {
      board = new Board(size);
    });

    it('should get the piece from the intended tile', () => {
      chai.assert.equal(board.get(1, 2), PIECES.NONE);

      board.set(1, 2, PIECES.WHITE_KING);
      chai.assert.equal(board.get(1, 2), PIECES.WHITE_KING);

      board.set(0, 0, PIECES.BLACK_KNIGHT);
      chai.assert.equal(board.get(0, 0), PIECES.BLACK_KNIGHT);

      board.set(3, 3, PIECES.WHITE_PAWN);
      chai.assert.equal(board.get(3, 3), PIECES.WHITE_PAWN);
    });

    it('should throw an error when trying to get a piece from outside the board', () => {
      const expectedError = new ArgumentOutOfBounds({});

      chai.assert.throw(() => {
        board.get(-1, 1);
      }, expectedError.message);

      chai.assert.throw(() => {
        board.get(2, -1);
      }, expectedError.message);

      chai.assert.throw(() => {
        board.get(size, 3);
      }, expectedError.message);

      chai.assert.throw(() => {
        board.get(0, size);
      }, expectedError.message);
    });
  });

  describe('set()', () => {
    const size = 5;
    let board: Board;

    beforeEach(() => {
      board = new Board(size);
    });

    it('should set the right piece on the intended tile', () => {
      chai.assert.equal(board.count(), 0);

      board.set(3, 2, PIECES.BLACK_KNIGHT);
      chai.assert.equal(board.get(3, 2), PIECES.BLACK_KNIGHT);
      chai.assert.equal(board.count(), 1);

      board.set(0, 0, PIECES.WHITE_PAWN);
      chai.assert.equal(board.get(0, 0), PIECES.WHITE_PAWN);
      chai.assert.equal(board.count(), 2);

      board.set(4, 4, PIECES.BLACK_ROOK);
      chai.assert.equal(board.get(4, 4), PIECES.BLACK_ROOK);
      chai.assert.equal(board.count(), 3);
    });

    it('should throw an error when trying to set a piece outside the board', () => {
      chai.assert.equal(board.count(), 0);
      const expectedError = new ArgumentOutOfBounds({});

      chai.assert.throw(() => {
        board.set(-1, 1, PIECES.BLACK_KNIGHT);
      }, expectedError.message);

      chai.assert.throw(() => {
        board.set(2, -1, PIECES.WHITE_PAWN);
      }, expectedError.message);

      chai.assert.throw(() => {
        board.set(size, 3, PIECES.BLACK_ROOK);
      }, expectedError.message);

      chai.assert.throw(() => {
        board.set(4, size, PIECES.WHITE_QUEEN);
      }, expectedError.message);

      chai.assert.equal(board.count(), 0);
    });
  });
});
