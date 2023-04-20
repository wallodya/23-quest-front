import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: "https://todo-proj-five.vercel.app.com",
            lastModified: new Date(),
        },
        {
            url: "https://todo-proj-five.vercel.app/tasks",
            lastModified: new Date(),
        },
        {
            url: "https://todo-proj-five.vercel.app/quests",
            lastModified: new Date(),
        },
        {
            url: "https://todo-proj-five.vercel.app/sign-in",
            lastModified: new Date(),
        },
        {
            url: "https://todo-proj-five.vercel.app/sign-up",
            lastModified: new Date(),
        },
    ];
}
  