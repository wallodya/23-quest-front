import { ReactNode } from "react";

const withUnbreakableSpaces = (str: string): ReactNode => {
    const words = str.split(" ")
    return words.map((word, index) => {
        if (index !== words.length - 1) {
            return <>{word}&nbsp;</>
        } else {
            return <>{word}</>
        }
    })
}

export default withUnbreakableSpaces