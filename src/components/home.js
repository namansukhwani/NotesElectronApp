import React,{useState,useEffect} from 'react';
import {Container,Button,makeStyles,Grid, Card,CardContent,CardActions,CardActionArea, Typography,IconButton,Slide,Snackbar,CircularProgress,Tooltip,Zoom} from '@material-ui/core';
import {Add,Edit,Favorite,Delete,FavoriteBorder} from '@material-ui/icons';
import {Alert} from '@material-ui/lab';
import {NavLink,useHistory} from 'react-router-dom';
import '../App.css';
import Header from './header';

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

function Home(props){
    const styles=useStyles();
    const [alert,setAlert]=useState(false);
    const [search,setSearch]=useState('');
    const [filteredDoc,setFilteredDoc]=useState([]);
    var doc=props.notes.notes;
    
    useEffect(()=>{
        setFilteredDoc(
            doc.filter(note=>{
                return note.doc.title.toLowerCase().includes(search.toLowerCase())
            })
        )
    },[search,doc])

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
        <Header handleSearch={(search)=>setSearch(search)}/>
        <Container maxWidth="xl"className={styles.container}>
            <Grid container justify="center" alignItems="center">
                <NavLink to="/newNote" style={{textDecoration:'none'}}>
                    <Button 
                        variant="contained" 
                        size="large"
                        style={{background:'linear-gradient(to right, #0039cb, #768fff)',marginTop:8}}
                        startIcon={<Add/>}
                    >
                        Add a New Note
                    </Button>
                </NavLink>
            </Grid>
            <Snackbar open={alert} autoHideDuration={6000} onClose={()=>{setAlert(false)}} >
                    <Alert onClose={()=>{setAlert(false)}} severity="success" >New Note was Successfully created.</Alert>
            </Snackbar>
            <Grid  container justify="center" alignItems="center" spacing={3} className={styles.cardContainer}>
                { doc.length ? (
                    filteredDoc.length ?
                   filteredDoc.map((note)=>{
                    return(
                        <CardView note={note} setAlert={setAlert} deleteNote={props.deleteNote} setFavorite={props.setFavorite}/>
                    );
                }):
                <Grid container item xs={12} sm={12} md={12} justify="space-evenly" alignItems="center">
                        <p style={{fontSize:22}}>No Search results...</p>
                    </Grid>
                    ):
                    <Grid container direction="column" xs={12} sm={12} md={12} justify="space-evenly" alignItems="center">
                        <p style={{fontSize:22}}>You Don't Have Any Notes</p>
                        <p style={{fontSize:14}}>Click Add Button Above to Add One</p>
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
        marginTop:50
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

export default Home;