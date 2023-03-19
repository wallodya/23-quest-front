// @ts-check
import * as bundleAnalyzer from "@next/bundle-analyzer"

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: true,
    swcMinify: true,
    modularizeImports: {
        "@mui/([\w-]*)$": {
            transform: "@mui/{{matches.[0]}}/{{member}}",
        },

        // "@mui/icons-material": {
        //     transform: "@mui/icons-material/{{ member }}",
        //     preventFullImport: true,
        //     skipDefaultConversion: true,
        // },
        // "@mui/lab": {
        //     transform: "@mui/lab/node/{{member}}",
        //     preventFullImport: true,
        //     skipDefaultConversion: true,
        // },
        // "@mui/material": {
        //     transform: "@mui/material/node/{{ member }}",
        //     preventFullImport: true,
        //     skipDefaultConversion: true,
        // },
        // "@mui/base": {
        //     transform: "@mui/base/node/{{member}}",
        //     preventFullImport: true,
        //     skipDefaultConversion: true,
        // },
        // "@mui/system": {
        //     transform: "@mui/system/node/{{member}}",
        //     preventFullImport: true,
        //     skipDefaultConversion: true,
        // },

        // "@mui/material/?(((\\w*)?/?)*)": {
        //     transform: "@mui/material/{{ matches.[1] }}/{{member}}",
        // },
        // "@mui/icons-material/?(((\\w*)?/?)*)": {
        //     transform: "@mui/icons-material/{{ matches.[1] }}/{{member}}",
        // },
    },
    experimental: {
        swcTraceProfiling: true,
        appDir: true,
    },
};


export default bundleAnalyzer.default({
    enabled: process.env.ANALYZE === "true"
})(config)
