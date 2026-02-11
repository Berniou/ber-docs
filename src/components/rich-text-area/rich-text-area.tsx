import { addingKeyUp } from '../../services/managing-main-tags';

import './rich-text-area.css'

const RichTextArea = ({}) => {

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