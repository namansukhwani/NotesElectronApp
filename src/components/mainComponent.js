import React from 'react';
import Header from './header';
import Home from './home';
import {Switch , Route , Redirect } from 'react-router-dom';
import NewNote from './NewNote';

function Main(){
    return(
        <div>
        <Switch>
            <Route path="/home" component={()=><Home/>}/>
            <Route path="/edit" component={()=><NewNote/>}/>
            <Redirect to="/home" />
        </Switch>
        </div>
    )
}

export default Main;