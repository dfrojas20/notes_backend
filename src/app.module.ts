import { Module } from '@nestjs/common';
import { AppController } from './notes.controller';
import { InsertNoteService } from './services/insert.note.service';
import { UpdateNoteService } from './services/update.note.service';
import { DeleteNoteService } from './services/delete.note.service';
import { getNoteService } from './services/get.note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';

@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo:AyDxAggoIFCQkKBkKkYKFvrkjMOXmVNN@monorail.proxy.rlwy.net:52294'),
            MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])         
  ],
  controllers: [AppController],
  providers: [InsertNoteService, UpdateNoteService, DeleteNoteService, getNoteService],
})
export class AppModule {}
