import React,{useState} from 'react';
import {makeStyles, Container,Grid,TextField,Button} from '@material-ui/core';
import {Save,Delete} from '@material-ui/icons';
import {} from '@material-ui/lab';
import TextEditor from './textEditor';
import BackHeader from './backHeader';
import {useHistory} from 'react-router-dom';
import '../App.css';


function NewNote(props){
    const styles=useStyles();
    //const title="Coronavirus COVID-19: Centre seeks feedback from states and union territories on reopening of schools";
    //const text="The Union Ministry of Human Resources and Development (HRD) has released a circular asking states and union territories to seek feedback from parents when they will be comfortable with reopening of schools.";
    const [noteData,setNoteData]=useState({});
    const [titleData,setTitleData]=useState('');
    const history=useHistory();

    const handleNotesData=(data)=>{
        setNoteData(data)
    };

    const handleSubmit=(event)=>{
        const payload={
            title:titleData,
            note:noteData
        };
        props.postNote(payload);
        console.log(payload);
        history.push('/home');
        event.preventDefault();
    };

    return(
        <div>
            <BackHeader/>
            <Container maxWidth="xl" className={styles.container}>
                <form onSubmit={handleSubmit}>
                    <Grid container justify="center" alignItems="center" spacing={3}>    
                        <TextField required 
                            variant="outlined"
                            label="Title"
                            placeholder="Enter Your Title Here "
                            className={styles.titleBox}
                            multiline
                            style={{backgroundColor:'#c2c2c2'}}
                            value={titleData}
                            onChange={(e)=>setTitleData(e.target.value)}
                        />   
                    </Grid>  
                    <TextEditor handleNotesData={(data)=>handleNotesData(data)}/>
                    <Grid container justify="space-around" alignItems="center" spacing={3} style={{marginTop:20}}>
                        <Button
                            variant="contained" 
                            size="large"
                            style={{backgroundColor:'#2962ff',marginTop:8}}
                            startIcon={<Save/>}
                            type="submit"
                        >
                            SAVE AND CREATE NEW NOTE
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
        marginTop:90
    },
    titleBox:{
        width:700,
        borderColor:"#2962ff"
    }
})

export default NewNote;