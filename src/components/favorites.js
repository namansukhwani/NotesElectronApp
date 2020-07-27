import React,{useState} from 'react';
import {Container,makeStyles,Grid, Card,CardContent,CardActions,CardActionArea, Typography,IconButton,Slide,CircularProgress,Tooltip,Zoom} from '@material-ui/core';
import {Edit,Favorite,Delete,FavoriteBorder} from '@material-ui/icons';
import {useHistory} from 'react-router-dom';
import '../App.css';
import BackHeader from './backHeader';

function CardView({note,setAlert,deleteNote,setFavorite}){
    const styles=useStyles();
    const [shadow,setShadow]=useState(false);
    const history=useHistory();

    const onMouseOver=()=>{
        setShadow(true)
    };

    const onMouseOut=()=>{
        setShadow(false)
    };

    return(
        <Grid container item xs={12} sm={6} md={6} justify="space-evenly" alignItems="center">
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <Card 
                className={styles.card}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
                raised={shadow}
            >
                <CardActionArea onClick={()=>history.push(`/editNote/${note.id}`)}>
                <CardContent>
                    <Typography className={styles.cardText}>{note.doc.title}</Typography>
                </CardContent>
                </CardActionArea>
                <CardActions >
                    <Tooltip TransitionComponent={Zoom} title="Add To Favorites">
                        <IconButton aria-label="Add Favorite" onClick={()=>setFavorite(note.id,!note.doc.favorite)}>
                            {note.doc.favorite ? 
                                <Favorite style={{color:'red'}}/> 
                                :
                                <FavoriteBorder/>    
                            }
                        </IconButton>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Edit This Note">
                    <IconButton aria-label="Edit Note" onClick={()=>history.push(`/editNote/${note.id}`)}>
                        <Edit/>
                    </IconButton>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Delete This Note">
                        <IconButton aria-label="Delete Note" style={{marginLeft:'auto'}} onClick={(e)=>{deleteNote(note.id,note.doc._rev);e.preventDefault();}}>
                            <Delete/>
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
            </Slide>
        </Grid>
    )
}

function Favorites(props){
    const styles=useStyles();
    var doc=props.notes.notes;
    const filteredDoc=doc.filter((note)=>note.doc.favorite)

    if(props.notes.isLoading){
        return(
            <div className="loadingDiv">
                <CircularProgress style={{color:"#2962ff"}} />
            </div>
        );
    }
    if(props.notes.err){
        return(
            <div className="loadingDiv">
                <h3>{props.notes.err}</h3>
            </div>
        )
    }
    else{
    return(
        <div>
        <BackHeader customTitle={true} headerTitle="Favorites"/>
        <Container maxWidth="xl"className={styles.container}>
            <Grid  container justify="center" alignItems="center" spacing={3} className={styles.cardContainer}>
                {filteredDoc.length ?
                   filteredDoc.map((note)=>{
                    return(
                        <CardView note={note} deleteNote={props.deleteNote} setFavorite={props.setFavorite}/>
                    );
                })
                :
                <Grid container direction="column" xs={12} sm={12} md={12} justify="space-evenly" alignItems="center">
                    <p style={{fontSize:22}}>You Don't Have Any Favorites</p>
                    <p style={{fontSize:14}}>Add Notes to Favorites to See Here</p>
                </Grid>
                }                
            </Grid>

        </Container>
        </div>
    );
    }
}

const useStyles=makeStyles({
    container:{
        justifyContent:'center',
        alignItems:'center',
        padding:20,
        width:'100%',
        marginTop:70
    },
    addButton:{
        marginLeft:'auto'
    },
    cardContainer:{
        padding:20
    },
    card:{
        background:"linear-gradient(to right, #c2c2c2, #768fff)",
        borderRadius:8,
        height:110,
        width:600
    },
    cardText:{
        fontWeight:'bold',
        textOverflow:'ellipsis',
        overflow:'hidden',
        whiteSpace:'nowrap'
    }
})

export default Favorites;