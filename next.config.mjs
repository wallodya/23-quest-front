// @ts-check
import * as bundleAnalyzer from "@next/bundle-analyzer"

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env.mjs"));

/** @type {import("next").NextConfig} */
const config = {
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: true,
    experimental: {
        swcTraceProfiling: true,
        appDir: true,
    },
};

// export default bundleAnalyzer.default({
//     enabled: process.env.ANALYZE === "true"
// })(config)

export default config