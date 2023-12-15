import { ArgumentOutOfBounds } from './error';
import { PIECES, Piece } from './piece';

class Board {
  readonly size: number;
  readonly board: Array<Piece>;

  constructor(size: number) {
    if (size < 0) {
      throw new ArgumentOutOfBounds({ context: { size } });
    }
    this.size = size;
    this.board = Array(this.size * this.size);
    this.reset();
  }

  reset(): void {
    this.board.fill(PIECES.NONE);
  }

  set(x: number, y: number, piece: Piece): void {
    if (x >= this.size || x < 0 || y >= this.size || y < 0) {
      throw new ArgumentOutOfBounds({ context: { x, y } });
    }
    this.board[x + (y * this.size)] = piece;
  }

  get(x: number, y: number): Piece {
    if (x >= this.size || x < 0 || y >= this.size || y < 0) {
      throw new ArgumentOutOfBounds({ context: { x, y } });
    }
    return this.board[x + (y * this.size)];
  }

  count(): number {
    return this.board.reduce((sum : number, piece : Piece) => sum + (piece > 0 ? 1 : 0), 0);
  }
}

export default Board;
