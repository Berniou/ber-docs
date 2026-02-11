import { type SyntheticEvent } from "react";

const addingKeyUp = (e: SyntheticEvent<HTMLDivElement>) => {
    e.currentTarget.addEventListener('keyup', () => {
    });
}

export {addingKeyUp}