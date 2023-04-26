
import { useState } from "react";
import Notescontext from "./notesContext";

const NotesState = (props) => {
  const host = "http://localhost:5000"
  const initialnotes = [];
  const [notes, setnotes] = useState(initialnotes)

  // GET a notes
  const getallNotes = async () => {
    // [APICALL]
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc. 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json()
    console.log(json)
    setnotes(json)
  }

  // Add a note
  const addNote = async (title, description, tag) => {  
    // [APICALL]
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc. 
      headers: {
        "Content-Type": "application/json", 

       'Accept':'application/json'   ,   
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    console.log("adding a new note")
    const note = await response.json();
    setnotes(notes.concat(note))
  }

  // Delete a note
  const deleteNote = async(id) => {
    // [APICALL]
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc. 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },       
    });
    const json = await response.json();
    console.log(json)
    console.log("deleting a node" + id)
    // agar note._id not equal to hai id se tho unne notes mai ajata nai tho nai ata
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  }

  // Edit a note
  const EditNote = async (id, title, description, tag) => {
    // API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc. 
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const json = response.json();

    //LOGIC TO EDIT IN CLIENT
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index <newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {     
        newNotes[index].title = title;
        newNotes[index].discription = description;
        newNotes[index].tag = tag;
        break;
      }
    }    
    setnotes(newNotes)
  }
  return (

    <Notescontext.Provider value={{ notes, addNote, deleteNote, EditNote,getallNotes }}>{props.children}</Notescontext.Provider>
  )
}
export default NotesState;