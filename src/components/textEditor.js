import React,{useState} from 'react';
import 'draft-js/dist/Draft.css';
import {
    Editor, 
    EditorState,
    RichUtils,
    convertFromRaw, 
    convertToRaw,
  } from 'draft-js';

function TextEditor(props){
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    function onChange(editorState){
        setEditorState(editorState);
    }
    
    function handelKeyCommand(command){
        const newState=RichUtils.handleKeyCommand(editorState,command);
        if(newState){
            setEditorState(newState);
            return true;
        }
        return false;
    }

    function onBoldClick(){
        setEditorState(RichUtils.toggleInlineStyle(editorState,'BOLD'));
    }

    return(
        <>
            <h1>HEllo!!</h1>
            <button style={{marginBottom:4}} onClick={onBoldClick}>BOLD</button>
            <Editor 
                editorState={editorState} 
                onChange={onChange}
                handleKeyCommand={handelKeyCommand} 
            />  
        </>
    );
}

export default TextEditor;