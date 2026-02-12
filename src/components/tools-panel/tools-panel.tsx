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

         // Here we get the selected text or elements from the window.
        const selection = window.getSelection();

        // We get the first checked elements.
        const range = selection?.getRangeAt(0);

        // We check that the selected text or elements is not empty.
        if(!range || range?.collapsed)
            return;

         //We verify that the selected is from the editor area.
        if(!richTextArea.contains(range.commonAncestorContainer))
            return;

        // We check the format of the element.
        // const span = document.createElement('span');
        // span.appendChild(range.cloneContents());
        // const alreadyBold = span.querySelector(FORMAT_TOOLS_LIST.toString());

        // if(alreadyBold){
        //     unwrapFormat(range, nodeToBeInserted);
        // }else{
        //      applyFormat(range, nodeToBeInserted);
        // }

        wrapFormatInOrder(range, nodeToBeInserted);
    }

    const unwrapFormat = (range: Range, nodeToUnwrap: HTMLElement) => {

        const contents = range.extractContents();

        const walker = document.createTreeWalker(
            contents,
            NodeFilter.SHOW_ELEMENT,
            (node) => {
                console.log(node.nodeName)
                return node.nodeName === nodeToUnwrap.nodeName
                        ? NodeFilter.FILTER_ACCEPT
                        : NodeFilter.FILTER_SKIP;
            }
        );

        let node;

        //On parcourt les noeuds selectionnés.
        //On déplace le premier enfant de chaque noeud à son grand parent, juste avant le noeud lui-même et on supprime le noeud du parent.
        while(node = walker.nextNode()){
            const parent = node.parentNode;
            if(node.firstChild){
                parent?.insertBefore(node.firstChild, node);
                parent?.removeChild(node);
            }
        }

        range.insertNode(contents);
        
    }

    const applyFormat = (range: Range, nodeFormat: HTMLElement) =>{

            //we extract the selected text or elements.
            const extractedFragment = range.extractContents();

            //we put it in the new node so that we can format the selected text.
            nodeFormat.appendChild(extractedFragment);

            range.insertNode(nodeFormat);

    }

    const wrapFormatInOrder = (range: Range, nodeFormat: Element) => {

        const updatedSelection = range.extractContents();

        const  orderedFormatTag = new Map<string, number>([
            ["s", 1],
            ["u", 10],
            ["em", 100],
            ["i", 100],
            ["b", 1000],
            ["strong", 1000],
        ]);

        let nodeParent = updatedSelection.firstChild;
        let currentNode;

        

        let priorityParent = orderedFormatTag.get(nodeParent?.nodeName.toLowerCase() ?? "") ?? -1;

         console.log(`priorityParent: ${nodeParent?.nodeName}`);
        const priorityFormatTarget = orderedFormatTag.get(nodeFormat?.nodeName.toLowerCase() ?? "") ?? -1;

         console.log(`priorityParent: ${priorityParent} - priorityFormatTarget: ${priorityFormatTarget}`)
        
        //We order the embedding according to node priority from orderedFormatTag Map.
        // while(priorityParent > priorityFormatTarget && FORMAT_TOOLS_LIST.includes(nodeParent?.nodeName.toLowerCase() ?? "")){

           

        //     currentNode = nodeParent;
        //     nodeParent = nodeParent?.parentNode ?? null;

        //     // Je remplace le noeud enfant par son contenue à l'intérieur du parent du noeud.
        //     nodeParent?.insertBefore(updatedSelection, currentNode);
        //     if(currentNode)
        //         nodeParent?.removeChild(currentNode);
        //     nodeParent = nodeParent?.parentNode ?? null;

        //     priorityParent = orderedFormatTag.get(nodeParent?.nodeName ?? "") ?? -1;
        // }
        
        if(priorityParent === priorityFormatTarget && currentNode){
            nodeFormat.appendChild(currentNode);
            range.insertNode(nodeFormat);
        }
        else {
            range.insertNode(updatedSelection);
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