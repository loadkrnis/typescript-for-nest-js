import { Injectable, NotFoundException } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardDto } from './dto/board.dto';
import { DeleteResult } from 'typeorm';
import { BoardStatus } from './board-status.emum';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  // getAllBoards(): Board[] {
  //   return this.boards;
  // }
  //
  // createBoard(boardDto: BoardDto): Board {
  //   const { title, description } = boardDto;
  //   const board = new Board();
  //   board.id = uuid();
  //   board.title = title;
  //   board.description = description;
  //   board.status = BoardStatus.PUBLIC;
  //   this.boards.push(board);
  //   return board;
  // }
  //
  // getBoardById(id: string): Board {
  //   const found = this.boards.find((board) => board.id === id);
  //
  //   if (!found) {
  //     throw new NotFoundException(`Can not find Board with id ${id}`);
  //   }
  //   return found;
  // }
  //
  // deleteBoard(id: string): void {
  //   this.getBoardById(id);
  //
  //   this.boards.filter((board) => board.id !== id);
  // }
  //
  // updateBoardStatus(id: string, status: BoardStatus) {
  //   const board = this.getBoardById(id);
  //   board.status = status;
  //   return board;
  // }
  // async getAll(): Promise<Array<Board>> {
  //   return await this.boardRepository.find();
  // }
  //
  // async getBoardById(id: number): Promise<Board> {
  //   return this.boardRepository.findOne(id);
  // }
  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`[${id}]는 존재하지 않습니다.`);
    }

    return found;
  }

  createBoard(boardDto: BoardDto): Promise<Board> {
    return this.boardRepository.createBoard(boardDto);
  }

  async deleteBoard(id: number): Promise<void> {
    const result: DeleteResult = await this.boardRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`[${id}]는 존재하지 않습니다.`);
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<void> {
    const board = await this.getBoardById(id);

    if (!board) {
      throw new NotFoundException(`[${id}]는 존재하지 않습니다.`);
    }

    board.status = status;

    await this.boardRepository.save(board);
  }
}
