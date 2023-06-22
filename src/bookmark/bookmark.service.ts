import { Get, Injectable, Post, Patch, Delete } from '@nestjs/common';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {

    @Get()
    getBookmarks(userId: number) { }

    @Get(':id')
    getBookmarksById(userId: number, bookmarkId: number) { }

    @Post(':id')
    createBookmark(userId: number, bookmarkId: number, dto: CreateBookmarkDto) { }

    @Patch()
    editBookmarkById(userId: number, bookmarkId: number, dto: EditBookmarkDto) { }

    @Delete(':id')
    deleteBookmarkById(userId: number, bookmarkId: number) { }
}
