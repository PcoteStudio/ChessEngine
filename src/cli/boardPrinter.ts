import Board from '../chess/board';
import { PIECE_TO_CHAR } from '../chess/piece';

export class BoardPrinter {
  static print(board: Board): void {
    let output = '  | A | B | C | D | E | F | G | H | ';
    for (let y = board.size - 1; y >= 0; y--) {
      output += `\n${ y + 1 } | `;
      for (let x = 0; x < board.size; x++) {
        output += `${ PIECE_TO_CHAR[board.get(x, y)] } | `;
      }
    }
    console.log(output);
  }
}
