import React,{useState} from "react";
import {Editor, EditorState, convertFromRaw} from "draft-js";
import 'draft-js/dist/Draft.css';


export default function TextView(props){
    const parsedData=convertFromRaw(props.data);
    var initialState=EditorState.createWithContent(parsedData);
    const [editorState, setEditorState] = useState(initialState);

    return(
        <div className="editorDiv">
            <div className="draftView">
            <Editor editorState={editorState} readOnly={true}/>
            </div>
        </div>
    );
}