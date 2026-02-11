import { type SyntheticEvent } from 'react';
import './tools-panel.css'

const ToolsPanel = ({}) => {

    // WARNING: don't add empty quote in the list!
    const FORMAT_TOOLS_LIST = ["em", "i", "strong", "b", "strike", "s", "u"];

    const RICH_TEXT_AREA_ID = "text-zone";

    const formatSelection = (e: SyntheticEvent<HTMLButtonElement>): void => {
        
        // Here I get the format node to apply on a selected text in the text zone.
        const toolElementName = e.currentTarget.firstChild?.nodeName.toLowerCase() ?? "";

        // We create a new node to format the selected text.
        const nodeToBeInserted:HTMLElement = document.createElement(toolElementName);

        if(!FORMAT_TOOLS_LIST.includes(toolElementName))
            return;

        // We get the WYSIWYG area and checked it exists.
        const richTextArea = document.getElementById(RICH_TEXT_AREA_ID);
        if(!richTextArea){
            console.log("Error: The text area has not been found.");
            return;
        }

        applyFormat(richTextArea, nodeToBeInserted);

    }

    const applyFormat = (textZone : HTMLElement, nodeFormat: HTMLElement) =>{
        // Here with get the selected text or elements from the window.
        const selection = window.getSelection();

        // We get the first checked elements.
        const range = selection?.getRangeAt(0);

        // We check that the selected text or elements is not empty.
        if(!range || range?.collapsed)
            return;

        //We verify that the selected is from the editor area.
        if(textZone.contains(range.commonAncestorContainer)){
            //we extract the selected text or elements.
            const extractedFragment = range.extractContents();

            //we put it in the new node so that we can format the selected text.
            nodeFormat.appendChild(extractedFragment);

            range.insertNode(nodeFormat);
        }

    }


    return (
        <>
            <div id="tools-list-container">
                <ul id="tools-list">
                    <li><button id="strong-tool" onClick={formatSelection} className="button-38"><strong>B</strong></button></li>
                    <li><button id="italic-tool" onClick={formatSelection} className="button-38"><em>I</em></button></li>
                    <li><button id="underline-tool" onClick={formatSelection} className="button-38"><u>U</u></button></li>
                    <li><button id="strike-tool" onClick={formatSelection} className="button-38"><s>S</s></button></li>
                </ul>
            </div>
        </>
    )
}

export default ToolsPanel;