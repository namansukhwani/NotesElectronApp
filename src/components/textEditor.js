import React,{useState, useRef} from 'react';
import {Grid} from '@material-ui/core';
import {FormatIndentIncrease,FormatListNumbered,FormatListBulleted,Code,FormatBold,FormatUnderlined,FormatItalic} from '@material-ui/icons';
import {ToggleButton,ToggleButtonGroup} from '@material-ui/lab';
import 'draft-js/dist/Draft.css';
import {
    Editor, 
    EditorState,
    RichUtils,
    convertFromRaw, 
    convertToRaw,
  } from 'draft-js';
import '../App.css';

//const MAX_LENGTH = 10;

function TextEditor({handleNotesData,data}){
    data=null;
    var initialState=EditorState.createEmpty();
    if(data!=null){
        const parsedData=convertFromRaw(JSON.parse(data));
        initialState=EditorState.createWithContent(parsedData);
    }

    const [borderColor,setBorderColor]=useState('#8d8d8d');
    const [editorState, setEditorState] = useState(initialState);
    

    const onChange=(editorState)=>{
        const currentState=editorState.getCurrentContent();
        handleNotesData(convertToRaw(currentState));
        setEditorState(editorState);
    }
    
    const handelKeyCommand=(command)=>{
        const newState=RichUtils.handleKeyCommand(editorState,command);
        if(newState){
            onChange(newState);
            return true;
        }
        return false;
    }

    const onTab=(e)=>{
        const maxDepth = 4;
        onChange(RichUtils.onTab(e,editorState,maxDepth));
    }

    const toggleBlockType=(blockType)=>{
        onChange(RichUtils.toggleBlockType(editorState,blockType));
    }

    const toggleInlineStyle=(inlineStyle)=>{
        onChange(RichUtils.toggleInlineStyle(editorState,inlineStyle));
    }

    /*const _getLengthOfSelectedText=()=>{
        console.log('say');

        const currentSelection=editorState.getSelection();
        const isCollapsed=currentSelection.isCollapsed();

        let length = 0;

        if(!isCollapsed){
            const currentContent =editorState.getCurrentContent();
            const startKey = currentSelection.getStartKey();
            const endKey = currentSelection.getEndKey();
            const isBackward = currentSelection.getIsBackward();
            const blockMap = currentContent.getBlockMap();
            const startBlock = currentContent.getBlockForKey(startKey);
            const endBlock = currentContent.getBlockForKey(endKey);
            const isStartAndEndBlockAreTheSame = startKey === endKey;
            const startBlockTextLength = startBlock.getLength();
            const endBlockTextLength = endBlock.getLength();
            const startSelectedTextLength = startBlockTextLength - currentSelection.getStartOffset();
            const endSelectedTextLength = currentSelection.getEndOffset();
            const keyAfterEnd = currentContent.getKeyAfter(endKey);

            if(isStartAndEndBlockAreTheSame){
                length += currentSelection.getEndOffset() - currentSelection.getStartOffset();
            }
            else{
                let currentKey = startKey;
                let counter = 0;
                
                while(currentKey && currentKey !== keyAfterEnd){
                    if (currentKey === startKey) {
                        length += startSelectedTextLength + 1;
                    } else if (currentKey === endKey) {
                    length += endSelectedTextLength;
                    } else {
                        length += currentContent.getBlockForKey(currentKey).getLength() + 1;
                    }
                    currentKey = currentContent.getKeyAfter(currentKey);
                };
            }
        }
        return length;
    }

    const _handleBeforeInput=()=>{
        console.log('hello');
        const currentContent = editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        
        if (currentContentLength > MAX_LENGTH - 1){
            console.log('you can type max ten characters');
            return 'handled';
        }
    }

    const _handlePastedText=(pastedText)=>{
        const currentContent =editorState.getCurrentContent();
        const currentContentLength = currentContent.getPlainText('').length;
        const selectedTextLength = this._getLengthOfSelectedText();

  	if (currentContentLength + pastedText.length - selectedTextLength > MAX_LENGTH) {
    	console.log('you can type max ten characters');  

    	return 'handled';
    }
    }
*/


    const focus=()=>{
        editorRef.current.focus();
        setBorderColor('#303f9f');
        setWidth(2);
    }

    const editorRef=useRef(null);
    var[ width,setWidth]=useState(1);
    return(
        <>
        <Grid container justify="center" spacing={3} style={{marginTop:20}}>
            <Grid container justify="center" alignItems="center">
            <InlineStyleControls toggleInlineStyle={toggleInlineStyle}/>
            <BlockStyleControls toggleBlockType={toggleBlockType}/>
            </Grid>
            <div className="editorDiv" style={{marginTop:7}}>
                <div className="RichEditor-editor" 
                    style={{borderColor:borderColor,borderWidth:width}}
                    onMouseOver={()=>{setBorderColor('#000')}}
                    onMouseOut={()=>{setBorderColor('#8d8d8d');setWidth(1);}}
                    onClick={focus}
                >   
                    <Editor 
                        editorState={editorState} 
                        onChange={onChange}
                        handleKeyCommand={handelKeyCommand} 
                        placeholder="Write Your Note Here..."
                        ref={editorRef}
                        spellCheck={true}
                        blockStyleFn={getBlockStyle}
                        customStyleMap={styleMap}
                        onTab={onTab}
                    />
                </div>  
            </div>
        </Grid>
        </>
    );
}

// Custom overrides for "code" style.
const styleMap = {
    CODE: {
      backgroundColor: '#ffffffc2',
      fontFamily: '"Roboto","Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 18,
      padding: 4,
    },
};

function getBlockStyle(block) {
    switch (block.getType()) {
      case 'blockquote': return 'RichEditor-blockquote';
      default: return null;
    }
}

function BlockStyleControls({toggleBlockType}){
    const [formats,setFormats]=useState('');

    const handelFormat=(event,newFormat)=>{
        setFormats(newFormat);
    }

    const toggle=(type)=>toggleBlockType(type);

    return(
        <ToggleButtonGroup size="medium" value={formats} exclusive onChange={handelFormat} >
            <ToggleButton value="H1" onClick={()=>toggle('header-one')}>
                <strong>H1</strong>
            </ToggleButton>
            <ToggleButton value="H2" onClick={()=>toggle('header-two')}>
                <strong>H2</strong>
            </ToggleButton>
            <ToggleButton value="H3" onClick={()=>toggle('header-three')}>
                <strong>H3</strong>
            </ToggleButton>
            <ToggleButton value="H4" onClick={()=>toggle('header-four')}>
                <strong>H4</strong>
            </ToggleButton>
            <ToggleButton value="H5" onClick={()=>toggle('header-five')}>
                <strong>H5</strong>
            </ToggleButton>
            <ToggleButton value="H6" onClick={()=>toggle('header-six')}>
                <strong>H6</strong>
            </ToggleButton>
            <ToggleButton value="Blockquote" onClick={()=>toggle('blockquote')}>
                <FormatIndentIncrease/>
            </ToggleButton>
            <ToggleButton value="UL" onClick={()=>toggle('unordered-list-item')}>
                <FormatListBulleted/>
            </ToggleButton>
            <ToggleButton value="OL" onClick={()=>toggle('ordered-list-item')}>
                <FormatListNumbered/>
            </ToggleButton>
            <ToggleButton value="CodeBlock" onClick={()=>toggle('code-block')}>
                <Code/>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

function InlineStyleControls({toggleInlineStyle}){

    const toggle=(type)=>toggleInlineStyle(type);

    return(
        <ToggleButtonGroup size="medium" >
            <ToggleButton value="Bold" onClick={()=>toggle('BOLD')}>
                <FormatBold/>
            </ToggleButton>
            <ToggleButton value="Italic" onClick={()=>toggle('ITALIC')}>
                <FormatItalic/>
            </ToggleButton>
            <ToggleButton value="Underline" onClick={()=>toggle('UNDERLINE')}>
                <FormatUnderlined/>
            </ToggleButton>
            <ToggleButton value="Monospace" onClick={()=>toggle('CODE')}>
                <strong>Monospace</strong>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

export default TextEditor;