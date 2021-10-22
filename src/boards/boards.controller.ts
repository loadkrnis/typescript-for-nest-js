import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity';
import { BoardDto } from './dto/board.dto';
import { BoardStatus } from './board-status.emum';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  getBoardAll(): Promise<Array<Board>> {
    return this.boardService.getBoardAll();
  }

  @Get('/:id')
  getBoardById(@Param('id') id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() request: BoardDto): Promise<Board> {
    return this.boardService.createBoard(request);
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') id: number): Promise<void> {
    return this.boardService.deleteBoard(id);
  }

  @Patch('/:id/status')
  @UsePipes(ValidationPipe)
  async updateBoard(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<void> {
    return this.boardService.updateBoardStatus(id, status);
  }
}
