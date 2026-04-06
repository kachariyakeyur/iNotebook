import React, { useContext , useState , useEffect } from "react";
import noteContext from "../Context/Notes/noteContext";

const EditNote = (props) => {

    const {setEdit , editNoteid} = props;

    const [note , setNote] = useState({ id : editNoteid._id ,title : editNoteid.title  , description : editNoteid.description , tag : editNoteid.tag})
    
    useEffect(() => {
  setNote({
    id: editNoteid._id,
    title: editNoteid.title,
    description: editNoteid.description,
    tag: editNoteid.tag,
  });
}, [editNoteid]);

      const context = useContext(noteContext);
      const { editNote } = context;

      const add = (e)=>{
        e.preventDefault();
        editNote(note.id,note.title , note.description , note.tag);
        setEdit(false);
      }

      const onChange = (e)=>{
        setNote({...note, [e.target.name] : e.target.value})

      }

  return (
    <div className="note-position my-3">
        

        <form className="note my-3">
          <h2>Edit Selected Note</h2>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <h3>Title</h3>
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="title"
              minLength={5} required
              value= {note.title}
              onChange={onChange}
              placeholder="Enter Title ( minimum length 3 )"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              <h3>Notes</h3>
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              aria-describedby="description"
              minLength={5} required
              value= {note.description}
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
              aria-describedby="tag"
              value= {note.tag}
              onChange={onChange}
            />
          </div>
          
          <button type="submit" className="btn note-button mx-2" onClick={add} disabled={note.title.length<3 || note.description.length <5} >
            Edit Note
          </button>
          <button type="button" className="btn note-button mx-2" onClick={() => setEdit(false)} >
            Cancel
          </button>
        </form>
      </div>
  )
}

export default EditNote
