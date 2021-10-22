import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.emum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];

  transform(value: any): any {
    if (this.isNotExistBoardId(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }

    return value;
  }

  isNotExistBoardId(value: any) {
    const index = this.StatusOptions.indexOf(value);

    return index !== -1;
  }
}
