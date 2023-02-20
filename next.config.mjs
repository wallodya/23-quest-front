// @ts-check

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
        // fontLoaders: [
        //     { loader: "@next/font/google", options: { subsets: ["latin"]} }
        // ]
    },
};
export default config;
