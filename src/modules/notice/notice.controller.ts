import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { CreateNoticeDTO } from 'src/modules/notice/dto/create-notice.dto'
import { Notice } from 'src/entitys/notice.entity'
import { NoticeStatus } from 'src/modules/notice/models/notice-status.enum'
import { NoticeService } from './notice.service'
import { NoticeStatusValidationPipe } from '../../middlewares/pipes/notice-status-validation'
import { AuthGuard } from '@nestjs/passport'

@Controller('notice')
@UseGuards(AuthGuard())
export class NoticeController {
  constructor(private noticeService: NoticeService) {}

  @Get()
  getAllNotice(): Promise<Notice[]> {
    return this.noticeService.getAllNotice()
  }
  @Get(':id')
  getNoticeById(@Param('id') id: number): Promise<Notice> {
    return this.noticeService.getNoticeById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createNotice(@Body() createnoticeDto: CreateNoticeDTO): Promise<Notice> {
    return this.noticeService.createNotice(createnoticeDto)
  }

  @Delete('/:id')
  deleteNotice(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.noticeService.deleteNotice(id)
  }

  @Patch('/:id/status')
  updateNotice(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', NoticeStatusValidationPipe) status: NoticeStatus,
  ): Promise<Notice> {
    return this.noticeService.updateNotice(id, status)
  }
}
