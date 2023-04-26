import React, { useContext, useEffect, useRef, useState } from 'react'
import notesContext from '../context/notes/notesContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
import { useNavigate } from 'react-router';
function Notes(props) {
    const context = useContext(notesContext)
    const { notes, getallNotes, EditNote } = context;
    let history = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getallNotes()
        } else {
            history("/login");
        }
// eslint-disable-next-line
    }, [])
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
    const ref = useRef(null)
    const refclose = useRef(null)
    const updateNote = (currnote) => {
        setNote({ id: currnote._id, etitle: currnote.title, edescription: currnote.description, etag: currnote.tag })
        ref.current.click();
    }


    const handleclick = (e) => {
        console.log("updating the note...", note)
        EditNote(note.id, note.etitle, note.edescription, note.etag);
        refclose.current.click();
        props.showAlert("updated successfully", "success")
    }

    const onchange = (e) => {
        // note object ke ander jo values hai vo rahe magar us ke baad ke jo values hai usku rakho ya usku override kardo
        setNote({ ...note, [e.target.name]: e.target.value })
        // [e.target.name]:e.target.value} means jo bhi uska name hai vo uski value ke bara bar hojaye
    }
    return (
        <>
            <Addnote showAlert={props.showAlert} />
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* form */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp" value={note.etitle} onChange={onchange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name='edescription' onChange={onchange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag} name='etag' onChange={onchange} minLength={5} required />
                                </div>

                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length < 5 || note.edescription.length < 5 || note.etag.length < 5} onClick={handleclick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                <h1>Your Note</h1>
                <div className='container'>
                    {notes.length === 0 && 'No Notes to display'}
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
            </div>
        </>

    )
}

export default Notes