import { type SyntheticEvent } from 'react';
import './tools-panel.css'

const ToolsPanel = ({}) => {

    // WARNING: don't add empty quote in the list!
    const FORMAT_TOOLS_LIST = ["em", "i", "strong", "b", "strike", "s", "u"];

    const FORMAT_TOOLS_LIST_UPPER = ["EM", "I", "STRONG", "B", "STRIKE", "S", "U"];

    const PRIORITIES_FORMAT_TAGS = new Map<string, number>([
        ["STRONG", 1000],
        ["B", 1000],
        ["EM", 100],
        ["I", 100],
        ["U", 10],
        ["S", 1]
    ])


    const RICH_TEXT_AREA_ID = "text-zone";

    const formatSelection = (e: SyntheticEvent<HTMLButtonElement>): void => {

        const formatTargetNode = e.currentTarget.firstChild?.cloneNode();

        if(!formatTargetNode)
            return;

        const textZone = document.getElementById(RICH_TEXT_AREA_ID);
        
        const range = document.getSelection()?.getRangeAt(0);

        if(!range || range.collapse())
            return;

        if(!textZone?.contains(range.commonAncestorContainer))
            return;

        

        const fragmentText = range.extractContents(); 
        console.log(range)

        console.log(fragmentText.children);

        const walker = document.createTreeWalker(
            fragmentText,
            NodeFilter.SHOW_ELEMENT,
            // (node) => {
            //     console.log(node);
            //     return FORMAT_TOOLS_LIST_UPPER.includes(node.nodeName)
            //             ? NodeFilter.FILTER_ACCEPT
            //             : NodeFilter.FILTER_SKIP}
        );

        let node= walker.nextNode();

        while(node = walker.nextNode()){
            // const priorityFormatTarget = PRIORITIES_FORMAT_TAGS.get(formatTargetNode.nodeName) ?? -1;
            // const priorityCurrentNode = PRIORITIES_FORMAT_TAGS.get(node.nodeName) ?? -1;
            // if (priorityFormatTarget > priorityCurrentNode){
            //formatTargetNode.appendChild(node.cloneNode());
            console.log(`target format: ${formatTargetNode.nodeName}`);
            console.log(`node to format: ${node.nodeName}`);
            console.log(`parent node to format: ${node.parentElement?.nodeName}`);
            //node.parentElement?.replaceChild(formatTargetNode, node);
            
            
            // } else if(priorityFormatTarget < priorityCurrentNode){
            //     formatTargetNode
            // }
        
        }
        //range.insertNode(fragment);
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