import React, { useContext , useState } from "react";
import noteContext from "../Context/Notes/noteContext";

function AddNote() {

    const [note , setNote] = useState({ title : "" , description : "" , tag : "default"})

      const context = useContext(noteContext);
      const { addNote } = context;

      const add = (e)=>{
        e.preventDefault();
        addNote(note.title , note.description , note.tag);
        setNote({
    title: "",
    description: "",
    tag: "default",
  });

      }

      const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})
        
      }

  return (
    <div className="note-position my-2">
        

        <form className="my-3 note">

          <h2>Add a Note</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <h3>Title</h3>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              aria-describedby="title"
              minLength={5} required
              onChange={onChange}
              placeholder="Enter Title ( minimum length 3 )"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <h3>Notes</h3>
            </label>
            <textarea
              type="text"
              className="form-control textarea"
              id="description"
              name="description"
              value={note.description}
              aria-describedby="description"
              minLength={5} required
              onChange={onChange}
              placeholder="Enter Your Notes ( minimum length 5 )"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              <h3>Tag</h3>
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              aria-describedby="tag"
              onChange={onChange}
            />
          </div>
          
          <button type="submit" className="button" onClick={add} disabled={note.title.length<3 || note.description.length <5} >
            Add Note
          </button>
        </form>
      </div>
  )
}

export default AddNote
