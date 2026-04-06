import React, { useState  } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const host = "https://inotebook-backend-c05i.onrender.com";
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);
    

  //Fetch all a Notes

  const fetchNotes = async () => {

    // API call

    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "auth-token": token
      },
      
    });
    const json = await response.json();
    setNotes(Array.isArray(json) ? json : []);
  };


  //Add a Note

  const addNote = async (title, description, tag) => {

    // API call

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token      },
      body: JSON.stringify({title , description , tag}),
    });

    const json = await response.json();

    setNotes(notes.concat(json));
  };

  //Delete a Note

  const deleteNote = async (id) => {
    

    // API call

      await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token" : token      }
    });

    // Delete

    setNotes(notes.filter((item) => item._id !== id));
    
  };

  //Edit a Note

  const editNote = async (id, title, description, tag) => {

    // API call

    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":token
       },
      body: JSON.stringify({title , description , tag}),
    });


    // Edit
   fetchNotes();

};

     // clear

   const clearNotes = () => {
  setNotes([]); 

   
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchNotes , setToken , token , clearNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
