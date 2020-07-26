import * as ActionTypes from './actionTypes';
import db from '../db';

export const fetchNotes=()=>(dispatch)=>{
    dispatch(notesLoading());

    return db.allDocs({include_docs:true,attachments:true})
    .then((notes)=>{
        dispatch(addNotes(notes.rows))
    })
    .catch((err)=>{
        dispatch(notesFailed(err))
    });
}

const addNotes=(notes)=>({
    type:ActionTypes.ADD_NOTES,
    payload:notes
});

const notesLoading=()=>({
    type:ActionTypes.NOTES_LOADING
})

const notesFailed=(err)=>({
    type:ActionTypes.NOTES_FAILED,
    payload:err
})


export const postNote=(newNote)=>(dispatch)=>{
    newNote.createdAt=new Date();
    newNote.updatedAt=new Date();
    console.log(newNote);
    return db.post(newNote)
    .then((resp)=>{
        if(resp.ok){
            return resp;
        }
        else{
            var err=new Error('Unable to save Note');
            throw err
        }
    },err=>{
        var errmess=new Error(err.message)
        throw errmess;
    })
    .then(note=>{
        db.allDocs({include_docs:true,attachments:true})
        .then((notes)=>{
            dispatch(addNotes(notes.rows))
        },err=>{
            var errmess=new Error(err.message)
            throw errmess;
        })
    })
    .catch(err=>{
        console.log("SAVE NOTE FAILED: ",err.message);
        alert("SAVE NOTE FAILED: ",err.message);
    })
}