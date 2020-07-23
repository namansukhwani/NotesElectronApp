import React,{useState} from 'react';
import {makeStyles, Container,Grid,TextField,Button} from '@material-ui/core';
import {Save,Delete} from '@material-ui/icons';
import {} from '@material-ui/lab';
import TextEditor from './textEditor';
import BackHeader from './backHeader';
import '../App.css';


function NewNote(props){
    const styles=useStyles();
    const title="Coronavirus COVID-19: Centre seeks feedback from states and union territories on reopening of schools";
    const text="The Union Ministry of Human Resources and Development (HRD) has released a circular asking states and union territories to seek feedback from parents when they will be comfortable with reopening of schools.";

    return(
        <div>
            <BackHeader/>
            <Container maxWidth="xl" className={styles.container}>
                <form>
                    <Grid container justify="center" alignItems="center" spacing={3}>    
                        <TextField required 
                            variant="filled"
                            label="Title"
                            placeholder="Enter Your Title Here "
                            className={styles.titleBox}
                            multiline
                        />   
                    </Grid>
                    <TextEditor/>  
                    <Grid container justify="center" alignItems="center" spacing={3} style={{marginTop:20}}>  
                        <TextField  
                            variant="filled"
                            label="Your Note"
                            placeholder="Enter Your Notes Here "
                            className={styles.titleBox}
                            multiline
                            rows={18}
                        /> 
                    </Grid>
                    <Grid container justify="space-around" alignItems="center" spacing={3} style={{marginTop:20}}>
                        <Button
                            variant="contained" 
                            size="large"
                            style={{backgroundColor:'#2962ff',marginTop:8}}
                            startIcon={<Save/>}
                        >
                            SAVE
                        </Button>
                        <Button
                            variant="contained" 
                            size="large"
                            style={{backgroundColor:'#ba000d',color:'#fff',marginTop:8}}
                            startIcon={<Delete style={{color:'#fff'}}/>}
                        >
                            DELETE
                        </Button>    
                    </Grid>
                </form>
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
        marginTop:70
    },
    titleBox:{
        width:700,
        borderColor:"#2962ff"
    }
})

export default NewNote;