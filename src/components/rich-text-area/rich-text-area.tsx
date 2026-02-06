import './rich-text-area.css'

const RichTextArea = ({}) => {
    return (
        <>
            <div id='marged-zone'>
                <div id="text-zone" contentEditable={true} spellCheck={false}>
                </div>
            </div>
        </>
    )
}

export default RichTextArea;