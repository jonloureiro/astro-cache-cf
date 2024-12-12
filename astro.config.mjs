// @ts-check
import {defineConfig, envField} from 'astro/config';
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
    adapter: cloudflare(),
    output: 'server',
    env: {
        schema: {
            X_AUTH_EMAIL: envField.string({
                context: "server",
                access: "secret",
                default: "",
            }),
        },
    },
});