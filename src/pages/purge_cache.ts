import type {APIRoute} from "astro";
import {BEARER_TOKEN, ZONE_ID} from "astro:env/server";

export const POST: APIRoute = async ({request}) => {
    const url = (await request.formData()).get('url')
    if (!url) {
        return new Response('Missing url', {status: 400})
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${BEARER_TOKEN}`},
        body: `{"hosts":["${url}"]}`
    };

    const response = await fetch(`https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/purge_cache`, options)
        .then(response => response.json())
        .then(data => JSON.stringify(data))
        .catch(err => JSON.stringify(err));

    return new Response(response)
}