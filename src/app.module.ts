import { Module } from '@nestjs/common';
import { AppController } from './notes.controller';
import { InsertNoteService } from './services/insert.note.service';
import { UpdateNoteService } from './services/update.note.service';
import { DeleteNoteService } from './services/delete.note.service';
import { getNoteService } from './services/get.note.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';

var url1: string = process.env.URL1
var url2: string = process.env.URL2
var url3: string = process.env.URL3
var url: string = ''

console.log(url1)
console.log(url2)
console.log(url3)

if (url1 === null ){
  url = 'mongodb://mongo:AyDxAggoIFCQkKBkKkYKFvrkjMOXmVNN@monorail.proxy.rlwy.net:52294'
}else{
  url = `mongodb://${url1}:27017,${url2}:27017,${url3}:27017/test?replicaSet=myReplicaSet`
}

console.log(url)

@Module({
  imports: [MongooseModule.forRoot(url),
            MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }])         
  ],
  controllers: [AppController],
  providers: [InsertNoteService, UpdateNoteService, DeleteNoteService, getNoteService],
})
export class AppModule {}
