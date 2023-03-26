import { CSSProperties, useState } from "react"

export const useTaskDescriptionStyles = (isExpanded: boolean): CSSProperties => {
    if (isExpanded) {
        return {maxHeight: 200,}
    } else {
        return {maxHeight: 0, }
    }
}

export const useTaskDescriptionControls = () => {
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded)
    }
    const hideDescription = () => {
        setIsExpanded(false)
    }
    const showDescription = () =>  {
        setIsExpanded(true)
    }

    return {
        isExpanded,
        toggleExpanded,
        hideDescription,
        showDescription
    }
}
