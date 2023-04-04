import PencilIcon from "components/icons/PencilIcon"
import { useState } from "react"
import { SpeedDial } from "./Dial"
import { DialOptions, DialPositions } from "./dial.types"
import { usePathname } from "next/navigation"



export const useDialPosotionClasses = (position: DialPositions) => {

    // TODO find better way to path this as a prop and make component reusable
    const pathname = usePathname().split("/").pop() ?? ""
    const pagesWithBottomMenu = ["tasks"] //TODO use config file
    let bottomPositionClass: string
    if (pagesWithBottomMenu.includes(pathname)) {
        bottomPositionClass = "bottom-16"
    } else {
        bottomPositionClass = "bottom-6"
    }

    switch (position) {
        case "bottom-left": {
            return "fixed left-6 " + bottomPositionClass
        }
        case "bottom-right": {
            return "fixed right-6 " + bottomPositionClass
        }
        case "top-left": {
            return "fixed left-6 top-24"
        }
        case "top-right": {
            return "fixed right-6 top-20"
        }
    }
}

export const useTooltipPositionClasses = (position: DialPositions) => {
    switch (position) {
        case"bottom-left": {
            return "left-14"
        }
        case"bottom-right": {
            return "right-14"
        }
        case"top-left": {
            return "left-14"
        }
        case"top-right": {
            return "right-14"
        }
    }
}


export const useDialActionsPositionClasses = (position: DialPositions) => {
    switch (position) {
        case"bottom-left": {
            return "mb-4"
        }
        case"bottom-right": {
            return "mb-4"
        }
        case"top-left": {
            return "mt-4"
        }
        case"top-right": {
            return "mt-4"
        }
    }
}

export const useVoidGradientClasses = (position: DialPositions) => {
    switch (position) {
        case"bottom-left": {
            return "bg-gradient-to-tr from-slate-800"
        }
        case"bottom-right": {
            return "bg-gradient-to-tl from-slate-800"
        }
        case"top-left": {
            return "bg-gradient-to-br from-slate-800"
        }
        case"top-right": {
            return "bg-gradient-to-bl from-slate-800"
        }
    }
}

export const useDialControls = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleDial = () => setIsOpen(!isOpen);
    const closeDial = () => setIsOpen(false);
    return {
        toggleDial,
        closeDial,
        isOpen,
    };
};

export const useDial = (options?: DialOptions) => {
    const isAnimated = options?.isAnimated ?? true
    const isStyled = options?.isStyled ?? true
    const dialPosition = options?.dialPosition ?? "bottom-right"
    const pages = options?.pages || null
    const Icon = options?.Icon ?? (() => <PencilIcon size="md" />)
    const withActions = options?.withActions ?? false
    const actions = options?.actions ?? []
    const handler = options?.handler ?? (() => {})
    const dialOptions = {
        isAnimated,
        isStyled,
        dialPosition,
        pages,
        Icon,
        withActions,
        actions,
        handler
    }

    const Dial = () => (
            <SpeedDial options={dialOptions}/>
    );  

    return Dial;
}
