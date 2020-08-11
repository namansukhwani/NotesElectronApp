import React,{useState} from 'react';
import {makeStyles, Container,Grid,TextField,Button,Slide} from '@material-ui/core';
import {Save} from '@material-ui/icons';
import {} from '@material-ui/lab';
import TextEditor from './textEditor';
import BackHeader from './backHeader';
import {useHistory} from 'react-router-dom';
import '../App.css';


function EditNote({note,editNote}){
    const styles=useStyles();
    const [noteData,setNoteData]=useState(note.doc.note);
    const [titleData,setTitleData]=useState(note.doc.title);
    const history=useHistory();

    const handleNotesData=(data)=>{
        setNoteData(data)
    };

    const handleSubmit=(event)=>{
        const payload={
            title:titleData,
            note:noteData
        };
        editNote(note.id,payload)
        console.log(payload);
        history.goBack();
        event.preventDefault();
    };

    return(
        <div>
            <BackHeader customTitle={true} headerTitle="Edit Note" />
            <Slide direction="up" in={true} mountOnEnter unmountOnExit>
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
                    <TextEditor handleNotesData={(data)=>handleNotesData(data)} data={noteData}/>
                    <Grid container justify="space-around" alignItems="center" spacing={3} style={{marginTop:20}}>
                        <Button
                            variant="contained" 
                            size="large"
                            style={{backgroundColor:'#2962ff',marginTop:8}}
                            startIcon={<Save/>}
                            type="submit"
                        >
                            SAVE
                        </Button>
                    </Grid>
                </form>
            </Container>
            </Slide>
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

export default EditNote;