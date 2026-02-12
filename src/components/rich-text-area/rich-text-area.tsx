import { useEffect } from 'react';
import { addingKeyUp } from '../../services/managing-main-tags';

import './rich-text-area.css'

const RichTextArea = ({}) => {

    useEffect(() => {
        const textZone = document.getElementById("text-zone");

        //TODO - remove
        const b = document.createElement("strong");
        const br = document.createElement("br");
        const u = document.createElement("u");
        const i = document.createElement("em");

        b.append("Bold text.");
        u.append("underlined text.");
        i.append("Italic text.");

        textZone?.appendChild(b);
        textZone?.appendChild(br.cloneNode());
        textZone?.appendChild(u);
        textZone?.appendChild(br.cloneNode());
        textZone?.appendChild(i);
        textZone?.appendChild(br.cloneNode());
    }, [])
    

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