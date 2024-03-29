import { Landing } from "./(pages)/(landing)/Landing"
import type { Metadata } from "next"

export const metadata: Metadata = {
    title: {
        template: '%s | Todo',
        default: "Todo"
    },
    description: "Application for managing your daily activities",
    themeColor: "#0f172a",
    colorScheme: "dark",
    category: "Task manager",
    creator: "Wallodya",
    keywords: ["todo", "task manager", "todo manager"],
}

export default Landing