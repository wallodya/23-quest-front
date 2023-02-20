/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                "main": "1fr min(1440px, 95VW) 1fr",
            },
            fontFamily: {
                sans: ["var(--font-inter)"]
            }
        },
    },
    darkMode: "class",
    plugins: [],
};
