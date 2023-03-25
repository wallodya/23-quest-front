import { usePathname } from "next/navigation"

export const useIsIncludedOnPage = (includedPages?: string[] | null, excludedPages?: string[] | null) => {
    const pathname = usePathname().split("/").pop() ?? ""
    const isIncludedOnPage = !includedPages || includedPages.includes(pathname)
    const isExcludedOnPage = !!excludedPages && excludedPages.includes(pathname)

    return !isExcludedOnPage && isIncludedOnPage
}
