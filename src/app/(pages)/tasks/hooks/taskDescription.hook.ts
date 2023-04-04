import { CSSProperties, useState } from "react"

export const useTaskDescriptionStyles = (isExpanded: boolean): CSSProperties => {
    if (isExpanded) {
        return {maxHeight: 200, marginTop: "1rem"}
    } else {
        return {maxHeight: 0, marginTop: 0}
    }
} // TODO use tailwind classes (maybe)

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
