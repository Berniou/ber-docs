# BER DOCS

## Descritption 

This project has as goal to provide a collaborative web service for text editing.

## How I plan to realize the project

On this project, I choose to work with the DOM to format the text in my text editing application. Another manner would be to work with the canvas html api as done with google-docs.

### First steps
First I work on putting in bold, italic, underline and stroke the text. To do as well, I extract the selected text and put it into the corresponding node. For example, if I want to bold a text, I put it into the ```<bold></bold>``` node.

### What is the problem with this.

What I encountered as first issue is that, if I apply multiple time the same format on a selected text, if with wall the same type of nodes embedded mutliple times in the DOM. And that is a problem.

**Example :**
>Input: "The selected text."
>Click 3 times on the underline button
>OutPut: ``` <u><u><u>The selected text.</u></u></u> ```

### A solution
To manage that, I should implement a fonctionnality to unwrap the selected text.
