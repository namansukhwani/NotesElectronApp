import React,{useEffect,useCallback} from 'react';
import {Switch , Route , Redirect,withRouter } from 'react-router-dom';
import {connect} from 'react-redux'
import {fetchNotes,postNote} from '../redux/actions';
import Home from './home';
import NewNote from './NewNote';

const mapStateToProps=state=>{
    return{
        notes:state.notes
    }
}

const mapDispatchToProps=dispatch=>({
    fetchNotes:()=>dispatch(fetchNotes()),
    postNote:(newNote)=>dispatch(postNote(newNote))
})

function Main({fetchNotes,notes,postNote}){

    const fetchAllNotes=useCallback(()=>{
        fetchNotes();
    },[])

    useEffect(()=>{
        fetchAllNotes();
        console.log("Info Fetched!!");
    },[fetchAllNotes])

    return(
        <div>
        <Switch>
            <Route path="/home" component={()=><Home notes={notes}/>}/>
            <Route path="/edit" component={()=><NewNote postNote={postNote}/>}/>
            <Redirect to="/home" />
        </Switch>
        </div>
    )
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));