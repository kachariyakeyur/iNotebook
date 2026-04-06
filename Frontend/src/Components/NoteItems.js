import React, { useContext } from "react";
import noteContext from "../Context/Notes/noteContext";

function NoteItems(props) {
  const { note , setEdit , setEditNoteid} = props;

  const context = useContext(noteContext);
  const { deleteNote } = context;

  const dNote = () => {
    
    deleteNote(note._id);
    console.log("delete");
  }

  const eNote = () => {
    setEditNoteid(note)
    setEdit(true);
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

  }

  return (
    <div className="col-md-3" >
     
      <div className="card my-3 item">
        <div className="card-body">
            <div className="d-flex align-items-center ">
          <h5 className="card-title">{note.title}</h5>
          <i className="fa-solid fa-trash-can mx-2"  onClick={dNote}  ></i>
          <i className="fa-solid fa-pencil mx-2"  onClick={eNote} ></i>

            </div>
          <p className="card-text">
            {note.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default NoteItems;
