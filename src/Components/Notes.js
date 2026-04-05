import React, { useContext , useEffect , useState} from "react";
import noteContext from "../Context/Notes/noteContext";
import NoteItems from "./NoteItems";
import AddNote from "./AddNote";
import EditNote from "./EditNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes , fetchNotes , token } = context;

    // Fetch once when component loads
  useEffect( () => {
     fetchNotes();
  }, [token]);

  const[edit,setEdit] = useState(false);
  const[editNoteid,setEditNoteid] = useState(null);

  return (
      <>
      { edit ? <EditNote setEdit={setEdit} editNoteid={editNoteid} /> : <AddNote/> }
     
    <div className="row my-3 notes">
      <h2>Your Notes</h2>
      <div className="container text-center my-3"><h4>
      {notes.length===0 && "No notes to Display"}
      </h4></div>
      {notes.map((note) => {
        return <NoteItems key={note._id} setEdit={setEdit} setEditNoteid={setEditNoteid} note={note} />;
      })}
    </div>
    </>
  );
};

export default Notes;
