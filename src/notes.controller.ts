import { Controller, Delete, Get, Post, Put, Query, Req, Res } from '@nestjs/common';
import { InsertNoteService } from './services/insert.note.service';
import { UpdateNoteService } from './services/update.note.service';
import { DeleteNoteService } from './services/delete.note.service';
import { getNoteService } from './services/get.note.service';
import { Response, Request, query } from 'express';
import { insertNoteDto } from './dto/insertNoteDto';


@Controller()
export class AppController {
  constructor(private readonly InsertNoteService: InsertNoteService,
              private readonly UpdateNoteService: UpdateNoteService,
              private readonly DeleteNoteService: DeleteNoteService,
              private readonly getNoteService:    getNoteService
  ) {}


  @Post('/notes')
  async postNote(@Res() res: Response, @Req() req: Request): Promise<any>{
    const {
      title,
      content 
    } = req.body

    let noteDto = new insertNoteDto(title,content)
    
    let note = await this.InsertNoteService.insert(noteDto)

    return(res.status(200).json(note))
    
  }

  @Put()
  putNote(){
    // this.UpdateNoteService.update(id_note)
  }

  @Delete()
  DeleNote(){

  }

  @Get('/notes')
  async getHello(@Res() response: Response, @Req() request: Request): Promise<any> {
    const { id_note } = request.query

    if (id_note !== undefined) {
      return( response.json({param: id_note}) )
    }

    let notes = await this.getNoteService.getAll()

    return(response.json(notes));
  }

}
