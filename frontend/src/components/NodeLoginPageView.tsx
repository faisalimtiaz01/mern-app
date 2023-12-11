
import { useEffect, useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import AddEditNoteDialog from '../AddEditNoteDialog';
import Note from '../components/Note';
import { Note as NoteModel } from '../models/note';
import * as NotesApi from '../network/note_api';
import styles from "../styles/NotesPage.module.css";
import stylesUtils from "../styles/utils.module.css";


const NodeLoginPageView = () => {
    const  [notes, setNotes] = useState<NoteModel[]>([]);
    const [notesLoading,setnoteloading] = useState(true);
    const [showNotesLoadingError,setNotLoadingError] = useState(false)
      const [showAddNoteDialog,setShowAddDialog] = useState(false)
      const [noteToEdit,setNoteToEdit] = useState<NoteModel|null>(null);

      useEffect(()=>{

   
        async function loadNotes () {
          setNotLoadingError(false);
          setnoteloading(true)
         try {
          const notes = await NotesApi.fetchNodes()
          setNotes(notes);
    
         } catch (error) {
            console.log(error)
            setNotLoadingError(true);
           
         }
         finally{ 
    
          setnoteloading(false)
        }
        }
       
        loadNotes()
    
      },[])
    
      async function deleteNote(note:NoteModel) {
        try {
          await NotesApi.deleteNote(note._id);
          setNotes(notes.filter(existingNote=>existingNote._id!==note._id))
          
        } catch (error) {
          console.error(error)
          alert(error)
        }
      }
      const notesGrid=<Row xs={1} md={2} lg={3} className={`g-4 ${styles.notesGrid}`}>
      {
       notes.map((note)=>(
         <Col key={note._id}>
          <Note note={note}  className={styles.note} onDeleteNoteClicked={deleteNote} onNoteClicked={setNoteToEdit} />
          </Col>
       ))
      }
      </Row>
    
  return (
   <>
     <Button 
      className={`m-4 ${stylesUtils.blockCenter} ${stylesUtils.flexCenter} `}
      onClick={()=>setShowAddDialog(true)}>
        <FaPlus  />
        Add new Note
      </Button>
      {
        notesLoading && <Spinner animation='border' variant='primary' />
      }

      {
        !notesLoading && !showNotesLoadingError && 
        <>
        {
          notes.length > 0 ? notesGrid : <p>You dont have any note yet</p>
        }
        </>
      }

      {
        showNotesLoadingError && <p>Something went wrong,please referesh the page</p>
      }
    
    {
      showAddNoteDialog && 
      <AddEditNoteDialog onDismiss={()=>setShowAddDialog(false)} onNoteSaved={(newNote)=>{

        setNotes([...notes,newNote])
        setShowAddDialog(false)
      }} />
    }
    {
      noteToEdit && 
      <AddEditNoteDialog noteToEdit={noteToEdit}  onDismiss={()=>setNoteToEdit(null)} onNoteSaved={(updatedNote)=>{
        setNotes(notes.map(existingNote => existingNote._id === updatedNote._id ? updatedNote  : existingNote));
        setNoteToEdit(null)
      }}  />
    }
   </>
  )
}

export default NodeLoginPageView