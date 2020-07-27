import React from 'react';
import {AppBar, Typography,makeStyles,Toolbar,IconButton,Grid} from '@material-ui/core';
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
                    {props.customTitle ? 
                        <Grid container className={styles.titleDiv} >
                            <Typography className={styles.title}>
                                {props.headerTitle}
                            </Typography>
                        </Grid>
                        :
                        <>
                        <img src={require('../shared/images/notesLogo.png')} alt=" " width="45" height="45" />
                        <Typography variant="h5" className={styles.headerTitle}>
                            Notes
                        </Typography>
                        </>
                    }
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
        fontFamily:'"Roboto",sans-serif',
        fontWeight:'bold',
        marginLeft:20
    },
    toolbar:{
        margin:1
    },
    backButton:{
        color:'#000',
        marginRight:9
    },
    title:{
        fontFamily:'"Roboto",sans-serif',
        fontWeight:'bold',
        padding:6,
        fontSize:22,
        marginRight:60,
        marginLeft:'auto'
    },
    titleDiv:{
        marginRight:'auto',
        marginLeft:'auto',
        width:'auto',
    }
})

export default BackHeader;