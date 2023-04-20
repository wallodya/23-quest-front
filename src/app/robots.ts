import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: ["/"],
            disallow: ["/sign-in", "/sign-up", "/tasks", "/quests"],
        },
        sitemap: "https://todo-proj-five.vercel.app.com/sitemap.xml"
    }
}