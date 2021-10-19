import { Injectable, NotFoundException } from '@nestjs/common';
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

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id);

    if (!found) {
      throw new NotFoundException(`Can not find Board with id ${id}`);
    }
    return found;
  }

  deleteBoard(id: string): void {
    this.getBoardById(id);

    this.boards.filter((board) => board.id !== id);
  }

  updateBoardStatus(id: string, status: BoardStatus) {
    const board = this.getBoardById(id);
    board.status = status;
    return board;
  }
}
