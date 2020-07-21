import React,{useState} from 'react';
import {Container,Button,makeStyles,Grid, Card,CardContent,CardActions, Typography,IconButton,Slide,Snackbar,CircularProgress,Tooltip,Zoom} from '@material-ui/core';
import {Add,Edit,Favorite,Delete,Close} from '@material-ui/icons';
import {Alert} from '@material-ui/lab';
import {NavLink} from 'react-router-dom';
import '../App.css';
import {DOCUMENT} from '../shared/doc';

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
                    <Typography className={styles.cardText}>{note.title}</Typography>
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
    const [alert,setAlert]=useState(false)
    const isLoading=false;

    const doc=DOCUMENT;
    if(isLoading){
        return(
            <div style={{paddingTop:100}}>
            <Grid container justify="center" alignContent="center">
                <CircularProgress style={{color:"#2962ff"}} />
            </Grid>
            </div>
        );
    }
    else{
    return(
        <div>
        <Container maxWidth="xl"className={styles.container}>
            <Grid container justify="center" alignItems="center">
                <NavLink to="/edit" style={{textDecoration:'none'}}>
                    <Button 
                        variant="contained" 
                        size="large"
                        style={{backgroundColor:'#2962ff',marginTop:8}}
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
                {   doc.map((note)=>{
                    return(
                        <CardView note={note} setAlert={setAlert}/>
                    );
                })}                
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
        backgroundColor:"#ffffff",
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