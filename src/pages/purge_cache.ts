import type {APIRoute} from "astro";
import {X_AUTH_EMAIL, ZONE_ID} from "astro:env/server";

export const POST: APIRoute = async ({request}) => {
    const url = (await request.formData()).get('url')
    if (!url) {
        return new Response('Missing url', {status: 400})
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'X-Auth-Email': X_AUTH_EMAIL},
        body: `{"hosts":["${url}"]}`
    };
    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`, options)
        .then(response => response.json())
        .catch(err => console.error(err));

    return new Response(response)
}