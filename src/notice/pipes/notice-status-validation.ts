import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common'
import { NoticeStatus } from '../models/notice-status.enum'

export class NoticeStatusValidationPipe implements PipeTransform {
  readonly StatusOption = [NoticeStatus.PRIVATE, NoticeStatus.PUBLIC]

  transform(value: string, metadata: ArgumentMetadata) {
    value = value.toUpperCase()

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} isn't in the status options`)
    }

    return value
  }

  private isStatusValid(status: any) {
    const index = this.StatusOption.indexOf(status)
    return index !== -1
  }
}
