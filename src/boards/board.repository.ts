import { EntityRepository, Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardDto } from './dto/board.dto';
import { BoardStatus } from './board-status.emum';

@EntityRepository(Board)
export class BoardRepository extends Repository<Board> {
  async createBoard(boardDto: BoardDto): Promise<Board> {
    const { title, description } = boardDto;

    const board = await this.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
