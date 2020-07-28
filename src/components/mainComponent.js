import React,{useEffect,useCallback} from 'react';
import {Switch , Route , Redirect,withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchNotes,postNote,deleteNote,editNote,setFavorite} from '../redux/actions';
import Home from './home';
import NewNote from './NewNote';
import EditNote from './editNote';
import Favorites from './favorites';
import ViewNote from './viewNote';

const mapStateToProps=state=>{
    return{
        notes:state.notes
    }
}

const mapDispatchToProps=dispatch=>({
    fetchNotes:()=>dispatch(fetchNotes()),
    postNote:(newNote)=>dispatch(postNote(newNote)),
    deleteNote:(noteId,noteRev)=>dispatch(deleteNote(noteId,noteRev)),
    editNote:(noteId,updatedData)=>dispatch(editNote(noteId,updatedData)),
    setFavorite:(noteId,value)=>dispatch(setFavorite(noteId,value))
})

function Main({fetchNotes,notes,postNote,deleteNote,editNote,setFavorite}){

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

    const ViewNotes=({match})=>{
        return(
            <ViewNote note={notes.notes.filter((note)=>note.id ===match.params.Id)[0]} deleteNote={deleteNote} setFavorite={setFavorite}/>
        );
    }

    return(
        <div>
        <Switch>
            <Route path="/home" component={()=><Home notes={notes} deleteNote={deleteNote} setFavorite={setFavorite}/>}/>
            <Route path="/newNote" component={()=><NewNote postNote={postNote}/>}/>
            <Route path="/viewNote/:Id" component={ViewNotes}/>
            <Route path="/editNote/:noteId" component={EditNotes}/>
            <Route path="/favorites" component={()=><Favorites notes={notes} deleteNote={deleteNote} setFavorite={setFavorite} />}/>
            <Redirect to="/home" />
        </Switch>
        </div>
    )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));