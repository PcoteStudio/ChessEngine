import * as chai from 'chai';
import { PIECES, PIECE_TO_CHAR } from '../../src/chess/piece';
import { allUniqueValues } from '../utils';

describe('Piece', () => {
  describe('PIECES', () => {
    it('should have exactly 13 pieces (including empty piece)', () => {
      chai.assert.equal(Object.keys(PIECES).length, 13);
    });

    it('should have a different value for each chess piece', () => {
      const values = Object.values(PIECES);
      chai.assert(allUniqueValues(values));
    });
  });

  describe('PIECE_TO_CHAR', () => {
    it('should at least have a char for every piece', () => {
      chai.assert(Object.keys(PIECE_TO_CHAR).length >= Object.keys(PIECES).length);
    });

    it('should be callable with any piece', () => {
      chai.assert(Math.max(...Object.values(PIECES)) < Object.keys(PIECE_TO_CHAR).length);
    });

    it('should have a different character for every piece', () => {
      const usedChars: string[] = [];
      Object.entries(PIECES).forEach((key, value) => {
        usedChars.push(PIECE_TO_CHAR[value]);
      });
      chai.assert(allUniqueValues(usedChars));
    });
  });
});
