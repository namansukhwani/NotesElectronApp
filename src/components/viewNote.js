import React from 'react';
import {makeStyles,Container,Grid,Typography,Tooltip,IconButton,Zoom} from '@material-ui/core';
import {Favorite,FavoriteBorder,Edit,Delete} from '@material-ui/icons';
import {} from '@material-ui/lab';
import {useHistory} from 'react-router-dom';
import '../App.css';
import BackHeader from './backHeader';
import TextView from './viewStyledText';

function ViewNote(props){
    const styles=useStyles();
    const history=useHistory();

    return(
        <div>
            <BackHeader/>
            <Container maxWidth="xl" className={styles.container}>
                <Grid container justify="center" alignContent="center" spacing={3} style={{marginTop:20}}>
                    <Typography className={styles.title}>{props.note.doc.title}</Typography>
                </Grid>
                <Grid container justify="center" alignContent="center" spacing={3} style={{marginTop:20}}>
                    <Grid container className="line">
                    <Tooltip TransitionComponent={Zoom} title="Add To Favorites">
                        <IconButton aria-label="Add Favorite" onClick={()=>props.setFavorite(props.note.id,!props.note.doc.favorite)}>
                            {props.note.doc.favorite ? 
                                <Favorite style={{color:'red'}}/> 
                                :   
                                <FavoriteBorder/>    
                            }
                        </IconButton>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Edit This Note">
                        <IconButton aria-label="Edit Note" onClick={()=>history.push(`/editNote/${props.note.id}`)}>
                            <Edit/>
                        </IconButton>
                    </Tooltip>
                    <p className="date">{"Update on "+new Intl.DateTimeFormat('en-US', {timeStyle:'short',dateStyle:'medium'}).format(new Date(Date.parse(props.note.doc.updatedAt)))}</p>
                    <Tooltip TransitionComponent={Zoom} title="Delete This Note">
                        <IconButton aria-label="Delete Note" style={{marginLeft:'auto'}} onClick={(e)=>{props.deleteNote(props.note.id,props.note.doc._rev);e.preventDefault();}}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                    </Grid>
                </Grid>
                <Grid container justify="center" alignContent="center" spacing={3} style={{marginTop:20}}>   
                    <TextView data={props.note.doc.note} />
                </Grid>
            </Container>
        </div>
    );
}

const useStyles=makeStyles({
    container:{
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        width:'100%',
        marginTop:90
    },
    title:{
        fontFamily:'"Roboto",sans-serif',
        fontSize:24,
        fontWeight:'bold',
        maxWidth:700,
    },
})
export default ViewNote;