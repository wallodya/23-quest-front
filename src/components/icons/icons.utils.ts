export type IconSizes = "xs" | "sm" | "md" | "lg" | "xl"

export const ICON_SIZES = {
    xs: "18",
    sm: "24",
    md: "36",
    lg: "48",
    xl: "60"
}

export const getIconSizePx = (size: IconSizes): string => {
    return ICON_SIZES[size]
}