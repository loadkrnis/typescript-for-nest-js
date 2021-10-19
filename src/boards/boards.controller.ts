import { Body, Controller, Get, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.model';
import { BoardDto } from './dto/board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoard(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Post()
  createBoard(@Body() boardDto: BoardDto): Board {
    return this.boardService.createBoard(boardDto);
  }
}
