import Board from '../chess/board';
import { PIECES } from '../chess/piece';

export class BoardFactory {
  static createStandardBoard(whiteAtBottom = true): Board {
    const board = new Board(8);

    for (let x = 0; x < board.size; x++) {
      board.set(x, 6, whiteAtBottom ? PIECES.BLACK_PAWN : PIECES.WHITE_PAWN);
      board.set(x, 1, whiteAtBottom ? PIECES.WHITE_PAWN : PIECES.BLACK_PAWN);
    }

    board.set(0, 7, whiteAtBottom ? PIECES.BLACK_ROOK : PIECES.WHITE_ROOK);
    board.set(7, 7, whiteAtBottom ? PIECES.BLACK_ROOK : PIECES.WHITE_ROOK);
    board.set(1, 7, whiteAtBottom ? PIECES.BLACK_KNIGHT : PIECES.WHITE_KNIGHT);
    board.set(6, 7, whiteAtBottom ? PIECES.BLACK_KNIGHT : PIECES.WHITE_KNIGHT);
    board.set(2, 7, whiteAtBottom ? PIECES.BLACK_BISHOP : PIECES.WHITE_BISHOP);
    board.set(5, 7, whiteAtBottom ? PIECES.BLACK_BISHOP : PIECES.WHITE_BISHOP);
    board.set(3, 7, whiteAtBottom ? PIECES.BLACK_QUEEN : PIECES.WHITE_KING);
    board.set(4, 7, whiteAtBottom ? PIECES.BLACK_KING : PIECES.WHITE_QUEEN);

    board.set(0, 0, whiteAtBottom ? PIECES.WHITE_ROOK : PIECES.BLACK_ROOK);
    board.set(7, 0, whiteAtBottom ? PIECES.WHITE_ROOK : PIECES.BLACK_ROOK);
    board.set(1, 0, whiteAtBottom ? PIECES.WHITE_KNIGHT : PIECES.BLACK_KNIGHT);
    board.set(6, 0, whiteAtBottom ? PIECES.WHITE_KNIGHT : PIECES.BLACK_KNIGHT);
    board.set(2, 0, whiteAtBottom ? PIECES.WHITE_BISHOP : PIECES.BLACK_BISHOP);
    board.set(5, 0, whiteAtBottom ? PIECES.WHITE_BISHOP : PIECES.BLACK_BISHOP);
    board.set(3, 0, whiteAtBottom ? PIECES.WHITE_QUEEN : PIECES.BLACK_KING);
    board.set(4, 0, whiteAtBottom ? PIECES.WHITE_KING : PIECES.BLACK_QUEEN);

    return board;
  }
}
