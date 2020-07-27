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
        alert("SAVE NOTE FAILED: "+err.message);
    })
}

export const deleteNote=(noteId,noteRev)=>(dispatch)=>{
    return db.remove(noteId,noteRev)
    .then(resp=>console.log(resp))
    .then(res=>{
        db.allDocs({include_docs:true,attachments:true})
        .then((notes)=>{
            dispatch(addNotes(notes.rows))
        },err=>{
            var errmess=new Error(err.message)
            throw errmess;
        })
    })
    .catch(err=>{
        console.log("DELETE NOTE FAILED: "+err.message);
        alert("DELETE NOTE FAILED: "+err.message);
    })
}

export const editNote=(noteId,updatedData)=>(dispatch)=>{
    return db.get(noteId)
    .then((note)=>{
        db.put({
            _id:note._id,
            _rev:note._rev,
            title:updatedData.title,
            note:updatedData.note,
            favorite:note.favorite,
            createdAt:note.createdAt,
            updatedAt:new Date()
        })
        .then(resp=>{
            if(resp.ok){
                return resp;
            }
            else{
                var err=new Error('Unable to Update Note');
                throw err
            }
        },err=>{
            var errmess=new Error(err.message)
            throw errmess;
        })
        .then((resp)=>{
            db.allDocs({include_docs:true,attachments:true})
            .then((notes)=>{
                dispatch(addNotes(notes.rows))
            },err=>{
                var errmess=new Error(err.message)
                throw errmess;
            })
        },err=>{
            var errmess=new Error(err.message)
            throw errmess;
        })
    })
    .catch(err=>{
        console.log("UPDATE NOTE FAILED: "+err.message);
        alert("UPDATE NOTE FAILED: "+err.message);
    });
}

export const setFavorite=(noteId,value)=>(dispatch)=>{
    return db.get(noteId)
    .then((note)=>{
        db.put({
            _id:note._id,
            _rev:note._rev,
            title:note.title,
            note:note.note,
            favorite:value,
            createdAt:note.createdAt,
            updatedAt:note.updatedAt
        })
        .then(resp=>{
            if(resp.ok){
                return resp;
            }
            else{
                var err=new Error('Unable to Update Note');
                throw err
            }
        },err=>{
            var errmess=new Error(err.message)
            throw errmess;
        })
        .then((resp)=>{
            db.allDocs({include_docs:true,attachments:true})
            .then((notes)=>{
                dispatch(addNotes(notes.rows))
            },err=>{
                var errmess=new Error(err.message)
                throw errmess;
            })
        },err=>{
            var errmess=new Error(err.message)
            throw errmess;
        })
    })
    .catch(err=>{
        console.log("Cant add to Favorite : "+err.message);
        alert("Cant add to Favorite :  "+err.message);
    });
}