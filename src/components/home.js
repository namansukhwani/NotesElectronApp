import React,{useState} from 'react';
import {Container,Button,makeStyles,Grid, Card,CardContent,CardActions, Typography,IconButton,Slide,Collapse} from '@material-ui/core';
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
                    <IconButton aria-label="Add  Favorite">
                        <Favorite style={{color:'red'}}/>
                    </IconButton>
                    <IconButton aria-label="Edit Note">
                        <Edit/>
                    </IconButton>
                    <IconButton aria-label="Delete Note" style={{marginLeft:'auto'}}>
                        <Delete/>
                    </IconButton>
                </CardActions>
            </Card>
            </Slide>
        </Grid>
    )
}

function Home(){
    const styles=useStyles();
    const [alert,setAlert]=useState(false)

    const doc=DOCUMENT;

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
            <Grid item sm={12} xs={12}>
            <Collapse in={alert}>
                    <Alert
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                setAlert(false);}}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                        severity="success"
                     >
                        Your Click Was Succesfull!!
                    </Alert>
                </Collapse>
            </Grid>
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