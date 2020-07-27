import React,{useEffect,useCallback} from 'react';
import {Switch , Route , Redirect,withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchNotes,postNote,deleteNote,editNote} from '../redux/actions';
import Home from './home';
import NewNote from './NewNote';
import EditNote from './editNote';

const mapStateToProps=state=>{
    return{
        notes:state.notes
    }
}

const mapDispatchToProps=dispatch=>({
    fetchNotes:()=>dispatch(fetchNotes()),
    postNote:(newNote)=>dispatch(postNote(newNote)),
    deleteNote:(noteId,noteRev)=>dispatch(deleteNote(noteId,noteRev)),
    editNote:(noteId,updatedData)=>dispatch(editNote(noteId,updatedData))
})

function Main({fetchNotes,notes,postNote,deleteNote,editNote}){

    const fetchAllNotes=useCallback(()=>{
        fetchNotes();
    },[])

    useEffect(()=>{
        fetchAllNotes();
        console.log("Info Fetched!!");
    },[fetchAllNotes])

    const EditNotes=({match})=>{
        return(
            <EditNote note={notes.notes.filter((note)=>note.id ===match.params.noteId)[0]} editNote={editNote}/>
        )
    }

    return(
        <div>
        <Switch>
            <Route path="/home" component={()=><Home notes={notes} deleteNote={deleteNote}/>}/>
            <Route path="/newNote" component={()=><NewNote postNote={postNote}/>}/>
            <Route path="/editNote/:noteId" component={EditNotes}/>
            <Redirect to="/home" />
        </Switch>
        </div>
    )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));