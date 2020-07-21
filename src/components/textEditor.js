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
    
    return(
        <div>
            <Editor editorState={editorState} onChange={setEditorState} />  
        </div>
    );
}

export default TextEditor;