import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(title: string, description: string): Board {
    const board = new Board();
    board.id = '1';
    board.title = title;
    board.description = description;
    board.status = BoardStatus.PUBLIC;
    return board;
  }
}
