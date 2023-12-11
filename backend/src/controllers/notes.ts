import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertIsDefined } from "../util/AssertisDefine";

export const getNotes: RequestHandler = async (req, res, next) => {
  const autheticatedUserId = req.session.userId;
  try {

    assertIsDefined(autheticatedUserId);
    // throw createHttpError(401);
    const notes = await NoteModel.find({userId:autheticatedUserId}).exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const autheticatedUserId = req.session.userId;
  const noteId = req.params.noteId;
  try {
    assertIsDefined(autheticatedUserId);
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid note Id...");
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note Not found");
    }
    if(!note.userId.equals(autheticatedUserId)){
      throw createHttpError(401,"you can nt access this note")
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

//b
interface createNoteody {
  title: string;
  text?: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  createNoteody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const autheticatedUserId = req.session.userId;

  try {
    assertIsDefined(autheticatedUserId);
    if (!title) {
      throw createHttpError(400, "note must have titlte");
    }

    const newNote = await NoteModel.create({
      userId:autheticatedUserId,
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};
interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteody {
  title?: string;
  text?: string;
}

export const UpdateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const autheticatedUserId = req.session.userId;
  try {
    assertIsDefined(autheticatedUserId);
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid note Id...");
    }

      if (!newTitle) {
        throw createHttpError(400, "note must have titlte");
      }
   

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note Not found");
    }
    if(!note.userId.equals(autheticatedUserId)){
      throw createHttpError(401,"you can nt access this note")
    }

    note.title = newTitle;
    note.text = newText;
    const updateNote = await note.save();
    res.status(200).json(updateNote);
  } catch (error) {
    next(error);
  }
};

export const deletNote:RequestHandler =  async(req,res,next)=>{
    const noteId = req.params.noteId;
    const autheticatedUserId = req.session.userId;

    try {
      assertIsDefined(autheticatedUserId);
        if (!mongoose.isValidObjectId(noteId)) {
            throw createHttpError(400, "invalid note Id...");
          }
          const note = await NoteModel.findById(noteId).exec();

          if(!note){
            throw createHttpError(404,"Note not found");
          }

          if(!note.userId.equals(autheticatedUserId)){
            throw createHttpError(401,"you can nt access this note")
          }

          await note.deleteOne();

          res.sendStatus(204)

        
    } catch (error) {
        next(error)
        
    }
}
