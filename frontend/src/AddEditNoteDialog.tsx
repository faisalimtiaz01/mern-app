import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Note } from "./models/note";
import { useForm } from "react-hook-form";
import { NoteInput } from "./network/note_api";
import * as NotesApi from "./network/note_api"
import TextInputfield from "./components/form/TextInputfield";

interface AddEditNotedialogProps {
  noteToEdit?:Note,
  onDismiss: () => void,
  onNoteSaved:(note:Note)=>void
}

const AddEditNoteDialog = ({noteToEdit, onDismiss,onNoteSaved }: AddEditNotedialogProps) => {
  const {register,handleSubmit,formState:{errors,isSubmitting}} = useForm<NoteInput>({
    defaultValues:{
      title:noteToEdit?.title || "",
      text:noteToEdit?.text|| "",
    }
  })

    async function onSubmit(input:NoteInput){
    try {
      let noteResponse:Note;
      if(noteToEdit){
        noteResponse = await NotesApi.updateNote(noteToEdit._id,input)
      }
      else{
        noteResponse = await NotesApi.createNote(input);
      }
  
        onNoteSaved(noteResponse);
        
    } catch (error) {
        console.error(error);
        alert(error)
    }
    
    }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit?"Edit note" : "Add note"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
        <TextInputfield name="title" label="Title" type="text" register={register}
         registerOptions={{required:"Required"}} error={errors.title}  />

         <TextInputfield  name="text" label="Text" as="textarea" rows={5} placeholder="Text" register={register} />
         

        </Form>
      </Modal.Body>

    
      <Modal.Footer>
      <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
       save
      </Button>               
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;
