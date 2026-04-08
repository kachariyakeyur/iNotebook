import React, { useContext , useEffect , useState , useCallback} from "react";
import noteContext from "../Context/Notes/noteContext";
import NoteItems from "./NoteItems";
import AddNote from "./AddNote";
import EditNote from "./EditNote";

const Notes = () => {
  const context = useContext(noteContext);
  const { notes , fetchNotes , token } = context;

    // Fetch once when component loads
  // Wrap fetchNotes in useCallback to satisfy ESLint
  const fetchNotesCallback = useCallback(() => {
    if (token) {
      fetchNotes();
    }
  }, [fetchNotes, token]);

  // Fetch notes when token changes
  useEffect(() => {
    fetchNotesCallback();
  }, [fetchNotesCallback]);
 
  const[edit,setEdit] = useState(false); 
  const[editNoteid,setEditNoteid] = useState(null);

  return (
      <>
      { edit ? <EditNote setEdit={setEdit} editNoteid={editNoteid} /> : <AddNote/> }
     
    <div className="row my-3 notes">
      <h1>Your Notes</h1>
      <div className="container text-center my-3">
      {notes.length===0 && <h4>No notes to Display</h4>}
      </div>
      {notes.map((note) => {
        return <NoteItems key={note._id} setEdit={setEdit} setEditNoteid={setEditNoteid} note={note} />;
      })}
    </div>
    </>
  );
};

export default Notes;
 