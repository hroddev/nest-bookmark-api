import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { BookmarkService } from './bookmark.service';
import { GetUser } from 'src/auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(
        private bookmarService: BookmarkService
    ) { }

    @Get()
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmarService.getBookmarks(userId);
    }

    @Get(':id')
    getBookmarksById(
        @Param('id') bookmarkId: number,
        @GetUser('id') userId: number) {
        return this.bookmarService.getBookmarksById(userId, bookmarkId);
    }

    @Post(':id')
    createBookmark(
        @GetUser('id') userId: number,
        @Param('id') bookmarkId: number,
        @Body() dto: CreateBookmarkDto) {
        return this.bookmarService.createBookmark(userId, bookmarkId, dto)
    }

    @Patch(':id')
    editBookmarkById(
        @GetUser('id') userId: number,
        @Param('id') bookmarkId: number,
        @Body() dto: EditBookmarkDto) {
        return this.bookmarService.editBookmarkById(userId, bookmarkId, dto)
    }

    @Delete(':id')
    deleteBookmarkById(
        @GetUser('id') userId: number,
        @Param('id') bookmarkId: number) {
        return this.bookmarService.deleteBookmarkById(userId, bookmarkId)
    }

}


