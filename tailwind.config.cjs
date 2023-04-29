/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                "main": "1fr min(1440px, 95VW) 1fr",
                "cards": "repeat(auto-fit,minmax(300px,1fr))"
            },
            fontFamily: {
                sans: ["var(--font-inter)"]
            }
        },
    },
    darkMode: "class",
    plugins: [],
};
