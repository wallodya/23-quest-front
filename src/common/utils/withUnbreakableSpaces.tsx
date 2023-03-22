import { ReactNode } from "react";

const withUnbreakableSpaces = (str: string): ReactNode => {
    const words = str.split(" ")
    return words.map((word, index) => {
        if (index !== words.length - 1) {
            return <span key={index}>{word}&nbsp;</span>
        } else {
            return <span key={index}>{word}</span>
        }
    })
}

export default withUnbreakableSpaces