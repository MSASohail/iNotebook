import React, { useContext, useState } from 'react'
import notesContext from '../context/notes/notesContext';

const Addnote = (props) => {
    const context = useContext(notesContext)
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleclick = (e) => {
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title: "", description: "", tag: "" })
        props.showAlert("Added successfully","success")
    }
    const onchange = (e) => {
        // note object ke ander jo values hai vo rahe magar us ke baad ke jo values hai usku rakho ya usku override kardo
        setNote({ ...note, [e.target.name]: e.target.value })
        // [e.target.name]:e.target.value} means jo bhi uska name hai vo uski value ke bara bar hojaye
    }
    return (
        <div className='container my-3'>
            <h1>Add a Note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title}  name='title' aria-describedby="emailHelp" onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name='description' onChange={onchange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name='tag' onChange={onchange} minLength={5} required/>
                </div>               
                <button disabled={note.title.length<5 ||note.description.length<5|| note.tag.length<5} type="submit" className="btn btn-primary" onClick={handleclick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote