// @ts-check
import {defineConfig, envField} from 'astro/config';
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
    adapter: cloudflare(),
    output: 'server',
    env: {
        schema: {
            BEARER_TOKEN: envField.string({
                context: "server",
                access: "secret",
                default: "",
            }),
            ZONE_ID: envField.string({
                context: "server",
                access: "secret",
                default: "",
            }),
        },
    },
});