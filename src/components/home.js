import React,{useState,useEffect} from 'react';
import {Container,Button,makeStyles,Grid, Card,CardContent,CardActions, Typography,IconButton,Slide,Snackbar,CircularProgress,Tooltip,Zoom} from '@material-ui/core';
import {Add,Edit,Favorite,Delete} from '@material-ui/icons';
import {Alert} from '@material-ui/lab';
import {NavLink} from 'react-router-dom';
import '../App.css';
import Header from './header';

function CardView({note,setAlert}){
    const styles=useStyles();
    const [shadow,setShadow]=useState(false);

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
                onClick={()=>setAlert(true)}
            >
                <CardContent>
                    <Typography className={styles.cardText}>{note.doc.title}</Typography>
                </CardContent>
                <CardActions >
                    <Tooltip TransitionComponent={Zoom} title="Add To Favorites">
                        <IconButton aria-label="Add Favorite">
                            <Favorite style={{color:'red'}}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Edit This Note">
                    <IconButton aria-label="Edit Note">
                        <Edit/>
                    </IconButton>
                    </Tooltip>
                    <Tooltip TransitionComponent={Zoom} title="Delete This Note">
                        <IconButton aria-label="Delete Note" style={{marginLeft:'auto'}}>
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
                <NavLink to="/edit" style={{textDecoration:'none'}}>
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
                <Alert onClose={()=>{setAlert(false)}} severity="success" >Your Click Was Successfull</Alert>
            </Snackbar>
            <Grid  container justify="center" alignItems="center" spacing={3} className={styles.cardContainer}>
                { doc ? 
                   filteredDoc.map((note)=>{
                    return(
                        <CardView note={note} setAlert={setAlert}/>
                    );
                }):
                    <Grid container item xs={12} sm={12} md={12} justify="space-evenly" alignItems="center">
                        <h3>Please Add a New Note</h3>
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
        textOverflow:'ellipsis',
        overflow:'hidden',
        whiteSpace:'nowrap'
    }
})

export default Home;