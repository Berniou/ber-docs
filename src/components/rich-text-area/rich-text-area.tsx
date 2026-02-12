import { useEffect } from 'react';
import { addingKeyUp } from '../../services/managing-main-tags';

import './rich-text-area.css'

const RichTextArea = ({}) => {

    useEffect(()=>{
        
        document.getElementById("text-zone")?.append(`<strong>Texte Gras.</strong>
                    <br/>
                    <em>Texte italique.</em>
                    <br/>
                    <u>Texte souligné.</u>
                    <br/>
                    <s>Texte barré.</s>
                    <br/>
                    Texte normal.`);
    });

    

    return (
        <>
            <div id='marged-zone'>
                <div id="text-zone" contentEditable={true} spellCheck={false} onFocus={addingKeyUp}>

                </div>
            </div>
        </>
    )
}

export default RichTextArea;