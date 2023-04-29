import { useState, useEffect } from "react";

type ScreenSize = "sm" | "md" | "lg" | "xl" | "xxl"

const setScreenSize = () => {}

export const useMobileScreenSize = () => {
    const MD_WIDTH = 768;

    const [isMobile, setIsMobile] = useState<boolean>(false)
    useEffect(() => {
        if (typeof window !== "undefined" && window.innerWidth < MD_WIDTH) {
            setIsMobile(true)
        }
    })

    return isMobile
}

export const useScreenSize = () => {
    const SM_WIDTH = 640;
    const MD_WIDTH = 768;
    const LG_WIDTH = 1024;
    const XL_WIDTH = 1280;
    const XXL_WIDTH = 1536;

}