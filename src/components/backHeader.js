import React from 'react';
import {AppBar, Typography,makeStyles,Toolbar,IconButton} from '@material-ui/core';
import {ArrowBack} from '@material-ui/icons';
import {useHistory} from 'react-router-dom';
import '../App.css';

function BackHeader(props){
    const styles=useStyles();
    const history=useHistory();
    
    return(
           <AppBar elevation={1} position="fixed" className={styles.appBar}>
                <Toolbar className={styles.toolbar}>
                    <IconButton 
                        className={styles.backButton}
                        size="medium" 
                        onClick={()=>history.goBack()}
                    >
                            <ArrowBack style={{fontSize:30}}/>
                    </IconButton>
                    <img src={require('../shared/images/notesLogo.png')} alt=" " width="45" height="45" />
                    <Typography variant="h5" className={styles.headerTitle}>
                        Notes
                    </Typography>
                </Toolbar>
           </AppBar>
    );
}

const useStyles=makeStyles({
    appBar:{
        backgroundColor:'#f5f5f5c2',
        color:'#000000',
    },
    headerTitle:{
        fontFamily:'Roboto',
        fontWeight:'bold',
        marginLeft:20
    },
    toolbar:{
        margin:1
    },
    backButton:{
        color:'#000',
        marginRight:9
    }
})

export default BackHeader;