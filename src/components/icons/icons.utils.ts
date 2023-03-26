export type IconSizes = "xxs" | "xs" | "sm" | "md" | "lg" | "xl"

export const ICON_SIZES = {
    xxs : "12", 
    xs: "18",
    sm: "24",
    md: "36",
    lg: "48",
    xl: "60"
}

export const getIconSizePx = (size: IconSizes): string => {
    return ICON_SIZES[size]
}