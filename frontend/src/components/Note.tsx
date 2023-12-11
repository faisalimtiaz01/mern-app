import React from "react";
import styles from "../styles/Note.module.css";
import styleUtils from "../styles/utils.module.css";
import { Note as NoteModel } from "../models/note";
import { Card } from "react-bootstrap";
import { formatedDate } from "../utils/formatDate";
import {MdDelete} from 'react-icons/md';
interface NoteProps {
  note: NoteModel;
  onNoteClicked:(note:NoteModel)=>void;
  onDeleteNoteClicked:(note:NoteModel)=>void;
  className?: string;
}

const Note = ({ note,onNoteClicked,onDeleteNoteClicked, className }: NoteProps) => {
  const {
    title,
    text,
    createdAt,
    updatedAt
  } = note;

  let createdUpdatedText:string;
  if(updatedAt > createdAt){
       createdUpdatedText = "Updated:" + formatedDate(updatedAt);

  }
  else{
    createdUpdatedText = "Created:" + formatedDate(createdAt);
  }
  return (
    <div>
      <Card className={`${styles.noteCard} ${className} `}
       onClick={()=>onNoteClicked(note)}
      >
        <Card.Body className={styles.CardBody}>
          <Card.Title className={styleUtils.flexCenter}>{title} <MdDelete className="text-muted ms-auto" onClick={(e)=>{ 
          onDeleteNoteClicked(note)
          e.stopPropagation();

          }} /> </Card.Title>
          <Card.Text className={styles.notetext}>{text}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
      </Card>
    </div>
  );
};

export default Note;
