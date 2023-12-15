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

  describe('isInBounds()', () => {
    const size = 9;
    let board: Board;

    beforeEach(() => {
      board = new Board(size);
    });

    it('should identify all valid coordinates as in bounds', () => {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          chai.assert.equal(board.isInBounds(x, y), true);
        }
      }
    });

    it('should identify any coordinates with invalid x as out of bounds', () => {

      for (let y = 0; y < size; y++) {
        for (let x = -2 * size; x < 0; x++) {
          chai.assert.equal(board.isInBounds(x, y), false);
        }
        for (let x = size; x < size * 2; x++) {
          chai.assert.equal(board.isInBounds(x, y), false);
        }
      }
    });

    it('should identify any coordinates with invalid y as out of bounds', () => {
      for (let x = 0; x < size; x++) {
        for (let y = -2 * size; y < 0; y++) {
          chai.assert.equal(board.isInBounds(x, y), false);
        }
        for (let y = size; y < size * 2; y++) {
          chai.assert.equal(board.isInBounds(x, y), false);
        }
      }
    });
  });

  describe('count()', () => {
    const size = 4;
    let board: Board;

    beforeEach(() => {
      board = new Board(size);
    });

    it('should correctly count different pieces', () => {
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

    it('should evaluate every tile on the board', () => {
      for (let i = 0; i < size * size; i++) {
        board.board.fill(PIECES.BLACK_KING, 0, i);
        chai.assert.equal(board.count(), i);
      }
    });

    it('should count less when removing pieces', () => {
      board.board.fill(PIECES.WHITE_QUEEN, 0, (size * size) - 1);
      chai.assert.equal(board.count(), (size * size) - 1);

      board.board[0] = PIECES.NONE;
      chai.assert.equal(board.count(), (size * size) - 2);

      board.board[size] = PIECES.NONE;
      chai.assert.equal(board.count(), (size * size) - 3);
    });
  });

  describe('get()', () => {
    const size = 4;
    let board: Board;

    beforeEach(() => {
      board = new Board(size);
    });

    it('should get any piece from the intended tile', () => {
      const highestPiece = Math.max(...Object.values(PIECES));
      for (let piece = 0; piece < highestPiece; piece++) {
        board.set(2, 3, piece);
        chai.assert.equal(board.get(2, 3), piece);
      }
    });

    it('should get a piece from any valid tile', () => {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          board.set(x, y, PIECES.BLACK_ROOK);
          chai.assert.equal(board.get(x, y), PIECES.BLACK_ROOK);
          board.set(x, y, PIECES.NONE);
          chai.assert.equal(board.get(x, y), PIECES.NONE);
        }
      }
    });

    it('should throw an error when trying to get a tile from outside the board', () => {
      /* eslint-disable no-loop-func */
      const expectedError = new ArgumentOutOfBounds({});

      // X out of bounds
      for (let y = 0; y < size; y++) {
        for (let x = -2 * size; x < 0; x++) {
          chai.assert.throw(() => {
            board.get(x, y);
          }, expectedError.message);
        }
        for (let x = size; x < size * 2; x++) {
          chai.assert.throw(() => {
            board.get(x, y);
          }, expectedError.message);
        }
      }

      // Y out of bounds
      for (let x = 0; x < size; x++) {
        for (let y = -2 * size; y < 0; y++) {
          chai.assert.throw(() => {
            board.get(x, y);
          }, expectedError.message);
        }
        for (let y = size; y < size * 2; y++) {
          chai.assert.throw(() => {
            board.get(x, y);
          }, expectedError.message);
        }
      }

      /* eslint-enable no-loop-func */
    });
  });

  describe('set()', () => {
    const size = 5;
    let board: Board;

    beforeEach(() => {
      board = new Board(size);
    });

    it('should set any piece on the intended tile', () => {
      const highestPiece = Math.max(...Object.values(PIECES));
      for (let piece = 0; piece < highestPiece; piece++) {
        board.set(2, 3, piece);
        chai.assert.equal(board.get(2, 3), piece);
      }
    });

    it('should set a piece on any valid tile', () => {
      chai.assert.equal(board.count(), 0);
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          board.set(x, y, PIECES.WHITE_PAWN);
          chai.assert.equal(board.get(x, y), PIECES.WHITE_PAWN);
          board.set(x, y, PIECES.NONE);
          chai.assert.equal(board.get(x, y), PIECES.NONE);
        }
      }
      chai.assert.equal(board.count(), 0);
    });

    it('should throw an error when trying to set a tile outside the board', () => {
      /* eslint-disable no-loop-func */
      const expectedError = new ArgumentOutOfBounds({});

      // X out of bounds
      for (let y = 0; y < size; y++) {
        for (let x = -2 * size; x < 0; x++) {
          chai.assert.throw(() => {
            board.set(x, y, PIECES.NONE);
          }, expectedError.message);
        }
        for (let x = size; x < size * 2; x++) {
          chai.assert.throw(() => {
            board.set(x, y, PIECES.NONE);
          }, expectedError.message);
        }
      }

      // Y out of bounds
      for (let x = 0; x < size; x++) {
        for (let y = -2 * size; y < 0; y++) {
          chai.assert.throw(() => {
            board.set(x, y, PIECES.NONE);
          }, expectedError.message);
        }
        for (let y = size; y < size * 2; y++) {
          chai.assert.throw(() => {
            board.set(x, y, PIECES.NONE);
          }, expectedError.message);
        }
      }

      /* eslint-enable no-loop-func */
    });
  });

  describe('isEmpty()', () => {
    const size = 6;
    let board: Board;

    beforeEach(() => {
      board = new Board(size);
    });

    it('should correctly identify any empty tiles as empty', () => {
      board.board.fill(PIECES.BLACK_BISHOP);
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          board.set(x, y, PIECES.NONE);
          chai.assert.equal(board.isEmpty(x, y), true);
          board.set(x, y, PIECES.BLACK_BISHOP);
        }
      }
    });

    it('should correctly identify any occupied tiles as not empty', () => {
      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          board.set(x, y, PIECES.WHITE_PAWN);
          chai.assert.equal(board.isEmpty(x, y), false);
          board.set(x, y, PIECES.NONE);
        }
      }
    });

    it('should throw an error when testing a tile outside the board', () => {
      /* eslint-disable no-loop-func */
      const expectedError = new ArgumentOutOfBounds({});

      // X out of bounds
      for (let y = 0; y < size; y++) {
        for (let x = -2 * size; x < 0; x++) {
          chai.assert.throw(() => {
            board.isEmpty(x, y);
          }, expectedError.message);
        }
        for (let x = size; x < size * 2; x++) {
          chai.assert.throw(() => {
            board.isEmpty(x, y);
          }, expectedError.message);
        }
      }

      // Y out of bounds
      for (let x = 0; x < size; x++) {
        for (let y = -2 * size; y < 0; y++) {
          chai.assert.throw(() => {
            board.isEmpty(x, y);
          }, expectedError.message);
        }
        for (let y = size; y < size * 2; y++) {
          chai.assert.throw(() => {
            board.isEmpty(x, y);
          }, expectedError.message);
        }
      }

      /* eslint-enable no-loop-func */
    });
  });
});
