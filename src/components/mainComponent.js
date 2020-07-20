import React from 'react';
import Header from './header';
import Home from './home';
import {Switch , Route , Redirect } from 'react-router-dom';
import EditNote from './editNote';

function Main(){
    return(
        <div>
        <Header/>
        <Switch>
            <Route path="/home" component={()=><Home/>}/>
            <Route path="/edit" componrnt={()=><EditNote/>}/>
            <Redirect to="/home" />
        </Switch>
        </div>
    )
}

export default Main;