import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { JwtGuard } from 'src/auth/guard'
import { BookmarkService } from './bookmark.service'
import { GetUser } from 'src/auth/decorator'
import { CreateBookmarkDto, EditBookmarkDto } from './dto'

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarService: BookmarkService) {}

  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarService.getBookmarks(userId)
  }

  @Get(':id')
  getBookmarksById(
    @Param('id', ParseIntPipe) bookmarkId: number,
    @GetUser('id') userId: number,
  ) {
    return this.bookmarService.getBookmarksById(userId, bookmarkId)
  }

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarService.createBookmark(userId, dto)
  }

  @Patch(':id')
  editBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDto,
  ) {
    return this.bookmarService.editBookmarkById(userId, bookmarkId, dto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarService.deleteBookmarkById(userId, bookmarkId)
  }
}
