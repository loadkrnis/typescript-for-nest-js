import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './board.model';
import { v1 as uuid } from 'uuid';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardsService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  createBoard(boardDto: BoardDto): Board {
    const { title, description } = boardDto;
    const board = new Board();
    board.id = uuid();
    board.title = title;
    board.description = description;
    board.status = BoardStatus.PUBLIC;
    this.boards.push(board);
    return board;
  }
}
