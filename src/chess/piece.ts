const PIECES = {
  NONE: 0,
  WHITE: {
    PAWN: 1,
    KNIGHT: 2,
    BISHOP: 3,
    ROOK: 4,
    QUEEN: 5,
    KING: 6,
  },
  BLACK: {
    PAWN: 7,
    KNIGHT: 8,
    BISHOP: 9,
    ROOK: 10,
    QUEEN: 11,
    KING: 12,
  },
};
type Piece = (typeof PIECES)[keyof typeof PIECES];

const PIECE_TO_CHAR = [ ' ', '♟', '♞', '♝', '♜', '♛', '♚', '♙', '♘', '♗', '♖', '♕', '♔' ];

export { Piece, PIECES, PIECE_TO_CHAR };
